---
id: RB-E-BUILD
title: "About build tooling, bundlers & monorepos (React & React Native)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-06-25
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-BUILD
defer_to_skill: null
related: [RB-E-NATIVE, RB-E-DX, RB-E-RN-VERSIONS, RB-E-REACT-CORE]
sources:
  - "https://reactnative.dev/blog/2026/02/11/react-native-0.84"
  - "https://vite.dev/blog/announcing-vite8"
---

# About build tooling, bundlers & monorepos (React & React Native)

> **Diataxis: Explanation.** This page builds *understanding* of the build/bundler decision —
> the reasoning behind the pick. It is not a tutorial: the candidate list and one-line
> tradeoffs live in the index entry `RB-E-BUILD`; the feedback-loop side (CI, lint, hooks) is
> `RB-E-DX`. Read this for the *why*.

## Two toolchains, one trend

The first thing to get straight: **web and React Native have separate build toolchains**, and
they're moving at different speeds.

- **Web** is in the middle of a churn — the "bundler wars" — that is now resolving toward
  **Rust**. Vite 8 ships on **Rolldown** (a Rust bundler), unifying what used to be two
  pipelines (esbuild for dev, Rollup for prod). The broader wave is the same: SWC, the Oxc
  family (Oxlint/Oxfmt), Bun, Rspack — all Rust/native, all chasing speed. Cloudflare
  acquiring VoidZero (Vite/Vitest/Rolldown/Oxc) signals this consolidation; the tools stay MIT.
- **React Native** is steadier: **Metro** remains the default bundler, and the action is in
  the *native* build (Gradle/Xcode) and the JS engine, not in swapping bundlers.

The durable trend across both is **Rust is eating the toolchain** — not as fashion, but
because native code without a GC buys real, compounding build-speed wins. That's the lens for
reading any specific tool choice.

## The default, and why

> **Web:** Vite 8 (Rolldown). **React Native:** Metro (+ Hermes V1, precompiled iOS binaries).
> **Monorepo:** pnpm workspaces + Turborepo. **Expo** for managed velocity.

On the web, **Vite** is the default for new projects — fast dev server, and now a unified Rust
production bundler. On **React Native**, **Metro** stays the default not by inertia but because
it's tightly integrated with RN's resolution, Hermes, and the New Architecture's codegen;
RN 0.79 already gave it ~3× faster cold start. The engine question is settled too: **Hermes
V1** is the default JS engine since **RN 0.84**, which also shipped **precompiled iOS binaries**
(faster `pod install` builds) and raised the floor to **Node 22.11+** (verified against the
RN 0.84 blog). For **monorepos**, pnpm workspaces + Turborepo give a cached, parallel task
graph. And **Expo** is the managed-velocity choice — it owns a large slice of the build/release
pipeline so you don't have to.

## The landscape, and when each one wins

**Metro** — the RN default; integrated, Hermes-aware, New-Arch-codegen-aware. You don't replace
it casually. RN-side build *speed* problems are better solved by caching and transforms than by
swapping the bundler (below).

**Vite 8 / Rspack 2 / webpack (web)** — Vite (on Rolldown) is the new-project default; Rspack
(Rust) is the webpack-compatible high-performance path and adds RSC support; webpack remains for
legacy. The selection axis is greenfield-vs-legacy and how much you value Vite's DX.

**Re.Pack 5 (Rspack)** — the main *Metro alternative* for RN, on Rust-based Rspack; reach for it
specifically for **module federation / super-apps**, not as a general Metro replacement.

**react-native-swc** — a Rust/SWC Metro transform, faster than Babel; the answer when **Babel is
the Metro bottleneck** (note: custom Babel plugins need SWC equivalents — e.g. the worklets
plugin for Reanimated).

**RNRepo / Rock (native build caching)** — RN's slowest step is usually the *native* build, not
the JS bundle. **RNRepo** (prebuilt native binaries via Maven) and **Rock** (native build-
artifact caching) attack that directly — the lever for slow RN CI, with large reported wins.

**Turborepo / Nx + pnpm/yarn workspaces** — monorepo task graph + caching; the standard way to
make many-package repos build incrementally.

**Expo vs bare RN** — managed velocity vs native control. Expo owns more of the toolchain
(builds, updates, config); bare gives full control at the cost of owning it yourself.

## Tradeoffs and failure modes to name out loud

- **Swapping Metro to "go fast."** RN's bottleneck is usually the native build or Babel, not
  Metro itself. Reach for native build caching (Rock/RNRepo) or react-native-swc *before*
  replacing the bundler; replace Metro (Re.Pack) for module federation, not for raw speed.
- **Chasing the newest Rust tool mid-project.** The web toolchain is consolidating fast;
  rewriting a working build to the bundler-of-the-month is churn. New project → Vite; existing
  working build → migrate only on a concrete pain.
- **Letting Babel rot the RN build.** If the Metro transform is the bottleneck, that's a
  fixable, measurable problem (react-native-swc) — but mind the custom-plugin parity gap.
- **Confusing build with DX.** The bundler is one piece; the feedback loop (CI gates, lint,
  hooks) is what keeps the build honest — that's `RB-E-DX`, not this entry.

## How it interacts with the rest of the stack

- **Native (`RB-E-NATIVE`).** Codegen, precompiled iOS binaries, and Hermes V1 are the build-
  time face of the New Architecture; this entry and that one describe the same machine from the
  build and the runtime side.
- **DX (`RB-E-DX`).** Monorepo task running, CI, and lint/format live there; the bundler choice
  feeds into that loop.
- **RN versions (`RB-E-RN-VERSIONS`).** Hermes-V1-default, precompiled iOS, and the Node-22.11
  floor are version-pinned facts; verify a specific row against the RN blog.
- **React core (`RB-E-REACT-CORE`).** The React Compiler plugs into the build (Babel/SWC/Oxc/
  Vite); your bundler choice determines how you enable it.

## In one paragraph

Treat web and RN as **two toolchains** with one shared trend — **Rust is eating the build for
speed**. On the web, default to **Vite 8 (Rolldown)** and only migrate a working build for a
real reason. On **React Native**, keep **Metro** (with **Hermes V1** default and precompiled
iOS since RN 0.84), and fix slowness where it actually is — native build caching (Rock/RNRepo)
or an SWC transform — rather than swapping the bundler (Re.Pack is for module federation, not
raw speed). Use **pnpm + Turborepo** for monorepos and **Expo** for managed velocity, and keep
the feedback-loop concerns in `RB-E-DX`.

---

*See also: `RB-E-NATIVE` (codegen / Hermes / precompiled iOS), `RB-E-DX` (CI, lint, monorepo
task running), `RB-E-RN-VERSIONS` (Hermes-V1 / Node-floor facts), `RB-E-REACT-CORE` (the
Compiler's build plugin).*
