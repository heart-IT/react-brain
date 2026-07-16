---
id: RB-E-BROWNFIELD
title: "About brownfield integration & micro-frontends"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low                # entry is lightly vetted; landscape includes alpha tooling
updated: 2026-07-16
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-BROWNFIELD
defer_to_skill: engineering-principles                        # depth: generic architecture/code-quality judgment
related: [RB-E-OTA, RB-E-NATIVE]
sources:
  - "https://github.com/callstack/react-native-brownfield"
  - "https://registry.npmjs.org/@callstack/brownie"
  - "https://docs.expo.dev/brownfield/overview/"
  - "https://www.callstack.com/blog/how-we-made-hybrid-ios-apps-compile-39-faster-with-react-native-brownfield"
---

# About brownfield integration & micro-frontends

> **Diataxis: Explanation.** This page builds *understanding* of the brownfield decision —
> why embedding React Native in an existing native app is a boundary problem, and how the
> candidate tools divide that boundary between them. It is not an embedding how-to and not
> an XCFramework walkthrough. The candidate list and one-line tradeoffs live in the index
> entry `RB-E-BROWNFIELD`; depth defers to the `engineering-principles` skill. Read this for
> the *why*.

## The one idea that organises everything: the boundary is the product

In a greenfield RN app the framework owns the whole screen and the interesting work is
inside it. In a brownfield app the interesting work is the **seam**: a contract between the
host native app and the embedded RN surface. The entry's candidates barely overlap — because
each one owns a different clause of that contract:

- **Init.** Who starts React Native, and how self-contained that start is.
  react-native-brownfield's whole pitch is a self-contained iOS init —
  `ReactNativeBrownfield.shared.startReactNative()`, wrapping RN core's
  `RCTReactNativeFactory`. Expo's first-party path answers the same clause by packaging the
  embed itself: the `npx brownfield package:ios` XCFramework flow.
- **State.** What crosses the seam while both sides run. Brownie
  (`@callstack/brownie`) shares native↔JS state for brownfield and generates Swift + Kotlin
  types from `.brownie.ts` — the contract made literal, as generated types on both sides
  (iOS + Android; stable, v3.13.x, 2026-06).
- **Deployment granularity.** How much ships independently. Granite (Toss) makes each screen
  an independently deployable ~200KB bundle on a CDN (ESBuild); Rock (Callstack) targets
  super-apps via micro-frontends plus native build caching.
- **Updates.** Whether the embedded surface can change without the host shipping. The
  entry's capability flip (2026-07-10, verified against the Callstack article body): Expo
  Updates now works in an **isolated** brownfield architecture with SDK 55 — OTA for
  embedded RN screens was previously a known limitation, and "that limitation is a thing of
  the past."

The libraries differ, in other words, by **how much of the contract they own**: one owns
init, one owns the state clause, two own deployment shape, and the Expo path — the
first-party alternative to the Callstack tooling, since SDK 55 — owns packaging and, now,
updates. (The entry grounds these four clauses; other clauses a real seam has — threading,
navigation handoff — it does not cover, though its Zalando reading shows the handoff being
*measured*, via a Meaningful Render metric.)

## The default, and why

> A scale-stage concern: embed RN into a native app with react-native-brownfield
> (+ ReactNativeFactory on iOS). For independently-deployable screens / super-apps, look at
> Granite or Rock.

"Scale-stage" is the load-bearing phrase, and the note repeats it: this is tooling you reach
for when a native app — and usually an organisation around it — already exists. The two
when-clauses split cleanly along the contract: adding RN screens to an existing native app is
the init clause → react-native-brownfield; many teams shipping independent bundles is the
deployment clause → Granite / Rock. The landscape is mostly Callstack/Toss tooling (several
alpha) plus, since SDK 55, the first-party Expo path.

## The landscape, facet by facet

**react-native-brownfield (Callstack)** — the embed itself: RN inside an existing native
app, with the self-contained iOS init (`startReactNative()` over `RCTReactNativeFactory`).
The recommendation's named default for the add-RN-screens case.

**Expo brownfield (first-party, SDK 55+)** — the official Expo path for adding Expo/RN to an
existing native app (docs.expo.dev/brownfield), built around the
`npx brownfield package:ios` XCFramework flow. Two facts ride on that same prebuilt flow:
it is what unlocked Expo Updates in isolated brownfield embeds, and it cuts hybrid iOS
compile times ~39% (Callstack, 2026-07).

**Brownie (@callstack/brownie)** — the state seam: native↔JS state sharing with Swift +
Kotlin types generated from `.brownie.ts`, iOS + Android. Notably carries an explicit
stability marker (v3.13.x, 2026-06) in a landscape the note labels "several alpha".

**Granite (Toss)** — micro-frontends: each screen an independently deployable ~200KB CDN
bundle, built with ESBuild.

**Rock (Callstack)** — super-apps via micro-frontends plus native build caching.

The production evidence lives in the entry's reading list: Doctolib rebuilding a
115M-hits/month homepage from WebView to native RN with a BFF-driven section architecture
(~50% TTI improvement, measurable conversion gains), and the Zalando meetup lessons —
brownfield-handoff metrics (Meaningful Render), video-feed jank sequencing, native API
bridging, on-device LLM hardware variance.

## Tradeoffs and failure modes to name out loud

- **Reaching for this at the wrong stage.** The entry says it twice — a scale-stage concern.
  A greenfield app has no host to contract with; this shelf is for apps that already exist.
- **Assuming OTA can't reach embedded screens.** Stale since SDK 55: the capability flip is
  the entry's own headline note, and it points at `RB-E-OTA` for that side of the story.
- **Treating the landscape as uniformly stable.** The note says "several alpha" without
  naming which; only Brownie carries an explicit stable version and date in the entry.
  Verify the maturity of any specific tool before committing.
- **Paying full hybrid compile cost.** The prebuilt-XCFramework flow exists partly because
  rebuilding RN inside a native app is expensive — ~39% faster hybrid iOS compiles is the
  measured win; Rock's native build caching is the same concern at super-app scale.
- **Micro-frontends without the org that needs them.** Granite/Rock's when-clause is "many
  teams shipping independent bundles" — a team-shape condition. One team with one release
  train is the other when-clause.
- **An unmeasured handoff.** The Zalando reading's first lesson is a metric — Meaningful
  Render — for the brownfield handoff; the seam is a product surface, so it needs its own
  measurement.

## How it interacts with the rest of the stack

- **OTA (`RB-E-OTA`).** The entry's own cross-reference: Expo Updates inside an isolated
  brownfield embed is the intersection of the two entries — which surface can change without
  a host release is now a live question on both.
- **Native integration (`RB-E-NATIVE`).** The init clause is built directly on RN core's
  native surface (`RCTReactNativeFactory`); the embed sits inside the platform-native layer
  that entry owns.
- **Depth (`engineering-principles`).** No specialist skill owns brownfield depth here; the
  defer is to generic architecture and code-quality judgment.

## In one paragraph

Embedding React Native in an existing native app makes **the boundary the product**: a
contract between host and embed, whose clauses the candidate tools divide between them.
react-native-brownfield owns init (self-contained
`ReactNativeBrownfield.shared.startReactNative()` over RN core's `RCTReactNativeFactory`);
Brownie owns state (native↔JS sharing with Swift + Kotlin types generated from
`.brownie.ts`); Granite and Rock own deployment shape (independently deployable ~200KB CDN
bundles per screen; super-apps with native build caching); and Expo's first-party path (SDK
55+) owns packaging via the `npx brownfield package:ios` XCFramework flow — which also
unlocked Expo Updates in isolated brownfield embeds (previously a known limitation; see
`RB-E-OTA`) and cut hybrid iOS compile times ~39%. It is a scale-stage concern in a
landscape that is mostly Callstack/Toss tooling, several of them alpha: add RN screens →
react-native-brownfield; many teams shipping independent bundles → Granite or Rock; verify
maturity before committing.

---

*See also: `RB-E-OTA` (Expo Updates in isolated brownfield embeds — the entry's capability
flip), `RB-E-NATIVE` (the platform-native surface the init clause builds on). Depth: the
`engineering-principles` skill. Background reading: Doctolib's WebView→native homepage
rebuild, Callstack on Expo Updates in isolated brownfield (SDK 55), and the Zalando
production lessons (Meaningful Render and friends).*

<!-- CANNOT GROUND (flagged, not invented):
  1. The assigned organizing idea names "threading" and "navigation handoff" as contract
     clauses — the entry has no text on either. Nearest grounding: the Zalando reading's
     "brownfield-handoff metrics (Meaningful Render)" and "native API bridging". This doc
     scopes the contract to the four clauses the entry grounds (init, state, deployment
     granularity, updates) and says so inline.
  2. "The libraries differ by how much of the contract they own" — the clause-per-library
     assignment is an editorial arrangement of the entry's option tradeoffs, not entry text.
  3. RB-E-NATIVE relation is inferred (group: platform-native; RCTReactNativeFactory is RN
     core surface); the entry's only named cross-reference is RB-E-OTA.
  4. "A team-shape condition" / "organisation around it" — editorial gloss on the
     when-clause "many teams shipping independent bundles" and on "scale-stage".
  5. "The prebuilt-XCFramework flow exists partly because rebuilding RN inside a native app
     is expensive" — inference from the ~39% compile-time claim; the entry states the win,
     not the motivation.
  6. Frontmatter confidence: low is entry text, but the entry has no explicit vetting
     sentence like RB-E-CALENDARS'; "lightly vetted" in the frontmatter comment is inferred
     from confidence: low + "several alpha".
-->
