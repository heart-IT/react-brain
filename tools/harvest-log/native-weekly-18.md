# Harvest manifest — Native Weekly #18 (2026-08-14)
issue: https://nativeweekly.beehiiv.com/p/aug-14-2026-issue-18

Processed 2026-08-18. FIRST issue since #17 (2026-07-17) — four consecutive passes reported nothing
new from this source, so the ~6-weekly cadence note holds. Format is a release roundup plus an
article roundup, which makes it the highest-corroboration source of the pass: most links land as
already-held or as duplicates of the firsthand release watch. Two keeps, both articles.
Reason classes: corroboration · how-to · pre-ship · too-early · cap · unverifiable · off-scope · sponsor.

| item | disposition |
|---|---|
| [Start Testing → (tester.army)](https://tester.army/?amp%3Butm_medium=newsletter&amp%3Butm_campaign=july_2026&amp%3Butm_content=awareness&amp%3B_bhlid=8d09f88c3deafe18d190d22296c7c249d8806587) | skipped: sponsor (tracking params) |
| [React Native 0.87 full release notes](https://reactnative.dev/blog/2026/08/11/react-native-0.87) | **kept** → RB-E-RN-VERSIONS / RB-E-BUILD / RB-E-TYPESCRIPT (see the firsthand + Status #487 rows; five sources carried it this pass) |
| [Gesture Handler 3.2.0](https://github.com/software-mansion/react-native-gesture-handler/releases/tag/v3.2.0) | skipped after re-triage: this is TWiR #293's "faster touchables" reopen firing. Verified vs the release — Touchable is reimplemented without GestureDetector on iOS/Android/Web, Pressable is rebuilt on Touchable, hover callbacks added, AGP 9 adopted. An implementation change behind an unchanged API: no selection decision moves |
| [React Native Worklets 0.12](https://github.com/software-mansion/react-native-reanimated/releases/tag/worklets-0.12.0) | **kept** → RB-E-ANIMATION option row + note, with a correction the newsletter doesn't make: 0.12.0 (2026-08-11) is real but sits on npm's `next` dist-tag, while `latest` is 0.11.4 (published a day LATER, 2026-08-12 — verified vs the registry). Kept content: WeakRef on worklet runtimes, and Bundle Mode script loading brought to parity with RN's own loaders (local bundles mmapped instead of held in an in-memory std::string; Android dev-server bundles stream to a cache file) — which strengthens the entry's "enable Bundle Mode regardless" line |
| [VisionCamera 5.2.2](https://github.com/mrousavy/react-native-vision-camera/releases/tag/v5.2.2) | skipped: patch release |
| [react-native-skia-lab](https://github.com/daehyeonmun2021/react-native-skia-lab) | skipped: too-early — a personal Skia experiment/playground repo. Reopen: a published package or a 2nd independent mention |
| [React Native Screens 4.27.0](https://github.com/software-mansion/react-native-screens/releases/tag/4.27.0) | skipped: minor release; NAV's screens facts (Tabs API stable at 4.26, RN 0.84+ floor) are unchanged |
| [React Native Skia 2.11.0](https://github.com/Shopify/react-native-skia/releases/tag/v2.11.0) | skipped: minor release; ANIMATION documents the 2.10 HostObject→NativeState move, which is the durable architectural fact on this line |
| [Re.Pack 5.3.0](https://github.com/callstack/repack/releases/tag/%40callstack%2Frepack%405.3.0) | skipped: minor release on an option row BUILD already carries (Rspack-based Metro alternative, module federation) |
| [Safe Area Context 5.9.0](https://github.com/appandflow/react-native-safe-area-context/releases/tag/v5.9.0) | skipped: minor release |
| [React Navigation Core 7.21.12](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation%2Fcore%407.21.12) | skipped: patch on the 7.x line; NAV tracks the 8.x pre-stable arc |
| [Lottie React Native 7.4.0](https://github.com/lottie-react-native/lottie-react-native/releases/tag/v7.4.0) | skipped: minor release |
| [Nitro 0.36.5](https://github.com/mrousavy/nitro/releases/tag/v0.36.5) | skipped: patch release |
| [Legend List 3.3.5](https://github.com/LegendApp/legend-list/releases/tag/v3.3.5) | skipped: patch release; LISTS carries Legend List v3 stable |
| [Keyboard Controller 1.22.3](https://github.com/kirillzyusko/react-native-keyboard-controller/releases/tag/1.22.3) | skipped: patch release |
| [Building a ChatGPT-style AI chat app in React Native](https://margelo.com/blog/building-native-llm-chat-app-with-rag) | skipped: cap + supersession — this is the UI-side predecessor of the local-RAG post kept this pass into RB-E-ONDEVICE-AI, which cites it as "a previous post" and carries the harder constraints (memory ceiling, context-window rejection, embedding-model matching). One reading per thread |
| [Convex is now a one-command backend for Expo apps](https://expo.dev/blog/convex-is-a-backend-for-expo-apps) | skipped: vendor integration announcement; no entry owns backend-as-a-service selection. Reopen: a BaaS-selection gap in DATA, or independent adoption evidence |
| [How Worklets Bundle Mode accidentally fixed the Hermes V1 memory regression](https://swmansion.com/blog/how-worklets-bundle-mode-accidentally-fixed-Hermes-v1-memory-regression/) | already-held: RB-E-ANIMATION source since 2026-07-28 — and re-read this pass to verify the tripwire premise (it names Hermes 250829098.0.15 as the backport, which is how RN 0.87's .0.16 pin was confirmed to carry the fix) |
| [How Shopify raised mobile E2E test stability to 98%](https://shopify.engineering/mobile-e2e-testing) | **kept** → RB-E-TESTING reading + claim + a new when-clause. Appium/WebdriverIO suite pulled from blocking CI at ~50% stability, rebuilt to 98% by making flaky tests hard to write (assertion required per step, validated both directions; UNSAFE_-prefixed escape hatches) and finding elements visually (PaddleOCR text, OpenCV icon matching against Polaris SVGs) instead of by test ID, plus a pre-promotion flakiness gate |
| [Fable 5 vs GPT-5.6 Sol: $2,000 and 2 billion tokens to one-shot three Expo apps](https://expo.dev/blog/fable-5-vs-gpt-5-6-sol-expo-apps) | already-held: RB-E-AI-DEVTOOLS reading (kept 2026-08-07) |
| [Fitting RAG in your pocket](https://margelo.com/blog/fitting-RAG-in-your-pocket) | **kept** → RB-E-ONDEVICE-AI reading + claim + the @react-native-ai/llama option row (see the firsthand row for the constraint list) |
| [3 minutes with an agent, 9 seconds on replay](https://www.callstack.com/blog/3-minutes-with-an-agent-9-seconds-on-replay) | **kept** → RB-E-AI-DEVTOOLS reading + claim: a nine-action flow took 3m18s agent-driven and 8.8s on `agent-device replay` with zero model calls; across 108 audited runs 14.1% of tool calls never reached the device. The design rule — discover once with the model, replay deterministically — is what the option row's "replayable scripts" was missing evidence for |
| [Automating mobile QA with cloud agents](https://www.callstack.com/blog/automating-mobile-qa-with-cloud-agents) | skipped: cap — same vendor, same week, same thread as the replay study kept above; AI-DEVTOOLS took the measured piece. Reopen: independent (non-vendor) evidence on cloud-agent QA economics |
| [Scanning barcodes in React Native: the complete guide](https://margelo.com/blog/react-native-barcode-scanner) | **kept** → RB-E-MEDIA (see the Status #487 row — the four-engine map) |
| [Detour: deferred deep linking done right in Expo Router](https://expo.dev/blog/deferred-deep-linking-the-right-way) | **kept** → RB-E-NAV reading + claim + when-clause: standard Universal/App Links do not survive the store boundary (the Installation Gap), and Expo Router's `+native-intent.tsx` resolves the deferred link before the first screen mounts, which is what removes the post-mount race with auth gates. Vendor content (SWM's @swmansion/react-native-detour 2.3.1, hosted service), disclosed in the entry |
| [Metrognome: an AI agent for measured React Native performance fixes](https://www.callstack.com/blog/an-ai-agent-for-measured-react-native-performance-fixes) | **kept** (as an option row, not a reading) → RB-E-AI-DEVTOOLS: an autonomous propose → measure N times → keep-or-revert loop whose accepted changes land as commits carrying their before/after numbers, with every experiment (kept or rejected) appended to a performance-memory file in the repo. Verified beyond the post: npm `metrognome` 0.2.6 (2026-08-08), repo github.com/uphold/metrognome — note it is Uphold's, not Callstack's, though it orchestrates Callstack tooling. Early; the durable idea is the gate, not the automation |
| [A step-by-step guide to super app development with Re.Pack 5](https://www.callstack.com/blog/step-by-step-guide-to-super-app-development) | skipped: how-to — BROWNFIELD already carries the super-app/micro-frontend options (Rock, Granite, Re.Pack) |
| [video: Simon Grimm — React Native Tools That Actually Save Me Time](https://www.youtube.com/watch?v=PypMPaW0wu4) | skipped: tooling-roundup video (also in React Status #487) |
| [video: Beto — Expo UI Crash Course](https://www.youtube.com/watch?v=4j6NvCNPGtE) | skipped: tutorial video |
| [video: Beto — RN OTA Updates with Bitrise CodePush](https://www.youtube.com/watch?v=EqClrb7US-Q) | skipped: tutorial video; OTA's option rows already cover the self-host landscape |
| [job: Senior React Native Developer at Ruby Labs](https://jobicy.com/jobs/148652-senior-react-native-developer) | skipped: job listing |
| [job: Mobile Software Engineer, Lending at Chime](https://reactnative-jobs.com/jobs/mobile-software-engineer-lending-react-native-remote-766834-1) | skipped: job listing |
| [job: Senior Software Engineer, Mobile (Repayment UX) at Affirm](https://reactnative-jobs.com/jobs/senior-software-engineer-mobile-repayment-ux-870613-0) | skipped: job listing |
| [job: Senior React Native Developer at SCHUFA](https://reactnative-jobs.com/jobs/senior-react-native-developer-remote-germany-441380-2) | skipped: job listing |
| [job: React Native Frontend Engineer at Ornikar](https://reactnative-jobs.com/jobs/react-native-frontend-engineer-remote-paris-441329-1) | skipped: job listing |
| [job: Senior React Native Developer at Straight Arrow News](https://reactnative-jobs.com/jobs/senior-react-native-developer-remote-us-441262-0) | skipped: job listing |
| [job: Client Full-Stack Engineer, IM Chat Platform at Binance](https://jobicy.com/jobs/150064-client-full-stack-engineer-im-chat-platform-android-focus) | skipped: job listing |
| [job: Principal Mobile Engineer, Android at Upstart](https://jobicy.com/jobs/147607-principal-mobile-engineer-android) | skipped: job listing |
| [job: Senior React Native Developer at Pixid](https://reactnative-jobs.com/jobs/senior-react-native-developer-paris-hybrid-922940-2) | skipped: job listing |
| [job: React Native Developer at E-KENT](https://reactnative-jobs.com/jobs/react-native-developer-hf-paris-hybrid-922989-3) | skipped: job listing |
| [job: React Native Developer at Euronet](https://reactnative-jobs.com/jobs/react-native-developer-athens-greece-hybrid-766885-2) | skipped: job listing |
| [job: Senior React Native Developer at Wealthsimple](https://reactnative-jobs.com/jobs/senior-react-native-developer-wealthsimple-766782-0) | skipped: job listing |
| [job: Staff React Native Engineer at Doctolib](https://reactnative-jobs.com/jobs/staff-react-native-engineer-remote-paris-735803-0) | skipped: job listing |
| [job: Senior React Native Developer at Affirm](https://reactnative-jobs.com/jobs/senior-react-native-developer-remote-spain-487360-0) | skipped: job listing |
| [nativeweekly.com](https://nativeweekly.com/) | skipped: off-scope (publication shell site — the beehiiv archive is the real one, per the source note) |
| [View more (archive pagination)](http://the-way-of-all-flesh.localhiiv.com:3002/) | skipped: broken/internal beehiiv link (a leaked local dev host in the template) |
| [LinkedIn](https://linkedin.com/user) | skipped: off-scope (template social placeholder) |
| [Facebook](https://facebook.com/user) | skipped: off-scope (template social placeholder) |
| [Instagram](https://instagram.com/user) | skipped: off-scope (template social placeholder) |
| [TikTok](https://tiktok.com/user) | skipped: off-scope (template social placeholder) |
| [YouTube](https://youtube.com/user) | skipped: off-scope (template social placeholder) |
| [Discord](https://discord.com/user) | skipped: off-scope (template social placeholder) |
| [Powered by beehiiv](https://www.beehiiv.com/powered-by?publication_name=Nativeweekly&publication_logo=https%3A%2F%2Fmedia.beehiiv.com%2Fcdn-cgi%2Fimage%2Ffit%3Dscale-down%2Cformat%3Dauto%2Conerror%3Dredirect%2Cquality%3D80%2Fuploads%2Fpublication%2Flogo%2F7877883e-32db-4bf9-883d-ea4d9ae258b7%2Flogo-nw.jpg&utm_source=nativeweekly&utm_medium=footer) | skipped: off-scope (platform footer) |
