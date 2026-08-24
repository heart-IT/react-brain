# Harvest manifest — This Week in React #294 (prepped 2026-08-24)
issue: https://thisweekinreact.com/newsletter/294

Pre-triaged by `harvest prep`: 87 external links · 37 pre-dispositioned (corpus + prior-manifest cross-ref + 1 by triage rules) · **50 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://blog.sentry.io/57-bugs-to-1/](https://blog.sentry.io/57-bugs-to-1/) | skipped: how-to — Sentry debugging-workflow story, no selection fact |
| [Oxlint 1.79 just added support](https://oxc.rs/blog/2026-08-18-react-compiler-support) | kept: RB-E-DX — Oxlint 1.79 ports the React Compiler rule surface (22 compiler-powered rules, recommended presets → correctness category; replaces the nursery react/react-compiler rule) + oxc-transform-react does compiler auto-memoization ~10× faster than Babel via @vitejs/plugin-react 6.1.0; option row + when-clause + prose updated, blog URL in sources (page verified) |
| [PR](https://github.com/vitejs/vite-plugin-react/pull/1419) | skipped: pre-ship — vite-plugin-react PR, detail of the Oxc compiler story kept above |
| [remaining work](https://github.com/biomejs/biome/issues/10974) | skipped: pre-ship — Biome tracking issue for the same rule surface (entry already documents Biome 2.5.8 nursery start); reopen: rules ship stable |
| [Bun 1.4 will include React Compiler support](https://github.com/oven-sh/bun/issues/24356) | skipped: pre-ship — Bun 1.4 React Compiler support is an open issue; reopen: Bun 1.4 release notes |
| [React PR - Enable parallel transitions flag everywhere](https://github.com/react/react/pull/37290) | skipped: pre-ship — core React PR (parallel transitions flag); reopen: lands in a React release |
| [TanStack Router reimplemented](https://github.com/TanStack/router/discussions/8087) | skipped: pre-ship — GitHub discussion of a router reimplementation; reopen: shipped release + writeup |
| [Ask us anything on X](https://x.com/timneutkens/status/2090068164860117058) | skipped: off-scope — social AMA announcement |
| [Cursor completed its migration from Solid (v1) to React and StyleX](https://x.com/poteto/status/2089227731305464150) | skipped: unverifiable-as-durable — single X post claiming Cursor's Solid→React+StyleX migration; reopen: engineering writeup (would then feed RB-E-STYLING's StyleX prose) |
| [React Summit US](https://reactsummit.us/) | skipped: off-scope — conference listing |
| [Impersonating the DOM](https://julesblom.com/writing/hoistable-svg-defs-ii) | skipped: how-to — clever hoistable-SVG-defs technique, too niche for a selection fact |
| [How Lovable.dev moved from Next.js to TanStack Start](https://lovable.dev/blog/how-we-migrated-lovable-dev-away-from-nextjs) | kept: RB-E-META-FRAMEWORKS reading — Lovable's Next→Start migration (42M uniques, 400 routes, 910K LOC): lighter Vite dev loops, fewer abstractions, fewer agent mistakes vs hand-tuned bundling; the deep-dive behind the entry's held Lovable fact (page verified) |
| [Using next/root-params in Next.js 16.3](https://next-intl.dev/blog/nextjs-root-params) | skipped: how-to — next-intl guide to the 16.3 root-params API |
| [OXC for TSRX - Parse, lint, format .tsrx files with Oxc](https://compiled.run/oxc-tsrx) | skipped: too-early — TSRX file format tooling, no adoption signal; reopen: corpus tracks TSRX |
| [Unhead 3.3 - Framework-agnostic &lt;head> component - Support &lt;Fragment> , various Reac](https://github.com/unjs/unhead/releases/tag/v3.3.0) | skipped: minor release of an adjacent head-management lib |
| [Fig - A small TypeScript UI runtime based on React Fiber.](https://www.bengubler.com/posts/2026-08-14-introducing-fig-ui-runtime) | skipped: too-early — experimental Fiber-based UI runtime |
| [Rshono - Minimalist web framework based on Hono, Rspack and React Server Components](https://github.com/rshono/rshono) | skipped: too-early — hobby RSC framework |
| [Sugar High 2.0 - Lightweight, composable syntax highlighter with React bindings](https://github.com/huozhi/sugar-high/releases/tag/v2.0.0) | skipped: minor/niche — syntax highlighter major, no corpus facet; reopen: highlighting facet added |
| [Preact 11.0 RC - use() , createPortal() , useEffectEvent() , and more](https://github.com/preactjs/preact/releases/tag/11.0.0-rc.0) | skipped: pre-ship — Preact 11 RC (Preact facts held in RB-E-ALT-FRAMEWORKS; NOTE preact is NOT a firsthand-watched package, so the graduation guard will not fire); reopen: 11.0 stable via newsletters |
| [Humid 1.0 - React server-side rendering in Rails using V8 / mini_racer](https://thoughtbot.com/blog/humid-1-0-react-server-side-rendering-in-rails-can-be-easy) | skipped: off-scope — Rails-specific SSR integration |
| [Lucas Barake - The state library that made me drop Zustand](https://www.youtube.com/watch?v=397MsJf8HGg) | skipped: video opinion piece (state-library switch); no verifiable selection fact beyond the Effect RC row below |
| [now in RC](https://www.effect.website/blog/releases/effect/40-rc) | skipped: pre-ship — Effect 4.0 RC, and the corpus doesn't track Effect; reopen: corpus gains an Effect facet + stable release |
| [This Month in React - July 2026 - React-alikes, governance, and state management](https://share.transistor.fm/s/55d1846a) | skipped: corroboration — podcast roundup of already-triaged July news |
| [agent.sh/workshop.](https://www.agent.sh/workshop) | skipped: sponsor — workshop promo |
| [goes into detail](https://x.com/huntie/status/2087221384422592629) | skipped: off-scope — X thread; RN 0.87 facts already held in RB-E-RN-VERSIONS |
| [RN docs - Strict TypeScript API guide updated for 0.87: ref types, setup-env, FAQs](https://github.com/react/react-native-website/pull/5111) | skipped: corroboration — docs PR for the already-held 0.87 Strict TS API line |
| [Rozenite 2.1 - Unified plugin UI, feature flags plugin, agent skills CLI](https://github.com/callstackincubator/rozenite/releases/tag/v2.1.0) | skipped: minor release (Rozenite 2.1) — plugin-platform line already held |
| [Sentry 8.23 - Swift pod migration](https://github.com/getsentry/sentry-react-native/releases/tag/8.23.0) | skipped: minor release (Swift pod migration detail) |
| [Maestro 2.8 - Swipe from a point inside an element, variables in permissions, screenshot t](https://maestro.dev/blog/maestro-cli-2-8-0) | skipped: minor release (Maestro 2.8) |
| [Enriched Markdown 1.0 - First stable release: block-editing input pipeline, iOS SwiftUI re](https://github.com/software-mansion/enriched-markdown/releases/tag/v1.0.0) | already-held: RB-E-EDITORS documents enriched-markdown 1.0.0 (2026-08-13) incl. the block-editing pipeline |
| [Pager View 9.0 - Replaces legacy pager implementation with Jetpack Compose on Android](https://github.com/callstack/react-native-pager-view/releases/tag/v9.0.0) | skipped: major of a lib without a corpus facet (pager/tab-view) — Compose-backed Android rewrite noted; reopen: pager/tab-view facet added or RN-versions compat fallout |
| [Nitro Fetch 1.6 - tvOS support, shared iOS URLCache, prefetch cache fixes](https://github.com/margelo/react-native-nitro-fetch/releases/tag/v1.6.0) | skipped: minor release (Nitro Fetch 1.6 — tvOS/cache details; nitro-fetch already held in RB-E-NETWORKING) |
| [Expo Pretext 1.2 - Fixes Android module that never compiled, web font measurement fix](https://github.com/JubaKitiashvili/expo-pretext/releases/tag/v1.2.0) | skipped: patch-grade release of a niche lib |
| [Argent 0.20 - Concurrent flow recordings, Chromium per launch step, MCP registry, .env sec](https://github.com/software-mansion/argent/releases/tag/v0.20.0) | skipped: superseded — firsthand watch already at Argent 0.21→0.22; 0.20 features carry no unheld selection fact |
| [Expo Tuft - Higher-order agent reachable from Slack/iMessage, runs on an always-on machine](https://expo.dev/services/tuft) | skipped: too-early — Expo Tuft is a waitlist-gated technical preview (page verified); reopen: GA/pricing or corroborated production use |
| [MargeloChat - Open-source ChatGPT-style RN AI chat app with RAG and streaming](https://github.com/margelo/ai-chat-demo) | already-held: RB-E-AI-UI MargeloChat reading covers this repo |
| [iOS Simulator MCP 2.1 - App lifecycle tools: terminate_app, open_url, list_apps](https://github.com/joshuayoes/ios-simulator-mcp/releases/tag/v2.1.0) | skipped: minor release (iOS Simulator MCP 2.1) |
| [Callstack - Can a Specialized Model Beat Frontier Models at React Native?](https://www.youtube.com/watch?v=eiGcqvji4nk) | skipped: video — unverified vendor benchmark claims; reopen: published writeup with methodology (AppControlBench facts already held) |
| [RNR 369 - AppRegistry Explained](https://infinite.red/react-native-radio/rnr-369-rnr-explains-appregistry) | skipped: podcast — explainer episode, no new selection fact |
| [RNR 370 - CopilotKit with Mike Ryan](https://infinite.red/react-native-radio/rnr-370-copilotkit-with-mike-ryan) | skipped: podcast — vendor interview (CopilotKit already adjacent in RB-E-AI-UI prose) |
| [CSS: the bomb inside your inbox](https://portswigger.net/research/css-the-bomb-inside-your-inbox) | skipped: off-scope — email-client CSS exploitation research, no React surface |
| [How Variable Mangling Works in Oxc Minifier](https://green.sapphi.red/blog/how-variable-mangling-works-in-oxc-minifier) | skipped: how-to — minifier internals deep-dive, no selection fact |
| [Node.js 26.7 - Perfetto tracing support](https://nodejs.org/en/blog/release/v26.7.0) | skipped: platform minor (Node 26.7) |
| [pnpm 12.0 RC](https://pnpm.io/blog/whats-different-in-pnpm-12) | skipped: pre-ship — pnpm 12 RC (pnpm 11.x release-management facts already held in RB-E-DX); reopen: 12.0 stable |
| [Vitest 5.0 RC - Clear mocks by default, fake timers now mock Temporal, and more](https://main.vitest.dev/guide/migration.html) | skipped: pre-ship — Vitest 5.0 RC; reopen: stable (breaking defaults — clearMocks — worth a look then) |
| [Solid 2.0 RC - First-class async support, new Rust-based compiler toolchain, simpler API s](https://www.solidjs.com/blog/solid-2-0-rc-the-big-reveal) | skipped: pre-ship — Solid 2.0 RC (alt-framework facet exists but pre-ship discipline holds); reopen: stable release |
| [SvelteKit 3.0 RC - Vite 8 + Rolldown, error boundaries, validated env vars, remote functio](https://svelte.dev/blog/sveltekit-3-release-candidate) | skipped: off-scope — Svelte ecosystem |
| [https://x.com/jxnlco/status/1931003015051518077](https://x.com/jxnlco/status/1931003015051518077) | skipped: off-scope — social post |
| [https://x.com/samlambert/status/2089352497794277639](https://x.com/samlambert/status/2089352497794277639) | skipped: off-scope — social post |
| [I'm constantly finding interesting things to learn in there.](https://twitter.com/TkDodo/status/1661337628875137027) | skipped: off-scope — social endorsement of the newsletter itself |
| [If every newsletter was as informative, the world would be a better place!](https://x.com/grabbou/status/1829126194022715617) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Biome 2.5.8](https://github.com/biomejs/biome/releases/tag/%40biomejs%2Fbiome%402.5.8) | previously kept → RB-E-DX — carry over unless a reopen signal applies |
| [build mode - Why we're bullish on loops](https://go.posthog.com/twir-aug19) | sponsor (tracking link, not evaluated) [rule:sponsor-tracking-domain] |
| [Ask us anything on Reddit](https://www.reddit.com/r/nextjs/comments/1vnlcsk/were_the_nextjs_team_ask_us_anything/) | previously skipped (other) — carry over unless a reopen signal applies |
| [React Router - Changes planned for v9](https://github.com/remix-run/react-router/discussions/15371) | previously skipped (pre-ship) — carry over unless a reopen signal applies |
| [Making Navigations Instant in v0](https://nextjs.org/blog/making-v0-navigations-instant) | previously skipped (corroboration) → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS — carry over unless a reopen signal applies |
| [Reliable Query Prefetching with TanStack Router](https://tkdodo.eu/blog/reliable-query-prefetching-with-tanstack-router) | already-held: RB-E-DATA |
| [Inside a TanStack Router Navigation](https://tanstack.com/blog/tanstack-router-navigation-lanes) | previously skipped (cap) → RB-E-TYPESCRIPT, RB-E-NAV — carry over unless a reopen signal applies |
| [Building App-like Experiences with Next.js 16.3](https://nextjs.org/blog/building-app-like-experiences-with-nextjs-16-3) | previously skipped (how-to) → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS — carry over unless a reopen signal applies |
| [Coordinating Optimistic Updates in Next.js](https://aurorascharff.no/posts/coordinating-optimistic-updates-in-nextjs/) | already-held: RB-E-DATA |
| [TrustedRouter - Add every AI model to your React app through one OpenAI-compatible API wit](https://trustedrouter.com/openai-compatible-llm-api) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [GTKX 1.0 - The React framework for Linux, declarative layer on top of GTK4](https://gtkx.dev/blog/gtkx-1-0) | already-held: RB-E-DESKTOP |
| [Astryx 0.3 & 0.4 - Meta’s fully customizable design system based on StyleX](https://github.com/facebook/astryx/releases) | previously skipped (minor-release) — carry over unless a reopen signal applies |
| [React-Hook-Form 7.85 - Support React &lt;Activity>](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.85.0) | previously skipped (minor-release) — carry over unless a reopen signal applies |
| [shadcn React 0.3 - New &lt;Questionnaire> component for multi-step question flows](https://ui.shadcn.com/docs/changelog/2026-08-questionnaire) | previously skipped (other) → RB-E-COMPONENT-LIBS — carry over unless a reopen signal applies |
| [TanStack Form 2.0 alpha - Redesigned APIs, new validation pipeline, performance and type-s](https://tanstack.com/blog/announcing-tanstack-form-v2-alpha) | previously skipped (pre-ship) → RB-E-TYPESCRIPT, RB-E-NAV — carry over unless a reopen signal applies |
| [If you are not signed-up, you are missing out](https://twitter.com/wcandillon/status/1263825118557593600) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://www.agent.sh/](https://www.agent.sh/) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [React Native 0.87](https://reactnative.dev/blog/2026/08/11/react-native-0.87) | already-held: RB-E-RN-VERSIONS, RB-E-BUILD |
| [Crisp - Add in-app customer support to your React Native or Expo app in just a few lines o](https://crisp.chat/) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [React Native Connection](https://reactnativeconnection.io/) | previously skipped (other) — carry over unless a reopen signal applies |
| [Fitting RAG in Your Pocket: Local Retrieval in React Native](https://margelo.com/blog/fitting-RAG-in-your-pocket) | already-held: RB-E-ONDEVICE-AI |
| [The Memory Hermes Can't See: Stale Shadow Nodes in React Native](https://swmansion.com/blog/the-memory-hermes-cant-see-stale-shadow-nodes-in-react-native/) | already-held: RB-E-NATIVE |
| [How we raised mobile end-to-end test stability to 98%](https://shopify.engineering/mobile-e2e-testing) | already-held: RB-E-TESTING |
| [How to build a resilient activity tracker with Expo](https://expo.dev/blog/how-to-build-a-resilient-activity-tracker-with-expo) | previously skipped (how-to) → RB-E-RN-VERSIONS, RB-E-NAV — carry over unless a reopen signal applies |
| [Scanning Barcodes in React Native Apps: The Complete Guide (2026)](https://margelo.com/blog/react-native-barcode-scanner) | already-held: RB-E-MEDIA |
| [Fable 5 vs GPT-5.6 Sol: I spent $2,000 and 2 billion tokens to find out who wins](https://expo.dev/blog/fable-5-vs-gpt-5-6-sol-expo-apps) | already-held: RB-E-AI-DEVTOOLS |
| [Haptic Feedback on the Web: Why the Web Deliberately Refuses to Be as Tactile as Native Ap](https://swmansion.com/blog/haptic-feedback-on-the-web-why-the-web-deliberately-refuses-to-be-as-tactile-as-native-apps/) | previously skipped (off-scope) → RB-E-ANIMATION, RB-E-NATIVE — carry over unless a reopen signal applies |
| [ConfigCat - Release React Native Features with Feature Flags, Without Redeploying](https://configcat.com/blog/ab-testing-react-native-apps-with-feature-flags/) | previously skipped (how-to) — carry over unless a reopen signal applies |
| [Firebase 26 - New architecture foundation: TurboModules, TypeScript parity, modular API](https://invertase.io/blog/react-native-firebase-v26-release) | already-held: RB-E-AUTH |
| [Skia 2.11 - Updates Skia engine, drive multiple animated props from one shared value](https://github.com/Shopify/react-native-skia/releases/tag/v2.11.0) | previously skipped (minor-release) — carry over unless a reopen signal applies |
| [Screens 4.27 - RN 0.87 support, experimental ScrollToTopGuard](https://github.com/software-mansion/react-native-screens/releases/tag/4.27.0) | previously skipped (minor-release) — carry over unless a reopen signal applies |
| [Gesture Handler 3.2 - Pressable on Touchable , hover callbacks, Strict TS API, AGP 9](https://github.com/software-mansion/react-native-gesture-handler/releases/tag/v3.2.0) | previously skipped (other) — carry over unless a reopen signal applies |
| [Worklets 0.12 - WeakRef on worklet runtimes, Bundle Mode loading on par with RN, enableLoc](https://github.com/software-mansion/react-native-reanimated/releases/tag/worklets-0.12.0) | already-held: RB-E-ANIMATION |
| [Safe Area Context 5.9 - AGP 9 support, web resize/inset fixes](https://github.com/appandflow/react-native-safe-area-context/releases/tag/v5.9.0) | previously skipped (minor-release) — carry over unless a reopen signal applies |
| [Astro 7.2 - Incremental static builds, opt out of session support](https://astro.build/blog/astro-720/) | previously skipped (minor-release) — carry over unless a reopen signal applies |
| [Website](https://sebastienlorber.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
