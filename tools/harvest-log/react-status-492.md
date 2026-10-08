# Harvest manifest — React Status #492 (prepped 2026-10-01)
issue: https://react.statuscode.com/issues/492

Pre-triaged by `harvest prep`: 39 external links · 12 pre-dispositioned (corpus + prior-manifest cross-ref + 1 by triage rules) · 27 judged below.

| item | disposition |
|---|---|
| [desktop Copilot app](https://github.com/features/ai/github-app) | skipped: off-scope (GitHub's own product page, not a React/RN technical fact) |
| [Redact: An Alternative 'Projection' of React](https://github.com/TanStack/redact) | kept → RB-E-REACT-CORE (corrected @tanstack/redact's figures: 0.1.0, 23.3KB vs React's 69.2KB gzipped — 66% smaller, synchronous not concurrent, useOptimistic/useFormStatus no-ops, production on tanstack.com/tannerlinsley.com — the prior "~9KB, claims 2-3x" was unverified) |
| [explained how he'd built](https://tannerlinsley.com/posts/projecting-react) | kept → RB-E-REACT-CORE (primary-source receipt for the Redact correction above) |
| [this Japanese blog post](https://azukiazusa.dev/blog/what-is-tanstack-redact/) | skipped: corroboration (duplicate anchor of the Redact row above, secondary summary) |
| [reaches v7.0](https://github.com/withastro/astro/releases/tag/@astrojs/react@7.0.0) | skipped: corroboration (Astro-internal migration to @vitejs/plugin-react v6 + Oxc for JSX/Fast Refresh, removes the Babel integration option — an Astro build-tooling detail, not tracked at that depth; RB-E-META-FRAMEWORKS' Astro row is a one-line mention) |
| [made its bug bounty program public](https://vercel.com/blog/the-vercel-bug-bounty-program-is-now-publicly-available) | skipped: corroboration (private HackerOne + separate OSS program merged into one public program covering the whole Vercel platform + OSS incl. Next.js; supports RB-E-SECURITY's existing "Vercel's Open Source Bug Bounty" citation, no new actionable fact for app builders) |
| [Alpha 1](https://github.com/reduxjs/react-redux/releases/tag/v9.4.0-alpha.1) | skipped: pre-ship (bugfixes to the still-alpha, opt-in useSignalSelector; "Provider/useSelector unchanged" per the release notes — same disposition as the alpha.0 row it carries forward from. Reopen: a stable/non-alpha release) |
| [Props Are Not a Design System](https://vitonsky.net/blog/2026/09/18/design-system/) | kept → RB-E-COMPONENT-LIBS reading (variants/modifiers as the enumerable, semantic component-API surface vs raw style props) |
| [AI, Open Source, and the Long Road to TanStack Charts](https://tannerlinsley.com/posts/ai-open-source-and-the-long-road-to-tanstack-charts) | skipped: too-early (pre-alpha, no published package yet — scene-graph + reactivity approach, explicitly distinct from react-charts/Chart.js. Reopen: a published @tanstack/charts release) |
| [https://github.com/seek-oss/playroom](https://github.com/seek-oss/playroom) | skipped: corroboration (established tool, 4.6k★, actively maintained; no version-specific news in this issue, adjacent to Storybook's niche already owned by RB-E-TESTING) |
| [Check out this live demo](https://cubes.trampoline.cx/) | skipped: off-scope (a demo page, not a library) |
| [v5](https://github.com/FormidableLabs/react-live/releases/tag/react-live%405.0.0) | skipped: too-early/cap (code-playground library, not currently tracked by any entry; no existing home. Reopen: if a tracked docs/playground entry is ever opened) |
| [React Live](https://nearform.com/open-source/react-live/docs) | skipped: corroboration (duplicate anchor of the row above) |
| [pdfcn: Copy-Paste Components for Making PDFs](https://www.pdfcn.dev/) | skipped: too-early (shadcn-style copy-paste PDF components built on Takumi + Forme; no stars/downloads/adoption signal found for any of the three. GAP noted in the ledger: PDF generation for React has no corpus entry. Reopen: any of the three shows real adoption) |
| [Takumi](https://takumi.kane.tw/docs/pdf) | skipped: too-early (same cluster as pdfcn above — underlying PDF rendering engine, unverified adoption) |
| [Forme](https://docs.formepdf.com/quickstart) | skipped: too-early (same cluster as pdfcn above — form-filling layer, unverified adoption) |
| [loading-dev: CSS-Animated Loading Indicators for React](https://loading.dev/) | skipped: off-scope (a spinner/loading-indicator collection, below this corpus's granularity) |
| [customize and play with](https://loading.dev/spinners/wave) | skipped: off-scope (duplicate anchor of the row above) |
| [gridstack.js 14.0](https://github.com/gridstack/gridstack.js/releases/tag/v14.0.0) | skipped: off-scope (drag-and-drop dashboard-grid library, not currently tracked by any entry; no existing home) |
| [Demos](https://gridstackjs.com/demo/index.html) | skipped: off-scope (duplicate anchor of the row above) |
| [Frimousse 0.4](https://frimousse.liveblocks.io/) | skipped: off-scope (an emoji-picker component, below this corpus's granularity) |
| [all on Expo](https://try.expo.dev/46pyy6B) | skipped: off-scope (a live demo snack link, not a library fact) |
| [See you in Berlin & online, Dec 4 & 7!](https://reactday.berlin/?amp%3Butm_medium=reactstatus) | skipped: off-scope (conference promotion) |
| [Build products that help people build their lives](https://jobs.fidelity.com/en/technology-careers/) | skipped: sponsor (job-ad placement, not evaluated) |
| [https://guokaigdg.github.io/animal-island-ui/](https://guokaigdg.github.io/animal-island-ui/) | skipped: off-scope (a UI library that drew a Nintendo DMCA takedown over its branding/assets — a trivia story, not a durable React/RN technical pattern) |
| [issued a DMCA takedown](https://github.com/github/dmca/blob/master/2026/09/2026-09-03-nintendo.md) | skipped: off-scope (duplicate anchor of the row above) |
| [GitHub README](https://github.com/guokaigdg/animal-island-ui) | skipped: off-scope (duplicate anchor of the row above) |

| [https://coderabbit.link/ad-cooperpress-003](https://coderabbit.link/ad-cooperpress-003) | sponsor (tracking link, not evaluated) [rule:sponsor-tracking-domain] |
| [https://github.blog/engineering/user-experience/rendering-huge-pull-requests-in-the-github-copilot-app/](https://github.blog/engineering/user-experience/rendering-huge-pull-requests-in-the-github-copilot-app/) | previously skipped (off-scope) — carried, no reopen signal |
| [Tauri](https://v2.tauri.app/) | already-held → RB-E-DESKTOP — carried, no reopen signal |
| [Next.js 16.3.6](https://nextjs.org/blog/nextjs-security-update-september-22-2026) | already-held → RB-E-META-FRAMEWORKS — superseded this pass by the full September-release keep (firsthand-2026-10-01.md) |
| [A scheduled release next week](https://nextjs.org/blog/upcoming-nextjs-security-release-september-2026) | already-held → RB-E-META-FRAMEWORKS — superseded this pass by the full September-release keep (firsthand-2026-10-01.md) |
| [Astro](https://astro.build/) | previously skipped (other) — carried, no reopen signal |
| [React-Redux 9.4 Alpha Adds Opt-In useSignalSelector](https://github.com/reduxjs/react-redux/releases/tag/v9.4.0-alpha.0) | previously skipped (pre-ship) — carried; see the Alpha 1 row above for this issue's follow-up |
| [Helix: How Shopify is Using LLMs to Move Its App Off React Native](https://shopify.engineering/helix) | already-held → RB-E-AI-DEVTOOLS — carried, no reopen signal |
| [recently announced migration](https://shopify.engineering/back-to-native) | already-held → RB-E-CROSSPLATFORM, RB-E-ANIMATION, RB-E-LISTS — carried, no reopen signal |
| [React Native Reanimated 4.7](https://github.com/software-mansion/react-native-reanimated/releases/tag/4.7.0) | already-held → RB-E-ANIMATION — carried, no reopen signal |
| [React Three Fiber 9.8](https://github.com/pmndrs/react-three-fiber/releases/tag/v9.8.0) | already-held → RB-E-GAMES — carried, no reopen signal |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carried, no reopen signal |
