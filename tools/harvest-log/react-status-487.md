# Harvest manifest — React Status #487 (prepped 2026-08-18)
issue: https://react.statuscode.com/issues/487

Pre-triaged by `harvest prep`: 30 external links · 5 pre-dispositioned (corpus + prior-manifest cross-ref) · **25 TODO**.
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

Processed 2026-08-18 (issue published 2026-08-13). 8 keeps across 6 entries — unusually high for
Status, because this issue carried the RN 0.87 release and two fired reopen signals (GTKX 1.0,
Biome's React-Compiler rule).

| item | disposition |
|---|---|
| [https://master.dev/courses/frontend-architecture/?amp%3Butm_medium=reactstatus&amp%3Butm_content=frontendcooper](https://master.dev/courses/frontend-architecture/?amp%3Butm_medium=reactstatus&amp%3Butm_content=frontendcooper) | skipped: sponsor (course ad with tracking params) |
| [https://tanstack.com/blog/announcing-tanstack-form-v2-alpha](https://tanstack.com/blog/announcing-tanstack-form-v2-alpha) | skipped: pre-ship — v2 ALPHA (npm latest @tanstack/react-form 1.33.5, verified 2026-08-18). Reopen: v2 stable → RB-E-FORMS option row |
| [React Native 0.87 Released](https://reactnative.dev/blog/2026/08/11/react-native-0.87) | **kept** → RB-E-RN-VERSIONS (0.87 row rewritten stable + note + migrate receipts), RB-E-BUILD (Metro 0.87 row), RB-E-TYPESCRIPT (Strict-API when-clause). Verified vs the blog AND the v0.87.0 CHANGELOG/package.json |
| [Strict TypeScript API](https://reactnative.dev/docs/strict-typescript-api) | **kept** → RB-E-RN-VERSIONS source (the API doc behind the 0.87 default + the legacy-deep-imports opt-out that expires after 0.88) |
| [Metro](https://reactnative.dev/docs/metro) | skipped: docs landing page; the Metro 0.87 facts kept in RB-E-BUILD come from the release blog |
| [Migrating a Large Flow Monorepo to TypeScript](https://engineeringblog.yelp.com/2026/08/migrating-a-large-flow-monorepo-to-typescript.html) | **kept** → RB-E-TYPESCRIPT reading + claim (1.4M SLoC / 570 packages / 3y7m; flowts → Stripe's codemod forward, flowgen backward; coverage 83.15% → 96.44%). It is the receipt under the entry's 'not at Meta → use TypeScript, not Flow' line |
| [post your questions on this thread](https://www.reddit.com/r/nextjs/comments/1vnlcsk/were_the_nextjs_team_ask_us_anything/) | skipped: AMA thread — not a citable artifact |
| [Biome 2.5.8](https://github.com/biomejs/biome/releases/tag/%40biomejs%2Fbiome%402.5.8) | **kept** (as the release receipt) → RB-E-DX note; the rule doc below is the citable source |
| [useReactCompiler rule](https://biomejs.dev/linter/rules/use-react-compiler/) | **kept** → RB-E-DX note + source: Biome 2.5.8 runs React Compiler in lint mode (nursery, `information` severity, only when package.json declares React ≥19) — it NARROWS, without closing, the 'ESLint is the only lane with react-compiler rules' reason |
| [React Native Connection](https://reactnativeconnection.io/) | skipped: conference/event page |
| [v0](https://v0.app/) | skipped: product landing page |
| [Own the RSC Pipeline: Cache and Compose It Yourself](https://www.youtube.com/watch?v=6lSH1-ytd7E) | skipped: conference talk (GitNation, 18min, Manuel Schiller on owning the RSC cache/compose pipeline in TanStack Start) — META-FRAMEWORKS already holds three TanStack RSC readings including the reversal; corroboration, not a new facet |
| [Scanning Barcodes in React Native Apps](https://margelo.com/blog/react-native-barcode-scanner) | **kept** → RB-E-MEDIA reading + claim + rewritten scan-a-code when-clause (the four-engine map). Three-source corroboration this pass: also in Native Weekly #18, React Weekly #33 and the firsthand feed watch |
| [React Native Tools That Actually Save Me Time](https://www.youtube.com/watch?v=PypMPaW0wu4) | skipped: tooling-roundup video (Simon Grimm); no durable selection fact beyond tools the corpus already tracks |
| [https://gtkx.dev/blog/gtkx-1-0](https://gtkx.dev/blog/gtkx-1-0) | **kept** → RB-E-DESKTOP: the reopen signal wired at TWiR #291 ('GTKX 1.0 stable → DESKTOP option row') FIRED. New Linux-native React option row — every other row reaches Linux through a webview or not at all |
| [GTKX 1.1](https://gtkx.dev/blog/gtkx-1-1) | **kept** → RB-E-DESKTOP (same row): 1.1 adds `gtkx deploy` — generates the desktop entry + AppStream metainfo and builds .flatpak/.deb/.rpm/.AppImage, replacing eleven hand-written packaging files |
| [kbar 1.0: A Cmd+K Interface for React Apps](https://kbar.vercel.app/) | skipped: no entry owns command palettes — kbar did graduate (npm 1.0.0, 2026-08-10, after a long 0.1.0-beta line, verified vs the registry), but a single-purpose widget library has no selection home here. Reopen: a 2nd independent signal → RB-E-COMPONENT-LIBS |
| [Liquid Gooey: Liquid/Gooey Effects for React](https://gooey.jakubantalik.com/) | skipped: too-early/niche — a visual-effects component set; COMPONENT-LIBS tracks system-level libraries |
| [React Hook Form 7.85.0](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.85.0) | skipped: minor release (also seen in the firsthand watch) |
| [Motion 13.1](https://motion.dev/changelog) | skipped: minor (Motion 13.1); ANIMATION already holds the 13.0 breaking change |
| [Next.js 16.3.1](https://github.com/vercel/next.js/releases/tag/v16.3.1) | skipped: patch release |
| [Sonner 2.0.8](https://github.com/emilkowalski/sonner/releases/tag/v2.0.8) | skipped: patch release (web sonner) |
| [demo](https://sonner.emilkowal.ski/) | skipped: demo page for the above |
| [chat.agent on Trigger.dev](https://fandf.co/4clejtQ) | skipped: sponsor (tracking link) |
| [Expo Observe](https://try.expo.dev/observe-react-status) | **kept** → RB-E-OBSERVABILITY option row rewritten from 'startup-metric sampling' to what EAS Observe actually is — verified against docs.expo.dev/eas/observe (open beta, 10k MAU free; expo-observe + <ObserveRoot> + markInteractive(); cold/warm start, TTI/TTR, bundle load, EAS Update download/apply; P50/P90/P99; build and OTA markers on the timeline; PER-ROUTE TTI via the Expo Router integration; CLI/JSON export for agents). The link itself is a marketing redirect — the docs are the source |
| [Making Navigations Instant in v0](https://nextjs.org/blog/making-v0-navigations-instant) | previously skipped (corroboration) → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS — carry over unless a reopen signal applies |
| [Making Referential Stability a Type](https://www.jovidecroock.com/blog/referential-stability-types/) | previously skipped (corroboration) — carry over unless a reopen signal applies |
| [16.3 release](https://nextjs.org/blog/next-16-3) | previously already-held → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS — carry over unless a reopen signal applies |
| [Join React Advanced](https://reactadvanced.com/?amp%3Butm_medium=reactstatus) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [Cooperpress](https://cooperpress.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
