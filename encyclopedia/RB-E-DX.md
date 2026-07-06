---
id: RB-E-DX
title: "About developer experience — CI, lint/format, hooks, monorepo"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-06-25
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-DX
defer_to_skill: engineering-principles
related: [RB-E-BUILD, RB-E-TESTING, RB-E-SECURITY]
sources:
  - "https://medium.com/doctolib/expo-without-eas-scaling-the-react-native-developer-experience-of-an-app-with-90m-users-2694ea841805"
---

# About developer experience — CI, lint/format, hooks, monorepo

> **Diataxis: Explanation.** This page builds *understanding* of the DX feedback loop — the
> reasoning behind the picks. It is not a setup guide. Architecture/boundary depth is owned by
> `engineering-principles`; bundlers by `RB-E-BUILD`; supply chain by `RB-E-SECURITY`. Read this
> for the *why*.

## The one principle that organises everything: an invariant you don't gate is a suggestion

DX isn't comfort — it's the **feedback loop that keeps every other decision honest.** Every
quality property you care about (tests pass, types check, lint is clean, the bundle stays under
budget) is either *mechanically enforced* or it silently rots. The organising principle is
therefore brutal and simple: **mechanize your invariants.** A styleguide nobody lints is a wish;
a test suite CI doesn't run is decoration; a "we always typecheck" that isn't gated is a story
you tell until the day it isn't true. So the DX question is never "which tools are nice" — it's
**"what must always be true, and what gate makes it always true?"**

## The default, and why

> Gate **tests + typecheck + lint** on every PR in **CI**, and enforce the same locally with a
> **pre-commit hook**. For lint/format, default to **Biome** (one fast tool) unless you need
> ESLint's plugin ecosystem (react-hooks, react-compiler).

CI on every PR is the single highest-leverage DX baseline — it's the gate that turns invariants
from aspiration into fact. The pre-commit hook is the *cheap* copy of that gate: catch the
obvious failures locally so they never burn a CI cycle (and never land). **Biome** is the default
linter/formatter because it's one fast Rust tool doing lint+format with near-zero config; you
switch to **ESLint flat config + Prettier** specifically when you need its plugin ecosystem —
notably the `react-hooks` and `react-compiler` rules, which are load-bearing in the compiler era
(`RB-E-REACT-CORE`).

## The landscape, and when each piece earns its place

**CI (GitHub Actions / similar)** — the gate. Tests + typecheck + lint + build on every PR. The
non-negotiable baseline; everything else is optimization around it.

**Lint/format — Biome vs ESLint(flat)+Prettier** — Biome for speed and simplicity (one tool);
ESLint+Prettier for the plugin ecosystem (react-hooks, react-compiler, jsx-a11y, import rules).
The axis is "do I need specific ESLint plugins?" — if not, Biome.

**Git hooks — husky + lint-staged / lefthook** — the local pre-commit/pre-push gate. Run
lint/format/affected-tests before code leaves the machine. It's the fast feedback that makes the
CI gate rarely fail.

**Monorepo task runner — Turborepo / Nx + pnpm workspaces** — a cached, parallel task graph so a
many-package repo builds and tests *incrementally* (`RB-E-BUILD`). The thing that keeps CI fast as
the repo grows.

**Dependency hygiene — renovate/dependabot + audit** — automated updates plus `npm`/`pnpm audit`
and install-script blocking. This is where DX and security meet (`RB-E-SECURITY`); keeping deps
current and locked-down is a feedback loop too.

## Tradeoffs and failure modes to name out loud

- **Tests but no CI.** A real finding in audited production apps: a suite exists but nothing gates
  it, so invariants quietly rot. *Add CI first* — it's higher-leverage than any new test.
- **A styleguide that isn't wired into lint.** Normative rules enforced by code review are
  enforced inconsistently and expensively; mechanize them so review can focus on design.
- **Skipping the local gate.** Relying only on CI makes the loop slow and noisy; a pre-commit hook
  catches the trivial failures for free.
- **Biome vs ESLint as identity, not need.** Pick on whether you need ESLint's plugins (react-
  hooks/react-compiler), not on tribe. Many teams want those rules — that's a real reason to keep
  ESLint.
- **Monorepo without a task graph.** Running everything on every change doesn't scale; cache and
  parallelize (Turborepo/Nx) or CI time balloons.

## How it interacts with the rest of the stack

- **Build (`RB-E-BUILD`).** The monorepo task graph and bundler choice are the build side of the
  same loop; DX is the gating/feedback side.
- **Testing (`RB-E-TESTING`).** Tests only protect you if CI runs them — testing tooling and the
  CI gate are two halves of one mechanism.
- **Security (`RB-E-SECURITY`).** Dependency automation + install-script blocking is shared
  ground; supply-chain hardening lives in this loop.
- **Architecture depth (`engineering-principles`).** Module boundaries, dependency direction, and
  what-may-import-what are owned there; DX is how you *enforce* such rules mechanically.

## In one paragraph

DX is the **feedback loop that keeps every other choice honest**, and its one principle is
*mechanize your invariants*: an unenforced rule is a suggestion. So gate **tests + typecheck +
lint** in **CI on every PR**, mirror it with a **pre-commit hook** for fast local feedback,
default lint/format to **Biome** (switch to ESLint+Prettier when you need react-hooks/react-
compiler plugins), and scale a monorepo with **pnpm + Turborepo**. If an app has tests but no CI,
adding CI is the highest-leverage move available — and dependency automation ties this loop to
`RB-E-SECURITY`.

---

*See also: `RB-E-BUILD` (monorepo task graph, bundlers), `RB-E-TESTING` (CI gates the suite),
`RB-E-SECURITY` (dependency hygiene / supply chain). Architecture/boundary depth: the
`engineering-principles` skill.*
