# react-brain tools

The **executable** layer of react-brain: the encyclopedia (index `../skills/react-brain-mentor/
encyclopedia.yaml` + one file per entry in `../skills/react-brain-mentor/entries/`) is
machine-readable knowledge; these tools *run* it against real code, let it *learn* from real
code, and keep it *alive* over time. All share one detection core, so there is no drift
between them.

```
detect.mjs   ── shared core: encyclopedia loader + detection (deps + source) + intent resolver
stack        ── knowledge → new project  (compose a greenfield stack from intent)
doctor       ── knowledge → code   (advise an existing repo; --json for agents)
evidence     ── code → knowledge   (correct the corpus from real repos)
pulse        ── time / autonomy    (keep the corpus healthy + watch for drift)
calibrate    ── trust / track record (score the corpus's predictions vs its confidence)
signals      ── trust / empirical  (recommendations vs live npm downloads + staleness)
census       ── trust / observed   (adoption measured in shipped production OSS apps)
learn        ── knowledge → human  (a repo-personalized learning path)
lint         ── trust / invariants (mechanized corpus schema + reachability checks)
mcp-server   ── distribution       (the corpus as MCP tools for any coding agent)
```

> YAML loads via the `yaml` npm dep (python3+pyyaml shim as zero-install fallback). The
> detection table is fully data-driven: each entry declares its own `detect:` (package
> signals) and `detect_source:` (regex signals over repo source) — adding an entry never
> touches the tools. `npm test` = `lint` + the golden-fixture eval (`../tests/eval.mjs`).

## `react-brain-stack.mjs` — knowledge → new project
The **forward** direction the suite was missing. Every other tool is retrospective (it reads
an existing repo); `stack` answers the encyclopedia's headline verb — *"what to use"* — at the
one moment `doctor` can't: **greenfield, before any deps exist.** Give it a one-line intent
(`--rn`/`--web`/`--both`, `--expo`, `--p2p`, `--stage=…`) and it (1) **filters** which domains
apply to the platform + stage, (2) **resolves** each entry's context-keyed `recommend.when`
against the intent via the shared `resolveRecommendation` primitive — so the corpus's own
P2P/web/Expo branches do the work (a P2P stack is told its data layer is N/A, not "missing"),
(3) **coherence-checks** the picks against each other (do they compose? Tailwind+shadcn pair;
Tamagui is all-in-one; Next owns web routing), and (4) emits an **install-ready, explained**
stack. Feature domains (media, payments, charts, …) are demand-driven, surfaced as a footer,
not picked.
```sh
node tools/react-brain-stack.mjs --rn --expo --p2p --stage=production
node tools/react-brain-stack.mjs --help          # all intent flags
```
Completes the lifecycle: **choose** (`stack`) → **assess** (`doctor`) → **master** (`learn`).
Dogfood: `stack --rn --p2p` reproduces ourpot's real Holepunch stack (Autobase, brittle, Metro,
Expo, react-native-svg, Reanimated, AsyncStorage); the deltas are genuine recs (add Zustand for
client state; RN 0.83→0.86).

## `react-brain-doctor.mjs` — knowledge → code
Reads a repo's `package.json`, maps actual deps to encyclopedia entries, and reports
current-choice vs the entry's context recommendation (fit: ✓ aligned / ~ contextual /
↗ review), plus gaps, a MODERNIZATION scan (legacy core RN APIs → modern swaps, from
modern-defaults.yaml), **SOURCE SIGNALS** (entry-owned `detect_source:` regexes — the smells
a dep-scan can't see: ScrollView rendering a mapped array, secrets in AsyncStorage,
fetch-in-useEffect, no error boundary at production stage), and a cross-app matrix.
**FOR YOUR STACK** (2026-07-13) surfaces readings whose tagged `claim:` applies to the repo —
each reading may carry `applies_when:` gates ({deps, absent_deps, platforms, stages}) so the
article library becomes repo-conditional advice with citations, not a link list. WORTH A LOOK
and GAPS rows carry **census field adoption** ("you ship X n/D; most-shipped Y m/D") from the
committed census snapshot, with honest denominators.
Deterministic; complements the LLM mentor (which owns the judgment dimensions).
```sh
node tools/react-brain-doctor.mjs ../../ledgerhr ../../ourpot/ourpot ../../bitbarter
node tools/react-brain-doctor.mjs . --json     # machine-readable — agents / mentor Phase 0
```

## `react-brain-map.mjs` — the repo pinboard (code location for agents)
One compact line per source file — corpus-domain tags (detector imports + per-file smell
hits), external imports, exports, LOC — plus an inverted DOMAINS→files index. An agent
answers "where does data fetching / forms / state live?" from ~15 tokens per file instead
of grepping the repo into its context window. Deterministic regex extraction (zero LLM,
zero network, no ingest step to cache): the Bytebell-style precompute-and-serve-compact
idea, minus the LLM summarizer and the database stack — react-brain's questions are
locate-and-classify, so the index card is extractable, not hallucinatable.
Division of labor: **doctor = what the stack is · map = where it lives.**
```sh
node tools/react-brain-map.mjs ../../ledgerhr            # pinboard (~7K tokens for 217 files)
node tools/react-brain-map.mjs . --dir=src/ --json       # filtered / machine-readable
```

## `react-brain-migrate.mjs` — the sequenced upgrade planner
briefing = what moved · doctor = where you stand · **migrate = the plan.** Installed
versions × per-entry `migrate:` rules (verified corpus facts: dead services, deprecations,
supersessions, version ladders — each with receipts) + the modern-defaults source scan,
sequenced into phases: DO FIRST (dead + gates others wait on) → deprecated/superseded →
upgrades → blocked-until-gate (each blocked step names the exact requirement and installed
version). Rules live in `entries/<ID>.yaml` `migrate:` (lint-validated), so the planner
grows with every harvest and never touches tool code.
```sh
node tools/react-brain-migrate.mjs ../../ourpot/ourpot          # phased plan with receipts
node tools/react-brain-migrate.mjs . --json                     # machine-readable
```

## `react-brain-review.mjs` — diff-scoped corpus review (the CI gate)
doctor reviews the repo; **review reviews the change.** Dependency delta vs `--base`
(default HEAD): adds the corpus marks dead/deprecated BLOCK with receipts (adding
CodePush in 2026 fails CI); superseded/↗-fit adds warn with the context pick; adds that
trigger a tagged reading claim surface it. Changed source files: detect_source smells and
legacy core-RN-API imports flag only when INTRODUCED by the diff (match the new version,
absent at base) — pre-existing debt in a touched file never nags. `--ci` exits 1 on
blocking only.
```sh
node tools/react-brain-review.mjs . --base=origin/main --ci    # PR gate
node tools/react-brain-review.mjs .                            # review uncommitted work
```

## `react-brain-evidence.mjs` — code → knowledge
The inverse: runs detection across a *corpus* of repos and feeds the aggregate back at the
corpus — §1 MISSING (deps with no entry = blind spots), §2 CONTRADICTION (real choice ≠
default), §3 EVIDENCE (field adoption per entry). Makes the encyclopedia self-correct from
production code instead of only newsletters. Evidence is **derived** (regenerate), not
stored; only *corrections* (knowledge learned) get written back to the YAML.
```sh
node tools/react-brain-evidence.mjs ../ledgerhr ../ourpot ../bitbarter
```

## `react-brain-pulse.mjs` — time / autonomy
Turns the corpus from a snapshot into a self-maintaining system. §1 LINK HEALTH (every
reading/source URL: ok / DEAD / blocked / unreachable), §2 STALENESS (`updated:` age +
undated entries), §3 DRIFT (detect across repos, diff vs a stored baseline). **Proposes;
never rewrites.**
```sh
node tools/react-brain-pulse.mjs --today=YYYY-MM-DD ../ledgerhr ../ourpot ../bitbarter
# flags: --no-links (skip network), --today=… (deterministic age math)
# writes tools/.pulse-baseline.json for drift detection on the next run
```
The **agentic growth half** (pull new newsletter issues + verify + propose a delta) is
`pulse-routine.md` — wire it into `/schedule` (weekly) for full autonomy.

## `react-brain-harvest.mjs` + `react-brain-firsthand.mjs` — deterministic acquisition
Closes the two invisible failure points of knowledge acquisition. (1) The LLM
extraction layer decided what the harvester even saw — so **inventory** lists every
link on an issue page mechanically (handles minified/unquoted hrefs), **coverage**
set-differences the page against the issue's disposition manifest in
`tools/harvest-log/` (an unaccounted link = exit 1), and **watchlist** aggregates
URLs skipped in ≥2 manifests + standing reopen signals, so `cap`/`pre-ship` skips
are deferred, not terminal. (2) Newsletters are weekly, editor-filtered batches —
so **firsthand** derives a watch graph FROM the corpus itself (detect rows → ~190
npm packages' dist-tags + deprecation flags; sources/readings → GitHub releases
feeds; hosts cited ≥2× → author blog RSS, with well-known-path probing for
docusaurus-style sites) and diffs it against `.firsthand-state.json` (committed,
like the other baselines). Known-entity events arrive with zero editorial filter
and zero latency, routed by entry; newsletters demote to what they're
irreplaceable for — unknown unknowns. Zero LLM, zero deps throughout.
(3) "Verified" was a claim the harvester wrote — **verify-diff** makes it a
status CI computes: every URL the branch ADDS (entries, docs, manifest `kept`
rows) is re-verified (direct fetch → Wayback; registry receipts checked for
existence; deprecation claims cross-checked against the firsthand npm flags),
and changed manifests with an `issue:` header get coverage re-run.
`.github/workflows/harvest-verify.yml` enforces it on every harvest PR — the
guardrail under the weekly cloud routine. Shared primitives live in
`harvest-lib.mjs`.
```sh
node tools/react-brain-harvest.mjs firsthand            # poll + diff (~45s; --graph = no network)
node tools/react-brain-harvest.mjs inventory https://thisweekinreact.com/newsletter/290
node tools/react-brain-harvest.mjs coverage <issue-url> tools/harvest-log/twir-290.md
node tools/react-brain-harvest.mjs verify-diff --base=main
node tools/react-brain-harvest.mjs watchlist
```
The manifest convention + spot-check discipline live in `upkeep-routine.md` (step 2).

## `react-brain-learn.mjs` — knowledge → human
The **Tutorial pillar, made adaptive.** A learning path isn't authored — it's *computed*
as **(encyclopedia graph) × (your repo)**, which no other React learning resource can do
because none is machine-readable. Reuses `detect.mjs` (your stack + maturity stage) and the
doctor's gap/divergence/aligned classification, then turns each relevant domain into a
learning **step**: why it matters to *you* · the reviewed Explanation (the *why*) · canonical
reading · the depth skill to go deeper · a concrete exercise against your *own* code. Ordered
by the pedagogical spine (foundations → architecture → ui → native → ops → ai), priced by
priority (gap > revisit > consolidate), and **calibrated to stage** (won't push
security/observability onto a prototype). Honors the corpus's context-keying — e.g. a P2P repo
won't be told it "lacks a server-cache lib" (no remote to cache).
```sh
node tools/react-brain-learn.mjs ../ourpot
# flags: --stage=prototype|mvp|production|scale (override the guess), --full (widen gaps)
```
It is the human-facing sibling of the corpus/repo tools: doctor asks *where is this repo
now*, pulse *is the corpus fresh*, evidence *is the corpus complete*, challenge *is it right* —
`learn` asks **how does this person get from here to mastery**.

## `cli.mjs` — unified entry / `npx`
One command over the whole suite. Published as the `react-brain` bin, so any agent or dev
can run it on any repo without cloning:
```sh
npx react-brain stack --rn --expo --p2p  # compose a greenfield stack from intent (no repo)
npx react-brain doctor .                 # advise this repo
npx react-brain learn .                  # a personalized learning path for this repo
npx react-brain query "data fetching"    # look up an entry's recommendation
npx react-brain evidence ./apps/*        # corpus self-audit across a corpus
npx react-brain pulse --today=2026-06-25 .   # health + drift
npx react-brain calibrate                # the encyclopedia's scored track record
npx react-brain signals                  # recommendations vs live npm reality
```
Consumers get the `yaml` npm dep automatically (zero setup); in-repo dev falls back to a
`python3 + pyyaml` shim, so the tools run here with no `npm install`.

## `react-brain-calibrate.mjs` — trust / track record
The **capstone** trust primitive. completeness/freshness/correctness all ask "is the corpus
right?"; calibrate asks the deeper one none of them can: *"is it right RELIABLY — and does its
`confidence` field mean anything?"* Superforecasting applied to a knowledge base: every
`recommend.default` becomes a dated, falsifiable **prediction** with a check-by horizon
(shorter for low-confidence/fast-moving domains); the `challenge` routine resolves them
(**held / weakened / overturned**); calibrate joins the two and **scores calibration per
confidence tier** — turning `confidence` from an assertion into a measurement. It's the first
React resource that publishes its own hit rate.
```sh
node tools/react-brain-calibrate.mjs --seed                       # one prediction per entry
node tools/react-brain-calibrate.mjs --record RB-E-STATE held "…" # a challenge verdict (append-only)
node tools/react-brain-calibrate.mjs --today=2026-06-25           # the scorecard + check-due list
```
Ledger: `tools/predictions.jsonl` (append-only history; ships as the credibility artifact). The
`check-due` list tells the autonomy layer *which* entries `challenge` should re-examine next.
First scorecard: high tier 80% (3 held, 2 weakened), medium/low honestly "unproven" — the score
earns its meaning as challenge runs accumulate.

The track record is read from the shared core (`detect.mjs` `trackRecord()`), so it surfaces
**inline** in the consumer tools wherever a verdict has been earned: `stack` annotates each pick
(`… · track: ✓ held`), `doctor` adds a `track` column to the detected-stack table, and `learn`
tags each step header. Unresolved entries show nothing — the badge is earned, not decorative.

## `react-brain-signals.mjs` — trust / empirical
The **external anchor**. Every other primitive is self-refereed — evidence (vs 3 repos),
challenge (an LLM arguing with itself), calibrate (scoring its own verdicts), pulse (link
liveness). `signals` is the one check against the *outside world*: it resolves each entry's
options to npm packages (reusing `DETECTORS`), fetches **weekly downloads + last-publish**, and
flags where editorial opinion and live data diverge — **TRAILING** (a recommended default badly
out-downloaded by an alternative), **STALE** (a default silent >12mo), **CLAIM** (an entry calls
a lib "maintenance/deprecated" but it just shipped). It also automates the quantitative half of
the manual verification passes — zero LLM.
```sh
node tools/react-brain-signals.mjs               # fetch + report + snapshot
node tools/react-brain-signals.mjs --record      # also log CLAIM contradictions to the ledger
node tools/react-brain-signals.mjs --list        # resolve packages only (no network)
node tools/react-brain-signals.mjs --no-registry # downloads only (skip last-publish)
```
Uses the npm **bulk** downloads endpoint (one call per ≤128 unscoped pkgs) to dodge rate limits;
writes `tools/.signals-baseline.json` so later runs show ↑/↓ trends (the pulse pattern). Reports
fetch **coverage** so a partial run is visible, never silent. First live run flagged 8 (e.g.
styled-components labelled "maintenance" but freshly published; moti/victory/react-native-keychain
gone quiet).

**Closing the loop into `calibrate`.** A confirmed **CLAIM** is a hard, deterministic contradiction
(the corpus says maintenance; npm says it just shipped), so `--record` appends it to the prediction
ledger as a `weakened` verdict (propose-only without the flag, per the project ethos; idempotent;
the note carries the evidence). It's CLAIM-only — TRAILING/STALE are softer and stay printed. So
a live-data divergence flows straight into the track record and then surfaces inline (`track: ~
weakened`) in `stack`/`doctor`/`learn`: **live npm → calibrate → every recommendation.**

## `react-brain-decide.mjs` — decisions with receipts (LIVING ADRs)
Turns a recommendation into the artifact teams actually need: an **Architecture Decision
Record** with the full evidence chain — your repo's context resolved through the corpus
(which when-clause fired and why), the candidate table, primary sources with verified-on
dates, the pick's **calibration track record**, and a live-npm signals snapshot. The
radical part is the machine-readable premise block in the frontmatter (entry id ·
entry_updated · prediction check_by): **`doctor` re-checks every record in `docs/adr/`**
and flags when the premises MOVE — entry re-verified since the decision, prediction
resolved weakened/overturned, or the review horizon passed. ADRs everywhere rot silently;
these know when they expire.
```sh
node tools/react-brain-decide.mjs state .            # writes docs/adr/NNN-state.md
node tools/react-brain-decide.mjs "data fetching" . --stdout
```

## `react-brain-bench.mjs` — the LLM STALENESS BENCHMARK
The thesis, weaponized: LLMs distribute rotted React advice at scale, and the corpus is a
dated, verified answer key that can **measure the rot**. The bank (`../bench/questions.yaml`)
derives every question from a verified corpus fact; grading is a **deterministic regex
rubric** (fresh-wins ordering, hedge detection — no judge model, transcripts published).
Headline metric: **confidently-stale%** (asserting the outdated world without hedging).
The `--with-corpus` arm injects the relevant entry as context — simulating an agent on the
MCP server — and the fresh% delta quantifies what the maintained knowledge layer is worth.
```sh
node tools/react-brain-bench.mjs --list
node tools/react-brain-bench.mjs --run --model=claude-sonnet-5              # needs ANTHROPIC_API_KEY
node tools/react-brain-bench.mjs --run --model=claude-sonnet-5 --with-corpus
```
Results land in `bench/results/*.json` (committed; the site's /benchmark leaderboard renders
whatever exists). Every weekly harvest re-verifies the answer key, so the benchmark
self-refreshes — models drift staler against it over time.

## `react-brain-lint.mjs` — trust / invariants
Every structural rule that used to live in session discipline, mechanized and offline:
per-entry schema (required fields, status/confidence enums, `reviewed` ⇒ doc + sources,
doc file exists, the every-entry-has-reading invariant), TOC consistency, **reachability**
(every category visible to the mentor via assessment_dimensions ∪ capability_map — the
orphan check), detect-pkg uniqueness across entries, `detect_source` regexes compile,
duplicate URLs within a list, and stale count claims in prose (warns). Exit 1 on errors.
Run after **any** corpus edit; `npm test` runs it first.
```sh
node tools/react-brain-lint.mjs        # or: npx react-brain lint · npm run lint
```

## `mcp-server.mjs` — distribution / agents
The encyclopedia as **MCP tools** for any coding agent (zero-dep stdio JSON-RPC — no SDK).
`capsules` (a ~40-line orientation index — the token-efficient way in), `query` (one full
entry on demand), `recommend` (context-resolved via the shared resolver), `doctor` (repo
analysis as JSON), `stack` (greenfield plan). `.mcp.json` registers it for Claude Code in
this repo; anywhere else:
```sh
claude mcp add react-brain -- node <repo>/tools/mcp-server.mjs
```

## `../tests/eval.mjs` — golden-fixture eval (quality regression)
Turns "the dry-run looked right" into assertions that run on every change: four committed
fixtures (rn-smells, web-clean, p2p-pear, prod-no-boundary) checked via `doctor --json`
(detection, fit, signals, stage heuristic, absent-rules), plus search routing, intent
resolution (DATA+p2p → n/a), stack composition, and the MCP handshake. `npm test` = lint + eval.

## `challenge-routine.md` — adversarial validation (correctness)
The judgment check: a challenger steelmans the case *against* each recommendation and tests
it vs current reality + evidence → SURVIVES / WEAKENED / OVERTURNED (propose-only; default
SURVIVES; OVERTURN needs concrete current evidence). Run on the highest-stakes reviewed
entries. Pairs with the dating pass (which checks *facts*, not *judgment*).

## Autonomy — keeping it alive
- **Tier 1 (deterministic, now):** `bash tools/install-cron.sh` wires a weekly local cron
  that runs `pulse` and logs to `tools/pulse.log`. Zero LLM, zero cost.
- **Tier 2 (agentic, weekly):** `upkeep-routine.md` — growth (newsletter harvest) + evidence
  + rotating challenge, run by a local headless agent. (Cloud `/schedule` can't see the local
  repo / has no remote to commit to — keep upkeep local.)

## The arc
snapshot → **executable** (doctor) → **self-correcting** (evidence, completeness) →
**fresh** (pulse) → **stress-tested** (challenge, correctness) → **accountable** (calibrate,
track record) → **distributed** (cli/npx) → **autonomous** (cron + upkeep-routine).
Knowledge ⇄ code, both directions, kept true over time.

The trust primitives, complete: **completeness** (evidence) · **freshness** (pulse) ·
**correctness** (challenge) · **calibration** (calibrate — is `confidence` earned?) ·
**empirical grounding** (signals — do live npm metrics back the picks?). The first four are
self-refereed; `signals` is the external anchor that keeps them honest.

And the **user-facing lifecycle**, one verb per moment of a project's life:
**choose** (`stack` — greenfield, no repo) → **assess** (`doctor` — you have a stack) →
**master** (`learn` — own it). `stack`/`doctor`/`learn` all run the same intent resolver +
detection core, so they never disagree about what a recommendation means.

## `react-brain census` — observed adoption in shipped apps

`signals` asks npm; **census asks shipped software**. Downloads are gameable (the 2026-07
TanStack-Start "60x surge" was one vendor's CI); the dependency choices of real, active,
production OSS apps are not. Census fetches the `package.json` of a curated cohort
(`tools/census-cohort.json` — 20 apps: Bluesky, Expensify, Mattermost, Rainbow, Ledger Live,
Cal.com, Grafana, Signal Desktop…), runs the corpus's own detectors over them, and reports
per-entry adoption with honest denominators (RN-only entries measure against RN apps).
Snapshots diff against `tools/.census-baseline.json` (the pulse pattern), so repeated runs
yield adoption *velocity* — "the cohort is migrating off X" as an observed fact. Read-only;
feeds challenge (evidence beats download stats), signals (a second axis), and entry notes.

```sh
npx react-brain census            # adoption table + changes since last snapshot
npx react-brain census --json     # machine-readable aggregate
```

## `react-brain briefing <repo>` — the personalized, verified ecosystem changelog

Six newsletters go in; one repo-specific page comes out. The corpus is a dated, fetch-verified
stream of ecosystem *changes* (every entry edit is a git commit); `detect` knows what a repo
uses. `briefing` intersects them: **what moved under YOUR stack since you last looked** —
an `⚡ ACTION` section when a change explicitly names something the repo ships (deprecation,
retirement, platform floor), `📦 CHANGES IN YOUR STACK` for the rest of the matched entries,
and a `🔭 RADAR` of platform-relevant new coverage. Items carry the entry's newly-added source
URLs as receipts. Deterministic (git + structural YAML diff, no LLM); per-repo resume state in
`tools/.briefing-state.json`. The triad: **doctor = position · census = field · briefing =
velocity.**

```sh
npx react-brain briefing ../my-app                 # since the last briefing (or 14 days)
npx react-brain briefing ../my-app --since=2026-07-01 --write   # + commitable BRIEFING.md
```
