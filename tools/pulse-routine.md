# react-brain pulse — weekly autonomous routine

The agentic half of the pulse. `tools/react-brain-pulse.mjs` is the deterministic,
no-agent health/drift check; **this** is the prompt a scheduled agent runs weekly to
keep the corpus *growing*, not just healthy. Wire it into `/schedule` (weekly). It is
**propose-only** for knowledge; only deterministic fixes may be auto-applied.

> Scheduling is user-opt-in (billed). To set up: `/schedule` this prompt weekly, or run
> it by hand any time. Cadence matches the React/RN newsletters (weekly).

---

## Routine prompt

You are the react-brain weekly pulse. Working dir: `~/odd-jobs/heartit/react-brain`.
Goal: keep the encyclopedia fresh + growing and watch the heartit apps for drift.
**Guardrail: PROPOSE knowledge changes as a reviewable delta; do NOT silently rewrite
recommendations/status. Deterministic fixes (dead-link removal, adding an `updated:`
stamp to an entry you actually re-verified) may be applied with a one-line note.**

1. **Health (deterministic).** Run:
   `node tools/react-brain-pulse.mjs --today=<today> ../ledgerhr ../ourpot ../bitbarter`
   Capture: dead links, aging/undated entries, and any app drift since last baseline.

2. **Growth (verified harvest).** Read the memory note `react-brain-mentor-skill.md` to
   find the last-processed issue numbers per source. Fetch only NEW issues since then from:
   This Week in React, React Native Rewind, React Status, React Digest. For each, extract
   durable SELECTION facts + canonical deep-dive ARTICLES. **Fetch-verify every URL before
   keeping it** (no fabricated links; reject 404s/paywalls). Map each to an entry via the
   mentor's `capability_map` + `assessment_dimensions`, or flag a GAP (a real dep/topic with
   no entry). De-dupe against existing `reading`/`sources`.

3. **Self-audit.** Run the evidence loop and note new blind spots/contradictions:
   `node tools/react-brain-evidence.mjs ../ledgerhr ../ourpot ../bitbarter`

4. **Emit ONE delta** (don't apply knowledge changes): a short report with
   (a) dead links to fix, (b) undated/aging entries, (c) app drift, (d) proposed new
   entries / reading / status-flips with their verified sources, (e) new gaps. Order by
   leverage. Then ask whether to apply (a)/(b) automatically and (d)/(e) after review.

5. **Record.** Append a one-line dated note to the memory file with issue numbers
   processed + counts, so the next run knows where to resume.

Keep it tight. A quiet week = a short report. Never recommend churn for novelty
(MP-VETTED-OVER-PROMOTION still applies).

---

## Why propose-only

The corpus's value is that it's *curated + verified*, not a popularity feed. Autonomy
keeps it fresh; the human-reviewed delta keeps it correct. Auto-applying recommendation
changes would let it drift into an unreviewed mess — exactly the failure the loop exists
to prevent. Deterministic facts (a 404 is a 404) are safe to auto-fix; judgments are not.
