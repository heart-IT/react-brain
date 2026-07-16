# react-brain weekly upkeep — the autonomy plan

Keeps the corpus **fresh, complete, correct** with minimal hand-tending. Two tiers,
split by what can run without an LLM. Everything is **propose-only** for knowledge —
deterministic fixes (dead links) are safe to surface; recommendation changes stay a
human-reviewed diff.

> **Local vs cloud `/schedule` (updated 2026-07-06 — the repo now has a remote:**
> **github.com/heart-IT/react-brain):** anything that reads the SIBLING APPS
> (pulse drift, doctor, evidence, learn) stays **local** — ledgerhr/ourpot/bitbarter live
> only on this machine's filesystem. But corpus-only work is now cloud-schedulable: the
> weekly newsletter HARVEST + challenge can run as a cloud `/schedule` agent that clones
> the repo, edits `entries/<ID>.yaml`, runs `npm test`, and opens a **PR** (the propose-only
> guardrail, now enforced by review instead of trust). CI runs lint + the golden eval on
> every push/PR. Keep Tier 1 on the local cron; Tier 2 may go cloud when wanted.

---

## Tier 1 — deterministic health (automate NOW, zero agent, zero cost)

Just runs `react-brain pulse`: dead-link scan + staleness + drift. No LLM, no network
cost beyond HEAD requests. CONSOLIDATED 2026-07-16: Tier 1 (pulse + signals + census) now
runs as the deterministic pre-step of the weekly harvest — `tools/local-harvest.sh`
(launchd, Thu 09:00, installed via `bash tools/install-local-harvest.sh`). One scheduler,
one review branch; the old separate Monday cron is retired. Run any time by hand:

```sh
node tools/cli.mjs pulse --today=$(date +%F) ../../ledgerhr ../../ourpot/ourpot ../../bitbarter
```

(retired crontab line, for reference):

```cron
0 9 * * 1  cd <repo-root> && /usr/bin/env node tools/cli.mjs pulse --today=$(date +\%F) ../../ledgerhr ../../ourpot/ourpot ../../bitbarter >> tools/pulse.log 2>&1
```

Read `tools/pulse.log` weekly; act on DEAD links + undated/aging entries + drift.
After a harvest lands, `react-brain briefing ../../ledgerhr ../../ourpot/ourpot ../../bitbarter`
turns the week's corpus delta into a per-app action list (deterministic, cron-safe).

## Tier 2 — agentic upkeep (growth + correctness; weekly, LLM-driven)

Runs the harvest + adversarial passes. Needs an LLM agent + the repo, so run it via a
**local headless agent** on a cron, or invoke it manually when you have a few minutes:

```sh
# local headless run (example; adjust to your CLI):
cd <repo-root> && claude -p "$(cat tools/upkeep-routine.md)"
```

The agent should, in order:
1. **Health** — run Tier 1 (`react-brain pulse … `) and read the deltas.
   ► AUTONOMY: this whole Tier runs LOCALLY, unattended — `bash tools/install-local-harvest.sh`
   (launchd, Thu 09:00 local, catches up after sleep) runs a headless `claude -p` session
   through the /harvest skill on a propose-only `harvest/<date>` branch (no push, no GitHub
   App access; review = `git diff main...harvest/<date>`, merge --ff-only). The cloud/PR
   variant is PARKED by maintainer choice in tools/cloud-harvest-routine.json.

   > **Why propose-only** (ported from the retired pulse-routine.md, 2026-07-16): the
   > corpus's value is that it is *curated + verified*, not a popularity feed. Autonomy
   > keeps it fresh; the human-reviewed delta keeps it correct. Deterministic facts
   > (a 404 is a 404) are safe to auto-fix; judgments are not.

2. **Growth** — start with the FIRST-PARTY layer (added 2026-07-16): `react-brain harvest
   firsthand` polls the corpus-derived watch graph (npm dist-tags/deprecation flags for
   every detect-row package, GitHub releases for every cited repo, RSS for every author
   host cited ≥2×) and diffs vs the committed `.firsthand-state.json` — known-entity
   events (version lines, deprecations, author posts) come from here with zero editorial
   filter and zero latency; triage them with the same manifest discipline
   (`tools/harvest-log/firsthand-<date>.md`, `--manifest` writes the skeleton). ⚡ TRIPWIRE
   events (entry `tripwires:` — standing caveats as release conditions, e.g. "Rive line
   hits 1.0 → add the migrate rule") are MANDATORY work items: do the `then:`, update the
   prose, remove the fired row; new watch/revisit caveats get wired as tripwires at
   keep-time. THEN
   the newsletters — their irreplaceable job is
   UNKNOWN UNKNOWNS (new libs/domains the corpus doesn't track yet) + corroboration:
   from **`tools/harvest-state.json`** (in-repo
   resume state: last-processed issues + per-source access notes; update + commit after),
   fetch only NEW issues (This Week in React, RN Rewind, React Status, React Digest,
   Native Weekly, React Weekly),
   extract durable selection facts + canonical articles, **fetch-verify every URL**, map via the
   mentor's `capability_map`/`assessment_dimensions` (or flag a GAP). De-dupe vs existing.

   **Inventory FIRST, manifest, then the coverage gate (MANDATORY per issue, learned
   2026-07-16):** the LLM extraction layer was the last invisible failure point — a dropped
   item never even reached triage. So:
   - `react-brain harvest inventory <issue-url>` — the DETERMINISTIC link list (regex over
     HTML, handles unquoted minified hrefs — the quoted-only assumption once missed ~80% of
     a TWiR page). Build the manifest FROM this list, not from an LLM summary.
   - Write `tools/harvest-log/<source>-<issue>.md`: line 2 is `issue: <issue-url>` (lets CI
     re-run coverage; firsthand manifests use `issue: firsthand`), then EVERY external link
     gets a disposition row CARRYING ITS URL — `kept` (→ which entry/field), `already-held`
     (→ where), or `skipped` (reason class: corroboration · how-to · pre-ship · too-early ·
     cap · unverifiable · off-scope · sponsor). `cap`/`pre-ship`/`too-early` note the reopen
     signal that would flip them.
   - `react-brain harvest coverage <issue-url> <manifest.md>` must exit 0 — an unaccounted
     link is a red gate, not a silent hole.
   - `react-brain harvest verify-diff --base=main` must exit 0 before the PR/commit — the
     RECEIPTS gate: every URL the branch adds is machine re-verified (direct → Wayback;
     a Wayback-only receipt must say so in the text). CI enforces the same gate on harvest
     PRs (`.github/workflows/harvest-verify.yml`) — "verified" is computed, not claimed.
   - `react-brain harvest watchlist` — re-triage anything skipped in ≥2 issues and review
     the standing reopen signals.
   - **Advocate pass (each manifest, before the gates):** re-read the skip rows as a hostile
     reviewer arguing items back in — flip only for durable status changes, genuine gaps, or
     canonical uncovered-facet deep-dives. Evidence: the triage bench's measured failure is
     keep-aversion (56/100 baseline), and a fresh-context advocate arm scored +7 by
     recovering the two most consequential misses at one cheap over-keep (`harvest bench
     --advocate` reproduces the experiment; wrong flips are reviewable noise by design).
   - **Spot-check (each pass):** re-adjudicate ALL `cap` skips + 2 random skips from the
     PREVIOUS issue's manifest; corrections are committed amendments. (First run corrected
     2 of 2 examined reasons and reopened the react-compiler-explained + thoughtbot keeps.)
   - **Bench gold compounds automatically:** `harvest prep` freezes each issue's fixture at prep time (pre-harvest corpus by construction). Re-run `harvest bench` monthly across fixtures as n grows — that is when advocate-pass value and cheaper-model swaps become answerable.
   - **Model/prompt changes to the harvester get benched first:** `react-brain harvest
     bench --model=<id>` replays a frozen issue against its adjudicated manifest (judgment
     score; false skips ×3; corpus context pinned pre-harvest). Baseline on record:
     claude-sonnet-5 single-shot scored 59/100 on twir-290 — keep-averse (skipped all 8
     gold keeps), so the weekly agent's triage needs the full routine context, not a
     one-shot prompt; re-bench before trusting any cheaper model.
   Triage judgment is fallible; the manifest is what makes it REVIEWABLE — a wrong skip
   becomes a visible disagreement the maintainer can overturn instead of a silent miss.
   Commit the manifest WITH the delta.
   Strong TALKS/PODCASTS/VIDEOS go in the entry's optional `watching:` list (same shape as
   `reading`; verify the episode/video page exists + corroborates — never annotate unwatched
   content beyond what the verified page states).

   **When a kept reading/watching item has a repo-conditional lesson, TAG it:** add `claim:`
   (one sentence distilled from the `what:` — never a new assertion) + `applies_when:`
   ({deps, absent_deps, platforms, stages}; dep patterns use detect glob semantics). Tagged
   readings surface in doctor's FOR YOUR STACK section for matching repos. Lint enforces
   claim⇔applies_when pairing and the schema.

   **Fetch-verification playbook (learned 2026-07-09):**
   - `expo.dev/blog/*` is a JS shell (unfetchable) but **`expo.dev/changelog/sdk-NN` fetches
     fine** and usually carries the same load-bearing facts — source changelogs, not blog posts.
   - A 403 from WebFetch (callstack.com, developerway.com, …) is often bot-gating, not a
     paywall: retry with a **browser user-agent via curl** —
     `curl -sL -A "Mozilla/5.0 (Macintosh...) Chrome/126.0 Safari/537.36" <url>` — then verify
     against the extracted text. This recovered callstack.com articles previously excluded.
   - Version/date/deprecation facts: `registry.npmjs.org/<pkg>` JSON beats any article.
   - **Wayback fallback (learned 2026-07-16):** when WebFetch AND curl-UA both fail
     (Cloudflare JS walls — thoughtbot.com), query
     `archive.org/wayback/available?url=<url>` and curl the snapshot URL (note: WebFetch
     cannot reach web.archive.org — use curl). A reading verified via snapshot keeps the
     LIVE url + a "(content verified via Wayback snapshot <date>)" note in `what:` —
     same precedent as longho.dev's RSS-verified reading. This recovered the thoughtbot
     native-stack piece previously excluded as unverifiable.
   - Only exclude a candidate after WebFetch, curl-UA, AND the Wayback fallback all fail.
3. **Completeness** — run `react-brain evidence ../ledgerhr ../ourpot ../bitbarter`; note new
   blind spots / contradictions. Also run `react-brain census` — cohort adoption CHANGES since
   the last snapshot are evidence-grade signals (an app dropping/adopting a tracked lib
   outranks a download trend; feed notable deltas into challenge targets and entry notes).
4. **Correctness** — follow `tools/challenge-routine.md` on 2–3 rotating reviewed entries
   (oldest `updated:` first); record SURVIVES / WEAKENED / OVERTURNED.
5. **Emit ONE reviewable delta** — dead links, undated/aging entries, drift, proposed new
   entries/reading/status-flips (with verified sources), new gaps, challenge verdicts. Order by
   leverage. Apply only the deterministic fixes automatically; queue knowledge changes for review.
   Knowledge edits go in `skills/react-brain-mentor/entries/<ID>.yaml` (one file per entry; a NEW
   entry = new file + a TOC slot in encyclopedia.yaml + `detect:`/`detect_source:` rows in the file).
6. **Gate** — run `npm test` (lint invariants + the golden-fixture eval). A red gate means the
   delta broke a corpus invariant or a known-good behavior; fix before recording.
7. **Record** — update `tools/harvest-state.json` (last_processed + count + updated; lint
   cross-checks the counts against sources_digested) and commit it WITH the delta (repo is under
   git). Local sessions additionally append the narrative note to the maintainer's memory ledger;
   cloud runs put the narrative in the PR description instead.

## Cadence

Weekly matches the newsletters. A quiet week = a short report. Rotate the challenge so every
reviewed entry gets re-attacked a few times a year. Never recommend churn for novelty
(MP-VETTED-OVER-PROMOTION holds throughout).
