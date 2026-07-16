---
id: RB-E-SVG
title: "About SVG, vector graphics & icons"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-16
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-SVG
defer_to_skill: react-native-best-practices                   # entry names the skill without scoping it
related: [RB-E-ANIMATION, RB-E-CHARTS]
sources:
  - "https://registry.npmjs.org/react-native-svg/latest"
  - "https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md"
  - "https://expo.dev/changelog/sdk-56"
---

# About SVG, vector graphics & icons

> **Diataxis: Explanation.** This page builds *understanding* of the vector-graphics
> decision — why on React Native it is barely a decision at all, and why the two real
> questions are when to leave the SVG primitive for a GPU canvas and which icon packages
> survived 2026's consolidation. It is not an SVG syntax guide and not a migration recipe.
> The candidate list and one-line tradeoffs live in the index entry `RB-E-SVG`; depth is
> deferred to the `react-native-best-practices` skill. Read this for the *why*.

## The one idea that organises everything: one primitive underneath

React Native has one vector-graphics substrate: **react-native-svg** (Software Mansion,
v15.x, RN 0.78+) — declarative `<Svg>`/`<Path>`, spanning iOS/Android/macOS/Windows plus
RN-Web. Everything else in this domain is positioned *relative to it*, not against it. It
underpins most RN charts (Victory Native) and the icon libraries (lucide-react-native
peer-depends on it); react-native-svg-transformer feeds it designer files by teaching
Metro to import `.svg` directly as React components. When your dependency tree shows a
chart library or an icon set, the primitive is usually already underneath — which is how
the entry entered the encyclopedia in the first place: the 2026-06-25 evidence-loop corpus
self-audit found react-native-svg in ourpot and bitbarter with no entry to map it to.

The one genuine boundary is Skia. **@shopify/react-native-skia is a GPU canvas — drawing,
not documents.** It can render SVG (ImageSVG / `Skia.SVG.MakeFromString`), but with limits
the entry names — no CSS, no `<text>`, no `<animate>` — so it is not the default SVG
renderer. Its territory is what declarative SVG cannot do: GPU-accelerated, animated,
custom canvas drawing. One substrate for vector *documents*; one deliberate exit for
vector *drawing*.

## The default, and why

> React Native → react-native-svg is the default for declarative vector graphics; import
> static .svg assets via react-native-svg-transformer, and pull icons from an icon set
> (lucide-react-native, or per-family @react-native-vector-icons/* — on Expo too, since
> @expo/vector-icons is deprecated in SDK 56). Drop to @shopify/react-native-skia only for
> GPU-accelerated / animated / custom canvas drawing beyond declarative SVG. Web → native
> `<svg>`, no library.

The default is not a choice among rivals — it is recognizing one primitive plus its
attachments. Two real decisions remain. The first is the **exit criterion**: drop to Skia
only for GPU / animated / custom drawing (charts, generative visuals — routed onward to
RB-E-ANIMATION and RB-E-CHARTS), never as a general SVG renderer. The second was the
**icon-set question**, and 2026 closed it: the monolithic react-native-vector-icons is
superseded by per-family scoped `@react-native-vector-icons/*` packages (v11+, with an
official codemod), and Expo SDK 56 deprecates `@expo/vector-icons` because "recent
upstream work has made that wrapper unnecessary" — the same codemod migrates both. The
consolidation onto the scoped packages is now complete on both bare RN and Expo. On the
web, the whole layer dissolves: React DOM renders native `<svg>` with no library, and icon
sets ship as plain React components you can reuse.

## The landscape, layer by layer

**react-native-svg (Software Mansion)** — the substrate: the de-facto RN SVG primitive
(v15.x, RN 0.78+), declarative `<Svg>`/`<Path>`, iOS/Android/macOS/Windows + RN-Web. It
underpins most RN charts (Victory Native) and icon libraries.

**react-native-svg-transformer (kristerkari)** — the asset pipeline: a Metro transformer
that imports designer `.svg` files directly as React components; pairs with
react-native-svg. The entry's workflow reading (LogRocket) covers the canonical loop:
inline SVG, transformer imports, SvgUri/SvgXml, animating SVGs.

**@shopify/react-native-skia** — the exit: a GPU canvas that renders SVG (ImageSVG /
`Skia.SVG.MakeFromString`) with limits — no CSS / `<text>` / `<animate>` — and does
animated/custom vector drawing beyond declarative SVG. Routed via RB-E-ANIMATION and
RB-E-CHARTS; use it for GPU/custom drawing, not as the default SVG renderer.

**Redraw (William Candillon) — experimental** — the horizon: next-gen 2D graphics on
WebGPU/TypeGPU — variable-stroke Bézier paths, vector feathering, physically-based 2D,
with shaders authored as typed TypeScript functions that receive geometry (tangent, arc
length) to compute stroke width, feathering, and material per-point. It is the Skia
author's bet on WebGPU as the unified graphics runtime — and a technical preview: not on
npm (subscriber early access), unstable API. Watch, not a production bet.

**Icon sets** — the consumers: lucide-react-native (Lucide; peer-deps react-native-svg)
and the per-family scoped `@react-native-vector-icons/*` packages. Two names are on the
way out: the monolithic react-native-vector-icons is **superseded** by the scoped split
(v11+, official codemod), and `@expo/vector-icons` is **deprecated** in Expo SDK 56 — the
wrapper became unnecessary; use the scoped packages directly. The entry carries both as
migrate rows: superseded and deprecated respectively, both effort S, same codemod.

**Web: native `<svg>`** — no library needed on React DOM; icon sets (Lucide etc.) ship as
plain React components, so the same icon set serves both platforms.

## Tradeoffs and failure modes to name out loud

- **Making Skia the default SVG renderer.** Its SVG support is bounded — no CSS, no
  `<text>`, no `<animate>` — because it is a drawing canvas, not a document renderer.
  Designer-exported SVGs belong on react-native-svg; Skia is for what declarative SVG
  cannot express.
- **Starting new icon work on the legacy monolith.** react-native-vector-icons is
  superseded by the scoped per-family packages, and the maintainer ships a codemod — the
  migration is effort S, so inertia is the only thing the monolith still offers.
- **Staying on @expo/vector-icons past SDK 56.** Deprecated, same codemod, same effort-S
  migration. The wrapper's reason to exist is gone by Expo's own account.
- **Betting production work on Redraw.** Technical preview, not on npm, unstable API — the
  entry's own verdict is "watch, not a production bet."
- **Adding an SVG library on the web.** React DOM already renders `<svg>` natively; the
  entry's web row is "no library needed."

## How it interacts with the rest of the stack

- **Charts (`RB-E-CHARTS`).** Most RN charts stand on this entry's primitive — Victory
  Native is the named example — and the GPU chart route runs through Skia, per the entry's
  own when-clause pointer.
- **Animation (`RB-E-ANIMATION`).** The Skia exit is shared territory: animated and custom
  drawing is where the SVG document model ends and RB-E-ANIMATION's canvas begins.
- **The migration lane.** Both icon migrations are mechanical: monolith → scoped packages
  (superseded, effort S) and @expo/vector-icons → scoped packages (deprecated in SDK 56,
  effort S), one codemod covering both — receipts in the vector-icons MIGRATION.md and the
  SDK 56 changelog.
- **Depth (`react-native-best-practices`).** The declared defer skill; the entry names it
  without scoping what it owns for this domain.

## In one paragraph

Vector graphics in React Native rests on **one primitive**: react-native-svg (v15.x, RN
0.78+) is the substrate that charts (Victory Native) and icon sets (lucide-react-native
peer-depends on it) stand on, fed by react-native-svg-transformer for designer `.svg`
files. Skia is the deliberate exit — a GPU canvas for animated/custom drawing whose SVG
support is bounded (no CSS / `<text>` / `<animate>`): **drawing, not documents**, never
the default renderer. The icon-set question closed in 2026: the monolithic
react-native-vector-icons is superseded by per-family `@react-native-vector-icons/*`
packages and `@expo/vector-icons` is deprecated in Expo SDK 56, with one effort-S codemod
migrating both — so the scoped packages are the answer on bare RN and Expo alike. On the
web the layer dissolves into native `<svg>` with no library. And the horizon is Redraw —
WebGPU/TypeGPU, shaders as typed TS functions, physically-based 2D — explicitly a watch,
not a production bet.

---

*See also: `RB-E-CHARTS` (chart libraries standing on this primitive; the Skia GPU
route), `RB-E-ANIMATION` (animated/custom drawing — the Skia exit's home turf). Depth: the
`react-native-best-practices` skill. Background reading: William Candillon's "Hello,
Project Redraw" — the Skia author's WebGPU bet — and the LogRocket react-native-svg
workflow guide, the canonical how-to for the transformer/SvgUri/SvgXml loop.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "Skia is drawing, not documents" is the assigned organizing label; the entry grounds
     the ingredients (renders SVG "with limits: no CSS / <text> / <animate>"; "use it for
     GPU/custom drawing, not as the default SVG renderer") but the documents/drawing
     dichotomy wording is editorial arrangement.
  2. RN-Web tension: the entry lists RN-Web among react-native-svg's platforms while the
     web when-clause says native <svg>, no library; the entry does not reconcile which
     applies to a react-native-web app — both reported as given, no ruling made here.
  3. react-native-svg-transformer carries no version/date/maintenance data in the entry —
     none claimed.
  4. What react-native-best-practices audits for this entry — the entry declares the defer
     skill without scoping it; not specified here.
  5. The "recent upstream work" that made @expo/vector-icons unnecessary — the entry
     quotes the SDK 56 changelog's phrase without naming the work; repeated as a quote
     only.
  6. lucide-react-native version/date and icon-set coverage comparisons — not in the
     entry; not claimed.
-->
