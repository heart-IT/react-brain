# Harvest manifest — This Week in React #299 (prepped 2026-10-08)
issue: https://thisweekinreact.com/newsletter/299

Pre-triaged by `harvest prep`: 62 external links · 20 pre-dispositioned (corpus + prior-manifest cross-ref + 1 by triage rules) · **42 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://www.skybridge.tech/](https://www.skybridge.tech/) | skipped: sponsor (newsletter sponsor slot) |
| [Star on GitHub](https://github.com/alpic-ai/skybridge) | skipped: sponsor (same sponsor slot) |
| [https://panda-css.com/blog/panda-css-v2](https://panda-css.com/blog/panda-css-v2) | skipped: corroboration (Panda CSS 2.0.0, npm 2026-09-29; Panda appears in STYLING only inside the zero-runtime reading + a detect row, no option row — reopen: STYLING adds a Panda option) |
| [The styling runtime disappears from your bundle](https://panda-css.com/blog/zero-runtime-all-the-way-down) | skipped: corroboration (Panda v2 sub-post, same cluster as above) |
| [typography preset](https://panda-css.com/blog/typography-preset) | skipped: corroboration (Panda v2 sub-post) |
| [visualize it in Studio](https://panda-css.com/blog/see-your-design-system) | skipped: corroboration (Panda v2 sub-post) |
| [GitHub - Improving site performance by shipping more CSS](https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/) | skipped: off-scope (github.com's own CSS-delivery engineering; not a React selection fact) |
| [How we made claude.ai 3x faster in two weeks](https://claude.dev/blog/how-we-made-claude-ai-faster/) | skipped: off-scope (one product's performance retrospective; no reusable React selection fact) |
| [How to Sync a Design System with Claude Design](https://nitayneeman.com/blog/how-to-sync-a-design-system-with-claude-design/) | skipped: how-to (a vendor-tool walkthrough; also React Digest #2380's headline) |
| [Preact 11.0 - ESM-only, TS 5.1+, Hydration 2.0 with streaming SSR, refs as props, Object.i](https://preactjs.com/blog/preact-11/) | **kept** → RB-E-REACT-CORE (Preact 11.0.0 stable 2026-09-30 per npm: ESM-only (.mjs; CJS/UMD dropped), TS 5.1 minimum, refs forwarded by default, defaultProps + px auto-suffixing moved to preact/compat, render() replaceNode and Component.base removed — verified vs the release post + upgrade guide) |
| [React Resizable Panels 4.14 - Grid layout components](https://react-resizable-panels.vercel.app/examples/grid-basics) | skipped: off-scope (layout-panel component, below this corpus's granularity) |
| [Redux Toolkit 2.13 - TypeScript 7 support, long list of bug fixes, new unified docs site](https://github.com/reduxjs/redux-toolkit/releases/tag/v2.13.0) | skipped: corroboration (same RTK 2.13 the 10-01 firsthand row judged — build modernization + TS 7 support, no API change) |
| [Oxlint 1.86 - only-export-components now supports compound component, 2 React Compiler fix](https://github.com/oxc-project/oxc/releases/tag/oxlint_v1.86.0) | skipped: corroboration (rule options; DX's Oxlint stance unchanged) |
| [James Quick - Vinext 1.0 - A New Alternative to Next.js](https://www.youtube.com/watch?v=eFFH_4aD6Ig) | skipped: corroboration (video on the Vinext 1.0 already held in RB-E-META-FRAMEWORKS) |
| [https://margelo.com/](https://margelo.com/) | skipped: sponsor (newsletter sponsor slot) |
| [Read the technical deep dive on our blog](https://margelo.com/blog/margelo-discord-react-native-performance) | already-held → RB-E-NATIVE (same post as the held blog.margelo.com Discord New-Architecture performance reading) |
| [DeployPulse - Hosted OTA updates for React Native. A drop-in replacement for CodePush and ](https://deploypulse.io/) | skipped: too-early (hosted CodePush replacement, first sighting, no adoption signal; reopen: second independent sighting or a named production user) |
| [React Native docs - fontVariationSettings - Variable font support](https://reactnative.dev/docs/next/text-style-props) | skipped: pre-ship (documented under /docs/next, i.e. an unreleased RN version; reopen: ships in a stable RN release) |
| [React Native Modules Cannot Use Android's Activity Result API](https://www.matinzd.dev/blog/activity-result-api-for-react-native-modules/) | skipped: how-to (native-module Android plumbing write-up; reopen: none) |
| [Shipping super-calendar](https://afonsojramos.me/blog/super-calendar/) | skipped: corroboration (the author's design write-up for @super-calendar — no device measurements or production users, so CALENDARS' 'prototype on low-end devices first' caveat stands; npm @super-calendar/native 2.12.1 peers Reanimated/worklets/gesture-handler as OPTIONAL) |
| [Maestro MCP - A practical guide to mobile UI testing with coding agents](https://maestro.dev/blog/mobile-ui-testing-with-coding-agents) | skipped: how-to (Maestro MCP is held in RB-E-TESTING / RB-E-AI-DEVTOOLS) |
| [React Navigation 7.23 - Add tabBarRepeatedPressBehavior](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation%2Fcore%407.23.0) | skipped: corroboration (one tab-bar option) |
| [Lynx 4.0 - Foldables, Media Queries, Liquid Glass & Blur, WebView, ReactLynx improvements,](https://lynxjs.org/next/blog/lynx-4-0) | skipped: corroboration (ALT-FRAMEWORKS already records the 4.x engine line; the React layer @lynx-js/react is still 0.126.2 on npm, so 'not a pick while 0.x' stands) |
| [Lucent - Write native modules in TypeScript, compiled to C++ and called through JSI](https://github.com/Fausto95/lucent) | skipped: too-early (first sighting, TS→C++ JSI compiler; reopen: npm release + second sighting) |
| [Appduct - Expose app tools to agents and tests, no debug menus in the binary](https://github.com/callstackincubator/appduct) | skipped: too-early (Callstack incubator, used in Voltra's example; reopen: a tagged release or adoption outside Callstack) |
| [Nitro SQLite 10 - Independent database handles, reusable prepared statements, macOS suppor](https://github.com/margelo/react-native-nitro-sqlite/releases/tag/v10.0.0) | skipped: corroboration (react-native-nitro-sqlite 10.1.0 on npm; ONDEVICE-AI names it only inside the local-RAG recipe, no version claim moves) |
| [Legend List 3.6 - Add viewPositionFallback for oversized list items](https://github.com/LegendApp/legend-list/releases/tag/v3.6.0) | skipped: corroboration (minor; LISTS' Legend List row unchanged) |
| [Angular Native - Build native iOS and Android apps with Angular, built and shipped with Ex](https://github.com/ng-native/ng-native) | skipped: off-scope (Angular) |
| [Nitro RTMP - Live streaming as a VisionCamera 5 output](https://github.com/bhyoo99/react-native-nitro-rtmp) | skipped: too-early (first sighting; reopen: npm adoption or a second sighting) |
| [Re.Pack 5.4 - Lazy per-platform Rspack builds, unified commands entry point, RN 0.87 suppo](https://github.com/callstack/repack/releases/tag/%40callstack/repack%405.4.0) | skipped: corroboration (minor; BUILD's Re.Pack mention unchanged) |
| [ViroReact 3.0 - visionOS, Web AR, co-location multiplayer, Studio and MCP tooling](https://www.reactvision.xyz/updates/viroreact-3-0-0-five-platforms-one-codebase/) | already-held → RB-E-GAMES (ReactVision 3 floor RN 0.86 / Expo SDK 57) |
| [Sentry 8.28 - Native breadcrumb off-switches, PII accessibility identifier opt-out, Metric](https://github.com/getsentry/sentry-react-native/releases/tag/8.28.0) | skipped: corroboration (minor; npm latest 8.29.0, OBSERVABILITY's Sentry pick unchanged) |
| [Legend List 3.5 - scrollElement to share an ancestor scrollbar on web, less layout work fo](https://github.com/LegendApp/legend-list/releases/tag/v3.5.0) | skipped: corroboration (minor) |
| [Agent Device 0.21.15 - iOS 27 SDK and Xcode 27 support, visionOS simulators, richer Androi](https://github.com/callstack/agent-device/releases/tag/v0.21.15) | skipped: corroboration (patch on the 0.21 line AI-DEVTOOLS pins) |
| [WebSkills](https://github.com/kevinmoch/web-skill) | skipped: too-early (first sighting; reopen: second sighting) |
| [Optimizing objects with null prototypes](https://adventures.nodeland.dev/archive/optimizing-objects-with-null-prototypes/) | skipped: off-scope (V8 object-shape micro-optimization) |
| [CSS linked parameters - One SVG, nine posters](https://pepelsbey.dev/articles/svg-link-params/) | skipped: off-scope (CSS/SVG technique) |
| [Electron to PWA: There and Back Again](https://kettanaito.com/blog/electron-to-pwa-and-back-again) | **kept** → RB-E-DESKTOP reading (Artem Zakharchenko, 2026-09-24: six months moving an EPUB editor from Electron to a PWA and back — file associations/launch params blocked by open WICG bugs, Safari gaps, no tray/global hotkeys/Cmd+S/Cmd+Q; first source for the PWA-vs-Electron rows) |
| [upm - A fast, tiny package manager for the npm registry](https://upm.sh/) | skipped: too-early (first sighting; reopen: second sighting with adoption) |
| [Mock Service Worker 3.0 - Smaller, ESM-only, granular entrypoints, GraphQL subscriptions, ](https://mswjs.io/blog/introducing-msw-3.0) | already-held → RB-E-TESTING (MSW 3.0 note, verified 10-01 vs the v3.0.0 release) |
| [https://x.com/sebastienlorber/status/2103468812888936488](https://x.com/sebastienlorber/status/2103468812888936488) | skipped: off-scope (newsletter editor's social post) |
| [https://x.com/apex__ai/status/2102467529683972118](https://x.com/apex__ai/status/2102467529683972118) | skipped: unverifiable (x.com post, not readable without login; reopen: the claim appears on a fetchable page) |
| [People always ask how I keep up to date, it's This Week In React.](https://twitter.com/jherr/status/1666578571912171520) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://blog.cloudflare.com/vinext-nextjs-on-vite/](https://blog.cloudflare.com/vinext-nextjs-on-vite/) | already-held: RB-E-META-FRAMEWORKS |
| [PostHog - I wrote a 70x faster SQL parser while barely looking at the code](https://go.posthog.com/twir-sept30) | sponsor (tracking link, not evaluated) [rule:sponsor-tracking-domain] |
| [Next.js September Security - 16.3.8 and 15.5.27](https://nextjs.org/blog/september-2026-security-release) | already-held: RB-E-META-FRAMEWORKS |
| [React Summit US](https://reactsummit.us/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Rebuilding React Router's Global Hooks in Next.js](https://aurorascharff.no/posts/rebuilding-react-routers-global-hooks-in-nextjs/) | previously skipped (unverifiable) → RB-E-REACT-CORE, RB-E-DATA — carry over unless a reopen signal applies |
| [Props Are Not a Design System](https://vitonsky.net/blog/2026/09/18/design-system/) | already-held: RB-E-COMPONENT-LIBS |
| [AI, Open Source, and the Long Road to TanStack Charts](https://tannerlinsley.com/posts/ai-open-source-and-the-long-road-to-tanstack-charts) | previously skipped (too-early) — carry over unless a reopen signal applies |
| [My favorite resource for keeping up with the React community!](https://twitter.com/Baconbrix/status/1622655092657688576) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [5 react-native-enriched-html Use Cases You Might Not Know About](https://swmansion.com/blog/5-react-native-enriched-html-use-cases-you-might-not-know-about/) | previously skipped (corroboration) → RB-E-ANIMATION, RB-E-NATIVE — carry over unless a reopen signal applies |
| [Agentic CI for Expo apps with TesterArmy](https://expo.dev/blog/agentic-ci-for-expo-apps-with-testerarmy) | already-held: RB-E-AI-DEVTOOLS |
| [React Native macO 0.83](https://github.com/microsoft/react-native-macos/releases/tag/react-native-macos%400.83.0) | already-held: RB-E-DESKTOP |
| [Plain Text 0.9 - Faster, drop-in remplacement for Text component, proper hyphenation, writ](https://github.com/mdjastrzebski/react-native-plain-text/releases/tag/v0.9.0) | previously skipped (other) → RB-E-LISTS — carry over unless a reopen signal applies |
| [Skia 2.13 - Legacy architecture support removed, android.surfaceType to select the backing](https://github.com/Shopify/react-native-skia/releases/tag/v2.13.0) | already-held: RB-E-ANIMATION |
| [Argent 0.26 - iPhone Duo simulator support, clearer simulator-server exit errors, Xcode De](https://github.com/software-mansion/argent/releases/tag/v0.26.0) | previously skipped (corroboration) → RB-E-AI-DEVTOOLS — carry over unless a reopen signal applies |
| [Vite+ 1.0 - A single vp command to manage your Node.js runtime, package manager, and front](https://voidzero.dev/posts/announcing-vite-plus-1-0) | already-held: RB-E-BUILD |
| [new package to integrate with React Native](https://mswjs.io/guides/integrations/react-native) | already-held: RB-E-TESTING |
| [pnpm 12.7 - node shim follows .nvmrc , install --allow-build flag, wait for published pack](https://pnpm.io/blog/releases/12.7) | previously skipped (corroboration) → RB-E-BUILD, RB-E-DX — carry over unless a reopen signal applies |
| [If every newsletter was as informative, the world would be a better place!](https://x.com/grabbou/status/1829126194022715617) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Website](https://sebastienlorber.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
