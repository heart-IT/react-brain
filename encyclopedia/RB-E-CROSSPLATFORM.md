---
id: RB-E-CROSSPLATFORM
title: "About sharing code across React (web) & React Native"
diataxis: explanation
status: reviewed
confidence: high
updated: 2026-06-17
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-CROSSPLATFORM
defer_to_skill: engineering-principles                        # boundaries / dependency direction
related: [RB-E-STATE, RB-E-DATA, RB-E-STYLING, RB-E-NAV, RB-E-META-FRAMEWORKS]
sources:
  - "https://nicolasgallagher.com/one-react-for-web-and-native/"
  - "https://www.callstack.com/podcasts/from-react-native-web-to-react-strict-dom"
---

# About sharing code across React (web) & React Native

> **Diataxis: Explanation.** This is the conceptual core of why `react-brain` exists: when
> a team maintains both a web app and a native app, duplicated logic is the prime target.
> This page explains *how to think about* sharing and *why* the recommendation is shaped
> the way it is. The option list lives in the index entry `RB-E-CROSSPLATFORM`.

## "Write once, run anywhere" is the wrong frame

The seductive promise is one codebase for web and native. The durable reality is subtler:
**some layers share almost for free, and one layer — UI — fights you.** Teams that try to
share *everything* hit an abstraction tax (leaky `Platform.select` everywhere, lowest-
common-denominator components) and conclude "cross-platform doesn't work." Teams that
share *by layer* get most of the benefit with little of the pain. So the real question is
not "share or not" but **"which layers, and how far up the stack?"**

## The layered model (the mental model to keep)

Think of an app as a stack, sharing-friendliness *decreasing* as you go up:

1. **Logic & hooks** — pure functions, business rules, validation, formatting, custom
   hooks. Platform-agnostic by nature. **Share first; this is the highest-leverage, lowest-
   risk win.**
2. **State & data** — client state (`RB-E-STATE`) and the data layer (`RB-E-DATA`). The
   leading libraries (Zustand, TanStack Query) are already platform-agnostic, so this layer
   shares cleanly — put it in the common package.
3. **UI** — components and styling. This is where platforms genuinely differ (navigation
   patterns, gestures, native controls, motion), and where "share everything" goes wrong.
   Share *here* only with eyes open, using one of the dedicated approaches below.

The single most useful action for most teams is unglamorous: **extract a platform-agnostic
logic/hooks package** (layers 1–2) into the monorepo and consume it from both apps. That
alone removes most duplication and the bugs that come from two drifting copies — and it's
reversible and low-risk. Depth on package boundaries and dependency direction is owned by
`engineering-principles`.

## The default, and why

> **Share a logic/hooks package first.** For shared *UI* on **new** projects, evaluate
> **React Strict DOM** or **Expo Universal Components** — not a fresh `react-native-web` bet.

The UI clause carries a verified, load-bearing 2026 shift (below). The ordering — logic
before UI — is deliberate: it front-loads the cheap, certain wins and defers the hard,
opinion-heavy UI decision until you actually need shared components.

## The verified shift you must not miss

**`react-native-web` has entered maintenance-only mode.** Its creator, Nicolas Gallagher,
and early adopter Zalando have pivoted to **React Strict DOM (RSD)**, and Software Mansion's
ecosystem read is "no major features on the horizon." This does **not** mean existing
RN-Web apps are in trouble — they keep working. It means **a *new* universal bet should not
be placed on RN-Web's continued evolution.** This is why the default points elsewhere for
greenfield UI sharing. (Sources: Gallagher's "One React for web and native"; Callstack's
"From React Native Web to React Strict DOM.")

The deeper reason RSD is the heir: RN-Web works by mapping *React Native primitives onto
HTML* (native-first, web-as-target), whereas **RSD inverts it** — you write *strict HTML
and CSS*, a Babel step flattens it to real DOM + static CSS on web and to RN styles on
native (web-standards-first). That direction aligns with where the platform is going.

## The UI-sharing landscape, and when each wins

**Platform-extension files (`.web.tsx` / `.native.tsx`)** — one import, two
implementations resolved by the bundler. Simple, explicit, no framework buy-in; the honest
default when a handful of components need to diverge. It scales poorly if *most* components
need it (then you wanted a real cross-platform UI layer).

**React Strict DOM (Meta)** — the strategic bet for new universal UI: write standards-based
HTML/CSS once, render web + native. Cost is an involved, multi-step setup and a younger
ecosystem — you're betting on the trajectory, not the maturity.

**Expo Universal Components / `@expo/ui`** — a single component API that renders as **native
SwiftUI (iOS) / Jetpack Compose (Android) / react-dom (web)**. Wins on platform *fidelity*
(real native controls, not bridged approximations) and pairs naturally with an Expo app;
the tradeoff is Expo coupling and newness.

**Tamagui** — cross-platform UI kit with an optimizing compiler; a more batteries-included
route when you want a component system rather than primitives.

**Solito** — not a UI layer but a **shared-routing** bridge across Expo Router + Next.js, so
navigation is one mental model across web and native (see `RB-E-NAV`).

**Expo DOM Components (`use dom`)** — render real *web* components inside a React Native app
via a webview wrapper. The pragmatic escape hatch for **incremental** reuse of existing web
UI in a native shell, not a foundation for a whole app.

## Tradeoffs and failure modes to name out loud

- **Sharing UI too aggressively** — chasing a single component tree across platforms
  produces lowest-common-denominator UX. Platforms have conventions (back gestures, tab
  bars, native pickers); the ecosystem trend is to *honor* them, not paper over them.
- **The abstraction tax** — every `Platform.select` and per-platform branch is coupling.
  If a "shared" component is mostly branches, it isn't shared; split it.
- **Rendering RN-on-web vs building web properly** — RN-Web-style approaches can yield
  un-idiomatic, heavier web output. RSD's standards-first direction exists precisely to
  avoid this.
- **Framework lock-in** — Expo Universal Components and Solito tie you to Expo/Next; fine if
  you're already there, a cost if you're not.

## How it interacts with the rest of the stack

- **State & data (`RB-E-STATE`, `RB-E-DATA`)** — these share cleanly and should live in the
  common package; they're the easy 80%.
- **Styling (`RB-E-STYLING`)** — RSD is both a code-sharing *and* a styling strategy (it
  compiles to static CSS on web); the two entries describe the same tool from two angles.
- **Navigation / meta-frameworks (`RB-E-NAV`, `RB-E-META-FRAMEWORKS`)** — Solito and Expo
  Router shape how routing is shared web↔native.
- **Architecture depth** — package boundaries, dependency direction, and what may import
  what are owned by `engineering-principles`.

## In one paragraph

Don't try to "write once, run anywhere"; **share by layer.** Extract a platform-agnostic
logic + state + data package first — the cheap, certain, reversible win. Defer shared *UI*
until you need it, and when you do, bet new work on **React Strict DOM** or **Expo Universal
Components**, not on `react-native-web` (now maintenance-only). Honor platform UI
conventions rather than flattening them. This layered discipline is precisely the
duplication `react-brain` is built to help teams collapse.

---

*See also: `RB-E-STATE` & `RB-E-DATA` (the layers that share cleanly), `RB-E-STYLING`
(React Strict DOM as a styling strategy), `RB-E-NAV` / `RB-E-META-FRAMEWORKS` (shared
routing). Architecture depth: the `engineering-principles` skill.*
