---
id: RB-E-NATIVE-UI
title: "About native UI extensions — Live Activities, widgets, App Clips, portals"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium             # entry: settling but still iOS-leaning
updated: 2026-07-16
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-NATIVE-UI
defer_to_skill: null                                          # entry declares no depth-audit skill
related: [RB-E-KEYBOARD, RB-E-ANIMATION, RB-E-NATIVE]
sources:
  - "https://expo.dev/blog/ios-widgets-and-live-activities-in-expo"
  - "https://github.com/callstackincubator/voltra/releases/tag/v2.0.0"
  - "https://expo.dev/blog/worklet-integration-in-expo-ui-synchronously-controlling-swiftui-and-compose-state"
---

# About native UI extensions — Live Activities, widgets, App Clips, portals

> **Diataxis: Explanation.** This page builds *understanding* of the native-UI-extension
> decision — why widgets and Live Activities are unlike any other screen you ship, and how the
> candidate tools divide the work of producing them. It is not an ActivityKit how-to and not a
> widget-setup walkthrough. The candidate list and one-line tradeoffs live in the index entry
> `RB-E-NATIVE-UI`; the entry declares no depth-audit skill. Read this for the *why*.

## The one idea that organises everything: the OS owns these pixels

A widget or Live Activity is not a screen in your app. The Add Jam reading under this entry
lays out the machinery: a **separate widget-extension target** renders the Lock Screen and
Dynamic Island surfaces; content flows through ActivityKit's Attributes/ContentState model; and
updates arrive over the OS's channels — an HTTP-refresh vs APNs-push tradeoff the reading calls
a platform constraint that outlasts any single library. Your React app does not paint these
surfaces. Something has to produce the OS's declarative UI on your behalf — which makes the
real question of this shelf: **who compiles your React to the OS's declarative format?**

The candidates are three different answers to that question, plus one option outside it:

- **Expo compiles it.** expo-widgets builds iOS home-screen widgets and Live Activities from
  Expo UI components — no SwiftUI, no native code. STABLE in Expo SDK 56 (alpha in SDK 55);
  the entry's row adds "full env access, no pre-render" (quoted as-is; see the closing flags).
- **You write the OS's shapes in JS.** Voltra's layout is SwiftUI-style (VStack/HStack) — the
  OS's format, authored from JS. v2.0 (2026-06-18) rewrote onto Turbo Modules, so it now runs
  in BARE RN (the Expo-Modules / Dev-Client requirement is gone; v2 migration required). OS
  gates ride along: iOS 16.2+, interactive widgets 17+, activity families iOS 18+.
- **Nobody compiles — you author the native target yourself.** Expo Targets scaffolds native
  targets (widgets, App Clips, share extensions) in Swift/Kotlin or RN; multi-step setup. The
  Evan Bacon reading shows the machinery underneath both Expo paths: CNG pbxproj manipulation
  keeping SwiftUI targets editable yet outside /ios, App Group / NSUserDefaults data sharing,
  CSS-to-colorset conversion.
- **Outside the question: react-native-teleport** — portals that re-parent rendering into the
  native layer, web + native. One line in the entry, and the who-compiles lens does not apply
  to it; this doc scopes it accordingly rather than inventing detail.

One scoping note the entry itself supplies: this story is grounded for iOS — SwiftUI targets,
ActivityKit, iOS version gates. The note calls the area settling but still iOS-leaning, and
Compose appears only in the worklets item below.

## The default, and why

> On Expo → expo-widgets for iOS widgets/Live Activities (stable in SDK 56, no native code).
> Bare RN → Voltra 2 (now bare-RN capable). Custom native targets / App Clips / share
> extensions → Expo Targets.

The split follows who can compile for you. On Expo, the platform does it — expo-widgets, no
native code, stable as of SDK 56. On bare RN, Voltra 2's Turbo-Modules rewrite made it the
answer it previously wasn't (it was Expo-only before v2). And when the surface needs custom
native — App Clips, share extensions, widgets beyond what the compiled paths express — Expo
Targets hands you the target itself, in Swift/Kotlin or RN, at the cost of multi-step setup.

## The landscape, facet by facet

**expo-widgets (Expo)** — iOS widgets + Live Activities from Expo UI components, no
SwiftUI/native code; stable in SDK 56, alpha in SDK 55 (VERIFIED 2026-06); full env access, no
pre-render. The on-Expo default.

**Voltra (Callstack)** — Live Activities + widgets with SwiftUI-style layout (VStack/HStack).
The v2.0 rewrite (2026-06-18, Turbo Modules) is the capability flip of this entry: bare-RN
capable, Expo Modules no longer required, v2 migration required. iOS 16.2+; interactive 17+;
iOS 18+ activity families.

**Expo Targets** — native targets (widgets, App Clips, share extensions) in Swift/Kotlin or
RN; multi-step setup. The custom-native answer, sitting on the CNG mechanism the Bacon reading
documents.

**react-native-teleport** — portals rendering in the native layer via re-parenting; web +
native. Grouped by the entry with the less-settled options.

**Expo UI + worklets (2026-07-10, verified vs the post's og:description)** — Expo UI
integrates react-native-worklets: SwiftUI and Compose state can be driven SYNCHRONOUSLY on the
UI thread, no JS round-trips. The entry pins its relevance: when native-UI surfaces must track
gestures/animation.

**The production evidence** — the v0 iOS case study (Vercel) is the entry's picture of what
in-app native feel costs, adjacent to the OS-owned surfaces above: Liquid Glass via
@callstack/liquid-glass, native menus via Zeego/UIMenu, patching RCTUITextView, ~1,000 lines
of keyboard logic on react-native-keyboard-controller (see `RB-E-KEYBOARD`), synchronous
New-Arch measurements, LegendList — and the share-types-and-logic-not-UI lesson. The watching
row is its video companion: the v0 team on the upstream RN fixes the app produced.

## Tradeoffs and failure modes to name out loud

- **Assuming Voltra needs Expo.** Stale since v2.0 (2026-06-18): the Turbo-Modules rewrite
  dropped the Expo-Modules / Dev-Client requirement. The flip side: coming from v1, the v2
  migration is required, not optional.
- **Assuming expo-widgets is still alpha.** Also stale — alpha in SDK 55, stable in SDK 56.
  Which SDK you are on decides which claim is true for you.
- **Ignoring the iOS version gates.** Voltra's floor is iOS 16.2, interactivity needs 17+,
  activity families need iOS 18+. These are OS gates, not library choices.
- **Treating the shelf as cross-platform.** The entry's note is blunt: settling but still
  iOS-leaning; Android widgets and the portal/other options remain less settled — prototype
  platform coverage before committing.
- **Forgetting the update channel is a design decision.** HTTP-refresh vs APNs-push is the Add
  Jam reading's named tradeoff, and it belongs to the platform-constraint layer that outlasts
  any single library.
- **Driving a live surface through JS round-trips.** When a native-UI surface must track
  gestures/animation, the worklets integration exists precisely so SwiftUI/Compose state can
  be driven synchronously on the UI thread.

## How it interacts with the rest of the stack

- **Keyboard (`RB-E-KEYBOARD`).** The entry's own cross-reference: the v0 case study's ~1,000
  lines of keyboard logic on react-native-keyboard-controller live in that entry's territory —
  keyboard behavior is a large slice of what "feels native" means.
- **Animation (`RB-E-ANIMATION`).** react-native-worklets is the shared machinery: that
  entry's doc already names Expo UI synchronous state as a beyond-animation use of worklets;
  this entry supplies the native-UI side of the same fact.
- **Native integration (`RB-E-NATIVE`).** The module layer these tools stand on — Voltra 2 is
  a Turbo-Modules rewrite, and the Add Jam reading's Live Activities bridge is a native module
  connecting JS to Swift.

## In one paragraph

Widgets and Live Activities render in a separate widget-extension target on OS-owned surfaces
(Lock Screen, Dynamic Island), fed through ActivityKit's Attributes/ContentState model and
updated over HTTP-refresh or APNs-push — **the OS owns these pixels**, so the real question is
**who compiles your React to the OS's declarative format**. The candidates are three answers:
Expo compiles it (expo-widgets — Expo UI components, no SwiftUI, stable in SDK 56); you write
the OS's shapes from JS (Voltra — SwiftUI-style VStack/HStack, bare-RN capable since the v2.0
Turbo-Modules rewrite, iOS 16.2+/17+/18+ gates); or you author the native target yourself
(Expo Targets — widgets, App Clips, share extensions in Swift/Kotlin or RN, multi-step setup,
on the CNG pbxproj machinery). react-native-teleport's native-layer portals sit outside that
question, and the whole shelf is settling but still iOS-leaning — Android widgets and the
portal options are less settled, so prototype platform coverage before committing. When these
surfaces must track gestures or animation, Expo UI's worklets integration drives SwiftUI and
Compose state synchronously on the UI thread, no JS round-trips.

---

*See also: `RB-E-KEYBOARD` (the v0 case study's keyboard-controller work — the entry's own
pointer), `RB-E-ANIMATION` (worklets as shared machinery), `RB-E-NATIVE` (the Turbo-Modules /
native-module layer underneath). Background reading: Evan Bacon on CNG widget generation — the
foundational mechanism behind Expo Targets / expo-widgets; Add Jam on Live Activities'
platform constraints; Vercel's v0 iOS case study on what native feel actually costs.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "The OS owns these pixels" and the "who compiles your React to the OS's declarative
     format" question are the assigned organizing idea. The entry grounds the components
     (separate widget-extension target, ActivityKit model, HTTP/APNs channels, SwiftUI-style
     layout, no-SwiftUI compilation, Swift/Kotlin authorship) but never states the ownership
     framing or the compile question as a principle — that arrangement is editorial.
  2. "full env access, no pre-render" (expo-widgets row) is quoted verbatim without
     interpretation — the entry does not explain what pre-render alternative it contrasts
     with, so this doc does not guess.
  3. react-native-teleport has one line of entry text; the doc scopes it out of the
     who-compiles lens and adds no claims about how portals work.
  4. The OS-declarative-format story is grounded for iOS only (SwiftUI targets, ActivityKit,
     iOS gates); Compose appears solely in the worklets note, and Android widget compilation
     has no entry text — the doc says the shelf is iOS-leaning rather than extending the
     story to Android.
  5. The RB-E-NATIVE relation is inferred from the entry's Turbo-Modules and
     native-module-bridge mentions; the only entry-text cross-reference is RB-E-KEYBOARD
     (RB-E-ANIMATION is grounded reciprocally via that doc's existing pointer to this entry).
  6. The three-answers taxonomy (Expo compiles / you write the OS's shapes / you author the
     target) is an editorial arrangement of the option rows, not entry text.
-->
