---
id: RB-E-GAMES
title: "About games, 3D & AR/VR — interactive / real-time rendering"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low                # niche shelf; entry carries its own verify-before-betting caveats
updated: 2026-07-16
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-GAMES
defer_to_skill: react-native-best-practices                   # entry names the skill without scoping it
related: [RB-E-ANIMATION, RB-E-SVG, RB-E-RN-VERSIONS]
sources:
  - "https://github.com/wcandillon/react-native-webgpu"
  - "https://registry.npmjs.org/@borndotcom/react-native-godot"
  - "https://registry.npmjs.org/@reactvision/react-viro/latest"
  - "https://github.com/callstack/react-native-visionos"
  - "https://reactnative.dev/blog/2026/02/24/react-native-comes-to-meta-quest"
---

# About games, 3D & AR/VR — interactive / real-time rendering

> **Diataxis: Explanation.** This page builds *understanding* of the games/3D/AR-VR decision —
> why the shelf splits by what you are drawing, and where each option puts the render loop. It
> is not an engine-setup guide and not a graphics API reference. The candidate list and
> one-line tradeoffs live in the index entry `RB-E-GAMES`; render-performance depth is owned by
> the `react-native-best-practices` skill. Read this for the *why*.

## The one idea that organises everything: a game is a render loop, not a component tree

React's unit of work is the component tree; a game's unit of work is the **loop**. The entry's
own vocabulary says so, option by option: react-native-skia is a "GPU 2D **drawing loop**",
react-native-game-engine is an "entity-component **loop**", WebGPU is "3D **render
pipelines**", and Godot is a whole engine that "runs **off-thread** (separate from RN's JS
thread)". So the organising question for this shelf is not *which component library* but
*where does the loop live, and who drives it* — **React orchestrates, the loop draws**:

- **Skia** gives the loop a declarative face. The Shopify architecture piece under this entry
  spells out how: JSI for direct C++/JS communication, a **custom React reconciler** powering
  the declarative API, and Reanimated-driven animation. Your components describe; Skia draws.
- **Godot** doesn't share the loop with React at all: the engine is embedded (`RTNGodotView`,
  by Born & Migeran) and runs off-thread, separate from RN's JS thread.
- **WebGPU** (react-native-webgpu, formerly react-native-wgpu; by William Candillon, not
  Software Mansion) builds 3D render pipelines on Google's Dawn, driven UI-thread via
  Reanimated/worklets — the entry's own label: advanced.
- **react-three-fiber** keeps the scene in the component tree — declarative 3D scenes as React
  components, v9 running in RN via expo-gl — the 3D-in-an-app path *without* a game engine.
- **react-native-game-engine** names the loop in its API — an entity-component loop for simple
  2D games — and is effectively unmaintained (last release v1.2.0, 2020).

The AR/VR shelf is the scoping caveat: the entry describes ReactVision, react-native-visionos,
and the first-party Quest path in **platform-target terms** (which headset, which fork, which
architecture requirement), not loop terms. The loop lens above covers the 2D/3D options; the
AR/VR facet is organised by target instead, and this doc says so rather than stretching the
metaphor.

## The default, and why

> 2D / interactive visuals → react-native-skia. Declarative 3D inside a normal app →
> react-three-fiber (+expo-gl). Real game engine → embed Godot (react-native-godot). AR/VR →
> ReactVision. RN suits supplemental/interactive experiences more than AAA games.

Four shelves, split by what you are drawing, plus a ceiling the entry states twice: **RN suits
supplemental/interactive experiences more than AAA games**. The when-clauses refine the
shelves: a simple 2D game loop → react-native-game-engine (with its maintenance caveat); 3D or
compute shaders → WebGPU, explicitly "advanced"; 3D product views / scenes in a normal app →
@react-three/fiber + expo-gl, no engine needed; mobile AR or cross-platform VR including Meta
Quest → ReactVision (New Architecture required); an Apple Vision Pro app →
react-native-visionos, checking its RN-version lag first.

## The landscape, facet by facet

**react-native-skia** — the common base for RN games and interactive visuals: a GPU 2D drawing
loop under a declarative API. The enduring design (per the Shopify reading): JSI, a custom
React reconciler, Reanimated-driven animation.

**@react-three/fiber (three.js)** — declarative 3D scenes as React components; v9 runs in RN
via expo-gl (verified vs npm). The path for 3D *inside* an app when you don't need an engine.

**react-native-godot (@borndotcom)** — embed the Godot engine itself (`RTNGodotView`; by Born
& Migeran), running off-thread from RN's JS thread. The "real game engine" answer.

**WebGPU (react-native-webgpu)** — 3D render pipelines on Google's Dawn, UI-thread via
Reanimated/worklets. Advanced; note the identity details the entry pins down: formerly
react-native-wgpu, by William Candillon, not Software Mansion.

**react-native-game-engine** — entity-component loop for simple 2D games; effectively
unmaintained (last release v1.2.0, 2020).

**ReactVision (@reactvision/react-viro)** — AR/VR from one RN codebase: iPhone/Android AR plus
Meta Quest. The maintained fork of react-viro; New Architecture (Fabric) REQUIRED; active
(2.57.x, 2026-07, verified vs npm).

**react-native-visionos (Callstack)** — a full RN fork targeting Apple Vision Pro / the
visionOS SDK (~1.1k★). CAUTION, and the entry calls this the load-bearing fact: pinned to RN
0.78 (2025-03), lagging core by about a year — verify parity before betting.

**First-party Meta Quest (2026-07-10, verified vs the official RN blog)** — React Native now
supports Meta Quest / Horizon OS directly via the `expo-horizon-core` config plugin, with Expo
Go on the Horizon Store. A first-party **2D-panel** path that sits beside ReactVision's
immersive AR/VR, not in competition with it.

Provenance: the AR/VR + 3D options were added 2026-07-09 — a gap flagged by Native Weekly
#15's ReactVision feature and promoted on the user's call — each verified against npm, the
Callstack repo, or the RN blog as noted above. The entry's detect rows also make this shelf a
doctor signal: any of `@reactvision/react-viro`, `@react-three/fiber`,
`@borndotcom/react-native-godot`, `react-native-wgpu`, or `react-native-game-engine` in
package.json routes advice here.

## Tradeoffs and failure modes to name out loud

- **Pitching RN at an AAA game.** The ceiling appears in both the recommendation and the note:
  RN suits supplemental/interactive experiences more than AAA games. This shelf is for visuals,
  scenes, and embedded engines inside apps — niche by the entry's own word.
- **Betting on the visionOS fork without checking the lag.** Pinned to RN 0.78 (2025-03),
  about a year behind core — the entry marks this version-lag caveat as the load-bearing fact.
  Verify parity before betting.
- **ReactVision on the old architecture.** New Architecture (Fabric) is REQUIRED — a hard
  precondition, not a preference.
- **Reaching for react-native-game-engine as if it were current.** It is the when-clause
  answer for a simple 2D game loop, and it is effectively unmaintained — last release v1.2.0,
  in 2020. Both facts travel together.
- **Treating WebGPU as a default.** The entry labels it advanced, twice (option row and
  when-clause). It is the 3D/compute-shaders answer, not the starting point.
- **Assuming immersive is the only Quest path.** Since 2026-02 there is a first-party 2D-panel
  path (`expo-horizon-core`, Expo Go on the Horizon Store) beside ReactVision's immersive
  AR/VR — pick by whether you need immersion, not by which library you found first.

## How it interacts with the rest of the stack

- **Animation (`RB-E-ANIMATION`).** The same machinery drives both shelves: Skia's animation
  is Reanimated-driven (per the Shopify reading) and WebGPU runs UI-thread via
  Reanimated/worklets. That entry's doc pairs `RB-E-GAMES` with GPU drawing explicitly.
- **SVG (`RB-E-SVG`).** The sibling GPU-drawing shelf — declarative vector drawing where this
  entry is loops and engines. (Pairing inherited from the animation doc, not this entry's
  text.)
- **RN versions (`RB-E-RN-VERSIONS`).** Two of the AR/VR options are version/architecture
  gates in disguise: visionos pinned to RN 0.78, ReactVision requiring Fabric. What your app
  can adopt depends on where core is.
- **Performance depth (`react-native-best-practices`).** The defer skill; the entry names it
  without scoping. Render-perf rules and thresholds live there, not here.

## In one paragraph

Games, 3D, and AR/VR in React Native organise around one idea: **a game is a render loop, not
a component tree — React orchestrates, the loop draws.** The default splits by what you draw:
2D / interactive visuals → **react-native-skia** (a GPU 2D drawing loop with a declarative
face — JSI, a custom React reconciler, Reanimated-driven animation); declarative 3D inside a
normal app → **react-three-fiber** v9 via expo-gl, no engine needed; a real game engine →
**embed Godot** (`RTNGodotView`, off-thread from RN's JS thread); AR/VR → **ReactVision**, the
maintained react-viro fork (Fabric required, active 2.57.x). WebGPU (Dawn, UI-thread via
worklets) is the advanced 3D/compute path; react-native-game-engine still answers "simple 2D
loop" but is unmaintained since 2020; react-native-visionos is pinned to RN 0.78 and lags core
by about a year — verify before betting; and Meta Quest now has a first-party 2D-panel path
via `expo-horizon-core`. The ceiling is stated twice in the entry: RN suits
supplemental/interactive experiences more than AAA games.

---

*See also: `RB-E-ANIMATION` (Reanimated/worklets — the shared drive train), `RB-E-SVG` (the
declarative GPU-drawing sibling), `RB-E-RN-VERSIONS` (the visionos pin and the Fabric gate are
version questions). Render-performance depth: the `react-native-best-practices` skill.
Background reading: Shopify on react-native-skia's architecture — the enduring design under
RN's 2D GPU drawing.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "React orchestrates, the loop draws" is the assigned organizing idea. The entry grounds
     per-option loop vocabulary (GPU 2D drawing loop, entity-component loop, 3D render
     pipelines, off-thread engine, reconciler-powered declarative API) but never states the
     orchestrator/drawer split as a general principle — that framing is editorial.
  2. The AR/VR options are described in platform-target terms, not loop terms — the loop lens
     is scoped to the 2D/3D options and the doc says so inline rather than inventing loop
     mechanics for ReactVision/visionos/Quest.
  3. WHY thread placement matters (frame budgets, jank) is not entry text; the doc states
     where each loop runs (off-thread, UI-thread) without asserting consequences.
  4. RB-E-SVG and RB-E-RN-VERSIONS relations are inferred (the ANIMATION doc pairs GAMES+SVG
     for GPU drawing; the visionos pin / Fabric requirement are version-shaped) — the entry
     names no related entries. RB-E-ANIMATION is grounded via the entry's Reanimated/worklets
     mentions.
  5. The reason for the AAA ceiling is unstated in the entry; the doc repeats the ceiling
     ("supplemental/interactive over AAA") without inventing a cause.
-->
