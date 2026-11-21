# Validation (intermediate)
## Executed: `node tests/smoke-test.js` (Node 22, stubbed DOM, not a browser) — 43 PASS (including 14 route checks), 0 FAIL, 6 UNMET dataset targets
Routes render expected content (14); separate storage key; occupation→programs context and removal (O04 → P02, P04: justified by the occupationIds authored in data.js); fresh-session neutrality (programs page); dataset ID uniqueness and relationships; sorting expectations derived by hand from data.js; Richmond 25-mile, pay-range, unknown-pay and Daytime filter behavior; evaluator reset removes only the revised key; participant files do not reference the evaluator page. Also `node --check`.
## Static inspection only
Draft/applied behavior of the results screen (unchanged from baseline); selection-retention code (C-03); apply-page text; text-size dialog; HE-05 title button.
## Pending manual (real browser)
1. Evaluator reset, then fresh home is empty. 2. Occupation → Explore training: chip, Remove, Search programs. 3. Job search: sort dropdown order and the explanatory note. 4. Tick two jobs, re-search unchanged (kept) and changed (notice). 5. Title button and Compare checkbox independence, focus ring. 6. How to apply pages. 7. Back/Forward, refresh on #routes, narrow layout, GitHub Pages deployment. No usability improvement is claimed or measured.
