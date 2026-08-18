# Harvest manifest — firsthand watch (2026-08-18)
issue: firsthand

Events from the corpus-derived watch graph (npm dist-tags · GitHub releases · author feeds).
Same disposition discipline as newsletter manifests; verify before keeping.
[rule:*] rows were auto-dispositioned by tools/triage-rules.yaml (gold-admitted, skip-only) — spot-check samples them.

Triaged 2026-08-18 in the same session that ran the poll (113 events: 40 auto-dispositioned by rules,
73 judged here). Eleven days of drift since the last pass, and the headliner is React Native 0.87
stable — which also fired the RB-E-ANIMATION tripwire. 12 keeps across 11 entries.

| event | disposition |
|---|---|
| [react-native  0.86.2 → 0.87.0](https://registry.npmjs.org/react-native/latest) → RB-E-RN-VERSIONS, RB-E-LISTS | **kept** → RB-E-RN-VERSIONS 0.87 row rewritten as STABLE (verified vs the release blog + v0.87.0 CHANGELOG); recommend.default, when-clauses, note and the migrate rule all move to 0.87. Also fires the ANIMATION tripwire below |
| [zustand  5.0.14 → 5.0.15](https://registry.npmjs.org/zustand/latest) → RB-E-STATE | skipped: patch release [rule:npm-patch] |
| [swr  2.5.0 → 2.5.1](https://registry.npmjs.org/swr/latest) → RB-E-DATA | skipped: patch release [rule:npm-patch] |
| [@apollo/client  4.2.10 → 4.2.12](https://registry.npmjs.org/@apollo/client/latest) → RB-E-DATA | skipped: patch release [rule:npm-patch] |
| [@rocicorp/zero  1.8.0 → 1.9.0](https://registry.npmjs.org/@rocicorp/zero/latest) → RB-E-DATA | skipped: minor on a tracked option row (DATA lists Zero for local-first sync); no selection change |
| [@tanstack/react-db  0.1.95 → 0.2.1](https://registry.npmjs.org/@tanstack/react-db/latest) → RB-E-DATA | skipped: 0.x minor (0.1.95 → 0.2.1) — pre-1.0 churn on a row already marked '0.x'. Reopen: 1.0 stable |
| [expo-router  57.0.11 → 57.0.14](https://registry.npmjs.org/expo-router/latest) → RB-E-NAV | skipped: patch release [rule:npm-patch] |
| [@tanstack/react-router  1.170.22 → 1.170.29](https://registry.npmjs.org/@tanstack/react-router/latest) → RB-E-NAV | skipped: patch release [rule:npm-patch] |
| [next  16.3.0 → 16.3.1](https://registry.npmjs.org/next/latest) → RB-E-META-FRAMEWORKS | skipped: patch release [rule:npm-patch] |
| [@tanstack/react-start  1.168.39 → 1.168.46](https://registry.npmjs.org/@tanstack/react-start/latest) → RB-E-META-FRAMEWORKS | skipped: patch release [rule:npm-patch] |
| [astro  7.2.0 → 7.2.2](https://registry.npmjs.org/astro/latest) → RB-E-META-FRAMEWORKS | skipped: patch release [rule:npm-patch] |
| [waku  1.0.0-beta.8 → 1.0.0-beta.9](https://registry.npmjs.org/waku/latest) → RB-E-META-FRAMEWORKS | skipped: prerelease (1.0.0-beta.9); META-FRAMEWORKS's waku ≥1.0.0 tripwire is armed and correctly did NOT fire |
| [react-hook-form  7.84.0 → 7.85.0](https://registry.npmjs.org/react-hook-form/latest) → RB-E-FORMS | skipped: minor (7.85.0); FORMS carries RHF as an option, no selection change. Corroborated by React Status #487, skipped there too |
| [@tanstack/react-form  1.33.3 → 1.33.5](https://registry.npmjs.org/@tanstack/react-form/latest) → RB-E-FORMS | skipped: patch release [rule:npm-patch] |
| [better-auth  1.6.26 → 1.7.0](https://registry.npmjs.org/better-auth/latest) → RB-E-AUTH | **kept** → RB-E-AUTH option row: 1.7.0 (2026-08-18) moves the joins flag from `experimental` to `advanced.database.joins` — a config rename for anyone who opted in (verified vs the v1.7.0 release notes) |
| [expo-auth-session  57.0.6 → 57.0.7](https://registry.npmjs.org/expo-auth-session/latest) → RB-E-AUTH | skipped: patch release [rule:npm-patch] |
| [@react-native-firebase/auth  26.1.0 → 26.2.0](https://registry.npmjs.org/@react-native-firebase/auth/latest) → RB-E-AUTH | **kept** (as the 26.x line) → RB-E-AUTH note + migrate rule; the durable facts come from the Invertase v26 post, not this patch bump |
| [react-native-nitro-fetch  1.5.4 → 1.6.1](https://registry.npmjs.org/react-native-nitro-fetch/latest) → RB-E-NETWORKING | skipped: minor (1.6.1); NETWORKING already carries nitro-fetch, streaming perf claims unchanged |
| [electron  43.3.0 → 43.4.0](https://registry.npmjs.org/electron/latest) → RB-E-DESKTOP | skipped: minor (43.4.0) |
| [uniwind  1.10.1 → 1.11.0](https://registry.npmjs.org/uniwind/latest) → RB-E-STYLING | skipped: minor (1.11.0) |
| [tamagui  2.7.2 → 2.7.7](https://registry.npmjs.org/tamagui/latest) → RB-E-STYLING | skipped: patch release [rule:npm-patch] |
| [styled-components  6.5.1 → 6.5.3](https://registry.npmjs.org/styled-components/latest) → RB-E-STYLING | skipped: patch release [rule:npm-patch] |
| [linaria  8.1.1 → 8.2.0](https://registry.npmjs.org/linaria/latest) → RB-E-STYLING | skipped: minor (8.2.0) |
| [antd  6.5.4 → 6.6.1](https://registry.npmjs.org/antd/latest) → RB-E-COMPONENT-LIBS | skipped: minor (6.6.1) |
| [react-native-gesture-handler  3.1.0 → 3.2.1](https://registry.npmjs.org/react-native-gesture-handler/latest) → RB-E-ANIMATION | skipped after RE-TRIAGE — this is the fired reopen from twir-293 ('faster touchables … reopen: the Gesture Handler release'). 3.2.0 (2026-08-13) reimplements Touchable without GestureDetector on iOS/Android/Web, bases Pressable on it, adds hover callbacks and AGP 9. Verified vs the v3.2.0 notes: it is an implementation change under an unchanged API — no selection decision moves, so no entry edit |
| [react-native-worklets  0.11.3 → 0.11.4](https://registry.npmjs.org/react-native-worklets/latest) → RB-E-ANIMATION | skipped: patch release [rule:npm-patch] |
| [framer-motion  13.0.0 → 13.1.0](https://registry.npmjs.org/framer-motion/latest) → RB-E-ANIMATION | skipped: minor (13.1.0); the 13.0 breaking change (@emotion/is-prop-valid) is already held in ANIMATION |
| [motion  13.0.0 → 13.1.0](https://registry.npmjs.org/motion/latest) → RB-E-ANIMATION | skipped: minor (13.1.0) — same release train as framer-motion above; React Status #487 links the changelog, skipped there too |
| [react-native-screen-transitions  3.11.2 → 3.12.0](https://registry.npmjs.org/react-native-screen-transitions/latest) → RB-E-ANIMATION | skipped: minor (3.12.0) |
| [@legendapp/list  3.3.3 → 3.3.6](https://registry.npmjs.org/@legendapp/list/latest) → RB-E-LISTS | skipped: patch release [rule:npm-patch] |
| [@tanstack/react-table  9.0.1 → 9.1.2](https://registry.npmjs.org/@tanstack/react-table/latest) → RB-E-LISTS | skipped: minor (9.1.2) on the v9 line whose stable landing LISTS already documents |
| [next-intl  4.13.5 → 4.13.7](https://registry.npmjs.org/next-intl/latest) → RB-E-I18N | skipped: patch release [rule:npm-patch] |
| [react-intl  10.1.20 → 10.1.22](https://registry.npmjs.org/react-intl/latest) → RB-E-I18N | skipped: patch release [rule:npm-patch] |
| [react-native-gifted-charts  1.4.77 → 1.4.78](https://registry.npmjs.org/react-native-gifted-charts/latest) → RB-E-CHARTS | skipped: patch release [rule:npm-patch] |
| [slate  0.126.1 → 0.126.2](https://registry.npmjs.org/slate/latest) → RB-E-EDITORS | skipped: patch release [rule:npm-patch] |
| [react-native-enriched-markdown  0.7.4 → 1.0.1](https://registry.npmjs.org/react-native-enriched-markdown/latest) → RB-E-EDITORS | **kept** → RB-E-EDITORS option row: 0.7.4 → 1.0.1, i.e. the 0.x caveat comes off (block-editing pipeline; 1.0.1 moves vendored tree-sitter/RaTeX assets to a postinstall download with an opt-out) |
| [lucide-react-native  1.30.0 → 1.31.0](https://registry.npmjs.org/lucide-react-native/latest) → RB-E-SVG | skipped: minor icon-set release (1.31.0) |
| [@lodev09/react-native-true-sheet  3.11.9 → 3.11.11](https://registry.npmjs.org/@lodev09/react-native-true-sheet/latest) → RB-E-SHEETS | skipped: patch (3.11.11) |
| [sonner-native  0.26.4 → 0.27.0](https://registry.npmjs.org/sonner-native/latest) → RB-E-POLISH | skipped: 0.x minor (0.27.0) |
| [expo-splash-screen  57.0.5 → 57.0.7](https://registry.npmjs.org/expo-splash-screen/latest) → RB-E-POLISH | skipped: patch release [rule:npm-patch] |
| [expo-modules-core  57.0.10 → 57.0.11](https://registry.npmjs.org/expo-modules-core/latest) → RB-E-NATIVE | skipped: patch release [rule:npm-patch] |
| [expo  57.0.11 → 57.0.14](https://registry.npmjs.org/expo/latest) → RB-E-NATIVE | skipped: patch release [rule:npm-patch] |
| [react-native-audio-api  0.13.2 → 0.13.3](https://registry.npmjs.org/react-native-audio-api/latest) → RB-E-MEDIA | skipped: patch release [rule:npm-patch] |
| [expo-image-picker  57.0.8 → 57.0.11](https://registry.npmjs.org/expo-image-picker/latest) → RB-E-MEDIA | skipped: patch release [rule:npm-patch] |
| [@op-engineering/op-sqlite  17.1.5 → 18.1.1](https://registry.npmjs.org/@op-engineering/op-sqlite/latest) → RB-E-STORAGE | **kept** → RB-E-STORAGE note: 18.0.0 (2026-08-14) REMOVES crsqlite (breaking for CRDT users), rebinds hooks/reactive flush to the runtime generation; 18.1 adds SPM + RN 0.87 compat. Version line moves 17.x → 18.1.1 |
| [react-native-keyboard-controller  1.22.3 → 1.22.4](https://registry.npmjs.org/react-native-keyboard-controller/latest) → RB-E-KEYBOARD | skipped: patch release [rule:npm-patch] |
| [react-native-purchases  10.7.0 → 10.7.1](https://registry.npmjs.org/react-native-purchases/latest) → RB-E-PAYMENTS | skipped: patch release [rule:npm-patch] |
| [react-native-iap  16.0.2 → 16.3.1](https://registry.npmjs.org/react-native-iap/latest) → RB-E-PAYMENTS | skipped: minor (16.3.1) |
| [expo-iap  5.0.1 → 5.3.1](https://registry.npmjs.org/expo-iap/latest) → RB-E-PAYMENTS | skipped: minor (5.3.1) |
| [@reactvision/react-viro  2.57.5 → 2.58.1](https://registry.npmjs.org/@reactvision/react-viro/latest) → RB-E-GAMES | skipped: minor (2.58.1) |
| [esbuild  0.28.1 → 0.28.2](https://registry.npmjs.org/esbuild/latest) → RB-E-BUILD | skipped: patch release [rule:npm-patch] |
| [@react-native/metro-config  0.86.2 → 0.87.0](https://registry.npmjs.org/@react-native/metro-config/latest) → RB-E-BUILD | **kept** (as the 0.87 signal) → RB-E-BUILD Metro row now carries Metro 0.87's facts (2x faster source maps, half the source-map memory, TS/ESM config files stable, YAML + .es6 configs removed) — sourced from the RN 0.87 blog, not this npm row |
| [@biomejs/biome  2.5.7 → 2.5.9](https://registry.npmjs.org/@biomejs/biome/latest) → RB-E-DX | skipped: patch release [rule:npm-patch] |
| [eslint  10.8.0 → 10.8.1](https://registry.npmjs.org/eslint/latest) → RB-E-DX | skipped: patch release [rule:npm-patch] |
| [turbo  2.10.8 → 2.10.10](https://registry.npmjs.org/turbo/latest) → RB-E-DX | skipped: patch release [rule:npm-patch] |
| [react-doctor  0.9.6 → 0.9.12](https://registry.npmjs.org/react-doctor/latest) → RB-E-DX | skipped: patch release [rule:npm-patch] |
| [oxlint  1.77.0 → 1.78.0](https://registry.npmjs.org/oxlint/latest) → RB-E-DX | skipped: minor (1.78.0) |
| [typescript-eslint  8.66.0 → 8.67.0](https://registry.npmjs.org/typescript-eslint/latest) → RB-E-DX | skipped: minor (8.67.0) |
| [expo-updates  57.0.12 → 57.0.15](https://registry.npmjs.org/expo-updates/latest) → RB-E-OTA | skipped: patch release [rule:npm-patch] |
| [hot-updater  0.35.11 → 0.36.0](https://registry.npmjs.org/hot-updater/latest) → RB-E-OTA | skipped: 0.x minor (0.36.0) |
| [ai  7.0.56 → 7.0.66](https://registry.npmjs.org/ai/latest) → RB-E-AI-UI | skipped: patch release [rule:npm-patch] |
| [@tanstack/ai  0.43.1 → 0.44.1](https://registry.npmjs.org/@tanstack/ai/latest) → RB-E-AI-UI | skipped: 0.x minor (0.44.1) |
| [@tanstack/ai-react  0.19.1 → 0.19.2](https://registry.npmjs.org/@tanstack/ai-react/latest) → RB-E-AI-UI | skipped: patch release [rule:npm-patch] |
| [agent-device  0.20.6 → 0.20.9](https://registry.npmjs.org/agent-device/latest) → RB-E-AI-DEVTOOLS | skipped: patch release [rule:npm-patch] |
| [reactotron-react-native  5.2.0 → 5.3.1](https://registry.npmjs.org/reactotron-react-native/latest) → RB-E-AI-DEVTOOLS | skipped: minor (5.3.1); AI-DEVTOOLS cites reactotron-core-server for the MCP fact, unaffected |
| [@swmansion/argent  0.19.0 → 0.21.0](https://registry.npmjs.org/@swmansion/argent/latest) → RB-E-AI-DEVTOOLS | **kept** → RB-E-AI-DEVTOOLS option row version refresh (0.17 → 0.21.0, verified vs npm) |
| [react-native reached 0.87.0 (≥ 0.87.0) — ACT: RN 0.87 stable carries the upstream Hermes fix for the worklet debug-metadata regression — rewrite the note's four-fix ladder as history ('fixed in 0.87; Bundle Mode still recommended') and drop 'waiting for RN 0.87' as an option](https://registry.npmjs.org/react-native/latest) → RB-E-ANIMATION | ⚡ **TRIPWIRE FIRED — ACTED** → RB-E-ANIMATION. Verified the premise before rewriting: SWM's post says the fix was backported to Hermes 250829098.0.15, and RN 0.87.0's package.json pins hermes-compiler 250829098.0.16, so the claim holds. The four-fix ladder is now history ('fixed from 0.87 up'), 'wait for RN 0.87' is gone as an option, Bundle Mode stays recommended on its own merits, and the tripwire row is removed |
| [react/react-native: 0.87.0](https://github.com/react/react-native/releases/tag/v0.87.0) → RB-E-RN-VERSIONS, RB-E-NETWORKING | already-held (same event as the npm row): RN-VERSIONS cites the release blog + CHANGELOG rather than the artifacts-only GitHub release body |
| [software-mansion/react-native-screens: v4.28.0-nightly-20260817-c03058060](https://github.com/software-mansion/react-native-screens/releases/tag/v4.28.0-nightly-20260817-c03058060) → RB-E-NAV | skipped: prerelease/nightly [rule:gh-nightly] |
| [remix-run/react-router: v0.0.0-experimental-320d16107](https://github.com/remix-run/react-router/releases/tag/v0.0.0-experimental-320d16107) → RB-E-NAV | skipped: prerelease/nightly [rule:gh-nightly] |
| [margelo/react-native-nitro-fetch: Release 1.6.1](https://github.com/margelo/react-native-nitro-fetch/releases/tag/v1.6.1) → RB-E-NETWORKING | skipped: minor — duplicate of the npm row above |
| [tw93/pake: V3.15.6 Anchor](https://github.com/tw93/Pake/releases/tag/V3.15.6) → RB-E-DESKTOP | skipped: minor (V3.15.6); DESKTOP's Pake facts (size, Tauri under the hood) are version-independent |
| [microsoft/react-native-windows: react-native-windows_v0.0.0-canary.1058: RELEASE: Releasing 10 package(s) (main) (#16353)](https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_v0.0.0-canary.1058) → RB-E-DESKTOP | skipped: canary build |
| [amannn/next-intl: v4.13.7](https://github.com/amannn/next-intl/releases/tag/v4.13.7) → RB-E-I18N | skipped: patch — duplicate of the npm row |
| [software-mansion/react-native-enriched: Release 1.1.1](https://github.com/software-mansion/react-native-enriched-html/releases/tag/v1.1.1) → RB-E-EDITORS | **kept** → RB-E-EDITORS: enriched-html row refreshed 1.1.0 → 1.1.1 |
| [software-mansion/react-native-enriched-markdown: v1.0.1](https://github.com/software-mansion/enriched-markdown/releases/tag/v1.0.1) → RB-E-EDITORS | **kept** → RB-E-EDITORS (the 1.0 graduation receipt; now a source) |
| [hyodotdev/openiap: godot-iap 3.3.2](https://github.com/hyodotdev/openiap/releases/tag/godot-iap-3.3.2) → RB-E-PAYMENTS | skipped: off-scope — Godot binding in the OpenIAP monorepo, not the RN surface PAYMENTS tracks |
| [callstack/react-native-brownfield: @callstack/react-native-brownfield@5.0.1](https://github.com/callstack/react-native-brownfield/releases/tag/%40callstack%2Freact-native-brownfield%405.0.1) → RB-E-BROWNFIELD | skipped: patch on the 5.0 line BROWNFIELD already documents |
| [millionco/react-doctor: react-doctor@0.9.12](https://github.com/millionco/react-doctor/releases/tag/react-doctor%400.9.12) → RB-E-DX | skipped: patch |
| [mercuretechnologies/xprem: v3.1.2-beta4](https://github.com/mercuretechnologies/xprem/releases/tag/v3.1.2-beta4) → RB-E-OTA | skipped: prerelease (beta4) |
| [software-mansion/react-native-executorch: v0.10.0-libs-1.4.1 (ExecuTorch 1.4.1)](https://github.com/software-mansion/react-native-executorch/releases/tag/v0.10.0-libs-1.4.1) → RB-E-ONDEVICE-AI | skipped: dependency bump (ExecuTorch 1.4.1) on the 0.10 line; the option row's capability facts (VLM, runOnFrame, tool calling/embeddings/OCR) are unchanged. Reopen: a release that changes what the library can DO |
| [infinitered/reactotron: reactotron-react-native@5.3.1](https://github.com/infinitered/reactotron/releases/tag/reactotron-react-native%405.3.1) → RB-E-AI-DEVTOOLS | skipped: minor — duplicate of the npm row |
| [callstack/agent-device: v0.20.10](https://github.com/callstack/agent-device/releases/tag/v0.20.10) → RB-E-AI-DEVTOOLS | skipped: PHANTOM EVENT — FIRSTHAND FALSE POSITIVE. The reported tag 404s with no Wayback snapshot (caught by the verify-diff receipts gate, not by me). GitHub's releases API lists v0.20.9 (2026-08-17) as newest and npm agrees (latest 0.20.9), so v0.20.10 was never published — most likely a draft or a deleted tag the poller caught mid-flight. Lesson recorded in the ledger: a firsthand GitHub-release event is a claim to verify, not a fact. The AI-DEVTOOLS option row is refreshed to 0.20.9 off the npm row above + the registry source |
| [callstack.com: "Introducing Apex: A Fast, Specialized Model for React Native"](https://www.callstack.com/blog/introducing-apex-a-fast-specialized-model-for-react-native) → RB-E-REACT-CORE, RB-E-NAV, RB-E-CROSSPLATFORM, RB-E-BROWNFIELD, RB-E-BUILD, RB-E-AI-DEVTOOLS | skipped: pre-ship — Apex is a React-Native-specialized coding model (Gemma 4 base, SFT + GRPO, evaluated on Callstack's own React Native Evals) but it is PRIVATE BETA with the legal/commercial work explicitly unfinished, so there is nothing a reader can adopt. Reopen: public availability (then AI-DEVTOOLS gets a model row beside the Evals/ReactBench benchmark rows) |
| [aurorascharff.no: "Coordinating Optimistic Updates in Next.js"](https://aurorascharff.no/posts/coordinating-optimistic-updates-in-nextjs/) → RB-E-REACT-CORE, RB-E-COMPONENT-LIBS | **kept** → RB-E-DATA reading + claim, and the 'skip a client cache' when-clause is sharpened: reach for TanStack Query/SWR when data changes on its OWN, not when it changes because the user acted |
| [reactnative.dev: "React Native 0.87 - Strict TypeScript API, Metro Update, Swift Package Manager, AGP 9 Support"](https://reactnative.dev/blog/2026/08/11/react-native-0.87) → RB-E-RN-VERSIONS, RB-E-ANIMATION, RB-E-NATIVE, RB-E-GAMES, RB-E-BUILD, RB-E-TESTING | **kept** → RB-E-RN-VERSIONS (option row + note + migrate receipts), RB-E-BUILD (Metro 0.87), RB-E-TYPESCRIPT (Strict-API when-clause). The pass headliner |
| [expo.dev: "How to build a resilient activity tracker with Expo"](https://expo.dev/blog/how-to-build-a-resilient-activity-tracker-with-expo) → RB-E-RN-VERSIONS, RB-E-NAV, RB-E-NETWORKING, RB-E-ANIMATION, RB-E-SVG, RB-E-NATIVE, RB-E-MEDIA, RB-E-NATIVE-UI, RB-E-BUILD, RB-E-DX, RB-E-OTA, RB-E-AI-DEVTOOLS | skipped: how-to (tutorial building one app with expo-sensors/background tasks); no selection fact |
| [expo.dev: "Convex is now a one-command backend for Expo apps"](https://expo.dev/blog/convex-is-a-backend-for-expo-apps) → RB-E-RN-VERSIONS, RB-E-NAV, RB-E-NETWORKING, RB-E-ANIMATION, RB-E-SVG, RB-E-NATIVE, RB-E-MEDIA, RB-E-NATIVE-UI, RB-E-BUILD, RB-E-DX, RB-E-OTA, RB-E-AI-DEVTOOLS | skipped: vendor integration announcement (one-command Convex setup for Expo); no entry owns backend-as-a-service selection, and it is a partnership post rather than a decision guide. Reopen: a BaaS-selection gap opening in DATA, or independent adoption evidence |
| [tanstack.com: "Inside a TanStack Router Navigation"](https://tanstack.com/blog/tanstack-router-navigation-lanes) → RB-E-TYPESCRIPT, RB-E-NAV, RB-E-META-FRAMEWORKS, RB-E-FORMS, RB-E-LISTS, RB-E-SECURITY, RB-E-AI-UI, RB-E-AI-DEVTOOLS | skipped: cap — NAV already holds the sibling internals piece from the same rewrite ('TanStack Router's New Reactive Core: A Signal Graph'); a second deep-dive into one router's internals adds depth, not selection |
| [tanstack.com: "Form v2 is here: All you need to know about the alpha"](https://tanstack.com/blog/announcing-tanstack-form-v2-alpha) → RB-E-TYPESCRIPT, RB-E-NAV, RB-E-META-FRAMEWORKS, RB-E-FORMS, RB-E-LISTS, RB-E-SECURITY, RB-E-AI-UI, RB-E-AI-DEVTOOLS | skipped: pre-ship — v2 is an ALPHA rewrite (npm latest @tanstack/react-form 1.33.5, verified 2026-08-18); the validator-pipeline redesign is real but not shippable. Reopen: v2 stable → FORMS option row |
| [code.visualstudio.com: "Visual Studio Code 1.134 (Insiders)"](https://code.visualstudio.com/updates/v1_134) → RB-E-TYPESCRIPT | skipped: off-scope routine editor release [rule:vscode-updates] |
| [github.blog: "How canvases make agentic workflows visible, steerable, and cost-efficient"](https://github.blog/ai-and-ml/github-copilot/how-canvases-make-agentic-workflows-visible-steerable-and-cost-efficient/) → RB-E-DATA, RB-E-SECURITY | skipped: off-scope — Copilot product feature |
| [github.blog: "How to bring your software delivery workflow into GitHub with agent apps"](https://github.blog/ai-and-ml/github-copilot/how-to-bring-your-software-delivery-workflow-into-github-with-agent-apps/) → RB-E-DATA, RB-E-SECURITY | skipped: off-scope — GitHub agent-apps product post |
| [github.blog: "Your guide to GitHub Universe 2026 is here: The schedule just launched!"](https://github.blog/news-insights/company-news/your-guide-to-github-universe-2026-is-here-the-schedule-just-launched/) → RB-E-DATA, RB-E-SECURITY | skipped: off-scope — conference schedule |
| [github.blog: +6 more new posts (high-volume feed — consider dropping this host)](https://github.blog/feed/) → RB-E-DATA, RB-E-SECURITY | skipped: feed overflow marker (6 more posts) — high-volume host, third consecutive pass with zero keeps |
| [thoughtbot.com: "How healthcare tech teams innovate while balancing speed and security"](https://feed.thoughtbot.com/link/24077/17421901/how-healthcare-tech-teams-innovate-while-balancing-speed-and-security) → RB-E-NAV, RB-E-AUTH | skipped: off-scope — consulting/industry piece, no React selection content |
| [thoughtbot.com: "Can’t touch the DOM? Reach for :has() to style any element"](https://feed.thoughtbot.com/link/24077/17420327/can-t-touch-the-dom-reach-for-has) → RB-E-NAV, RB-E-AUTH | skipped: off-scope for this corpus — a CSS :has() technique post; A11Y/STYLING track selection, not CSS tips |
| [thoughtbot.com: "Buying Time, Choosing Words: Consulting Through Diplomatic Communication"](https://feed.thoughtbot.com/link/24077/17417636/buying_time_choosing_words) → RB-E-NAV, RB-E-AUTH | skipped: off-scope — consulting communication essay |
| [thoughtbot.com: +2 more new posts (high-volume feed — consider dropping this host)](https://feed.thoughtbot.com/) → RB-E-NAV, RB-E-AUTH | skipped: feed overflow marker (2 more posts) |
| [vercel.com: "Deploy Cursor Origin repositories with Vercel in public beta"](https://vercel.com/changelog/deploy-cursor-origin-repositories-with-vercel-in-public-beta) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope platform chrome [rule:vercel-changelog-chrome] |
| [vercel.com: "GPT-5.6 Sol is 50% off on AI Gateway for the next month"](https://vercel.com/changelog/gpt-5-6-sol-is-50-off-on-ai-gateway-for-the-next-month) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope platform chrome [rule:vercel-changelog-chrome] |
| [vercel.com: "Encrypted Client Hello (ECH) is now supported on Vercel CDN"](https://vercel.com/changelog/encrypted-client-hello-now-supported-on-vercel-cdn) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope platform chrome [rule:vercel-changelog-chrome] |
| [vercel.com: +17 more new posts (high-volume feed — consider dropping this host)](https://vercel.com/blog/rss.xml) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: feed overflow marker (17 more posts) — SIXTH consecutive pass flagging this host with zero keeps; the vercel-changelog-chrome rule already auto-skips the changelog rows, but the blog feed itself remains noise (maintainer call: prune) |
| [engineering.fb.com: "How We’re Building Scam Alert on WhatsApp With End-to-End Encryption and Verifiability Guarantees"](https://engineering.fb.com/2026/08/12/security/how-were-building-scam-alert-whatsapp/) → RB-E-STYLING | skipped: off-scope — WhatsApp E2EE product engineering; nothing about React or RN selection |
| [ui.shadcn.com: "August 2026 - Human in the Loop"](https://ui.shadcn.com/docs/changelog/2026-08-helpers-human-in-the-loop) → RB-E-COMPONENT-LIBS | skipped: routine monthly changelog (helpers + human-in-the-loop additions); COMPONENT-LIBS tracks shadcn as an option, and no row's tradeoff changes. Reopen: a release that changes the distribution model or the registry story |
| [blog.margelo.com: "Scanning Barcodes in React Native Apps: The Complete Guide (2026)"](https://margelo.com/blog/react-native-barcode-scanner) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-KEYBOARD, RB-E-ONDEVICE-AI, RB-E-AI-UI | **kept** → RB-E-MEDIA reading + claim (the four-engine map: ML Kit / AVFoundation / VisionKit / ZXing, and that decoder quirks belong to the engine, not the wrapper) + a rewritten scan-a-code when-clause. Author bias noted in the entry; react-native-data-scanner verified at 0.1.2 (early) |
| [blog.margelo.com: "Fitting RAG in Your Pocket: Local Retrieval in React Native"](https://margelo.com/blog/fitting-RAG-in-your-pocket) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-KEYBOARD, RB-E-ONDEVICE-AI, RB-E-AI-UI | **kept** → RB-E-ONDEVICE-AI reading + claim + a new @react-native-ai/llama option row (verified npm 0.12.0). The durable content is the constraint list: ~900MB usable RAM holds generator + embedder together, a 1.07GB model dies on an untrappable native OOM, context is capped by KV-cache RAM (oversized prompts are rejected, not truncated), and query/documents must share one embedding model |
| [css-tricks.com: "Dark mode toggles: two states are enough"](https://css-tricks.com/dark-mode-toggles-two-states-are-enough/) → RB-E-A11Y | skipped: opinion/UX argument (two-state vs three-state dark-mode toggles); A11Y tracks guarantees, not toggle design |
| [css-tricks.com: "What’s !important #17: Custom Highlight API, CSS Navigation Matching, Fixing text-stroke, and More"](https://css-tricks.com/whats-important-17/) → RB-E-A11Y | skipped: link-roundup column |
| [css-tricks.com: "Blocked aria-hidden: The Warning is Right, and Every Fix You&#8217;ve Found is Wrong"](https://css-tricks.com/blocked-aria-hidden-fix/) → RB-E-A11Y | **kept** → RB-E-A11Y reading + claim: focus must leave a region BEFORE it becomes hidden/inert; the three popular fixes (blur(), setTimeout, deleting aria-hidden) silence the console and strand the screen-reader user; native <dialog>.showModal() does the sequence for you |
| [css-tricks.com: +2 more new posts (high-volume feed — consider dropping this host)](https://css-tricks.com/feed/) → RB-E-A11Y | skipped: feed overflow marker (2 more posts) |
| [revenuecat.com: "How a $100 ad budget and a MacStories review turned Sequel into a hit"](https://www.revenuecat.com/blog/growth/romain-lefebvre-sequel-launched-podcast-2026) → RB-E-PAYMENTS | skipped: marketing/growth case study (app-launch anecdote), not a PAYMENTS selection fact |
| [revenuecat.com: "RevenueCat and AB180 partner to support South Korea’s app community"](https://www.revenuecat.com/blog/company/revenuecat-korea-partnership) → RB-E-PAYMENTS | skipped: company/partnership announcement |

## Pass-level records (advocate + spot-check)

**Advocate pass** (re-argued every skip above as a hostile reviewer): ONE flip, recorded in
react-weekly-32.md — Callstack's brownfield-vs-greenfield piece, kept against its own recorded
reopen signal on the entry-gap argument. Held after argument: TanStack Form v2 (alpha, nothing
adoptable), Callstack Apex (private beta — and the Expo Agent precedent in AI-DEVTOOLS argues
against listing hosted-product-layer things early), Meta Muse Code (harness choice is deferred to
agentic-engineering-patterns; not RN-specific), Expo×Convex (3 sources, but corroboration is a
trigger to re-argue, not the argument — no entry owns BaaS selection), Gesture Handler 3.2 (fired
reopen, but an implementation change behind an unchanged API), kbar 1.0 (real graduation, no home),
RevenueCat paywalls/experiments (features of a choice PAYMENTS already makes, and it already holds
two RevenueCat readings), the Callstack cloud-agent-QA post (same vendor/week/thread as the kept
replay study), and the shadcn August changelog (routine).

**Spot-check of react-status-486** (all `cap` skips + 2 random skips + 2 random `[rule:*]` rows —
the rule rows had to be sampled from THIS manifest, since rules shipped the same day as the last
pass and no earlier manifest carries any):
- `cap` skip OVERTURNED: TanStack Table v9's memory post is not more depth on the v9 release, it
  moves a THRESHOLD the entry recommends on (~1–1.5M → ~10–16M rows before the browser's ~4GB
  ceiling, via shared prototypes instead of per-object methods+closures). Retro-added to LISTS and
  to the 486 manifest.
- random skip "prompting for taste" (sponsored classified, tracking link) — HOLDS.
- random skip Astro 7.2 (minor; headline incremental-static-builds is experimental) — HOLDS; the
  recorded reopen (it stabilizing) has not fired, 7.2.2 is a patch.
- `[rule:npm-patch]` on expo-updates 57.0.12→57.0.15 — correct: a patch, and OTA pins no exact
  version that the pin-guard would need to defer to.
- `[rule:vercel-changelog-chrome]` on the Vercel ECH changelog — correct: platform chrome.
