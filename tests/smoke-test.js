const fs=require('fs'),vm=require('vm');
function mk(dir){
  const L={},store={};let html='',hash='';
  const el=()=>({set innerHTML(v){html=v},get innerHTML(){return html},textContent:'',focus(){},scrollIntoView(){},setAttribute(){},scrollTop:0,classList:{toggle(){},contains(){return false}},open:false,showModal(){}});
  const doc={querySelector:()=>el(),addEventListener:(t,f)=>{L[t]=f},body:{classList:{toggle(){},contains:()=>false}}};
  const loc={get hash(){return hash},set hash(v){hash=v.startsWith('#')?v:'#'+v;L.hashchange&&L.hashchange()}};
  const win={VAWC_DATA:null,addEventListener:(t,f)=>{L[t]=f},scrollTo(){}};
  const ctx={window:win,document:doc,location:loc,localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v}},setTimeout:f=>f(),console};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(dir+'/data.js','utf8'),ctx);
  vm.runInContext(fs.readFileSync(dir+'/app.js','utf8'),ctx);
  win.VAWC_DATA=ctx.window.VAWC_DATA;
  return {L,store,get html(){return html},loc,win:ctx.window,
    click(ds){L.click({target:{closest:()=>({dataset:ds,tagName:'BUTTON',id:'',closest:()=>null})}})}};
}
const r=[];const ok=(n,c)=>r.push((c?'PASS ':'FAIL ')+n);
const a=mk(__dirname+'/..'); const T=a.win.VAWC_TEST;
// route rendering smoke test
for(const [rt,h] of [['home','Find jobs'],['occupations','Explore occupations'],['occupation/O01','Administrative Assistant'],['training','Training &amp; Education'],['providers','Find training providers'],['provider/T01','Richmond Learning Center'],['programs','Find training programs'],['program/P01','Office Software Fundamentals'],['jobs','Search criteria'],['results','Job search results'],['job/J01','Job details'],['apply/J01','Prototype boundary'],['apply/J02','Employer’s own application site'],['nosuch','Page not found']]){a.loc.hash=rt;ok('renders #'+rt+' with expected content',a.html.includes(h))}
ok('storage key is separate from baseline',Object.keys(a.store).every(k=>k==='vawc-p4-revised-v1'));
// HE-01: occupation -> training
a.click({action:'occ-training',id:'O04'});
ok('occ-training routes to programs',a.loc.hash==='#programs');
ok('inherited occupation chip shown',a.html.includes('Occupation:</strong> Bookkeeping Clerk')&&a.html.includes('Remove occupation condition'));
ok('inherited search does not substitute a location (applied summary shows All Virginia)',a.html.includes('Training location: All Virginia'));
const n1=(a.html.match(/View program details/g)||[]).length; ok('O04 yields exactly its 2 linked programs (P02, P04)',n1===2&&a.html.includes('Bookkeeping Basics')&&a.html.includes('Spreadsheets for Office Work')&&!a.html.includes('Computer Support Foundations'));
a.click({action:'remove-occupation'}); ok('remove changes draft only (applied results unchanged)',(a.html.match(/View program details/g)||[]).length===2&&a.html.includes('Changes not applied')&&!a.html.includes('Occupation:</strong>'));
// fresh session has no prefill
const b=mk(__dirname+'/..'); b.loc.hash='programs'; ok('fresh programs search has no occupation chip',!b.html.includes('Occupation:</strong>'));
ok('no task hints in placeholders',![ 'administrative assistant','e.g.,'].some(s=>b.html.includes('placeholder="'+s)));
// data relationships
const D=a.win.VAWC_DATA; ok('every program occupationId and provider valid',D.programs.every(p=>p.occupationIds.every(i=>D.occupations.some(o=>o.id===i))&&D.providers.some(t=>t.id===p.providerId)));
// HE-04 selection retention

// --- dataset integrity (independent of implementation) ---
const uniq=a=>new Set(a).size===a.length;
for(const k of ['occupations','providers','programs','jobs']) ok('unique IDs: '+k,uniq(D[k].map(x=>x.id)));
ok('program.providerId exists and provider lists the program',D.programs.every(p=>{const t=D.providers.find(x=>x.id===p.providerId);return t&&t.programIds.includes(p.id)}));
ok('provider.programIds exist and point back',D.providers.every(t=>t.programIds.every(i=>D.programs.find(p=>p.id===i&&p.providerId===t.id))));
ok('job.occupationId exists',D.jobs.every(j=>D.occupations.some(o=>o.id===j.occupationId)));
ok('job/provider/program cities are supported locations',[...D.jobs,...D.providers,...D.programs].every(x=>T.locate(x.city)));
// --- sorting; expected orders derived by hand from data.js (postedDays / pay), not from program output ---
const ids=x=>x.map(j=>j.id).join(',');
const all=D.jobs.slice();
ok('blank query, best match falls back to most recent',ids(T.sortJobs(all,{q:''},'relevance'))==='J03,J01,J05,J02,J09,J07,J04,J10,J06,J08');
ok('most recent sort',ids(T.sortJobs(all,{q:''},'recent'))==='J03,J01,J05,J02,J09,J07,J04,J10,J06,J08');
ok('pay sort: upper end as hourly equivalent, unknown last',ids(T.sortJobs(all,{q:''},'pay'))==='J09,J07,J08,J05,J04,J01,J10,J06,J03,J02');
const adm=T.filterJobs({...T.defaults.jobs,q:'administrative'});
ok('q=administrative matches 9 jobs (all but J09)',ids(adm.slice().sort((a,b)=>a.id.localeCompare(b.id)))==='J01,J02,J03,J04,J05,J06,J07,J08,J10');
ok('best match scoring (title+phrase 7, occupation 2, keyword 2; ties by recency)',ids(T.sortJobs(adm,{q:'administrative'},'relevance'))==='J01,J07,J04,J05,J06,J02,J08,J03,J10');
ok('sorting is deterministic across input order',ids(T.sortJobs(adm.slice().reverse(),{q:'administrative'},'relevance'))===ids(T.sortJobs(adm,{q:'administrative'},'relevance')));
// --- filters on baseline data ---
ok('Richmond 25 mi (straight-line from city centers): Richmond, Henrico, Chesterfield, Petersburg jobs; not Charlottesville or Norfolk',ids(T.filterJobs({...T.defaults.jobs,city:'Richmond, VA'}).sort((a,b)=>a.id.localeCompare(b.id)))==='J01,J02,J03,J04,J05,J06,J09,J10');
ok('unknown pay excluded when box unchecked and minimum set',!T.filterJobs({...T.defaults.jobs,pay:'19',unknown:false}).some(j=>j.id==='J02'));
ok('range upper end passes minimum (J03 16-18 fails 19; J06 19-20 passes)',(()=>{const r=T.filterJobs({...T.defaults.jobs,pay:'19',unknown:false});return !r.some(j=>j.id==='J03')&&r.some(j=>j.id==='J06')})());
ok('Daytime filter excludes unknown schedule (J02)',!T.filterJobs({...T.defaults.jobs,schedule:'Daytime'}).some(j=>j.id==='J02'));
// --- evaluator reset touches only the revised key ---
const ls={'vawc-p4-v1':'baseline','vawc-p4-revised-v1':'revised'};
const vmx=require('vm');const cx={window:{},document:{getElementById:()=>null},localStorage:{removeItem:k=>{delete ls[k]}}};vmx.createContext(cx);
vmx.runInContext(fs.readFileSync(__dirname+'/../evaluator/evaluator.js','utf8'),cx);cx.window.resetRevisedStorage();
ok('evaluator reset removes revised key only',!('vawc-p4-revised-v1' in ls)&&ls['vawc-p4-v1']==='baseline');
ok('participant pages do not link to the evaluator page',!/evaluator/i.test(fs.readFileSync(__dirname+'/../index.html','utf8'))&&!/evaluator/i.test(fs.readFileSync(__dirname+'/../app.js','utf8')));
// --- brief's dataset targets: reported, not asserted ---
const tg=[['occupations>=40',D.occupations.length>=40],['groups>=10',new Set(D.occupations.map(o=>o.group)).size>=10],['providers>=16',D.providers.length>=16],['Richmond providers>=6',D.providers.filter(p=>p.city==='Richmond, VA').length>=6],['programs>=24',D.programs.length>=24],['jobs>=80',D.jobs.length>=80]];
const unmet=tg.filter(x=>!x[1]).map(x=>'UNMET TARGET '+x[0]);
console.log(r.join('\n'));console.log(unmet.join('\n'));process.exitCode=r.some(x=>x.startsWith('FAIL'))?1:0;
console.log('counts:',D.occupations.length,'occupations,',D.providers.length,'providers,',D.programs.length,'programs,',D.jobs.length,'jobs');
