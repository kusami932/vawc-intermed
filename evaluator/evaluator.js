(function(){var REVISED_KEY='vawc-p4-revised-v1';
window.resetRevisedStorage=function(){try{localStorage.removeItem(REVISED_KEY);return true}catch(e){return false}};
var b=document.getElementById('reset');if(b)b.addEventListener('click',function(){document.getElementById('msg').textContent=window.resetRevisedStorage()?'Revised prototype state cleared (key '+REVISED_KEY+'). The baseline key vawc-p4-v1 was not touched.':'Could not access storage.';});})();
