---
id: RB-E-SHEETS
title: "About bottom sheets & modal sheets (React Native)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-08-18
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-SHEETS
defer_to_skill: react-native-best-practices
related: [RB-E-NAV, RB-E-POLISH, RB-E-KEYBOARD, RB-E-NATIVE-UI]
sources:
  - "https://registry.npmjs.org/@gorhom%2Fbottom-sheet/latest"
  - "https://registry.npmjs.org/@swmansion%2Freact-native-bottom-sheet/latest"
  - "https://registry.npmjs.org/@lodev09%2Freact-native-true-sheet/latest"
---

# About bottom sheets & modal sheets (React Native)

> **Diataxis: Explanation.** This page builds *understanding* of why the sheet decision is a
> decision at all, and why the recommendation now leans native. It is not an install guide or an
> API reference. Rendering-performance depth belongs to `react-native-best-practices`; keyboard
> behavior to `RB-E-KEYBOARD`; routing to `RB-E-NAV`; platform-feel in general to
> `RB-E-NATIVE-UI`. Read this for the *why*.

## The one distinction that organises everything: drawing a sheet vs presenting one

There are two fundamentally different things a React Native library can do when you ask for a
bottom sheet, and almost every difference between the options falls out of which one it does.

It can **draw** a sheet: a `View` positioned by animated values, with pan gestures wired to
translate it, snap points implemented as numbers you supply, and a backdrop you also draw. That is
`@gorhom/bottom-sheet`, built on Reanimated and Gesture Handler. Everything about the sheet is
yours — which is exactly the appeal, and exactly the cost.

Or it can **present** one: hand the content to the platform and let the OS put it on screen —
`UISheetPresentationController` on iOS, the Material bottom-sheet machinery on Android. That is
`react-native-true-sheet` and `@swmansion/react-native-bottom-sheet`. You get the platform's
detents, the platform's rubber-banding and dismissal physics, the platform's screen-reader
semantics, and — on iOS 26 — the platform's Liquid Glass material, because none of it was
re-implemented in the first place.

Everything below is a consequence of that split.

## Why "just draw it" stops being free

A drawn sheet has to re-answer, in your code, questions the OS already answers:

- **Dismissal physics.** Real sheets dismiss on *velocity*, not on distance crossed — a fast flick
  from near the top should dismiss, a slow drag past halfway should not. The reading in the index
  entry (Emil Kowalski, author of Vaul) is the canonical rationale for this and the related
  choices, and it is worth reading precisely because these are *your* decisions once you draw.
- **Scroll-vs-drag handoff.** When the sheet contains a list, the gesture has to belong to the
  sheet until the list is at its top, and to the list after. Getting this subtly wrong is the most
  common way a sheet feels "off" without anyone being able to say why.
- **Accessibility semantics.** A presented sheet arrives with a grabber label, detent state
  announcements and a dialog/pane role. A drawn one is a `View` until you say otherwise.
- **The keyboard.** A sheet holding a `TextInput` has to move with the keyboard, on two platforms
  that animate the keyboard on different clocks (see `RB-E-KEYBOARD`). Native sheets inherit the
  platform's behavior; drawn sheets inherit your bug backlog.
- **Tablets.** iPad and Android tablets expect a *side* sheet, not a phone-shaped sheet stretched
  across a tablet display. A phone-shaped sheet on a tablet is usually the visible signature of a
  drawn one.

None of that makes drawing wrong. It makes drawing a choice you should make *deliberately*, for
sheets whose gesture behavior is genuinely custom.

## Why the default inverted this month

When this entry was drafted (2026-07-16), `@gorhom/bottom-sheet` was the safe default and the
native entrants were the interesting newcomers. A month of watching moved the line:

- **The native option grew up.** `react-native-true-sheet` reached 3.11.11 (2026-08-12) while
  publishing every few days, and it is no longer the *simpler* option — it is the more *complete*
  one: Fabric-only by design, native accessibility strings, built-in keyboard handling, side
  sheets for iPad and Android tablets, iOS 26+ Liquid Glass, first-class Reanimated interop, and a
  sheet navigator for React Navigation. A 4.0.0-beta.3 line is already open.
- **The incumbent went quiet.** `@gorhom/bottom-sheet` sits at 5.2.14, published 2026-05-09, with
  no repository push since that date and 74 open issues. It is not abandoned, and ~9.1k stars of
  deployed base do not evaporate — but "safe default" is a claim about maintenance as much as
  about features, and that claim is weaker than it was.

So the index entry now says: present by default, draw when you need custom choreography.

## The third shape: a sheet that is really a screen

Some sheets are not components at all. If the sheet is deep-linkable, appears in the back stack,
and owns its own data loading, it is a **route** that happens to be presented as a sheet.

Two paths exist. `react-native-screens` can present a native-stack route as a FormSheet with
detents — still experimental on the 4.x line (4.27.0, 2026-08-07; a 5.0.0-alpha.2 line is open),
so pin it. Or use `react-native-true-sheet`'s sheet navigator, which reaches the same shape
without waiting on the screens rewrite. The decision is not "which library" but "is this a
component or a destination" — and answering that first usually settles the library question.

## What the field looks like (and why confidence is medium, not high)

The 34-app census (2026-08-18) finds a sheet library in 7 of 14 React Native apps: `@gorhom/bottom-sheet`
in 7 of them, `react-native-true-sheet` in 1. Adoption still points at the incumbent, which is
what a *recent* inversion looks like — the argument moved before the ecosystem did. Two further
reasons to hold this at medium confidence: `@swmansion/react-native-bottom-sheet` is still 0.x
(0.16.2, with 0.17.0-next.1 on the `next` tag), and the option this entry now leads with has a
major version in beta. Both are wired as tripwires in the index entry, so a stable 1.0 or 4.0
forces this page to be re-read rather than quietly aging.

## How to read the recommendation

1. **Is this a destination or a component?** Destination → sheet navigator or FormSheet route.
2. **Does the sheet need genuinely custom gesture behavior?** Yes → `@gorhom/bottom-sheet`, and
   budget for the physics and handoff work as real work.
3. **Otherwise, present the OS sheet** — `react-native-true-sheet` today (New Architecture
   required), `@swmansion/react-native-bottom-sheet` if you want to bet on the Software Mansion
   line and can absorb 0.x churn.
4. **Pin whichever you choose.** Every native option here is pre-1.0 or shipping weekly.
