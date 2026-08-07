# Harvest manifest — This Week in React #293 (2026-08-05, processed 2026-08-07)
issue: https://thisweekinreact.com/newsletter/293

Pre-triaged by `harvest prep`: 61 external links · 13 pre-dispositioned (corpus + prior-manifest cross-ref) · 48 judged this pass.
Reason classes per twir-290 template: corroboration · how-to · pre-ship · too-early · cap · unverifiable · off-scope · sponsor;
`cap`/`pre-ship`/`too-early` skips carry their reopen signal.

| item | disposition |
|---|---|
| [https://tanstack.com/blog/announcing-tanstack-table-v9](https://tanstack.com/blog/announcing-tanstack-table-v9) | already-held: RB-E-LISTS — v9 stable + reactivity-under-the-API architecture kept 2026-08-04 (v9-reactivity post + npm registry receipts); this is the companion announce URL |
| [TrustedRouter - Build AI features with hundreds of models through one OpenAI-compatible AP](https://trustedrouter.com/openai-compatible-llm-api) | sponsor (not evaluated) |
| [React Core PR - browser() API](https://github.com/react/react/pull/37143) | skipped: pre-ship (open core PR). Reopen: merge + a release-line announcement |
| [React 19’s useActionState: Preventing Sequenced Double Submits](https://shubhra.dev/tutorials/react-19-useactionstate) | skipped: how-to (single-API behavior tutorial) |
| [Next.js 16 useOptimistic: Fixing Rapid-Click Race Conditions & Auto-Rollbacks](https://shubhra.dev/tutorials/nextjs-16-useoptimistic-rollback-pattern) | skipped: how-to (same facet React Digest #2335's featured piece covered; that issue is processed) |
| [React Arven: Optimizing React Context Performance for Complex Local State](https://granat.blog/posts/2026-07-24-react-arven/) | skipped: too-early — brand-new single-author lib (1.4kB selector-based Context alternative, fetch-verified); STATE already covers the selector pattern via established options. Reopen: recurrence in another source or adoption signal |
| [Architectural Patterns for Generative UI in React](https://boda.sh/blog/generative-ui/) | **kept** → RB-E-AI-UI reading — the three-architecture field map (tool-JSON registry / declarative A2UI-AG-UI specs / sandboxed open-ended); covers the spec-layer facet the held Vercel reading doesn't (fetch-verified) |
| [build mode - Stop being the code review bottleneck](https://go.posthog.com/twir-aug5) | sponsor (tracking link) |
| [TanStack Charts pre-alpha - Minimal ~8 KiB core, framework-agnostic charting primitives on](https://github.com/TanStack/charts) | skipped: pre-ship (pre-alpha). RB-E-CHARTS is the home when it lands. Reopen: beta/stable on npm |
| [React Aria 1.20 - Adds PreviewTrigger popovers, TokenField for inline tags, native context](https://react-aria.adobe.com/releases/v1-20-0) | skipped: minor release |
| [React Three Fiber 9.7 - Hardens its reconciler to align with react-dom, fixing child desyn](https://github.com/pmndrs/react-three-fiber/releases/tag/v9.7.0) | skipped: minor release |
| [use-webmcp-tool - Experimental project from the Chrome team, a React abstraction for expos](https://github.com/GoogleChromeLabs/use-webmcp-tool) | skipped: too-early lab (Chrome experiment). Reopen: WebMCP spec traction + a stable release |
| [SWR 2.5 - Adds experimental RSC data preloading to hydrate client cache without duplicate ](https://github.com/vercel/swr/releases/tag/v2.5.0) | skipped: minor release; the headline feature is explicitly experimental. Reopen: RSC preloading stabilizing |
| [React Hook Form 7.84 - Enhances &lt;Form /> submit behavior, improves performance, reduces](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.84.0) | skipped: minor release |
| [BaseUI 1.7 - Reduces bundle size (~3%), enhances mobile UX and &lt;ScrollArea.Thumb> overs](https://base-ui.com/react/overview/releases/v1-7-0) | skipped: minor release |
| [Astryx 0.2 - RTL auto-mirroring with a dedicated ESLint rule, tooltip status variant for i](https://github.com/facebook/astryx/releases/tag/v0.2.0) | already-held: RB-E-COMPONENT-LIBS tracks Astryx as a beta option row — routine changelog bump (twir-290 spot-check precedent) |
| [React Bits upgrade - 27 new React components for creative developers](https://reactbits.dev/) | skipped: showcase (component gallery), not selection knowledge |
| [Styled Components 6.5 - Much faster type-checking, stricter RN styles, new CustomStyle typ](https://github.com/styled-components/styled-components/releases/tag/styled-components%406.5.0) | skipped: minor on the v6 line — STYLING's stance (runtime CSS-in-JS per-render-cost axis; v7 prerelease tracked) unchanged. The interop-relevant fact this week is Motion 13 dropping @emotion/is-prop-valid, kept in ANIMATION (firsthand-2026-08-06) |
| [Crisp - Add customer support chat to your React Native app with our SDK for iOS, Android a](https://crisp.chat/) | sponsor (not evaluated) |
| [Faster touchables in Gesture Handler coming soon](https://x.com/swmansion/status/2082488629167841415?s=20) | skipped: pre-ship teaser (tweet). Reopen: the Gesture Handler release that ships it |
| [Simulators for agents from Expo coming soon](https://expo.dev/services/simulators) | skipped: pre-ship ("coming soon" service page). Watch: Expo re-entering the agent space after winding down Expo Agent (AI-DEVTOOLS narrates that arc). Reopen: the service shipping |
| [Gesture Handler Docs - New interactive docs on callbacks & events](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/callbacks-events/) | skipped: docs improvement, not a selection fact |
| [ConfigCat - Run A/B Tests in React Native Apps with Feature Flags and Amplitude](https://configcat.com/blog/ab-testing-react-native-apps-with-feature-flags/) | skipped: vendor how-to (likely sponsor slot) |
| [React Native Plain Text](https://github.com/mdjastrzebski/react-native-plain-text) | skipped: too-early — brand-new lib. Reopen: recurrence or adoption signal |
| [the author's benchmark](https://x.com/mdj_dev/status/2082461349196534119) | skipped: same item as the plain-text row (author's benchmark thread) |
| [Enriched HTML 1.1 - Stable web support with full feature parity](https://github.com/software-mansion/react-native-enriched-html/releases/tag/v1.1.0) | **kept** → RB-E-EDITORS option row + note + source — family's first ≥1.0 member; web hardening verified vs the release. NOTE: TWiR's "full feature parity" is not in the release notes — entry states only the verified facts |
| [as-printed page href (trailing %20)](https://github.com/software-mansion/react-native-enriched-html/releases/tag/v1.1.0%20) | skipped: malformed href — the issue's link carries a stray trailing space that 404s; dispositioned via the clean-URL kept row above |
| [React Native Firebase App 26.1 - migrated to turbo Modules, requires new architecture](https://github.com/invertase/react-native-firebase/blob/main/packages/app/CHANGELOG.md%20) | skipped: corroboration of the held New-Arch-only ecosystem shift (RN-VERSIONS; react-native-webview 16 precedent, twir-290) |
| [React Native System Navigation Bar 3.0 - Rewritten on new architecture](https://github.com/kadiraydinli/react-native-system-navigation-bar/releases/tag/v3.0.0) | skipped: corroboration (same New-Arch-only class) |
| [React Native Blur 5.0 - Requires new architecture and RN 0.80+, raw native components depr](https://github.com/sbaiahmed1/react-native-blur/releases/tag/v5.0.0) | skipped: corroboration (same New-Arch-only class) |
| [Sentry 8.21 - Improved session replay details](https://github.com/getsentry/sentry-react-native/releases/tag/8.21.0%20) | skipped: minor release |
| [Argent 0.18 - Rotate directive for flow automation, single-element snapshot diffs, human-r](https://github.com/software-mansion/argent/releases/tag/v0.18.0) | skipped: 0.x minor (AI-DEVTOOLS pin-versions/expect-churn culture; firsthand already reported 0.19). The durable Argent-adjacent keep this pass is AppControlBench below |
| [React Native Purchases 10.6 - Supports multipage paywalls](https://github.com/RevenueCat/react-native-purchases/releases/tag/10.6.0) | skipped: minor release (10.7 already out per firsthand-2026-08-07) |
| [React Native Ease 0.8 - Initial velocity for spring transitions, iOS retain-cycle fix](https://github.com/appandflow/react-native-ease/releases/tag/v0.8.0) | skipped: 0.x minor (ANIMATION tracks Ease with its "young" caveat) |
| [AppControlBench - Compare models, tools, cost, and test runs across real iOS app-control t](https://appcontrolbench.swmansion.com/) | **kept** → RB-E-AI-DEVTOOLS note + source — SWM Labs live leaderboard benchmarking exactly the entry's device-driving options (Argent, agent-device) × model configs on real iOS tasks (fetch-verified: ~120 configs, best 98% @ $0.22/run) |
| [Callstack - Build a React Native News Agent With Eve](https://www.youtube.com/watch?v=fEn-PQXBp28) | skipped: vendor tutorial video; Eve's agent-backend role already noted in AI-UI. Reopen: Eve+React-Native recurrence |
| [React Universe on Air - VisionCamera V5 With Marc Rousavy](https://www.callstack.com/podcasts/visioncamera-v5-with-marc-rousavy) | skipped: corroboration — MEDIA holds the VisionCamera 5 line; podcast adds no selection fact beyond the held release work |
| [GitHub stacked PRs now in public preview](https://github.blog/changelog/2026-07-30-stacked-pull-requests-are-now-in-public-preview/) | skipped: off-scope platform workflow feature (generic AI-era review flow — deferred to the agentic-engineering-patterns skill; pairs with the giant-PR-to-stack essay, firsthand-2026-08-06, same verdict) |
| [Declarative Route and Navigation Matching in CSS](https://www.bram.us/2026/07/30/styling-the-navigation-declarative-route-and-navigation-matching-in-css/) | skipped: off-scope (web-platform CSS capability, not React selection) |
| [Disrupting supply chain attacks on npm and GitHub Actions](https://github.blog/security/supply-chain-security/disrupting-supply-chain-attacks-on-npm-and-github-actions/) | **kept** → RB-E-SECURITY reading + note — the first-party umbrella over the entry's whole 2026 supply-chain thread (staged publishing, account lockdown, Dependabot cooldown, Actions hardening); fetch-verified, corroborated by firsthand's sibling post |
| [Flue 2.0 - “React for Agents”](https://flueframework.com/blog/flue-2/) | skipped: off-scope — TypeScript agent framework; "React for Agents" is a hooks-API metaphor, not a React dependency (fetch-verified) |
| [SolidStart 2.0 - Modernizes the foundation for building full-stack applications with Solid](https://github.com/solidjs/solid-start/discussions/2281) | skipped: adjacent release — SolidStart 2.0 shipped (npm verified) but on Solid 1.x core (solid-js 1.9.14); ALT-FRAMEWORKS' tripwire watches solid-js ≥2.0.0, which has not fired |
| [Node 24.19 - Stabilized stream.compose , new TLS/TCP configuration options, --experimental](https://nodejs.org/en/blog/release/v24.19.0) | skipped: off-scope (runtime minor) |
| [scriptc - Compile TypeScript to tiny native binaries (no Node/V8)](https://scriptc.dev/) | skipped: too-early (Native SDK precedent, twir-290). Reopen: recurrence + a stable release |
| [Vite 8.2 - Top-level input option (bypassing build.rolldownOptions ), warns for unsupporte](https://github.com/vitejs/vite/blob/v8.2.0/packages/vite/CHANGELOG.md) | skipped: minor release |
| [Hono 4.13 - Up to 1.25x perf gains, adds HTTP QUERY method support, a Method Not Allowed m](https://github.com/honojs/hono/releases/tag/v4.13.0) | skipped: off-scope (server framework minor) |
| [pnpm 11.20 - Fixes multi-registry package substitution vulnerability with registry-qualifi](https://pnpm.io/blog/releases/11.20) | skipped: minor release — corroborates the supply-chain theme; DX's held pnpm facts (11.11–11.14 monorepo versioning) unchanged |
| [https://x.com/damovisa/status/2082945188578882026/photo/1](https://x.com/damovisa/status/2082945188578882026/photo/1) | skipped: off-scope (tweet photo, issue chrome) |
| [If you are not signed-up, you are missing out](https://twitter.com/wcandillon/status/1263825118557593600) | skipped: off-scope (newsletter testimonial) |
| [Software Mansion](https://swmansion.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [My favorite resource for keeping up with the React community!](https://twitter.com/Baconbrix/status/1622655092657688576) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://www.meticulous.ai/](https://www.meticulous.ai/) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [https://nextjs.org/blog/next-16-3](https://nextjs.org/blog/next-16-3) | previously already-held → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS — carry over unless a reopen signal applies |
| [Visual Regression Testing: The Most Important Test You're Not Running](https://howtotestfrontend.com/resources/visual-regression-testing-introduction-guide) | previously skipped (how-to) — carry over unless a reopen signal applies |
| [MobX 7.0 - Drops legacy compatibility, reduces ESM bundle size while maintaining the mobx-](https://github.com/mobxjs/mobx/releases/tag/mobx%407.0.0) | already-held: RB-E-STATE |
| [If every newsletter was as informative, the world would be a better place!](https://x.com/grabbou/status/1829126194022715617) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://surveyjs.io/](https://surveyjs.io/) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [embed a JSON-powered form builder](https://surveyjs.io/try/reactjs) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [Building a Real-Time Face Recognition App in React Native with VisionCamera](https://blog.margelo.com/on-device-face-recognition-react-native) | already-held: RB-E-ONDEVICE-AI |
| [Migration to React Native in 2026 Starts With a Delivery Question](https://www.callstack.com/blog/migration-to-react-native-in-2026-starts-with-a-delivery-question) | previously skipped (cap) → RB-E-REACT-CORE, RB-E-NAV — carry over unless a reopen signal applies |
| [Voltra 2.2 - Improved build stability, runtime props support](https://github.com/callstackincubator/voltra/releases/tag/v2.2.0) | previously skipped (other) → RB-E-NATIVE-UI — carry over unless a reopen signal applies |
| [Website](https://sebastienlorber.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Advocate pass (2026-08-07, same session)

All skip rows re-read as a hostile reviewer; **no flips** (7 keeps already stand across this
manifest + the two firsthand manifests). Closest calls, argued and held:
- React Arven — a genuinely different design point (Context semantics preserved, 1.4kB), but
  first public week, single author, zero corroboration: exactly what `too-early` is for.
- TanStack Charts — durable entrant signal for RB-E-CHARTS, but pre-alpha: nothing selectable
  yet; watchlist will resurface it on the wired reopen.
- use-webmcp-tool — novel domain (browser-exposed agent tools) but an unreleased Chrome lab
  experiment; reopen on WebMCP traction + a release.
