# Harvest manifest — This Week in React #306 (prepped 2026-11-25)
issue: https://thisweekinreact.com/newsletter/306

Pre-triaged by `harvest prep`: 65 external links · 6 pre-dispositioned (corpus + prior-manifest cross-ref + 1 by triage rules) · **59 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://sentry.io/resources/automated-debugging/](https://sentry.io/resources/automated-debugging/) | skipped: sponsor (Sentry placement) |
| [Check out this recipe for automated debugging with Seer.](https://sentry.io/cookbook/self-healing-workflow-seer/) | skipped: sponsor (Sentry placement, second anchor) |
| [Vercel UI SDK beta - Headless UI behaviors for agents to build components](https://ui-sdk.dev/docs/core/changelog/introducing-ui-sdk) | skipped: pre-ship (Vercel UI SDK beta; reopen: 1.0 — AI-UI headless-for-agents row) |
| [Nexity - open source system to start and grow Next.js + Sanity sites. Includes 9 agents, 1](https://github.com/Pagepro/nexity) | skipped: off-scope (agency starter) |
| [HTML-first React - An unofficial experiment to stop sending static Server Component markup](https://html-first-react.pages.dev/summary/) | skipped: too-early (unofficial experiment) |
| [How we're using AI to make Next.js more secure](https://nextjs.org/blog/how-were-using-ai-to-make-nextjs-more-secure) | already-held → firsthand-2026-11-25 (nextjs.org feed event of the same title) |
| [Remix v3: Fast Pages, Thin Ecosystem](https://marmelab.com/blog/2026/11/12/remix-v3-fast-pages-thin-ecosystem.html) | **kept** → RB-E-META-FRAMEWORKS reading under note REMIX 3 (first hands-on production-shaped comparison: same app in Remix v3 and TanStack Start; performance did not separate them; no Vite plugins/Vitest, no shadcn-equivalent, every React library off the table; Marmelab still recommends Start for most projects; 2026-11-12, verified; also in React Status — corroborating sighting) |
| [The Invisible Shape](https://sorenblank.com/craft/the-invisible-shape) | skipped: off-scope (design-craft essay) |
| [When an import becomes a zip bomb: bundle regressions in Next.js](https://bra31k.dev/en/blog/bundle-size-regressions/) | skipped: how-to (bundle-regression story; BUILD's bundle-budget advice unchanged) |
| [Fate 2.0 - Modern data client - Client state, reactive memo fields, GraphQL, persistence a](https://fate.technology/posts/whats-new-in-fate-2.0) | skipped: too-early (niche data client; no corpus row; reopen: adoption signal in DATA) |
| [Dragology - Declarative drag-and-drop for React SVG interfaces](https://github.com/declarative-dragging/dragology) | skipped: too-early (new SVG drag lib) |
| [React Virtualized 10.0 - TypeScript rewrite, function components with hooks, scrollElement](https://github.com/bvaughn/react-virtualized/releases/tag/10.0.0) | skipped: off-scope (legacy virtualizer revived as a TS rewrite — LISTS' picks are react-window/TanStack Virtual/Legend List; reopen: LISTS gains a react-virtualized migrate need) |
| [React Resizable Panels 4.22 → 4.24 - Workspace popout windows, external drops, blockable c](https://github.com/bvaughn/react-resizable-panels/releases) | skipped: off-scope (no split-pane entry; same as twir-304/305) |
| [React siblings reconciliation](https://x.com/sebastienlorber/status/1899817895489577043) | skipped: off-scope (2025 tweet, reconciliation trivia) |
| [React Helmet Async 3.1 - Nested &lt;Helmet> merging restored on React 19, &lt;meta charset](https://github.com/staylor/react-helmet-async/releases/tag/v3.1.0) | skipped: off-scope (head management; React 19 hoists <title>/<meta> natively) |
| [React Flow 13 - Split stores and useNode / useEdge hooks for fewer re-renders, ESM-only, R](https://xyflow.com/blog/react-flow-13-major-release) | skipped: off-scope (no node-editor/diagram entry; reopen: EDITORS or CHARTS adds a diagram row) |
| [React Anatomy - Browser DevTools panel showing a React page's components as 3D layers](https://react-anatomy.com/) | skipped: too-early (new DevTools panel) |
| [A2UI 1.0 - Google protocol for generative UI, with React, Angular, Lit, Flutter and SwiftU](https://developers.googleblog.com/a2ui-10-build-delightful-fast-reliable-agentic-experiences/) | **kept** → RB-E-AI-UI note (A2UI 1.0, first stable spec, 2026-11-11 — the spec layer the note says the category is settling on; renderer @a2ui/react still 0.16.1 on npm, so the React binding stays 0.x; verified) |
| [Remotion - Make videos programmatically, interactively and agentically](https://www.remotion.dev/blog/make-videos-programmatically-interactively-and-agentically) | skipped: off-scope (programmatic video) |
| [https://www.thefastest.app/](https://www.thefastest.app/) | skipped: too-early (Callstack's public app-startup leaderboard; reopen: cited as a benchmark source in an entry) |
| [Expo Simulators](https://expo.dev/blog/introducing-expo-simulators-cloud-simulators-built-for-agents) | already-held → firsthand-2026-11-25 (expo.dev feed: 'Agentic Workflows with Expo Simulators' / 'How to set up agentic workflows on Expo') |
| [Exact Build](https://exact.appdrop.app/) | skipped: too-early (third-party Exact builder; Exact itself kept in twir-305) |
| [AppDrop](https://appdrop.app/) | skipped: too-early (app builder) |
| [RFC: Node-API addons in React Native - dlopen from react-native/node-api , stable ABI, pre](https://github.com/react-native-community/discussions-and-proposals/pull/1030) | skipped: pre-ship (RFC; reopen: accepted + RN release) |
| [Hello, Graphite: WebGPU](https://wcandillon.dev/article/hello-graphite-webgpu) | skipped: corroboration (Skia Graphite already in SVG/ANIMATION; Skia 3.12 in firsthand) |
| [React Native Form Validation in 2026: Step-by-Step Tutorial with Example](https://formisch.dev/blog/react-native-form-validation/) | already-held → firsthand-2026-11-25 (formisch.dev feed event of the same title) |
| [Migrating from React Native to Swift and Kotlin, One Feature at a Time – the Gobi Story](https://swmansion.com/blog/react-native-to-native-migration-gobi/) | already-held → firsthand-2026-11-25 (swmansion.com feed: 'Migrating from React Native to Swift and Kotlin, One Feature at a Time – the Gobi Story') |
| [Bitrise - The complete guide to React Native OTA updates in 2026 and beyond.](https://bitrise.io/guides/react-native-ota-updates-complete-guide) | skipped: sponsor (Bitrise placement) |
| [Bottom Sheet 1.0 - First stable, unified modal dismissal across iOS, Android, web](https://swmansion.com/changelog/react-native-bottom-sheet-1-0-0/) | already-held → firsthand-2026-11-25 (⚡ @swmansion/react-native-bottom-sheet ≥1.0.0 tripwire) |
| [React Navigation 7.25 - GenericNavigation type, nested route types fix in linking](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation%2Fcore%407.25.0) | skipped: corroboration (React Navigation minor) |
| [React Navigation Bottom Tabs 7.22 - tabBarTransparent option, web focus-ring fix](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation%2Fbottom-tabs%407.22.0) | skipped: corroboration (bottom-tabs minor) |
| [Screen Choreography 0.9 - Simpler shared-transition setup, tab-to-stack pairing, fewer re-](https://github.com/DorianMazur/react-native-screen-choreography/releases/tag/v0.9.0) | already-held → firsthand-2026-11-25 (react-native-screen-choreography 0.7.2 → 0.9.0) |
| [Enriched Markdown 1.2 - Code block panels with copy button, link pills, LaTeX math, stream](https://github.com/software-mansion/enriched-markdown/releases/tag/v1.2.0) | already-held → firsthand-2026-11-25 (react-native-enriched-markdown 1.1.1 → 1.2.0) |
| [Argent 0.33 - Drive native Mac apps by default, leaner agent prompts, profiler fixes](https://github.com/software-mansion/argent/releases/tag/v0.33.0) | already-held → firsthand-2026-11-25 (@swmansion/argent → 0.34.0) |
| [Boost 2.1 - React Native 0.89 and Metro 0.83 support](https://github.com/kuatsu/react-native-boost/releases/tag/v2.1.0) | already-held → firsthand-2026-11-25 (kuatsu/react-native-boost Release 2.1.2) |
| [Ease 0.10 - iOS Swift Package Manager support](https://github.com/appandflow/react-native-ease/releases/tag/v0.10.0) | already-held → firsthand-2026-11-25 (react-native-ease 0.8.1 → 0.10.0) |
| [Trading Charts - Native GPU candlestick charts with streaming data and indicators](https://kirill3333.github.io/react-native-trading-charts/) | skipped: too-early (new GPU candlestick lib; reopen: CHARTS finance-chart gap) |
| [Backtick - A toolchain for fully server-driven React Native apps](https://github.com/backtickjs/backtick) | skipped: too-early (server-driven RN toolchain) |
| [Screen Time - Screen Time API, app blocking and schedules on iOs and Android](https://github.com/magrinj/expo-screen-time) | skipped: too-early (Screen Time module) |
| [Rozenite 2.6 - Keychain storage adapter, SDK 58 support, Nitro timestamp fix](https://github.com/callstackincubator/rozenite/releases/tag/v2.6.0) | already-held → firsthand-2026-11-25 (callstackincubator/rozenite v2.6.0) |
| [RN WebGPU 0.22 - Prebuilt Dawn binaries on Android, macOS compile/shutdown fixes](https://github.com/wcandillon/react-native-webgpu/releases/tag/v0.22.0) | already-held → firsthand-2026-11-25 (wcandillon/react-native-webgpu v0.24.0) |
| [Sentry 8.36 - Android SDK start fix, Metro symbolication fallback](https://github.com/getsentry/sentry-react-native/releases/tag/8.36.0) | skipped: corroboration (Sentry RN patch-level fixes) |
| [Simlock 0.8 - Auto-enroll plugged-in phones, foldable streaming, one shared capture per de](https://github.com/callstackincubator/simlock/releases/tag/v0.8.0) | already-held → firsthand-2026-11-25 (callstackincubator/simlock v0.8.0) |
| [Uniwind 1.14 - platform-color() system colors, text break props, native style caching](https://github.com/uni-stack/uniwind/releases/tag/v1.14.0) | already-held → firsthand-2026-11-25 (uniwind 1.12.2 → 1.14.0) |
| [Nitro SQLite 10.4 - Drizzle driver, SEE encryption, statement caching, Expo config plugins](https://github.com/margelo/react-native-nitro-sqlite/releases/tag/v10.4.0) | skipped: corroboration (nitro-sqlite minor; Drizzle driver noted — reopen: STORAGE adds a nitro-sqlite row) |
| [Expo Explore - Experimental tool mapping every screen of your app, with visual PR reviews](https://github.com/expo/explore) | skipped: too-early (experimental Expo tool) |
| [LLP - Linked Literate Programming, keep humans in markdown, let AI write the code, the met](https://github.com/ccheever/llp) | skipped: off-scope (literate-programming experiment) |
| [RN AI 0.13 - Apple Core AI and Gemini Nano packages, all providers on AI SDK 7](https://github.com/callstackincubator/ai/releases/tag/v0.13.0) | already-held → firsthand-2026-11-25 (@react-native-ai/apple 0.12.0 → 0.13.0; @react-native-ai/adk DEPRECATED) |
| [Beto - Is React Native Still Worth Learning in 2027?](https://www.youtube.com/watch?v=fnvx2_ItPLM) | skipped: corroboration (opinion video; unwatched) |
| [RNR 377 - A11y and Animations](https://infinite.red/react-native-radio/rnr-377) | skipped: corroboration (podcast; A11y/animation general) |
| [Node.js green threads - Experimental node:green_threads PR, cheaper than workers, built-in](https://www.jasnell.me/posts/green-threads-in-node) | skipped: pre-ship (experimental Node PR) |
| [npm RFC - Package Variants](https://github.com/npm/rfcs/pull/928) | skipped: pre-ship (npm RFC) |
| [Webpack - CSS and HTML Are Built In](https://webpack.js.org/blog/2026-11-16-css-and-html-are-built-in/) | already-held → firsthand-2026-11-25 (webpack.js.org feed: 'CSS and HTML Are Built In') |
| [Fixing a WebKit bug to see if promises are made of train tracks](https://alistair.sh/thenables) | skipped: off-scope (WebKit bug essay) |
| [Your JS Error Is Lying to You](https://blog.gaborkoos.com/posts/2026-11-12-Your-JS-Error-Is-Lying-to-You/) | skipped: how-to (error-handling essay) |
| [Solid 2.0 - Async reactive graph, Server Functions in core, diagnostics for agents, smalle](https://www.solidjs.com/blog/solid-2-0-the-long-hold/) | already-held → firsthand-2026-11-25 (⚡ solid-js ≥2.0.0 tripwire — handled by the tripwire triage) |
| [Oxlint 1.92 - Faster type-aware linting with tsrs](https://oxc.rs/blog/2026-11-17-faster-type-aware-linting-with-tsrs) | already-held → firsthand-2026-11-25 (oxlint 1.88.0 → 1.95.0; DX already notes tsrs type-aware linting) |
| [unkernel - Real Linux kernel compiled to WebAssembly, runs unmodified Linux programs in No](https://github.com/pithings/unkernel) | skipped: off-scope (Linux-in-Wasm) |
| [type-fest 6.0 - 120 new types, requires TypeScript 6 and exactOptionalPropertyTypes , perf](https://github.com/sindresorhus/type-fest/releases/tag/v6.0.0) | skipped: off-scope (type utility major; no entry tracks it) |
| [If you are not signed-up, you are missing out](https://twitter.com/wcandillon/status/1263825118557593600) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [React Router 8.5.1 - &lt;Await unstable_promise> built on React's use() , fetcher revalida](https://reactrouter.com/changelog) | previously skipped (corroboration) — carry over unless a reopen signal applies |
| [I'm constantly finding interesting things to learn in there.](https://twitter.com/TkDodo/status/1661337628875137027) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [build mode - Read this before deleting your AGENTS.md](https://go.posthog.com/twir-nov18) | sponsor (tracking link, not evaluated) [rule:sponsor-tracking-domain] |
| [pnpm 12.20 → 12.22 - globalPackagesConfig , pnpm why --ranges , pnpm store add for tarball](https://pnpm.io/blog?type=releases) | previously skipped (corroboration) — carry over unless a reopen signal applies |
| [Website](https://sebastienlorber.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Advocate pass (2026-11-25)

Re-argued as a hostile reviewer:
- **React Flow 13** (major: split stores, ESM-only) and **react-virtualized 10** (TS rewrite of a legacy staple) — both majors of widely installed libraries. Held: no entry owns node editors, and LISTS deliberately does not recommend react-virtualized; neither changes a pick.
- **Vercel UI SDK beta** — headless behaviours for agents, squarely AI-UI. Held pre-ship (beta).
- **react-helmet-async 3.1** — restores nested merging on React 19. Held: React 19's native metadata hoisting is the corpus answer.
- **When an import becomes a zip bomb** — a concrete bundle-regression story. Held how-to: it ends in "add a size budget", which BUILD already says.
- **Fate 2.0** — data client with GraphQL + persistence. Held too-early: no adoption signal and no corpus row to update.

Flips: **none**. Keeps: Marmelab Remix v3 vs TanStack Start (META-FRAMEWORKS), A2UI 1.0 stable spec (AI-UI).
