# Harvest manifest — React Weekly #33 (2026-08-16)
issue: https://react-weekly.dev/newsletter/33

Processed 2026-08-18 from the RSS content:encoded body (see the #32 header for why this manifest is
the record for this source). Tracking links resolved with `curl -L` before triage.
Reason classes: corroboration · how-to · pre-ship · too-early · cap · unverifiable · off-scope · sponsor.

| item | disposition |
|---|---|
| [Form v2 is here: all you need to know about the alpha](https://tanstack.com/blog/announcing-tanstack-form-v2-alpha) | skipped: pre-ship — ALPHA (npm latest @tanstack/react-form 1.33.5). Reopen: v2 stable → RB-E-FORMS option row |
| [Scanning barcodes in React Native: the complete guide](https://margelo.com/blog/react-native-barcode-scanner) | **kept** → RB-E-MEDIA reading + claim + rewritten when-clause (the four-engine map; decoder quirks belong to the engine, not the wrapper) |
| [Convex is now a one-command backend for Expo apps](https://expo.dev/blog/convex-is-a-backend-for-expo-apps) | skipped: vendor integration announcement; no entry owns backend-as-a-service selection. Reopen: a BaaS-selection gap in DATA, or independent adoption evidence |
| [Making navigations instant in v0](https://nextjs.org/blog/making-v0-navigations-instant) | skipped: carry-over (firsthand 08-07, React Status #487) — a first-party case study of Cache Components + Partial Prefetching, whose durable content META-FRAMEWORKS already holds via the 16.3 Instant Navigations reading |
| [Inside a TanStack Router navigation](https://tanstack.com/blog/tanstack-router-navigation-lanes) | skipped: cap — NAV already holds the sibling internals piece from the same rewrite ("TanStack Router's New Reactive Core: A Signal Graph"); depth, not selection |
| [React Native Firebase v26 release](https://invertase.io/blog/react-native-firebase-v26-release) | **kept** → RB-E-AUTH note + migrate rule + option-row caveat. The gate is the durable part: every natively-bridged package in v26 REQUIRES the New Architecture (Codegen TurboModules), the namespaced API (firebase.auth()) is removed in favour of modular getAuth(app), all 19 packages moved to TypeScript, and CI now diffs API shapes against firebase-js-sdk. Maintainers' own advice if you can't enable New Arch: stay on v25. Migration trap noted: TurboModules make some APIs synchronous, so `.then()` on what is now void breaks |
| [React Native 0.87](https://reactnative.dev/blog/2026/08/11/react-native-0.87) | **kept** → RB-E-RN-VERSIONS / RB-E-BUILD / RB-E-TYPESCRIPT (5th corroborating source this pass) |
