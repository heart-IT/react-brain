---
id: RB-E-ALT-FRAMEWORKS
title: "About alternatives to React Native (cross-platform frameworks)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low                # newer entrants (Lynx, Valdi) are early — the entry says "not endorsements"
updated: 2026-07-16
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-ALT-FRAMEWORKS
defer_to_skill: null                                          # entry declares no depth-audit skill
related: [RB-E-REACT-CORE, RB-E-CROSSPLATFORM, RB-E-META-FRAMEWORKS]
sources:
  - "https://github.com/lynx-family/lynx"
  - "https://github.com/Snapchat/Valdi"
---

# About alternatives to React Native (cross-platform frameworks)

> **Diataxis: Explanation.** This page builds *understanding* of the leave-React decision —
> what you actually pay on exit, what the evidence says you buy, and why the answer differs by
> platform. It is not a framework comparison matrix and not a migration guide. The candidate
> list and one-line tradeoffs live in the index entry `RB-E-ALT-FRAMEWORKS`; the entry declares
> no depth-audit skill. Read this for the *why*.

## The one idea that organises everything: the exit cost is the decision

The entry's note frames its own purpose: context for teams weighing leaving the React/RN
ecosystem. And the recommendation prices the exit in one clause — React Native's **decade of
libraries is a major advantage** — so the decision is a trade: that decade against whatever a
platform-specific win is worth to you. The load-bearing evidence that the win is
*platform-specific*, never general, is the entry's KMP-vs-RN benchmark asymmetry.

Software Mansion built the same app twice — identical unoptimized apps, KMP and React Native,
measured on 6 devices across size, startup, RAM, CPU, and frames. One benchmark, two opposite
headlines:

- **Android:** KMP wins decisively — ~8x smaller, 2–4x faster startup, ~50% less RAM. The
  reading names the mechanism: no JS runtime.
- **iOS:** the numbers converge — and the memory result *flips*: RN uses 3–4x LESS memory
  there, because RN renders through UIKit while KMP carries a resident Skia.

The same pair of apps makes KMP look like an obvious win on one platform and RN the leaner
choice on the other. That is why the organising rule is **measure per platform, never in
general** — a general "X is faster than RN" claim is exactly the kind this benchmark refutes
by containing both directions at once. The entry adds a credibility note: the numbers are
notable precisely because an RN shop (Software Mansion, an RN consultancy) published results
that favor KMP on Android. And the reading ends on the frame this whole entry lives in:
performance is one input; DX and ecosystem are others.

## The default, and why

> Stay on React Native unless a specific driver pushes you off it — its decade of libraries is
> a major advantage; Lynx and Valdi are early.

"A specific driver" is the operative phrase: the default is inertia priced correctly, not
loyalty. The two when-clauses are the two drivers the entry recognises: wanting to **share
only business logic and keep native UI per platform** → Kotlin Multiplatform; a team **already
invested in Dart or wanting one render engine** → Flutter, which the entry marks plainly as
leaving React entirely. The newer entrants get an explicit disclaimer in the note: Lynx and
Valdi are early — listed as context, not endorsements.

## The landscape, facet by facet

**Kotlin Multiplatform** — the partial exit: share business logic across platforms, keep
native UI per platform. Carries the entry's load-bearing evidence (the SWM same-app benchmark
above): decisive on Android, converging on iOS with the memory result favoring RN.

**Flutter** — the total exit: Dart, its own render engine, a large ecosystem — and not
React/JS. The when-clause spells out the price: it leaves React entirely.

**Lynx (ByteDance)** — web-tech (HTML/CSS) plus native render, with a dual-thread UI/logic
split; young ecosystem (open-sourced 2025); scaffolded via create-rspeedy.

**Valdi (Snap)** — declarative TypeScript compiling to native views on iOS/Android/macOS;
beta (beta-0.1.0), open-sourced by Snap in Nov 2025 after ~8 years of internal use. Long
internal history, very early public life — both halves matter.

**The web-side exits** — the entry's platforms include plain React, and its reading list
carries three web case studies rather than option rows. MDN replaced a React SPA with
server-side templating plus Lit web components (per-component CSS, Declarative Shadow DOM,
Rspack) — an authoritative counter-perspective on when NOT to ship a React SPA. Evil Martians
migrated a marketing/content site to Web Components (Custom Elements + Astro + nanostores,
~3KB vs ~63KB, 100KB saved), with nanotags addressing the boilerplate/accessibility tradeoffs
— durable do-you-even-need-React reasoning. And Strawberry Browser rewrote 130K lines from
React to Svelte in two weeks, contrasting virtual-DOM overhead with compiled reactivity and
documenting the LLM-migration ruleset that kept the Svelte idiomatic.

**On watch, not on the shelf** — the entry carries a tripwire (added 2026-07-16): if solid-js
reaches 2.0.0 stable, re-triage the skipped "SolidJS 2.0: A React Developer's First Look" and
consider a Solid row in the web-alternatives reading thread. Until it fires, Solid is a
process note, not a candidate.

## Tradeoffs and failure modes to name out loud

- **Deciding "in general."** The benchmark's whole value is that it contains both verdicts:
  Android's 8x-smaller headline is not an iOS argument, because iOS converges and flips on
  memory (UIKit rendering vs KMP's resident Skia). Run the platform you actually ship.
- **Reading one metric as the decision.** The reading's own closing frame: performance is one
  input, DX and ecosystem are others — and the default already prices the ecosystem input as
  a decade of libraries.
- **Betting on the early entrants.** Lynx open-sourced in 2025 with a young ecosystem; Valdi
  is beta-0.1.0. The note is explicit that listing them is context, not endorsement.
- **Forgetting the exit is total (Flutter).** Dart, its own render engine, not React/JS — the
  decade of libraries does not come along.
- **Treating the benchmark as production evidence.** The apps were identical and
  *unoptimized* by design — the reading says so. It isolates the frameworks; it does not
  predict a tuned app.
- **Shipping React where it isn't needed (web).** The Evil Martians case is the plain-React
  version of the exit question: a content site paying ~63KB where ~3KB serves — the
  do-you-even-need-React question precedes the which-framework question.

## How it interacts with the rest of the stack

- **React core (`RB-E-REACT-CORE`).** The same decade-of-libraries reasoning appears there
  verbatim as the reason to stay on React unless a concrete driver pushes you off — that doc
  points here for the full leave-React decision.
- **Cross-platform reach (`RB-E-CROSSPLATFORM`).** The counter-move: widening platforms
  *within* the React ecosystem rather than leaving it. Weigh both directions before an exit.
- **Meta-frameworks (`RB-E-META-FRAMEWORKS`).** The MDN case is an architecture exit (SPA →
  server-side templating) as much as a framework exit — sometimes the driver points at how
  you ship React, not whether.

## In one paragraph

Leaving React is a purchase, and **the exit cost is the decision**: React Native's decade of
libraries is the priced-in advantage, so the default is to stay unless a specific driver
pushes you off. The entry's load-bearing evidence that the other side of the trade is
platform-specific is Software Mansion's same-app benchmark — identical unoptimized apps on 6
devices — where KMP wins Android decisively (~8x smaller, 2–4x faster startup, ~50% less RAM;
no JS runtime) while iOS converges and RN uses 3–4x *less* memory (UIKit rendering vs KMP's
resident Skia): one experiment, opposite headlines, hence **measure per platform, never in
general** — credible precisely because an RN consultancy published the unflattering Android
numbers. The recognised drivers: share only business logic with native UI per platform → KMP;
a Dart-invested team wanting one render engine → Flutter, leaving React entirely. Lynx and
Valdi are early — context, not endorsements — and on the web the reading thread (MDN's
SPA-to-server rebuild, Evil Martians' 100KB Web-Components save, Strawberry's React-to-Svelte
rewrite) asks the prior question: whether you needed React there at all.

---

*See also: `RB-E-REACT-CORE` (the stay-on-React side of the same reasoning),
`RB-E-CROSSPLATFORM` (widening platforms without leaving React), `RB-E-META-FRAMEWORKS` (when
the exit is architectural, not framework-level). Background reading: Software Mansion's
KMP-vs-RN same-app benchmark — the entry's load-bearing evidence — plus MDN, Evil Martians,
and Strawberry Browser on leaving React on the web.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "The exit cost is the decision" and "measure per platform, never in general" are the
     assigned organizing idea. The entry grounds the cost (decade of libraries) and the
     per-platform asymmetry (the SWM benchmark's Android/iOS split), but never states either
     as a general principle — that framing is editorial.
  2. "The default is inertia priced correctly, not loyalty" — editorial gloss on the
     recommend.default, not entry text.
  3. Related entries are inferred: RB-E-REACT-CORE via that doc's own pointer to this entry
     (plus the shared decade-of-libraries clause); RB-E-CROSSPLATFORM and RB-E-META-FRAMEWORKS
     are editorial placements. The entry names no related entries.
  4. The entry gives no when-clause for Lynx or Valdi — they are landscape rows only; this doc
     invents none.
  5. The web-side exits (MDN, Evil Martians, Strawberry) are grounded only in reading
     annotations, not option rows — the doc presents them as case-study evidence, not
     candidates.
  6. "It isolates the frameworks; it does not predict a tuned app" — inference from the
     reading's own "identical unoptimized apps" qualifier; the reading states the design, not
     this consequence.
  7. The solid-js tripwire is harvest-process metadata; the doc describes it as a watch
     signal, not as landscape content.
-->
