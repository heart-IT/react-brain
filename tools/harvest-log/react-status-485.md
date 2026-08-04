# Harvest manifest — React Status #485 (prepped 2026-08-04)
issue: https://react.statuscode.com/issues/485

Pre-triaged by `harvest prep`: 44 external links · 8 pre-dispositioned (corpus + prior-manifest cross-ref) · **36 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://sentry.io/resources/etsy-workshop/?amp%3Butm_medium=paid-community&amp%3Butm_campaign=ecommerce-fy27q3-etsyworkshop&amp%3Butm_content=newsletter-primary-register](https://sentry.io/resources/etsy-workshop/?amp%3Butm_medium=paid-community&amp%3Butm_campaign=ecommerce-fy27q3-etsyworkshop&amp%3Butm_content=newsletter-primary-register) | skipped: sponsor |
| [Inferno](https://www.infernojs.org/) | skipped: too-early is the wrong word — Inferno is OLD, and that is the problem: a React-like renderer with no current adoption signal in this corpus's cohort. ALT-FRAMEWORKS routes the 'do you need React' question and does not need another renderer row. Reopen: a production migration write-up |
| [differences from React are here](https://octanejs.dev/docs/differences-from-react) | skipped: too-early — carried skip; OctaneJS is already on the watchlist from #292 and earlier. The differences-from-React page is documentation for an unadopted framework. Reopen: adoption signal or a 1.0 |
| [Nextane](https://github.com/southpolesteve/nextane) | skipped: too-early — an experimental Next.js-alike with no release story. Reopen: a release + adoption signal |
| [Vinext](https://github.com/cloudflare/vinext) | skipped: too-early, but the most interesting of this issue's three framework experiments — Cloudflare building a Vite-native Next.js-compatible runtime is a META-FRAMEWORKS-relevant direction given that entry already tracks the deploy-target axis. Reopen: a Cloudflare announcement post or a tagged release |
| [tanstack.com](https://tanstack.com/) | skipped: off-scope — vendor homepage |
| [rolled out a full rebrand](https://tanstack.com/blog/tanstack-has-a-new-look) | skipped: off-scope — vendor homepage |
| [React Debugging with Performance Tracks](https://www.youtube.com/watch?v=B_w1xFbRvCg) | skipped: cap — conference/talk on Performance Tracks; the react.dev reference below is the citable artifact and REACT-CORE's lists are full |
| [React Performance tracks](https://react.dev/reference/dev-tools/react-performance-tracks) | skipped: first-party API reference, not a selection fact — React Performance Tracks is a profiling surface, and REACT-CORE already routes profiling depth to react-native-optimization / react-native-best-practices. Reopen: if a PERF entry is ever split out, this is its anchor |
| [Your SPA is Leaking Memory: 'Soak Test' It](https://denodell.com/blog/your-spa-is-leaking-memory-soak-test-it) | skipped: cap — see the twir-292 row; OBSERVABILITY owns production diagnosis, TESTING owns strategy, and this straddles both. Corroborated across 2 sources this pass |
| [Linaria](https://linaria.dev/) | skipped: project homepage — STYLING already holds the Linaria maintainer's own wind-down essay, which is a far better source on Linaria's status than its landing page |
| [Building a Real-Time Face Recognition App in React Native with VisionCamera](https://blog.margelo.com/on-device-face-recognition-react-native) | **kept** → RB-E-ONDEVICE-AI reading + claim — a fully on-device recognition pipeline (detection→tracking→alignment→embedding→matching→liveness) on VisionCamera 5 frame processors with ONNX Runtime, measured on a Galaxy S21 Ultra: YuNet 3-6ms/frame, SFace ~29ms, ~39ms end-to-end, microsecond gallery matching for 512 entries. Corroborated by the firsthand margelo feed. Notably uses ONNX Runtime rather than this entry's ExecuTorch default |
| [A Modern Storybook Tutorial: Stories, Interaction Tests, and CI](https://flaviocopes.com/storybook-tutorial/) | skipped: how-to (Storybook setup tutorial) |
| [Markdown parser](https://tanstack.com/markdown/latest) | skipped: off-scope — vendor homepage |
| [highlighter](https://tanstack.com/highlight/latest) | skipped: off-scope — vendor homepage |
| [Shiki](https://shiki.style/) | skipped: off-scope — a syntax highlighter; no entry owns code rendering |
| [an alpha of TanStack Charts](https://tanstack.com/charts/latest) | skipped: off-scope — vendor homepage |
| [Flint](https://microsoft.github.io/flint-chart/) | skipped: too-early — a new Microsoft charting library with no adoption signal; CHARTS already carries established options. Reopen: a second signal or a Microsoft announcement |
| [Sign in with Google for React Native](https://thoughtbot.com/blog/sign-in-with-google-for-react-native) | **kept** → RB-E-AUTH reading + claim — Android's legacy GoogleSignInClient is deprecated and slated for removal; Credential Manager is the replacement and much of the RN field still targets the old API. THREE-source corroboration this pass (TWiR #292, here, React Weekly #31) |
| [OverflowGuard: A Component That Knows When Content Won't Fit](https://overflowguard.dev/) | skipped: too-early — a single-purpose component (detect when content will not fit) with no adoption signal. POLISH would be the home. Reopen: a second signal |
| [MobX 7.0](https://github.com/mobxjs/mobx/releases/tag/mobx%407.0.0) | **kept** → RB-E-STATE migrate rule — MobX 7 (7.0.0 on npm 2026-07-30) drops the ES5/non-proxy fallback entirely (useProxies and {proxy:false} gone), drops legacy decorators, converts namespaced properties to named exports (observable.ref→observableRef, comparer.structural→compareStructural), removes the public trace API and mobx-react's Provider/inject, and requires React 18+. ESM production bundle 17.02→13.96 KiB gzip |
| [updates its React bindings](https://github.com/mobxjs/mobx/releases/tag/mobx-react%4010.0.0) | **kept** (same delta) → the React-bindings half of the MobX 7 migrate rule: mobx-react 10 is where Provider/inject removal and the React 18+ floor land, with mobx-react-lite for function components |
| [Mantine 9.5](https://mantine.dev/changelog/9-5-0) | skipped: minor release — COMPONENT-LIBS carries Mantine without point-version claims |
| [SunburstChart](https://mantine.dev/charts/sunburst-chart/) | skipped: one new chart type in a component library's changelog |
| [React Ace 15.0](https://github.com/securingsincity/react-ace/releases/tag/v15.0.0) | skipped: major version of a WRAPPER around Ace — EDITORS' selection axis is the editor engine (Lexical/TipTap/etc.), and Ace is a legacy engine with no signal in this cohort. Reopen: adoption signal |
| [Ace](https://ace.c9.io/) | skipped: project homepage for the engine above |
| [VisionCamera 5.2](https://github.com/mrousavy/react-native-vision-camera/releases/tag/v5.2.0) | skipped: minor release — corroborates TWiR #292; MEDIA carries VisionCamera without point-version claims |
| [react-router-hono-server 3.0](https://github.com/rphlmr/react-router-hono-server/releases/tag/v3.0.0) | skipped: major of a third-party adapter (React Router on Hono) — no entry owns server adapters, and NAV tracks React Router itself. Reopen: if META-FRAMEWORKS grows a server-runtime lane |
| [Hono](https://hono.dev/) | skipped: off-scope — backend framework |
| [Virtua 0.50](https://github.com/inokawa/virtua) | skipped: 0.x minor (0.50) — LISTS already carries react-window/react-virtual/HighTable for web virtualization plus Legend List for the cross-platform lane; Virtua is a fourth entrant without a distinguishing axis. Reopen: 1.0, or a capability the held options lack |
| [Demo](https://inokawa.github.io/virtua/) | skipped: demo page for the row above |
| [react-x11 1.2](https://github.com/sidorares/react-x11) | skipped: off-scope — a React renderer targeting X11; DESKTOP tracks shippable desktop lanes (Electron/Tauri/Pear), not renderer curiosities |
| [Full guide/video in the blog](https://try.expo.dev/react-status-mobile-ai-apps) | skipped: sponsor (Expo-placed newsletter slot) |
| [https://microcharts.dev/](https://microcharts.dev/) | skipped: too-early — a Tufte-style sparkline library with no adoption signal; CHARTS is the home if it earns one. Reopen: a second signal |
| [Edward Tufte's](https://www.edwardtufte.com/books/) | skipped: off-scope — book listing (the dataviz-design ground belongs to the dataviz skill, not this corpus) |
| [GitHub repo](https://github.com/ganapativs/microcharts) | skipped: repo for the row above |
| [https://octanejs.dev/](https://octanejs.dev/) | previously skipped (too-early) → RB-E-ALT-FRAMEWORKS, RB-E-REACT-CORE — carry over unless a reopen signal applies |
| [Why TanStack Stopped Using RSC on Its Site](https://tanstack.com/blog/we-stopped-using-rsc-on-tanstack-com) | already-held: RB-E-META-FRAMEWORKS |
| [Experimenting with RSCs for Performance and UX in Next.js](https://aurorascharff.no/posts/experimenting-with-rsc-for-performance-and-ux-in-nextjs/) | previously skipped (cap) → RB-E-REACT-CORE, RB-E-META-FRAMEWORKS — carry over unless a reopen signal applies |
| [The State of Zero-Runtime CSS-in-JS, Mid-2026](https://dx-styles.dev/blog/state-of-zero-runtime-css-in-js/) | previously skipped (cap) → RB-E-STYLING — carry over unless a reopen signal applies |
| [dx-styles](https://dx-styles.dev/) | previously skipped (other) — carry over unless a reopen signal applies |
| [https://tanstack.com/blog/introducing-tanstack-markdown-and-highlight](https://tanstack.com/blog/introducing-tanstack-markdown-and-highlight) | previously skipped (corroboration) — carry over unless a reopen signal applies |
| [TimescaleDB extends Postgres](https://www.tigerdata.com/go/trial?amp%3Butm_medium=referral&amp%3Butm_campaign=react-status-newsletter) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
