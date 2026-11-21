# Continuation checkpoint (this package is INTERMEDIATE)
Working files: this folder. Snapshots: vawc-p4-partial-revision.zip (pass 1), baseline preserved separately.
Next actions in order:
1. Data: extend data.js to ≥40 occupations/10 groups, ≥16 providers (≥6 Richmond), ≥24 programs, ≥80 jobs; hand-author varied records (no title-only filler); add supported cities/ZIPs near Richmond; keep IDs stable; rerun tests and add hand-derived expectations.
2. HE-02: one shared `S.jobs` draft used by home, #jobs and a results-screen form (keyword, location, radius, disclosures for all existing filters); Update results applies count+summary+list together; define Reset; validation leaves applied search intact.
3. Mapping: add Standard/Advanced labels, alphabetic directory navigation, ownership/location-type/Green provider filters where data supports them, Menu entries for peripheral services, notices that preserve return state.
4. HE-07 location help text per control; occupation info labelled general unless data supports local values. HE-09: shared field renderer for card/detail/compare incl. application method; explain unknown-pay/schedule handling beside the filters.
5. HE-04/05/06/08 remainder: consistent page names and Back to results, history checks, per-job application instructions, tab-vs-button styling, dialog focus.
6. Validate, update docs, repackage as final.
