# Harvest manifest — React Status #495 (prepped 2026-11-25)
issue: https://react.statuscode.com/issues/495

Pre-triaged by `harvest prep`: 38 external links · 2 pre-dispositioned (corpus + prior-manifest cross-ref) · **36 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://denodell.com/blog/design-systems-should-be-fast-by-default](https://denodell.com/blog/design-systems-should-be-fast-by-default) | **kept** → RB-E-COMPONENT-LIBS reading (Den Odell timed ten design systems at 4x CPU throttle, Oct 2026 versions: opening a 249-country selector took 84ms Mantine 9.7.1, 134ms Ant Design 6.6.5, 208ms Material UI 9.5.0, 227ms React Spectrum 3.47.6; 100 checkboxes: Ant Design ~6x Material UI; framework alone did not predict results; verified 2026-11-25, datePublished 2026-10-27) |
| [filed an issue](https://github.com/adobe/react-spectrum/issues/10858) | skipped: corroboration (the React Aria per-option layout-measurement issue Den filed; folded into the kept reading) |
| [a fix is in review](https://github.com/adobe/react-spectrum/pull/10886) | skipped: pre-ship (open fix PR; reopen: merged and released in react-aria-components — then the reading's React Spectrum number is historical) |
| [Den's Playwright tests are available on GitHub](https://github.com/denodell/design-system-performance-tests) | skipped: corroboration (the Playwright perf-budget tests behind the kept reading; the reading points to them) |
| [TanStack Redact: A Smaller React for the Browser](https://tanstack.com/blog/introducing-tanstack-redact) | already-held → firsthand-2026-11-25 (tanstack.com author-feed row 'Introducing TanStack Redact'; RB-E-REACT-CORE already rates redact experimental) |
| [the compatibility guide](https://tanstack.com/redact/latest/docs/compatibility) | skipped: corroboration (redact compatibility guide — synchronous rendering, no time slicing; REACT-CORE's 'experimental, not a production bet' covers it) |
| [On r/reactjs](https://www.reddit.com/r/reactjs/comments/1xg14zx/introducing_tanstack_redact/) | skipped: off-scope (forum thread) |
| [one tester](https://github.com/TanStack/redact/issues/75) | skipped: corroboration (one tester's ~2x re-render CPU report on two production sites, an open issue; reopen: confirmed by maintainers — would harden REACT-CORE's 'not a production bet') |
| [a security release scheduled for November 3](https://nextjs.org/blog/upcoming-nextjs-security-release-november-2026) | skipped: pre-ship (pre-announcement, superseded by the published November 2026 Security Release — firsthand-2026-11-25 nextjs.org row; see #496) |
| [fuzzing React's Flight protocol](https://github.com/react/react/pull/37936) | skipped: pre-ship (Dan Abramov's Flight-protocol fuzzer PR; reopen: a React release whose notes credit fuzzer-found fixes — RB-E-SECURITY owns Flight hardening) |
| [six stream bugs](https://github.com/react/react/pull/37937) | skipped: pre-ship (fuzzer-found stream-bug fixes PR; same reopen) |
| [three writer bugs](https://github.com/react/react/pull/37939) | skipped: pre-ship (fuzzer-found writer-bug fixes PR; same reopen) |
| [TanStack AI 1.0](https://tanstack.com/blog/tanstack-ai-1-0) | already-held → firsthand-2026-11-25 (⚡ @tanstack/ai ≥1.0.0 tripwire, RB-E-AI-UI — handled by the tripwire work item) |
| [React Native Windows 0.85](https://devblogs.microsoft.com/react-native/react-native-windows-v0-85-is-here/) | already-held → firsthand-2026-11-25 (react-native-windows 0.84.0 → 0.85.2 event; 'completes its move to the New Architecture' is that row's RB-E-DESKTOP fact) |
| [Expo Desktop](https://expo-desktop-docs.vercel.app/) | already-held → RB-E-DESKTOP (expo-desktop, independent project, already tracked; firsthand-2026-11-25 carries its template release) |
| [Legend Spark](https://legend.so/spark) | skipped: too-early (Legend Spark, an RN-for-macOS product from the Legend List author; reopen: a public release with adoption signal) |
| [React.lazy , Suspense and the Hidden 300ms Startup Delay](https://tabwidgets.com/blog/react-lazy-suspense-delay) | **kept** → RB-E-REACT-CORE reading (React.lazy always suspends on first render even when its chunk is loaded, and React throttles reveals of suspended content to ~300ms, so lazy widgets loaded at ~100ms appeared at ~380ms; the fix that held was not suspending at startup; verified 2026-11-25, datePublished 2026-10-29) |
| [TanStack DB 1.0 RC1, and How 'Oracles' Found Its Bugs](https://tanstack.com/blog/tanstack-db-1.0-rc1-going-all-in-on-oracles) | already-held → firsthand-2026-11-25 (tanstack.com author-feed row + @tanstack/react-db 0.5.10 → 1.0.0-rc.1.5 event) |
| [the migration guide](https://tanstack.com/db/latest/docs/guides/migrate-to-1-0-rc) | skipped: how-to (TanStack DB 1.0-RC migration guide; the RC status flip is the firsthand row's) |
| [Ship Less JavaScript in Next.js with Your AI Agent](https://nextjs.org/blog/ship-less-javascript-with-ai) | already-held → firsthand-2026-11-25 (nextjs.org author-feed row for the same post) |
| [Porting 287,000 Lines of React to Foldkit in 3 Days](https://maple.dev/blog/react-to-foldkit/) | skipped: off-scope (porting React to a non-React framework; parity-harness lessons are generic) |
| [Async React and Progressive Server Actions](https://ebey.dev/blog/3myyseusgd22h) | skipped: how-to (progressive enhancement for server-action forms before hydration; FORMS/REACT-CORE hold the useActionState model) |
| [React Compiler in Next.js 16.4: Babel vs Rust, Benchmarked](https://www.fabwaseem.com/blog/react-compiler-nextjs) | skipped: corroboration (Babel vs Rust React Compiler in Next 16.4; the Rust-compiler speedup is held in RB-E-BUILD/REACT-CORE from primary sources) |
| [https://puckeditor.com/blog/puck-024](https://puckeditor.com/blog/puck-024) | skipped: too-early (Puck visual page editor 0.24; no entry owns page builders; reopen: 1.0 or a GAP for embeddable page builders) |
| [GitHub repo.](https://github.com/puckeditor/puck) | skipped: too-early (Puck repo; same reopen) |
| [react-window 2.5: Virtualized Lists That Scroll with the Page](https://github.com/bvaughn/react-window/releases/tag/2.5.0) | already-held → firsthand-2026-11-25 (react-window 2.3.4 → 2.5.4 event; scrollElement + headless useVirtualizer are that row's RB-E-LISTS facts) |
| [Docs and demos](https://react-window.vercel.app/) | skipped: corroboration (react-window docs/demos) |
| [Vinext 1.4: The Vite-Powered Next.js Reimplementation Gets Faster](https://vinext.dev/blog/vinext-1-4) | skipped: corroboration (Vinext 1.4 perf release; META-FRAMEWORKS holds Vinext 1.0 stable and its re-verify caveat; a vendor HN-clone benchmark does not move it) |
| [OpenTUI 0.8](https://github.com/anomalyco/opentui/releases/tag/v0.8.0) | skipped: off-scope (terminal UI library; no entry owns CLI/TUI React) |
| [OpenCode](https://opencode.ai/) | skipped: off-scope (coding agent homepage) |
| [React Hook Form 7.91](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.91.0) | already-held → firsthand-2026-11-25 (react-hook-form 7.90.0 → 7.92.0 event; v8 beta is pre-ship) |
| [React-Toastify 11.2](https://github.com/fkhadra/react-toastify/releases/tag/v11.2.0) | skipped: off-scope (toast library minor; no entry owns toasts) |
| [emoji-picker-react 5.1](https://github.com/ealush/emoji-picker-react) | skipped: off-scope (emoji picker) |
| [Live demo](https://ealush.com/emoji-picker-react/) | skipped: off-scope (emoji picker demo) |
| [https://graveyard-pinball.vercel.app/](https://graveyard-pinball.vercel.app/) | skipped: off-scope ('And finally' R3F game) |
| [explains more about how it works here](https://andersonmancini.dev/blog/graveyard-pinball) | skipped: off-scope (how the pinball demo works) |
| [https://try.expo.dev/4zgin86](https://try.expo.dev/4zgin86) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Advocate pass (2026-11-25)

Judged every row. Both keeps (Den Odell's design-system benchmark — the headline — and the React.lazy 300ms delay) carry measured numbers no entry had.
Re-argued:
- **TanStack Redact r/reactjs + issue #75 (2x re-render CPU)** — tempting as a hardening of REACT-CORE's "experimental, not a production bet", but it is one tester in an open issue; held with a reopen on maintainer confirmation.
- **Flight fuzzer PRs (Abramov)** — security-adjacent; held pre-ship: nothing released yet, and RB-E-SECURITY's floors are unaffected.
- **Puck 0.24** — no entry owns embeddable page builders; held too-early rather than opening a GAP from a 0.x release.
- **Async React / progressive server actions** — how-to; FORMS already holds the model.
Flips: **none**.
