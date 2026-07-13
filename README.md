<img src="https://heart-it.github.io/react-brain/logo.png" alt="react-brain — circuit-brain logo" width="104" align="right" />

# react-brain

**Engineering decisions for React & React Native, with receipts.**

A continuously verified decision corpus — every recommendation context-keyed,
every load-bearing fact dated and source-verified, every default a forecast
graded in public — served as a [website](https://heart-it.github.io/react-brain/),
a zero-install CLI, and a 9-tool MCP server for coding agents
(npm: [`@heart-it/react-brain`](https://www.npmjs.com/package/@heart-it/react-brain)).
Created by [heartit](https://heartit.tech/). Under the hood: an **ecosystem encyclopedia**, its
**tutorial**, and a Claude **mentor skill** that applies it to real projects.

The name: it's a *brain* of React-ecosystem knowledge — which libraries, which
patterns, the tradeoffs, what to use when. The three pillars are coupled: we
curate the knowledge, teach it, and encode it into a mentor that guides *other*
projects.

## The three pillars

| Pillar | What it is | Status |
|--------|-----------|--------|
| 🧠 **Encyclopedia** | Curated knowledge of the React + RN ecosystem — state, routing, data, lists, forms, styling, testing, native, OTA, AI tooling… with context-keyed recommendations and tradeoffs, synthesized from 6 cross-checked newsletters. | 42-entry grouped index ([`encyclopedia.yaml`](skills/react-brain-mentor/encyclopedia.yaml) + one file per entry in [`entries/`](skills/react-brain-mentor/entries/)) with `recommend` blocks, curated `reading` (and A/V `watching`); **24 `reviewed` long-form entries** in [`encyclopedia/`](encyclopedia/) |
| 📚 **Tutorial** | The guided learning path through the encyclopedia (Diataxis-structured). | **first form shipped** as the *adaptive* `react-brain learn` path — a curriculum computed as (encyclopedia graph) × your repo, not static prose ([`tools/react-brain-learn.mjs`](tools/react-brain-learn.mjs)) |
| 🧠 **Mentor skill** | A Claude skill that reads any React/RN project and gives a ranked, grounded improvement roadmap — routes to depth knowledge skills **and** cites the encyclopedia for breadth. | **draft — started here** |

## Executable layer (CLI)

The encyclopedia is machine-readable, so it also *runs*. One `npx @heart-it/react-brain`
command, one verb per moment of a project's life (see [`tools/`](tools/)):

| verb | command | moment |
|------|---------|--------|
| **choose** | `react-brain stack --rn --expo --p2p` | greenfield — compose a stack from intent, no repo |
| **assess** | `react-brain doctor .` (`--json` for agents) | you have a stack — fit vs the encyclopedia + source signals |
| **master** | `react-brain learn .` | own it — a repo-personalized learning path |
| **decide** | `react-brain decide state .` | commit the choice — a living ADR with receipts, premise-checked by `doctor` over time |
| query | `react-brain query "data fetching"` | look up one entry's recommendation |
| **bench** | `react-brain bench --run --model=…` | score an LLM's React advice against the corpus (staleness benchmark; `--with-corpus` shows the delta) |
| **census** | `react-brain census` | observed adoption across 34 production OSS apps (Bluesky, Expensify, MetaMask, Grafana…) — the ungameable counterpart to download stats, with snapshot-to-snapshot adoption velocity |
| **briefing** | `react-brain briefing <repo>` | what changed in the ecosystem that touches *your* stack — the corpus diff × your detected deps, receipts included (doctor = position · census = field · briefing = velocity) |
| *(corpus upkeep)* | `evidence` · `pulse` · `calibrate` · `signals` · `lint` | self-audit · freshness · scored track record · live-npm reality check · mechanized invariants |

**For agents (MCP):** `tools/mcp-server.mjs` serves the corpus as MCP tools — `capsules`
(compact index) / `query` / `recommend` / `doctor` / `decide` / `stack` — zero-dep stdio; `.mcp.json`
wires it for Claude Code here. From any other project:
`claude mcp add react-brain -- npx -y @heart-it/react-brain mcp`.

**Quality gate:** `npm test` = `lint` (schema, TOC, mentor-reachability, dup-URL, detect
invariants) + `tests/eval.mjs` (golden fixtures asserting detection/fit/signals/routing/stack/MCP).
Run after any corpus edit. Layout: `encyclopedia.yaml` is the index; entries live one-per-file
in `skills/react-brain-mentor/entries/<ID>.yaml`, each owning its `detect:`/`detect_source:` signals.

**Website ([`site/`](site/)):** the encyclopedia *rendered* for humans — an Astro static site
generated from the same YAML at build time (nothing forks). Entry pages (decision + options +
context-keyed recommendation + verified dates), a library browser joined to live-npm download
signals, the curated-reading index (annotation + link out — originals are never republished),
the **calibration scorecard** (the corpus's published hit rate), and an in-browser **doctor**
(paste a package.json → ecosystem-fit report, fully client-side).
`cd site && npm install && npm run dev`. One corpus, three surfaces: site (humans) ·
CLI/npm (repos) · MCP (agents).

`stack`/`doctor`/`learn` share one intent-resolver + detection core, so they never
disagree about what a recommendation means.

## Mentor skill

Lives in [`skills/react-brain-mentor/`](skills/react-brain-mentor/). It:

- Reads a whole project, infers its **platform(s)** and **maturity stage**.
- Produces a **ranked** roadmap (impact × effort) where every item is grounded
  in a real rule/principle/encyclopedia entry, is actionable, and teaches *why*.
- **Depth:** routes to the existing Claude knowledge skills (it does not duplicate
  their rules) and **defers** to `/review` for pass/fail gating.
- **Breadth:** cites the **encyclopedia** for ecosystem-selection advice. Entries
  live in [`encyclopedia.yaml`](skills/react-brain-mentor/encyclopedia.yaml) —
  update that one file (move entries `stub → drafted → reviewed`) and the mentor's
  advice grows with it. Recommendations are *context-keyed*, never absolute.

See [`skills/react-brain-mentor/SKILL.md`](skills/react-brain-mentor/SKILL.md)
for the full design and install instructions.

## Decisions (2026-06-17)

- **Nature of react-brain:** a React-ecosystem *encyclopedia* (knowledge corpus),
  not a ship-these-primitives npm library. Domain breadth grows over time.
- **Mentor scope:** general React + RN mentor that *also* cites the encyclopedia.
- **Build order:** mentor skill first; encyclopedia entries + tutorial follow.
