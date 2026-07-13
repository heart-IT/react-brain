---
id: RB-E-KEYBOARD
title: "About keyboard handling & avoidance (React Native)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-13
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-KEYBOARD
defer_to_skill: react-native-best-practices
related: [RB-E-FORMS, RB-E-NATIVE-UI]
sources:
  - "https://blog.margelo.com/deep-dive-in-keyboard-handling"
---

# About keyboard handling & avoidance (React Native)

> **Diataxis: Explanation.** This page builds *understanding* of why the keyboard is a top RN
> pain point and why the recommendation is shaped the way it is. It is not an install or API
> guide. Performance depth is owned by `react-native-best-practices`; form-screen composition by
> `RB-E-FORMS`; platform-native feel by `RB-E-NATIVE-UI`. Read this for the *why*.

## The one principle that organises everything: the two platforms animate the keyboard on different clocks

Every keyboard bug you have ever shipped in React Native traces back to one asymmetry: **iOS and
Android do not animate the keyboard the same way.** iOS uses a **scheduled animation with
predefined curves** — the system announces the transition and the UI can ride along smoothly.
Modern Android instead delivers **per-frame insets** through `WindowInsetsAnimationCallback` —
there is no pre-announced curve to ride; you get the keyboard's position frame by frame, and
anything that doesn't consume those per-frame insets simply *jumps*. That single difference is
why the same core component feels polished on one platform and broken on the other, and why
Android 15's edge-to-edge mode — which breaks the legacy `adjustResize` behavior — turned a
long-standing annoyance into outright breakage. A library that speaks both dialects,
synchronizing iOS and Android animations via `WindowInsetsAnimationCallback`, is what unifies
the clocks. That library is **react-native-keyboard-controller**.

## The default, and why

> Core KeyboardAvoidingView is fine for simple iOS-first layouts; for cross-platform parity
> (especially Android + edge-to-edge) use react-native-keyboard-controller —
> KeyboardAwareScrollView for forms, KeyboardStickyView for footers.

The default is two-tier because the failure is platform-asymmetric. Core `KeyboardAvoidingView`
is built in and genuinely smooth on iOS — the scheduled animation with predefined curves gives it
everything it needs. But on Android it has no per-frame insets to animate against, so it
**snaps**, and under Android-15 edge-to-edge it breaks outright. The moment Android parity
matters, you graduate to **react-native-keyboard-controller** (Kirill Zyusko) — the modern
de-facto fix, with synced iOS/Android keyboard animations via `WindowInsetsAnimationCallback` and
edge-to-edge handled. It also ships purpose-built components, so the choice within the library is
made by screen shape, not by guesswork: `KeyboardAwareScrollView` for forms,
`KeyboardStickyView` for footers.

## The landscape, and when each piece earns its place

**KeyboardAvoidingView (core)** — built in, zero dependencies, smooth on iOS. Earns its place
exactly once: *simple iOS-first spacing only*. Its Android behavior (snap, no per-frame insets)
and Android-15 edge-to-edge breakage are why it doesn't scale past that.

**react-native-keyboard-controller** — the parity library. Synced animations on both platforms,
edge-to-edge handled, and two shaped components: **KeyboardAwareScrollView** for *scrollable
forms with multiple inputs* (the classic multi-field screen where the focused input must stay
visible), and **KeyboardStickyView** for a *footer or toolbar riding the keyboard* (chat input
bars, action footers).

**react-native-avoid-softinput** — the alternative, an Android-focused soft-input avoidance
library. It exists for the platform where core hurts most, but the cross-platform parity story
belongs to keyboard-controller.

## Tradeoffs and failure modes to name out loud

- **Shipping no keyboard library at all.** The entry's own claim for that state: core
  `KeyboardAvoidingView` snaps on Android (no per-frame insets) and breaks under Android-15
  edge-to-edge; react-native-keyboard-controller is the modern parity fix.
- **Testing only on iOS.** Core looks *finished* on iOS because the scheduled-animation model
  flatters it. The snap is an Android-only symptom — iOS-first teams ship it without ever
  seeing it.
- **Treating Android 15 as a rerun of old pain.** Edge-to-edge doesn't just make the keyboard
  janky; it breaks the legacy `adjustResize` path that older workarounds leaned on.
- **`KeyboardAvoidingView` in source without the parity dep.** This is literally the signal the
  entry's doctor flags: core usage with no `react-native-keyboard-controller` installed is a
  named smell, not a style preference.
- **Reaching for avoid-softinput expecting breadth.** It is the Android-focused alternative;
  synced two-platform animation is keyboard-controller's job.

## How it interacts with the rest of the stack

- **Forms (`RB-E-FORMS`).** The entry explicitly pairs with forms: a form screen is where
  keyboard avoidance stops being cosmetic. The scrollable-multi-input case is exactly the
  `KeyboardAwareScrollView` when-clause.
- **Native feel (`RB-E-NATIVE-UI`).** Keyboard behavior is a large slice of what "feels native"
  means; that entry's production case study points back here for its keyboard-controller work.
- **Performance depth (`react-native-best-practices`).** The defer skill — animation and
  interaction performance discipline lives there; this entry owns only the *which library and
  why*.

## In one paragraph

React Native keyboard handling is a top pain point for one structural reason: **iOS schedules a
keyboard animation with predefined curves while modern Android delivers per-frame insets via
`WindowInsetsAnimationCallback`** — so core `KeyboardAvoidingView` is smooth on iOS, snaps on
Android, and breaks under Android-15 edge-to-edge (which kills legacy `adjustResize`). Keep core
only for simple iOS-first spacing; for cross-platform parity use
**react-native-keyboard-controller**, which syncs the two platforms' animation clocks and ships
`KeyboardAwareScrollView` for scrollable forms and `KeyboardStickyView` for footers riding the
keyboard. `react-native-avoid-softinput` remains the Android-focused alternative.

---

*See also: `RB-E-FORMS` (form screens are where avoidance bites), `RB-E-NATIVE-UI`
(keyboard behavior as part of native feel). Performance depth: the
`react-native-best-practices` skill. Background reading: the Margelo keyboard deep-dive by
Kirill Zyusko, the library's maintainer.*
