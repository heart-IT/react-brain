---
id: RB-E-TYPESCRIPT
title: "About TypeScript rigor & public API typing"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-13
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-TYPESCRIPT
defer_to_skill: engineering-principles
related: [RB-E-DX, RB-E-BUILD]
sources:
  - "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/"
  - "https://registry.npmjs.org/typescript/latest"
---

# About TypeScript rigor & public API typing

> **Diataxis: Explanation.** This page builds *understanding* of how much TypeScript strictness
> to buy and where — the reasoning behind the picks. It is not a tsconfig how-to or a migration
> runbook. API-design and module-boundary depth is owned by `engineering-principles`; the CI
> typecheck gate by `RB-E-DX`; emit and bundling by `RB-E-BUILD`. Read this for the *why*.

## The one principle that organises everything: strictness is a boundary discipline

The checker earns its keep **where data crosses a boundary** — and that's exactly where teams
tend to switch it off. The entry's own smell detector says it plainly: explicit `any` showing up
across many files means "the checker is off exactly where bugs concentrate — prefer `unknown` +
narrowing at boundaries." The same principle flips outward for library authors: the **exported
type surface is itself a boundary** — something to minimize and version deliberately, not a side
effect of whatever happens to be `export`ed. Strictness inside, a small deliberate surface
outside: one discipline, two directions.

## The default, and why

> Run strict TypeScript (`strict:true`, the TS 6 default) and export a small, deliberate public
> type surface from libraries.

`strict:true` stopped being a stance and became the baseline: **TS 6.0 makes it the default**, so
running loose is now an opt-out you have to justify, not a starting point. The "strict vs gradual
adoption" tradeoff still exists for legacy code, but the destination is fixed. And the library
half of the default is the boundary principle applied to your consumers: if you're a
library/package author, minimize and version the exported types, and avoid leaking internals —
your `.d.ts` is a public API with all the compatibility obligations that implies.

## The landscape, and when each piece earns its place

**Strict mode tiers** — the strict-vs-gradual adoption axis. With `strict:true` as the TS 6
default, "tiers" is about how an existing codebase gets there, not whether to go.

**Exported type surface** — what a library/package should export. Minimal, versioned, no leaked
internals. For heavy-generics libraries, the TanStack Table V9 work is the reference: concrete
techniques (feature maps, materialized interfaces, `in`/`out` variance annotations, explicit type
args) cut type-instantiation cost 62–86%, with measurements.

**TypeScript 7 (native/Go)** — the Go rewrite of `tsc`. **7.0 is STABLE**: npm latest is 7.0.2,
published 2026-07-08 (verified against the npm registry; the RC was 2026-06-18, and stable landed
on schedule). ~10x faster than TS 6.0, up to 16x on type-checking with parallelization, and it
removes long-deprecated flags. Earns its place the moment a large repo has a slow `tsc`.

**TypeScript 6.0 (the bridge)** — the JS-based release you migrate *through*, not to. The VS Code
case study is the pattern: their ~50-extension codebase cut type-checking 36s→5s (~7x) and editor
project-load 60s→10s by going incrementally — TS 6.0 as a low-churn bridge, then TS 6 and 7
side-by-side in CI (TS 6 still emitting), then esbuild + TS 7 as the default.

**Flow (2026)** — Meta's type checker. Syntax has converged with TS and the compiler was ported
to Rust, but it's mostly Meta-internal now. The when-clause is one line: not at Meta → use
TypeScript, not Flow.

## Tradeoffs and failure modes to name out loud

- **`any` at the boundary.** The entry flags explicit `any` in 10+ files as a repo-level smell:
  it turns the checker off exactly where bugs concentrate. `unknown` + narrowing is the strict-era
  replacement.
- **A leaky exported surface.** Exporting whatever's convenient makes internals part of your
  public API; the when-clause for library authors is minimize + version, avoid leaking internals.
- **Generics-heavy types that melt the checker.** Type-instantiation cost is real and measurable —
  TanStack Table V9's 62–86% reductions show it's also fixable, with named techniques.
- **Big-bang TS 7 migration.** The VS Code evidence says bridge through TS 6 and run 6-and-7
  side-by-side in CI first. Their surprising blocker wasn't type errors at all — it was formatter
  differences failing pre-commit checks.
- **Deprecated-flag debt.** TS 7 removes long-deprecated flags — the TS 6 bridge exists to flush
  those out of your config first.
- **The native compiler's memory bill.** The tsgo heap investigation documents the concurrency
  model's cost — per-thread Checker duplication, never-freed types, symbol duplication, AST at
  45% of heap (plus a fix). Speed came from parallelism, and parallelism has a footprint.

## How it interacts with the rest of the stack

- **DX (`RB-E-DX`).** Typecheck is one of the invariants CI must gate — an ungated `strict:true`
  is a suggestion. Fittingly, VS Code's TS 7 blocker lived in this loop too: formatter diffs
  failing pre-commit checks, not type errors.
- **Build (`RB-E-BUILD`).** The migration pattern separates checking from emitting: TS 6 kept
  emitting while TS 7 checked side-by-side, and the end state was esbuild + TS 7 as the default.
- **API/boundary depth (`engineering-principles`).** What a package should export, how boundaries
  are drawn, and dependency direction are owned there; this entry supplies the type-level rule —
  small, versioned, deliberate.
- **Upgrades.** `react-brain migrate` flags any `typescript` below 7.0.0: upgrade via the TS 6
  bridge, effort M, following the VS Code pattern above.

## In one paragraph

TypeScript rigor is a **boundary discipline**: run `strict:true` (the TS 6 default) so the checker
is on where data crosses edges — `any` in bulk means it's off exactly where bugs concentrate, so
prefer `unknown` + narrowing — and, as a library author, treat the exported type surface as a
boundary too: small, versioned, no leaked internals. Meanwhile the compiler changed engines:
**TS 7 (Go-native `tsc`) is stable** — 7.0.2 on npm as of 2026-07-08, ~10x faster, up to 16x
type-checking with parallelization — and the proven adoption path is incremental: TS 6.0 as the
low-churn bridge, 6 and 7 side-by-side in CI, then TS 7 as default, the way VS Code cut
type-checking 36s→5s. Not at Meta? TypeScript, not Flow.

---

*See also: `RB-E-DX` (CI gates typecheck), `RB-E-BUILD` (emit vs check — esbuild + TS 7 end
state). API and boundary depth: the `engineering-principles` skill.*
