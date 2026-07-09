---
id: RB-E-RN-VERSIONS
title: "About the React Native release timeline — an architecture migration in disguise"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-07-10
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-RN-VERSIONS
defer_to_skill: react-native-jsi
related: [RB-E-NATIVE, RB-E-BUILD, RB-E-REACT-CORE, RB-E-OTA]
sources:
  - "https://reactnative.dev/blog/2026/02/11/react-native-0.84"
  - "https://reactnative.dev/blog/2026/04/07/react-native-0.85"
  - "https://reactnative.dev/blog/2026/06/11/react-native-0.86"
---

# About the React Native release timeline — an architecture migration in disguise

> **Diataxis: Explanation.** This page builds *understanding* of what the version numbers mean —
> the arcs behind the changelog rows. It is not an upgrade how-to. New-Architecture internals are
> owned by `RB-E-NATIVE` and the `react-native-jsi` skill; engine/build detail by `RB-E-BUILD`.

## The one insight that organises everything: the timeline is three arcs, not eleven changelogs

Read 0.76 → 0.87 as release notes and it's noise. Read it as **three overlapping migrations**
and every row snaps into place:

1. **The architecture arc** — the async bridge dies. New Architecture default for new apps
   (0.76) → the *only* runtime (0.82) → Legacy frozen (0.80) and progressively stripped from
   core (0.84+) → bridge interop fully removed (0.85) → deprecated-API cleanup (0.87 RC:
   InteractionManager, core SafeAreaView, deep imports). One direction, no way back.
2. **The engine arc** — Hermes becomes *the* runtime, then gets fast. JavaScriptCore removed
   (0.81, Hermes-only) → Hermes V1 experimental (0.82) → **Hermes V1 default** (0.84), plus
   precompiled iOS binaries by default (0.84) — the build-time half of the same bet
   (`RB-E-BUILD`).
3. **The platform-floor arc** — the ground moves under you regardless of RN: React 19/19.2
   (0.78/0.83), Node 22.11+ (0.84), Android 16 + mandatory edge-to-edge (0.81 → in core 0.86),
   and Apple's hard rule that **App Store uploads must use Xcode 26 SDKs since 2026-04-28**.
   Floors don't negotiate; they schedule your upgrades for you.

## The default, and why

> Target the **latest stable RN (0.86)**; the New Architecture is non-optional from 0.82, so
> plan any migration around that line.

Staying current stopped being optional the moment arc 1 completed: below 0.82 you're on an
architecture that is frozen (no fixes since 0.80) and being deleted; libraries have followed
(Fabric-only releases like ReactVision are normal now). Meanwhile the *cost* of staying current
dropped — RN runs a bi-monthly cadence, and 0.86 was the second consecutive zero-breaking-change
release; Expo SDK 57 shipped same-cycle with it. The honest framing: upgrades used to be
projects, now they're maintenance — *unless* you fall behind the architecture line, where they
become projects again.

## Reading the landscape (how to use the version rows)

The index entry's per-version rows answer "what does moving from X to Y buy me": each row is the
version's *durable* change, not its full changelog. Two usage notes carry the trust model:

- Rows marked ✓ (0.84–0.86) are verified against the official RN release blogs; earlier rows
  come from release history and newsletters — **verify a pre-0.84 row against the RN blog before
  quoting it as authoritative**. The 0.87 row is RC-verified via npm and gets the same treatment
  when stable lands.
- The **Expo SDK mapping** in the entry note (SDK 55 = RN 0.83 · SDK 56 = RN 0.85 · SDK 57 =
  RN 0.86) is how most teams actually consume this timeline — you upgrade an SDK, and the RN
  version comes with it.

## Tradeoffs and failure modes to name out loud

- **Camping below 0.82.** Frozen Legacy Arch + a library ecosystem that has moved on = every
  month makes the eventual migration bigger. This is the one version cliff that compounds.
- **Treating floors as optional.** Xcode 26 (uploads), Node 22 (0.84), Android 16 targeting —
  these arrive on Apple/Google/OpenJS schedules, not yours. Budget for them out-of-cycle.
- **Upgrading RN but not the assumptions.** 0.85 moved the Jest preset (`RB-E-TESTING`); 0.86
  obsoleted `react-native-edge-to-edge`; 0.87 deletes deprecated imports. The gain of each
  version is paired with a small removal — read the row, not just the number.
- **Quoting old rows as gospel.** The corpus's own discipline applies to its readers: pre-0.84
  facts are history-sourced; verify before load-bearing use.
- **Skipping many versions at once.** Bi-monthly releases are small; five at once is a project.
  The cadence rewards continuous small upgrades — the same logic as dependency hygiene
  (`RB-E-DX`).

## How it interacts with the rest of the stack

- **Native (`RB-E-NATIVE`).** Arc 1 is *why* all new native work targets JSI/Fabric (Turbo/Nitro)
  — the timeline is the schedule of that entry's architecture.
- **Build (`RB-E-BUILD`).** Arc 2's precompiled-binaries trend (0.84 core, RNRepo, Expo SDK 56
  XCFrameworks) is the build-time story of the same releases.
- **React core (`RB-E-REACT-CORE`).** RN versions pin React versions (0.78→19, 0.83→19.2) — the
  Compiler/Activity era arrives *via* this timeline.
- **OTA (`RB-E-OTA`).** OTA ships JS only; every native-side row here is a store release. The
  boundary between the two entries *is* arc 1's JS/native line.

## In one paragraph

The RN version timeline is **three migrations wearing release numbers**: the bridge's removal
(New Arch default 0.76 → only runtime 0.82 → Legacy stripped and cleaned through 0.87), the
engine bet (Hermes-only 0.81 → Hermes V1 + precompiled builds by default 0.84), and the platform
floors that move underneath (React 19.x, Node 22, Android 16, Apple's Xcode-26 upload rule).
Target the latest stable (0.86, with Expo SDK 57 tracking it same-cycle), treat bi-monthly
upgrades as maintenance rather than projects, and know the one cliff that compounds: anything
below 0.82 is on borrowed, frozen, actively-deleted time.

---

*See also: `RB-E-NATIVE` (what the New Architecture is), `RB-E-BUILD` (engine + precompiled
builds), `RB-E-REACT-CORE` (the React versions each RN pins), `RB-E-OTA` (what can ship without
a store release). JSI/threading depth: the `react-native-jsi` skill.*
