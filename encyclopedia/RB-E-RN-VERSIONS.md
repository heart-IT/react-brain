---
id: RB-E-RN-VERSIONS
title: "About the React Native release timeline — the version ladder"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-07-16
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-RN-VERSIONS
defer_to_skill: react-native-jsi                              # New-Arch internals: JSI, Fabric, TurboModules, Codegen
related: [RB-E-NATIVE, RB-E-BUILD, RB-E-REACT-CORE, RB-E-TESTING]
sources:
  - "https://reactnative.dev/blog/2026/02/11/react-native-0.84"
  - "https://reactnative.dev/blog/2026/04/07/react-native-0.85"
  - "https://reactnative.dev/blog/2026/06/11/react-native-0.86"
  - "https://expo.dev/changelog/sdk-57"
  - "https://expo.dev/blog/app-store-connect-minimum-sdk-26"
---

# About the React Native release timeline — the version ladder

> **Diataxis: Explanation.** This page builds *understanding* of what an RN version number
> means — why the release timeline reads as an architecture timeline, not a changelog. It is
> not an upgrade how-to; the sequenced upgrade knowledge lives in the index entry's `migrate:`
> block (assembled by `react-brain migrate`), and the per-version rows themselves live in the
> index entry `RB-E-RN-VERSIONS`. New-Architecture internals — JSI, Fabric, TurboModules,
> Codegen — are owned by the `react-native-jsi` skill. Read this for the *why*.

## The one idea that organises everything: the version number is a rung, not a date

A React Native version tells you more than when a project last ran `npm install` — it tells
you **what code that project is allowed to write**. The entry's own migrate guidance says it
plainly: "the ladder crosses hard lines." Climb the rows and three kinds of permission change
under your feet:

1. **Architecture permission.** New Architecture ON by default (0.76) → Legacy Architecture
   **FROZEN** (0.80, dated 2025-06-02) → New Architecture **MANDATORY** — opt-out ignored
   (0.82) → Legacy-Arch **stripped** (0.84). Below 0.82 legacy code still runs, but on an
   architecture receiving no fixes; at 0.82 the opt-out stops working; at 0.84 the code you
   would fall back to is no longer shipped.
2. **Engine permission.** JavaScriptCore removed — Hermes-only (0.81) → Hermes V1
   experimental (0.82) → **Hermes V1 DEFAULT** plus precompiled iOS binaries by default
   (0.84). The engine stopped being a choice at 0.81; from 0.84 its next generation is simply
   what you get.
3. **API permission.** `react-native init` deprecated → Expo recommended (0.76); `forwardRef`
   deprecated → ref-as-prop (0.78, with React 19); core `SafeAreaView` deprecated →
   `safe-area-context` (0.81); and the 0.87 RC is a cleanup release that removes
   long-deprecated APIs (`InteractionManager`, `SafeAreaView`), restricts deep imports, and
   deprecates `ImageBackground`. Deprecations on one rung become removals a few rungs up.

The floors move too, on other people's schedules: iOS 15.1 / Android API 24 minimums (0.76),
Android 15's 16KB pages (0.77), Android 16 / API 36 with mandatory edge-to-edge (0.81), Node
22.11+ (0.84) — and, outside RN's ladder entirely, Apple's rule that since **2026-04-28** App
Store Connect uploads must be built with Xcode 26 / iOS-26-family SDKs.

## The default, and why

> Target the latest stable RN (0.86); the New Architecture is non-optional from 0.82, so plan
> any migration around that line.

The recommendation names one line, because one line dominates: **0.82 is where the New
Architecture became the only runtime.** Everything below it sits on an architecture frozen at
0.80 (no fixes) and stripped at 0.84 — the entry's when-clause is blunt: on RN < 0.82, budget
a New-Arch migration. And per the migrate block, every New-Arch-gated upgrade elsewhere in a
stack "unblocks at 0.82+" — the line is a dependency of other decisions, not just this one.

Meanwhile the top of the ladder got cheaper to stand on: RN runs a bi-monthly cadence (0.84),
0.86 was the second zero-breaking-change release, and Expo shipped SDK 57 against it having
skipped the beta phase precisely because 0.86 was breaking-change-free — with Expo testing
near-immediate optional upgrades as RN moves to six releases a year. Staying current is
routine; falling behind the architecture line is the expensive state.

## The landscape: reading the rungs

The entry's twelve rows (0.76 → 0.87 RC) are one row per version, each carrying that
version's durable change. Beyond the three permission lines above, the rows carry a steady
capability drip: CSS-ish styling — `display:contents`, `box-sizing`, `mixBlendMode`,
`outline` (0.77) after `boxShadow` + `filter` (0.76); React 19 with Actions,
`useActionState`, `useOptimistic`, `use`, and the React Compiler (0.78), the Compiler
reaching the default template as RC (0.81), React 19.2 with `<Activity>` and
`useEffectEvent` (0.83); DOM Node APIs (0.82) and Intersection Observer (0.83); Metro ~3x
faster cold start via deferred hashing, with remote-JS Chrome debugging removed (0.79); React
Native DevTools (0.76), its network inspector (0.83), light/dark (0.86); opt-in Strict
TypeScript API with types from source (0.80); `debugOptimized` Android variant (0.82);
prebuilt artefacts (0.83), precompiled iOS opt-in (0.81) then default (0.84); a shared C++
animation backend and the Jest preset moving to `@react-native/jest-preset` (0.85), the
layout-prop native driver landing in 0.85.1; Android-15+ edge-to-edge in core (0.86).

Two usage notes carry the entry's trust model:

- **Verification is per-row.** Rows marked ✓ (0.84–0.86) are verified against the official RN
  release blogs; 0.76–0.83 come from release history + RN Rewind — verify a specific row
  against the RN blog before quoting it as authoritative. The 0.87 row is RC-verified against
  npm's `next` tag (per TWiR #289) and should be re-verified against the release blog when
  stable lands.
- **Most teams ride the ladder via Expo.** The entry's mapping: SDK 55 = RN 0.83 + React
  19.2; SDK 56 = RN 0.85 + Expo UI stable; SDK 57 = RN 0.86 + React 19.2 (2026-06, verified
  against the SDK 57 changelog). The Apple floor lands here too: SDK 54/55 EAS images already
  run Xcode 26, SDK ≤ 53 needs an explicit image opt-in — practically, stay ≥ SDK 54.

For the *why it changed* behind the 0.76→0.82 arc — the old async JSON bridge giving way to
JSI, Fabric's immutable C++ shadow tree, Turbo Modules, Codegen — the entry's reading is
Felipe Ramalho's "React Native Architecture: From Bridge to Fabric" (Codeminer42): a
narrative, not a release note.

## Tradeoffs and failure modes to name out loud

- **Camping below 0.82.** Legacy has been frozen since 0.80 and stripped since 0.84; the
  when-clause is to budget a New-Arch migration, and the migrate block prices it at effort L
  with urgency *upgrade*. This is the rung where waiting compounds.
- **Carrying polyfills past the rung that absorbed them.** `react-native-edge-to-edge` is
  redundant on ≥ 0.86 — Android-15+ edge-to-edge is in core; the entry's second migrate row
  exists to delete the package.
- **Importing on borrowed time.** Still importing `InteractionManager`, core `SafeAreaView`,
  or deep paths → the when-clause says migrate now; the 0.87 RC removes and restricts them.
- **Quoting pre-0.84 rows as gospel.** The corpus's own discipline: history-sourced rows get
  verified against the RN blog before load-bearing use.
- **Missing floors that aren't RN's.** Node 22.11+ arrived with 0.84; the Xcode 26 upload
  rule binds since 2026-04-28 regardless of your RN version. Floors don't negotiate.
- **Assuming an upgrade only touches app code.** 0.85 moved the Jest preset to
  `@react-native/jest-preset` — some rungs break config, not components.

## How it interacts with the rest of the stack

- **New Architecture depth (`react-native-jsi`, `RB-E-NATIVE`).** The ladder is the
  *schedule* of the New Architecture; what JSI, Fabric, TurboModules, and Codegen actually
  are belongs to the skill and the native entry.
- **Build & engine (`RB-E-BUILD`).** Hermes V1, precompiled iOS binaries, prebuilt artefacts,
  and Metro's cold-start work are the build-time face of the same rungs.
- **React itself (`RB-E-REACT-CORE`).** RN versions pin React versions — 0.78 → React 19,
  0.83 → React 19.2. The Actions/Compiler era arrives *via* this ladder.
- **Testing (`RB-E-TESTING`).** The 0.85 Jest-preset move is where the ladder reaches into
  test config.
- **The migrate tool.** The entry's `migrate:` block is this page made executable: installed
  `react-native` below 0.86 → a sequenced, receipted upgrade case assembled by
  `react-brain migrate`.

## In one paragraph

The React Native version number is **an architecture timeline wearing a release number**:
where you stand on the ladder decides what code you're allowed to write. The New Architecture
went default (0.76) → Legacy frozen (0.80) → mandatory, opt-out ignored (0.82) → Legacy
stripped (0.84); the engine went Hermes-only (0.81) → Hermes V1 default with precompiled iOS
binaries (0.84); deprecated APIs (`InteractionManager`, core `SafeAreaView`, deep imports)
fall off at the 0.87 cleanup release. Target the latest stable (0.86 — second consecutive
zero-breaking-change release, bi-monthly cadence, Expo SDK 57 tracking it same-cycle), plan
any migration around the 0.82 line, verify pre-0.84 rows against the RN blog before quoting
them, and respect the floors that move on Apple's and Node's schedules, not yours.

---

*See also: `RB-E-NATIVE` (what the New Architecture is), `RB-E-BUILD` (Hermes, precompiled
binaries, Metro), `RB-E-REACT-CORE` (the React versions each RN pins), `RB-E-TESTING` (the
0.85 Jest-preset move). New-Arch internals — JSI, Fabric, TurboModules, Codegen: the
`react-native-jsi` skill. Background reading: Felipe Ramalho, "React Native Architecture:
From Bridge to Fabric" (Codeminer42).*

<!-- CANNOT GROUND (flagged, not invented):
  1. The "rung = permission / what code you're allowed to write" framing is the assigned
     organizing idea; the entry's migrate.why grounds the word "ladder" ("the ladder crosses
     hard lines") and the rows ground each hard line, but the permission metaphor itself is
     editorial.
  2. related-entry id mapping (RB-E-NATIVE, RB-E-BUILD, RB-E-REACT-CORE, RB-E-TESTING) is
     inferred from row facts (New Arch, Hermes/precompiled/Metro, React 19/19.2, Jest
     preset); the entry names no related ids.
  3. "Staying current is routine; falling behind ... is the expensive state" — inference from
     bi-monthly cadence + two zero-breaking-change releases + Expo's near-immediate-upgrade
     experiment + the frozen/stripped Legacy line; the entry makes no explicit cost claim.
  4. Grouping the twelve rows into permission lines + a capability drip is an editorial
     arrangement; every row fact is entry text, the grouping is not.
  5. "The line is a dependency of other decisions" — restatement of migrate.why's "every
     New-Arch-gated upgrade below unblocks at 0.82+"; the generalisation is editorial.
-->
