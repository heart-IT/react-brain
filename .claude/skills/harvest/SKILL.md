---
name: harvest
description: >
  Newsletter/blog harvest pass for react-brain — run whenever asked to "update self
  with <url>", "harvest <newsletter/issue>", or scan a source for the encyclopedia.
  Routes to the repo's canonical routine: deterministic link inventory → disposition
  manifest → fetch-verify → apply delta → coverage + npm-test gates → ledgers.
---

# react-brain newsletter harvest

This skill is a ROUTER, deliberately thin. The canonical method lives in the repo and
wins over anything written here — if they disagree, follow the repo file and fix this
skill. One knowledge base, every session (local, resumed, or cloud-cloned).

## Read before touching anything

1. `tools/harvest-state.json` — resume numbers per source (which issue is next),
   per-source access notes. Update + commit it WITH the delta afterwards.
2. `tools/upkeep-routine.md` **step 2 (Growth)** — THE method: triage rules, the
   mandatory inventory→manifest→coverage sequence, claim-tagging at keep-time, and the
   fetch-verification playbook (WebFetch → browser-UA curl → Wayback snapshot; exclude
   a URL only when ALL THREE fail; `expo.dev/blog/*` is a JS shell — use
   `expo.dev/changelog/sdk-NN`; version/deprecation facts → `registry.npmjs.org/<pkg>`).
3. `tools/harvest-log/twir-290.md` — the manifest template (2026-07-16).

## The sequence (details in the routine — do not improvise a different one)

0. **Firsthand first**: `node tools/cli.mjs harvest firsthand` — the corpus-derived
   watch graph (npm dist-tags + deprecation flags, GitHub releases, vetted-author RSS)
   diffed against the committed `.firsthand-state.json`. Known-entity events come from
   here, not from newsletters; triage them into `tools/harvest-log/firsthand-<date>.md`
   (`--manifest` writes the skeleton) and commit the updated state WITH the delta.
   Newsletters' job is unknown unknowns + corroboration.
1. **Inventory first** (per newsletter issue): `node tools/cli.mjs harvest inventory
   <issue-url>` — build triage from the mechanical link list, never from an LLM
   summary of the page.
2. Triage each link; **fetch-verify every keep**; dedupe vs the corpus
   (`grep -rn "<url>" skills/react-brain-mentor/entries/`).
3. Write `tools/harvest-log/<source>-<issue>.md` — EVERY external link gets a row
   carrying its URL: `kept` (→ entry/field) / `already-held` (→ where) / `skipped`
   (reason class + reopen signal for cap/pre-ship/too-early).
4. Apply the delta to `skills/react-brain-mentor/entries/<ID>.yaml` (one file per
   entry; bump `updated:`). A NEW entry needs the full wiring: entry file (+ `detect:`
   rows) · TOC slot in `encyclopedia.yaml` · `capability_map` row in
   `react-brain-mentor.yaml` · `FEATURE_DOMAINS` in `tools/react-brain-stack.mjs` ·
   `node tools/react-brain-calibrate.mjs --seed`. Bump `sources_digested` counts and
   any "N entries" claims (count-drift lint catches stragglers). A deprecation/
   supersession/version-line fact ⇒ also add the entry's `migrate:` rule — but
   supersession-IN-PROGRESS (no formal deprecation) gets a watch note, NOT a rule
   (Rive and next-auth precedents).
5. **Gates**: `node tools/cli.mjs harvest coverage <issue-url> <manifest>` must exit 0;
   `node tools/cli.mjs harvest watchlist` (re-triage recurring skips); spot-check ALL
   `cap` skips + 2 random skips from the PREVIOUS issue's manifest; then `npm test`.
6. Commit delta + manifest + `harvest-state.json` together.

## Ledgers (after the commit)

- **Local maintainer session**: append the dated narrative note to
  `/Users/f1sh/.claude/projects/-Users-f1sh-odd-jobs-heartit-react-brain/memory/react-brain-mentor-skill.md`
  (the OLD-path project memory — kept there on purpose) and refresh the
  "Last processed" line in this project's memory `newsletter-harvest-ledger.md`.
- **Cloud/headless agent**: no memory access — the PR description carries the
  narrative instead; everything else above is in-repo and identical.

## Calibration

Typical yield per issue: ~one gap-filling entry OR a few verified status-flips +
2-3 readings — newsletters heavily corroborate each other, so a small delta is a
sign of health, not laziness. The manifest is what proves the difference.
