---
id: RB-E-STYLING
title: "About styling & theming in React & React Native"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-06-25
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-STYLING
defer_to_skill: design-systems-governance                     # tokens, theme parity, a11y intrinsics
related: [RB-E-COMPONENT-LIBS, RB-E-CROSSPLATFORM, RB-E-REACT-CORE]
sources:
  - "https://www.spotvirtual.com/blog/why-were-breaking-up-with-css-in-js"
  - "https://engineering.fb.com/2025/11/11/web/stylex-a-styling-library-for-css-at-scale/"
---

# About styling & theming in React & React Native

> **Diataxis: Explanation.** This page builds *understanding* of the styling decision — the
> reasoning behind the pick. It is not a tutorial: the candidate list and one-line tradeoffs
> live in the index entry `RB-E-STYLING`; design-token, theme-parity, and accessibility-
> intrinsic depth is owned by the `design-systems-governance` skill. Read this for the *why*.

## The one axis that organises everything: *when* styles are computed

The styling field looks crowded and fashion-driven, but one durable axis cuts through it:
**when does style work happen — at build time or on every render?**

- **Runtime CSS-in-JS** (styled-components, Emotion) serialises styles *during render*. It's
  ergonomic and dynamic, but the cost is real and per-render — the canonical write-up is an
  Emotion maintainer's "why we're breaking up with CSS-in-JS," which measured ~48% faster
  renders after dropping it (see sources).
- **Compile-time / zero-runtime** (StyleX, Tailwind, zero-runtime RN engines) moves that work
  to the build. Styles become static CSS (web) or precomputed style objects (native); the
  render path just references classes/ids.

So the first question isn't "which library is trendy" — it's **"am I paying for styling on
every render, and do I need to be?"** For new work, the low-regret answer is *no*: prefer
compile-time/zero-runtime approaches. (The exception is genuinely dynamic, per-instance
styling, where some runtime cost is intrinsic — but that's a small fraction of most apps.)

## The default, and why

> **Web:** Tailwind (paired with shadcn/ui — `RB-E-COMPONENT-LIBS`). **React Native:**
> NativeWind if you want Tailwind, else StyleSheet or Unistyles. Prefer zero-runtime /
> compiler approaches on both.

On the web, **Tailwind + shadcn/ui** is the boring-but-correct product default: utility
classes are compile-time by nature, and shadcn gives you owned, Tailwind-styled components.
For atomic CSS *at scale* (large design systems, many engineers), **StyleX** — Meta's
build-time atomic-CSS compiler — is the heavier-duty choice, keeping total CSS flat as the
app grows. On **React Native**, `StyleSheet` is the zero-dependency baseline; **NativeWind**
brings Tailwind; **Unistyles** (a C++/Nitro styling engine) gives fast theming and variants.
The connecting thread is the runtime-cost axis above.

## The landscape, and when each one wins

**Tailwind (web)** — utility-first, compile-time, enormous ecosystem; the default, especially
with shadcn/ui. Its critique ("class soup") is real but a readability tradeoff, not a runtime
one.

**StyleX (Meta)** — build-time **atomic** CSS with an `sx={}`-style API; deterministic, dedup-
ed classes so CSS size stays flat at scale. Strong web story, RN support emerging. Pick it
when you're Meta-shaped: large, design-system-driven, many contributors.

**NativeWind / Unistyles / Uniwind / react-native-tailwind** — the (crowded) RN field.
"Tailwind fatigue" is real here; the *durable* selection axis is again runtime cost.
NativeWind is the most-adopted Tailwind-for-RN; **Unistyles** moves styling into a C++/Nitro
engine for fast theming and variants; zero-runtime/Babel-plugin variants avoid JS-side style
work entirely.

**Tamagui** — a cross-platform design-system + optimizing compiler; a batteries-included route
when you want a *component system with theming*, not just primitives (also `RB-E-CROSSPLATFORM`).

**styled-components / runtime CSS-in-JS** — largely **maintenance** (v6.x; v6.3 added RSC
support). It still works; just don't place a *new* web bet on runtime CSS-in-JS — prefer
zero-runtime or StyleX.

**React Strict DOM** — strict HTML/CSS compiled to static CSS on web and RN styles on native;
it's simultaneously a *styling* strategy and a *code-sharing* one (`RB-E-CROSSPLATFORM`).

## Tradeoffs and failure modes to name out loud

- **New runtime CSS-in-JS bets.** Choosing styled-components/Emotion for a *new* web app in
  2026 buys a known per-render cost and a maintenance-mode dependency. Reserve runtime CSS-in-
  JS for genuinely dynamic styling that can't be precomputed.
- **"Tailwind fatigue" as a decision driver.** The RN field's churn (NativeWind vs Uniwind vs
  …) tempts novelty-driven choices. Decide on the durable axis (runtime cost, theming model),
  not the newest entrant.
- **Re-deriving the design system in CSS.** Tokens, theme parity (light/dark, dynamic type),
  and accessibility intrinsics (contrast, focus) are a *systems* concern — owned by
  `design-systems-governance`, not by the styling library choice. Don't hand-roll them per
  component.
- **Web+native styling as an afterthought.** If you share UI across platforms, styling and
  code-sharing are the same decision (React Strict DOM) — see `RB-E-CROSSPLATFORM`.

## How it interacts with the rest of the stack

- **Component libraries (`RB-E-COMPONENT-LIBS`).** On the web, styling + components is usually
  one decision: Tailwind + shadcn/ui. This entry is "how styles are computed"; that entry is
  "where the components come from."
- **Cross-platform (`RB-E-CROSSPLATFORM`).** React Strict DOM is both a styling and a sharing
  strategy; the two entries describe one tool from two angles. (react-native-web is
  maintenance-only; don't place new shared-UI bets on it.)
- **React core (`RB-E-REACT-CORE`).** The React Compiler weakens the old "a styling lib avoids
  re-renders" argument for *client* concerns; choose styling on the runtime-cost and theming
  axes, not as a memoisation workaround.
- **Design-system depth (`design-systems-governance`).** Tokens, semantic naming, theme parity,
  a11y intrinsics, visual-regression — all owned there.

## In one paragraph

Ignore the fashion and watch one axis: **when styles are computed.** Runtime CSS-in-JS pays on
every render (and styled-components is now maintenance), so for new work prefer compile-time /
zero-runtime: **Tailwind + shadcn/ui** on the web (StyleX when you need atomic CSS at scale),
and **NativeWind or StyleSheet/Unistyles** on React Native. Share styling with code via React
Strict DOM when you go universal, and push tokens, theming, and accessibility down to
`design-systems-governance` rather than re-deriving them per component.

---

*See also: `RB-E-COMPONENT-LIBS` (Tailwind + shadcn on the web), `RB-E-CROSSPLATFORM` (React
Strict DOM as a shared-styling strategy), `RB-E-REACT-CORE` (Compiler interaction). Tokens,
theme parity, a11y intrinsics: the `design-systems-governance` skill.*
