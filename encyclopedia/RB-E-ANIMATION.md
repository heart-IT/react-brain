---
id: RB-E-ANIMATION
title: "About animation & gestures — where the per-frame work runs"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-10
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-ANIMATION
defer_to_skill: react-native-best-practices
related: [RB-E-NATIVE, RB-E-GAMES, RB-E-SVG, RB-E-NAV, RB-E-REACT-CORE]
sources:
  - "https://reactnative.dev/blog/2026/04/07/react-native-0.85"
  - "https://reactnavigation.org/blog/2026/04/27/building-custom-screen-transitions"
---

# About animation & gestures — where the per-frame work runs

> **Diataxis: Explanation.** This page builds *understanding* of the animation landscape — the
> reasoning behind the picks. It is not an API guide. Animation *performance rules* (thresholds,
> profiling) are owned by `react-native-best-practices`; GPU drawing by `RB-E-GAMES`/`RB-E-SVG`.
> Read this for the *why*.

## The one question that organises everything: which thread pays, every frame?

An animation is a piece of work that must complete **every ~16ms**, forever, while the rest of
your app keeps running. So the durable selection axis is not API style — it is **where that
per-frame work executes**. There are four tiers, each cheaper than the one before:

1. **JS thread** (core `Animated` with `useNativeDriver: false`) — every frame crosses into your
   busiest thread. One GC pause, one heavy render, and the animation stutters.
2. **UI thread via worklets** (Reanimated) — JS code compiled to run on the UI thread's own
   runtime (`react-native-worklets`, now a standalone package). Immune to JS-thread jank, but the
   worklet *itself* still costs UI-thread time per frame.
3. **Fully native drivers** (native-driven `Animated`, react-native-ease) — the animation is
   handed to Core Animation / ObjectAnimator once and *no* per-frame JS or worklet runs at all.
4. **GPU canvas** (Skia) — for drawing that isn't view-property animation at all.

Everything in the entry falls out of this ladder, including the failure modes.

## The default, and why

> React Native → **Reanimated 4 + Gesture Handler 3** for real UI-thread animation and gestures.
> Web (React DOM) → **Motion** (framer-motion's successor).

Reanimated 4 sits at tier 2 and is the ecosystem's center of gravity: CSS-style transitions,
shared values, and — since RN 0.85 — a **shared C++ animation backend** with core `Animated`, so
the built-in and the library ride one engine instead of two competing ones. Gesture Handler 3
completes it: gestures are recognized natively and feed worklets directly, and its v3 hook-based
API was rebuilt for the React Compiler era (`RB-E-REACT-CORE`). On the web the same reasoning
lands on Motion: declarative layout/exit/gesture animation over compositor-friendly properties —
Reanimated and Gesture Handler are React Native-only.

## The landscape, tier by tier

**Reanimated 4 / react-native-worklets** — the tier-2 workhorse. Worklets are now their own
package, which matters beyond animation (VisionCamera frame processors, Expo UI synchronous
state — `RB-E-NATIVE-UI`).

**Gesture Handler 3** — native gesture recognition; the input half of the animation story.

**Core `Animated`** — fine at tier 3 (native driver) for simple cases; since 0.85.1 it can even
drive layout props natively. Its trap is tier 1: `useNativeDriver: false` silently moves the work
to the JS thread (the corpus's source-signal rule flags exactly this).

**react-native-ease** — the tier-3 specialist: animations driven *entirely* by Core Animation /
ObjectAnimator, zero per-frame JS or worklet work. The author's cross-library benchmark shows it
holding frame budget at view counts where worklet approaches saturate — read with the stated
caveat that the benchmark's author built the winner; the *cost model* is the durable part.

**react-native-screen-transitions** — screen/shared-element choreography for React Navigation
(`RB-E-NAV`); featured on the official React Navigation blog, new — pin.

**Skia / Lottie / morph-view** — tier 4 and specials: `react-native-skia` for custom GPU drawing
(and Lottie via Skottie), `lottie-react-native` for designer-made animation files,
`react-native-morph-view` for GPU image-morph transitions (niche).

**Moti** — declarative sugar over Reanimated; dormant since early 2025. Fine if installed;
prefer plain Reanimated or LayoutAnimation for new work.

## Tradeoffs and failure modes to name out loud

- **`useNativeDriver: false`** — the classic tier-1 trap: JS-thread animation that jitters under
  load. Native-drive it or move it to Reanimated.
- **Hundreds of concurrently animating views** — even tier 2 pays per-frame worklet cost per
  view; at scale (~hundreds) only tier 3 stays under budget. Benchmark before committing an
  animation-heavy screen design.
- **Reaching for Skia to animate view properties** — GPU canvas is for *drawing*; transform/
  opacity animation belongs in tiers 2–3.
- **Two animation systems fighting** — pre-0.85 this was real (Animated vs Reanimated timing);
  the shared C++ backend resolved it. On ≥0.85 mixing them is no longer an architectural smell.
- **Web habits on native (and vice versa)** — Motion doesn't exist on RN; Reanimated doesn't
  exist on the web. Shared-codebase teams keep animation platform-local (`RB-E-CROSSPLATFORM`).

## How it interacts with the rest of the stack

- **Navigation (`RB-E-NAV`).** Screen transitions are animations with navigation semantics —
  react-native-screen-transitions builds them *on* React Navigation rather than forking it.
- **Native (`RB-E-NATIVE`).** Worklets are the same machinery VisionCamera v5 frame processors
  use; understanding tier 2 here pays off there.
- **Lists (`RB-E-LISTS`).** List re-renders and animations compete for the same frame budget —
  the "render once" discipline in the STATE/LISTS readings is the other half of smoothness.
- **React core (`RB-E-REACT-CORE`).** Gesture Handler 3's hook API assumes the Compiler era;
  animation values deliberately live *outside* React state to avoid re-render coupling.

## In one paragraph

Pick animation tooling by **which thread pays every frame**. React Native's default is
**Reanimated 4 + Gesture Handler 3** — UI-thread worklets, one shared C++ engine with core
`Animated` since RN 0.85 — with core `Animated` (native-driven) for trivial cases, **ease** when
hundreds of concurrent animations demand zero per-frame work, **Skia** for GPU drawing, and
**react-native-screen-transitions** for shared-element navigation choreography. On the web, use
**Motion**. The failure modes are all the same mistake in different clothes: putting per-frame
work on a thread that has better things to do.

---

*See also: `RB-E-NAV` (screen transitions), `RB-E-NATIVE` (worklets/JSI machinery), `RB-E-GAMES`
+ `RB-E-SVG` (GPU drawing), `RB-E-LISTS` (the other half of the frame budget). Performance rules
and thresholds: the `react-native-best-practices` skill.*
