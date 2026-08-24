# Harvest manifest — firsthand watch (2026-08-24)
issue: firsthand

Events from the corpus-derived watch graph (npm dist-tags · GitHub releases · author feeds).
Same disposition discipline as newsletter manifests; verify before keeping.
[rule:*] rows were auto-dispositioned by tools/triage-rules.yaml (gold-admitted, skip-only) — spot-check samples them.

| event | disposition |
|---|---|
| [jotai  2.20.2 → 2.20.3](https://registry.npmjs.org/jotai/latest) → RB-E-STATE | skipped: patch release [rule:npm-patch] |
| [mobx  7.0.0 → 7.0.3](https://registry.npmjs.org/mobx/latest) → RB-E-STATE | skipped: patch-series bump (7.0.0→7.0.3), no selection fact |
| [@tanstack/react-query  5.101.4 → 5.102.2](https://registry.npmjs.org/@tanstack/react-query/latest) → RB-E-DATA | skipped: routine minor, no selection fact |
| [urql  5.0.3 → 5.0.4](https://registry.npmjs.org/urql/latest) → RB-E-DATA | skipped: patch release [rule:npm-patch] |
| [@tanstack/react-db  0.2.1 → 0.3.3](https://registry.npmjs.org/@tanstack/react-db/latest) → RB-E-DATA | skipped: too-early — pre-1.0 adapter churn (@tanstack/db line tracked separately at 0.6 in RB-E-DATA); reopen: 1.0 / API freeze |
| [hrpc  4.3.0 → 4.3.1](https://registry.npmjs.org/hrpc/latest) → RB-E-P2P | skipped: patch release [rule:npm-patch] |
| [expo-router  57.0.14 → 57.0.16](https://registry.npmjs.org/expo-router/latest) → RB-E-NAV | skipped: patch release [rule:npm-patch] |
| [@tanstack/react-router  1.170.29 → 1.170.32](https://registry.npmjs.org/@tanstack/react-router/latest) → RB-E-NAV | skipped: patch release [rule:npm-patch] |
| [next  16.3.1 → 16.3.2](https://registry.npmjs.org/next/latest) → RB-E-META-FRAMEWORKS | skipped: patch release [rule:npm-patch] |
| [@tanstack/react-start  1.168.46 → 1.168.49](https://registry.npmjs.org/@tanstack/react-start/latest) → RB-E-META-FRAMEWORKS | skipped: patch release [rule:npm-patch] |
| [astro  7.2.2 → 7.2.4](https://registry.npmjs.org/astro/latest) → RB-E-META-FRAMEWORKS | skipped: patch release [rule:npm-patch] |
| [react-hook-form  7.85.0 → 7.86.0](https://registry.npmjs.org/react-hook-form/latest) → RB-E-FORMS | skipped: routine minor |
| [better-auth  1.7.0 → 1.7.1](https://registry.npmjs.org/better-auth/latest) → RB-E-AUTH | skipped: patch release |
| [expo-auth-session  57.0.7 → 57.0.9](https://registry.npmjs.org/expo-auth-session/latest) → RB-E-AUTH | skipped: patch release [rule:npm-patch] |
| [@react-native-firebase/auth  26.2.0 → 26.3.2](https://registry.npmjs.org/@react-native-firebase/auth/latest) → RB-E-AUTH | skipped: routine minor |
| [electron  43.4.0 → 43.4.1](https://registry.npmjs.org/electron/latest) → RB-E-DESKTOP | skipped: patch release [rule:npm-patch] |
| [next-yak  9.7.0 → 9.8.0](https://registry.npmjs.org/next-yak/latest) → RB-E-STYLING | skipped: routine minor |
| [react-native-reanimated  4.5.3 → 4.6.0](https://registry.npmjs.org/react-native-reanimated/latest) → RB-E-ANIMATION | skipped: routine minor — release notes verified (RN 0.83–0.87 compat + CSS callbacks on native); entry's compat prose is version-generic, no default/tradeoff change |
| [react-native-worklets  0.11.4 → 0.12.1](https://registry.npmjs.org/react-native-worklets/latest) → RB-E-ANIMATION | skipped: routine minor (Worklets 0.12.x companion of Reanimated 4.6) |
| [framer-motion  13.1.0 → 13.1.1](https://registry.npmjs.org/framer-motion/latest) → RB-E-ANIMATION | skipped: patch release [rule:npm-patch] |
| [motion  13.1.0 → 13.1.1](https://registry.npmjs.org/motion/latest) → RB-E-ANIMATION | skipped: patch release [rule:npm-patch] |
| [lottie-react-native  7.4.0 → 7.5.0](https://registry.npmjs.org/lottie-react-native/latest) → RB-E-ANIMATION | skipped: routine minor |
| [@shopify/react-native-skia  2.11.0 → 2.11.1](https://registry.npmjs.org/@shopify/react-native-skia/latest) → RB-E-ANIMATION | skipped: patch release [rule:npm-patch] |
| [@rive-app/react-native  0.4.19 → 0.4.20](https://registry.npmjs.org/@rive-app/react-native/latest) → RB-E-ANIMATION | skipped: patch release [rule:npm-patch] |
| [@legendapp/list  3.3.6 → 3.3.8](https://registry.npmjs.org/@legendapp/list/latest) → RB-E-LISTS | skipped: patch release [rule:npm-patch] |
| [@tanstack/react-virtual  3.14.9 → 3.14.10](https://registry.npmjs.org/@tanstack/react-virtual/latest) → RB-E-LISTS | skipped: patch release |
| [react-i18next  17.0.11 → 17.0.12](https://registry.npmjs.org/react-i18next/latest) → RB-E-I18N | skipped: patch release [rule:npm-patch] |
| [i18next  26.3.6 → 26.4.0](https://registry.npmjs.org/i18next/latest) → RB-E-I18N | skipped: routine minor |
| [react-intl  10.1.22 → 10.1.23](https://registry.npmjs.org/react-intl/latest) → RB-E-I18N | skipped: patch release [rule:npm-patch] |
| [react-native-enriched-markdown  1.0.1 → 1.0.2](https://registry.npmjs.org/react-native-enriched-markdown/latest) → RB-E-EDITORS | skipped: patch release |
| [lucide-react-native  1.31.0 → 1.33.0](https://registry.npmjs.org/lucide-react-native/latest) → RB-E-SVG | skipped: routine minor (icon additions) |
| [expo-maps  57.0.1 → 57.0.2](https://registry.npmjs.org/expo-maps/latest) → RB-E-MAPS | skipped: patch release [rule:npm-patch] |
| [@maplibre/maplibre-react-native  11.3.6 → 11.3.7](https://registry.npmjs.org/@maplibre/maplibre-react-native/latest) → RB-E-MAPS | skipped: patch release [rule:npm-patch] |
| [react-native-better-maps  1.0.0 → 1.1.0](https://registry.npmjs.org/react-native-better-maps/latest) → RB-E-MAPS | skipped: routine minor of a niche new lib; reopen: adoption signal / newsletter corroboration |
| [@lodev09/react-native-true-sheet  3.11.11 → 3.11.12](https://registry.npmjs.org/@lodev09/react-native-true-sheet/latest) → RB-E-SHEETS | skipped: patch release |
| [expo-splash-screen  57.0.7 → 57.0.8](https://registry.npmjs.org/expo-splash-screen/latest) → RB-E-POLISH | skipped: patch release [rule:npm-patch] |
| [react-native-nitro-modules  0.36.5 → 0.37.0](https://registry.npmjs.org/react-native-nitro-modules/latest) → RB-E-NATIVE | skipped: routine pre-1.0 minor (fast-moving line) |
| [expo-modules-core  57.0.11 → 57.0.13](https://registry.npmjs.org/expo-modules-core/latest) → RB-E-NATIVE | skipped: patch release [rule:npm-patch] |
| [expo  57.0.14 → 57.0.16](https://registry.npmjs.org/expo/latest) → RB-E-NATIVE | skipped: patch release [rule:npm-patch] |
| [react-native-vision-camera  5.2.2 → 5.2.3](https://registry.npmjs.org/react-native-vision-camera/latest) → RB-E-MEDIA | skipped: patch release [rule:npm-patch] |
| [expo-camera  57.0.3 → 57.0.4](https://registry.npmjs.org/expo-camera/latest) → RB-E-MEDIA | skipped: patch release [rule:npm-patch] |
| [expo-image-picker  57.0.11 → 57.0.13](https://registry.npmjs.org/expo-image-picker/latest) → RB-E-MEDIA | skipped: patch release [rule:npm-patch] |
| [@op-engineering/op-sqlite  18.1.1 → 18.1.4](https://registry.npmjs.org/@op-engineering/op-sqlite/latest) → RB-E-STORAGE | skipped: patch release |
| [react-native-purchases  10.7.1 → 10.7.2](https://registry.npmjs.org/react-native-purchases/latest) → RB-E-PAYMENTS | skipped: patch release |
| [react-native-iap  16.3.1 → 16.3.2](https://registry.npmjs.org/react-native-iap/latest) → RB-E-PAYMENTS | skipped: patch release |
| [expo-iap  5.3.1 → 5.3.2](https://registry.npmjs.org/expo-iap/latest) → RB-E-PAYMENTS | skipped: patch release |
| [vite  8.2.1 → 8.2.2](https://registry.npmjs.org/vite/latest) → RB-E-BUILD | skipped: patch release [rule:npm-patch] |
| [vitest  4.1.10 → 4.1.11](https://registry.npmjs.org/vitest/latest) → RB-E-TESTING | skipped: patch release [rule:npm-patch] |
| [@biomejs/biome  2.5.9 → 2.5.10](https://registry.npmjs.org/@biomejs/biome/latest) → RB-E-DX | skipped: patch release [rule:npm-patch] |
| [eslint  10.8.1 → 10.9.0](https://registry.npmjs.org/eslint/latest) → RB-E-DX | skipped: routine minor |
| [turbo  2.10.10 → 2.10.11](https://registry.npmjs.org/turbo/latest) → RB-E-DX | skipped: patch release [rule:npm-patch] |
| [oxlint  1.78.0 → 1.79.0](https://registry.npmjs.org/oxlint/latest) → RB-E-DX | skipped: routine minor |
| [expo-updates  57.0.15 → 57.0.17](https://registry.npmjs.org/expo-updates/latest) → RB-E-OTA | skipped: patch release [rule:npm-patch] |
| [hot-updater  0.36.0 → 0.36.3](https://registry.npmjs.org/hot-updater/latest) → RB-E-OTA | skipped: patch release [rule:npm-patch] |
| [react-native-nitro-mlx  0.5.1 → 0.7.0](https://registry.npmjs.org/react-native-nitro-mlx/latest) → RB-E-ONDEVICE-AI | kept: RB-E-ONDEVICE-AI option-row pin refreshed v0.5 → v0.7 (release notes verified — 0.7.0 = Qwen3 thermal-load reduction, iOS) |
| [ai  7.0.66 → 7.0.77](https://registry.npmjs.org/ai/latest) → RB-E-AI-UI | skipped: patch release [rule:npm-patch] |
| [@tanstack/ai  0.44.1 → 0.48.0](https://registry.npmjs.org/@tanstack/ai/latest) → RB-E-AI-UI | kept: RB-E-AI-UI — RC-phase status flip (see tanstack.com blog row below); pin now 0.48 |
| [@tanstack/ai-react  0.19.2 → 0.21.3](https://registry.npmjs.org/@tanstack/ai-react/latest) → RB-E-AI-UI | already-held: same RC-phase fact as the @tanstack/ai row — one update covers both packages |
| [agent-device  0.20.9 → 0.20.10](https://registry.npmjs.org/agent-device/latest) → RB-E-AI-DEVTOOLS | kept: RB-E-AI-DEVTOOLS pin + receipt refreshed 0.20.9 → 0.20.10 (yesterday's phantom tag now real; npm 0.20.10 + GitHub tag both verified 2026-08-24) |
| [@swmansion/argent  0.21.0 → 0.22.0](https://registry.npmjs.org/@swmansion/argent/latest) → RB-E-AI-DEVTOOLS | skipped: routine pre-1.0 minor |
| [mobxjs/mobx: mobx-react-lite@5.0.3](https://github.com/mobxjs/mobx/releases/tag/mobx-react-lite%405.0.3) → RB-E-STATE | skipped: patch release |
| [software-mansion/react-native-screens: v4.28.0-nightly-20260821-8fe8b874e](https://github.com/software-mansion/react-native-screens/releases/tag/v4.28.0-nightly-20260821-8fe8b874e) → RB-E-NAV | skipped: prerelease/nightly [rule:gh-nightly] |
| [remix-run/react-router: @remix-run/router@1.23.4: Release v6.30.6 (#15412)](https://github.com/remix-run/react-router/releases/tag/%40remix-run%2Frouter%401.23.4) → RB-E-NAV | skipped: legacy 6.x maintenance backport (@remix-run/router), no bearing on current picks |
| [better-auth/better-auth: v1.7.1](https://github.com/better-auth/better-auth/releases/tag/v1.7.1) → RB-E-AUTH | skipped: patch release (dup of npm better-auth row) |
| [auth0/react-native-auth0: v5.11.1-beta.0](https://github.com/auth0/react-native-auth0/releases/tag/v5.11.1-beta.0) → RB-E-AUTH | skipped: prerelease (beta) |
| [microsoft/react-native-windows: react-native-windows_v0.81.35: RELEASE: Releasing 15 package(s) (0.81-stable) (#16394)](https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_v0.81.35) → RB-E-DESKTOP | skipped: routine stable-line patch (0.81.35) |
| [software-mansion/react-native-reanimated: Reanimated - 4.6.0](https://github.com/software-mansion/react-native-reanimated/releases/tag/4.6.0) → RB-E-ANIMATION | skipped: routine minor (dup of npm reanimated row — notes verified there) |
| [shopify/react-native-skia: v2.11.1](https://github.com/Shopify/react-native-skia/releases/tag/v2.11.1) → RB-E-ANIMATION | skipped: patch release |
| [mdjastrzebski/react-native-plain-text: v0.8.0](https://github.com/mdjastrzebski/react-native-plain-text/releases/tag/v0.8.0) → RB-E-LISTS | skipped: too-early — pre-1.0 niche text renderer; reopen: 1.0 or newsletter corroboration |
| [software-mansion/enriched-markdown: v1.0.2](https://github.com/software-mansion/enriched-markdown/releases/tag/v1.0.2) → RB-E-EDITORS | skipped: patch release |
| [software-mansion/react-native-enriched-markdown: v1.0.2](https://github.com/software-mansion/enriched-markdown/releases/tag/v1.0.2) → RB-E-EDITORS | skipped: patch release (dup row — same tag) |
| [oblador/react-native-vector-icons: @react-native-vector-icons/zocial@13.1.3](https://github.com/oblador/react-native-vector-icons/releases/tag/%40react-native-vector-icons%2Fzocial%4013.1.3) → RB-E-SVG | skipped: per-font-package patch |
| [gmi-software/react-native-better-maps: v1.1.0](https://github.com/gmi-software/react-native-better-maps/releases/tag/v1.1.0) → RB-E-MAPS | skipped: routine minor (dup of npm better-maps row) |
| [op-engineering/op-sqlite: Release 18.1.4](https://github.com/OP-Engineering/op-sqlite/releases/tag/18.1.4) → RB-E-STORAGE | skipped: patch release (dup of npm op-sqlite row) |
| [hyodotdev/openiap: react-native-iap 16.3.2](https://github.com/hyodotdev/openiap/releases/tag/react-native-iap-16.3.2) → RB-E-PAYMENTS | skipped: patch release (dup of npm react-native-iap row) |
| [callstack/react-native-brownfield: @callstack/react-native-brownfield@5.0.2](https://github.com/callstack/react-native-brownfield/releases/tag/%40callstack%2Freact-native-brownfield%405.0.2) → RB-E-BROWNFIELD | skipped: patch release |
| [wcandillon/react-native-webgpu: v0.8.4](https://github.com/wcandillon/react-native-webgpu/releases/tag/v0.8.4) → RB-E-GAMES | skipped: patch release |
| [facebook/hermes: hermes-v250829098.0.17: Prepare fixes for Hermes 250829098.0.17 (#2151)](https://github.com/facebook/hermes/releases/tag/hermes-v250829098.0.17) → RB-E-BUILD | skipped: routine internal Hermes cut (calendar-versioned) |
| [codemagic-ci-cd/codemagic-patch: @codemagic/react-native-patch@0.2.0](https://github.com/codemagic-ci-cd/codemagic-patch/releases/tag/%40codemagic%2Freact-native-patch%400.2.0) → RB-E-OTA | skipped: too-early — 0.2.0 patching tool; reopen: adoption signal / newsletter corroboration |
| [mercuretechnologies/xprem: v3.1.2](https://github.com/mercuretechnologies/xprem/releases/tag/v3.1.2) → RB-E-OTA | skipped: patch release |
| [corasan/react-native-nitro-mlx: v0.7.0](https://github.com/henrypldev/react-native-nitro-mlx/releases/tag/v0.7.0) → RB-E-ONDEVICE-AI | already-held: same fact as the npm nitro-mlx row (kept above) |
| [callstack/agent-device: v0.20.10](https://github.com/callstack/agent-device/releases/tag/v0.20.10) → RB-E-AI-DEVTOOLS | already-held: same fact as the npm agent-device row (kept above) |
| [callstack.com: "Automating React Native Evals With Airflow"](https://www.callstack.com/blog/automating-react-native-evals-with-airflow) → RB-E-REACT-CORE, RB-E-NAV, RB-E-CROSSPLATFORM, RB-E-BROWNFIELD, RB-E-BUILD, RB-E-AI-DEVTOOLS | skipped: how-to — Callstack's internal eval-orchestration infra (Airflow), no durable selection fact; reopen: published bench results or a shipped tool |
| [expo.dev: "Building a native-first social platform with Expo"](https://expo.dev/blog/building-a-native-first-social-platform-with-expo) → RB-E-RN-VERSIONS, RB-E-NAV, RB-E-NETWORKING, RB-E-ANIMATION, RB-E-SVG, RB-E-NATIVE, RB-E-MEDIA, RB-E-NATIVE-UI, RB-E-BUILD, RB-E-DX, RB-E-OTA, RB-E-AI-DEVTOOLS | skipped: case-study/corroboration — guest post; App Intents / expo-widgets / on-device Apple Intelligence capabilities already held in RB-E-NATIVE-UI |
| [nextjs.org: "Upcoming Next.js August Security Release"](https://nextjs.org/blog/upcoming-nextjs-security-release-august-2026) → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS | kept: RB-E-META-FRAMEWORKS — tripwire wired (next ≥16.3.3) for the pre-announced 2026-08-26 critical security release (16.3.3 + 15.5.24); post URL added to sources. Pre-ship, but the npm-patch rule would silently swallow the patch bump, so the tripwire IS the reopen mechanism |
| [nextjs.org: "Building App-like Experiences with Next.js 16.3"](https://nextjs.org/blog/building-app-like-experiences-with-nextjs-16-3) → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS | skipped: how-to/marketing feature tour of the already-shipped 16.3 line |
| [engineeringblog.yelp.com: "Building Menu Vision: Real-Time Dish Recognition"](https://engineeringblog.yelp.com/2026/08/building-menu-vision-real-time-dish-recognition.html) → RB-E-TYPESCRIPT | skipped: off-scope — backend/ML case study, no React selection fact |
| [tanstack.com: "TanStack AI Enters the RC Phase"](https://tanstack.com/blog/tanstack-ai-rc) → RB-E-TYPESCRIPT, RB-E-NAV, RB-E-META-FRAMEWORKS, RB-E-FORMS, RB-E-LISTS, RB-E-SECURITY, RB-E-AI-UI, RB-E-AI-DEVTOOLS | kept: RB-E-AI-UI status flip — TanStack AI enters RC (2026-08-21): 24 tree-shakable provider adapters, AG-UI adopted as official protocol; option row + default + when-clause updated, 1.0 tripwire added, blog URL in sources |
| [code.visualstudio.com: "Visual Studio Code 1.135 (Insiders)"](https://code.visualstudio.com/updates/v1_135) → RB-E-TYPESCRIPT | skipped: off-scope routine editor release [rule:vscode-updates] |
| [tkdodo.eu: "Reliable Query Prefetching with TanStack Router"](https://tkdodo.eu/blog/reliable-query-prefetching-with-tanstack-router) → RB-E-STATE, RB-E-DATA, RB-E-TESTING | kept: RB-E-DATA reading — series #4: queryOptions in route context (ensureQueryData + useRouteContext) kills loader/component prefetch divergence; claim-tagged for @tanstack/react-router repos |
| [github.blog: "The August 17 outage, and the work ahead"](https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead/) → RB-E-DATA, RB-E-SECURITY | skipped: off-scope — platform incident postmortem, no selection fact |
| [github.blog: "GitHub Copilot app for Beginners: Managing your work"](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-managing-your-work/) → RB-E-DATA, RB-E-SECURITY | skipped: how-to/marketing (Copilot beginners series) |
| [thoughtbot.com: "Inserting State Transitions in Postgres"](https://feed.thoughtbot.com/link/24077/17427055/inserting-state-transitions-in-postgres) → RB-E-NAV, RB-E-AUTH | skipped: off-scope — backend SQL pattern |
| [thoughtbot.com: "Don’t hire thoughtbot to write code"](https://feed.thoughtbot.com/link/24077/17424779/don-t-hire-thoughtbot-to-write-code) → RB-E-NAV, RB-E-AUTH | skipped: off-scope — consultancy positioning essay |
| [thoughtbot.com: "AI makes creating software faster, but in regulated industries, judgment matters more"](https://feed.thoughtbot.com/link/24077/17424780/ai-makes-creating-software-faster-but-in-regulated-industries-judgment-matters-more) → RB-E-NAV, RB-E-AUTH | skipped: off-scope — org/process essay |
| [thoughtbot.com: +2 more new posts (high-volume feed — consider dropping this host)](https://feed.thoughtbot.com/) → RB-E-NAV, RB-E-AUTH | skipped: overflow marker — feed stays (measured 50% keep rate, ledger 2026-08-18); none of this week's titles are in-scope |
| [ui.shadcn.com: "August 2026 - Private GitHub Registries"](https://ui.shadcn.com/docs/changelog/2026-08-private-github-registries) → RB-E-COMPONENT-LIBS | kept: RB-E-COMPONENT-LIBS — shadcn GitHub registries now install from PRIVATE repos (gh CLI credentials or GH_TOKEN in CI); option row updated + changelog URL in sources |
| [swmansion.com: "React Native Gesture Handler's Touchable: The Button We Wish We Had Sooner"](https://swmansion.com/blog/react-native-gesture-handler-s-touchable-the-button-we-wish-we-had-sooner/) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-ALT-FRAMEWORKS, RB-E-ONDEVICE-AI, RB-E-AI-DEVTOOLS | kept: RB-E-ANIMATION — reading added (claim-tagged for react-native-gesture-handler) + option row: RNGH 3's unified Touchable replaces/deprecates the 9 legacy button exports |
| [swmansion.com: "Introducing Voyager: a modern BEAM inspector for Erlang, Elixir and Gleam"](https://swmansion.com/blog/voyager-beam-inspector/) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-ALT-FRAMEWORKS, RB-E-ONDEVICE-AI, RB-E-AI-DEVTOOLS | skipped: off-scope — BEAM/Erlang tooling |
| [swmansion.com: "Haptic Feedback on the Web: Why the Web Deliberately Refuses to Be as Tactile as Native Apps?"](https://swmansion.com/blog/haptic-feedback-on-the-web-why-the-web-deliberately-refuses-to-be-as-tactile-as-native-apps/) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-ALT-FRAMEWORKS, RB-E-ONDEVICE-AI, RB-E-AI-DEVTOOLS | skipped: off-scope — web-platform limitation essay, no selection change |
| [blog.margelo.com: "Building a 3D AI assistant using React Native and GPT-Realtime"](https://margelo.com/blog/building-a-3d-ai-avatar-in-react-native) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-KEYBOARD, RB-E-ONDEVICE-AI, RB-E-AI-UI | skipped: how-to — 30-min tutorial; the durable keep-JS-thread-free architecture from this author is already held (MargeloChat reading, RB-E-AI-UI) |
| [css-tricks.com: "Resolved: CSS Class Prefix Selector"](https://css-tricks.com/resolved-css-class-prefix-selector/) → RB-E-A11Y | skipped: off-scope — CSS selector trivia |
| [css-tricks.com: "CSS Navigation Matching, Early Days"](https://css-tricks.com/css-navigation-matching-early-days/) → RB-E-A11Y | skipped: too-early — early-days CSS platform feature, no shipping browser support; reopen: baseline support |
| [css-tricks.com: "WordPress.com Student Plan"](https://css-tricks.com/wordpress-student-plan/) → RB-E-A11Y | skipped: off-scope — hosting plan announcement |
| [margelo.com: "Building a 3D AI assistant using React Native and GPT-Realtime"](https://margelo.com/blog/building-a-3d-ai-avatar-in-react-native) → RB-E-MEDIA, RB-E-ONDEVICE-AI | skipped: dup of the blog.margelo.com row above (same URL) |
| [revenuecat.com: "Visible has never sent a lifecycle email. It's at $10M ARR."](https://www.revenuecat.com/blog/growth/luke-martin-fuller-visible-sub-club-podcast-2026) → RB-E-PAYMENTS | skipped: off-scope — growth/marketing story |
| [revenuecat.com: "We studied 3,500+ AI-powered apps to see why some retain users better than others"](https://www.revenuecat.com/blog/growth/ai-app-retention-study) → RB-E-PAYMENTS | skipped: off-scope — business retention study, no engineering selection fact |
