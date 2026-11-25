# Harvest manifest — React Status #497 (prepped 2026-11-25)
issue: https://react.statuscode.com/issues/497

Pre-triaged by `harvest prep`: 37 external links · 1 pre-dispositioned (corpus + prior-manifest cross-ref) · **36 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://sentry.io/resources/changelog-live/?amp%3Butm_medium=paid-community&amp%3Butm_campaign=brand-fy27q4-changeloglive&amp%3Butm_content=newsletter-primary-register](https://sentry.io/resources/changelog-live/?amp%3Butm_medium=paid-community&amp%3Butm_campaign=brand-fy27q4-changeloglive&amp%3Butm_content=newsletter-primary-register) | skipped: sponsor (Sentry Changelog Live webinar placement) |
| [https://declarative-dragging.github.io/](https://declarative-dragging.github.io/) | skipped: too-early (Dragology, an experimental research library for declarative SVG drag interactions; reopen: a release line + adoption) |
| [Dragology](https://github.com/declarative-dragging/dragology) | skipped: too-early (Dragology repo; same) |
| [lots of demos](https://declarative-dragging.github.io/dragology/) | skipped: too-early (Dragology demos; same) |
| [e18e's Ongoing Benchmarks for JavaScript Meta-Frameworks](https://e18e.dev/blog/launching-the-framework-performance-project.html) | **kept** → RB-E-META-FRAMEWORKS reading (e18e Framework Performance project: maintainer-informed, release-by-release benchmarks of Next.js, TanStack Start, React Router, Astro, Nuxt, SvelteKit, Solid Start and more — install/build cost on default starters plus SSR throughput/load and Core Web Vitals on the same app, run on Depot; verified 2026-11-25) |
| [the results](https://frameworks.e18e.dev/) | skipped: corroboration (the live results dashboard of the kept e18e post; the post is the receipt) |
| [A critical flaw](https://github.com/vitejs/vite/security/advisories/GHSA-p4f5-76q4-ffq7) | **kept** → RB-E-BUILD Vite security floor + RB-E-SECURITY pointer (GHSA-p4f5-76q4-ffq7, CRITICAL, published 2026-11-10: RCE via the `__vite-browser-external` virtual module on dev servers exposed with --host/server.host; patched vite 8.3.7 / 8.2.5 / 8.1.7 / 7.3.8 / 6.4.6 and vite-plus 1.5.1 — verified vs the repo-scoped GHSA API + npm 2026-11-25, 8.3.7 published 2026-11-09; the firsthand vite 8.3.4 → 8.3.8 version row is the same fix seen as a bump) |
| [Storybook 11 beta now has an official post](https://storybook.js.org/blog/storybook-11-beta/) | skipped: pre-ship (Storybook 11 beta post; `next` is 11.0.0-rc.0 and `latest` 10.6.9 on 2026-11-25; reopen: 11.0.0 on latest — tripwire proposed) |
| [how to keep field values after an Action](https://react.dev/reference/react-dom/components/form) | skipped: how-to (react.dev <form> docs on keeping field values after an Action) |
| [a reference page](https://react.dev/reference/react-dom/requestFormReset) | skipped: how-to (new requestFormReset reference page; the API is not new) |
| [UI SDK: Vercel and shadcn's Headless UI Behaviors Library](https://ui-sdk.dev/docs/core/changelog/introducing-ui-sdk) | skipped: pre-ship (Vercel + shadcn headless behaviours library, in beta; reopen: stable release — then RB-E-COMPONENT-LIBS next to Base UI/React Aria; TWiR #306 headlines the same item) |
| [get started now](https://ui-sdk.dev/docs/core) | skipped: pre-ship (UI SDK docs; same reopen) |
| [How X is Rebuilding Its Web App with React, Relay and Vite](https://blog.x.com/en/engineering/rebuilding-the-global-town-square-from-scratch) | **kept** → RB-E-CROSSPLATFORM note + RB-E-META-FRAMEWORKS reading (X rebuilt x.com: old rweb styled through React Native for Web is being replaced by a Vite/Rolldown + React streaming SSR + Fastify + Relay app with XDS, a new component library on Base UI + Tailwind; slow-connection lab recording first post 23.9s → 2.7s; three servers → one. blog.x.com answers 403 to curl-UA — content verified via Wayback snapshot 2026-11-15, datePublished 2026-11-04) |
| [Six React Chart Libraries vs Hand-Written SVG](https://dev.to/gusevp/six-react-chart-libraries-against-hand-written-svg-what-i-found-46ib) | **kept** → RB-E-CHARTS reading (same two charts in nivo 0.99, Recharts 3.10, ECharts 6.1, visx 4.0, TanStack Charts 1.2, Chart.js 4.6 and hand-written SVG: a tie at typical sizes, but at 10,000 scatter points mount was 24ms SVG, 33ms visx, 53ms TanStack, 80–86ms Canvas libs, 310ms Recharts, 3.2s nivo; Canvas did not win; verified 2026-11-25, datePublished 2026-11-06) |
| [Remix v3 vs TanStack Start: Fast Pages, Thin Ecosystem](https://marmelab.com/blog/2026/11/12/remix-v3-fast-pages-thin-ecosystem.html) | skipped: corroboration (Remix v3 vs TanStack Start on one site; META-FRAMEWORKS' REMIX 3 note already says 'not React, thin ecosystem') |
| [How Five Web Developers Built an iOS Keyboard Extension with Expo](https://expo.dev/blog/supernova-ios-keyboard-extension-expo) | skipped: how-to (iOS keyboard extension with Expo; case study) |
| [https://textjs.org/](https://textjs.org/) | skipped: off-scope (React rendered into the DevTools console; novelty renderer) |
| [Exact: A New Rust-Powered App Framework from Expo's Co-Founder](https://ccheever.expo.app/) | skipped: too-early (Exact, a non-React Rust app framework from Expo's co-founder; reopen: a release line or Expo adopting it) |
| [𝕏 Andrew Clark says](https://x.com/acdlite/status/2119784287436415149) | skipped: unverifiable (login-walled X post; opinion on React 20 direction) |
| [React Shepherd 8.0: Guided Tours for Apps, Now with a Leaner Engine](https://github.com/shipshapecode/shepherd/releases/tag/v8.0.0-react-shepherd) | skipped: off-scope (guided-tour library, AGPL; no entry owns onboarding tours) |
| [React docs here](https://docs.shepherdjs.dev/recipes/react/) | skipped: off-scope (Shepherd React docs) |
| [Shepherd](https://www.shepherdjs.dev/) | skipped: off-scope (Shepherd homepage) |
| [EmbedPDF 3.0](https://github.com/embedpdf/embed-pdf-viewer/releases/tag/v3.0.0) | skipped: off-scope (web PDF viewer major; no entry owns document viewers; reopen: a GAP for PDF viewing) |
| [Demo](https://www.embedpdf.com/demo) | skipped: off-scope (EmbedPDF demo) |
| [react-virtualized 10.0](https://github.com/bvaughn/react-virtualized/releases/tag/10.0.0) | skipped: too-early (react-virtualized 10.0 modernised after years of dormancy, 10.0.1 latest on npm; RB-E-LISTS points web virtualization at react-window / TanStack Virtual from the same author lineage; reopen: a second 10.x release — then a detect row for legacy react-virtualized apps) |
| [React Native Audio API 1.0](https://swmansion.com/changelog/react-native-audio-api-1-0-0/) | already-held → firsthand-2026-11-25 (react-native-audio-api 0.13.6 → 1.0.1 event) |
| [Mantine 9.8](https://mantine.dev/changelog/9-8-0/) | skipped: corroboration (Mantine 9.8 minor; COMPONENT-LIBS' same-tier row names no minor-specific fact) |
| [BagUI](https://www.bagui.pro/) | skipped: off-scope (shadcn registry of SaaS landing blocks) |
| [Fimo](https://fimo.ai/?amp%3Butm_medium=newsletter&amp%3Butm_campaign=agents-launch&amp%3Butm_content=nov13) | skipped: sponsor (Fimo classified) |
| [Expo Simulators](https://try.expo.dev/4erqQgz) | skipped: sponsor (Expo Simulators classified) |
| [Build durable AI agents &amp; workflows in TypeScript with Trigger.dev](https://fandf.co/3WQzvmJ) | skipped: sponsor (Trigger.dev classified) |
| [https://vectoys.com/](https://vectoys.com/) | skipped: off-scope (SVG device-mockup components) |
| [Modern Web Guidance 1.0](https://developer.chrome.com/blog/modern-web-guidance-v1) | skipped: off-scope (Chrome's agent skills for Baseline HTML/CSS — not React-specific; reopen: RB-E-AI-DEVTOOLS adds a web-platform skills row) |
| [the 'top 10 things AI gets wrong'](https://developer.chrome.com/blog/top-10-things-ai-gets-wrong-in-web-dev) | skipped: off-scope (same team's companion list) |
| [chrome-capture](https://github.com/paulirish/chrome-capture) | skipped: off-scope (tab-to-MP4 recorder) |
| [State of JavaScript 2026 survey](https://survey.devographics.com/en-US/survey/state-of-js/2026) | skipped: off-scope (survey is open; reopen: results published) |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Advocate pass (2026-11-25)

Judged every row. Keeps: the Vite critical GHSA (IN BRIEF, one line — this source buries security again), X's rebuild (article block), the chart-library benchmark (one-liner), e18e (second headline). The headline (Dragology) is an experimental research lib.
Re-argued:
- **UI SDK (Vercel + shadcn)** — strongest flip candidate (headless behaviours from the shadcn author, TWiR #306's headline). Held pre-ship: beta, and COMPONENT-LIBS' Base UI/React Aria rows are the stable equivalents; reopen on stable.
- **Storybook 11 beta** — held (`next` 11.0.0-rc.0); tripwire proposed.
- **react-virtualized 10** — a revived legacy lib; held too-early pending a second 10.x release.
- **Chrome Modern Web Guidance skills** — not React-specific; held.
Flips: **none**.
