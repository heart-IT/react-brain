# Harvest manifest — React Native Rewind #64 'A Jeeves for Every Coding Agent, a Pit Crew for Your Mac, and Simulators That Outlive Their App' (prepped 2026-11-25)
issue: https://www.thereactnativerewind.com/issues/a-jeeves-for-every-coding-agent-a-pit-crew-for-your-mac-and-simulators-that-outlive-their-app

Pre-triaged by `harvest prep`: 22 external links · 3 pre-dispositioned (corpus + prior-manifest cross-ref) · **19 TODO** (adjudicated 2026-11-25: 3 keeps, see summary).
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [Bertie Wooster](https://en.wikipedia.org/wiki/Bertie_Wooster) | skipped: off-scope (Wikipedia, the issue's literary framing) |
| [introduced @expo/agent-cli](https://expo.dev/blog/introducing-expo-agent-cli) | already-held → RB-E-AI-DEVTOOLS (EXPO FIRST-PARTY LAYER note already carries @expo/agent-cli — experimental, built on Expo CLI/EAS CLI/expo-doctor, agents:setup/status/dev/smoke/skills:sync, next steps on every command — from the SDK 58 beta changelog; the intro post adds per-worktree simulators and --eas opt-in cloud builds, corroboration rather than a selection change; reopen: agent-cli leaves experimental) |
| [skills-npm](https://github.com/antfu/skills-npm) | skipped: off-scope (Anthony Fu's skills-from-node_modules convention, background for agent-cli's skill linking; RB-E-AI-DEVTOOLS' skills:sync mention covers the Expo side) |
| [@expo/agent-cli](https://github.com/expo/expo-agent-cli) | already-held → RB-E-AI-DEVTOOLS (@expo/agent-cli repo; same as the intro-post row above) |
| [launched Legend Spark](https://legend.so/spark/overview/) | **kept** → RB-E-DESKTOP (extends the EXPO-DESKTOP LEAD note: Legend Spark (Jay Meistrich) is a desktop-app framework on top of Expo Desktop → react-native-macos/react-native-windows, Hermes + RN native renderer, adds windows/menus/dialogs/files/tray/SQLite/Sparkle updates, and a prebuilt Spark Runner gives Fast Refresh with no Xcode compile. Its own Status-and-limitations page: 'Experimental — not for production', Spark 0.0.1 primarily targets macOS 14+ on Apple Silicon, Intel and Windows 11 'still need validation'. npm @legendapp/spark 0.0.7 (2026-11-23), ~890 dl/wk. Overview + limitations pages fetched 2026-11-25. A lead, not an option row — the first named framework building on expo-desktop, with the author's Legend apps running on it) |
| [Expo Desktop](https://expo-desktop-docs.vercel.app/) | already-held → RB-E-DESKTOP (EXPO-DESKTOP LEAD note, shirakaba/expo-desktop; firsthand-2026-11-25 carries its template releases) |
| [react-native-macos](https://github.com/microsoft/react-native-macos) | already-held → RB-E-DESKTOP (react-native-windows / react-native-macos option row) |
| [react-native-windows](https://github.com/microsoft/react-native-windows) | already-held → RB-E-DESKTOP (same option row; firsthand-2026-11-25 carries the 0.85.2 event) |
| [Legend apps](https://legend.so/) | skipped: off-scope (Legend apps homepage — the author's products, background for the Spark keep) |
| [docs](https://legend.so/spark/limitations/) | already-held → RB-E-DESKTOP (this issue's Legend Spark keep; the limitations page is its 'not for production' receipt) |
| [Legend Spark](https://github.com/LegendApp/legend-spark) | already-held → RB-E-DESKTOP (this issue's Legend Spark keep; repo of the same project) |
| [React Native 0.88.1](https://github.com/react/react-native/releases/tag/v0.88.1) | already-held → firsthand-2026-11-25 (⚡ react-native ≥0.88.0 tripwire + react-native 0.87.1 → 0.88.1 row). Release fetched: 2026-10-27; iOS Release builds compile RN's C/C++/ObjC with -O2 instead of -Os to match Android, and `spm add`/`spm update` write a generated ReactNativeSPM.xcconfig so version bumps stop rewriting project.pbxproj — forwarded to proposals-rnr.md as FYI for the RN-VERSIONS flip |
| [Unistyles 3.7](https://github.com/jpudysz/react-native-unistyles/releases/tag/v3.7.0) | already-held → firsthand-2026-11-25 (react-native-unistyles 3.5.3 → 3.8.2 row; 3.7 DevTools perf track + UnistylesRuntime.themeName breaking change are that row's facts) |
| [React Native ExecuTorch 0.11](https://github.com/software-mansion/react-native-executorch/releases/tag/v0.11.0) | already-held → firsthand-2026-11-25 (⚡ react-native-executorch ≥0.11.0 tripwire + 0.10.5 → 0.11.1 row) |
| [NativeWind 5 RC 1](https://github.com/nativewind/nativewind/releases/tag/5.0.0-rc.1) | **kept** → RB-E-STYLING (pin refresh on the NativeWind option row: 5.0.0-rc.1 (2026-11-02, npm rc/preview tags; latest stays 4.2.7) is code-identical to rc.0 and only moves the exact engine pin to react-native-css 3.1.0-rc.1, upgrade both together with --save-exact; its stated target is still Expo 57.0.22 / RN 0.86.3 — i.e. the v5 RC does NOT target Expo SDK 58 / RN 0.88, now stable. npm downloads API 2026-11-17..23: ~2.73M dl/wk, up from the row's ~1.3M (2026-09-24)) |
| [EAS CLI 27.2](https://github.com/expo/eas-cli/releases/tag/v27.2.0) | skipped: corroboration (EAS CLI 27.2 `eas observe:traces` / `eas observe:trace` terminal span trees — a CLI view on EAS Observe, which RB-E-OBSERVABILITY already carries; reopen: Observe tracing changes the Sentry-vs-Observe default) |
| [Legend List 3.7](https://github.com/LegendApp/legend-list/releases/tag/v3.7.0) | already-held → firsthand-2026-11-25 (@legendapp/list 3.6.0 → 3.9.1 row; 3.7 scrollToKey + promise-resolving scrollToIndex) |
| [Maestro 2.12](https://github.com/mobile-dev-inc/maestro/blob/main/CHANGELOG.md) | **kept** → RB-E-TESTING (Xcode 27 floor on the E2E row: Maestro 2.12.0 'iOS: start simulators on Xcode 27, which ships without Simulator.app' and detects iOS crashes from process exit even when no crash report is written; plus a Breaking out-of-range scroll speed rejection — CHANGELOG.md fetched 2026-11-25. Pairs with the SDK 58 changelog's 'Xcode 27 replaces Simulator.app with Device Hub': simulator-booting tools need Xcode-27-aware versions) |
| [React Native 0.88 Is Not Enough for iOS 27](https://dev.to/muhittin_camdali/react-native-088-is-not-enough-for-ios-27-the-scenedelegate-move-you-still-have-to-make-fom) | skipped: corroboration (RN 0.88 ships the SceneDelegate APIs but a bare app's AppDelegate migration is still yours — RB-E-RN-VERSIONS' UIScene note already says exactly this; the sdkbump CLI it promotes is the author's own, too-early) |
| [https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/](https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://medium.com/@thereactnativerewind](https://medium.com/@thereactnativerewind) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://www.youtube.com/@ReactNativeRewind](https://www.youtube.com/@ReactNativeRewind) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Adjudication summary (2026-11-25)

Page label verified: 'Issue #64' (RSS 2026-11-02). 22 links: 3 pre-dispositioned, 19 judged.
**Keeps (3):** Legend Spark → RB-E-DESKTOP (extends the EXPO-DESKTOP LEAD note; experimental,
macOS 14 Apple Silicon); NativeWind 5.0.0-rc.1 → RB-E-STYLING pin refresh (the RC still targets
Expo 57 / RN 0.86, not the now-stable SDK 58); Maestro 2.12 → RB-E-TESTING (Xcode 27 boots without
Simulator.app). RN 0.88.1, Unistyles 3.7, ExecuTorch 0.11 and Legend List 3.7 are firsthand rows /
tripwires.

## Advocate pass (2026-11-25)

Re-argued:
- **Introducing @expo/agent-cli** — the intro post adds per-worktree simulators and opt-in `--eas`,
  but AI-DEVTOOLS' EXPO FIRST-PARTY LAYER note already routes to it; held as corroboration.
- **RN 0.88 Is Not Enough for iOS 27 (dev.to)** — duplicates RN-VERSIONS' UIScene note; held.
- **EAS CLI 27.2 observe:traces** — a CLI view, no selection change; held.

Flips: **none**.

## Spot-check of rn-rewind-61 (2026-11-25)

rn-rewind-61 has **no `cap` skips and no `[rule:*]` rows**, so the sample is 2 random skips:
- React Native Directory (off-scope, discovery tool) — CONFIRMED.
- AGENTS.md convention site (off-scope, background) — CONFIRMED.
No amendments.
