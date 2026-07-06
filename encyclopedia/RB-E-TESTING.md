---
id: RB-E-TESTING
title: "About testing strategy & tooling in React & React Native"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-06-25
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-TESTING
defer_to_skill: agentic-engineering-patterns                  # TDD / what-to-test / verify discipline
related: [RB-E-DX, RB-E-DATA, RB-E-A11Y]
sources:
  - "https://reactnative.dev/blog/2026/04/07/react-native-0.85"
  - "https://kentcdodds.com/blog/write-tests"
---

# About testing strategy & tooling in React & React Native

> **Diataxis: Explanation.** This page builds *understanding* of how to think about testing —
> the reasoning behind the tool picks. It is not a tutorial, and the *discipline* (what to test,
> TDD, how much) is owned by the `agentic-engineering-patterns` skill. Read this for the *why*.

## The one idea that organises everything: confidence per effort

Don't start from "unit vs integration vs e2e." Start from the question every test silently
answers: **how much confidence does this buy, for how much cost to write and maintain?** That
ratio — not dogma about test types — is the organising principle, and it produces the
**Testing Trophy**: a few end-to-end tests, a strong middle of *integration* tests, fewer
isolated unit tests, with static typing/linting as the base. Integration tests dominate because
they exercise real component interactions (high confidence) without the brittleness of mock-
heavy unit tests or the slowness of full e2e.

Two corollaries fall straight out, and they drive the tool choices:

- **Test behaviour, not implementation.** Query by role/label like a user; don't assert on
  internal state or reach for `data-testid` as a crutch. Tests coupled to internals fail on
  refactors (false negatives) and pass on real breakage (false positives).
- **Mock at the boundary, not the module.** Stub the *network*, not your own functions, so the
  same mocks serve unit, integration, and dev.

## The default, and why

> **Unit/component:** Vitest (web) or Jest (RN) + React Testing Library.
> **E2E:** Playwright (web), Maestro (RN). **MSW** for API mocks; **Storybook** for component dev.

The platform fork is about fit, not quality: **Vitest** is faster and Vite-native on the web;
**Jest** remains the RN default (note: RN 0.85 moved the preset out of core — set
`preset: '@react-native/jest-preset'`, verified against the RN 0.85 blog). **React Testing
Library** is the constant on both because it *enforces* the behaviour-not-implementation rule by
construction. For e2e, **Playwright** owns the web; **Maestro** is Expo's recommendation for RN
(Expo archived its Detox support). **MSW** is the keystone that makes the Trophy practical — one
set of network mocks reused across every layer and in dev.

## The landscape, and when each one wins

**Jest / Vitest** — the unit/component runners. Vitest on the web (speed, Vite integration),
Jest on RN (default, ecosystem). Pick by platform, not preference.

**React Testing Library (14)** — behaviour-first component testing; v14 adds React 19 support and
async APIs. It's not just a tool but a *philosophy enforcer* — its API makes implementation-
detail testing awkward on purpose.

**MSW (Mock Service Worker)** — network-level API mocking. The reason it matters: the *same*
handlers serve unit tests, integration tests, e2e, and local dev — so your mocks don't drift per
layer. Reach for it the moment tests are API-heavy.

**Playwright / Maestro / Detox / Meticulous** — the e2e tier. Playwright for web; Maestro (AI
test-healing) is the RN recommendation now that Expo archived Detox; Meticulous is record-based
AI e2e. E2e is the smallest, slowest, highest-confidence layer — keep it few and critical-path.

**Storybook (10)** — the component workshop (web + RN side by side), with Vitest/Playwright test
integration. It's where component *development* and visual/interaction testing meet.

**Radon IDE** — RN debugging in VS Code/Cursor (device panel, click-to-inspect, Profiler); a
DX-adjacent aid to the loop rather than a test type.

## Tradeoffs and failure modes to name out loud

- **Inverting the Trophy.** Piling up mock-heavy unit tests feels productive but buys little
  confidence and breaks on every refactor. Push effort to the integration middle.
- **Testing implementation details.** `data-testid` everywhere, asserting on state/private
  methods — the canonical brittleness source. Query like a user (this also improves a11y; role
  queries exercise the accessibility tree — see `RB-E-A11Y`).
- **Mocking your own modules instead of the network.** Per-test function mocks drift from reality
  and from each other; MSW at the boundary keeps them honest.
- **E2e as the main suite.** Slow, flaky-prone, expensive to maintain. It's the thin top of the
  Trophy, not the body.
- **Tests that aren't gated.** A suite that doesn't run in CI rots — testing tooling only pays
  off inside the `RB-E-DX` feedback loop.

## How it interacts with the rest of the stack

- **DX (`RB-E-DX`).** Tests only protect you if CI runs them on every PR; the testing tools and
  the CI gate are two halves of one loop.
- **Data (`RB-E-DATA`).** MSW lets you test data-fetching behaviour against realistic network
  responses without hitting real servers.
- **Accessibility (`RB-E-A11Y`).** Role/label-based queries (the RTL default) double as an a11y
  check; test-IDs bypass that signal.
- **Discipline (`agentic-engineering-patterns`).** *What* to test, when to write tests first, and
  how much is owned there — this page is *which tools*, that skill is *the practice*.

## In one paragraph

Choose tests by **confidence per effort**, which yields the Testing Trophy: a strong integration
middle, few e2e, unit where isolation helps, types/lint as the base. **Test behaviour, not
implementation** (React Testing Library enforces it) and **mock the network, not your modules**
(MSW, reused across every layer). Tooling forks by platform — Vitest/Jest + RTL for components,
Playwright (web) / Maestro (RN) for e2e — and none of it pays off unless CI runs it
(`RB-E-DX`); the *discipline* of what-to-test lives in `agentic-engineering-patterns`.

---

*See also: `RB-E-DX` (CI gates the suite), `RB-E-DATA` (MSW + data-fetching tests), `RB-E-A11Y`
(role queries as an a11y signal). TDD / what-to-test discipline: the `agentic-engineering-patterns`
skill.*
