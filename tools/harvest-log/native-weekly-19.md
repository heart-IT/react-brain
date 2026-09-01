# Harvest manifest — Native Weekly #19 (2026-08-28, harvested 2026-09-01)
issue: https://nativeweekly.beehiiv.com/p/aug-28-2026-issue-19

56 external links via `harvest inventory` — the usual release-roundup + articles + jobs shape.
Two keeps landed via the release table (Reanimated 4.6 / Worklets 0.12 dist-tag flip); the
stale-ShadowNodes article turned out already-held in RB-E-NATIVE. React Navigation 8.0 alpha noted: its stable graduation
is covered by the firsthand engine's prerelease→stable guard, no manual tripwire needed.

| item | disposition |
|---|---|
| [ConfigCat feature flags in RN](https://configcat.com/blog/using-feature-flags-in-react-native/?amp%3Butm_medium=sponsor&amp%3Butm_campaign=nativeweeklybeehiiv_202608) | skipped: sponsor |
| [React Native 0.87 release notes](https://reactnative.dev/blog/2026/08/11/react-native-0.87) | already-held: RB-E-RN-VERSIONS (0.87 strict-API line) |
| [React Native 0.87.1](https://github.com/react/react-native/releases/tag/v0.87.1) | skipped: patch (dispositioned via firsthand-2026-09-01) |
| [Reanimated 4.6.0](https://github.com/software-mansion/react-native-reanimated/releases/tag/4.6.0) | kept: RB-E-ANIMATION Reanimated row — 4.6 supports RN 0.83–0.87, pairs with Worklets 0.12.x, native CSS animation/transition callbacks (verified vs the release notes) |
| [Reanimated 4.5.4](https://github.com/software-mansion/react-native-reanimated/releases/tag/4.5.4) | skipped: patch |
| [Worklets 0.12.1](https://github.com/software-mansion/react-native-reanimated/releases/tag/worklets-0.12.1) | kept: RB-E-ANIMATION worklets row — 0.12 GRADUATED to npm latest (dist-tag verified 2026-09-01), retiring the entry's stale "sits on next" status |
| [VisionCamera 5.2.3](https://github.com/mrousavy/react-native-vision-camera/releases/tag/v5.2.3) | skipped: patch |
| [Nitro Modules 0.37.0](https://github.com/mrousavy/nitro/releases/tag/v0.37.0) | skipped: routine minor (0.37.1 patch already rule-skipped in firsthand) |
| [React Native Skia 2.11.1](https://github.com/Shopify/react-native-skia/releases/tag/v2.11.1) | skipped: patch |
| [Keyboard Controller 1.22.4](https://github.com/kirillzyusko/react-native-keyboard-controller/releases/tag/1.22.4) | skipped: patch |
| [Safe Area Context 5.9.1](https://www.npmjs.com/package/react-native-safe-area-context/v/5.9.1) | skipped: patch |
| [Gesture Handler 3.2.1](https://github.com/software-mansion/react-native-gesture-handler/releases/tag/v3.2.1) | skipped: patch |
| [Metro 0.84.5](https://github.com/facebook/metro/releases/tag/v0.84.5) | skipped: patch |
| [React Navigation Native 7.3.18](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation/native%407.3.18) | skipped: patch |
| [React Navigation Stack 7.10.23](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation/stack%407.10.23) | skipped: patch |
| [React Navigation Core 7.21.13](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation/core%407.21.13) | skipped: patch |
| [React Navigation Bottom Tabs 7.18.17](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation/bottom-tabs%407.18.17) | skipped: patch |
| [React Navigation Native Stack 7.18.9](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation/native-stack%407.18.9) | skipped: patch |
| [React Navigation Drawer 7.13.9](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation/drawer%407.13.9) | skipped: patch |
| [React Navigation 8.0 alpha](https://github.com/react-navigation/react-navigation/releases/tag/%40react-navigation/native%408.0.0-alpha.44) | skipped: pre-ship — v8 alpha; REOPEN: the firsthand prerelease→stable graduation guard fires when 8.0.0 hits latest |
| [Inside SWSH's automated mobile release pipeline](https://expo.dev/blog/inside-swsh-automated-mobile-release-pipeline-with-expo) | skipped: case-study/marketing (firsthand-2026-09-01) |
| [Haptics in React Native](https://shift.infinite.red/haptics-in-react-native-easier-than-you-think-2a6ecdcf078c) | skipped: how-to (expo-haptics is held in RB-E-POLISH) |
| [Introducing Observe](https://expo.dev/blog/introducing-observe) | kept: RB-E-OBSERVABILITY — Observe GA (dispositioned via firsthand-2026-09-01) |
| [Automating React Native Evals With Airflow](https://www.callstack.com/blog/automating-react-native-evals-with-airflow) | skipped: how-to (eval-pipeline plumbing; the eval-harness discipline itself is held via AppControlBench in RB-E-AI-DEVTOOLS) |
| [Gesture Handler's Touchable](https://swmansion.com/blog/react-native-gesture-handler-s-touchable-the-button-we-wish-we-had-sooner/) | already-held: RB-E-ANIMATION (RNGH 3 Touchable keep, 2026-08-24) |
| [Building a native-first social platform with Expo](https://expo.dev/blog/building-a-native-first-social-platform-with-expo) | skipped: case-study/marketing |
| [Building a 3D AI assistant](https://margelo.com/blog/building-a-3d-ai-avatar-in-react-native) | skipped: how-to (2nd appearance — carried skip from twir-294/react-status-488 prep; still a build walkthrough) |
| [The Memory Hermes Can't See: Stale Shadow Nodes](https://swmansion.com/blog/the-memory-hermes-cant-see-stale-shadow-nodes-in-react-native/) | already-held: RB-E-NATIVE reading (kept in a prior pass; a duplicate briefly landed in RB-E-OBSERVABILITY this session and was removed when lint's shared-URL warning caught the dedupe miss) |
| [Simon Grimm — RN tools that save me time](https://www.youtube.com/watch?v=PypMPaW0wu4) | skipped: unwatched video (tools roundup; corroboration territory) |
| [VisionCamera v5 with Marc Rousavy](https://www.youtube.com/watch?v=xI3egb3_ihI) | skipped: unwatched video (v5 facts already held in RB-E-MEDIA) |
| [Beto — Opus 5 vs GPT-5.6 Sol](https://www.youtube.com/watch?v=ecQThGrc1uY) | skipped: unwatched video (the measured model-comparison slot is held via the Expo first-party piece in RB-E-AI-DEVTOOLS) |
| [Simon Grimm — mobile game $5,000](https://www.youtube.com/watch?v=KOeMJVGXibE) | skipped: unwatched video (indie-revenue story) |
| [Canva job](https://reactnative-jobs.com/jobs/staff-react-native-engineer-sme-remote-au-733570-1) | skipped: off-scope (job listing) |
| [Affirm job](https://reactnative-jobs.com/jobs/staff-react-native-engineer-mobile-remote-us-608039-0) | skipped: off-scope (job listing) |
| [Affirm fullstack job](https://reactnative-jobs.com/jobs/senior-fullstack-react-native-engineer-remote-us-977037-2) | skipped: off-scope (job listing) |
| [Underdog job](https://reactnative-jobs.com/jobs/senior-react-native-developer-remote-us-733516-0) | skipped: off-scope (job listing) |
| [US Mobile job](https://reactnative-jobs.com/jobs/senior-react-native-engineer-montreal-hybrid-733608-2) | skipped: off-scope (job listing) |
| [OANDA job](https://reactnative-jobs.com/jobs/senior-react-native-engineer-krakow-hybrid-829405-1) | skipped: off-scope (job listing) |
| [Hargreaves Lansdown job](https://reactnative-jobs.com/jobs/senior-react-native-developer-bristol-hybrid-829327-0) | skipped: off-scope (job listing) |
| [Patrianna job](https://reactnative-jobs.com/jobs/lead-react-native-engineer-remote-829456-2) | skipped: off-scope (job listing) |
| [Fashion Nova job](https://reactnative-jobs.com/jobs/react-native-mobile-software-engineer-remote-us-374884-0) | skipped: off-scope (job listing) |
| [Interviews Chat job](https://reactnative-jobs.com/jobs/react-native-engineer-remote-us-564418-0) | skipped: off-scope (job listing) |
| [Haventree Bank job](https://reactnative-jobs.com/jobs/react-native-mobile-developer-hybrid-toronto-829506-3) | skipped: off-scope (job listing) |
| [wehorse job](https://reactnative-jobs.com/jobs/react-native-mobile-engineer-remote-germany-898043-1) | skipped: off-scope (job listing) |
| [Pets at Home job](https://reactnative-jobs.com/jobs/react-native-app-developer-hybrid-uk-898181-3) | skipped: off-scope (job listing) |
| [Fourth job](https://reactnative-jobs.com/jobs/react-react-native-developer-hybrid-sofia-977241-6) | skipped: off-scope (job listing) |
| [Youtap job](https://reactnative-jobs.com/jobs/react-react-native-developer-bangkok-976987-1) | skipped: off-scope (job listing) |
| [nativeweekly.com](https://nativeweekly.com/) | skipped: house link (shell site; per-source note) |
| [beehiiv preview artifact](http://the-way-of-all-flesh.localhiiv.com:3002/) | skipped: house link (beehiiv rendering artifact) |
| [LinkedIn](https://linkedin.com/user) | skipped: house link |
| [Facebook](https://facebook.com/user) | skipped: house link |
| [Instagram](https://instagram.com/user) | skipped: house link |
| [TikTok](https://tiktok.com/user) | skipped: house link |
| [YouTube](https://youtube.com/user) | skipped: house link |
| [Discord](https://discord.com/user) | skipped: house link |
| [beehiiv powered-by](https://www.beehiiv.com/powered-by?publication_name=Nativeweekly&amp;publication_logo=https%3A%2F%2Fmedia.beehiiv.com%2Fcdn-cgi%2Fimage%2Ffit%3Dscale-down%2Cformat%3Dauto%2Conerror%3Dredirect%2Cquality%3D80%2Fuploads%2Fpublication%2Flogo%2F7877883e-32db-4bf9-883d-ea4d9ae258b7%2Flogo-nw.jpg&amp;utm_source=nativeweekly&amp;utm_medium=footer) | skipped: house link |
