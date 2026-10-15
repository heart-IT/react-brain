# Harvest manifest — React Native Rewind #61 'The Great Graphite Migration, Derek Joins Fat Fighters, and a Leaderboard for Your Dependency Tree' (published 2026-10-12, processed 2026-10-15)
issue: https://www.thereactnativerewind.com/issues/the-great-graphite-migration-derek-joins-fat-fighters-and-a-leaderboard-for-your-dependency-tree

Every external link from `harvest inventory` carries a disposition row below (coverage gate). The issue label 'Issue #61' was read off the page itself, per the source's access note (RSS head, pubDate 2026-10-12). `harvest prep react-native-rewind` has no url_pattern for this slug source, so the manifest was hand-built from the inventory (21 external links).

| item | disposition |
|---|---|
| [React Native Skia](https://github.com/wcandillon/react-native-skia) | already-held → RB-E-ANIMATION (the Skia 3 / react-native-skia handover, kept firsthand-2026-10-08; 3.5.0 pin kept firsthand-2026-10-15) — the lead story retells 3.0's Graphite move (Ganesh → Graphite on Dawn, multithreaded recording, zero-copy texture sharing with react-native-webgpu) |
| [Graphite](https://skia.org/docs/user/graphite/) | skipped: corroboration — Skia's Graphite backend docs (background reference for the row above) |
| [React Native WebGPU](https://github.com/wcandillon/react-native-webgpu) | already-held → RB-E-GAMES (react-native-webgpu is the GAMES option; 0.15.0 judged firsthand-2026-10-15) |
| [babel-plugin-react-native-direct-imports](https://github.com/retyui/babel-plugin-react-native-direct-imports) | skipped: too-early — babel-plugin-react-native-direct-imports 1.1.0 (first published 2026-10-04, ~110 weekly downloads): rewrites `react-native` barrel imports to internal file paths (author's toy app 711.93 KB → 10.62 KB). It hard-codes RN-internal paths per RN version, so every RN upgrade needs a matching plugin bump or the build fails, and it leans on exactly the deep imports RB-E-RN-VERSIONS tracks as deprecated. Reopen: adoption, or RN core shipping a tree-shakeable entry point |
| [React Native 0.88.0-rc.4](https://github.com/react/react-native/releases/tag/v0.88.0-rc.4) | already-held → RB-E-RN-VERSIONS (rc.4 is cited there; npm latest re-checked 2026-10-15: still 0.87.1, next 0.88.0-rc.6 — the 'stable on October 12' expectation in the blurb did not happen on npm; the 0.88 tripwire stays armed) |
| [Tamagui 3.0](https://github.com/tamagui/tamagui/releases/tag/v3.0.0) | already-held → RB-E-STYLING + RB-E-CROSSPLATFORM (Tamagui 3.0, kept firsthand-2026-10-15) |
| [React Native Skia 3.4](https://github.com/wcandillon/react-native-skia/releases/tag/v3.4.0) | already-held → RB-E-ANIMATION (superseded by the 3.5.0 pin kept firsthand-2026-10-15; Android Vulkan / minSdk 26 belongs to the 3.x line held there) |
| [React Native Screens 4.29.0](https://github.com/software-mansion/react-native-screens/releases/tag/4.29.0) | skipped: corroboration — same verdict as twir-301 (additive iOS 26.1+ UITab migration + Android fragment fixes; 4.30.0 already latest; cited as Nano Icons' floor in RB-E-SVG) |
| [React Native Testing Library 14.1](https://github.com/callstack/react-native-testing-library/releases/tag/v14.1.0) | already-held → RB-E-TESTING (RNTL 14.1, kept firsthand-2026-10-15) |
| [Unistyles 3.5](https://github.com/jpudysz/react-native-unistyles/releases/tag/v3.5.0) | already-held → RB-E-STYLING (judged twir-300; stability release, the 3.4 RN 0.81 floor keep holds) |
| [EAS CLI 24.12](https://github.com/expo/eas-cli/releases/tag/v24.12.0) | skipped: corroboration — routine EAS CLI release (update:view --json source/asset map URLs; 24.11 browser device login) |
| [React Native Brownfield 5.3](https://github.com/callstack/react-native-brownfield/releases/tag/brownfield%405.3.0) | skipped: corroboration — judged firsthand-2026-10-15 (create-react-native-brownfield scaffolder; 5.2's Expo SDK 58 / AGP 9 support); RB-E-BROWNFIELD's 5.1+ pick unchanged |
| [munim-maps](https://github.com/munimtechnologies/munim-maps) | skipped: too-early — munim-maps 0.5.2 (first published 2026-10-05), Nitro maps with 3D models; reopen: adoption signal, then RB-E-MAPS |
| [react-native-inkpad](https://github.com/SectionTN/react-native-inkpad) | skipped: too-early — react-native-inkpad 0.3.1 (first published 2026-10-11), native ink canvas on androidx.ink + PencilKit; reopen: adoption signal |
| [androidx.ink](http://androidx.ink/) | skipped: off-scope — Android Jetpack Ink library (background reference for the row above) |
| [skia-diagrams](https://github.com/osuki-dev/skia-diagrams) | skipped: too-early — Mermaid diagrams rendered with Skia 3, not on npm; reopen: npm release + adoption |
| [React Native Directory](https://reactnative.directory/) | skipped: off-scope — directory site gained a /stats page, reverse-dependency lists and AGENTS.md previews; a discovery tool, no selection fact |
| [AGENTS.md](http://agents.md/) | skipped: off-scope — the AGENTS.md convention site (background reference for the row above) |
| [https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/](https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/) | skipped: off-scope — newsletter chrome |
| [https://medium.com/@thereactnativerewind](https://medium.com/@thereactnativerewind) | skipped: off-scope — newsletter chrome |
| [https://www.youtube.com/@ReactNativeRewind](https://www.youtube.com/@ReactNativeRewind) | skipped: off-scope — newsletter chrome |

## Advocate pass (2026-10-15)

Re-argued:
- **babel-plugin-react-native-direct-imports** — the issue's second feature story, with a measured (toy-app) 711.93 KB → 10.62 KB drop. Held too-early: ~110 weekly downloads, ten days old, a per-RN-version path map that breaks the build on any mismatched upgrade, and it relies on the deep imports RN is deprecating. Reopen: adoption, or RN shipping a tree-shakeable entry point.
- **munim-maps / react-native-inkpad / skia-diagrams** — held: all first sightings under a month old.
- **React Native Directory /stats** — held: discovery tooling, no selection fact.

Flips: **none**. This issue originated nothing; every RN release it lists was already handled by firsthand-2026-10-15.
