# Harvest manifest — React Status #488 (prepped 2026-09-01)
issue: https://react.statuscode.com/issues/488

Pre-triaged by `harvest prep`: 42 external links · 12 pre-dispositioned (corpus + prior-manifest cross-ref) · **30 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [What We Learnt Building a Data Grid in React, Vue, and Svelte](https://svar.dev/blog/building-data-grid-in-react-vue-svelte/) | skipped: vendor how-to (SVAR sells the grid; cross-framework build diary, no selection fact) |
| [Canary](https://react.dev/community/versioning-policy) | skipped: corroboration (canary-channel policy docs, unchanged; context link for the browser() item) |
| [a browser() API](https://react.dev/reference/react-dom/browser) | kept: RB-E-REACT-CORE note — browser() canary API (use(browser()) marks a Client Component browser-only; Suspense fallback during SSR; replaces typeof-window/mounted-state hacks; canary-only caveat + source added) |
| [learn more about them here](https://github.com/react/react/pull/35392) | skipped: corroboration (the PR behind the kept browser() reference; the react.dev doc is the cited source) |
| [React Native Filament](https://margelo.github.io/react-native-filament/) | kept: RB-E-GAMES option row — Filament PBR renderer as declarative components (Metal/OpenGL-Vulkan, ~4MB, verified vs docs + npm/GitHub); QUIET-since-May caveat disclosed (1.11.0, no publish/push in ~3mo) |
| [Making React Testing Library Tests 43% Faster](https://sigh.dev/posts/making-react-testing-library-faster/) | kept: RB-E-TESTING reading — 43% RTL speedup landed UPSTREAM in jsdom (label index, selector fast path, event dispatch); reframes slow-RTL as a jsdom-version problem |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | skipped: docs link (Oxlint facts already held in RB-E-DX) |
| [Rules of React](https://react.dev/reference/rules) | skipped: docs link (Rules of React, held knowledge) |
| [Waku 1.0 RC: The Minimal React Framework Freezes Its API](https://waku.gg/blog/waku-v1-rc) | kept: RB-E-META-FRAMEWORKS source — first-party RC post behind the beta→rc flip landed via firsthand this same pass (API freeze corroborated) |
| [Rifm 1.0: React Input Format and Mask](https://trysound.github.io/rifm/) | skipped: cap (input-mask micro-lib at 1.0; FORMS holds no masking facet and one milestone isn't demand — reopen: recurrence or a masking gap surfacing in evidence/doctor) |
| [TanStack Query Adds Simpler query and infiniteQuery Methods](https://github.com/TanStack/query/pull/10658) | kept: RB-E-DATA note — 5.102 query()/infiniteQuery() supersede fetchQuery/fetchInfiniteQuery, deprecate prefetchQuery/ensureQueryData (additive; respect select/skipToken); PR added as source |
| [5.102.0](https://github.com/TanStack/query/releases/tag/release-2026-08-22-1856) | skipped: corroboration (release tag for the kept 5.102 PR fact) |
| [billed by Dominik](https://bsky.app/profile/tkdodo.eu/post/3mtoxwkypvs2n) | skipped: social ephemera |
| [Ionic Framework v9](https://ionic.io/blog/announcing-ionic-framework-9) | skipped: off-scope (corpus tracks Capacitor as a shell, not Ionic Framework UI; Ionic 9's React Router 6 support + React 18+ floor don't touch held picks — verified vs the announce) |
| [an upgrade guide for v8 users](https://ionicframework.com/docs/updating/9-0) | skipped: how-to (upgrade guide) |
| [GTKX 1.5](https://gtkx.dev/blog/gtkx-1-5) | kept: RB-E-DESKTOP GTKX row — 1.5 adds @gtkx/forms (RHF/Adwaita, typed) + @gtkx/i18n (gettext behind react-i18next API), no breaking; npm pin 1.2.2 → 1.6.0 (2026-08-29, verified) |
| [Streamdown 2.6](https://github.com/vercel/streamdown/releases/tag/streamdown%402.6.0) | skipped: routine minor (AI-UI row is unpinned) |
| [Homepage](https://streamdown.ai/) | skipped: corroboration (project homepage) |
| [react-jsonschema-form 6.8](https://github.com/rjsf-team/react-jsonschema-form) | skipped: routine minor |
| [nuqs 2.10](https://github.com/47ng/nuqs) | skipped: routine minor |
| [Material UI 9.4](https://github.com/mui/material-ui/releases/tag/v9.4.0) | skipped: routine minor |
| [chat.agent on Trigger.dev](https://fandf.co/3Sq6so6) | skipped: sponsor (Trigger.dev tracking link) |
| [answering user-submitted questions](https://www.reddit.com/r/nextjs/comments/1vrq0tp/were_the_nextjs_team_ask_us_anything/) | skipped: forum ephemera (AMA thread; no durable fact beyond held Next.js positions) |
| [Why no 'proper middleware' or GET Server Actions?](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4feoa5/) | skipped: forum ephemera (AMA answer) |
| ['I agree that it has gotten more complicated over the years'](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4fu9st/) | skipped: forum ephemera (AMA answer) |
| [Built-in pagination and infinite loading?](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4f7pqj/) | skipped: forum ephemera (AMA answer) |
| [SWR](https://vercel.com/oss/swr) | skipped: corroboration (SWR project page; RB-E-DATA already positions it) |
| [What the team is most excited about next](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4fqlki/) | skipped: forum ephemera (AMA answer) |
| ['TanStack Start is pretty good too'](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4fl9ah/) | skipped: forum ephemera (AMA answer) |
| [did one a decade ago](https://www.reddit.com/r/IAmA/comments/3wyb3m/we_are_the_team_working_on_react_native_ask_us/) | skipped: historical ephemera (2015 RN AMA) |
| [https://www.tigerdata.com/go/trial?amp%3Butm_medium=referral&amp%3Butm_campaign=react-status-newsletter](https://www.tigerdata.com/go/trial?amp%3Butm_medium=referral&amp%3Butm_campaign=react-status-newsletter) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [https://lovable.dev/blog/how-we-migrated-lovable-dev-away-from-nextjs](https://lovable.dev/blog/how-we-migrated-lovable-dev-away-from-nextjs) | already-held: RB-E-META-FRAMEWORKS |
| [Two critical unauthenticated RCEs affecting Next.js have been patched.](https://nextjs.org/blog/august-2026-security-release) | already-held: RB-E-META-FRAMEWORKS |
| [Parallel transitions are now on by default](https://github.com/react/react/pull/37290) | previously skipped (pre-ship) — carry over unless a reopen signal applies |
| [Reliable Query Prefetching with TanStack Router](https://tkdodo.eu/blog/reliable-query-prefetching-with-tanstack-router) | already-held: RB-E-DATA |
| [Building App-like Experiences with Next.js 16.3](https://nextjs.org/blog/building-app-like-experiences-with-nextjs-16-3) | previously skipped (how-to) → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS — carry over unless a reopen signal applies |
| [Building a 3D AI Avatar in React Native](https://margelo.com/blog/building-a-3d-ai-avatar-in-react-native) | previously skipped (how-to) → RB-E-ANIMATION, RB-E-NATIVE — carry over unless a reopen signal applies |
| [Coordinating Optimistic Updates in Next.js](https://aurorascharff.no/posts/coordinating-optimistic-updates-in-nextjs/) | already-held: RB-E-DATA |
| [Oxlint Gets React Compiler Support](https://oxc.rs/blog/2026-08-18-react-compiler-support) | already-held: RB-E-DX |
| [Playground](https://rjsf-team.github.io/react-jsonschema-form/) | previously skipped (minor-release) → RB-E-FORMS — carry over unless a reopen signal applies |
| [Reserve your spot!](https://reactsummit.us/?amp%3Butm_medium=reactstatus) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
