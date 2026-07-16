---
id: RB-E-POLISH
title: "About UX polish primitives — toasts, haptics, splash screens, image viewers"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low
updated: 2026-07-16
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-POLISH
defer_to_skill: react-native-best-practices                   # entry names the skill without scoping it
related: []                                                   # the entry names no sibling RB-E entries
sources:
  - "https://registry.npmjs.org/sonner-native/latest"
  - "https://registry.npmjs.org/react-native-bootsplash/latest"
  - "https://registry.npmjs.org/@nandorojo/galeria/latest"
---

# About UX polish primitives — toasts, haptics, splash screens, image viewers

> **Diataxis: Explanation.** This page builds *understanding* of the polish decision — why
> four unrelated micro-domains share one index entry, and why the recommendation's real
> content is a discipline ("pick once, move on") rather than a comparison matrix. It is not
> a wiring guide for any of these libraries. The candidate list and one-line tradeoffs live
> in the index entry `RB-E-POLISH`; depth is deferred to the `react-native-best-practices`
> skill. Read this for the *why*.

## The one idea that organises everything: a checklist, not four decisions

The entry is deliberately **one entry, not four** — its own words: none of these
micro-domains "carries enough selection weight alone, but together they are the 'app feels
finished' checklist." Toasts, haptics, splash screens, and image lightboxes are the layer
that separates a working app from a finished-feeling one, and each is too small to deserve
a library hunt. That is the organizing inversion: **the selection attention these domains
deserve is minutes; the craft attention belongs in the details after the pick.** The
recommendation closes on exactly that note — "the polish is in the details, not the
library hunt."

The provenance matches the shape. All four domains surfaced in Native Weekly's 2026 run
(sonner-native, bootsplash 7, galeria, react-native-tickle) and were promoted into the
encyclopedia on the user's call, as recurring micro-domains that previously had no home.
Versions and dates were verified against npm on 2026-07-09 — and the entry grades itself
**confidence: low, "lightly vetted"**: the picks are sound enough to pick once and move
on, which is precisely all the weight they are asked to carry.

## The default, and why

> Toasts → sonner-native (or burnt for platform-native elements). Haptics → expo-haptics.
> Splash → react-native-bootsplash on bare RN, expo-splash-screen on Expo (switch to
> bootsplash when you need its generator/branding control). Image lightbox → galeria. Each
> sub-domain is small — pick once, move on; the polish is in the details, not the library
> hunt. Lightly vetted (confidence: low).

Four assignments and one discipline. Only one of the four is a real fork: toasts split on
*whose motion design you want* — sonner-native for a designed toast stack, burnt for
platform-authentic system elements. The other three are near-verdicts. Haptics has a
default that works everywhere (expo-haptics runs in bare RN via Expo Modules). Splash
splits mechanically on workflow — bare RN versus the stock Expo template — with one named
switch trigger (bootsplash's generator/branding control). And the image-viewer "choice" is
really a maintenance verdict: the native option is current, the JS incumbent has been
dormant since 2022.

## The landscape, micro-domain by micro-domain

**Toasts — the one real fork.** sonner-native is a port of Emil Kowalski's sonner
(stacking, swipe, promise toasts), active (0.26.x, 2026-06), and the entry's design-led
pick. What "design-led" means is spelled out by the entry's reading — Kowalski's own essay
on building a toast component: interruptible transitions over keyframes, index-scaled
stacking, pause-on-hidden, momentum swiping, gap-filling hover pseudo-elements.
Web-authored, but it is the canonical "why good toasts feel good" — the taste the toast
pick imports. burnt takes the opposite bet: **native** toast/alert elements (SPIndicator
on iOS, ToastAndroid) — platform-authentic but less customizable, on a slower release
cadence (0.13, 2025-03). Between them sits react-native-toast-message, the JS incumbent
(v2.4, still active 2026): simple, widely deployed, less polished motion — the entry lists
it but routes no when-clause to it.

**Haptics — a default and a don't-churn.** expo-haptics is the default: the system haptics
engine on iOS, vibration effects on Android — and it works in bare RN via Expo Modules, so
the "but we're not on Expo" objection doesn't apply. react-native-haptic-feedback is the
bare-RN incumbent (v3.0, 2026-03) with a slightly lower-level trigger set; the entry's
when-clause is symmetric mercy: already on it → fine, don't churn. The entry also names
what it skipped: react-native-tickle (Nitro haptics with AHAP patterns) — not yet on npm,
too early.

**Splash — split by workflow.** react-native-bootsplash is the de-facto splash tool
(v7.3): an asset generator CLI, edge-to-edge by default, works with Expo prebuild, and an
imperative `hide()` when the app is ready. expo-splash-screen is the Expo default that
ships with the template, config-plugin driven — fine unless you need bootsplash's
generator/branding control, which is also the named trigger for switching. Both expo-*
packages version-track the SDK rather than releasing independently.

**Image lightbox — a maintenance verdict.** galeria (@nandorojo/galeria) is a native
shared-element lightbox (v3, 2026-05; iOS 16+) with fluid pinch/dismiss transitions the JS
viewers can't match. react-native-image-viewing is the JS incumbent — unmaintained since
2022; it works, but no native transitions and aging. The when-clause is blunt: avoid
starting new work on it.

## Tradeoffs and failure modes to name out loud

- **The library hunt itself.** Spending comparison energy where the entry says none is
  warranted is the domain's own anti-pattern. Each sub-domain is small — pick once, move
  on; the differentiating polish lives in the details, not in the pick.
- **Starting new work on react-native-image-viewing.** Dormant since 2022. It works today,
  but the entry's routing sends new lightbox work to galeria's native transitions.
- **Churning working haptics.** A codebase already on react-native-haptic-feedback is
  fine — the entry says don't churn. The expo-haptics default is for picking, not for
  migrating.
- **Buying burnt's authenticity without pricing it.** Platform-native elements come with
  less customizability and a slower release cadence (0.13, 2025-03) — the trade is
  authenticity for control, and it should be taken knowingly.
- **Betting on react-native-tickle today.** Nitro haptics with AHAP patterns is the
  direction to watch, but it is not yet on npm — the entry skipped it as too early.
- **galeria's floor.** The native lightbox is v3 (2026-05) and iOS 16+; the entry states
  the floor without an escape hatch below it.
- **Over-trusting the picks.** The entry self-grades confidence: low — versions and dates
  verified against npm 2026-07-09, but the picks are lightly vetted, not battle-audited.

## How it interacts with the rest of the stack

- **The Expo/bare seam.** Two of the four domains sit on it: haptics (expo-haptics works
  in bare RN via Expo Modules, so one default covers both worlds) and splash (the default
  splits by workflow, and the expo-* package versions track the SDK).
- **Depth (`react-native-best-practices`).** The declared defer skill. The entry names it
  without scoping what it owns here — the index carries the picks; the skill carries the
  RN practice depth.
- **No sibling entries.** The entry names no other RB-E domains — these four micro-domains
  are the whole neighborhood, which is consistent with the thesis: they cluster as one
  checklist precisely because none connects to a bigger selection problem.
- **The taste import.** The one reading is web-authored (sonner, not sonner-native): the
  entry treats Kowalski's design rationale as the criterion the RN port inherits, and
  ships it to anyone with sonner-native in their dependency tree.

## In one paragraph

UX polish in React Native is **a checklist, not four decisions**: toasts, haptics, splash
screens, and image lightboxes are the "app feels finished" layer, each too small to
deserve a library hunt — pick once, move on. The picks: sonner-native for toasts (or burnt
when platform-native SPIndicator/ToastAndroid elements matter more than customization),
expo-haptics for haptics (bare RN included, via Expo Modules; don't churn off
react-native-haptic-feedback), react-native-bootsplash on bare RN or expo-splash-screen on
stock Expo for splash (switch for bootsplash's generator/branding control), and galeria
for image lightboxes (native shared-element transitions; iOS 16+) while avoiding new work
on the dormant react-native-image-viewing. The entry self-grades confidence: low — lightly
vetted, npm-verified 2026-07-09 — and the design depth it points at is Kowalski's toast
essay, because the polish is in the details, not the library hunt.

---

*See also: the `react-native-best-practices` skill (the declared defer target — RN
practice depth beyond these picks). The entry names no sibling RB-E entries. Background
reading: Emil Kowalski's "Building a toast component" — the design rationale sonner-native
imports, and the canonical account of why good toasts feel good.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "too small to deserve a library hunt" is the assigned organizing gloss; the entry's
     own words are "none of these carries enough selection weight alone", "pick once, move
     on", and "the polish is in the details, not the library hunt" — the arrangement into
     an attention-budget rule ("minutes, not days" of selection attention) is editorial.
  2. related: [] — the entry names no sibling RB-E entries, so the see-also footer points
     only at the defer skill and the reading; the "no sibling entries is consistent with
     the thesis" line is inference, not entry text.
  3. react-native-toast-message has no when-clause in the entry — listed as the incumbent
     with a one-line tradeoff; this doc stakes nothing further on it.
  4. What react-native-best-practices audits for this entry — the entry declares the defer
     skill without scoping it (unlike e.g. RB-E-A11Y's scoped defer); no depth-split is
     described here beyond "the skill carries the RN practice depth".
  5. How much of Kowalski's web-authored toast rationale survives the RN port — the entry
     asserts the import ("the taste this entry's toast pick imports") but not the
     fidelity; not claimed.
  6. galeria below iOS 16, and its Android behavior — the entry states "iOS 16+" with no
     Android floor or fallback; nothing claimed.
-->
