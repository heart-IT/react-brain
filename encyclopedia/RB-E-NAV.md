---
id: RB-E-NAV
title: "About navigation & routing in React & React Native"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-06-25
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-NAV
defer_to_skill: null
related: [RB-E-META-FRAMEWORKS, RB-E-CROSSPLATFORM, RB-E-STATE]
sources:
  - "https://reactnavigation.org/blog/2025/12/19/react-navigation-8.0-alpha/"
  - "https://reactrouter.com/"
---

# About navigation & routing in React & React Native

> **Diataxis: Explanation.** This page builds *understanding* of the navigation/routing
> decision — the reasoning behind the pick. It is not a tutorial: the candidate list and
> one-line tradeoffs live in the index entry `RB-E-NAV`; framework-level routing (SSR/RSC)
> is owned by `RB-E-META-FRAMEWORKS`. Read this to understand *why*.

## The one distinction that organises everything

"Navigation" hides **two different problems** that share a word but not a nature:

- **Native navigation (React Native)** is a *UI* concern. The thing you choose is how
  screens stack, how tabs and drawers behave, and how the platform's own transitions and
  gestures (the iOS back-swipe, native bottom tabs, the Android predictive back) feel.
  There is no URL; there is a navigation *state tree*.
- **Web routing (React DOM)** is a *URL* concern, and increasingly a *data/server* concern.
  The route is the address bar, history, deep links, and — once a meta-framework is
  involved — where data loads and where the server boundary sits.

So the first question is never "which router?" It is **"which world am I in, and on the web,
do I already have a meta-framework?"** Everything else follows.

## The default, and why

> **React Native:** Expo Router if you're on Expo, otherwise React Navigation.
> **Web:** use the meta-framework's router (`RB-E-META-FRAMEWORKS`); for a type-safe SPA
> with no meta-framework, TanStack Router.

The RN default is about *fit*, not superiority. **React Navigation** is the mature, bare-RN
baseline — imperative and declarative, deeply customizable. **Expo Router** layers
file-based routing on top of it: if your project is already Expo, convention-over-config
removes a class of boilerplate and gives you deep-linking and universal (web) routing close
to free. The choice is "are you on Expo?", not "which is better."

On the web, routing rarely stands alone anymore. If you've chosen Next.js or TanStack Start,
**they own routing** — picking a separate router would fight the framework. The standalone
choice (**TanStack Router**) earns its place precisely when you want a client-rendered SPA
with first-class type-safe routes and *don't* want a server framework.

## The landscape, and when each one wins

**React Navigation** — the bare-RN default. Wins on maturity and control. The 2026 trend it
embodies is *honouring the platform*: React Navigation 8.0 (still **alpha** through 2026)
makes **native bottom tabs** the default and adds native icon components (SFSymbol on iOS,
Material Symbols on Android). That direction matters more than the version — but because 8.0
is alpha, **pin and verify before adopting its native tabs.**

**Expo Router** — file-based routing for Expo apps, and the seam through which an Expo app
also gets *web* routing. It's the right default the moment you're on Expo; its cost is Expo
coupling. (It is also the RN/universal meta-framework — see `RB-E-META-FRAMEWORKS`.)

**React Router (8.x)** — the web workhorse that absorbed Remix. v8 is released, **ESM-only**
(dropped CommonJS and the `react-router-dom` split), with future flags on by default; v7→v8
is largely non-breaking if you kept up with v7's flags. Use it for web routing when you want
a router (or framework mode) without committing to Next.

**TanStack Router / Start** — type-safe routing with a signal-based core. **Router** is the
SPA story (the strongest type-safety in the field); **Start** is its SSR/RSC meta-framework
(`RB-E-META-FRAMEWORKS`). Reach for Router when end-to-end route type-safety is the thing you
care about.

**Next.js App Router** — not a router you "add" but the routing *of* a full framework
(`RB-E-META-FRAMEWORKS`); listed here only so the boundary is clear.

## Tradeoffs and failure modes to name out loud

- **Adopting alpha as if it were stable.** React Navigation 8's native tabs are compelling
  but alpha in 2026; shipping on them without pinning is a self-inflicted upgrade treadmill.
- **Fighting your meta-framework's router.** Bolting a second router onto Next/Start is the
  classic web mistake — the framework already owns the URL, data, and server boundary.
- **Flattening platform navigation.** A single shared navigation abstraction across web and
  native tends to produce non-native transitions and gesture handling. Navigation is the
  layer where "share everything" hurts most (see `RB-E-CROSSPLATFORM`); share the *screens'
  logic*, not necessarily the navigator.
- **Treating routing as pure UI on the web.** On the web the URL is also application state
  and a data trigger; modelling it as local component state (modals that should be routes,
  filters that should be search params) is a recurring smell.

## How it interacts with the rest of the stack

- **Meta-frameworks (`RB-E-META-FRAMEWORKS`).** On the web this is the dominant fork:
  framework-owned routing vs a standalone SPA router. This page is "which navigator"; that
  page is "do you have a server framework at all."
- **Cross-platform (`RB-E-CROSSPLATFORM`).** Solito and Expo Router shape how routing is
  shared web↔native; the honest default is to share screens and logic, not force one
  navigator across both worlds.
- **State (`RB-E-STATE`).** The URL is server-adjacent state on the web (search params,
  route params); keep it in the router, not duplicated in a client store.

## In one paragraph

Decide the *world* before the *router*. On **React Native**, navigation is native UI:
Expo Router if you're on Expo, else React Navigation — and honour platform tabs/gestures
rather than flattening them (React Navigation 8's native tabs are the trend, but pin them
while they're alpha). On the **web**, routing belongs to your meta-framework if you have one;
if you don't and you want a type-safe SPA, reach for TanStack Router, or React Router 8 for a
framework-agnostic router. The recurring mistake is treating these two worlds as one.

---

*See also: `RB-E-META-FRAMEWORKS` (server-owned routing + SSR/RSC), `RB-E-CROSSPLATFORM`
(sharing navigation web↔native), `RB-E-STATE` (the URL as state).*
