---
id: RB-E-NATIVE
title: "About native modules & the New Architecture (React Native)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-06-25
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-NATIVE
defer_to_skill: react-native-jsi                              # JSI memory/threading depth
related: [RB-E-RN-VERSIONS, RB-E-MEDIA, RB-E-STORAGE, RB-E-BUILD]
sources:
  - "https://reactnative.dev/blog/2026/02/11/react-native-0.84"
  - "https://reactnative.dev/blog/2026/06/11/react-native-0.86"
---

# About native modules & the New Architecture (React Native)

> **Diataxis: Explanation.** This page builds *understanding* of how RN talks to native code
> and which module path to choose. It is not a tutorial: the candidate list lives in the
> index entry `RB-E-NATIVE`; JSI memory-ownership and threading *rules* are owned by the
> `react-native-jsi` skill. Read this for the *why*; read that skill to *do it safely*.

## The shift that changed everything: the bridge is gone

For years React Native's JS and native sides talked over an **asynchronous bridge** that
serialised every call to JSON. That bridge was the source of most "RN is slow at the boundary"
pain: batched, async, copy-heavy. The **New Architecture** removes it. JS and native now share
a C++ layer — **JSI** (the JavaScript Interface) — and call each other **synchronously**,
without serialization. On top of JSI sit **Fabric** (the renderer, with an immutable C++
shadow tree) and **Turbo Modules** (native modules over JSI). This is the single fact that
organises every native decision: *there is no async bridge anymore; native is a synchronous,
C++-mediated call away.*

Two consequences: native calls can be synchronous and cheap, and a whole class of native
libraries can be rebuilt on JSI for large speedups. The cost is that the boundary is now
*real C++* — memory ownership and threading matter (which is why depth defers to
`react-native-jsi`).

## This is not optional anymore

The New Architecture is **the** architecture. It became the default for new projects in
**RN 0.76**, the **only** runtime option in **RN 0.82** (opt-out ignored), and **RN 0.84**
began stripping Legacy-Architecture code from iOS and Android. Legacy was frozen at 0.80 and
is effectively gone. So "should we migrate to the New Architecture?" is no longer a question —
**all new native work targets it**, and apps still on Legacy are on borrowed time
(`RB-E-RN-VERSIONS`). (Verified against the official RN 0.84 and 0.86 release blogs.)

## The default, and why

> Target the New Architecture (mandatory ≥ RN 0.82). Reach for **Expo Modules** for most
> native needs; use **Nitro Modules** for performance-critical custom native.

The selection is about *how much native you're writing and how hot the path is*. **Expo
Modules** is the managed fast-path: a clean Swift/Kotlin authoring model that covers the vast
majority of integrations with the least ceremony — the right default even in bare RN. When you
need a custom native module on a hot path (camera frames, audio, BLE, crypto), **Nitro
Modules** — codegen-driven JSI, positioned as Turbo Modules' successor — is the performance
choice and is consolidating the ecosystem (mmkv v4, device-info, image, video, fetch, and
VisionCamera v5 all moved onto it). **Turbo Modules / Fabric** directly is the standard path
when you're writing conventional custom native and don't need Nitro's edge.

## The landscape, and when each one wins

**Expo Modules** — managed, ergonomic, broad coverage; the default for most native needs. You
write idiomatic Swift/Kotlin and get a clean JS surface. Not Expo-app-only — usable in bare RN.

**Turbo Modules / Fabric (JSI)** — the New Architecture's own module and rendering system.
The baseline for custom native work; you're writing against codegen and JSI directly.

**Nitro Modules** — codegen JSI with an emphasis on raw performance and ergonomics; the
ecosystem's consolidation point for perf-critical native. Reach for it when the boundary is the
bottleneck — high-frequency calls, large buffers (ArrayBuffers to avoid serialization),
real-time pipelines. The durable mechanics of *why* JSI code is fast (HostObject vs
HostFunction, data-shape choices) are worth understanding — see the reading.

## Tradeoffs and failure modes to name out loud

- **Hand-writing JSI you didn't need to.** Most "I need native" cases are an Expo Module, not
  raw JSI. Drop to Turbo/Nitro/JSI only when a managed module genuinely can't do it or the
  path is hot.
- **Ignoring the C++ ownership model.** With the bridge gone, the boundary is real memory and
  real threads; lifetime bugs and cross-runtime object passing are the new failure class.
  This is exactly what `react-native-jsi` owns — route there before shipping custom native.
- **Treating "New Arch migration" as optional.** It isn't (mandatory 0.82, stripped 0.84).
  Budgeting it as a someday-task on a pre-0.82 app is a planning error (`RB-E-RN-VERSIONS`).
- **Serializing across a non-serialized boundary.** A common Nitro/JSI lesson: passing big
  arrays-of-objects or strings where an ArrayBuffer/typed contract would do can swamp the
  gains. Data shape across the boundary is a first-order performance decision.

## How it interacts with the rest of the stack

- **RN versions (`RB-E-RN-VERSIONS`).** The New Architecture's mandatory/stripped timeline is
  *the* reason to track RN versions; this entry explains the architecture those versions ship.
- **Media (`RB-E-MEDIA`) & storage (`RB-E-STORAGE`).** The flagship Nitro/JSI consumers:
  VisionCamera v5 (frame processors), MMKV v4, op-sqlite. Those entries are the domain; this
  one is the module system underneath.
- **Build (`RB-E-BUILD`).** Codegen, precompiled iOS binaries, and Hermes V1 are the build-time
  side of the New Architecture.
- **JSI depth (`react-native-jsi`).** Memory ownership, threading, and JSI API correctness live
  there — this page tells you *which module path*, that skill tells you *how to not crash*.

## In one paragraph

The New Architecture deleted the async bridge: JS and native now share a synchronous C++ layer
(**JSI**), with **Fabric** rendering and **Turbo/Nitro Modules** for native code. It's
mandatory from RN 0.82 and Legacy is being stripped, so all new native work targets it. Choose
by how much native you're writing: **Expo Modules** for most needs (managed, even in bare RN),
**Nitro Modules** for performance-critical custom native (it's consolidating the ecosystem),
**Turbo Modules/Fabric** for standard custom work — and push JSI memory/threading correctness
down to `react-native-jsi`, because the boundary is now real C++.

---

*See also: `RB-E-RN-VERSIONS` (the mandatory-migration timeline), `RB-E-MEDIA` / `RB-E-STORAGE`
(flagship Nitro/JSI consumers), `RB-E-BUILD` (codegen, Hermes V1, precompiled iOS). JSI
memory/threading depth: the `react-native-jsi` skill.*
