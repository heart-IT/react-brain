# Harvest manifest — This Week in React #291 (2026-07-22)
issue: https://thisweekinreact.com/newsletter/291

Processed 2026-07-28. Pre-triaged by `harvest prep`: 70 external links · 15 pre-dispositioned ·
55 judged here. EVERY external link carries a disposition row — `kept` (where it landed),
`already-held` (where it already lives), or `skipped` (why). Reason classes: corroboration ·
how-to (defer_to_skill) · pre-ship (RFC/alpha/RC) · too-early (0.x lab) · minor-release · cap ·
unverifiable · off-scope · sponsor. `cap`/`pre-ship`/`too-early` skips each note the reopen signal.

## React (web)

| item | disposition |
|---|---|
| [Tim Neutkens about TypeScript 7 support in Next.js 16.3](https://x.com/timneutkens/status/2076771696745345363) | **kept** → RB-E-TYPESCRIPT note + `when` clause + migrate caveat. The TWEET is unverifiable (X), so the fact was verified against the first-party docs page instead — `experimental.useTypeScriptCli` runs the project-local tsc "while [TypeScript 7's] JavaScript API is unavailable". The issue's "only in TS 7.1" detail is NOT in the docs and was therefore not encoded |
| [React - Denial of Service in Server Functions](https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g) | **kept** → RB-E-SECURITY version floor 19.2.5+ → 19.2.8/19.1.9/19.0.8 + note + source (advisory verified: High, CVSS 7.5, react-server-dom-webpack/parcel/turbopack) |
| [Next.js - July 2026 Security Release](https://nextjs.org/blog/july-2026-security-release) | **kept** → RB-E-META-FRAMEWORKS note precision + source (the entry already CLAIMED 4 high + 5 medium from React Status #483; this adds the patched versions 16.2.11 / 15.5.21, verified vs the post) |
| [React Hook Form Avoids State. TanStack Form Scopes It](https://www.adarsha.dev/blog/react-hook-form-and-tanstack-form-state-models) | **kept** → RB-E-FORMS reading + claim (also in React Weekly #30 — the mechanism behind the entry's RHF-vs-TanStack option rows) |
| [Do we need state management libraries anymore?](https://neciudan.dev/do-we-need-state-management-libraries) | **kept** → RB-E-STATE reading + claim (also surfaced by firsthand; the build-vs-buy answer under the entry's "don't add a lib" clause) |
| [Props, Composers, and Providers: the composition pattern we're converging on](https://backstage.orus.eu/react-composition-patterns-at-orus) | **kept** → RB-E-REACT-CORE reading + claim (triple-corroborated: also React Status #484 + React Digest #2330) |
| [React.dev PR - Dynamic OG images for docs pages](https://github.com/reactjs/react.dev/pull/8527) | skipped: off-scope (docs-site chrome, no selection fact) |
| [TSRX in TanStack Start: what we like, and three bugs we filed](https://www.jxd.dev/blog/tsrx-tanstack-start) | skipped: too-early — RB-E-REACT-CORE already lists TSRX as an experimental runtime and says "not production bets". Reopen: TSRX or Octane reaching a stable npm release |
| [Octane.js](https://octanejs.dev/) | skipped: too-early (pre-release framework by the TSRX author; AOT-compiled, keeps React's programming model). Reopen: a 1.0 / published npm package → RB-E-ALT-FRAMEWORKS or RB-E-REACT-CORE runtime row |
| [Advanced React State Boundaries in a Real Next.js App](https://www.nirtamir.com/articles/advanced-react-questions) | skipped: how-to (interview-question walkthrough; the state-boundary decision is already covered by RB-E-STATE's communication-patterns reading) |
| [Vite Plugin React 0.5.28 - RSC runtime optimizations](https://github.com/vitejs/vite-plugin-react/blob/plugin-rsc@0.5.28/packages/plugin-rsc/CHANGELOG.md) | skipped: minor-release (changelog entry) |
| [GTKX 1.0 RC - The React framework for Linux](https://gtkx.dev/blog/gtkx-1-0-rc-1) | skipped: pre-ship (release candidate). Two signals this week (also React Status #484) and RB-E-DESKTOP has NO Linux-native React row — Electron/Tauri reach Linux via a webview. Reopen: GTKX 1.0 stable → DESKTOP option row (same promotion path Native SDK took at its 2nd signal) |
| [React Hook Form 7.82](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.82.0) | skipped: minor-release — RB-E-FORMS doesn't track point versions (7.82.0 is cited inside the new reading's version note) |
| [Jotai 3.0 alpha](https://github.com/pmndrs/jotai/releases/tag/v3.0.0-alpha.0) | skipped: pre-ship — npm 2026-07-28: latest 2.20.2, next 3.0.0-alpha.0. Reopen: Jotai 3.0 stable → RB-E-STATE option row (ESM/React-18+ line) |
| [TanStack Devtools Rspack 0.1](https://github.com/TanStack/devtools/releases/tag/%40tanstack%2Fdevtools-rspack%400.1.0) | skipped: minor-release (bundler adapter reaching parity) |
| [Astryx 0.1.5](https://github.com/facebook/astryx/releases/tag/v0.1.5) | already-held: RB-E-COMPONENT-LIBS tracks Astryx as a beta option row — routine changelog bump, same call as the 0.1.3 row in twir-290 |
| [Inside TanStack Table V9 Reactivity](https://tanstack.com/blog/tanstack-table-v9-reactivity) | carried skip: pre-ship — RE-VERIFIED 2026-07-28, @tanstack/react-table latest is 8.21.3, v9 is at 9.0.0-beta.58. Reopen: v9 stable → RB-E-LISTS/RB-E-TYPESCRIPT |
| [ReactBench](https://www.reactbench.com/blog) | already-held: RB-E-AI-DEVTOOLS |
| [shadcn CLI 4.13.1 - Add React Aria support](https://ui.shadcn.com/docs/changelog/2026-07-react-aria) | already-held: RB-E-COMPONENT-LIBS |
| [dx-styles](https://dx-styles.dev/blog/why-dx-styles/) | already-held: RB-E-STYLING |
| [Building a ChatGPT-Style AI Chat App in React Native with RAG & Streaming](https://blog.margelo.com/building-native-llm-chat-app-with-rag) | already-held: RB-E-AI-UI |
| [Pete Hunt joins Vercel to lead Next.js and run Frameworks](https://x.com/rauchg/status/2077870043833229692) | carried skip: unverifiable (tweet-only, per react-status-483). Reopen: a written first-party announcement |

## React Native

| item | disposition |
|---|---|
| [React Native PR - Swift Package Manager backported to RN 0.87](https://github.com/react/react-native/pull/57332) | **kept** → RB-E-RN-VERSIONS 0.87 option row + source (verified: the SwiftPM chain #57442/#57332/#57564 was picked into 0.87 via #57578, merged 2026-07-16) |
| [Expo Agent - Ending the closed beta and winding the project down](https://expo.dev/changelog/expo-agent-ending-the-closed-beta-and-winding-the-project-down) | **kept** → RB-E-AI-DEVTOOLS option-row status flip + note + source. A DEPRECATION: agent.expo.dev dies after 2026-07-31; the entry had carried it as "track, don't bet" since 2026-07-09 — the note now generalizes (skills/MCP layer outlives the hosted-product layer) |
| [How Worklets Bundle Mode accidentally fixed Hermes V1 memory regression](https://swmansion.com/blog/how-worklets-bundle-mode-accidentally-fixed-Hermes-v1-memory-regression/) | **kept** → RB-E-ANIMATION note + worklets option row + source + NEW tripwire (react-native ≥ 0.87.0). Verified numbers: ~512KB Hermes V1 debug metadata per eval'd worklet, Expensify's bundle >1,000 unique worklets, ≥50MB at startup; four fixes in preference order |
| [Which React Native Animation Library Should You Use for Performance?](https://andrei-calazans.com/posts/2026-07-15-which-react-native-animation-library/) | **kept** → RB-E-ANIMATION reading + claim (also React Status #484). The INDEPENDENT replication the held Expo/Ease benchmark's own vendor-bias caveat asks for; splits the answer by animation type and reproduces the Bundle Mode memory result |
| [What Does a Server-State Client Cost You Per Request?](https://andrei-calazans.com/posts/2026-07-18-cost-of-graphql-client-server-state/) | **kept** → RB-E-DATA reading + claim (also React Weekly #30). Six data layers behind one identical contract on a low-end Samsung A16 — the only price tag on the entry's option rows |
| [Metrognome - An AI Agent for Measured React Native Performance Fixes](https://www.callstack.com/blog/an-ai-agent-for-measured-react-native-performance-fixes) | **kept** → RB-E-AI-DEVTOOLS reading (vendor post, flagged as such; the durable part is an optimization agent that rejects its own work against a noise floor) |
| [Whisper.rn](https://github.com/mybigday/whisper.rn) | **kept** → RB-E-ONDEVICE-AI option row + `when` clause + source (verified: npm 0.7.2, ~800★, whisper.cpp + NVIDIA Parakeet ASR — names the binding the row previously left generic) |
| [Agent Device 0.20](https://github.com/callstack/agent-device/releases/tag/v0.20.0) | **kept** (version correction) → RB-E-AI-DEVTOOLS option row said "v0.19.x"; npm now 0.20.1 |
| [Argent 0.16](https://github.com/software-mansion/argent/releases/tag/v0.16.0) | **kept** (version correction) → RB-E-AI-DEVTOOLS option row said "0.15"; npm now 0.17.0 |
| [Worklets 0.11](https://github.com/software-mansion/react-native-reanimated/releases/tag/worklets-0.11.0) | **kept** (REOPENED from a carried minor-release skip) → RB-E-ANIMATION — "Hermes V1 memory workaround" is the same fact as the Bundle Mode post above, not a routine bump |
| [React Native RFC - Binary Props](https://github.com/bartlomiejbloniarz/discussions-and-proposals/blob/binary-props/proposals/1013-binary-props-pipeline.md) | skipped: pre-ship RFC (folly::dynamic out of Fabric's Android prop pipeline; quoted ~257µs → ~36µs per view per frame). Reopen: merged AND shipped in an RN release → RB-E-RN-VERSIONS |
| [Redraw Playground Examples](https://wcandillon.github.io/redraw/examples/) | skipped: showcase gallery, not selection knowledge |
| [Keyframer Animation Recipes](https://keyframer.dev/blog) | skipped: showcase gallery (Reanimated 4 / Gesture Handler recipes) |
| [How I Added NFC Habit Verification to a React Native App](https://codewithbeto.dev/blog/nfc-habit-verification-react-native) | skipped: how-to (single-feature build log; also React Weekly #30) |
| [A Step-By-Step Guide to Super App Development With Re.Pack 5](https://www.callstack.com/blog/step-by-step-guide-to-super-app-development) | skipped: how-to — RB-E-BUILD already holds the Re.Pack super-app position plus the Teamworks production case study (Native Weekly #17); also React Weekly #30 |
| [Vision Camera 5.1](https://github.com/mrousavy/react-native-vision-camera/releases/tag/v5.1.1) | skipped: minor-release |
| [WebGPU 0.6](https://github.com/wcandillon/react-native-webgpu/releases/tag/v0.6.0) | skipped: minor-release |
| [Sentry 8.19](https://github.com/getsentry/sentry-react-native/releases/tag/8.19.0) | skipped: minor-release |
| [Expo Apple Targets 5.0](https://github.com/EvanBacon/expo-apple-targets) | skipped: niche tooling — no entry owns Apple extension/target scaffolding, and there is no recurring selection signal yet |
| [Nitro Godot](https://github.com/hung-yueh/react-native-nitro-godot) | skipped: too-early (new, unproven). Reopen: adoption signal or a 2nd independent mention → RB-E-GAMES |
| [Playback Controls](https://github.com/V3RON/react-native-playback-controls) | skipped: too-early/niche. Reopen: 2nd mention → RB-E-MEDIA |
| [Expo Libghostty](https://github.com/arcboxlabs/expo-libghostty) | skipped: novelty (terminal view in RN) |
| [RN Date](https://github.com/bbernag/react-native-date) | skipped: too-early/niche (no entry owns date handling) |
| [Pure Module Skill](https://github.com/op-engineering/pure-module-skill) | skipped: too-early (scaffolding skill). Reopen: 2nd mention → RB-E-AI-DEVTOOLS skills-pack rows |
| [RNR 367 - Ask Us Anything](https://infinite.red/react-native-radio/rnr-367-ask-us-anything-ama-_a_bxt_5) | skipped: AMA format, no durable selection fact to `watching:` |
| [Gesture Handler 3.1](https://github.com/software-mansion/react-native-gesture-handler/releases/tag/v3.1.0) | carried skip: minor-release |
| [Metro 0.87](https://github.com/react/metro/releases/tag/v0.87.0) | carried skip: minor-release (optional deps default-on, ~5% faster cold builds) |
| [Skia 2.9](https://github.com/Shopify/react-native-skia/releases/tag/v2.9.0) | carried skip: minor-release |

## Ecosystem / tooling

| item | disposition |
|---|---|
| [Oxlint 1.75 - Type-Aware Linting Stable](https://oxc.rs/blog/2026-07-22-type-aware-linting-stable) | **kept** → RB-E-DX new option row + `when` clause + note + source. A durable status flip: tsgolint v7 stable, tracks TypeScript 7.0.2, 59 of typescript-eslint's 61 type-aware rules — type-awareness stops being a reason to stay on typescript-eslint |
| [pnpm 11.11-11.14](https://pnpm.io/blog/releases/11.11-11.14) | **kept** → RB-E-DX note + `when` clause + source. FIRES the twir-290 reopen signal ("pnpm RFC merged ≠ shipped; DX/BUILD candidate when it lands in a pnpm release"): `pnpm change` / `pnpm version -r` / `pnpm lane` + `.changeset/ledger.yaml`, plus `pnpm doctor` and a path-traversal fix |
| [Engineering Yuku's High-Performance Parsers with Data-Oriented Design](https://www.arshad.fyi/writings/engineering-high-performance-parsers) | skipped: off-scope (AST memory-layout internals — parser engineering, not React selection) |
| [Fetch Is Not Enough](https://www.jasnell.me/posts/fetch-is-not-enough) | skipped: off-scope (server runtime `serve()` proposal) — consistent with the twir-290 skip of the same author's "Fetch Needs Error Codes" |
| [Rolldown 1.2](https://github.com/rolldown/rolldown/releases/tag/v1.2.0) | skipped: minor-release |
| [Astro 7.1](https://astro.build/blog/astro-710/) | skipped: minor-release — RB-E-META-FRAMEWORKS lists Astro without point versions |
| [Lightning CSS 1.33](https://github.com/parcel-bundler/lightningcss/releases/tag/v1.33.0) | skipped: off-scope (CSS-parser feature bump) |
| [magic-string 1.0](https://github.com/Rich-Harris/magic-string/releases/tag/v1.0.0) | skipped: off-scope (low-level sourcemap utility) |

## Sponsors, testimonials & issue chrome

| item | disposition |
|---|---|
| [PlanetScale](https://planetscale.com/) · [Migrate your database today](https://planetscale.com/migrate) · [PostHog](https://go.posthog.com/twir-jul22) · [Puter.js](https://developer.puter.com/) · [Sentry workshop](https://sentry.io/resources/react-native-workshop-2026/) | sponsor (not evaluated) |
| [Meticulous](https://www.meticulous.ai/) · [Drizz](https://www.drizz.dev/) | carried skip: sponsor |
| [sebastienlorber tweet](https://x.com/sebastienlorber/status/2079905846587162634) · [Baconbrix testimonial](https://twitter.com/Baconbrix/status/1622655092657688576) | off-scope (issue chrome / testimonials) |
| [reader testimonial clip](https://www.youtube.com/clip/UgkxDdNASo6xNS710ODcjMx0WW4HtTxIYbrA) · [jherr testimonial tweet](https://twitter.com/jherr/status/1666578571912171520) · [sebastienlorber.com](https://sebastienlorber.com/) | carried skip: off-scope |

## Advocate pass (hostile re-read of the skips)

Flipped back in: **Worklets 0.11** (carried as a routine minor release — but its release note IS
the Hermes V1 memory workaround, a durable perf fact, not a version bump).

Argued and held as skips: **GTKX 1.0 RC** — the strongest candidate (uncovered domain: no
Linux-native React row in RB-E-DESKTOP, and two independent mentions this week), but RC is
pre-ship and the Native-SDK precedent promoted on a 2nd signal *across weeks*, not two
newsletters covering the same release. Reopen wired. **TSRX/Octane** — REACT-CORE already carries
TSRX as experimental; adding an unreleased framework would be novelty. **Binary Props RFC** — the
numbers are compelling but nothing has shipped.
