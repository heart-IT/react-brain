# Harvest manifest — This Week in React #304 (prepped 2026-11-25)
issue: https://thisweekinreact.com/newsletter/304

Pre-triaged by `harvest prep`: 67 external links · 9 pre-dispositioned (corpus + prior-manifest cross-ref + 1 by triage rules) · **58 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [theme adapters for MUI, Bootstrap, and shadcn/ui](https://surveyjs.io/themes/theme-adapters) | skipped: sponsor (SurveyJS placement; same advertiser as the carried surveyjs.io row) |
| [Next.js November security releases 16.4.5 & 15.5.29 - Fixing 7 medium vulnerabilities](https://nextjs.org/blog/november-2026-security-release) | already-held → firsthand-2026-11-25 (nextjs.org feed event 'November 2026 Security Release' + next 16.4.1 → 16.4.6; verified 2026-11-25: 1 high + 6 medium, fixed in 16.4.5 / 15.5.29, GHSA-mfr8-8qww-v76h high = CVE-2026-119790 via the repo-scoped endpoint) — proposal filed in case the firsthand triage does not carry it into RB-E-META-FRAMEWORKS/SECURITY |
| [Remotion - New Studio editing experience](https://x.com/Remotion/status/2117615187339673650) | skipped: off-scope (Remotion editor UI; no entry owns programmatic video; x.com login-walled) |
| [React Compiler PR - Preserve source locations for accurate source maps](https://github.com/react/react/pull/36921) | skipped: pre-ship (React Compiler PR; reopen: lands in a babel-plugin-react-compiler release note) |
| [React Concurrent Store PR - Ricky Hanlon runs React's own state tests against the unoffici](https://github.com/thejustinwalsh/react-concurrent-store/pull/27) | skipped: pre-ship (test-suite PR on an unofficial store; reopen: React ships a concurrent-store API) |
| [Next.js PR - router.experimental_prepare() to start a navigation on pointerdown and commit](https://github.com/vercel/next.js/pull/101050) | skipped: pre-ship (canary PR, experimental_ prefix; reopen: documented in a stable Next.js release) |
| [Next.js PR - create-next-app always uses the App Router, no router choice prompt](https://github.com/vercel/next.js/pull/100850) | skipped: pre-ship (create-next-app drops the router prompt — canary PR; reopen: stable Next release notes; then META-FRAMEWORKS' Pages Router wording) |
| [Next.js PR - Experimental Go Route Handlers with route.go files](https://github.com/vercel/next.js/pull/100130) | skipped: pre-ship (experimental Go route handlers; reopen: leaves experimental) |
| [React.lazy, Suspense and the Hidden 300 ms Delay](https://tabwidgets.com/blog/react-lazy-suspense-delay) | **kept** → RB-E-REACT-CORE reading (React.lazy always suspends once + the 300 ms FALLBACK_THROTTLE_MS reveal throttle; verified 2026-11-25; also carried by React Status — corroborating sighting) |
| [Async React & Progressive Server Actions](https://ebey.dev/blog/3myyseusgd22h) | skipped: how-to (progressive Server Actions walkthrough; no selection fact) |
| [Understanding React internals](https://www.alexandretrotel.org/articles/understanding-react-internals) | skipped: how-to (React internals primer; REACT-CORE needs no tutorial) |
| [Writable Derived State: Stop Synchronizing State](https://playfulprogramming.com/posts/writable-derived-state/) | skipped: how-to (derived-state pattern essay; STATE already carries the no-sync-state principle) |
| [PropelAuth - How to Build a Good Consent Screen for OAuth And MCP](https://www.propelauth.com/post/good-consent-screen-for-oauth-and-mcp) | skipped: off-scope (vendor UX guide for OAuth consent screens; not a React/RN selection) |
| [Redux Toolkit 2.14 - Faster dispatch, RTK Query cache entry selectors, DevTools action san](https://github.com/reduxjs/redux-toolkit/releases/tag/v2.14.0) | already-held → firsthand-2026-11-25 (@reduxjs/toolkit 2.13.0 → 2.15.0) |
| [2.x and 3.0 roadmap](https://github.com/reduxjs/redux-toolkit/discussions/5536) | skipped: pre-ship (2.x/3.0 roadmap discussion; reopen: RTK 3.0 beta on npm) |
| [React Resizable Panels 4.16 → 4.18 - New &lt;Workspace> component for IDE-like layouts, dr](https://github.com/bvaughn/react-resizable-panels/releases) | skipped: off-scope (no entry owns split-pane layout; reopen: a COMPONENT-LIBS layout row) |
| [Preact 11.1 - preact/compat/compiler-runtime for React Compiler apps](https://github.com/preactjs/preact/releases/tag/11.1.0) | skipped: corroboration (Preact 11 held in RB-E-REACT-CORE; 11.1 adds preact/compat/compiler-runtime — reopen: if REACT-CORE's Preact note gains a Compiler-compat caveat) |
| [TanStack Redact 0.3 - Webpack and Rspack plugins for browser SPAs, Rsbuild setup guide](https://github.com/TanStack/redact/releases/tag/%40tanstack%2Fredact%400.3.0) | already-held → firsthand-2026-11-25 (tanstack/redact @tanstack/redact@0.3.1 + tanstack.com 'Introducing TanStack Redact') |
| [Inertia 3.10 → 3.11 - Live props refreshed by broadcast events (Laravel Echo), QUERY HTTP ](https://github.com/inertiajs/inertia/releases) | skipped: off-scope (Laravel/Rails adapter) |
| [Skullet - Skeleton loading states measured from your real components](https://skullet.lochie.me/) | skipped: too-early (new skeleton-generation lib; reopen: adoption signal or a POLISH skeleton row) |
| [ESLint Plugin React “You Might Not Need An Effect” 1.1 - Support renamed React hook import](https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect/releases/tag/v1.1.0) | skipped: corroboration (plugin already in RB-E-DX; 1.1 is a renamed-import fix) |
| [safe-mdx 2.0 → 2.1 - Render MDX in React without eval, streaming parser for LLM output](https://github.com/remorses/safe-mdx/releases) | skipped: too-early (MDX-without-eval renderer; reopen: AI-UI streaming-markdown row wants a web MDX option) |
| [https://patch.codemagic.io/docs](https://patch.codemagic.io/docs) | already-held → RB-E-OTA (Codemagic Patch; docs page of the carried patch.codemagic.io row; codemagic-patch-server-v0.11.0 in firsthand) |
| [Vega OS 2.0](https://developer.amazon.com/apps-and-games/blogs/2026/10/vega-2-0-sdk-launch) | skipped: off-scope (Vega OS / Fire TV SDK; no TV entry; reopen: corpus adds a TV-platform entry) |
| [bringing RN 0.83: React 19, the compiler, Hermes v1, and real DevTools](https://developer.amazon.com/apps-and-games/blogs/2026/10/react-native-for-vega-os) | skipped: off-scope (RN 0.83 for Vega OS — the page fetched as a CMS template shell with no body; same reopen as the Vega 2.0 row) |
| [React Native 0.89 RC - Faster text layout and native module calls, legacy bridge APIs remo](https://github.com/react/react-native/releases/tag/v0.89.0-rc.0) | already-held → firsthand-2026-11-25 (react/react-native 0.89.0-rc.3 GitHub event) |
| [React Native PR - Public visual regression testing for RNTester in CI](https://github.com/react/react-native/pull/59115) | skipped: off-scope (RNTester CI internals) |
| [Better Auth security release - Including a critical fix in the Expo integration](https://better-auth.com/blog/security-release-2026-11-03) | **kept** → RB-E-AUTH when-clause + note, RB-E-SECURITY pointer (Better Auth 2026-11-03 security release: 1 critical @better-auth/expo GHSA-4wq4-2ppv-q3hg, 1 high @better-auth/electron GHSA-9p5w-h4pr-fcrc + 10 more; all fixed in 1.7.16 / 1.8.0-beta.5; verified vs the post, the repo-scoped GHSA endpoint and npm — 1.7.16 published 2026-11-03) |
| [Full Intl implementation for Hermes, based on ICU4X](https://x.com/tmikov/status/2115687027303928162) | skipped: pre-ship (Hermes lead's tweet: full Intl on ICU4X — verified via og text; reopen: a Hermes/RN release note shipping it — then RB-E-I18N gets a Hermes-Intl line, polyfill advice shrinks) |
| [Apple Developer Program explained: free vs paid](https://expo.dev/blog/apple-developer-program-explained-free-vs-paid) | skipped: how-to (Apple account tiers explainer) |
| [A WebGPU cat puzzle game shipped in three days on Expo, with an AI agent as the QA team](https://expo.dev/blog/purrkour-webgpu-typegpu-game-expo-three-days) | skipped: how-to (showcase build; GAMES' WebGPU row unchanged) |
| [Maestro MCP - How to get your coding agent to verify UI changes on iOS and Android](https://maestro.dev/blog/verify-ui-changes-with-your-coding-agent) | skipped: how-to (vendor walkthrough of Maestro MCP; TESTING's Maestro row stands) |
| [Screens 5.0 beta - RN 0.88, iOS contained modals, Android Stack v5 animation presets, iOS ](https://swmansion.com/changelog/react-native-screens-5-0-0-beta-1/) | skipped: pre-ship (screens 5.0 beta; firsthand carries 5.0.0-beta.2; reopen: 5.0.0 stable — carry the iOS 26 transparent-header caveat into NAV per the 10-15 watch list) |
| [WebView 17.0 → 17.1 - Public RN codegen APIs, RN 0.80+ required, Android profile prop for ](https://github.com/react-native-webview/react-native-webview/releases) | skipped: pre-ship (17.x is on npm's `next` tag; latest is still 14.0.1 — verified npm 2026-11-25; reopen: 17 reaches latest) |
| [Nitro Fetch 1.10 - XMLHttpRequest bridge, non-persisted native prefetch() , pre-warmed Cro](https://github.com/margelo/react-native-nitro-fetch/releases/tag/v1.10.0) | already-held → firsthand-2026-11-25 (react-native-nitro-fetch 1.9.0 → 1.11.0) |
| [Pager View 10.0 - Rewritten as a Function component, native view ref, keyboard and nested ](https://github.com/callstack/react-native-pager-view/releases/tag/v10.0.0) | skipped: off-scope (no entry tracks pager-view; reopen: NAV/LISTS adds a pager row) |
| [Maestro 2.12 - Queue priority for Cloud uploads, Xcode 27 simulators, faster Android typin](https://maestro.dev/blog/maestro-cli-2-12-0) | skipped: corroboration (Maestro point release) |
| [Unistyles 3.7 → 3.8 - Zero Babel transforms with the Metro integration, 2–8x faster web st](https://github.com/jpudysz/react-native-unistyles/releases) | already-held → firsthand-2026-11-25 (react-native-unistyles 3.5.3 → 3.8.2) |
| [Safe Area Context 5.11 - Corner-adapted insets, Android subtree insets, web scroll fix](https://github.com/appandflow/react-native-safe-area-context/releases/tag/v5.11.0) | skipped: corroboration (safe-area-context minor; 5.11.1 on npm) |
| [RN TGFX - Declarative GPU 2D canvas powered by Tencent's tgfx and Nitro](https://github.com/margelo/react-native-tgfx) | skipped: too-early (new GPU 2D canvas; reopen: release + adoption vs Skia in SVG/GAMES) |
| [Skia 3.9 - colorSpace prop, async readbacks, background GPU + Imagination fixes](https://github.com/wcandillon/react-native-skia/releases/tag/v3.9.0) | already-held → firsthand-2026-11-25 (react-native-skia 3.5.0 → 3.12.0) |
| [NativeKeel - Library scanner that checks dependencies for breakage](https://nativekeel.com/react-native-0-88-library-readiness) | skipped: too-early (new vendor library-readiness scanner; reopen: second-source adoption; RN-VERSIONS' 0.88 flip is the tripwire fork's) |
| [Agent-Desktop - Computer use CLI for AI agents on macOS, Windows and Linux, through the ac](https://github.com/vercel-labs/agent-desktop) | skipped: too-early (labs computer-use CLI; reopen: release line + AI-DEVTOOLS desktop-testing gap) |
| [Argent 0.31 - HarmonyOS support, faster MCP captures](https://github.com/software-mansion/argent/releases/tag/v0.31.0) | already-held → firsthand-2026-11-25 (@swmansion/argent 0.29.0 → 0.34.0) |
| [RAG 0.11 - async LLM runner, context-length fitting, worklets 0.13 support](https://swmansion.com/changelog/react-native-rag-0-11-0/) | already-held → firsthand-2026-11-25 (react-native-rag 0.10.0 → 0.11.0) |
| [How to make your CI 10x faster with e2e?](https://x.com/o_kwasniewski/status/2116237813582582072) | skipped: unverifiable (x.com thread; no article behind it) |
| [Argent e2e Tutorial: Record a Mobile Test and Run It in CI](https://argent.swmansion.com/blog/argent-e2e-tutorial/) | skipped: how-to (vendor tutorial) |
| [Software Mansion podcast - "Maybe React Native Is Impossible" with Chas Jhin from Discord](https://www.youtube.com/watch?v=NYOM5ujWI9Y) | skipped: corroboration (podcast with a Discord engineer; unwatched — Discord's move is kept from the CTO's post in twir-305) |
| [GitHub Actions - pull_request_target blocked by default in public repositories from Decemb](https://github.blog/changelog/2026-11-02-pull_request_target-blocked-by-default-december-2/) | **kept** → RB-E-SECURITY note (GitHub blocks pull_request_target by default in public repos, permanent enforcement 2026-12-02 after brownouts 11-09/11-16; verified vs the changelog) |
| [Chrome 157 - HTML-in-Canvas stable: Interactive DOM inside 2D, WebGL, and WebGPU](https://developer.chrome.com/blog/html-in-canvas) | skipped: off-scope (web platform feature) |
| [Node.js 27.0 alpha - V8 15.6, npm 12.1, default heap size changes, --allow-env permission,](https://nodejs.org/en/blog/release/v27.0.0-alpha.0.0.0) | skipped: pre-ship (Node 27 alpha) |
| [jsdom 31.0 - New CSS engine](https://github.com/jsdom/jsdom/releases/tag/v31.0.0) | skipped: corroboration (jsdom 31 new CSS engine supports TESTING's 'slow RTL = jsdom version' reading; breaking: canvas backend → @napi-rs/canvas; reopen: a migrate rule if RTL/canvas users hit it) |
| [Parcel 3.0 alpha - Rust rewrite, up to 100x faster, standalone binary, native plugins, sma](https://v3.parceljs.org/blog/v3-alpha/) | skipped: pre-ship (Parcel 3 alpha) |
| [Rspack 2.3 - SWC Next parser, 5–20% faster builds, up to 27% lower memory, less duplicate ](https://rspack.rs/blog/announcing-2-3) | already-held → firsthand-2026-11-25 (rspack.rs 'Announcing Rspack 2.3' feed event) |
| [Vitest 5.1 - --since-last-run , interactive snapshot review, Trace View on failure by defa](https://vitest.dev/blog/vitest-5-1) | already-held → firsthand-2026-11-25 (vitest 5.0.4 → 5.1.1) |
| [Babel 8.1 - Import Bytes/Text, filtered namespaces, source map range mappings (experimenta](https://babeljs.io/blog/2026/11/02/8.1.0) | skipped: corroboration (Babel minor) |
| [tRPC 11.20 → 11.24 - Per-procedure error formatters with .errors() , stable localLink , Ta](https://github.com/trpc/trpc/releases) | skipped: corroboration (tRPC minors) |
| [x18n - Lint, view and manage i18n files for any framework](https://x18n.dev/) | skipped: too-early (new i18n file tool) |
| [My favorite resource for keeping up with the React community!](https://twitter.com/Baconbrix/status/1622655092657688576) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://surveyjs.io/](https://surveyjs.io/) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [Testing Frontend - Lessons from over a million lines of TypeScript at Palantir - Skip comp](https://www.meticulous.ai/blog/lessons-from-a-decade) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [If every newsletter was as informative, the world would be a better place!](https://x.com/grabbou/status/1829126194022715617) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://patch.codemagic.io/](https://patch.codemagic.io/) | previously already-held → RB-E-OTA — carry over unless a reopen signal applies |
| [build mode - What happens to engineers when AI writes all the code?](https://go.posthog.com/twir-nov4) | sponsor (tracking link, not evaluated) [rule:sponsor-tracking-domain] |
| [Simlock - Turn Mac into a simulator cloud that manages itself](https://github.com/callstackincubator/simlock) | already-held: RB-E-AI-DEVTOOLS |
| [If you are not signed-up, you are missing out](https://twitter.com/wcandillon/status/1263825118557593600) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Website](https://sebastienlorber.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Advocate pass (2026-11-25)

Re-argued as a hostile reviewer, against the flip bar (durable status change · genuine gap · canonical uncovered-facet deep-dive):
- **RN 0.83 for Vega OS / Vega 2.0** — Amazon shipping a React Native fork (React 19, Compiler, Hermes v1) for a TV OS is a durable platform fact. Held: no entry owns TV targets, and the RN-for-Vega page fetched as an unfilled CMS template, so there is nothing quotable to keep; reopen if a TV-platform entry is opened.
- **Hermes full Intl on ICU4X** — would retire Intl-polyfill advice on RN. Held pre-ship: a tweet by the Hermes lead, no Hermes or RN release names it yet.
- **jsdom 31** — breaking major (canvas backend → @napi-rs/canvas) plus the new CSS engine that TESTING's jsdom-speed reading would welcome. Held: corroboration of a held reading, and nothing in the corpus recommends the canvas package.
- **Screens 5.0 beta / WebView 17 (`next` tag)** — both majors, both still prerelease on npm. Held pre-ship with reopen signals.
- **create-next-app drops the router prompt** — would change META-FRAMEWORKS' Pages Router wording. Held: canary PR only.

Flips: **none**. Keeps: React.lazy 300 ms reading (REACT-CORE), Better Auth 2026-11-03 security release (AUTH/SECURITY), pull_request_target default block (SECURITY); Next.js November security release proposed as a firsthand duplicate.

Spot-check: twir-303 (the previous issue) was triaged concurrently by the other TWiR fork this pass; the spot-check of the last committed TWiR manifest (twir-301) is that fork's.
