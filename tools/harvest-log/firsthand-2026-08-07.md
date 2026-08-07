# Harvest manifest — firsthand watch (2026-08-07)
issue: firsthand

Events from the corpus-derived watch graph (npm dist-tags · GitHub releases · author feeds).
Same disposition discipline as newsletter manifests; verify before keeping.
Follow-up to firsthand-2026-08-06.md (one day's drift + the margelo feed host migration).

| event | disposition |
|---|---|
| [expo-router  57.0.10 → 57.0.11](https://registry.npmjs.org/expo-router/latest) → RB-E-NAV | skipped: patch release |
| [@tanstack/react-router  1.170.20 → 1.170.22](https://registry.npmjs.org/@tanstack/react-router/latest) → RB-E-NAV | skipped: patch release |
| [@tanstack/react-start  1.168.37 → 1.168.39](https://registry.npmjs.org/@tanstack/react-start/latest) → RB-E-META-FRAMEWORKS | skipped: patch release |
| [astro  7.1.6 → 7.2.0](https://registry.npmjs.org/astro/latest) → RB-E-META-FRAMEWORKS | skipped: minor release (META-FRAMEWORKS tracks the major line) |
| [styled-components  6.5.0 → 6.5.1](https://registry.npmjs.org/styled-components/latest) → RB-E-STYLING | skipped: patch release |
| [antd  6.5.3 → 6.5.4](https://registry.npmjs.org/antd/latest) → RB-E-COMPONENT-LIBS | skipped: patch release |
| [@shopify/react-native-skia  2.10.2 → 2.11.0](https://registry.npmjs.org/@shopify/react-native-skia/latest) → RB-E-ANIMATION | skipped: minor release (ANIMATION's held Skia fact is the 2.10 NativeState migration; nothing selection-facing here) |
| [@tanstack/react-table  9.0.0 → 9.0.1](https://registry.npmjs.org/@tanstack/react-table/latest) → RB-E-LISTS | already-held: RB-E-LISTS carries v9 stable (kept 2026-08-04); 9.0.1 is a patch on the held line |
| [slate  0.126.0 → 0.126.1](https://registry.npmjs.org/slate/latest) → RB-E-EDITORS | skipped: patch release |
| [lucide-react-native  1.28.0 → 1.30.0](https://registry.npmjs.org/lucide-react-native/latest) → RB-E-SVG | skipped: minor release |
| [expo-modules-core  57.0.9 → 57.0.10](https://registry.npmjs.org/expo-modules-core/latest) → RB-E-NATIVE | skipped: patch release |
| [expo  57.0.10 → 57.0.11](https://registry.npmjs.org/expo/latest) → RB-E-NATIVE | skipped: patch release |
| [expo-image-picker  57.0.7 → 57.0.8](https://registry.npmjs.org/expo-image-picker/latest) → RB-E-MEDIA | skipped: patch release |
| [react-native-purchases  10.6.0 → 10.7.0](https://registry.npmjs.org/react-native-purchases/latest) → RB-E-PAYMENTS | skipped: minor release |
| [vite  8.2.0 → 8.2.1](https://registry.npmjs.org/vite/latest) → RB-E-BUILD | skipped: patch release |
| [react-doctor  0.9.5 → 0.9.6](https://registry.npmjs.org/react-doctor/latest) → RB-E-DX | skipped: 0.x patch |
| [react-native-nitro-mlx  0.5.0 → 0.5.1](https://registry.npmjs.org/react-native-nitro-mlx/latest) → RB-E-ONDEVICE-AI | skipped: 0.x patch |
| [ai  7.0.54 → 7.0.56](https://registry.npmjs.org/ai/latest) → RB-E-AI-UI | skipped: patch release |
| [@tanstack/ai  0.43.0 → 0.43.1](https://registry.npmjs.org/@tanstack/ai/latest) → RB-E-AI-UI | skipped: 0.x patch |
| [@tanstack/ai-react  0.19.0 → 0.19.1](https://registry.npmjs.org/@tanstack/ai-react/latest) → RB-E-AI-UI | skipped: 0.x patch |
| [agent-device  0.20.5 → 0.20.6](https://registry.npmjs.org/agent-device/latest) → RB-E-AI-DEVTOOLS | skipped: 0.x patch |
| [software-mansion/react-native-screens: v4.27.0-nightly-20260807-ba6bd9e22](https://github.com/software-mansion/react-native-screens/releases/tag/v4.27.0-nightly-20260807-ba6bd9e22) → RB-E-NAV | skipped: nightly |
| [shopify/react-native-skia: v2.12.0-next.1](https://github.com/Shopify/react-native-skia/releases/tag/v2.12.0-next.1) → RB-E-ANIMATION | skipped: prerelease |
| [wcandillon/react-native-webgpu: v0.8.2](https://github.com/wcandillon/react-native-webgpu/releases/tag/v0.8.2) → RB-E-GAMES | skipped: 0.x patch |
| [millionco/react-doctor: react-doctor@0.9.6](https://github.com/millionco/react-doctor/releases/tag/react-doctor%400.9.6) → RB-E-DX | skipped: 0.x patch (npm row above) |
| [corasan/react-native-nitro-mlx: v0.5.1](https://github.com/henrypldev/react-native-nitro-mlx/releases/tag/v0.5.1) → RB-E-ONDEVICE-AI | skipped: 0.x patch (npm row above) |
| [callstack/agent-device: v0.20.6](https://github.com/callstack/agent-device/releases/tag/v0.20.6) → RB-E-AI-DEVTOOLS | skipped: 0.x patch (npm row above) |
| [nextjs.org: "Making navigations instant in v0"](https://nextjs.org/blog/making-v0-navigations-instant) → RB-E-TYPESCRIPT, RB-E-META-FRAMEWORKS | skipped: corroboration — META-FRAMEWORKS already reads the official Next 16.3 instant-navigations post; this is the same primitives applied to v0 |
| [github.blog: "A guide to slash commands in the GitHub Copilot app"](https://github.blog/ai-and-ml/github-copilot/a-guide-to-slash-commands-in-the-github-copilot-app/) → RB-E-DATA, RB-E-SECURITY | skipped: off-scope how-to (Copilot product guide) |
| [github.blog: "How we took malware advisories beyond npm"](https://github.blog/security/supply-chain-security/how-we-took-malware-advisories-beyond-npm/) → RB-E-DATA, RB-E-SECURITY | skipped: engineering internals (OSV importer across 8 ecosystems; fetch-verified) — the program itself lands in SECURITY via the kept first-party umbrella post (twir-293) |
| [vercel.com: "Free domain now included with new Pro subscriptions"](https://vercel.com/changelog/free-domain-now-included-with-new-pro-subscriptions) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope platform chrome |
| [vercel.com: "Introducing Agent Plugins"](https://vercel.com/blog/introducing-agent-plugins) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope platform feature (Vercel agent-platform layer; Eve context already noted in AI-UI — reopen if a React-facing SDK surface recurs) |
| [vercel.com: "Seedance 2.5 now available on Vercel AI Gateway"](https://vercel.com/changelog/seedance-2-5-now-available-on-vercel-ai-gateway) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope (gateway model catalog) |
| [vercel.com: +4 more new posts (high-volume feed — consider dropping this host)](https://vercel.com/blog/rss.xml) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: high-volume platform feed — MAINTAINER FLAG (second manifest in a row): consider dropping vercel.com from the blog watch |
| [blog.margelo.com: "Building a Real-Time Face Recognition App in React Native with VisionCamera"](https://margelo.com/blog/on-device-face-recognition-react-native) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-KEYBOARD, RB-E-ONDEVICE-AI, RB-E-AI-UI | already-held: RB-E-ONDEVICE-AI reading (kept 2026-08-04 at blog.margelo.com; this is the same post re-reported from the migrated margelo.com/blog host) |
| [blog.margelo.com: "Building a ChatGPT-Style AI Chat App in React Native with RAG & Streaming"](https://margelo.com/blog/building-native-llm-chat-app-with-rag) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-KEYBOARD, RB-E-ONDEVICE-AI, RB-E-AI-UI | already-held: RB-E-AI-UI reading (host migration re-report) |
| [blog.margelo.com: "Rewriting Rive React Native with Nitro Modules: up to 94× Faster Multi-View Loads"](https://margelo.com/blog/rewriting-rive-react-native-with-nitro-modules) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-KEYBOARD, RB-E-ONDEVICE-AI, RB-E-AI-UI | already-held: RB-E-ANIMATION reading + option row (host migration re-report) |
| [blog.margelo.com: +9 more new posts (high-volume feed — consider dropping this host)](https://blog.margelo.com/feed.xml) → RB-E-ANIMATION, RB-E-NATIVE, RB-E-MEDIA, RB-E-KEYBOARD, RB-E-ONDEVICE-AI, RB-E-AI-UI | skipped: feed host migration (blog.margelo.com → margelo.com/blog) re-reported the back catalog as new — all three named posts above are held; NOT a drop candidate (margelo is a three-readings-held author host) |
| [css-tricks.com: "Using and Styling the Dialog Element"](https://css-tricks.com/using-and-styling-the-dialog-element/) → RB-E-A11Y | skipped: web-platform how-to (element styling walkthrough, not a selection fact) |
| [css-tricks.com: "2026 State of CSS, Devs Surveys"](https://css-tricks.com/2026-state-of-css-devs-surveys/) → RB-E-A11Y | skipped: off-scope (survey announcement) |
