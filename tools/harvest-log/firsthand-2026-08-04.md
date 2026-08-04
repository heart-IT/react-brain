# Harvest manifest — firsthand watch (2026-08-04)
issue: firsthand

Events from the corpus-derived watch graph (npm dist-tags · GitHub releases · author feeds).
Same disposition discipline as newsletter manifests; verify before keeping.

| event | disposition |
|---|---|
| [mobx  6.16.1 → 7.0.0](https://registry.npmjs.org/mobx/latest) → RB-E-STATE | **kept** → RB-E-STATE migrate rule (mobx <7 → 7) — MAJOR: Proxy-only (ES5 fallback + useProxies gone), legacy decorators dropped, namespaced→named exports, trace/Provider/inject removed, React 18+; ESM prod 17.02→13.96 KiB gzip. Verified vs the release notes + registry (7.0.0, 2026-07-30) |
| [swr  2.4.2 → 2.5.0](https://registry.npmjs.org/swr/latest) → RB-E-DATA | skipped: minor (2.5.0) — DATA lists SWR without a version claim |
| [@apollo/client  4.2.8 → 4.2.9](https://registry.npmjs.org/@apollo/client/latest) → RB-E-DATA | skipped: patch (4.2.9) |
| [expo-router  57.0.8 → 57.0.10](https://registry.npmjs.org/expo-router/latest) → RB-E-NAV | skipped: patch (57.0.10) — recurring SDK-57 point release |
| [react-router-dom  7.18.1 → 7.18.2](https://registry.npmjs.org/react-router-dom/latest) → RB-E-NAV | skipped: patch (7.18.2); NAV tracks the 8.x line |
| [next  16.2.12 → 16.3.0](https://registry.npmjs.org/next/latest) → RB-E-META-FRAMEWORKS | already-held: RB-E-META-FRAMEWORKS reads the 16.3 Instant Navigations post; 16.3.0 is that release reaching the latest tag |
| [@tanstack/react-start  1.168.32 → 1.168.35](https://registry.npmjs.org/@tanstack/react-start/latest) → RB-E-META-FRAMEWORKS | skipped: patch (1.168.35) |
| [astro  7.1.4 → 7.1.6](https://registry.npmjs.org/astro/latest) → RB-E-META-FRAMEWORKS | skipped: patch (7.1.6) |
| [react-hook-form  7.83.0 → 7.84.0](https://registry.npmjs.org/react-hook-form/latest) → RB-E-FORMS | skipped: minor (7.84.0) — no version claim in FORMS |
| [@tanstack/react-form  1.33.2 → 1.33.3](https://registry.npmjs.org/@tanstack/react-form/latest) → RB-E-FORMS | skipped: patch (1.33.3) |
| [react-native-auth0  5.10.0 → 5.11.0](https://registry.npmjs.org/react-native-auth0/latest) → RB-E-AUTH | skipped: minor (5.11.0) — AUTH already cites v5.10 (MFA); no new selection fact |
| [expo-auth-session  57.0.5 → 57.0.6](https://registry.npmjs.org/expo-auth-session/latest) → RB-E-AUTH | skipped: patch (57.0.6) |
| [@react-native-firebase/auth  25.1.0 → 26.1.0](https://registry.npmjs.org/@react-native-firebase/auth/latest) → RB-E-AUTH | skipped: version-line only — 26.1.0 (2026-08-03) is a major, but AUTH lists Firebase Auth as a backend-bundled option with no version claim to invalidate. Reopen: a breaking change that alters the backend-bundled recommendation |
| [axios  1.18.1 → 1.19.0](https://registry.npmjs.org/axios/latest) → RB-E-NETWORKING | skipped: minor (1.19.0) — but the CISA axios supply-chain alert is dispositioned in the RN Rewind #51 manifest |
| [uniwind  1.10.0 → 1.10.1](https://registry.npmjs.org/uniwind/latest) → RB-E-STYLING | skipped: patch (1.10.1) |
| [tamagui  2.5.3 → 2.6.3](https://registry.npmjs.org/tamagui/latest) → RB-E-STYLING | skipped: minor (2.6.3) — STYLING cites Tamagui without a version claim |
| [react-aria-components  1.19.0 → 1.20.0](https://registry.npmjs.org/react-aria-components/latest) → RB-E-COMPONENT-LIBS | skipped: minor (1.20.0) |
| [antd  6.5.2 → 6.5.3](https://registry.npmjs.org/antd/latest) → RB-E-COMPONENT-LIBS | skipped: patch (6.5.3) |
| [framer-motion  12.42.2 → 12.43.0](https://registry.npmjs.org/framer-motion/latest) → RB-E-ANIMATION | skipped: minor (12.43.0) |
| [motion  12.42.2 → 12.43.0](https://registry.npmjs.org/motion/latest) → RB-E-ANIMATION | skipped: minor (12.43.0) — ANIMATION names Motion the web default with no version claim |
| [@shopify/react-native-skia  2.10.0 → 2.10.1](https://registry.npmjs.org/@shopify/react-native-skia/latest) → RB-E-ANIMATION | **kept** (2.10 line) → RB-E-ANIMATION note + source — the release's one feature is HostObject→JSI NativeState (#3964); published peers show reanimated>=4.0.0 / worklets>=0.7.0 are OPTIONAL, so TWiR's "requires Reanimated v4" needed the qualifier |
| [react-native-screen-transitions  3.11.0 → 3.11.2](https://registry.npmjs.org/react-native-screen-transitions/latest) → RB-E-ANIMATION | skipped: patch (3.11.2) |
| [react-native-ease  0.7.3 → 0.8.0](https://registry.npmjs.org/react-native-ease/latest) → RB-E-ANIMATION | skipped: 0.x minor (0.8.0) — too-early. Reopen: 1.0 |
| [@tanstack/react-virtual  3.14.8 → 3.14.9](https://registry.npmjs.org/@tanstack/react-virtual/latest) → RB-E-LISTS | skipped: patch (3.14.9) |
| [@tanstack/react-table  8.21.3 → 9.0.0](https://registry.npmjs.org/@tanstack/react-table/latest) → RB-E-LISTS | **kept** → RB-E-LISTS note + reading + migrate rule — v9.0.0 went STABLE 2026-08-04 (registry-verified). This is the reopen signal for the v9-reactivity post skipped across 4 prior manifests |
| [react-intl  10.1.18 → 10.1.20](https://registry.npmjs.org/react-intl/latest) → RB-E-I18N | skipped: patch (10.1.20) |
| [lexical  0.48.0 → 0.49.0](https://registry.npmjs.org/lexical/latest) → RB-E-EDITORS | skipped: 0.x minor (0.49.0) — EDITORS carries Lexical without a version claim |
| [lucide-react-native  1.27.0 → 1.28.0](https://registry.npmjs.org/lucide-react-native/latest) → RB-E-SVG | skipped: minor (1.28.0) |
| [react-map-gl  8.1.1 → 8.1.2](https://registry.npmjs.org/react-map-gl/latest) → RB-E-MAPS | skipped: patch (8.1.2) |
| [react-native-nitro-modules  0.36.3 → 0.36.5](https://registry.npmjs.org/react-native-nitro-modules/latest) → RB-E-NATIVE | skipped: patch (0.36.5) — the NATIVE tripwire needs 1.0.0; not fired |
| [expo-modules-core  57.0.7 → 57.0.9](https://registry.npmjs.org/expo-modules-core/latest) → RB-E-NATIVE | skipped: patch (57.0.9) |
| [expo  57.0.8 → 57.0.10](https://registry.npmjs.org/expo/latest) → RB-E-NATIVE | skipped: patch (57.0.10) |
| [react-native-vision-camera  5.2.0 → 5.2.1](https://registry.npmjs.org/react-native-vision-camera/latest) → RB-E-MEDIA | already-held: the 5.2 release is dispositioned in twir-292; VisionCamera also anchors the new ONDEVICE-AI face-recognition reading this pass |
| [expo-image-picker  57.0.6 → 57.0.7](https://registry.npmjs.org/expo-image-picker/latest) → RB-E-MEDIA | skipped: patch (57.0.7) |
| [@op-engineering/op-sqlite  17.1.3 → 17.1.4](https://registry.npmjs.org/@op-engineering/op-sqlite/latest) → RB-E-STORAGE | skipped: patch (17.1.4) — STORAGE's "op-sqlite 17.x" claim still holds |
| [react-native-purchases  10.4.4 → 10.6.0](https://registry.npmjs.org/react-native-purchases/latest) → RB-E-PAYMENTS | skipped: minor (10.6.0) — the RevenueCat option row carries no version claim |
| [react-native-iap  15.6.2 → 16.0.2](https://registry.npmjs.org/react-native-iap/latest) → RB-E-PAYMENTS | **kept** → RB-E-PAYMENTS STALE-FACT CORRECTION — 16.0.2 (2026-08-03), NO npm deprecation flag. The entry called this package "deprecated/archived"; only the standalone REPO was archived (2026-04-26) when it moved into hyodotdev/openiap |
| [expo-iap  4.7.2 → 5.0.1](https://registry.npmjs.org/expo-iap/latest) → RB-E-PAYMENTS | **kept** → RB-E-PAYMENTS — 5.0.1 (2026-08-03), same-day major as react-native-iap out of the same monorepo; evidence the two lines ship in lockstep rather than one superseding the other |
| [@react-three/fiber  9.6.1 → 9.7.0](https://registry.npmjs.org/@react-three/fiber/latest) → RB-E-GAMES | skipped: minor (9.7.0) |
| [vite  8.1.5 → 8.2.0](https://registry.npmjs.org/vite/latest) → RB-E-BUILD | skipped: minor (8.2.0) — BUILD's "Vite 8 on Rolldown" claim unchanged |
| [webpack  5.109.1 → 5.109.2](https://registry.npmjs.org/webpack/latest) → RB-E-BUILD | **kept** → RB-E-BUILD note + option row + source — 5.109 flips experiments.css/html/typescript/asyncWebAssembly to an "auto" default and adopts Vite's import.meta.glob/env/resolve (registry 5.109.2, 2026-07-28; facts verified vs the webpack blog) |
| [@playwright/test  1.62.0 → 1.62.1](https://registry.npmjs.org/@playwright/test/latest) → RB-E-TESTING | **kept** → RB-E-TESTING option row + note + source — 1.62 rebuilds component testing on stories/galleries, adds AbortSignal, WebP screenshots, retryStrategy:'isolated' (1.62.1, 2026-07-30) |
| [react-native-harness  1.3.0 → 1.4.1](https://registry.npmjs.org/react-native-harness/latest) → RB-E-TESTING | skipped: minor (1.4.1) — TESTING already carries harness as early/pin-versions; no status change. Reopen: 2.0 or a stability statement |
| [lint-staged  17.2.0 → 17.3.0](https://registry.npmjs.org/lint-staged/latest) → RB-E-DX | skipped: minor (17.3.0) |
| [turbo  2.10.7 → 2.10.8](https://registry.npmjs.org/turbo/latest) → RB-E-DX | skipped: patch (2.10.8) |
| [nx  23.1.0 → 23.1.1](https://registry.npmjs.org/nx/latest) → RB-E-DX | skipped: patch (23.1.1) |
| [react-doctor  0.9.2 → 0.9.4](https://registry.npmjs.org/react-doctor/latest) → RB-E-DX | skipped: patch (0.9.4) |
| [expo-updates  57.0.10 → 57.0.12](https://registry.npmjs.org/expo-updates/latest) → RB-E-OTA | skipped: patch (57.0.12) |
| [hot-updater  0.35.7 → 0.35.9](https://registry.npmjs.org/hot-updater/latest) → RB-E-OTA | skipped: patch (0.35.9) |
| [react-native-executorch  0.9.2 → 0.9.3](https://registry.npmjs.org/react-native-executorch/latest) → RB-E-ONDEVICE-AI | skipped: patch (0.9.3) |
| [ai  7.0.40 → 7.0.51](https://registry.npmjs.org/ai/latest) → RB-E-AI-UI | skipped: minor (7.0.51) — high-cadence package, no selection fact |
| [agent-device  0.20.1 → 0.20.5](https://registry.npmjs.org/agent-device/latest) → RB-E-AI-DEVTOOLS | skipped: patch (0.20.5) — 0.20.1 was kept last pass into AI-DEVTOOLS |
| [@swmansion/argent  0.17.0 → 0.18.0](https://registry.npmjs.org/@swmansion/argent/latest) → RB-E-AI-DEVTOOLS | skipped: minor (0.18.0) — the Argent 0.17 feature story is dispositioned in twir-292 |
| [software-mansion/react-native-screens: v4.27.0-nightly-20260803-cc174f4ed](https://github.com/software-mansion/react-native-screens/releases/tag/v4.27.0-nightly-20260803-cc174f4ed) → RB-E-NAV | skipped: NIGHTLY build, not a release — RN Screens 5.0-alpha is the real story (dispositioned in twir-292) |
| [auth0/react-native-auth0: v5.11.0](https://github.com/auth0/react-native-auth0/releases/tag/v5.11.0) → RB-E-AUTH | skipped: duplicate of the npm row above (minor) |
| [mui/base-ui: v1.7.0](https://github.com/mui/base-ui/releases/tag/v1.7.0) → RB-E-COMPONENT-LIBS | skipped: minor (1.7.0) — COMPONENT-LIBS already holds Base UI as shadcn's default base; no status change. Reopen: a 2.0, or a change in the shadcn default |
| [software-mansion/react-native-enriched: Release 1.1.0](https://github.com/software-mansion/react-native-enriched-html/releases/tag/v1.1.0) → RB-E-EDITORS | skipped: minor (1.1.0) — EDITORS tracks the RN rich-text field without point versions |
| [callstackincubator/voltra: v2.2.0](https://github.com/callstackincubator/voltra/releases/tag/v2.2.0) → RB-E-NATIVE-UI | skipped: minor (2.2.0) |
| [wcandillon/react-native-webgpu: v0.8.1](https://github.com/wcandillon/react-native-webgpu/releases/tag/v0.8.1) → RB-E-GAMES | already-held: the WebGPU 0.7 importDevice() story is dispositioned in twir-292; this is the following patch |
| [lynx-family/lynx: 4.0.1](https://github.com/lynx-family/lynx/releases/tag/4.0.1) → RB-E-ALT-FRAMEWORKS | skipped: no first-party notes reachable for the 4.x line beyond the tag — ALT-FRAMEWORKS carries Lynx without a version claim, so nothing to invalidate. Reopen: a Lynx 4 announcement post with the breaking-change list |
| [callstackincubator/react-native-harness: v1.4.1](https://github.com/callstackincubator/react-native-harness/releases/tag/v1.4.1) → RB-E-TESTING | skipped: duplicate of the npm row above |
| [millionco/react-doctor: react-doctor@0.9.4](https://github.com/millionco/react-doctor/releases/tag/react-doctor%400.9.4) → RB-E-DX | skipped: duplicate of the npm row above |
| [software-mansion/react-native-executorch: v0.9.3](https://github.com/software-mansion/react-native-executorch/releases/tag/v0.9.3) → RB-E-ONDEVICE-AI | skipped: duplicate of the npm row above |
| [callstack/agent-device: v0.20.5](https://github.com/callstack/agent-device/releases/tag/v0.20.5) → RB-E-AI-DEVTOOLS | skipped: duplicate of the npm row above |
| [callstack.com: "How Cloud Agents Verify Mobile App Behavior Before Merge"](https://www.callstack.com/blog/automating-mobile-qa-with-cloud-agents) → RB-E-REACT-CORE, RB-E-NAV, RB-E-CROSSPLATFORM, RB-E-BROWNFIELD, RB-E-BUILD, RB-E-AI-DEVTOOLS | skipped: cap — AI-DEVTOOLS already holds the Argent autonomous-repro receipt and the agent-device lane; third vendor post on the same beat. Reopen: a non-Callstack production receipt for cloud-agent QA |
| [callstack.com: "AI-Assisted React Native Migration: Brownfield vs. Greenfield"](https://www.callstack.com/blog/migration-to-react-native-in-2026-starts-with-a-delivery-question) → RB-E-REACT-CORE, RB-E-NAV, RB-E-CROSSPLATFORM, RB-E-BROWNFIELD, RB-E-BUILD, RB-E-AI-DEVTOOLS | skipped: cap + vendor framing — BROWNFIELD owns the migration decision and already carries Callstack material. Reopen: a brownfield migration piece with production numbers |
| [callstack.com: "Replay: Faster Mobile QA for AI Agents with agent-device"](https://www.callstack.com/blog/3-minutes-with-an-agent-9-seconds-on-replay) → RB-E-REACT-CORE, RB-E-NAV, RB-E-CROSSPLATFORM, RB-E-BROWNFIELD, RB-E-BUILD, RB-E-AI-DEVTOOLS | skipped: product announcement (Replay for agent-device) |
| [callstack.com: +1 more new posts (high-volume feed — consider dropping this host)](https://callstack.com/blog/rss.xml) → RB-E-REACT-CORE, RB-E-NAV, RB-E-CROSSPLATFORM, RB-E-BROWNFIELD, RB-E-BUILD, RB-E-AI-DEVTOOLS | off-scope: feed-overflow marker (high-volume host), not an article |
| [neciudan.dev: "Frontend CI/CD in the age of AI -- Part 1"](https://neciudan.dev/ci-cd-in-the-age-of-ai-part-1) → RB-E-REACT-CORE, RB-E-STATE, RB-E-META-FRAMEWORKS | skipped: pre-ship — part 1 of an unfinished series. Reopen: the completed series |
| [saschb2b.com: "Never Meet Your Model"](https://saschb2b.com/blog/never-meet-your-model) → RB-E-REACT-CORE, RB-E-DATA, RB-E-SECURITY | skipped: off-scope — AI-practice essay, not React selection knowledge |
| [saschb2b.com: "A 1986 Aircraft Manual Fixed My Anti-Slop Skill"](https://saschb2b.com/blog/aircraft-manual-anti-slop) → RB-E-REACT-CORE, RB-E-DATA, RB-E-SECURITY | skipped: off-scope — agent-authoring practice; the code-craft skill owns that ground |
| [nextjs.org: "Next.js 16.3"](https://nextjs.org/blog/next-16-3) → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS | already-held: RB-E-META-FRAMEWORKS reads the 16.3 Instant Navigations post |
| [tanstack.com: "TanStack Has a New Look"](https://tanstack.com/blog/tanstack-has-a-new-look) → RB-E-TYPESCRIPT, RB-E-NAV, RB-E-META-FRAMEWORKS, RB-E-FORMS, RB-E-SECURITY, RB-E-AI-UI, RB-E-AI-DEVTOOLS | skipped: rebrand announcement, no selection fact (headlined in BOTH TWiR #292 and React Status #485 — corroboration of a rebrand is still a rebrand) |
| [code.visualstudio.com: "Visual Studio Code 1.131"](https://code.visualstudio.com/updates/v1_131) → RB-E-TYPESCRIPT | skipped: off-scope — editor release notes |
| [code.visualstudio.com: "Visual Studio Code 1.132 (Insiders)"](https://code.visualstudio.com/updates/v1_132) → RB-E-TYPESCRIPT | skipped: off-scope — Insiders build |
| [code.visualstudio.com: "MAI-Code-1-Flash: early results from real developer workflows"](https://code.visualstudio.com/blogs/2026/07/29/mai-code-1-flash) → RB-E-TYPESCRIPT | skipped: off-scope — model announcement |
| [github.blog: "Don&#8217;t stop early: Case-folding source code at memory speed"](https://github.blog/engineering/architecture-optimization/dont-stop-early-case-folding-source-code-at-memory-speed/) → RB-E-DATA, RB-E-SECURITY | skipped: off-scope — GitHub search internals |
| [github.blog: "Stacked sessions and pull requests in the GitHub Copilot app"](https://github.blog/ai-and-ml/github-copilot/stacked-sessions-and-pull-requests-in-the-github-copilot-app/) → RB-E-DATA, RB-E-SECURITY | skipped: off-scope — Copilot product news |
| [github.blog: "Tame Dependabot: Group your updates, slow the cadence, keep security fast"](https://github.blog/security/supply-chain-security/tame-dependabot-group-your-updates-slow-the-cadence-keep-security-fast/) → RB-E-DATA, RB-E-SECURITY | skipped: how-to — Dependabot tuning; SECURITY owns the supply-chain layers, not one bot's config. Reopen: a piece tying update cadence to the install-age-gating argument |
| [github.blog: +1 more new posts (high-volume feed — consider dropping this host)](https://github.blog/feed/) → RB-E-DATA, RB-E-SECURITY | off-scope: feed-overflow marker |
| [vercel.com: "Give your eve agent a browser"](https://vercel.com/changelog/give-your-eve-agent-a-browser) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: vendor changelog |
| [vercel.com: "Vercel WAF for Blob is now generally available"](https://vercel.com/changelog/vercel-waf-for-blob-is-now-generally-available) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: vendor changelog — infra product, not React selection |
| [vercel.com: "How Factory scaled its cloud backend to tens of millions of daily requests on Vercel"](https://vercel.com/blog/how-factory-scaled-its-cloud-backend-to-tens-of-millions-of-daily-requests) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: vendor case study — backend scaling, off-scope for this corpus |
| [vercel.com: +17 more new posts (high-volume feed — consider dropping this host)](https://vercel.com/blog/rss.xml) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | off-scope: feed-overflow marker (+17 posts — the watch-graph note about this host staying high-volume still stands) |
| [engineering.fb.com: "GEM Training: How Meta Doubled the Efficiency of Its LLM-Scale Ads Foundation Model"](https://engineering.fb.com/2026/08/03/ml-applications/training-gem-at-llm-scale-meta-ads-recommendation-foundation-model/) → RB-E-STYLING | skipped: off-scope — ads-model training, mis-routed to STYLING by the author-host heuristic |
| [ui.shadcn.com: "July 2026 - Dynamic Search"](https://ui.shadcn.com/docs/changelog/2026-07-dynamic-search) → RB-E-COMPONENT-LIBS | skipped: component changelog (Dynamic Search) — COMPONENT-LIBS tracks shadcn's base/registry decisions, not per-component additions |
| [blog.margelo.com: "Building a Real-Time Face Recognition App in React Native with VisionCamera"](https://blog.margelo.com/on-device-face-recognition-react-native) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-KEYBOARD, RB-E-AI-UI | **kept** → RB-E-ONDEVICE-AI reading + claim — fully on-device pipeline on VisionCamera 5 frame processors with ONNX Runtime; measured (YuNet 3-6ms/frame, SFace ~29ms, ~39ms end-to-end on a Galaxy S21 Ultra). Corroborated by React Status #485 |
| [css-tricks.com: "Gap Decorations Are Now Available, Here’s What’s New"](https://css-tricks.com/css-gap-decorations-now-available/) → RB-E-A11Y | skipped: CSS feature news — A11Y owns assistive-tech behavior, not CSS property launches |
| [css-tricks.com: "Get Ready For the Powerful CSS border-shape Property!"](https://css-tricks.com/get-ready-for-the-powerful-css-border-shape-property/) → RB-E-A11Y | skipped: CSS feature news |
| [css-tricks.com: "What’s !important #16: sibling-index() Animations, Use Cases for the infinity Keyword, Container Stuck Queries, and More"](https://css-tricks.com/whats-important-16/) → RB-E-A11Y | skipped: CSS link roundup |
| [revenuecat.com: ""What do you want me for then?" The icon designer's dilemma in the age of AI"](https://www.revenuecat.com/blog/growth/matthew-skiles-icon-visual-designer-launched-podcast-2026) → RB-E-PAYMENTS | skipped: off-scope — designer interview on a payments vendor blog |
