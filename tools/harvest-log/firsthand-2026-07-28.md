# Harvest manifest — firsthand watch (2026-07-28)
issue: firsthand

105 events from the corpus-derived watch graph (npm dist-tags · GitHub releases · author feeds),
diffed against the committed `.firsthand-state.json`. **Tripwires: 8 armed, 0 fired** — Rive ×2
(RB-E-ANIMATION), Waku 1.0 (RB-E-META-FRAMEWORKS), Solid 2.0 (RB-E-ALT-FRAMEWORKS) and the rest
all re-checked as still-unmet this run; one NEW tripwire was armed this pass (react-native
≥ 0.87.0 → RB-E-ANIMATION's Hermes-regression note).

Disposition policy for npm events: a patch/minor bump is `skipped: version-noise` UNLESS the
entry text QUOTES a version that is now wrong (→ correction) or the bump crosses a major or a
status line. Same discipline as newsletter rows — verify before keeping.

## Kept

| event | disposition |
|---|---|
| [react-native 0.86.0 → 0.86.2 / 0.87.0-rc.3](https://github.com/react/react-native/releases/tag/v0.87.0-rc.3) | **kept** → RB-E-RN-VERSIONS 0.87 row refreshed RC.0 → RC.3 (2026-07-27), plus the SwiftPM backport and the Hermes worklet-metadata fix it now carries |
| [lynx-family/lynx 4.0.0](https://github.com/lynx-family/lynx/releases/tag/4.0.0) | **kept** → RB-E-ALT-FRAMEWORKS option row (MAJOR — the row read "young ecosystem (open-sourced 2025)" with no version; 4.0.0 released 2026-07-20) |
| [callstack/react-native-brownfield 5.0.0](https://github.com/callstack/react-native-brownfield/releases/tag/%40callstack%2Freact-native-brownfield%405.0.0) | **kept** → RB-E-BROWNFIELD note + source (MAJOR with exactly one breaking change: drops Expo SDK 55 support — which scopes the entry's SDK-55 OTA capability-flip to the 4.x line) |
| [agent-device 0.19.3 → 0.20.1](https://registry.npmjs.org/agent-device/latest) · [v0.20.1 release](https://github.com/callstack/agent-device/releases/tag/v0.20.1) | **kept** (correction) → RB-E-AI-DEVTOOLS row quoted "v0.19.x" |
| [@swmansion/argent 0.16.0 → 0.17.0](https://registry.npmjs.org/@swmansion/argent/latest) | **kept** (correction) → RB-E-AI-DEVTOOLS row quoted "0.15" |
| [callstack.com: "Automate React Native Performance With Metrognome"](https://www.callstack.com/blog/an-ai-agent-for-measured-react-native-performance-fixes) | **kept** → RB-E-AI-DEVTOOLS reading (also TWiR #291) |
| [swmansion.com: "How Worklets Bundle Mode accidentally fixed Hermes V1 memory regression"](https://swmansion.com/blog/how-worklets-bundle-mode-accidentally-fixed-Hermes-v1-memory-regression/) | **kept** → RB-E-ANIMATION note + option row + source + new tripwire (also TWiR #291, React Weekly #30) |
| [neciudan.dev: "Do we need state management libraries anymore?"](https://neciudan.dev/do-we-need-state-management-libraries) | **kept** → RB-E-STATE reading + claim (also TWiR #291) |
| [tanstack.com: "We Stopped Using RSC on TanStack.com"](https://tanstack.com/blog/we-stopped-using-rsc-on-tanstack-com) | **kept** → RB-E-META-FRAMEWORKS reading + claim. THE find of this firsthand run and a newsletter miss — it reverses `tanstack.com/blog/react-server-components`, a post already sitting in this entry's `sources:`. Verified numbers on both sides: RSC cut −153KB gzipped and TBT 1,200ms→260ms; then a ~27KiB purpose-built markdown/highlight stack (~18–19KiB more than the RSC version) let plain SSR hold the win without the architecture |
| [nextjs.org: "July 2026 Security Release"](https://nextjs.org/blog/july-2026-security-release) | **kept** → RB-E-META-FRAMEWORKS (see newsletter manifests) |
| [react-router 8.2.0 → 8.3.0](https://registry.npmjs.org/react-router/latest) | **kept** → RB-E-NAV option row + migrate floor (the security context came from React Status #484; firsthand supplied the version receipt) |

## Skipped — version noise (no entry text made wrong)

| event | disposition |
|---|---|
| [@tanstack/react-query 5.101.2 → 5.101.4](https://registry.npmjs.org/@tanstack/react-query/latest) · [@apollo/client 4.2.7 → 4.2.8](https://registry.npmjs.org/@apollo/client/latest) · [@tanstack/react-db 0.1.94 → 0.1.95](https://registry.npmjs.org/@tanstack/react-db/latest) | skipped: version-noise → RB-E-DATA quotes major lines only |
| [corestore 7.11.1 → 7.12.0](https://registry.npmjs.org/corestore/latest) | skipped: version-noise → RB-E-P2P |
| [expo-router 57.0.7 → 57.0.8](https://registry.npmjs.org/expo-router/latest) | skipped: version-noise → RB-E-NAV |
| [next 16.2.10 → 16.2.12](https://registry.npmjs.org/next/latest) · [astro 7.1.1 → 7.1.4](https://registry.npmjs.org/astro/latest) · [waku 1.0.0-beta.7 → 1.0.0-beta.8](https://registry.npmjs.org/waku/latest) | skipped: version-noise → RB-E-META-FRAMEWORKS. Waku is still 1.0-beta, so its tripwire stays armed; note that next 16.2.12 is ABOVE the 16.2.11 security floor recorded this pass |
| [react-hook-form 7.82.0 → 7.83.0](https://registry.npmjs.org/react-hook-form/latest) | skipped: version-noise → RB-E-FORMS |
| [better-auth 1.6.23 → 1.6.25](https://registry.npmjs.org/better-auth/latest) · [next-auth 4.24.14 → 4.24.15](https://registry.npmjs.org/next-auth/latest) · [expo-auth-session 57.0.4 → 57.0.5](https://registry.npmjs.org/expo-auth-session/latest) | skipped: version-noise → RB-E-AUTH |
| [react-native-nitro-fetch 1.5.1 → 1.5.4](https://registry.npmjs.org/react-native-nitro-fetch/latest) · [margelo/react-native-nitro-fetch 1.5.4](https://github.com/margelo/react-native-nitro-fetch/releases/tag/v1.5.4) | skipped: version-noise → RB-E-NETWORKING |
| [electron 43.1.1 → 43.2.0](https://registry.npmjs.org/electron/latest) · [microsoft/react-native-windows 0.81.33](https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_v0.81.33) | skipped: version-noise → RB-E-DESKTOP (rn-windows 0.81-stable line; the entry tracks the 0.84 line) |
| [tamagui 2.4.6 → 2.5.3](https://registry.npmjs.org/tamagui/latest) · [linaria 8.1.0 → 8.1.1](https://registry.npmjs.org/linaria/latest) | skipped: version-noise → RB-E-STYLING. Linaria still publishing does not contradict the wind-down reading (which is about the maintainer's direction, not abandonment) |
| [antd 6.5.1 → 6.5.2](https://registry.npmjs.org/antd/latest) | skipped: version-noise → RB-E-COMPONENT-LIBS |
| [react-native-reanimated 4.5.2 → 4.5.3](https://registry.npmjs.org/react-native-reanimated/latest) · [react-native-worklets 0.11.1 → 0.11.3](https://registry.npmjs.org/react-native-worklets/latest) · [@shopify/react-native-skia 2.9.0 → 2.10.0](https://registry.npmjs.org/@shopify/react-native-skia/latest) · [react-native-screen-transitions 3.8.0 → 3.11.0](https://registry.npmjs.org/react-native-screen-transitions/latest) | skipped: version-noise → RB-E-ANIMATION (worklets stays on the 0.11.x line the entry now cites) |
| [react-window 2.2.7 → 2.3.0](https://registry.npmjs.org/react-window/latest) · [@tanstack/react-virtual 3.14.6 → 3.14.8](https://registry.npmjs.org/@tanstack/react-virtual/latest) | skipped: version-noise → RB-E-LISTS |
| [next-intl 4.13.2 → 4.13.4](https://registry.npmjs.org/next-intl/latest) · [amannn/next-intl v4.13.4](https://github.com/amannn/next-intl/releases/tag/v4.13.4) · [react-i18next 17.0.10 → 17.0.11](https://registry.npmjs.org/react-i18next/latest) | skipped: version-noise → RB-E-I18N |
| [recharts 3.9.2 → 3.10.1](https://registry.npmjs.org/recharts/latest) · [react-native-graph 1.2.0 → 1.3.0](https://registry.npmjs.org/react-native-graph/latest) · [margelo/react-native-graph 1.3.0](https://github.com/margelo/react-native-graph/releases/tag/v1.3.0) | skipped: version-noise → RB-E-CHARTS (also React Status #484) |
| [lucide-react-native 1.25.0 → 1.27.0](https://registry.npmjs.org/lucide-react-native/latest) | skipped: version-noise → RB-E-SVG |
| [@rnmapbox/maps 10.3.2 → 10.3.5](https://registry.npmjs.org/@rnmapbox/maps/latest) | skipped: version-noise → RB-E-MAPS |
| [expo-splash-screen 57.0.4 → 57.0.5](https://registry.npmjs.org/expo-splash-screen/latest) | skipped: version-noise → RB-E-POLISH |
| [react-native-nitro-modules 0.36.1 → 0.36.3](https://registry.npmjs.org/react-native-nitro-modules/latest) · [expo-modules-core 57.0.6 → 57.0.7](https://registry.npmjs.org/expo-modules-core/latest) · [expo 57.0.7 → 57.0.8](https://registry.npmjs.org/expo/latest) | skipped: version-noise → RB-E-NATIVE |
| [react-native-vision-camera 5.1.1 → 5.2.0](https://registry.npmjs.org/react-native-vision-camera/latest) · [react-native-webrtc 124.0.7 → 124.0.8](https://registry.npmjs.org/react-native-webrtc/latest) · [expo-video 57.0.1 → 57.0.2](https://registry.npmjs.org/expo-video/latest) · [expo-image-picker 57.0.5 → 57.0.6](https://registry.npmjs.org/expo-image-picker/latest) | skipped: version-noise → RB-E-MEDIA |
| [@op-engineering/op-sqlite 17.1.2 → 17.1.3](https://registry.npmjs.org/@op-engineering/op-sqlite/latest) | skipped: version-noise → RB-E-STORAGE |
| [react-native-keyboard-controller 1.22.1 → 1.22.2](https://registry.npmjs.org/react-native-keyboard-controller/latest) | skipped: version-noise → RB-E-KEYBOARD |
| [react-native-purchases 10.4.3 → 10.4.4](https://registry.npmjs.org/react-native-purchases/latest) · [react-native-iap 15.5.2 → 15.6.2](https://registry.npmjs.org/react-native-iap/latest) · [expo-iap 4.5.2 → 4.7.2](https://registry.npmjs.org/expo-iap/latest) | skipped: version-noise → RB-E-PAYMENTS |
| [@reactvision/react-viro 2.57.4 → 2.57.5](https://registry.npmjs.org/@reactvision/react-viro/latest) · [wcandillon/react-native-webgpu v0.6.3](https://github.com/wcandillon/react-native-webgpu/releases/tag/v0.6.3) | skipped: version-noise → RB-E-GAMES |
| [@react-native/metro-config 0.86.0 → 0.86.2](https://registry.npmjs.org/@react-native/metro-config/latest) · [webpack 5.108.4 → 5.109.1](https://registry.npmjs.org/webpack/latest) · [facebook/hermes hermes-v260318099.0.1](https://github.com/facebook/hermes/releases/tag/hermes-v260318099.0.1) | skipped: version-noise → RB-E-BUILD |
| [@playwright/test 1.61.1 → 1.62.0](https://registry.npmjs.org/@playwright/test/latest) · [react-test-renderer 19.2.7 → 19.2.8](https://registry.npmjs.org/react-test-renderer/latest) | skipped: version-noise → RB-E-TESTING (react-test-renderer 19.2.8 is the same release train as the security patch recorded in RB-E-SECURITY) |
| [@biomejs/biome 2.5.4 → 2.5.6](https://registry.npmjs.org/@biomejs/biome/latest) · [eslint 10.7.0 → 10.8.0](https://registry.npmjs.org/eslint/latest) · [prettier 3.9.5 → 3.9.6](https://registry.npmjs.org/prettier/latest) · [lint-staged 17.1.0 → 17.2.0](https://registry.npmjs.org/lint-staged/latest) · [turbo 2.10.5 → 2.10.7](https://registry.npmjs.org/turbo/latest) · [react-doctor 0.8.1 → 0.9.2](https://registry.npmjs.org/react-doctor/latest) · [millionco/react-doctor 0.9.2](https://github.com/millionco/react-doctor/releases/tag/react-doctor%400.9.2) | skipped: version-noise → RB-E-DX (the entry cites react-doctor by star count and behaviour, not version) |
| [expo-updates 57.0.8 → 57.0.10](https://registry.npmjs.org/expo-updates/latest) · [hot-updater 0.35.4 → 0.35.7](https://registry.npmjs.org/hot-updater/latest) | skipped: version-noise → RB-E-OTA |
| [ai 7.0.31 → 7.0.40](https://registry.npmjs.org/ai/latest) · [@tanstack/ai 0.41.0 → 0.42.0](https://registry.npmjs.org/@tanstack/ai/latest) · [@tanstack/ai-react 0.18.0 → 0.18.1](https://registry.npmjs.org/@tanstack/ai-react/latest) | skipped: version-noise → RB-E-AI-UI |
| [software-mansion/react-native-screens v4.27.0-nightly-20260727](https://github.com/software-mansion/react-native-screens/releases/tag/v4.27.0-nightly-20260727-da120cc8c) | skipped: pre-ship (nightly build) → RB-E-NAV |

## Skipped — author-feed posts

| event | disposition |
|---|---|
| [callstack.com: "Build a React Native Super App With Re.Pack 5"](https://www.callstack.com/blog/step-by-step-guide-to-super-app-development) | skipped: how-to (same call as twir-291 / React Weekly #30) |
| [callstack.com: "Build a Local AI Agent Terminal With OpenClaw and DGX Spark"](https://www.callstack.com/blog/building-vault-a-dual-screen-terminal-for-self-hosted-ai-agents) | skipped: off-scope (self-hosted-agent hardware project, not React/RN selection) |
| [aurorascharff.no: "Experimenting with RSCs for Performance and UX in Next.js"](https://aurorascharff.no/posts/experimenting-with-rsc-for-performance-and-ux-in-nextjs/) | skipped: cap — RB-E-REACT-CORE already holds this author's "Component Architecture for React Server Components", and RB-E-META-FRAMEWORKS just took the TanStack RSC-reversal slot. Reopen: if the RSC reading thread ever loses its adoption-side case |
| [saschb2b.com: "Sascha - Compacting Experiences"](https://saschb2b.com/blog/sascha-experiences-compacting) | skipped: off-scope (personal/career post; this author's technical posts are already held in 3 entries) |
| [expo.dev: "How Posh went from manual weekly mobile releases to continuous delivery with Expo"](https://expo.dev/blog/posh-manual-weekly-releases-to-continuous-delivery-with-expo) | skipped: cap — RB-E-DX already holds two CI/CD case studies (Expo's own comparison + Doctolib), the second explicitly for scale. Reopen: if the Doctolib reading ages out |
| [expo.dev: "From Expo Router to Detour: Deferred deep linking the right way"](https://expo.dev/blog/deferred-deep-linking-the-right-way) | skipped: how-to — RB-E-NAV already holds the deep-links-with-auth maintainer piece. Reopen: if "Detour" turns out to be a shipped library rather than a technique, it becomes a NAV option row |
| [expo.dev: "Install dev and production side by side with app variants"](https://expo.dev/blog/app-variants-side-by-side) | skipped: how-to (build-config recipe) |
| [tanstack.com: "Introducing TanStack Markdown and TanStack Highlight"](https://tanstack.com/blog/introducing-tanstack-markdown-and-highlight) | skipped: corroboration — this is the companion post to the RSC-reversal reading kept above, which already carries the load-bearing numbers |
| [github.blog ×3 + 4 more](https://github.blog/feed/) — ["The harness is all you need (mostly)"](https://github.blog/ai-and-ml/github-copilot/the-harness-is-all-you-need-mostly/) · ["Copilot app for Beginners"](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-getting-started/) · ["Why Dependabot now waits before issuing version updates"](https://github.blog/security/supply-chain-security/the-case-for-a-cooldown-why-dependabot-now-waits-before-issuing-version-updates/) | skipped: off-scope (vendor product marketing). The Dependabot cooldown is the near-miss — it is the same INSTALL-AGE GATING idea RB-E-SECURITY already carries as a supply-chain option row, now applied by a second major platform; kept out only because the option row already states the practice. FEED HYGIENE: the tool itself flags this host as high-volume; consider dropping it from the watch graph |
| [vercel.com ×3 + 17 more](https://vercel.com/blog/rss.xml) — [regional inference on AI Gateway](https://vercel.com/changelog/regional-inference-now-available-on-ai-gateway) · [eve Slack hooks](https://vercel.com/changelog/eve-adds-new-slack-event-hooks-and-session-controls) · [DeepsecBench](https://vercel.com/blog/deepsecbench-evaluating-model-performance-in-finding-cybersecurity-vulnerabilities) | skipped: off-scope (platform changelog). DeepsecBench is adjacent to the DeepSec row in RB-E-SECURITY but is a MODEL benchmark, not a change to the tool. FEED HYGIENE: 20 posts in one window — this host is mostly changelog noise; the load-bearing Vercel/Next facts arrive via nextjs.org and the newsletters |
| [dx-styles.dev: "The state of zero-runtime CSS-in-JS, mid-2026"](https://dx-styles.dev/blog/state-of-zero-runtime-css-in-js/) | skipped: cap + author-overlap — RB-E-STYLING took this author's Linaria wind-down essay one pass ago (2026-07-20) and already holds the zero-runtime argument twice. Reopen: a landscape survey from a NON-participant |
| [ui.shadcn.com: "July 2026 - Toast"](https://ui.shadcn.com/docs/changelog/2026-07-toast) | skipped: minor-release (also React Status #484) |
| [blog.logrocket.com ×3 + 9 more](https://blog.logrocket.com/feed) — [Tailwind vs StyleX migration](https://blog.logrocket.com/tailwind-css-vs-stylex-a-real-migration-with-20-components/) · [JWT best practices](https://blog.logrocket.com/jwt-authentication-best-practices/) · [Remotion screen recordings](https://blog.logrocket.com/remotion-screen-recordings/) | skipped: content-farm volume (12 posts in one window). The Tailwind-vs-StyleX migration is the only plausible candidate (RB-E-STYLING) and was passed over on source quality — LogRocket posts are SEO-first and rarely carry reproducible methodology. FEED HYGIENE: candidate for removal from the watch graph |
| [css-tricks.com: "writing-mode"](https://css-tricks.com/almanac/properties/w/writing-mode/) | skipped: off-scope (CSS almanac reference page, not an article) |
| [swmansion.com: "Demuxed vs RTC.ON: Which Video Engineering Conference Should You Attend in 2026?"](https://swmansion.com/blog/demuxed-vs-rtcon-2026/) | skipped: off-scope (conference comparison) |
| [revenuecat.com: "A user costs $30 and returns $50…"](https://www.revenuecat.com/blog/growth/yuliya-lennox-solid-starts-sub-club-podcast-2026) · [revenuecat.com: "A license to bill: Selling a Mac app without a merchant of record"](https://www.revenuecat.com/blog/engineering/license-mac-app-merchant-of-record) | skipped: off-scope (subscription-business economics, not RN payments integration) → RB-E-PAYMENTS covers the SDK layer |

## Advocate pass

Flipped in: **"We Stopped Using RSC on TanStack.com"** — first read as one more TanStack blog
post; on re-read it directly reverses a URL already sitting in RB-E-META-FRAMEWORKS `sources:`,
which makes it a correction to the corpus rather than an addition. **Lynx 4.0.0** and
**brownfield 5.0.0** — initially binned with the version noise; both cross a major and both made
existing entry text imprecise.

Argued, held: **Dependabot cooldown** (practice already stated as an option row) and the
**Tailwind-vs-StyleX migration** (source quality).

Process note for the next run: three feeds (github.blog, vercel.com, blog.logrocket.com) produced
~35 of the 105 events and zero keeps, and the tool itself printed the "high-volume feed — consider
dropping this host" hint for all three. Worth pruning the watch graph before signal-to-noise gets
worse.
