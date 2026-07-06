# react-brain challenge — adversarial validation routine

The **correctness** axis of corpus quality, completing the trilogy:
- completeness → `react-brain-evidence.mjs` (is there an entry for what's used?)
- freshness → `react-brain-pulse.mjs` (are facts/links current?)
- **correctness → this** (is the recommendation actually *right*?)

Pure judgment, so it's a routine, not a Node tool. Run it on the highest-stakes
`reviewed`/high-confidence entries (those are cited freely — most damage if wrong).
Wire alongside the pulse in `/schedule` (e.g. a few entries per week, rotating).

**What to challenge next** is no longer a guess: `react-brain signals` (live npm reality)
and `react-brain calibrate` (the `check-due` list) both produce a prioritized queue —
a TRAILING/STALE/CLAIM flag, or a prediction past its horizon, is the strongest signal
that an entry deserves a fresh challenge.

## Method (per entry)

A **challenger** agent tries to *break* one recommendation:
1. Read the entry's `recommend.default` + `recommend.when`, its long-form reasoning
   (`encyclopedia/<id>.md`), its field `evidence` (from the evidence loop), and its `reading`.
2. Build the **strongest case AGAINST** the default — steelman the leading alternative
   *for the entry's stated contexts* (stage/platform).
3. **Test that case against current reality** (fetch-verify primary sources, today's date)
   and the evidence corpus.
4. Verdict:
   - **SURVIVES** — the default holds; note *why* it withstood the attack (this is a new
     trust signal: a survived challenge > untested editorial opinion).
   - **WEAKENED** — default holds but the attack exposed a real missing caveat/context →
     propose a `when`-clause or note addition.
   - **OVERTURNED** — the default should change → propose the correction, with evidence.
5. **Record the verdict** in the calibration ledger (append-only — this is how the corpus
   builds a scored track record):
   ```sh
   node tools/react-brain-calibrate.mjs --record <RB-E-ID> <held|weakened|overturned> "<one-line note>"
   ```
   (SURVIVES → `held`.) Then `react-brain calibrate` shows whether each confidence tier is
   actually earning its label. The `check-due` list tells you which entries to challenge next.

## Guardrails (non-negotiable)

- **Default to SURVIVES.** To return OVERTURNED you must cite *concrete current evidence*
  that beats the default **on a stated axis** — this is MP-VETTED-OVER-PROMOTION. A
  challenger that always "finds a case against" would destabilize good advice.
- **Propose-only.** Verdicts + proposed caveats/corrections are a human-reviewed diff; the
  routine never rewrites a recommendation on its own.
- It raises **confidence or caveats**, not manufactured certainty. Be a rigorous skeptic,
  not a contrarian. No churn-for-novelty.

## Why it matters

A mentor's worst failure is confident-but-wrong advice. Completeness and freshness don't
catch it; only stress-testing the judgment does. An entry that has *survived a challenge*
is trustworthy in a way "I reviewed it" never was — and one that's overturned/weakened gets
better. Either outcome is a win.
