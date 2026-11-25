# Harvest manifest — React Status #494 (prepped 2026-11-25)
issue: https://react.statuscode.com/issues/494

Pre-triaged by `harvest prep`: 46 external links · 12 pre-dispositioned (corpus + prior-manifest cross-ref) · **34 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://master.dev/courses/typescript-ai/?amp%3Butm_medium=reactstatus&amp%3Butm_content=typescriptcooper](https://master.dev/courses/typescript-ai/?amp%3Butm_medium=reactstatus&amp%3Butm_content=typescriptcooper) | skipped: sponsor (Master.dev course placement, 'TypeScript in the Age of AI') |
| [The same app in Start and Next.js 16.4, benchmarked](https://www.fabwaseem.com/blog/tanstack-start-vs-nextjs) | skipped: corroboration (one author's single-app Start vs Next.js 16.4 benchmark, 2.9x–8.6x dynamic req/s; META-FRAMEWORKS already holds TanStack Start 1.0 stable and the e18e Framework Performance tracker kept from #497 is the maintained, maintainer-reviewed version of this comparison; reopen: e18e's runtime numbers diverge from this) |
| [migrating from Next.js](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js) | skipped: how-to (official Next.js → Start migration guide; docs, not a selection fact — META-FRAMEWORKS holds Start 1.0) |
| [from the RC](https://tanstack.com/start/latest/docs/framework/react/migrate-from-release-candidate) | skipped: how-to (RC → 1.0 migration guide; RC users only) |
| [moved his site over from Astro](https://sarthakmishra.com/blog/astro-to-tanstack-start) | skipped: corroboration (one personal site's Astro → Start move; no measurement the entry lacks) |
| [here's how one went](https://sesam.hu/post/down-the-rabbit-hole-tanstack-start-migration) | skipped: corroboration (a Lovable-project migration anecdote; same reason) |
| ["a React metaframework with an architecture I can get behind"](https://bsky.app/profile/ryansolid.bsky.social/post/3mxrordjou22l) | skipped: unverifiable (Bluesky post, JS-rendered; a quote of opinion only — adds no fact) |
| [the r/reactjs thread](https://www.reddit.com/r/reactjs/comments/1x52hc9/tanstack_start_10_is_finally_stable/) | skipped: off-scope (forum thread; its one fact — '1.0' publishes as 1.169.x on npm — is already how META-FRAMEWORKS pins Start) |
| [a public PoC](https://hash-sec.com/blog/the-use-cache-rce-how-a-typed-array-bug-in-nextjs-became-remote-code-execution) | already-held → RB-E-SECURITY / RB-E-META-FRAMEWORKS (GHSA-673q-mjm6-r5xr / GHSA-xqc2-xf4c-x3h3 'use cache' typed-array RCE, floors 19.3.1 / Next 16.4.1 kept 2026-10-15; this is a third-party writeup with a public PoC, verified 2026-11-25, datePublished 2026-10-17 — the PoC being public is folded into the React2STEAL proposal from #498 as exploitation context, not a new receipt) |
| [React DevTools for agents now has official docs](https://react.dev/reference/dev-tools/react-devtools-cdt-mcp) | already-held → RB-E-AI-DEVTOOLS (react-devtools-cdt-mcp row, sourced from its GitHub README; the react.dev reference page is the same tool's official docs — TWiR #302 carries the same link, adjudicated there) |
| [Expo SDK 58](https://expo.dev/changelog/sdk-58) | already-held → firsthand-2026-11-25 (expo 57.0.29 → 58.0.26 event; the SDK 58 stable flip in RB-E-RN-VERSIONS belongs to that row and to the RN 0.88 tripwire) |
| [React Native 0.88](https://reactnative.dev/blog/2026/10/19/react-native-0.88) | already-held → firsthand-2026-11-25 (⚡ react-native ≥0.88.0 tripwire + the reactnative.dev author-feed row for the same post) |
| [TypeScript 7.1 is now in beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/) | skipped: pre-ship (typescript 7.1.0-beta 2026-10-20 on npm, `latest` still 7.0.2 on 2026-11-25; RB-E-TYPESCRIPT's 'alias @typescript/typescript6 until TS 7.1 ships its new API' advice is conditioned on the STABLE 7.1; reopen: typescript ≥7.1.0 on latest — proposed as a tripwire in proposals-rs.md) |
| [Improving Navigation Experience in v0 with Next.js 16.4](https://nextjs.org/blog/improving-navigation-experience-in-v0-with-nextjs-16-4) | skipped: corroboration (Vercel applying Next 16.4's Partial Prefetching / navigation() to its own v0 app; META-FRAMEWORKS holds the 16.4 features from the Next blog) |
| [React Only Where Needed: Owner's Next.js to Astro Move](https://building.owner.com/project-speed) | **kept** → RB-E-META-FRAMEWORKS reading (Owner moved 10,000+ restaurant sites from Next.js to Astro on Cloudflare Workers with React only in islands; menu-page p75 LCP 5.4s → 0.7s; considered Remix, TanStack Start, Gatsby; verified 2026-11-25, datePublished 2026-10-13) |
| [Dead Code Shouldn't Exist](https://tkdodo.eu/blog/dead-code-shouldnt-exist) | already-held → firsthand-2026-11-25 (tkdodo.eu author-feed row for the same post; Knip as a DX gap is that row's call) |
| [Knip](https://knip.dev/) | skipped: corroboration (tool homepage linked from the TkDodo talk; adjudicated with the firsthand tkdodo.eu row — no entry names Knip yet, flagged in proposals-rs.md as a possible RB-E-DX option row) |
| [Testing AI-Generated Code: Lint the Pattern, Test the Decision](https://www.robinwieruch.de/testing-ai-generated-code/) | skipped: how-to (opinion/how-to on lint rules + shared harnesses for agent-written components; no selection fact) |
| [Apple Didn't Invent the Foldable. It Might Make You Support One.](https://shift.infinite.red/apple-didnt-invent-the-foldable-it-might-make-you-support-one-7a00c142e77d) | skipped: too-early (getting RN apps ready for an announced iPhone foldable's compatibility tiers; reopen: the device ships and Apple publishes the adaptive-layout requirements) |
| [https://pixelgui.com/](https://pixelgui.com/) | skipped: too-early (Pixel, a new React terminal renderer for Kitty-graphics terminals; no adoption signal; reopen: a release line + a named adopter) |
| [TanStack Hotkeys Beta: A Type-Safe Library for Keyboard Shortcuts](https://tanstack.com/hotkeys/latest) | skipped: pre-ship (TanStack Hotkeys is in beta; no entry owns keyboard shortcuts on the web; reopen: 1.0) |
| [scopes](https://tanstack.com/hotkeys/latest/docs/framework/react/guides/hotkeys-provider-and-scopes) | skipped: pre-ship (docs page for the beta's scopes; same reopen) |
| [Migrating](https://reactrouter.com/how-to/view-transitions) | already-held → firsthand-2026-11-25 (react-router 8.4.0 → 8.5.3 event; RR 8.5 deprecating its own view-transition APIs for React 19.3 <ViewTransition> is that row's fact) |
| ['API-only' mode](https://reactrouter.com/start/framework/rendering) | skipped: pre-ship (unstable 'API-only' rendering mode; reopen: stabilised) |
| [https://www.env.style/](https://www.env.style/) | skipped: off-scope (build-time per-environment favicon tint) |
| [Hydrogen 2026.10](https://shopify.dev/changelog/blog/hydrogen-2026-10-is-now-available) | **kept** → RB-E-META-FRAMEWORKS note LANDSCAPE (Hydrogen 2026-10 GA 2026-10-14: now a framework-agnostic library added to existing React Router / Next.js apps, not a framework to replatform onto; @shopify/hydrogen 2026.10.3 latest, verified vs npm 2026-11-25) |
| [Morphicons 2.0](https://github.com/guillermolg00/morphicons/releases/tag/v2.0.0) | skipped: too-early (Morphicons 2.0; the homepage was skipped too-early twir-29x — same reopen: adoption beyond the author) |
| [Unistyles 3.6](https://github.com/jpudysz/react-native-unistyles/releases/tag/v3.6.0) | already-held → firsthand-2026-11-25 (react-native-unistyles 3.5.3 → 3.8.2 event; 3.6's experimental zero-config Metro integration is that row's fact) |
| [Ship your first agent with Trigger.dev](https://fandf.co/3TQVp8p) | skipped: sponsor (Trigger.dev classified) |
| [https://xyflow.com/strudel-flow](https://xyflow.com/strudel-flow) | skipped: off-scope ('And finally' music toy) |
| [React Flow](https://reactflow.dev/) | skipped: off-scope (React Flow homepage in the Strudel item; React Flow 13 is judged on #498's row) |
| [Strudel](https://strudel.cc/) | skipped: off-scope (live-coding music environment) |
| [source code](https://github.com/xyflow/strudel-flow) | skipped: off-scope (source for the music toy) |
| [the team says](https://xyflow.com/blog/strudel-flow-version-2) | skipped: off-scope (Strudel Flow 2 post) |
| [https://tanstack.com/blog/tanstack-start-1-0](https://tanstack.com/blog/tanstack-start-1-0) | already-held: RB-E-META-FRAMEWORKS |
| [tanstack.com](https://tanstack.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Next.js patched two critical RCEs](https://nextjs.org/blog/nextjs-security-update-october-14-2026) | already-held: RB-E-META-FRAMEWORKS |
| [React Native for Web has active maintainers again](https://github.com/necolas/react-native-web/discussions/2872) | already-held: RB-E-CROSSPLATFORM |
| [v0](https://v0.app/) | previously skipped (other) — carry over unless a reopen signal applies |
| [Loading a 9MB WebAssembly Module Earlier Made Recraft's Editor 17% Faster](https://bra31k.dev/en/blog/same-bytes-17-percent-faster) | previously skipped (how-to) — carry over unless a reopen signal applies |
| [React Router 8.5 Hands View Transitions Over to React](https://reactrouter.com/changelog) | previously skipped (corroboration) — carry over unless a reopen signal applies |
| [Tamagui 3: One React UI Codebase for Web and Native](https://tamagui.dev/blog/version-three) | previously already-held → RB-E-STYLING, RB-E-CROSSPLATFORM — carry over unless a reopen signal applies |
| [See it in action on its homepage](https://www.morphicons.com/) | previously skipped (too-early) → RB-E-SVG, RB-E-POLISH — carry over unless a reopen signal applies |
| [Motion 14.6](https://motion.dev/changelog) | previously skipped (other) — carry over unless a reopen signal applies |
| [Expo is mobile AI infrastructure](https://try.expo.dev/4zgin86) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Advocate pass (2026-11-25)

Judged every row, headline to "And finally". The two keeps here were mid-list (Owner in the article block, Hydrogen in the one-liners); the headline (TanStack Start 1.0) was already held.
Re-argued:
- **TypeScript 7.1 beta** — the one item that touches a standing caveat (RB-E-TYPESCRIPT: alias TS 6 for compiler-API tools "until TS 7.1 ships its new API"). Held: that clause turns on the STABLE 7.1 (npm `latest` is still 7.0.2); wired as a proposed tripwire instead.
- **Knip / Dead Code Shouldn't Exist** — no entry names Knip (a real DX gap: Sentry removed 28K lines with it). Held here because the same post arrives as the firsthand tkdodo.eu row, which owns the call; flagged in proposals-rs.md so it is not lost between the two manifests.
- **fabwaseem Start vs Next benchmark** — held: one author, one app; the e18e tracker (kept #497) is the maintained version.
- **TanStack Hotkeys / RR API-only mode / Pixel / foldable prep** — beta, unstable, too-early or pre-device; held.
Flips: **none**.

## Spot-check of react-status-493 (2026-11-25)

No `cap` skips and no `[rule:*]` rows in that manifest. Re-adjudicated 2 random skips: **React Folder Structure (Wieruch)** — how-to, upheld; **React Aria swipeable Sheet** — off-scope (RB-E-SHEETS is RN-only), upheld. Bonus: **Material UI 9.5** corroboration upheld (Den Odell's #495 benchmark tested exactly @mui/material 9.5.0, so the version row stays accurate). Corrections: none.
