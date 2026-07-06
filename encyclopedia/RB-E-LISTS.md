---
id: RB-E-LISTS
title: "About lists & virtualization in React & React Native"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-07-01
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-LISTS
defer_to_skill: react-native-best-practices                   # RN-RULE-USE-FLASHLIST owns the thresholds
related: [RB-E-CHARTS, RB-E-DATA]
sources:
  - "https://shopify.engineering/flashlist-v2"
  - "https://rednegra.net/blog/20260212-virtual-scroll/"
  - "https://www.youtube.com/watch?v=K3flMIHS-cI"   # Meistrich (App.js Conf 2026) — why Legend List is fast (container pool + signal-driven re-renders); v3.0 stable
---

# About lists & virtualization in React & React Native

> **Diataxis: Explanation.** This page builds *understanding* of why long lists need
> virtualization and which strategy each tool uses. It is not a tutorial, and the exact
> *thresholds* (when FlashList, item-size rules) are owned by `react-native-best-practices`.
> Read this for the *why*.

## The one fact that organises everything: cost scales with mounted nodes, not data length

A list is cheap or expensive based on **how many view/DOM nodes it mounts**, not how many items
the array holds. Render 10,000 rows naively and you create 10,000 nodes — layout, memory, and
scroll all collapse. The whole field exists to break that coupling: **render only what's on (or
near) the screen.** Two strategies do it, and every library here is one of them:

- **Windowing** — mount only the items in the viewport (plus a small buffer); as you scroll,
  unmount what leaves and mount what enters. The node count stays ~constant regardless of data
  size. (FlatList, react-window, react-virtual.)
- **Recycling** — keep a small fixed *pool* of views and re-bind them to new data as they scroll
  in/out, instead of unmounting and remounting. Cheaper still for big, uniform lists because it
  avoids mount/unmount churn. (FlashList.)

So the first question is never "which list lib" — it's **"how many nodes will this mount, and is
windowing enough or do I need recycling?"**

## The default, and why

> **React Native:** FlashList for large lists, FlatList otherwise, ScrollView only for <~20
> static items. **Web:** react-virtual / react-window.

The RN ladder is about matching strategy to scale. `ScrollView` mounts everything — fine for a
handful of static rows, a foot-gun beyond that. `FlatList` adds windowing — the correct baseline
for most lists. `FlashList` adds recycling — the win for *large* lists, where mount/unmount churn
dominates (its v2 is a New-Architecture rewrite; see the reading). On the web, the data isn't
native views but DOM nodes, and the same logic applies: `react-window` / `react-virtual` window
the viewport.

## The landscape, and when each one wins

**ScrollView / `.map()`** — no virtualization; every item mounts. Correct *only* for small,
static lists (<~20). Using it for real data is the most common list mistake.

**FlatList** — RN's built-in windowing. The right default; tune-able, mature, and enough for the
majority of lists.

**FlashList** — recycling for large RN lists. Wins when lists are long and rows are uniform
enough to reuse; v2's ground-up New-Architecture rewrite handles recycling, progressive
rendering, and layout prediction (reading). Reach for it at scale, not reflexively.

**react-window / react-virtual / HighTable (web)** — web windowing. react-window/react-virtual
cover normal long lists; **HighTable** handles *billion-row* tables with tricks the others don't
(working around the ~17M-px canvas-height ceiling with downscaled scrollbars, decoupled axes —
reading). Reach for HighTable specifically for huge tabular data.

**Legend List** — one virtualization engine across **RN + web** (v3 adds SectionList + chat
APIs). The pick when you want a single list mental model on both platforms.

## Tradeoffs and failure modes to name out loud

- **ScrollView for real data.** The cardinal sin: it mounts everything, so it's smooth at 15
  rows and janks at 200. Match the tool to the count.
- **FlashList reflexively.** Recycling shines for large, uniform lists; for short or wildly
  heterogeneous lists, FlatList's windowing is simpler and fine. Don't reach for recycling before
  you have the scale that needs it.
- **Fighting recycling with unstable items.** Recycled rows assume reuse; per-row unstable state,
  unkeyed content, or wildly variable heights undercut the pool and reintroduce churn.
- **Ignoring the thresholds.** "How many items before FlashList," item-size estimates, and
  render-perf rules are exact and owned by `react-native-best-practices` — this page gives the
  model, that skill gives the numbers.

## How it interacts with the rest of the stack

- **Charts/graphics (`RB-E-CHARTS`).** Huge-data rendering shares DNA — at extreme scale (charts,
  billion-row tables) the answer shifts from DOM/view virtualization toward canvas/GPU rendering.
- **Data (`RB-E-DATA`).** Long lists usually mean paginated/infinite server data; the list's
  windowing pairs with the data layer's `useInfiniteQuery`-style fetching.
- **Perf depth (`react-native-best-practices`).** Exact thresholds, item-layout, and the
  RN-RULE-USE-FLASHLIST guidance live there.

## In one paragraph

A list's cost is the **nodes it mounts**, not the data length — so render only what's on screen,
via **windowing** (mount the viewport, unmount the rest) or **recycling** (reuse a fixed view
pool). On **React Native**: ScrollView only for tiny static lists, FlatList (windowing) as the
baseline, FlashList (recycling) at scale. On the **web**: react-window/react-virtual for normal
lists, HighTable for billion-row tables; Legend List when you want one engine across both. Don't
use ScrollView for real data, don't reach for recycling before you need it, and get exact
thresholds from `react-native-best-practices`.

---

*See also: `RB-E-CHARTS` (canvas/GPU rendering at extreme data scale), `RB-E-DATA` (paginated /
infinite data behind long lists). Exact thresholds + render-perf rules: the
`react-native-best-practices` skill.*
