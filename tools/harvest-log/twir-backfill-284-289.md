# Harvest manifest — TWiR #284–289 back-audit (2026-07-16)
issue: backfill

Retroactive sweep requested by the maintainer: deterministic inventory of issues 284–289
(the pre-manifest era; #286 was never processed at all) set-differenced against corpus +
manifests (~350 unaccounted links), then triaged. #290 audited 57/57 accounted — the
manifest discipline closed this hole going forward. This manifest records the ADJUDICATED
DELTA (keeps + notable skips), not all ~350 rows; the bulk were minor releases, sponsors,
videos, pre-ship PRs, or facts held via other receipts. Coverage gate N/A (no single page).

## Kept

| item | disposition |
|---|---|
| bottom sheets — [@swmansion/react-native-bottom-sheet](https://github.com/software-mansion-labs/react-native-bottom-sheet) (#284, [0.16 #289](https://github.com/software-mansion-labs/react-native-bottom-sheet/releases/tag/v0.16.0)) + [True Sheet 3.11](https://sheet.lodev09.com/blog/release-3-11) (#287) + incumbent gorhom never covered | **kept** → NEW entry RB-E-SHEETS (domain gap, 3 recurring signals; versions verified vs npm; SWM-1.0 tripwire wired) |
| [Hermes' own stable-release line](https://github.com/facebook/hermes/blob/static_h/doc/blog/2026-06-05-new-hermes-stable-release.md) (#285/#288) — 260318099.0.0: Set ops, groupBy, iterator helpers, Promise.withResolvers, built-in TextDecoder, `--transform-ts` native type-stripping | **kept** → RB-E-BUILD note + source (verified vs the raw doc) |
| [Evan Bacon — Things I Learned While Building Expo](https://evanbacon.dev/blog/expo) (#284) — 9-year farewell retrospective: dogfooding, "a runtime that was theirs", telemetry-settled architecture debates | **kept** → RB-E-BUILD reading (the Expo-vs-bare row's philosophical background; fetch-verified) |
| [Waku Slices](https://newsletter.daishikato.com/p/waku-s-unique-feature-slices) (#287, Daishi Kato) — reusable components w/ independent render config; lazy slices ≈ server islands | **kept as FACT** → RB-E-META-FRAMEWORKS Waku option row + source (announcement-grade, not reading-grade — cap discipline) |
| [Vercel + Shopify rebuilding Hydrogen](https://vercel.com/blog/vercel-and-shopify-are-rebuilding-hydrogen) (#288) | **kept** → RB-E-META-FRAMEWORKS note line + source (meta-framework landscape consolidation) |
| [React Router v8 official release post](https://remix.run/blog/react-router-v8) (#287) | **kept** → RB-E-NAV source (fact already held; first-party receipt was missing) |
| [actions/checkout 7.0 — safer pull_request_target defaults](https://github.blog/changelog/2026-06-18-safer-pull_request_target-defaults-for-github-actions-checkout/) (#287) | **kept** → RB-E-SECURITY note line + source (platform fix for the exact 'Pwn Request' chain in the TanStack postmortem reading) |
| [margelo/react-native-runtimes](https://github.com/margelo/react-native-runtimes) (#284 AND #285 — recurrence) — isolated Hermes runtimes for RN components/business logic | **kept as LEAD** → RB-E-NATIVE note + source (young; recurrence-grade signal) |
| [shirakaba/expo-desktop](https://github.com/shirakaba/expo-desktop) (#284) — Expo → macOS/Windows | **kept as LEAD** → RB-E-DESKTOP note + source (early; a different lane than react-native-windows/-macos) |

## Notable skips (the adjudicated rest)

| item | disposition |
|---|---|
| [Long Ho — React Compiler Is A Retrofit](https://longho.dev/posts/react-compiler-is-a-retrofit/) (#288) | skipped: UNVERIFIABLE ×3 (site is a JS shell; post outside the RSS window; NO Wayback snapshot 2026-07-16) — wanted it as REACT-CORE's compiler-skeptic counterpoint; reopen when it enters the feed or gets archived |
| N-API v10 on Hermes (tweet-only, #284) | skipped: unverifiable — not in the Hermes stable-release blog; tweet receipts don't clear the bar; reopen when a Hermes release note/doc mentions Node-API |
| [TanStack Table v9 — 90% memory refactor](https://tanstack.com/blog/tanstack-table-v9-memory-performance) (#287) | skipped: cap + niche — TYPESCRIPT already holds a TanStack-Table perf reading; tables aren't a corpus selection axis |
| [Kotlin compiler plugin cut TTFR 30%](https://expo.dev/blog/how-a-kotlin-compiler-plugin-cut-android-time-to-first-render) + [pump.fun startup −50%](https://medium.com/@pumpdotfun_/how-we-improved-the-startup-time-of-our-app-by-50-b3107bed1bf9) (#286) | skipped: depth — perf case studies belong to the react-native-optimization skill, not the selection index |
| [codewithbeto — still betting on React Native](https://codewithbeto.dev/blog/still-betting-on-react-native) (#286) | skipped: opinion essay; CROSSPLATFORM already carries the argued thesis |
| Dan Abramov joins Next.js part-time (#288) | skipped: people news, not a selection fact |
| [Partiful — Google's best app, why RN](https://www.youtube.com/watch?v=I4Wlu2BZEsw) (#288) | skipped: adoption anecdote (podcast); reopen if it recurs as a written case study |
| [keyframer.dev](https://keyframer.dev/) (#284) · [PolyCSS](https://polycss.com/) (#287) · [foresightjs](https://foresightjs.com/) (#287) · [Frond](https://frondruntime.dev/) (#288) | skipped: too-early (no adoption signal) |
| [WordPress reverts React 19 in Gutenberg](https://make.wordpress.org/core/2026/06/05/react-19-upgrade-temporarily-reverted-in-gutenberg/) (#286) | skipped: ecosystem trivia — temporary revert, not a durable compat fact |
| Rust-compiler-everywhere PR trail (SWC/Rspack/Rolldown/Oxlint/Bun/Turbopack, #284–288) | already-held: REACT-CORE + BUILD carry the merged outcome (SWC/Rspack 2.1 ship it; Rolldown pulled its integration) |
| version-bump wall (Reanimated 4.5, Metro 0.85/0.86, Worklets 0.10, WebView 14/15, Legend List 3.x, Base UI 1.6, React Aria 1.18/1.19, RHF 7.7x, StyleX 0.19, visx 4, Sentry 8.1x, Argent/agent-device/Rock/Voltra/nitro-fetch/uniwind/super-calendar…) | already-held or skipped: minor-release — option rows don't track point versions; the #287–289 passes corroborated the notable ones |
| conference/sponsor/community links (App.js, Chain React, React Summit, PostHog, certificates.dev, State of CSS…) | skipped: sponsor / off-scope |
