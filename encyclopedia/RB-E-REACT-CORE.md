---
id: RB-E-REACT-CORE
title: "About React core — the compiler era, RSC, and concurrent features"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-07-01
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-REACT-CORE
defer_to_skill: engineering-principles
related: [RB-E-STATE, RB-E-META-FRAMEWORKS, RB-E-SECURITY, RB-E-TYPESCRIPT]
sources:
  - "https://react.dev/blog/2025/10/07/react-compiler-1"
  - "https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components"
  - "https://www.youtube.com/watch?v=K3flMIHS-cI"   # Meistrich, "Render once" (App.js Conf 2026) — render cost as the hidden bottleneck
---

# About React core — the compiler era, RSC, and concurrent features

> **Diataxis: Explanation.** This page builds *understanding* of where React itself is in 2026
> and what that means for how you write it. It is not an API reference (that's react.dev) and
> not a rules-of-React linter (that's `engineering-principles` / ESLint). Read this for the *why*.

## The one shift that reframes everything: stop hand-memoizing

For a decade, "React performance" meant manually wrapping things in `useMemo`, `useCallback`,
and `React.memo` to stop needless re-renders. **The React Compiler (1.0, stable since
2025-10-07) inverts that.** It analyses your components and inserts memoization for you, more
precisely than humans reliably do — across early returns and conditional branches. So the new
mental model is: **write straightforward code and let the compiler memoize; manual `useMemo`/
`useCallback` become escape hatches, not defaults.** (Verified against the official React
Compiler 1.0 announcement.)

That single change cascades: the old "which state library avoids re-renders" reasoning weakens
(`RB-E-STATE`), and "where are my missing memos" stops being a routine bug class.

## The mental model: React is now stable, plural, and compiler-optimized

Three facts define core React in 2026, and they're easy to conflate:

- **React-the-library** is mature and stable on the 19.x line (19.2 ships `<Activity>`,
  `<ViewTransition>`, `useEffectEvent`, `use()`), and now lives under the independent **React
  Foundation** (Linux Foundation, Feb 2026). Stability is the headline.
- **React-the-protocol (RSC).** React Server Components are a *server* rendering model over the
  Flight wire protocol. This is a **web** concern delivered through meta-frameworks
  (`RB-E-META-FRAMEWORKS`); it does **not** apply to React Native, and its security issues are
  server-side (below, `RB-E-SECURITY`).
- **React-the-projection (alternative runtimes).** Preact, the experimental `@tanstack/redact`,
  Million, and the JSX-successor TSRX are *other ways to run React-shaped code*. Mostly
  experimental; interesting, not production defaults.

Keeping these three apart is most of "understanding modern React."

## The default, and why

> Stay on **React 19.2** and turn on **React Compiler 1.0** — let it handle memoization.

This is the low-regret baseline: you're on the stable line, you get the concurrent features,
and you delete a category of manual-memo busywork (and the bugs that come with getting it
wrong). New projects should adopt the Compiler from day one; existing apps can enable it
incrementally. On the web, reach for **RSC via a meta-framework** when you actually need
server rendering/data; on React Native, RSC simply doesn't apply.

## The landscape, and when each piece earns its place

**React Compiler 1.0** — on by default for new code; the Rust port is the in-progress part, but
the compiler itself is production-proven at Meta. Enable via the Babel/SWC/Oxc/Vite plugin
(`RB-E-BUILD`).

**RSC + Server Functions** — server-rendered components and the mutation path. Web-only,
meta-framework-delivered, security-sensitive (`RB-E-SECURITY`). Use when the server is part of
your architecture, not as a reflex.

**Concurrent features** — `<Activity>` (hide a subtree while preserving its state — high
satisfaction in State-of-React 2025), `useEffectEvent` (read latest values without re-subscribing
effects), `use()` (read promises/context under Suspense), `<ViewTransition>` (animated
transitions). Reach for them when the problem matches; they're tools, not obligations.

**Alternative runtimes** — Preact for bundle-size-critical web; treat `@tanstack/redact`,
Million, and TSRX as experiments, not production bets. The decade of React libraries is the
reason to stay on React unless a concrete driver pushes you off (`RB-E-ALT-FRAMEWORKS`).

## Tradeoffs and failure modes to name out loud

- **Mutating objects you got from `useState` defeats the Compiler.** The ecosystem's load-
  bearing caveat: prefer immutable updates and plain data over behaviour-rich class instances in
  render paths, or you fight the optimizer (`RB-E-STATE`).
- **Hand-memoizing by default in the compiler era.** Adding `useMemo`/`useCallback` everywhere
  is now noise — and occasionally counterproductive. Let the compiler work; reach for manual
  memo only for measured, specific cases.
- **Treating RSC as universal.** RSC/Server Functions are web + server. Assuming they apply to
  React Native, or that their CVEs affect RN, is a category error (`RB-E-SECURITY`).
- **Chasing experimental runtimes.** Betting production on redact/Million/TSRX trades a vast,
  battle-tested ecosystem for unproven speed claims.

## How it interacts with the rest of the stack

- **State (`RB-E-STATE`).** The Compiler changes the perf calculus — choose a store for its
  sharing model and ergonomics, not as a memoisation workaround.
- **Meta-frameworks (`RB-E-META-FRAMEWORKS`).** RSC/Server Functions are productised there; this
  entry is the primitive, that one is the frameworks.
- **Security (`RB-E-SECURITY`).** The RSC/Server-Function DoS family is server-side and patched
  in React 19.0.5/19.1.6/19.2.5; it does not affect React Native.
- **Build (`RB-E-BUILD`).** The Compiler is a build plugin; how you enable it depends on your
  bundler/toolchain.
- **Rendering depth.** When you *do* need to reason about renders, the depth (render vs commit,
  reconciliation, Fiber) lives in the reading and in `engineering-principles`, not in this page.

## In one paragraph

Modern React is **stable, plural, and compiler-optimized**: stay on **19.2** and **turn on the
React Compiler** so you stop hand-writing `useMemo`/`useCallback` (just don't mutate state
objects and defeat it). Keep the three Reacts straight — the library (stable, concurrent
features), the protocol (RSC: web + server only, not RN, security-sensitive), and the projections
(Preact/redact/Million/TSRX: mostly experimental). Reach for RSC and concurrent features when the
problem calls for them, and stay on React for its ecosystem unless a concrete driver pushes you
off.

---

*See also: `RB-E-STATE` (Compiler changes the state-perf calculus), `RB-E-META-FRAMEWORKS`
(RSC/Server Functions productised), `RB-E-SECURITY` (RSC CVEs are server-side), `RB-E-TYPESCRIPT`.
Rendering/architecture depth: the `engineering-principles` skill.*
