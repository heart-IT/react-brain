---
id: RB-E-CHARTS
title: "About charting & data visualization"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low
updated: 2026-07-16
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-CHARTS
defer_to_skill: react-native-best-practices                   # Skia/Reanimated render-perf depth
related: [RB-E-SVG, RB-E-ANIMATION, RB-E-LISTS]
sources:
  - "https://reactnativerewind.com/issues/react-native-0-86-charting-your-financial-ruin-and-the-junk-drawer-in-your-package-json"
  - "https://github.com/FormidableLabs/victory-native-xl"
  - "https://github.com/margelo/react-native-graph/releases"
  - "https://medium.com/airbnb-engineering/introducing-visx-from-airbnb-fd6155ac4658"
  - "https://shopify.engineering/webgpu-skia-web-graphics"
---

# About charting & data visualization

> **Diataxis: Explanation.** This page builds *understanding* of the charting decision — why
> the durable axis is the renderer, not the chart catalogue. It is not a gallery tour and not
> an API guide. The candidate list and one-line tradeoffs live in the index entry
> `RB-E-CHARTS`; Skia/Reanimated render-performance depth is owned by the
> `react-native-best-practices` skill. The entry's own confidence is **low** — its note says
> the picks are reasonable defaults but lightly vetted — so read this as a map, then verify
> against your chart-type needs.

## The one distinction that organises everything: pick the renderer, not the chart menu

A chart is a list wearing math. Underneath every bar, line, and candlestick there is a list of
data points, a math/layout pass that turns data into geometry, and a **renderer** that draws
the geometry. The two readings the index entry leans on describe exactly this split, once per
platform:

- **Web:** the visx architecture piece states the durable division of labor — **D3 for
  math/layout while React owns the DOM**, composing low-level primitives instead of
  opinionated chart components. That framing applies to visx, Recharts, and any D3+React
  stack.
- **React Native:** the Shopify graphics piece gives the render model under the RN picks —
  **Skia via JSI, immutable display lists, a unified WebGPU backend**, with the canonical
  example being a **high-density line chart rendered as a GPU texture**.

So the real decision is *which renderer draws your geometry* — the DOM/SVG on web, the GPU via
Skia on React Native — and *how much of the math you want pre-packaged* (batteries-included
components vs low-level primitives). The chart menu — does the library's gallery have a
donut? — is the least durable axis, because the math is a commodity (D3 on web) and the
renderer is what a high-density realtime series lives or dies by — which is exactly why the
canonical Skia example is a dense line chart rendered as a GPU texture.

## The default, and why

> RN: Victory Native (XL) for standard charts; react-native-skia when you need custom/realtime
> rendering. Web: Recharts (batteries-included) or visx (low-level D3).

On React Native both halves of the default sit on the *same* renderer: **Victory Native XL is
Skia-backed**, mature, with broad chart types — and when its packaging runs out,
**build-your-own on react-native-skia** buys maximum control and performance at the cost of
more code. Graduating from one to the other changes how much chart you hand-write, not what
draws the pixels.

On web the two picks share the D3+React division of labor and differ only in altitude:
**Recharts** is batteries-included; **visx** is low-level D3 primitives for fully custom
visualization. Pick by how bespoke the viz is, not by gallery screenshots.

The specialised when-clause is realtime/finance on RN: stay Skia-based — Victory Native XL,
**react-native-graph** for scrubbing line charts, or **react-native-livechart** — with the
honest caveat, from the entry itself, that the latter two are newer/niche.

## The landscape, and when each one wins

**Victory Native (XL)** — the RN standard-charts default: Skia-backed, mature, broad chart
types. One freshness fact matters when you audit it: the **active** Victory line is
`victory-native` XL (41.26, 2026-06, verified against npm); the web `victory` package moves
slowly. Judge the family by the XL line.

**react-native-skia (build-your-own)** — max control and max performance, more code. This is
the "custom/realtime rendering" escape hatch, and the Shopify piece is its physics textbook:
JSI, immutable display lists, WebGPU backend, line-chart-as-GPU-texture.

**react-native-graph (Margelo)** — Skia-based **line** graphs with gesture scrubbing. Its
history is a lesson in reading release pages: **rebooted at v1.2 (2026-04) onto current Skia
APIs after roughly two years of dormancy**. Line-focused — the entry's own instruction is to
check it covers your chart types before adopting.

**react-native-livechart** — Skia + Reanimated + Gesture Handler; realtime/finance focus with
crosshair scrubbing; newer and niche. The entry's note is explicit: ignore its satirical
"degen mode" framing — that is not a selection axis.

**react-native-gifted-charts** — declarative and quick to adopt. The entry stakes no renderer
claim for it; it wins on adoption speed, and that is the extent of what this page can say.

**Recharts / visx / Chart.js (web)** — Recharts batteries-included, visx low-level D3
primitives; Chart.js is listed in the same web group without a graded tradeoff. Beneath visx
sits **d3** itself, and its npm silhouette needs the same freshness literacy as Victory's:
**d3's 2-year publish gap is maturity, not abandonment** — it is the stable substrate under
visx.

## Tradeoffs and failure modes to name out loud

- **Choosing from the chart menu.** The gallery answers "can it draw a donut today"; the
  renderer answers "will it still be smooth with real data and realtime updates." The entry's
  when-clauses are renderer-shaped (realtime/finance → *Skia-based*), not gallery-shaped.
- **Adopting a scrubbing library, then needing a bar chart.** react-native-graph is
  line-focused by design — the entry literally says to check it covers your chart types. The
  scrubbing demo is not a commitment to breadth.
- **Reading npm dates as health.** Two opposite errors, both named in the entry's freshness
  note: d3's 2-year gap is maturity, not abandonment; and the slow-moving web `victory`
  package is not the active line — victory-native XL (41.26, 2026-06) is. Publish cadence
  only means something relative to a library's role in the stack.
- **Dormancy that *did* matter.** react-native-graph sat dormant for ~2 years before its
  v1.2 (2026-04) reboot onto current Skia APIs — for Skia-adjacent libraries, "does it target
  the current Skia era" is a real compatibility question, not paranoia.
- **Marketing noise as signal.** react-native-livechart's satirical "degen mode" framing is
  not a selection axis — evaluate the stack (Skia + Reanimated + Gesture Handler, crosshair
  scrubbing) and the newer/niche maturity, not the bit.
- **Trusting this page too much.** Confidence here is *low* by the entry's own admission: the
  picks are reasonable defaults, lightly vetted. Verify chart-type coverage and freshness
  against npm before committing.

## How it interacts with the rest of the stack

- **Render performance (`react-native-best-practices`).** The defer skill: heavy
  Skia/Reanimated performance discipline lives there. This page owns *which renderer and which
  library*; that skill owns keeping the frames.
- **Animation & gestures (`RB-E-ANIMATION`).** The realtime RN options are built from the
  animation stack's parts — react-native-livechart is explicitly Skia + Reanimated + Gesture
  Handler, and gesture scrubbing is the headline feature of react-native-graph. Interactive
  charts are animation surfaces.
- **SVG (`RB-E-SVG`).** The web half of the renderer axis. The D3+React division — D3 for
  math/layout, React owning the document — is the same architecture whether the primitives are
  a chart library's or your own.
- **Lists (`RB-E-LISTS`).** The "lists wearing math" lens is literal at high density: a
  realtime series is list-scale data on a render budget, which is exactly why the canonical
  Skia example is a high-density line chart as a GPU texture.

## In one paragraph

Charts are lists wearing math: data, a math/layout pass, and a renderer — and the renderer is
the durable axis. On web, **D3 does math/layout while React owns the DOM** (Recharts
batteries-included, visx low-level primitives; d3's 2-year publish quiet is maturity, not
abandonment). On React Native the renderer is **Skia on the GPU** — JSI, immutable display
lists, a WebGPU backend, high-density line charts as GPU textures — under both the default
(**Victory Native XL**, 41.26 active line) and the escape hatch (build-your-own
react-native-skia). Realtime/finance stays Skia-based via react-native-graph (line-focused,
rebooted v1.2 2026-04 after ~2y dormancy — check chart-type coverage) or
react-native-livechart (newer/niche; ignore the satirical framing). Pick by renderer and
altitude, verify the lightly-vetted specifics against npm, and take Skia/Reanimated
performance depth from `react-native-best-practices`.

---

*See also: `RB-E-SVG` (the web renderer under D3+React stacks), `RB-E-ANIMATION` (Reanimated +
Gesture Handler, the substrate of scrubbing charts), `RB-E-LISTS` (high-density data on a
render budget). Performance depth: the `react-native-best-practices` skill. Background
reading: Airbnb's visx introduction (D3 for math, React for the document) and William
Candillon's RN graphics deep-dive (the Skia/WebGPU render model).*

<!-- CANNOT GROUND (flagged, not invented):
  1. "Charts are lists wearing math" and "pick by renderer, not chart menu" are the assigned
     organizing ideas; the entry grounds the ingredients (D3-for-math/layout division,
     Skia/GPU render model, renderer-shaped when-clauses) but the slogan and the claim that
     the chart menu is "the least durable axis" are editorial.
  2. "SVG" as the literal name of the web renderer — the entry and its readings say "React
     owns the DOM" and "low-level D3 primitives"; neither literally names SVG. The label
     comes from the assigned organizing idea; body text prefers "DOM/SVG" and the RB-E-SVG
     cross-reference is inferred, not stated in the entry.
  3. react-native-gifted-charts' renderer (SVG vs Skia vs other) — not stated in the entry;
     this doc explicitly declines to classify it.
  4. Chart.js — listed in the entry's web option group with no individual tradeoff; no
     renderer or recommendation claim is made here.
  5. "Graduating from XL to build-your-own changes how much chart you hand-write, not what
     draws the pixels" — inference from both options being Skia-backed per the entry; the
     entry does not discuss migration between them.
-->
