# Harvest manifest — React Status #498 (prepped 2026-11-25)
issue: https://react.statuscode.com/issues/498

Pre-triaged by `harvest prep`: 37 external links · 1 pre-dispositioned (corpus + prior-manifest cross-ref) · **36 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [https://sentry.io/resources/automated-debugging/?amp%3Butm_medium=paid-community&amp%3Butm_campaign=automateddebugging-fy27q4-evergreen&amp%3Butm_content=newsletter-primary-resource-hub-learnmore](https://sentry.io/resources/automated-debugging/?amp%3Butm_medium=paid-community&amp%3Butm_campaign=automateddebugging-fy27q4-evergreen&amp%3Butm_content=newsletter-primary-resource-hub-learnmore) | skipped: sponsor (Sentry automated-debugging placement) |
| [https://xyflow.com/blog/react-flow-13-major-release](https://xyflow.com/blog/react-flow-13-major-release) | skipped: off-scope (React Flow 13, first major in two years with useNode for fewer re-renders; no entry owns node-graph editors; reopen: a GAP for node/workflow editors) |
| [a migration guide](https://reactflow.dev/learn/troubleshooting/migrate-to-v13) | skipped: off-scope (React Flow 13 migration guide; same) |
| [Why Next.js Has Had 51 Security Advisories This Year](https://nextjs.org/blog/how-were-using-ai-to-make-nextjs-more-secure) | already-held → firsthand-2026-11-25 (nextjs.org author-feed row for the same post — '51 advisories this year, 70% in code at least a year old') |
| [React2STEAL](https://opensourcemalware.com/blog/react2steal-github-actions) | **kept** → RB-E-SECURITY note (React2STEAL: an automated campaign running on hijacked GitHub accounts' Actions runners, scanning for and exploiting the long-patched React2Shell CVE-2025-55182 and the Next.js middleware bypass CVE-2025-29927, writing stolen env/AWS/AI keys back into public repos; 45 repos since 2026-10-22, at least 1,281 victim hostnames; verified 2026-11-25, datePublished 2026-11-18) |
| [Here's what to check](https://www.chainguard.dev/unchained/react2steal-what-it-is-and-what-to-check) | **kept** → RB-E-SECURITY sources (Chainguard's what-to-check: confirm fixed versions, check request logs for the scanner's fingerprints, rotate every secret a matching server could reach; dev/staging/admin hosts are a large share of victims; verified 2026-11-25, dated 2026-11-18) |
| [Remotion Studio is Now a Visual Editor That Writes Back to Code](https://www.remotion.dev/blog/make-videos-programmatically-interactively-and-agentically) | skipped: off-scope (programmatic video tooling; RB-E-MEDIA owns capture/playback/calling, not video authoring) |
| [Your own components can also join in](https://www.remotion.dev/docs/studio/make-component-interactive) | skipped: off-scope (Remotion Studio docs) |
| [When an Import Becomes a Zip Bomb: Catching Bundle Regressions in Next.js](https://bra31k.dev/en/blog/bundle-size-regressions/) | skipped: how-to (per-route JS budgets in CI for Next.js) |
| [React 19.3's View Transitions, Tested: What Actually Animates?](https://devtrillo.com/writing/react-19-3-view-transitions/) | skipped: how-to (what <ViewTransition> animates — Transition-marked updates only; REACT-CORE already states exactly that) |
| [Shared Element Transitions Grow Up in Reanimated 4.8](https://swmansion.com/blog/shared-element-transitions-in-reanimated-4-8-0/) | already-held → firsthand-2026-11-25 (swmansion.com author-feed row for the same post + react-native-reanimated 4.7.1 → 4.8.0 event) |
| [https://react-anatomy.com/](https://react-anatomy.com/) | skipped: too-early (DevTools extension exploding a page into 3D layers) |
| [Stepperize 9.0: Type-Safe Multi-Step Flows for React](https://stepperize.com/) | skipped: too-early (multi-step flow library; FORMS does not grade wizard libs; reopen: a FORMS gap for multi-step flows) |
| [Fate 2.0: The Async React Data Client Now Handles Client State Too](https://fate.technology/posts/whats-new-in-fate-2.0) | skipped: too-early (Fate 2.0, a Relay-inspired async data client now with client/offline state; one named production user, the author's own game; reopen: adoption beyond the author — then an RB-E-DATA option row) |
| [Athena Crisis](https://athenacrisis.com/) | skipped: off-scope (the author's game) |
| [Detent: A Wheel Picker for React with Real Inertia](https://detent.hayder.sh/) | skipped: too-early (wheel-picker component) |
| [https://github.com/recharts/recharts/releases/tag/v3.11.0](https://github.com/recharts/recharts/releases/tag/v3.11.0) | already-held → firsthand-2026-11-25 (recharts 3.10.1 → 3.11.1 event) |
| [context-based themes](https://recharts.github.io/en-US/guide/theming/) | skipped: how-to (Recharts theming guide) |
| [React Router 8.5.2](https://github.com/remix-run/react-router/releases/tag/react-router%408.5.2) | **kept** → RB-E-NAV React Router security floor (seven advisories published 2026-11-18, four high — route-matching DoS, Node request-handling DoS, route-discovery DoS, data-deserialization prototype pollution — plus RSC-redirect XSS, server-action CSRF bypass, loader/action open redirect; floors move to react-router ≥8.5.1 / @react-router/* ≥8.3.1 on v8 and react-router ≥7.18.5 / @react-router/node+serve ≥7.18.6 on v7 — verified vs the repo-scoped GHSA API + npm 2026-11-25; 8.5.1 and 7.18.5 published 2026-10-27, 8.5.2 / 7.18.6 2026-11-18) |
| [7.18.6](https://github.com/remix-run/react-router/releases/tag/react-router%407.18.6) | **kept** → RB-E-NAV (the v7 half of the same floor raise; same receipts) |
| [seven security advisories](https://github.com/remix-run/react-router/security) | **kept** → RB-E-NAV sources (the advisories index; GHSA ids in proposals-rs.md) |
| [You Might Not Need an Effect 1.2](https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect/releases/tag/v1.2.0) | skipped: corroboration (RB-E-DX already carries the plugin; 1.2 'sees through' third-party effect wrappers — a minor) |
| [ka-table 13.0](https://github.com/komarovalexander/ka-table/releases/tag/13.0.0) | skipped: off-scope (table component major; no entry grades table components) |
| [Redux Toolkit 2.15](https://github.com/reduxjs/redux-toolkit/releases/tag/v2.15.0) | already-held → firsthand-2026-11-25 (@reduxjs/toolkit 2.13.0 → 2.15.0 event; per-store RTK Query runtime is that row's fact — the 3.0 roadmap is kept from #496) |
| [React Native Bottom Sheet 1.0](https://swmansion.com/changelog/react-native-bottom-sheet-1-0-0/) | already-held → firsthand-2026-11-25 (⚡ @swmansion/react-native-bottom-sheet ≥1.0.0 tripwire, RB-E-SHEETS) |
| [Expo Simulators](https://try.expo.dev/3UGcylH) | skipped: sponsor (Expo Simulators classified) |
| [Fimo](https://fimo.ai/?amp%3Butm_medium=newsletter&amp%3Butm_campaign=agents-launch&amp%3Butm_content=nov20) | skipped: sponsor (Fimo classified) |
| [Hyperserve's API](https://hyperserve.io/?amp%3Butm_medium=newsletter&amp%3Butm_campaign=classified_nov20) | skipped: sponsor (Hyperserve classified) |
| [experimenting with Switchyard](https://github.com/vercel/next.js/pull/101695) | skipped: pre-ship (Switchyard, an experimental Go server in front of `next start`; reopen: documented for self-hosting) |
| [sits in front of next start](https://github.com/vercel/next.js/pull/102035) | skipped: pre-ship (second Switchyard PR; same reopen) |
| [Solid 2.0 is now stable](https://www.solidjs.com/blog/solid-2-0-the-long-hold/) | already-held → firsthand-2026-11-25 (⚡ solid-js ≥2.0.0 tripwire, RB-E-ALT-FRAMEWORKS) |
| [serves much less metadata](https://www.vlt.io/blog/registry-metadata-70-percent-smaller) | skipped: off-scope (npm registry mirror metadata) |
| [it's open for all to use](https://vlt.io/blog/free-public-npm-mirror) | skipped: off-scope (public npm mirror) |
| [PostgreSQL 19 is finally here!](https://www.postgresql.org/about/news/postgresql-19-released-3449/) | skipped: off-scope (PostgreSQL 19) |
| [Postgres Weekly covered it in depth this week](https://postgresweekly.com/issues/674) | skipped: sponsor (sister-newsletter cross-promotion) |
| [npkill 1.0](https://zaldih.com/en/post/npkill-1-0-0/) | skipped: off-scope (npkill 1.0 cache cleaner) |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Advocate pass (2026-11-25)

Judged every row. Keeps: React Router's seven advisories (a one-liner in the tools list) and React2STEAL (an "In related news" line under the Next.js security headline). The headline (React Flow 13) is off-scope.
Re-argued:
- **React Flow 13** — a popular lib's first major in two years; held off-scope: no entry owns node/workflow editors, and a GAP from a single release is premature.
- **Fate 2.0** — Relay-inspired data client; held too-early (only the author's own game as a named user).
- **Switchyard** — self-hosting relevance; held pre-ship (experimental PRs).
- **You Might Not Need an Effect 1.2** — DX already carries the plugin; minor; held.
Flips: **none**.
