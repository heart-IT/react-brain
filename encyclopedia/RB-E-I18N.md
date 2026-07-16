---
id: RB-E-I18N
title: "About internationalization (i18n)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-16
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-I18N
defer_to_skill: null
related: [RB-E-META-FRAMEWORKS, RB-E-CROSSPLATFORM, RB-E-BUILD]
sources:
  - "https://github.com/amannn/next-intl/releases/tag/v4.8.0"
  - "https://github.com/nkzw-tech/fbtee"
  - "https://next-intl.dev/blog/precompilation"
  - "https://formatjs.github.io/docs/core-concepts/icu-syntax/"
---

# About internationalization (i18n)

> **Diataxis: Explanation.** This page builds *understanding* of the i18n decision — why the
> pick is framework-first, and why the deeper axis is compile-time vs runtime. It is not a
> setup guide and not a message-syntax reference (that is ICU's own documentation). The
> candidate list and one-line tradeoffs live in the index entry `RB-E-I18N`; there is no defer
> skill — this entry owns its own depth. Read this for the *why*.

## The one distinction that organises everything: the format vs the machinery

Every "which i18n library?" debate conflates two layers that age at completely different
speeds. The first is the **message format** — the syntax translators and developers share. For
the serious React options that format is **ICU**: interpolation, plurals and `selectordinal`,
`select`, number/date skeletons, rich text. ICU is a **stable Unicode standard**; the
canonical FormatJS reference for it does not go stale, and the same syntax underlies
react-intl, next-intl, and Lingui. Learning it is the durable investment.

The second layer is the **machinery that evaluates the format** — and this is where libraries
actually differ. A *runtime* library ships a message parser to every user's device and
interprets ICU strings on the fly. An *ahead-of-time* (AOT) library moves that work to the
build: **next-intl v4.8 precompiles ICU messages at build time into minified ASTs evaluated by
a ~650-byte runtime** — the parser never ships. The precompilation write-up by next-intl's
author walks the design space honestly, weighing function-based vs AST compilation strategies
against bundle size before landing on ASTs.

Hence the organising slogan: **compile the locale, don't ship the library.** The format is a
standard you adopt; whether its evaluator rides in your bundle or runs in your build pipeline
is the real choice — and it is a bundle-size choice, not a features choice.

## The default, and why

> Next.js app → next-intl. Otherwise i18next (web + RN, huge ecosystem) or Lingui
> (compile-time, low boilerplate).

The first question is framework, not fashion: **next-intl is Next.js-first**, and in a
Next.js app it brings the AOT story (v4.8's build-time ICU compilation) with framework-shaped
integration. Outside Next.js the default forks on what you optimise for:

- **Reach and ecosystem → i18next** (with react-i18next). Very popular, a big plugin
  ecosystem, and it works on web *and* React Native — the parity pick when one message layer
  must serve both renderers.
- **Bundle and boilerplate → Lingui** (6.x). Compile-time message extraction, low-boilerplate
  authoring, i18n directives.

The index entry's when-clauses restate the fork: *bundle-size-sensitive → next-intl / Lingui
(AOT-compiled messages)*; *maximum plugin ecosystem or RN + web parity → i18next*.

## The landscape, and when each one wins

**next-intl (4.x)** — Next.js-first. The headline is v4.8's ahead-of-time compilation:
ICU messages become minified ASTs at build time, evaluated by a runtime of roughly 650 bytes,
trading runtime message parsing for smaller bundles. It wins exactly where it says: Next.js
apps, especially bundle-size-sensitive ones.

**Lingui (6.x)** — the compile-time pick outside Next.js. Message extraction happens at build
time, authoring is low-boilerplate via i18n directives. It shares the AOT side of the fork
with next-intl in the entry's bundle-size when-clause.

**i18next / react-i18next** — the runtime incumbent. Very popular, the biggest plugin
ecosystem in the category, and one layer that spans web and React Native. It wins when reach,
plugins, and web+RN parity outweigh the compile-time bundle story.

**FormatJS / react-intl** — the mature, framework-agnostic home of the ICU message format
itself. Its documentation is the canonical ICU reference regardless of which library you ship.

**fbtee** — the modern continuation of Meta's deprecated `fbt`. The entry stakes no claim
beyond that lineage; treat it as a named option to evaluate, not a graded one.

## Tradeoffs and failure modes to name out loud

- **Hardcoded strings in a production app.** The index entry's own doctor signal: no i18n
  layer found anywhere in source in a production-stage repo. Its hint is the honest economics —
  if localization is *ever* on the roadmap, retrofitting hardcoded strings is the expensive
  path; wire the message layer early (i18next for web+RN reach, Lingui/next-intl for
  AOT-compiled bundles) even while you ship one locale.
- **Shipping the parser when you didn't have to.** If the app is bundle-size-sensitive and the
  messages are ICU anyway, a runtime parser on every device is pure overhead the AOT options
  (next-intl v4.8, Lingui) were built to remove.
- **Treating the format as lock-in.** The message syntax is ICU — a stable Unicode standard
  shared across react-intl, next-intl, and Lingui — so the syntax investment survives a
  library change; the machinery is what you'd swap.
- **next-intl outside its home.** It is Next.js-first by the entry's own tradeoff line; the
  non-Next.js defaults are i18next and Lingui.
- **Assuming all "compile-time" is the same compile.** The entry groups next-intl and Lingui
  as AOT-compiled messages, but the mechanism it details (minified ASTs + ~650-byte runtime,
  function-based vs AST strategy analysis) is documented for next-intl specifically — verify
  Lingui's output shape against your own bundle budget rather than transferring the numbers.

## How it interacts with the rest of the stack

- **Meta-frameworks (`RB-E-META-FRAMEWORKS`).** The default's first branch is literally "is
  this a Next.js app" — the i18n pick is downstream of the framework pick.
- **Cross-platform (`RB-E-CROSSPLATFORM`).** i18next's web + React Native reach is the entry's
  named parity option; if one shared logic package serves both platforms, that is the axis
  that decides.
- **Build & bundle (`RB-E-BUILD`).** AOT message compilation is a build-pipeline concern, and
  its entire payoff is bundle size — the compile-time-vs-runtime fork in this entry is a
  bundle-budget decision wearing an i18n hat.

## In one paragraph

Separate the **format** from the **machinery**. The format is ICU — interpolation, plurals,
`select`, number/date skeletons — a stable Unicode standard shared by react-intl, next-intl,
and Lingui, and the part worth learning once. The machinery either ships (runtime parsing on
device) or compiles away (**next-intl v4.8**: ICU messages precompiled at build time into
minified ASTs evaluated by a ~650-byte runtime) — *compile the locale, don't ship the
library*. The default is framework-first: **Next.js → next-intl; otherwise i18next** (web +
RN, huge plugin ecosystem) **or Lingui** (6.x, compile-time extraction, low boilerplate), with
bundle-sensitivity pushing toward the AOT pair and ecosystem/parity pushing toward i18next.
And wire the layer early: in a production repo with no i18n layer, retrofitting hardcoded
strings is the expensive path.

---

*See also: `RB-E-META-FRAMEWORKS` (the Next.js branch that picks next-intl),
`RB-E-CROSSPLATFORM` (i18next as the web+RN parity layer), `RB-E-BUILD` (AOT compilation as a
bundle-budget decision). Background reading: Jan Amann's precompilation write-up (the
compile-time-vs-runtime tradeoff from first principles) and the FormatJS ICU syntax reference
(the format itself, which doesn't go stale).*

<!-- CANNOT GROUND (flagged, not invented):
  1. "Compile the locale, don't ship the library" is the assigned organizing idea; the entry
     grounds AOT-vs-runtime and the bundle-size framing, but the slogan itself is editorial.
  2. Lingui's compile-time output shape (whether it eliminates a runtime parser the way
     next-intl's AST+650-byte-runtime design does) — the entry groups Lingui with next-intl
     under "AOT-compiled messages" but details the mechanism only for next-intl; this doc
     says so explicitly rather than transferring the claim.
  3. fbtee — the entry gives only "modern continuation of Meta's deprecated fbt"; no
     runtime/compile-time classification or recommendation is made here.
  4. "the syntax investment survives a library change" — inference from ICU being a stable
     Unicode standard shared across react-intl/next-intl/Lingui; the entry does not discuss
     migration between libraries.
  5. i18next classified as "runtime" — the entry never labels i18next runtime-vs-AOT; the
     label is inferred from the when-clause contrast (AOT-compiled → next-intl/Lingui,
     ecosystem → i18next) and hedged as such.
-->
