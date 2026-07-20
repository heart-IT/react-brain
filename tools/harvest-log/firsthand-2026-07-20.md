# Harvest manifest — firsthand watch (2026-07-20)
issue: firsthand

Weekly `node tools/cli.mjs harvest firsthand` diff vs the committed `.firsthand-state.json`
(192 npm packages + 33 globs skipped · 42 GitHub repos · 38 author feeds · 8 tripwires armed).
46 events since last run. No tripwire fired (8 armed, 0 fired). Keeps: 2 new readings
(swmansion Edge AI survey → ONDEVICE-AI; Margelo RN chat-stack deep-dive → AI-UI), 1 status
change (shadcn adds React Aria as a first-class base → COMPONENT-LIBS), 2 stale-point-version
touch-ups (TanStack AI 0.40→0.41 in AI-UI; react-native-auth0 v5.9→v5.10+MFA in AUTH).

Advocate pass over the skips: no flips. Closest calls — brownfield 4.3.0's ProGuard/R8
support (real pain point, but an additive minor with no version line in the entry; reopen if
it recurs in a newsletter) and the TanStack Table V9 post (held: npm-verified pre-ship;
reopen at v9 stable, DATA is the home).

| event | disposition |
|---|---|
| [@tanstack/react-db  0.1.92 → 0.1.94](https://registry.npmjs.org/@tanstack/react-db/latest) → RB-E-DATA | skipped: 0.x patch stream; DATA cites no point version |
| [expo-router  57.0.6 → 57.0.7](https://registry.npmjs.org/expo-router/latest) → RB-E-NAV | skipped: patch release |
| [@tanstack/react-start  1.168.28 → 1.168.32](https://registry.npmjs.org/@tanstack/react-start/latest) → RB-E-META-FRAMEWORKS | skipped: patch stream |
| [astro  7.0.9 → 7.1.1](https://registry.npmjs.org/astro/latest) → RB-E-META-FRAMEWORKS | skipped: minor; entry cites no Astro point version |
| [waku  1.0.0-beta.6 → 1.0.0-beta.7](https://registry.npmjs.org/waku/latest) → RB-E-META-FRAMEWORKS | skipped: beta churn; entry's "Waku 1.0-beta" line holds |
| [react-hook-form  7.81.0 → 7.82.0](https://registry.npmjs.org/react-hook-form/latest) → RB-E-FORMS | skipped: minor; entry cites no point version |
| [react-native-auth0  5.9.0 → 5.10.0](https://registry.npmjs.org/react-native-auth0/latest) → RB-E-AUTH | **kept (touch-up)** → AUTH option row was pinned at "(v5.9, 2026-07)"; bumped to v5.10 + noted MFA support ([release](https://github.com/auth0/react-native-auth0/releases/tag/v5.10.0), 2026-07-17: MFA + useTrustedWebActivity) |
| [expo-auth-session  57.0.3 → 57.0.4](https://registry.npmjs.org/expo-auth-session/latest) → RB-E-AUTH | skipped: patch release |
| [tailwindcss  4.3.2 → 4.3.3](https://registry.npmjs.org/tailwindcss/latest) → RB-E-STYLING | skipped: patch release |
| [styled-components  6.4.3 → 6.4.4](https://registry.npmjs.org/styled-components/latest) → RB-E-STYLING | skipped: patch release |
| [react-native-gesture-handler  3.0.2 → 3.1.0](https://registry.npmjs.org/react-native-gesture-handler/latest) → RB-E-ANIMATION | skipped: additive minor ([release](https://github.com/software-mansion/react-native-gesture-handler/releases/tag/v3.1.0): Touchable hover, delaysChildPressedState, keyboard-tap fix — no breaking change); ANIMATION's "Gesture Handler 3.0 / hook-based API" fact holds |
| [react-native-worklets  0.11.0 → 0.11.1](https://registry.npmjs.org/react-native-worklets/latest) → RB-E-ANIMATION | skipped: patch; the 0.11.x line fact (fixed in f7e0553) holds |
| [@shopify/react-native-skia  2.8.0 → 2.9.0](https://registry.npmjs.org/@shopify/react-native-skia/latest) → RB-E-ANIMATION | skipped: minor; entry cites no point version |
| [@rive-app/react-native  0.4.18 → 0.4.19](https://registry.npmjs.org/@rive-app/react-native/latest) → RB-E-ANIMATION | skipped: patch; Rive-line tripwires (1.0 condition) did not fire |
| [rive-react-native  9.8.3 → 9.8.5](https://registry.npmjs.org/rive-react-native/latest) → RB-E-ANIMATION | skipped: patch releases |
| [@legendapp/list  3.3.2 → 3.3.3](https://registry.npmjs.org/@legendapp/list/latest) → RB-E-LISTS | skipped: patch; v3 line fact holds (corroborated this week by the Margelo chat post's Legend List v3 pick) |
| [react-intl  10.1.17 → 10.1.18](https://registry.npmjs.org/react-intl/latest) → RB-E-I18N | skipped: patch release |
| [lexical  0.47.0 → 0.48.0](https://registry.npmjs.org/lexical/latest) → RB-E-EDITORS | skipped: 0.x minor; entry cites no point version |
| [lucide-react-native  1.24.0 → 1.25.0](https://registry.npmjs.org/lucide-react-native/latest) → RB-E-SVG | skipped: icon-set minor |
| [expo-modules-core  57.0.5 → 57.0.6](https://registry.npmjs.org/expo-modules-core/latest) → RB-E-NATIVE | skipped: patch release |
| [expo  57.0.6 → 57.0.7](https://registry.npmjs.org/expo/latest) → RB-E-NATIVE | skipped: patch release |
| [react-native-vision-camera  5.1.0 → 5.1.1](https://registry.npmjs.org/react-native-vision-camera/latest) → RB-E-MEDIA | skipped: patch release |
| [expo-image-picker  57.0.4 → 57.0.5](https://registry.npmjs.org/expo-image-picker/latest) → RB-E-MEDIA | skipped: patch release |
| [react-native-iap  15.5.1 → 15.5.2](https://registry.npmjs.org/react-native-iap/latest) → RB-E-PAYMENTS | skipped: patch, no changelog body (same as 07-16 pass); PAYMENTS cites no point version |
| [expo-iap  4.5.1 → 4.5.2](https://registry.npmjs.org/expo-iap/latest) → RB-E-PAYMENTS | skipped: patch, no changelog body |
| [lint-staged  17.0.8 → 17.1.0](https://registry.npmjs.org/lint-staged/latest) → RB-E-DX | skipped: minor; entry cites no point version |
| [react-doctor  0.7.8 → 0.8.1](https://registry.npmjs.org/react-doctor/latest) → RB-E-DX | skipped: patch-scale ([0.8.1](https://github.com/millionco/react-doctor/releases/tag/react-doctor%400.8.1): preserve prod routes named test/tests in scoring); DX cites no point version |
| [expo-updates  57.0.7 → 57.0.8](https://registry.npmjs.org/expo-updates/latest) → RB-E-OTA | skipped: patch release |
| [ai  7.0.29 → 7.0.31](https://registry.npmjs.org/ai/latest) → RB-E-AI-UI | skipped: patch stream |
| [@tanstack/ai  0.40.0 → 0.41.0](https://registry.npmjs.org/@tanstack/ai/latest) → RB-E-AI-UI | **kept (touch-up)** → AI-UI tradeoff text cited "(0.40, active 2026-07)"; bumped to 0.41 — the "pre-1.0" fact holds |
| [@tanstack/ai-react  0.16.4 → 0.18.0](https://registry.npmjs.org/@tanstack/ai-react/latest) → RB-E-AI-UI | skipped: suite version tracked via the @tanstack/ai row above (one touch-up covers it) |
| [software-mansion/react-native-screens: 4.26.2](https://github.com/software-mansion/react-native-screens/releases/tag/4.26.2) → RB-E-NAV | skipped: patch; NAV's 4.26 fact (Tabs stable, RN 0.84+) holds |
| [tw93/pake: V3.15.1 Bridge](https://github.com/tw93/Pake/releases/tag/V3.15.1) → RB-E-DESKTOP | skipped: patch release |
| [microsoft/react-native-windows: react-native-windows_v0.81.32](https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_v0.81.32) → RB-E-DESKTOP | skipped: 0.81-stable release train, routine |
| [nkzw-tech/fbtee: v3.0.0](https://github.com/nkzw-tech/fbtee/releases/tag/v3.0.0) → RB-E-I18N | skipped: major published to npm 2026-07-17 (peer React ^19) but NO release notes exist yet (GH tag has no release body, no CHANGELOG in repo); I18N cites no version and the "modern fbt continuation" fact holds. Reopen: v3 release notes appear or a newsletter covers the changes |
| [callstack/react-native-brownfield: 4.3.0](https://github.com/callstack/react-native-brownfield/releases/tag/%40callstack%2Freact-native-brownfield%404.3.0) → RB-E-BROWNFIELD | skipped: additive minor (ProGuard/R8 minification support); BROWNFIELD cites no rn-brownfield point version |
| [wcandillon/react-native-webgpu: v0.6.1](https://github.com/wcandillon/react-native-webgpu/releases/tag/v0.6.1) → RB-E-GAMES | skipped: single bugfix (surface lifecycle); GAMES cites no point version |
| [millionco/react-doctor: react-doctor@0.8.1](https://github.com/millionco/react-doctor/releases/tag/react-doctor%400.8.1) → RB-E-DX | skipped: same event as the npm react-doctor row above |
| [tanstack.com: "Inside TanStack Table V9 Reactivity"](https://tanstack.com/blog/tanstack-table-v9-reactivity) → RB-E-TYPESCRIPT, RB-E-NAV, RB-E-META-FRAMEWORKS, RB-E-FORMS, RB-E-SECURITY, RB-E-AI-UI, RB-E-AI-DEVTOOLS | skipped: pre-ship — @tanstack/react-table npm latest is 8.21.3 (verified 2026-07-20); the v9 reactivity redesign (per-feature reactive atoms, TableReactivityBindings, opt-in useSelector/Subscribe) is a design-journey post for an unreleased major. Reopen at v9 stable (DATA is the natural home) |
| [vercel.com: "Data downloaded by Vercel Sandbox is now free"](https://vercel.com/changelog/data-downloaded-by-vercel-sandbox-is-now-free) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope (infra pricing changelog, not React selection) |
| [vercel.com: "Runtime logs now show cache reasons"](https://vercel.com/changelog/runtime-logs-now-show-cache-reasons) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope (platform changelog) |
| [vercel.com: "GLM 5.2 is 35% off via Novita on AI Gateway"](https://vercel.com/changelog/glm-5-2-is-35-off-via-novita-on-ai-gateway) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope (pricing promo) |
| [vercel.com: +5 more new posts](https://vercel.com/blog/rss.xml) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: high-volume feed noise. PROCESS NOTE for maintainer: the CLI itself suggests dropping vercel.com from the blog watch — changelog volume drowns signal; the Vercel facts that matter arrive via newsletters anyway |
| [ui.shadcn.com: "July 2026 - React Aria"](https://ui.shadcn.com/docs/changelog/2026-07-react-aria) → RB-E-COMPONENT-LIBS | **kept** → COMPONENT-LIBS shadcn option row + note updated: React Aria is now a FIRST-CLASS component base in shadcn (`init --base aria`), joining Base UI (still default) + Radix; per-base scoped registries, all 8 style variants. Source added; changelog fetched + verified directly |
| [blog.margelo.com: "Building a ChatGPT-Style AI Chat App in React Native with RAG & Streaming"](https://blog.margelo.com/building-native-llm-chat-app-with-rag) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-KEYBOARD | **kept** → RB-E-AI-UI reading + tagged claim (better home than the feed-mapped entries): production RN chat-app architecture — offload socket decoding/markdown parsing/RAG fetches off the JS thread (nitro-websockets, enriched-markdown, Legend List v3, keyboard-controller, true-sheet); Margelo self-promotes its Nitro ecosystem, noted in `what:`. Post fetched + verified (Dave Mkpa-Eke, 2026-07-16) |
| [swmansion.com: "Edge AI in Production: What Apple, Meta, and Google Already Ship On-Device"](https://swmansion.com/blog/edge-ai-in-production-what-apple-meta-and-google-already-ship-on-device/) → RB-E-MEDIA, RB-E-ALT-FRAMEWORKS, RB-E-ONDEVICE-AI, RB-E-AI-DEVTOOLS | **kept** → RB-E-ONDEVICE-AI reading + tagged claim: survey evidence that on-device AI is production-proven (Apple photo search/Siri, Meta ExecuTorch in WhatsApp/Instagram/Messenger, Google scam detection/Gemini Nano) + "fine-tuning is what makes a small model good enough"; vendor self-promotion (RN ExecuTorch is theirs) noted. Post fetched + verified (Martyna Szabat, 2026-07-17) |
