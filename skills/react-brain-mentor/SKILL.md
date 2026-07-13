---
name: react-brain-mentor
description: >
  Forward-looking mentor for React and React Native projects, powered by the
  react-brain ecosystem encyclopedia. Reads a whole codebase, infers its
  platform(s) and maturity stage, then produces a RANKED, grounded improvement
  roadmap that teaches the why behind each suggestion — not a pass/fail gate.
  Orchestrates the existing knowledge skills (react-native-best-practices,
  react-native-jsi, engineering-principles, design-systems-governance,
  parity-verify, diataxis-documentation) for DEPTH rather than re-encoding their
  rules, and cites the react-brain encyclopedia for BREADTH — ecosystem-selection
  guidance (which router/state/data/styling/forms library, and when). Use when
  the user asks "how can I improve this", "what should I do next", "mentor me",
  "level up this codebase", evaluates an ecosystem choice, or wants a health read
  + roadmap for a React/RN project. For a pass/fail gate on a specific diff, use
  `review` instead.
version: 0.3.0
status: draft
type: workflow
scope: [function, module, component, system, project]
domains: [mentorship, architecture, performance, design_systems, testing, cross_platform, dx]
languages: [js, ts, tsx, jsx]
---

# react-brain Mentor (v0.3.0 — draft)

**Reference specification:** @react-brain-mentor.yaml
**Encyclopedia index:** @encyclopedia.yaml
**Modernization checklist:** @modern-defaults.yaml — legacy RN core APIs (Animated,
StyleSheet, FlatList, AsyncStorage, SafeAreaView, Image, TouchableOpacity) → their
modern replacements, each keyed to an entry or depth skill. Consult during assessment;
apply per the same `strength` (deprecated/superseded/context) + no-churn discipline.

`react-brain` is a React-ecosystem **encyclopedia** — a curated body of knowledge
about the React + React Native world (which libraries, which patterns, the
tradeoffs, what to use when). This skill is that encyclopedia made **actionable**
for a specific project.

A mentor, not a gate. Where `/review` answers *"is this diff OK to ship?"* with a
verdict, this skill answers *"where should this project go next, and how do I
get there?"* with a ranked, teaching roadmap.

## What makes it a mentor (not a linter)

Every suggestion it emits is **grounded** (cites a skill rule, principle, or
react-brain encyclopedia entry), **ranked** (impact × effort), **actionable**
(ends with a concrete next step), and **teaches the why** (one plain sentence on
the cost of ignoring it). It leads with what the project does *well*, and it
calibrates to the project's **maturity stage** — it won't push CI hardening or a
library migration onto a prototype. See `mentor_principles` (MP-*) in the YAML.

## Breadth vs depth — it duplicates neither

Two knowledge sources, cleanly divided:

- **Depth** — your existing knowledge skills own in-domain rules. The mentor
  discovers and routes to them the same way `/review` does: globbing
  `~/.claude/skills/*/SKILL.md` and reading each composition block. (RN perf →
  `react-native-best-practices`; architecture → `engineering-principles`; JSI →
  `react-native-jsi`; tokens/a11y → `design-systems-governance`; …)
- **Breadth** — the **react-brain encyclopedia** (`encyclopedia.yaml`) owns
  ecosystem *selection*: which router/state/data/styling/forms library, the
  tradeoffs, and the **context-keyed** recommendation. When an entry touches a
  depth domain it names a `defer_to_skill` instead of restating rules.

Each assessment dimension maps to a depth `owner` skill **and** an
`encyclopedia_cat`. The mentor adds the layer neither has: whole-project
trajectory, prioritization, and teaching.

## When to use

- "How can I improve this?", "what should I do next?", "mentor me", "level up this codebase"
- Onboarding to an unfamiliar React/RN codebase and wanting a health read + roadmap
- Deciding *what to refactor/adopt next, and in what order*
- Evaluating an ecosystem choice (which state/router/data/forms/styling lib) against the encyclopedia

## When NOT to use

- Pass/fail gate-keeping of a diff or PR → use `review` (it issues SHIP/REVISE)
- Deep enforcement in one domain → invoke that knowledge skill directly
- Writing encyclopedia entries / tutorial / docs → use `diataxis-documentation`

## How to use

Read `react-brain-mentor.yaml` and run its `protocol` (Phase 0 understand →
Phase 1 route to depth skills → Phase 2 assess → Phase 3 encyclopedia match →
Phase 4 prioritize → Phase 5 report). Honor every `MP-*` principle and pass all
`quality_gates` before emitting the report. The output template lives in the
YAML's `output` section.

### The encyclopedia hook (how this grows)

`encyclopedia.yaml` is the machine-readable **index** (meta + groups TOC +
mentor_hints); each entry lives in its own file, `entries/<ID>.yaml`. As entries
are written, edit only the entry's file — move it along the `stub → drafted →
reviewed` ladder, and (for long-form) add a matching `encyclopedia/<id>.md`. A
NEW entry = a new file + a TOC slot, with its `detect:` / `detect_source:`
signals declared **in the entry itself** (the tools assemble their detection
tables from them — no tool changes). Run `npm test` (lint invariants + golden
eval) after any corpus edit. The mentor's breadth recommendations grow
automatically. Recommendations are **context-keyed**, not absolute — an entry
says *"for server state at MVP+, X wins on invalidation,"* never *"X is best."*

**Current state (2026-07-13):** 42 entries across 6 groups, all `drafted`+ (0 stubs), 24
`reviewed` with long-form `encyclopedia/<id>.md`, every entry with curated reading (plus an
optional A/V `watching` list), synthesized from 6 cross-checked newsletters. Entries
are reached two ways so none are orphaned (mechanized by `react-brain lint`): **cross-cutting**
domains via the YAML's `assessment_dimensions`, and **feature/capability** domains via its
`capability_map` (detected dep/need → entry) — so niche areas (media, maps, payments, editors,
charts, i18n, desktop, on-device AI…) are scanned only when the project actually has them.
Readings may carry `claim:` + `applies_when:` tags, which `doctor` matches against the repo
(FOR YOUR STACK / `advice[]` in --json) — pre-grounded, citation-ready suggestions — and
doctor joins the production-app **census** for you-vs-field adoption with honest denominators.
For agents, the corpus is also consumable as **MCP tools** (`tools/mcp-server.mjs`: capsules /
query / recommend / doctor / decide / stack / map / migrate / review). `query` defaults to a ~100-token capsule
(depth:"full" for the whole entry); `map` is the repo pinboard — one deterministic index line
per source file so agents locate code (~15 tokens/file) instead of grepping it into context.
Phase 0 treats `react-brain doctor <repo> --json` as ground truth for platform/stage/deps and
`map` as ground truth for where each domain lives.

## Relationship to existing skills

- **Defers to** `review` for pass/fail gating of a specific diff.
- **Orchestrates / cites** `engineering-principles`, `react-native-best-practices`,
  `react-native-jsi`, `design-systems-governance`, `typographic-grid-foundations`,
  `parity-verify`, `diataxis-documentation`, `agentic-engineering-patterns`.
- **Does not** re-encode their rules — it routes and cites.

## Status: draft

Intentionally `draft`, not `sealed`: the encyclopedia grows over time and this
skill evolves with it. The stable contract is the *shape* (protocol, MP-*
principles, output format); the *content* (encyclopedia entries, routed skills)
grows.

## Install (to use as a live Claude skill)

This skill is a deliverable of the `react-brain` repo. To make it active in
Claude Code, symlink it into your skills directory:

```sh
ln -s "$(pwd)/skills/react-brain-mentor" ~/.claude/skills/react-brain-mentor
```

Then `/review` auto-discovers it via its composition block, or invoke the mentor
directly by asking for project suggestions.
