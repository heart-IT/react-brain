# Harvest manifest — React Native Rewind #63 'Fast-Forwarding Past the 9 A.M. Reminder, Bob Ross Paints Straight to the GPU, and a README That Confesses Its Own Bugs' (prepped 2026-11-25)
issue: https://www.thereactnativerewind.com/issues/fast-forwarding-past-the-9-a-m-reminder-bob-ross-paints-straight-to-the-gpu-and-a-readme-that-confesses-its-own-bugs

Pre-triaged by `harvest prep`: 29 external links · 6 pre-dispositioned (corpus + prior-manifest cross-ref) · **23 TODO** (adjudicated 2026-11-25: 3 keeps, see summary).
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [MCP](https://modelcontextprotocol.io/) | skipped: off-scope (MCP protocol homepage, background reference for Appduct) |
| [Swift, Kotlin, Flutter and on the web](https://incubator.callstack.com/appduct/start/quick-start/) | already-held → RB-E-AI-DEVTOOLS (this issue's Appduct keep; quick start fetched 2026-11-25: Expo dev build only — Expo Go can't load its native code — Node 20+, `npm install -g appduct` + @appduct/react-native + zod) |
| [agent-device](https://www.callstack.com/blog/agent-device-ai-native-mobile-automation-for-ios-android) | already-held → RB-E-AI-DEVTOOLS (agent-device option row + notes; this is its older intro post, background here) |
| [@appduct/e2e](https://www.npmjs.com/package/@appduct/e2e) | skipped: too-early (@appduct/e2e 0.16.0, 2026-10-21, 28 dl/wk per npm downloads API — npm page 403s to curl; the wrapper for existing e2e suites is folded into the Appduct row as a mention only; reopen: adoption) |
| [Appduct](https://incubator.callstack.com/appduct/) | **kept** → RB-E-AI-DEVTOOLS (REOPENED from twir-299's too-early skip — its reopen signal 'a tagged release or adoption outside Callstack' fired: @appduct/react-native 0.16.0 on npm 2026-10-21, ~8.8K dl/wk 2026-11-17..23, MIT, peer expo >=54. New EARLY option row: turns the running app into an MCP server — register in-app functions (seed_cart, advance_time, set_feature_flag) the agent calls as tools instead of tapping through screens; iOS/Android/RN/Expo/Flutter/web; native code is in debug builds and ABSENT from release builds by default (APPDUCT_ENABLED, docs 'Build variants'); pairs with agent-device for taps. Homepage + quick start + build-variants page fetched 2026-11-25) |
| [react-native-skia-webgpu-video](https://github.com/batical/react-native-skia-webgpu-video) | skipped: too-early (0.1.0, 2026-11-13, 22 dl/wk; video play/compose/export on Skia 3 + react-native-webgpu with one worklet drawing preview and export; pins exact Skia/WebGPU versions, HDR unqualified; reopen: adoption or a second shipped app — then RB-E-MEDIA's FILTER PIPELINE note) |
| [worklet](https://docs.swmansion.com/react-native-worklets/) | skipped: off-scope (Worklets docs, background reference; RB-E-ANIMATION owns Worklets) |
| [Skia Video](https://github.com/AzzappApp/react-native-skia-video) | skipped: off-scope (the older Skia 2-era video library the item above supersedes; background, not tracked) |
| [Media3](https://developer.android.com/media/media3) | skipped: off-scope (Android Media3 reference, background) |
| [New Architecture](https://reactnative.dev/architecture/landing-page) | skipped: off-scope (New Architecture landing page, background reference) |
| [Beta 3](https://github.com/batical/react-native-skia-webgpu-video/blob/main/docs/VERIFICATION_0.1.0-beta.3.md) | skipped: too-early (beta-3 verification doc of the skipped library above; same reopen signal) |
| [Nitro V1 alpha](https://x.com/mrousavy/status/2113257713169821719) | skipped: pre-ship (Nitro V1 alpha announced on x.com, login-walled; firsthand-2026-11-25 carries the margelo/nitro v1.0.0-alpha.nightly rows; reopen: Nitro 1.0.0 on npm latest) |
| [his fbjni PR](https://github.com/facebookincubator/fbjni/pull/118) | skipped: too-early (fbjni PR, '14% faster' JNI calls per the blurb; GitHub API rate-limited, not verified here; reopen: an fbjni release that RN core picks up, with its own number) |
| [Radon IDE 1.20](https://github.com/software-mansion/radon-ide/releases/tag/v1.20.0) | skipped: corroboration (Radon IDE 1.20: iPhone Duo simulator folding + a UIScene pre-launch warning; RB-E-TESTING's Radon row and RB-E-RN-VERSIONS' UIScene note already carry the selection facts) |
| [Supporting iPhone Duo with Expo](https://expo.dev/blog/supporting-iphone-duo) | **kept** → RB-E-NAV reading (Expo, 2026-10-23, Alex Hunt / Christian Falch / Jakub Tkacz; fetched 2026-11-25 with browser-UA curl): iPhone Duo (iOS 27, first foldable iPhone) moves status/tab/toolbar into a vertical RAIL with an 84pt left-or-right inset; native Stack + NativeTabs get placement for free, JS <Stack> headers and <TabList> get only minimal compat (classic rendering, a large empty top inset unfolded) and a rail-hosted TabList is intentionally unsupported; requires SDK 58 + Xcode 27.1. GAP: the corpus had no iPhone Duo / foldable-iPhone guidance |
| [React Native Windows 0.85](https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_v0.85.0) | already-held → firsthand-2026-11-25 (react-native-windows 0.84.0 → 0.85.2 row; New-Architecture-only + Visual Studio 2026 are that row's facts to verify) |
| [React Native Firebase 27](https://github.com/invertase/react-native-firebase/releases/tag/v27.0.0) | already-held → firsthand-2026-11-25 (@react-native-firebase/auth 26.4.0 → 27.1.1 row; v27 = SPM instead of CocoaPods on iOS + ML package removed — major, judged there) |
| [Unistyles 3.6](https://github.com/jpudysz/react-native-unistyles/releases/tag/v3.6.0) | already-held → firsthand-2026-11-25 (react-native-unistyles 3.5.3 → 3.8.2 row; 3.6 experimental Metro integration replacing the Babel plugin is that row's fact) |
| [Hot Updater 1.1](https://github.com/gronxb/hot-updater/releases/tag/v1.1.0) | already-held → firsthand-2026-11-25 (hot-updater 1.0.7 → 1.1.20 row; brownfield OTA + version-bump fix) |
| [React Native Bottom Tabs 1.5](https://github.com/callstack/react-native-bottom-tabs/releases/tag/react-native-bottom-tabs%401.5.0) | skipped: cap (react-native-bottom-tabs 1.5.0: SPM + iOS 27 prominent tab role; ~134K dl/wk, latest 1.5.1 2026-11-25 per npm. The corpus has no row for Callstack's native bottom-tabs library — RB-E-NAV routes native tabs through react-native-screens/React Navigation 8 and Expo NativeTabs — but a minor release is not the moment to open one; reopen: a NAV native-tabs comparison pass, or React Navigation 8 stable making the bare-RN native-tabs choice live) |
| [create-react-native-library 0.64](https://github.com/callstack/react-native-builder-bob/releases/tag/create-react-native-library%400.64.0) | **kept** → RB-E-NATIVE (status flip: create-react-native-library 0.64.0 (2026-10-22, GitHub release + npm latest 0.64.0) takes the C++ module template OUT OF EXPERIMENTAL — no more includesGeneratedCode: true, works from RN 0.88 and Expo SDK 58; also requires Node ^22.22.2 or ^24.15.0 or >=26 — a when-clause for shared pure-C++ modules) |
| [React Native Better PDF 1.1](https://github.com/gmi-software/react-native-better-pdf/releases/tag/v1.1.0) | already-held → RB-E-MEDIA (this pass's better-pdf keep, rn-rewind-62; 1.1.0 2026-10-19 adds several files as one document — the row pins 1.3.0) |
| [react-native-pdf](https://github.com/wonday/react-native-pdf) | already-held → RB-E-MEDIA (incumbent in this pass's PDF-viewing row, rn-rewind-62) |
| [Appduct](https://github.com/callstackincubator/appduct) | already-held → RB-E-AI-DEVTOOLS (REOPEN SIGNAL FIRED — twir-299's 'a tagged release or adoption outside Callstack': npm @appduct/react-native 0.16.0, ~8.8K dl/wk; kept via the incubator.callstack.com/appduct row above) |
| [React Native Skia](https://github.com/Shopify/react-native-skia) | previously already-held → RB-E-ANIMATION — carry over unless a reopen signal applies |
| [React Native WebGPU](https://github.com/wcandillon/react-native-webgpu) | already-held: RB-E-GAMES |
| [https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/](https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://medium.com/@thereactnativerewind](https://medium.com/@thereactnativerewind) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://www.youtube.com/@ReactNativeRewind](https://www.youtube.com/@ReactNativeRewind) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Adjudication summary (2026-11-25)

Page label verified: 'Issue #63' (RSS 2026-10-27). 29 links: 6 pre-dispositioned, 23 judged.
**Keeps (3):** Appduct → RB-E-AI-DEVTOOLS EARLY option row (twir-299's too-early skip REOPENED: npm
0.16.0 + ~8.8K dl/wk); Supporting iPhone Duo with Expo → RB-E-NAV reading (GAP: no foldable-iPhone
guidance existed); create-react-native-library 0.64 → RB-E-NATIVE (C++ template out of experimental).
Five release rows (RNW 0.85, RNFirebase 27, Unistyles 3.6, Hot Updater 1.1, Better PDF 1.1) are
owned by firsthand-2026-11-25 or this pass's rn-rewind-62 keep.

## Advocate pass (2026-11-25)

Re-argued:
- **react-native-bottom-tabs 1.5** (cap) — ~134K dl/wk with no corpus row is a real hole, but a
  minor release is the wrong trigger; reopen signal recorded (NAV native-tabs comparison, or React
  Navigation 8 stable).
- **react-native-skia-webgpu-video** — 22 dl/wk, beta-era, pins exact Skia/WebGPU; held.
- **Nitro V1 alpha / fbjni PR** — pre-ship and unverified (x.com login wall, GitHub API rate limit);
  held with reopen signals.

Flips: **none**.
