# Harvest manifest — React Status #493 (prepped 2026-10-15)
issue: https://react.statuscode.com/issues/493

Pre-triaged by `harvest prep`: 44 external links · 19 pre-dispositioned (corpus + prior-manifest cross-ref) · **25 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://julesblom.com/writing/react-visual-notation](https://julesblom.com/writing/react-visual-notation) | skipped: off-scope (the issue's headline — a diagram notation for parent vs owner trees with marks for context/Suspense/memo/RSC; a teaching aid, not a selection or upgrade fact; same disposition in twir-301) |
| [a playground](https://julesblom.com/react-trees) | skipped: off-scope (duplicate anchor: the notation's playground) |
| [Cache Components](https://nextjs.org/docs/app/getting-started/caching) | already-held → RB-E-META-FRAMEWORKS (Cache Components recommended + create-next-app default, kept from the Next.js 16.4 post firsthand-2026-10-08) |
| [nominate themselves](https://docs.google.com/forms/d/e/1FAIpQLSf-ATKZ0np5wFvWEOJlFeNp52BazYF5_fT7ubuvr3C0IHxheQ/viewform?pli=1) | skipped: off-scope (Contributors Summit self-nomination form) |
| [Coinbase says it's moving its app off React Native](https://www.linkedin.com/posts/adamawolf_senior-software-engineer-native-mobile-activity-7511201803389186048-JV6b) | **kept** → RB-E-CROSSPLATFORM (REOPENED from twir-300's unverifiable Coinbase x.com row, whose signal was 'a Coinbase engineering post or press coverage': curl-UA retrieves the LinkedIn post (datePublished 2026-09-30) — Coinbase is taking its consumer trading app fully native, off RN to Swift/Kotlin, 'AI coding agents have collapsed the cost of building a feature twice', hiring native-mobile + mobile-QA Senior→Senior Staff. COINBASE note added under the Shopify thread: the revisit trigger is met in weak form (a hiring post, not a write-up); default re-checked and holds on the same three terms; next trigger = a published technical account) |
| [Can We Make React Faster Using the React Compiler?](https://jimmyhmiller.com/what-does-the-react-compiler-even-do) | skipped: off-scope (same verdict as twir-301: research prototypes of extra compiler passes; reopen: a pass lands in babel-plugin-react-compiler) |
| [React Aria's New Swipeable Sheet and the CSS Tricks Behind It](https://react-aria.adobe.com/blog/sheet) | skipped: off-scope (web swipeable sheet via CSS scroll snap + view timelines; RB-E-SHEETS is RN-only; same verdict as twir-301) |
| [Sheet component](https://react-aria.adobe.com/Sheet) | skipped: off-scope (duplicate anchor: the Sheet component docs) |
| [React Folder Structure Best Practices (2026 Edition)](https://www.robinwieruch.de/react-folder-structure/) | skipped: how-to (folder-structure conventions; no selection fact) |
| [React Charts](https://react-charts.tanstack.com/) | skipped: off-scope (the legacy react-charts site, linked as history in the TanStack Charts blurb; RB-E-CHARTS holds TanStack Charts 1.0) |
| [example catalog](https://tanstack.com/charts/catalog) | skipped: corroboration (TanStack Charts example catalog; Charts 1.0 is held in RB-E-CHARTS) |
| [redux.js.org](https://redux.js.org/) | skipped: corroboration (all Redux docs consolidated on redux.js.org; no entry cites the old redux-toolkit.js.org host, so no link to repoint) |
| [for Redux Toolkit](https://redux.js.org/toolkit) | skipped: corroboration (duplicate anchor of the docs-consolidation row above) |
| [https://mantine.dev/changelog/9-7-0/](https://mantine.dev/changelog/9-7-0/) | skipped: corroboration (Mantine 9.7: Tour component + broader MCP docs coverage; @mantine/core 9.7.2 on npm; COMPONENT-LIBS' same-tier Mantine row unchanged) |
| [Tour component](https://mantine.dev/core/tour/) | skipped: corroboration (duplicate anchor: the new Tour component) |
| [Lexical 0.51](https://github.com/facebook/lexical/releases/tag/v0.51.0) | already-held → RB-E-EDITORS (Lexical 0.51.0 is the pinned version, 'still 0.x — pin minors'; its ESM-only switch is the kind of minor-line break that caveat covers; npm latest is now 0.52.0) |
| [React Aria 1.22](https://react-aria.adobe.com/releases/v1-22-0) | skipped: corroboration (same verdict as twir-301: React Aria 1.22, React Aria row unchanged) |
| [Material UI 9.5](https://github.com/mui/material-ui/releases/tag/v9.5.0) | skipped: corroboration (MUI 9.5.0 minor, no blurb; @mui/material 9.5.0 on npm; batteries-included row unchanged) |
| [Expo is mobile AI infrastructure](https://try.expo.dev/4zgin86) | skipped: sponsor (Expo classified) |
| [Ship your first agent in minutes with Trigger.dev](https://fandf.co/4yCkDqc) | skipped: sponsor (Trigger.dev classified) |
| [Mozilla Festival](https://www.mozillafoundation.org/en/festival/?amp%3Butm_source=newsletter&amp%3Butm_campaign=26-mozfest&amp%3Butm_content=ad_react-status&amp%3Butm_term=cooperpress) | skipped: sponsor (Mozilla Festival classified) |
| [190+ effect components](https://shaders.com/docs/components) | skipped: off-scope (same cluster as the twir-300 Shaders skip: WebGPU visual-effect components, below this corpus's granularity) |
| [Remix 3.0](https://github.com/remix-run/remix/releases/tag/remix%403.0.0) | **kept** → RB-E-META-FRAMEWORKS (STATUS FLIP: remix 3.0.0, 'First stable release of Remix 3', published 2026-10-01 and npm `latest` — the REMIX 3 note still read RC. Not a React framework: own component runtime/JSX (`remix/ui` → `remix/component` at 3.0.0), UI primitives moved to unstable 0.x `@remix-run/ui`; still no option row) |
| [ts-rust](https://github.com/pingdotgg/ts-rust) | skipped: too-early (same verdict as twir-301: very experimental agent-driven TS 7 port) |
| [Deno is joining Cloudflare](https://blog.cloudflare.com/deno-joins-cloudflare/) | skipped: off-scope (Cloudflare's side of the Deno announcement judged in twir-301 from deno.com: runtime supported one more year, Deno Deploy shut down after six months; no entry recommends Deno) |
| [https://surveyjs.io/?amp%3Butm_medium=email](https://surveyjs.io/?amp%3Butm_medium=email) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [Next.js 16.4 Makes Cache Components the Recommended Default](https://nextjs.org/blog/next-16-4) | already-held: RB-E-META-FRAMEWORKS |
| [Contributors Summit](https://www.react.foundation/summit) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [𝕏 has joined the React Foundation](https://x.com/sethwebster/status/2105422444529963495) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [React Aria](https://react-aria.adobe.com/) | previously already-held → RB-E-COMPONENT-LIBS — carry over unless a reopen signal applies |
| [Making React Context Cheap with React Compiler](https://jjenzz.com/making-react-context-cheap/) | already-held: RB-E-STATE |
| [https://tanstack.com/blog/tanstack-charts-1-0](https://tanstack.com/blog/tanstack-charts-1-0) | already-held: RB-E-CHARTS |
| [Ink 8: React for CLIs Gets Scrollable Views](https://github.com/vadimdemedes/ink/releases/tag/v8.0.0) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Redux Toolkit 2.13: TypeScript 7 Support and a Steadier useQuery](https://github.com/reduxjs/redux-toolkit/releases/tag/v2.13.0) | previously skipped (corroboration) — carry over unless a reopen signal applies |
| [React Native Skia 3.0](https://wcandillon.github.io/react-native-skia/docs/getting-started/migration/) | already-held: RB-E-ANIMATION |
| [▶️ see in action here](https://www.youtube.com/watch?v=L-PNQi1nBSA) | previously already-held → RB-E-ANIMATION — carry over unless a reopen signal applies |
| [React Native Testing Library 14.1](https://github.com/callstack/react-native-testing-library/releases/tag/v14.1.0) | already-held: RB-E-TESTING |
| [Base UI 1.9](https://github.com/mui/base-ui/releases/tag/v1.9.0) | previously skipped (corroboration) → RB-E-COMPONENT-LIBS — carry over unless a reopen signal applies |
| [MSW 3.0](https://mswjs.io/blog/introducing-msw-3.0) | previously already-held → RB-E-TESTING — carry over unless a reopen signal applies |
| [https://shaders.com/updates/shaders-is-open-source](https://shaders.com/updates/shaders-is-open-source) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Preact 11 is here](https://preactjs.com/blog/preact-11/) | already-held: RB-E-REACT-CORE |
| [Hydration 2.0](https://preactjs.com/guide/v11/upgrade-guide/) | already-held: RB-E-REACT-CORE |
| [six months of building with v3](https://sergiodxa.com/articles/the-remix-way) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Advocate pass (2026-10-15)

Judged every row, not just the headlines (this source's standing note). The Coinbase item sat in the "IN BRIEF" block and Remix 3.0 in "Elsewhere in the ecosystem" — both became keeps; the headline (julesblom) did not.
Re-argued:
- **Lexical 0.51 ESM-only** — a breaking change for CommonJS/Jest consumers. Held as already-held: EDITORS pins 0.51.0 and already says "0.x — pin minors"; the ESM switch is the kind of minor-line break that caveat exists for.
- **Mantine 9.7 / MUI 9.5** — held: minors, the same-tier row names no version-specific fact.
- **redux.js.org consolidation** — checked whether any entry cites the old redux-toolkit.js.org host (a dead-link risk): none does. Held.
- **TanStack Charts catalog / React Charts** — held: Charts 1.0 is held; the legacy site is history.
- **julesblom / jimmyhmiller / React Aria Sheet / ts-rust / Deno** — same verdicts and reasons as the twir-301 advocate pass.

Flips: **none**.
