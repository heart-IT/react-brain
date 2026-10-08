# Harvest manifest — This Week in React #300 (prepped 2026-10-08)
issue: https://thisweekinreact.com/newsletter/300

Pre-triaged by `harvest prep`: 57 external links · 15 pre-dispositioned (corpus + prior-manifest cross-ref + 2 by triage rules) · **42 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [React Adapter](https://tanstack.com/charts/latest/docs/framework/react/adapter) | already-held → RB-E-CHARTS (TanStack Charts 1.0 keep, firsthand-2026-10-08) |
| [TanStack Markdown + Highlight 1.0](https://x.com/tan_stack/status/2105549976025915676) | skipped: corroboration (the x.com post is unreadable, but npm confirms @tanstack/markdown 1.0.0, 2026-10-01; recurring 6× on the watchlist since July — no entry owns general markdown rendering and AI-UI's Streamdown covers streaming LLM output; reopen: a streaming-LLM claim or an entry that owns markdown rendering) |
| [Barbara Markiewicz joined the React Foundation as our Director of Community](https://x.com/sethwebster/status/2105422444529963495) | skipped: off-scope (staffing news) |
| [React Foundation Contributors Summit - 10–12 Nov 2026, London](https://www.react.foundation/summit) | skipped: off-scope (event) |
| [React Conf Ghana - 4–5 Nov 2026, Accra](https://reactghana.react.foundation/) | skipped: off-scope (event) |
| [Testing Frontend - Lessons from over a million lines of TypeScript at Palantir - Skip comp](https://www.meticulous.ai/blog/lessons-from-a-decade) | skipped: sponsor (essay on Meticulous's own blog — the vendor TESTING already lists; reopen: none) |
| [Next.js PR - unstable_paramMatching API - Configure matching separately from build-time pr](https://github.com/vercel/next.js/pull/97393) | skipped: pre-ship (open PR, unstable_ API; reopen: ships in a Next.js release) |
| [Making React Context Cheap with React Compiler](https://jjenzz.com/making-react-context-cheap/) | **kept** → RB-E-STATE reading (jjenzz, 2026-10-04: with React Compiler a context consumer re-renders but reuses unchanged JSX — 5,000 radios, p95 click 18.4 ms vs 19.2 ms for a useSyncExternalStore store; narrow, author-flagged benchmark. First STATE source on how the Compiler changes store choice) |
| [React's New browser API: Rendering Components Only in the Browser](https://certificates.dev/blog/reacts-new-browser-api-rendering-components-only-in-the-browser) | skipped: corroboration (React 19.3 browser() is held in RB-E-REACT-CORE) |
| [Ink 8.0 - React CLI renderer - React 19.3+, scrollable Box views, any Node stream for stdi](https://github.com/vadimdemedes/ink/releases/tag/v8.0.0) | skipped: off-scope (terminal renderer) |
| [Streamdown 2.7 - AI Markdown streaming renderer - Faster, incremental code highlighting, b](https://github.com/vercel/streamdown/releases/tag/streamdown%402.7.0) | skipped: corroboration (minor; AI-UI's web Streamdown pick unchanged) |
| [stableref 0.2 - Type-level referential stability for React/Preact - Export branded useSync](https://github.com/JoviDeCroock/stableref/releases/tag/v0.2.0) | skipped: too-early (0.x, first sighting; reopen: adoption signal) |
| [Medula - Headless devtools for agents, based on Devframes, React and Next.js support](https://github.com/posva/medula) | skipped: too-early (first sighting; reopen: npm release + second sighting) |
| [Shaders - WebGPU effects as components for React, Vue, Svelte, Solid and JavaScript](https://shaders.com/updates/shaders-is-open-source) | skipped: off-scope (visual-effects component library, below this corpus's granularity) |
| [Klipp - Camera toolkit for the web, comes with React Three Fiber bindings](https://github.com/pmndrs/klipp) | skipped: too-early (first sighting; reopen: npm release + R3F adoption) |
| [React Native Skia 3.0 - Hello Graphite](https://www.youtube.com/watch?v=L-PNQi1nBSA) | already-held → RB-E-ANIMATION (the Skia 3 / react-native-skia handover keep, firsthand-2026-10-08; video not watched beyond its title) |
| [sponsoring the project until the end of the year](https://x.com/mustafa01ali/status/2107530860555608339) | skipped: unverifiable (x.com post, not readable without login; Shopify's Skia sponsorship through 2026 is already held in RB-E-ANIMATION from Shopify's announcement) |
| [Coinbase is going native too](https://x.com/mustafa01ali/status/2105705415111835745) | skipped: unverifiable (x.com post, not readable without login; a web search found only undated Coinbase job postings about a native rewrite, no announcement — reopen: a Coinbase engineering post or press coverage; if confirmed it is a CROSSPLATFORM datapoint next to Shopify) |
| [Why has Shopify dropped React Native?](https://newsletter.pragmaticengineer.com/p/shopify-native-mobile) | skipped: corroboration (Pragmatic Engineer analysis of the Shopify exit already held in RB-E-CROSSPLATFORM from Shopify's primary posts) |
| [Native views in TypeScript: SwiftUI and Jetpack Compose from Lucent](https://www.lucent-lang.dev/blog/native-views/) | skipped: too-early (Lucent, second sighting this pass but same author; reopen: npm release + independent sighting) |
| [Stim Desktop 0.1 - Watch and steer your agents' React Native work: live devices, replay, l](https://stim.appandflow.com/docs/desktop) | skipped: too-early (0.1; Stim itself was skipped too-early on 09-24; reopen: 1.0 or named adoption) |
| [Nitro Markdown 0.14 - RaTeX math rendering now optional dependency, RN 0.77 floor, streami](https://github.com/JoaoPauloCMarra/react-native-nitro-markdown/releases/tag/v0.14.0) | skipped: too-early (0.x; EDITORS' RN Markdown pick is enriched-markdown; reopen: second sighting with adoption) |
| [Maestro CLI 2.11 - Android 17 support, video scrubbing fixes, YAML validation changes](https://maestro.dev/blog/maestro-cli-2-11-0) | skipped: corroboration (minor; TESTING's Maestro row unchanged) |
| [Unistyles 3.5.0 - Theme propagation fixes, reload memory leaks, frozen screens no longer b](https://github.com/jpudysz/react-native-unistyles/releases/tag/v3.5.0) | already-held → RB-E-STYLING (the 3.4 RN 0.81 floor keep, firsthand-2026-10-08; 3.5.0 itself is a stability release) |
| [React Native Deploy - EAS-compatible builds on GitHub Actions runners, free for public rep](https://reactnativefeel.com/deploy) | skipped: too-early (first sighting; reopen: second sighting or named users) |
| [React Native Enriched Markdown 1.1 - Notion-like input shortcuts, native video rendering, ](https://swmansion.com/changelog/react-native-enriched-markdown-1-1-0/) | skipped: corroboration (1.1 input shortcuts + native video; EDITORS' pick unchanged) |
| [Sentry React Native 8.29 - Swift Package Manager integration](https://github.com/getsentry/sentry-react-native/releases/tag/8.29.0) | skipped: corroboration (minor; OBSERVABILITY's Sentry pick unchanged) |
| [Baton - Relay GraphQL client for SwiftUI and Compose](https://github.com/shergin/baton) | skipped: off-scope (native GraphQL client, not React) |
| [Screen Choreography 0.7 - Hybrid transition handoff, transition preparation overlay, .0](https://github.com/DorianMazur/react-native-screen-choreography/releases/tag/v0.7.0) | skipped: corroboration (0.x minor; ANIMATION's pin-it caveat and 1.0 tripwire stand) |
| [RNR 374 - Building "Dreaming: Language Learning" with React Native](https://infinite.red/react-native-radio/rnr-374-building-dreaming-language-learning-with-react-native) | skipped: off-scope (podcast app story, not watched) |
| [TypeScript 7.1 - Iteration Plan - Support for LSP, Content Mapper, Emit APIs, and more](https://github.com/microsoft/TypeScript/issues/63703) | skipped: pre-ship (iteration plan; reopen: TS 7.1 release) |
| [TS7 in TypeScript-ESLint](https://github.com/typescript-eslint/typescript-eslint/issues/10940) | skipped: pre-ship (open tracking issue; reopen: a typescript-eslint release that supports TS 7) |
| [TC39 - 116th meeting outcome](https://bsky.app/profile/robpalmer.bsky.social/post/3mwshmpvhak24) | skipped: off-scope (language-committee notes) |
| [The Remix Way](https://sergiodxa.com/articles/the-remix-way) | skipped: off-scope (framework-philosophy essay) |
| [Enforcing Best Practices with Jev as a Linter](https://charpeni.com/blog/enforcing-best-practices-with-jev-as-a-linter) | skipped: too-early (first sighting; reopen: second sighting) |
| [e2e - Next-generation agentic end-to-end testing framework for web and mobile apps](https://github.com/tester-army/e2e) | **kept** → RB-E-AI-DEVTOOLS (CORRECTION: TesterArmy is not closed-source end to end — it publishes the Apache-2.0 `e2e` framework, npm e2e 0.18.0 2026-10-06, ~7.9k★, natural-language agent steps replayed with no model calls, mobile engine @e2e-dev/mobile drives simulators via agent-device; the hosted PR agent stays commercial) |
| [Effect 4.0 - Fully rebuilt, dependency-free core, long-term support](https://effect.website/blog/releases/effect/40) | skipped: off-scope (Effect is not tracked by any entry) |
| [Effect Atom React](https://effect.website/docs/v4/api/atom-react) | skipped: off-scope (same cluster as Effect 4.0) |
| [pnpm 12.9 & 12.10 - experimental 'loaded' linker, resolution settings in lockfile, StackBl](https://pnpm.io/blog) | skipped: corroboration (pnpm minors; also in firsthand-2026-10-08) |
| [h3 2.0 - Minimal HTTP server framework for high performance, portability and composability](https://h3.dev/blog/v2) | skipped: off-scope (server framework) |
| [SvelteKit 3.0 - Svelte meta-framework for rapidly developing robust, performant web applic](https://svelte.dev/blog/sveltekit-3-is-here) | skipped: off-scope (Svelte) |
| [Remix Jam 2026](https://www.youtube.com/watch?v=TaKBQnYm9tM) | skipped: off-scope (conference video, not watched) |
| [I'm constantly finding interesting things to learn in there.](https://twitter.com/TkDodo/status/1661337628875137027) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://coderabbit.link/ad-twir-003](https://coderabbit.link/ad-twir-003) | sponsor (tracking link, not evaluated) [rule:sponsor-tracking-domain] |
| [Next.js 16.4](https://nextjs.org/blog/next-16-4) | already-held → RB-E-META-FRAMEWORKS (kept this pass from the same post, firsthand-2026-10-08; prep mis-carried it as skipped because the firsthand row reads plain "kept") |
| [TanStack Charts 1.0](https://tanstack.com/blog/tanstack-charts-1-0) | already-held → RB-E-CHARTS (kept this pass, firsthand-2026-10-08; prep carry-over corrected) |
| [TanStack Start security update: CVE-2026-102989](https://tanstack.com/blog/tanstack-start-security-update-cve-2026-102989) | already-held: RB-E-META-FRAMEWORKS, RB-E-SECURITY |
| [https://sentry.io/resources/agent-tracing-series/](https://sentry.io/resources/agent-tracing-series/) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [PostHog - Why we rebuilt our data warehouse on DuckDB over ClickHouse](https://go.posthog.com/twir-oct7) | sponsor (tracking link, not evaluated) [rule:sponsor-tracking-domain] |
| [Live Activities with Expo, End-to-End: Client and Backend](https://expo.dev/blog/live-activities-with-expo-end-to-end-client-and-backend) | previously skipped (how-to) → RB-E-RN-VERSIONS, RB-E-NAV — carry over unless a reopen signal applies |
| [Introducing Mobile Dev: full mobile dev tooling right in your Codex app](https://www.callstack.com/blog/introducing-mobile-dev-full-mobile-dev-tooling-right-in-your-codex-app) | previously skipped (pre-ship) → RB-E-REACT-CORE, RB-E-NAV — carry over unless a reopen signal applies |
| [Codemagic Patch - Self-hosted OTA updates, complete with fingerprinting, release metrics a](https://patch.codemagic.io/) | previously already-held → RB-E-OTA — carry over unless a reopen signal applies |
| [Voltra 2.4 - Android improvements, native modifiers for SwiftUI and Jetpack Glance](https://github.com/callstackincubator/voltra/releases/tag/v2.4.0) | previously skipped (corroboration) → RB-E-NATIVE-UI — carry over unless a reopen signal applies |
| [Nitro Fetch 1.8 - Support request priority, support formData() for urlencoded Request/Resp](https://github.com/margelo/react-native-nitro-fetch/releases/tag/v1.8.0) | already-held: RB-E-NETWORKING |
| [Apex - Agentic coding model specialized in React - Now generally available](https://www.callstack.com/blog/apex-agetic-coding-for-mobile-and-web-spcialied-in-react) | already-held → RB-E-AI-DEVTOOLS (kept this pass from this post, firsthand-2026-10-08; prep carry-over corrected) |
| [One of the few things I regularly read to keep up with the React world.](https://www.youtube.com/clip/UgkxDdNASo6xNS710ODcjMx0WW4HtTxIYbrA) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Website](https://sebastienlorber.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
