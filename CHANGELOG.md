# Changelog (baseline 4c66e53c437a87f4bd3e850cc4f3005cd7bbfecb)
HE = ICA8 evaluator feedback (tracking labels, not P2/P3 Finding IDs). INSTRUCTOR = later feedback on omitted functionality/task difficulty. AUDIT = source-code or comparison-document finding.
## Pass 1 (partial revision; snapshot kept as vawc-p4-partial-revision.zip)
C-01 HE-01 occupation→programs search with removable occupation chip. C-02 HE-03 removed bold task-leading links, answer-like placeholders, participant-facing evaluation link, P3 wording in About. C-03 HE-04 (partial) unchanged re-search keeps selections; changed search removes only non-matching ones with a notice. C-04 HE-05 (partial) job title opens details. C-05 HE-06 application page shows method, simulated destination, separate employer-website note, prototype boundary. C-06 HE-08 (partial) text-size state + restore. C-08 AUDIT storage key separated.
## Pass 2 (this checkpoint)
C-07 AUDIT (source) + INSTRUCTOR: "Relevance" kept array order → replaced by documented Best match scoring (see DATA-NOTES.md), neutral stable tie-breaks, explicit unknown-pay-last pay sort, on-screen sort explanation.
C-09 HE-03/AUDIT: evaluator materials restored separately at evaluator/ (version id, storage-only reset, manual checks); not linked from participant UI.
C-10 AUDIT: tests expanded (dataset integrity, sorting with hand-derived expectations, filters, evaluator reset); dataset targets reported as UNMET.
