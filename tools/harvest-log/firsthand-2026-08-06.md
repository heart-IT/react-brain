# Harvest manifest — firsthand watch (2026-08-06)
issue: firsthand

Events from the corpus-derived watch graph (npm dist-tags · GitHub releases · author feeds).
Same disposition discipline as newsletter manifests; verify before keeping.
Triaged 2026-08-07 (poll ran 2026-08-06; the follow-up poll is firsthand-2026-08-07.md — several
version rows here are superseded by newer events there and are dispositioned on the same facts).

| event | disposition |
|---|---|
| [@apollo/client  4.2.9 → 4.2.10](https://registry.npmjs.org/@apollo/client/latest) → RB-E-DATA | skipped: patch release |
| [@tanstack/react-router  1.170.18 → 1.170.20](https://registry.npmjs.org/@tanstack/react-router/latest) → RB-E-NAV | skipped: patch release |
| [@tanstack/react-start  1.168.35 → 1.168.37](https://registry.npmjs.org/@tanstack/react-start/latest) → RB-E-META-FRAMEWORKS | skipped: patch release |
| [better-auth  1.6.25 → 1.6.26](https://registry.npmjs.org/better-auth/latest) → RB-E-AUTH | skipped: patch release |
| [electron  43.2.0 → 43.3.0](https://registry.npmjs.org/electron/latest) → RB-E-DESKTOP | skipped: minor release (DESKTOP tracks major lines) |
| [tamagui  2.6.3 → 2.7.2](https://registry.npmjs.org/tamagui/latest) → RB-E-STYLING | skipped: minor release |
| [styled-components  6.4.4 → 6.5.0](https://registry.npmjs.org/styled-components/latest) → RB-E-STYLING | skipped: minor on the v6 line — STYLING's stance (runtime CSS-in-JS, avoid for new work; v7 prerelease is the tracked line) unchanged |
| [framer-motion  12.43.0 → 13.0.0](https://registry.npmjs.org/framer-motion/latest) → RB-E-ANIMATION | **kept** → RB-E-ANIMATION note: Motion 13 drops @emotion/is-prop-valid auto-detection — styled-components/Emotion users must inject prop validation via MotionConfig (verified vs npm + motion.dev upgrade guide; GitHub releases page is empty for v13) |
| [motion  12.43.0 → 13.0.0](https://registry.npmjs.org/motion/latest) → RB-E-ANIMATION | **kept** → same fact as framer-motion row above (lockstep major; neither package deprecated, verified vs npm 2026-08-07) |
| [lottie-react-native  7.3.8 → 7.4.0](https://registry.npmjs.org/lottie-react-native/latest) → RB-E-ANIMATION | skipped: minor release |
| [@shopify/react-native-skia  2.10.1 → 2.10.2](https://registry.npmjs.org/@shopify/react-native-skia/latest) → RB-E-ANIMATION | skipped: patch release |
| [next-intl  4.13.4 → 4.13.5](https://registry.npmjs.org/next-intl/latest) → RB-E-I18N | skipped: patch release |
| [react-native-vision-camera  5.2.1 → 5.2.2](https://registry.npmjs.org/react-native-vision-camera/latest) → RB-E-MEDIA | skipped: patch release |
| [@op-engineering/op-sqlite  17.1.4 → 17.1.5](https://registry.npmjs.org/@op-engineering/op-sqlite/latest) → RB-E-STORAGE | skipped: patch release |
| [react-native-keyboard-controller  1.22.2 → 1.22.3](https://registry.npmjs.org/react-native-keyboard-controller/latest) → RB-E-KEYBOARD | skipped: patch release |
| [@biomejs/biome  2.5.6 → 2.5.7](https://registry.npmjs.org/@biomejs/biome/latest) → RB-E-DX | skipped: patch release |
| [react-doctor  0.9.4 → 0.9.5](https://registry.npmjs.org/react-doctor/latest) → RB-E-DX | skipped: 0.x patch |
| [hot-updater  0.35.9 → 0.35.11](https://registry.npmjs.org/hot-updater/latest) → RB-E-OTA | skipped: 0.x patch |
| [ai  7.0.51 → 7.0.54](https://registry.npmjs.org/ai/latest) → RB-E-AI-UI | skipped: patch release |
| [@tanstack/ai  0.42.0 → 0.43.0](https://registry.npmjs.org/@tanstack/ai/latest) → RB-E-AI-UI | skipped: 0.x minor (pre-1.0 churn; AI-UI tracks the line, not point versions) |
| [@tanstack/ai-react  0.18.1 → 0.19.0](https://registry.npmjs.org/@tanstack/ai-react/latest) → RB-E-AI-UI | skipped: 0.x minor |
| [@swmansion/argent  0.18.0 → 0.19.0](https://registry.npmjs.org/@swmansion/argent/latest) → RB-E-AI-DEVTOOLS | skipped: 0.x minor (entry's pin-versions/expect-churn culture; the durable Argent-adjacent keep this pass is AppControlBench, see twir-293) |
| [react/react-native: 0.87.0-rc.4](https://github.com/react/react-native/releases/tag/v0.87.0-rc.4) → RB-E-RN-VERSIONS, RB-E-NETWORKING | skipped: pre-ship RC iteration (RN-VERSIONS carries the 0.87 RC row; ANIMATION tripwire armed on ≥0.87.0 stable) |
| [software-mansion/react-native-screens: v4.27.0-nightly-20260804-3dc5beb10](https://github.com/software-mansion/react-native-screens/releases/tag/v4.27.0-nightly-20260804-3dc5beb10) → RB-E-NAV | skipped: nightly |
| [remix-run/react-router: v0.0.0-experimental-479e73b7b](https://github.com/remix-run/react-router/releases/tag/v0.0.0-experimental-479e73b7b) → RB-E-NAV | skipped: experimental tag |
| [amannn/next-intl: v4.13.5](https://github.com/amannn/next-intl/releases/tag/v4.13.5) → RB-E-I18N | skipped: patch release (npm row above) |
| [margelo/react-native-runtimes: @react-native-runtimes/state v0.1.0-alpha.2](https://github.com/margelo/react-native-runtimes/releases/tag/%40react-native-runtimes%2Fstate%400.1.0-alpha.2) → RB-E-NATIVE | skipped: too-early alpha (NATIVE holds the runtimes lead note — "watch for adoption before citing as an option"; reopen: a stable line or recurrence-grade adoption signal) |
| [millionco/react-doctor: react-doctor@0.9.5](https://github.com/millionco/react-doctor/releases/tag/react-doctor%400.9.5) → RB-E-DX | skipped: 0.x patch (npm row above) |
| [neciudan.dev: "Frontend CI/CD in the age of AI - Part 2: Deployments"](https://neciudan.dev/ci-cd-in-the-age-of-ai-part-2-deployments) → RB-E-REACT-CORE, RB-E-STATE, RB-E-META-FRAMEWORKS | skipped: series still in progress — part 1 skipped 2026-08-04 with reopen "the completed series"; carry the same signal |
| [expo.dev: "Fable 5 vs GPT-5.6 Sol: I spent $2,000 and 2 billion tokens to find out who wins"](https://expo.dev/blog/fable-5-vs-gpt-5-6-sol-expo-apps) → RB-E-RN-VERSIONS, RB-E-NAV, RB-E-NETWORKING, RB-E-ANIMATION, RB-E-SVG, RB-E-NATIVE, RB-E-MEDIA, RB-E-NATIVE-UI, RB-E-BUILD, RB-E-DX, RB-E-OTA, RB-E-AI-DEVTOOLS | **kept** → RB-E-AI-DEVTOOLS reading — first-party measured model shootout on real Expo apps; the durable lesson is the validation-loop cost structure (content verified via browser-UA curl — expo.dev/blog no longer blocks it; playbook note updated) |
| [tanstack.com: "Announcing TanStack Table V9"](https://tanstack.com/blog/announcing-tanstack-table-v9) → RB-E-TYPESCRIPT, RB-E-NAV, RB-E-META-FRAMEWORKS, RB-E-FORMS, RB-E-LISTS, RB-E-SECURITY, RB-E-AI-UI, RB-E-AI-DEVTOOLS | already-held: RB-E-LISTS — v9 stable + reactivity architecture kept 2026-08-04 (sources: the v9-reactivity post + npm registry); this is the companion announce URL, same facts |
| [code.visualstudio.com: "Visual Studio Code 1.133 (Insiders)"](https://code.visualstudio.com/updates/v1_133) → RB-E-TYPESCRIPT | skipped: off-scope routine editor release |
| [code.visualstudio.com: "Visual Studio Code 1.132"](https://code.visualstudio.com/updates/v1_132) → RB-E-TYPESCRIPT | skipped: off-scope routine editor release |
| [github.blog: "How the GitHub legal team used Copilot CLI to streamline their workflows"](https://github.blog/ai-and-ml/github-copilot/how-the-github-legal-team-used-copilot-cli-to-streamline-their-workflows/) → RB-E-DATA, RB-E-SECURITY | skipped: off-scope (non-engineering Copilot case study) |
| [github.blog: "Turn one giant AI-generated pull request to a reviewable stack"](https://github.blog/engineering/turn-one-giant-ai-generated-pull-request-to-a-reviewable-stack/) → RB-E-DATA, RB-E-SECURITY | skipped: generic agentic-workflow essay — AI-DEVTOOLS defers that layer to the agentic-engineering-patterns skill; pairs with the stacked-PRs preview (twir-293 row, same verdict) |
| [vercel.com: "Set your own project avatars"](https://vercel.com/changelog/project-avatars) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope platform chrome |
| [vercel.com: "New setup page after domain checkout"](https://vercel.com/changelog/new-setup-page-after-domain-checkout) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope platform chrome |
| [vercel.com: "Export AI Gateway traces with Vercel Drains"](https://vercel.com/changelog/export-ai-gateway-traces-with-vercel-drains) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: off-scope platform feature |
| [vercel.com: +11 more new posts (high-volume feed — consider dropping this host)](https://vercel.com/blog/rss.xml) → RB-E-META-FRAMEWORKS, RB-E-NATIVE-UI, RB-E-SECURITY | skipped: high-volume platform feed — second consecutive pass of pure chrome noise; MAINTAINER FLAG: consider dropping vercel.com from the blog watch (React-relevant Vercel news reliably arrives via newsletters) |
| [engineering.fb.com: "From User Sequences to Scaling Laws: A Multi-Stage Architecture for Meta’s Ads Ranking"](https://engineering.fb.com/2026/08/05/ml-applications/from-user-sequences-to-scaling-laws-a-multi-stage-architecture-for-metas-ads-ranking/) → RB-E-STYLING | skipped: off-scope (ML infrastructure) |
| [ui.shadcn.com: "August 2026 - Questionnaire"](https://ui.shadcn.com/docs/changelog/2026-08-questionnaire) → RB-E-COMPONENT-LIBS | skipped: routine component addition (new Questionnaire component for multi-step question flows, all three primitive backends; verified vs the changelog). Watch: explicitly pitched for "agent clarification prompts" — reopen if shadcn's agent-facing component direction recurs |
| [swmansion.com: "The Memory Hermes Can't See: Stale Shadow Nodes in React Native"](https://swmansion.com/blog/the-memory-hermes-cant-see-stale-shadow-nodes-in-react-native/) → RB-E-ANIMATION, RB-E-MEDIA, RB-E-ALT-FRAMEWORKS, RB-E-ONDEVICE-AI, RB-E-AI-DEVTOOLS | **kept** → RB-E-NATIVE reading — Fabric ShadowNode retention invisible to Hermes heap snapshots; the memory sibling of the held Discord jank postmortem (fetch-verified 2026-08-07) |
| [blog.logrocket.com: "What is the Double Diamond design process?"](https://blog.logrocket.com/ux-design/double-diamond-design-process/) → RB-E-LISTS, RB-E-SVG | skipped: off-scope (UX process) |
| [blog.logrocket.com: "Getting started with Meilisearch: A complete guide"](https://blog.logrocket.com/getting-started-with-meilisearch/) → RB-E-LISTS, RB-E-SVG | skipped: off-scope how-to (search backend setup) |
| [blog.logrocket.com: "pnpm vs. npm: Which package manager should you use?"](https://blog.logrocket.com/pnpm-vs-npm-which-package-manager-use/) → RB-E-LISTS, RB-E-SVG | skipped: how-to/corroboration — DX already holds the pnpm selection facts (11.11–11.14 native monorepo versioning) |
| [revenuecat.com: "His crowdfunding round was oversubscribed in 24 hours. He shut it down at 3x the target."](https://www.revenuecat.com/blog/growth/jelte-liebrand-savvy-navvy-sub-club-podcast-2026) → RB-E-PAYMENTS | skipped: off-scope (business/growth story, not payments selection) |
