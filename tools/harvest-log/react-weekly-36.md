# Harvest manifest — React Weekly #36 (2026-09-06; 2026-09-10 pass)
issue: https://react-weekly.dev/newsletter/36

RSS-derived per this source's standing note (the site and api.react-weekly.dev are JS-shell/auth-gated,
so `harvest inventory`/`coverage` return 0 links on the issue URL — this manifest IS the record).
Every link is an api.react-weekly.dev/track/click redirect; each was resolved with `curl -L` before
dispositioning, and the resolved destination is what appears below.

| link (resolved) | disposition |
|---|---|
| [Vitest 5.0 is out](https://vitest.dev/blog/vitest-5.html) | already-held: RB-E-TESTING — kept this pass from firsthand (the Vitest 5 note) |
| [12 AEO practices to make your documentation AI-ready](https://expo.dev/blog/aeo-practices-to-make-your-documentation-ai-ready) | already-held: skipped off-scope this pass in the firsthand manifest (documentation SEO, not a React selection fact) |
| [CSS Class Prefix Selector](https://www.bram.us/2026/08/20/the-future-of-css-target-multiple-classes-with-the-class-prefix-selector/) | already-held: skipped off-scope in twir-295 (a CSS specification proposal) |
| [React Native Bridgeless, race conditions with concurrent JS runtimes](https://ospfranco.com/concurrent-engines-crash/) | already-held: RB-E-NATIVE — kept as a reading in twir-295 this pass |
| [Working with the React Native Super App Showcase repository](https://www.callstack.com/blog/working-with-the-react-native-super-app-showcase-repository) | already-held: RB-E-BUILD — kept 2026-09-01 (the host-shell / mini-app / shared-SDK invariants reading) |
| [React Native Gesture Handler's Touchable](https://swmansion.com/blog/react-native-gesture-handler-s-touchable-the-button-we-wish-we-had-sooner/) | already-held: RB-E-ANIMATION — kept 2026-08-24 from TWiR #294 (RNGH 3's unified Touchable) |
| [Speeding up Expensify's networking with NitroFetch](https://margelo.com/blog/speeding-up-expensifys-networking-with-nitro-fetch) | already-held: RB-E-NETWORKING — kept 2026-09-01 as the NitroFetch production receipt |
| [How to Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel) | already-held: RB-E-META-FRAMEWORKS — the Start-on-Vercel clause kept this pass from the TanStack partnership post |
| [Styling Linear for the future with StyleX](https://linear.app/now/styling-linear-for-the-future-stylex) | already-held: RB-E-STYLING — kept as a reading in twir-295 this pass |
| [How Turbopack chunks your JavaScript](https://nextjs.org/blog/turbopack-chunking) | already-held: RB-E-BUILD — kept as a reading this pass from firsthand |
| [Zod 4.5](https://zod.dev/blog/zod-4-5) | already-held: RB-E-FORMS — kept in twir-295 this pass (z.compile / z.validate) |
| [pnpm 12.0](https://pnpm.io/blog/releases/12.0) | already-held: RB-E-BUILD — kept in twir-295 this pass (stable Rust rewrite; consumed the #294 pre-ship skip) |

Coverage: 12/12 links dispositioned, TWELVE-for-twelve already-held. The second pure-corroboration
issue on record from this source (React Weekly #35 was the first, 2026-09-01) — and the strongest
signal yet that its editorial overlaps TWiR + firsthand almost completely. If a third consecutive
issue yields zero, the resume-cost question is worth asking: it costs one RSS fetch and twelve
redirect resolutions per pass, and its value so far is corroboration, not coverage.
