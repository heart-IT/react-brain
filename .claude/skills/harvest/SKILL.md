---
name: harvest
description: >
  Newsletter/blog harvest pass for react-brain — run whenever asked to "update self
  with <url>", "harvest <newsletter/issue>", or scan a source for the encyclopedia.
  Routes to the repo's canonical routine: deterministic link inventory → disposition
  manifest → fetch-verify → apply delta → coverage + npm-test gates → ledger.
---

# react-brain newsletter harvest

This skill is a ROUTER, deliberately thin. The canonical method lives in the repo and
wins over anything written here — if they disagree, follow the repo file and fix this
skill. One knowledge base, every session (local, resumed, or cloud-cloned).

## Read before touching anything

1. `tools/harvest-state.json` — resume numbers per source, per-source access notes.
   Update + commit it WITH the delta afterwards.
2. `tools/upkeep-routine.md` **step 2 (Growth)** — THE method: triage rules, the
   mandatory inventory→manifest→coverage sequence, claim-tagging at keep-time, and
   the full fetch-verification playbook (WebFetch → browser-UA curl → Wayback;
   exclude only when all three fail).
3. `tools/harvest-log/LEDGER.md` — narrative history; read the last pass's section,
   append a dated section after yours.
4. `tools/harvest-log/twir-290.md` — the manifest template.

## Non-negotiables (the method is in the routine — these are the tripping hazards)

- **Firsthand first, ALWAYS with `--manifest`** (`harvest firsthand --manifest`): a bare
  poll is deliberately dry; a `--manifest` run consumes events, so FINISH its triage in
  the same session or say loudly that you didn't (an untriaged manifest was once left
  stranded for a day).
- **⚡ Fired tripwires are mandatory work items** — do the `then:`, update the prose,
  remove the row; wire new watch/revisit caveats as tripwires at keep-time.
- **Per newsletter: `harvest prep <source>`**, judge ONLY the TODO rows; no url_pattern →
  `harvest inventory <issue-url>`, never an LLM summary of the page.
- **Fetch-verify every keep**; dedupe vs `skills/react-brain-mentor/entries/`.
- **Every external link gets a manifest row** carrying its URL: `kept` / `already-held` /
  `skipped` (reason class + reopen signal for cap/pre-ship/too-early).
- **Keeps land in `entries/<ID>.yaml`** (bump `updated:`); a NEW entry needs the full
  wiring listed in the routine; bump `sources_digested`.
- **Advocate pass over your own skips is mandatory**, then the spot-check of the
  previous issue's manifest (all `cap` skips + 2 random).
- **Gates before commit**: `harvest coverage` = 0 · `harvest verify-diff --base=main` = 0
  · `harvest watchlist` reviewed · `npm test` green. On a Thursday, re-probe React
  Status before declaring the pass complete (it publishes Thursdays; #486 precedent).
- **One commit**: delta + manifests + `harvest-state.json` + LEDGER note together.

## Ledger (in-repo since 2026-08-07)

Append the dated narrative section to `tools/harvest-log/LEDGER.md` — local and
cloud runs alike (it travels with the branch/PR). Cloud runs summarize in the PR
description too. No session-memory ledger steps remain; the memory files are pointers.

## Calibration

Typical yield per issue: ~one gap-filling entry OR a few verified status-flips +
2-3 readings — newsletters heavily corroborate each other, so a small delta is a
sign of health, not laziness. The manifest is what proves the difference.
