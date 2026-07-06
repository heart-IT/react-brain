# react-brain

A React + React Native **ecosystem encyclopedia**, its **tutorial**, and a Claude
**mentor skill** that applies the encyclopedia to real projects.

The name: it's a *brain* of React-ecosystem knowledge — which libraries, which
patterns, the tradeoffs, what to use when. The three pillars are coupled: we
curate the knowledge, teach it, and encode it into a mentor that guides *other*
projects.

## The three pillars

| Pillar | What it is | Status |
|--------|-----------|--------|
| 🧠 **Encyclopedia** | Curated knowledge of the React + RN ecosystem — state, routing, data, lists, forms, styling, testing, native… with context-keyed recommendations and tradeoffs. | 29-entry grouped index ([`encyclopedia.yaml`](skills/react-brain-mentor/encyclopedia.yaml)) with `recommend` blocks; **3 `reviewed` long-form entries** in [`encyclopedia/`](encyclopedia/) (state, data, cross-platform) |
| 📚 **Tutorial** | The guided learning path through the encyclopedia (Diataxis-structured). | **first form shipped** as the *adaptive* `react-brain learn` path — a curriculum computed as (encyclopedia graph) × your repo, not static prose ([`tools/react-brain-learn.mjs`](tools/react-brain-learn.mjs)) |
| 🧠 **Mentor skill** | A Claude skill that reads any React/RN project and gives a ranked, grounded improvement roadmap — routes to depth knowledge skills **and** cites the encyclopedia for breadth. | **draft — started here** |

## Executable layer (CLI)

The encyclopedia is machine-readable, so it also *runs*. One `npx react-brain`
command, one verb per moment of a project's life (see [`tools/`](tools/)):

| verb | command | moment |
|------|---------|--------|
| **choose** | `react-brain stack --rn --expo --p2p` | greenfield — compose a stack from intent, no repo |
| **assess** | `react-brain doctor .` | you have a stack — fit vs the encyclopedia |
| **master** | `react-brain learn .` | own it — a repo-personalized learning path |
| query | `react-brain query "data fetching"` | look up one entry's recommendation |
| *(corpus upkeep)* | `evidence` · `pulse` · `calibrate` · `signals` | self-audit · freshness · scored track record · live-npm reality check |

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
