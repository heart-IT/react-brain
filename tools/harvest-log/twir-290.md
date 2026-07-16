# Harvest manifest — This Week in React #290 (2026-07-15)
issue: https://thisweekinreact.com/newsletter/290

Processed 2026-07-16 (commits b324d66 → this one). EVERY external link in the issue gets a
disposition row CARRYING ITS URL — `kept` (where it landed), `already-held` (where it already
lives), or `skipped` (why). Gate: `react-brain harvest coverage <issue-url> <this file>` must
pass — a link the extractor missed becomes a red gate, not a silent hole. Reason classes:
corroboration · how-to (defer_to_skill) · pre-ship (RFC/beta) · too-early (0.x lab) · cap
(reading list full, judgment) · unverifiable (all fetch paths fail) · off-scope · sponsor.
`cap`/`pre-ship`/`too-early` skips are re-openable: each notes its reopen signal
(aggregated by `react-brain harvest watchlist`).

## React (web)

| item | disposition |
|---|---|
| [React team page](https://react.dev/community/team) — Working-Group governance | **kept** → RB-E-REACT-CORE note + source (7 WGs + Leadership Council, verified) |
| [Suspense docs — what activates a boundary](https://react.dev/reference/react/Suspense) | skipped: docs improvement, not a selection fact; 300ms reveal throttle is internals trivia |
| [Next.js Security Release Program](https://nextjs.org/blog/next-security-release-program) | skipped: corroboration — META-FRAMEWORKS note already carries the sharper fact (security releases don't backport) |
| [Better Auth joins Vercel](https://better-auth.com/blog/better-auth-joins-vercel) | **kept** → NEW entry RB-E-AUTH (trigger; first-party post verified) |
| [Cache Components in Next.js 16](https://certificates.dev/blog/cache-components-in-nextjs) | skipped: covered — META-FRAMEWORKS already reads the official 16.3 Instant Navigations post (same primitives) |
| [React Compiler explained](https://neciudan.dev/react-compiler-explained) | **kept** → RB-E-REACT-CORE reading + claim (RETRO-ADDED: maintainer review overturned a cap skip — the emitted-output facet was uncovered) |
| [useOptimistic Already Handles Rollback](https://dev.to/shubhradev/my-nextjs-16-optimistic-ui-looked-perfect-then-someone-clicked-it-five-times-fast-b2c) | skipped: how-to, single-API behavior note |
| [HTMX and Web Components Instead of React](https://kore-nordmann.de/blog/htmx-and-web-components-instead-of-react.html) | skipped: cap — ALT-FRAMEWORKS already holds 3 "do you need React" pieces (MDN/Lit, nanotags, Svelte) |
| [Async hydration in Preact](https://jovidecroock.com/blog/resumed-hydration-preact/) | skipped: cap + narrow — Preact internals; Preact is one option row in REACT-CORE |
| [SolidJS 2.0: A React Developer's First Look](https://morello.dev/blog/solidjs-2-react-developers-first-look) | skipped: pre-ship — Solid 2.0 is NOT released (npm 2026-07-16: latest 1.9.14, next 2.0.0-beta.18); reason corrected from `cap` on spot-check. Revisit at 2.0 stable |
| [Exporting Next.js Server Traces with OpenTelemetry](https://blog.sentry.io/nextjs-export-traces-opentelemetry/) | skipped: how-to (setup guide) |
| [React Router 8.2](https://github.com/remix-run/react-router/releases/tag/react-router%408.2.0) | already-held: RB-E-NAV option row cites 8.2.0 + migrate rules |
| [Storybook 10.5](https://github.com/storybookjs/storybook/releases/tag/v10.5.0) (Agentic Review, `storybook ai` MCP) | skipped: minor release; watch — if the agent-plugin direction recurs, RB-E-AI-DEVTOOLS is the home |
| [Astryx 0.1.3](https://astryx.atmeta.com/blog/astryx-v0-1-3) (Meta design system on StyleX) | already-held: RB-E-COMPONENT-LIBS already tracks Astryx as a beta option row (updated 2026-07-10, six days before this issue) — CORRECTED 2026-07-16b spot-check: originally skipped "too-early", missing that COMPONENT-LIBS already existed; this 0.1.3 post (Jul 4, 2026: tables, keyboard nav, a11y) is a routine changelog bump for the same @astryxdesign/core, not new-territory news |
| [React Email 6.7](https://github.com/resend/react-email/releases/tag/react-email%406.7.0) | skipped: minor release, no entry owns email templating (no gap — niche) |
| [video: Jack Herrington on Next.js](https://www.youtube.com/watch?v=PpyepQmLDTY) | skipped: opinion piece; META-FRAMEWORKS already carries the substantive migration case (Railway) |
| [video: Ankita Kulkarni Next.js 16.3 navigations](https://www.youtube.com/watch?v=ngIdL-fNNzw) | skipped: corroboration of the held 16.3 reading |
| [podcast: Aurora Scharff async React](https://podrocket.logrocket.com/async-react-with-vercels-aurora-scharff) | skipped: author's written work already held in REACT-CORE reading |

## React Native

| item | disposition |
|---|---|
| [RFC: media queries in StyleSheet](https://github.com/react-native-community/discussions-and-proposals/pull/1010) | skipped: pre-ship RFC (StyleX-syntax, native-thread resolution — revisit on merge) |
| [RFC: ViewTransition for RN](https://github.com/react-native-community/discussions-and-proposals/pull/1011) | skipped: pre-ship RFC |
| [RFC: Platform.Variant out-of-tree API](https://github.com/react-native-community/discussions-and-proposals/discussions/1009) | skipped: pre-ship discussion |
| [Margelo: Rewriting Rive RN with Nitro Modules](https://blog.margelo.com/rewriting-rive-react-native-with-nitro-modules) | already-held: RB-E-ANIMATION reading + option row + detect rows (added 2026-07-13, Margelo blog pass — pre-dates this issue) |
| [Expo: nesting tabs and drawers with Expo Router](https://expo.dev/blog/nesting-tabs-and-drawers-with-expo) | skipped: how-to |
| [Notification Actions in Expo](https://codewithbeto.dev/blog/expo-notification-actions) | skipped: how-to; no notifications entry (no recurring selection signal yet) |
| [thoughtbot: native stack navigation + iOS 26 surprise](https://thoughtbot.com/blog/migrating-to-native-stack-navigation-with-a-surprise-from-ios-26) | **kept** → RB-E-NAV reading + claim (REOPENED per this row's own signal: live URL is Cloudflare-walled, content verified via Wayback snapshot 2026-07-15 — the new playbook fallback; covers the JS-stack-vs-native-stack facet no NAV reading had) |
| [Expo: Moving away from @expo/vector-icons](https://expo.dev/blog/moving-away-from-expo-vector-icons) | already-held: RB-E-SVG deprecation fact + migrate rule (SDK-56 changelog pass, 2026-07-09) |
| [Expo Demos gallery](https://expo.dev/demos) | skipped: showcase, not selection knowledge |
| [react-native-screens 4.26](https://github.com/software-mansion/react-native-screens/releases/tag/4.26.0) (Tabs stable, RN 0.84+) | **kept** → RB-E-NAV note + source |
| [keyboard-controller 1.22](https://github.com/kirillzyusko/react-native-keyboard-controller/releases/tag/1.22.0) (KeyboardEffects) | skipped: minor feature release; KEYBOARD entry doesn't track point versions |
| [Sentry RN 8.18](https://github.com/getsentry/sentry-react-native/releases/tag/8.18.0) (prebuilt xcframework) | skipped: minor release |
| [react-native-auth0 5.9](https://github.com/auth0/react-native-auth0/releases/tag/v5.9.0) (passwordless OTP) | **kept** → option detail in NEW RB-E-AUTH (release verified) |
| [Unistyles 3.3](https://github.com/jpudysz/react-native-unistyles/releases/tag/v3.3.0) | skipped: minor release |
| [react-native-webview 16.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v16.0.0) (legacy arch removed) | skipped: corroboration of the held New-Arch-only ecosystem shift (RN-VERSIONS) |
| [react-native-toast-message 2.4](https://github.com/calintamas/react-native-toast-message/releases/tag/v2.4.0) | already-held: RB-E-POLISH option row cites v2.4 |
| [react-native-skia 2.8](https://github.com/Shopify/react-native-skia/releases/tag/v2.8.0) (Paragraph.getPath, Reanimated optional) | skipped: minor release |
| [react-native-bottom-tabs 1.4](https://github.com/callstack/react-native-bottom-tabs/releases/tag/react-native-bottom-tabs%401.4.0) | skipped: minor release |
| [react-native-boost 1.6](https://github.com/kuatsu/react-native-boost/releases/tag/v1.6.0) (Image optimizer) | skipped: minor release; no entry owns it (babel micro-optimizer — BUILD candidate only if it recurs) |

## Ecosystem / tooling

| item | disposition |
|---|---|
| [TC39 115th meeting agenda](https://github.com/tc39/agendas/blob/main/2026/07.md) | skipped: pre-ship (proposals not yet advanced) |
| [pnpm RFC: native monorepo versioning](https://github.com/pnpm/rfcs/pull/18) (merged) | skipped: pre-ship (RFC merged ≠ shipped; DX/BUILD candidate when it lands in a pnpm release) |
| [npm 12.0](https://socket.dev/blog/npm-12) (install scripts opt-in) | already-held: RB-E-SECURITY option/note + the NodeSource nuance reading |
| [Nub package manager](https://nubjs.com/blog/unblocking-the-global-virtual-store) | skipped: too-early; phantom-dep story noted for future corroboration |
| [Bun rewritten in Rust (v1.4)](https://bun.com/blog/bun-in-rust) | **kept twice** → RB-E-BUILD note (Rust-wave fact) + RB-E-AI-DEVTOOLS reading (agent-fleet methodology case study; primary post verified) |
| [Native SDK (Vercel Labs)](https://native-sdk.dev/) | skipped: too-early lab (TS/Zig→binary, experimental mobile) |
| [Fetch Needs Error Codes](https://www.jasnell.me/posts/fetch-needs-error-codes) | skipped: off-scope (web-platform spec gap, not React selection) |
| [The Siren Song of ariaNotify()](https://css-tricks.com/the-siren-song-of-arianotify/) | **kept** → RB-E-A11Y reading + tagged claim |
| [Do we still need build tools?](https://olliewilliams.xyz/blog/no-build/) | skipped: cap — BUILD full; the no-build argument is web-platform essay territory |
| [Proxy and Reflect](https://piccalil.li/blog/proxy-and-reflect/) | skipped: depth (mechanics under Valtio/MobX) — internals, not selection |

## Sponsors, testimonials & issue chrome

| item | disposition |
|---|---|
| [SVAR React Gantt](https://svar.dev/react/gantt/) · [Meticulous](https://www.meticulous.ai/) · [PostHog](https://go.posthog.com/twir-jul15) · [Formity](https://formity.app/) · [Drizz](https://www.drizz.dev/) · [Agent Conf](https://www.agent.sh/) | sponsor (not evaluated) |
| [reader testimonial clip](https://www.youtube.com/clip/UgkxDdNASo6xNS710ODcjMx0WW4HtTxIYbrA) · [jherr testimonial tweet](https://twitter.com/jherr/status/1666578571912171520) | off-scope (newsletter testimonials) |
| [Software Mansion](https://swmansion.com/) · [sebastienlorber.com](https://sebastienlorber.com/) | off-scope (co-author/author affiliation links) |
