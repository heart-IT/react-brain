# Harvest manifest — React Status #496 (prepped 2026-11-25)
issue: https://react.statuscode.com/issues/496

Pre-triaged by `harvest prep`: 43 external links · 3 pre-dispositioned (corpus + prior-manifest cross-ref + 2 by triage rules) · **40 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://master.dev/courses/local-ai/?amp%3Butm_medium=reactstatus&amp%3Butm_content=localaicooper](https://master.dev/courses/local-ai/?amp%3Butm_medium=reactstatus&amp%3Butm_content=localaicooper) | skipped: sponsor (Master.dev local-AI course placement) |
| [https://www.theverge.com/news/1027379/discord-ditching-electron-web-app](https://www.theverge.com/news/1027379/discord-ditching-electron-web-app) | **kept** → RB-E-CROSSPLATFORM note (third consumer-scale app off React Native, with a different reason from Shopify/Coinbase: Discord is moving the whole client to Rust — desktop drops Electron for a Rust client, 'Electron goes away, and so does React Native, mobile keeps native UI but shares app code with desktop via Rust' per CTO Stanislav Vishnevskiy; no ship date, 'testing with users soon') + RB-E-DESKTOP pointer (Electron exit, 290MB RAM screenshot); verified 2026-11-25 vs The Verge, datePublished 2026-11-05 |
| [showing off a Rust desktop client](https://x.com/svishnevskiy/status/2118081920194203799) | skipped: unverifiable (login-walled X post; its quote is reproduced verbatim in the kept Verge article, which is the receipt) |
| ['Maybe React Native Is Impossible'](https://www.youtube.com/watch?v=NYOM5ujWI9Y) | skipped: corroboration (Software Mansion interview with Discord's Chas Jhin, 'Maybe React Native Is Impossible', recorded before the Rust announcement; unwatched — reopen: a transcript stating the cost reasons behind the exit) |
| [A Roadmap for Redux Toolkit v2.x and 3.0](https://github.com/reduxjs/redux-toolkit/discussions/5536) | **kept** → RB-E-STATE note (Mark Erikson's RTK 2.x → 3.0 roadmap, 2026-11-01: 3.0 ESM-only, 'React 19 scale' breaking changes incl. state.api.queries nested by endpoint and extraReducers → respondTo, redux-thunk folded into redux core; ~6–8 months out; 2.14 → 2.17 ship groundwork and opt-ins first; verified 2026-11-25) |
| [2.14](https://github.com/reduxjs/redux-toolkit/releases/tag/v2.14.0) | already-held → firsthand-2026-11-25 (@reduxjs/toolkit 2.13.0 → 2.15.0 event; 2.14.0 2026-11-03 on npm) |
| [the November security release](https://nextjs.org/blog/november-2026-security-release) | already-held → firsthand-2026-11-25 (nextjs.org author-feed row 'November 2026 Security Release'; GHSAs checked 2026-11-25 via the repo-scoped endpoint: seven medium advisories 2026-11-03, patched in next 16.4.5 / 15.5.29 — the floor raise is that row's keep; noted in proposals-rs.md in case it lands there as skip) |
| [work on Query v6 can start once 'slop PRs' stop coming in](https://bsky.app/profile/tkdodo.eu/post/3mzdpknm7x227) | skipped: off-scope (maintainer commentary on AI 'slop PRs' delaying Query v6; reopen: Query v6 roadmap published) |
| [folding Next.js's Data Cache into Runtime Cache](https://vercel.com/blog/simplifying-runtime-caching-on-vercel) | skipped: off-scope (Vercel platform pricing — Data Cache folded into Runtime Cache; the changelog rows are rule-skipped as vendor chrome) |
| [Next.js is Prototyping Go(lang) Route Handlers](https://github.com/vercel/next.js/pull/100130) | skipped: pre-ship (experimental route.go handlers PR; reopen: documented as a supported Next.js feature) |
| [Understanding React Internals: A Deep Dive](https://www.alexandretrotel.org/articles/understanding-react-internals) | skipped: how-to (seven-part React internals tour; REACT-CORE does not hold internals tutorials) |
| [Amazon's React Native-Based Vega OS Hits 2.0](https://developer.amazon.com/apps-and-games/blogs/2026/10/vega-2-0-sdk-launch) | **kept** → RB-E-CROSSPLATFORM note (TV: Amazon's React Native-based Vega OS 2.0 + SDK 2.0 GA, rolled out to all Vega Fire TV devices; SDK 2.0 moves apps from RN 0.72 to RN 0.83 — React 19, React Compiler, Hermes v1, RN DevTools — with breaking majors once a year; verified 2026-11-25) |
| [The release notes](https://developer.amazon.com/docs/vega/2.0/vega-release-notes) | **kept** → RB-E-CROSSPLATFORM sources (Vega 2.0 release notes: deep imports no longer resolve in the RN 0.83 library set; @amazon-devices/react-linear-gradient replaced by experimental_backgroundImage; verified 2026-11-25) |
| [Why We Finally Left Next.js for TanStack Start](https://harrisonmilbradt.com/writing/nextjs-to-tanstack-start) | skipped: corroboration (one team's Next.js → TanStack Start move after memory leaks in two 16.3 releases; reopen: a Next.js advisory/issue confirming a 16.3 leak) |
| [Writable Derived State: Stop Synchronizing State](https://playfulprogramming.com/posts/writable-derived-state) | skipped: how-to (clientData ?? serverData instead of an effect) |
| [https://skullet.lochie.me/](https://skullet.lochie.me/) | skipped: too-early (Skullet measured skeleton loaders; new, no adoption signal) |
| [docs](https://skullet.lochie.me/docs) | skipped: too-early (Skullet docs; same) |
| [Parcel 3 Alpha: A Rust Rewrite with React Compiler, Tailwind and RSC](https://v3.parceljs.org/blog/v3-alpha/) | skipped: pre-ship (Parcel 3 alpha, Rust core, opt-in React Compiler, RSC beta; reopen: Parcel 3 stable — then RB-E-BUILD's bundler row) |
| [Reticle: Let Coding Agents Verify Their Changes Against Your Running App](https://github.com/reticlehq/reticle) | skipped: too-early (Reticle dev-only SDK + MCP for agents to verify against a running app; reopen: a release line + adoption — RB-E-AI-DEVTOOLS) |
| [https://react-resizable-panels.vercel.app/examples/workspace](https://react-resizable-panels.vercel.app/examples/workspace) | skipped: off-scope (panel-layout component demo) |
| [react-resizable-panels Gets a VS Code-Style Workspace Component](https://github.com/bvaughn/react-resizable-panels/releases/tag/4.16.0) | skipped: off-scope (react-resizable-panels 4.16 workspace component) |
| [Preact 11.2](https://github.com/preactjs/preact/releases/tag/11.2.0) | skipped: corroboration (Preact 11.2 minor; REACT-CORE pins the Preact 11 line) |
| [runtime for React Compiler output](https://github.com/preactjs/preact/releases/tag/11.1.0) | skipped: corroboration (Preact 11.1 compat runtime for React Compiler output; reopen: REACT-CORE's Preact row is revisited for Compiler interop) |
| [XState 6.0 Beta](https://github.com/statelyai/xstate/releases/tag/xstate%406.0.0-beta.0) | skipped: pre-ship (XState 6 beta; reopen: xstate ≥6.0.0 on latest — proposed as an RB-E-STATE tripwire) |
| [@xstate/react 7](https://github.com/statelyai/xstate/releases/tag/%40xstate/react%407.0.0-beta.0) | skipped: pre-ship (@xstate/react 7 beta; same reopen) |
| [TanStack Redact 0.3](https://github.com/TanStack/redact/releases/tag/%40tanstack%2Fredact%400.3.0) | already-held → firsthand-2026-11-25 (tanstack/redact 0.3.1 GitHub release row) |
| [React Native 0.89 RC](https://github.com/react/react-native/releases/tag/v0.89.0-rc.0) | already-held → firsthand-2026-11-25 (react/react-native v0.89.0-rc.3 GitHub release row) |
| [Storybook 11.0 Beta](https://github.com/storybookjs/storybook/releases/tag/v11.0.0-beta.0) | skipped: pre-ship (Storybook 11 beta; reopen: storybook ≥11.0.0 on latest — proposed as an RB-E-TESTING tripwire; final due December) |
| [Fimo](https://fimo.ai/?amp%3Butm_medium=newsletter&amp%3Butm_campaign=agents-launch&amp%3Butm_content=nov06) | skipped: sponsor (Fimo classified) |
| [QVAC](https://get.qvac.tether.io/React-Status) | skipped: sponsor (QVAC classified) |
| [has been reviving Prepack](https://jamesbox.exe.xyz/artifacts/prepack-revived/) | skipped: off-scope (Prepack revival experiment) |
| [React demo](https://jamesbox.exe.xyz/northstar/prepack/) | skipped: off-scope (Prepack React demo) |
| [Node.js 27 Alpha](https://nodejs.org/en/blog/release/v27.0.0-alpha.0.0.0) | skipped: off-scope (Node 27 alpha; reopen: an RN/Expo/Next minimum-Node change) |
| [release process](https://nodejs.org/en/about/previous-releases) | skipped: off-scope (Node release process page) |
| [Node 26](https://nodejs.org/en/blog/release/v26.13.0) | skipped: off-scope (Node 26 enters LTS; reopen: same signal) |
| [HTML-in-Canvas now stable](https://developer.chrome.com/blog/html-in-canvas) | skipped: off-scope (browser platform feature) |
| [The demos](https://chrome.dev/html-in-canvas/) | skipped: off-scope (demos) |
| [Geist Serif](https://vercel.com/blog/introducing-geist-serif) | skipped: off-scope (font release) |
| [Geist Sans](https://fonts.google.com/specimen/Geist) | skipped: off-scope (font page) |
| [geist npm package](https://github.com/vercel/geist-font/releases/tag/v1.9.0) | skipped: off-scope (font package release) |
| [check the dates and prices](https://vercel.com/changelog/data-cache-is-moving-to-runtime-cache) | skipped: off-scope platform chrome [rule:vercel-changelog-chrome] |
| [block known-malicious npm package versions](https://vercel.com/changelog/blocking-malicious-npm-packages-before-and-during-installation) | skipped: off-scope platform chrome [rule:vercel-changelog-chrome] |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Advocate pass (2026-11-25)

Judged every row incl. "Elsewhere in the ecosystem". Keeps: Discord (headline), RTK roadmap (second article), Vega 2.0 (mid-list). The Next.js November security release sat in IN BRIEF — held only because the firsthand nextjs.org row carries the same post (floor 16.4.5 / 15.5.29, seven medium GHSAs verified here).
Re-argued:
- **'Maybe React Native Is Impossible' (SWM × Discord)** — would be a `watching:` candidate next to the Discord keep, but it is unwatched and pre-dates the Rust announcement; held with a transcript reopen.
- **XState 6 beta / Storybook 11 beta / Parcel 3 alpha** — prerelease; held, two wired as proposed tripwires (xstate ≥6, storybook ≥11).
- **Harrison Milbradt: two leaking Next 16.3 releases** — would be a status fact if confirmed; no advisory or issue cited; held.
- **Vercel malicious-npm blocking [rule:vercel-changelog-chrome]** — argued as supply-chain defence for SECURITY; held: a host-platform feature with no user action, the rule's intended class. Rule stands.
- **Node 26 LTS** — held off-scope; reopen if an RN/Expo/Next release raises its Node floor.
Flips: **none**.
