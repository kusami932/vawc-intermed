# Virginia Works — revised P4 prototype (INTERMEDIATE checkpoint 2, not the final deliverable)
Derived from the ICA8 baseline (kusami932/vawc-prototype @ 4c66e53c437a87f4bd3e850cc4f3005cd7bbfecb). Static site, no backend or build. All organizations, programs and vacancies are fictional.
**Read CHECKPOINT.md first**: the dataset expansion, HE-02, original-site restoration, HE-07 and HE-09 are still outstanding.
Preview: `python3 -m http.server 8000`, then http://localhost:8000/ . Tests: `node tests/smoke-test.js`.
Deploy: add all files to a NEW repo/branch (index.html at root, `.nojekyll` included), enable Pages from the branch root. Do not overwrite the baseline repo.
Evaluator page: `evaluator/index.html` (reset button, manual checks). It is intentionally not linked from the participant UI.
Storage key `vawc-p4-revised-v1` (baseline uses `vawc-p4-v1`).
## AI assistance and assumptions (for the P4 report)
Claude (Anthropic) patched the supplied baseline snapshot in two passes and wrote the tests. The comparison document (Korean, `P4_Original_ICA8_Comparison.docx`) was read; Claude did not inspect the original website itself, so original-site statements in ORIGINAL-SITE-MAPPING.md are the document's. Occupation→program links and the relevance scoring rule are authored design decisions. The baseline had earlier P3-derived design sources; the later P3 Revision wireframes were not used.
