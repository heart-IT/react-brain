# Harvest manifest — React Native Rewind #62 'A Butler Who Never Reads the Diff, 1,000-Page Contracts in 56 Milliseconds, and a Phone That Knows How Far It's Folded' (prepped 2026-11-25)
issue: https://www.thereactnativerewind.com/issues/a-butler-who-never-reads-the-diff-1-000-page-contracts-in-56-milliseconds-and-a-phone-that-knows-how-far-its-folded

Pre-triaged by `harvest prep`: 34 external links · 8 pre-dispositioned (corpus + prior-manifest cross-ref) · **26 TODO** (adjudicated 2026-11-25: 3 kept rows = 2 keeps, see summary).
Judge ONLY the TODO rows; carried rows re-open only on their reopen signals. Advocate pass, verify-diff and coverage gates apply as usual.

| item | disposition |
|---|---|
| [Expo SDK 58](https://expo.dev/changelog/sdk-58) | already-held → firsthand-2026-11-25 (expo 57.0.29 → 58.0.26 row) + RB-E-RN-VERSIONS (SDK 58 STABLE 2026-10-15 already written by this pass's tripwire flip). Changelog fetched (datePublished 2026-10-15; 'includes React Native 0.88'); the facts it adds beyond the beta changelog (Xcode 27 replaces Simulator.app with Device Hub; expo-hinge; iPhone Duo; expo-app-intents still alpha; Noxcturnal still experimental) go to proposals-rnr.md for the beta→stable sweep |
| [Xcode 27](https://developer.apple.com/xcode/) | skipped: off-scope (Apple's Xcode product page, background reference; the 'Xcode 27 retires Simulator.app' fact is verified from the SDK 58 changelog instead) |
| [expo-app-intents](https://docs.expo.dev/versions/v58.0.0/sdk/app-intents/) | already-held → RB-E-NATIVE-UI (expo-app-intents ALPHA option row + APP INTENTS note; SDK 58 stable changelog still says 'The library is in alpha' — only the 'SDK 58 beta' wording needs the stable sweep) |
| [App Intents](https://developer.apple.com/documentation/appintents) | skipped: off-scope (Apple framework reference, background for the expo-app-intents row) |
| [Noxcturnal](https://github.com/expo/expo/pull/48443) | already-held → RB-E-BUILD (Noxcturnal option row + NOXCTURNAL note cite the same 5,500-file 5.26s→2.46s figures; stable changelog still calls it experimental) |
| [oxc](https://oxc.rs/) | skipped: off-scope (oxc homepage, background reference; RB-E-DX already cites oxc's own blog posts) |
| [Babel](https://babeljs.io/) | skipped: off-scope (Babel homepage, background reference) |
| [GMI Software](https://gmi.software/) | skipped: sponsor (GMI Software, the better-pdf author's agency homepage — self-promotion chrome) |
| [react-native-pdf](https://github.com/wonday/react-native-pdf) | **kept** → RB-E-MEDIA (the INCUMBENT in the new PDF-viewing option row: react-native-pdf 7.0.5, 2026-08-13, ~1.08M dl/wk, bundles PDFium on Android + needs react-native-blob-util — npm registry + downloads API 2026-11-25) |
| [PDFium](https://pdfium.googlesource.com/pdfium/) | skipped: off-scope (PDFium engine source, background for the better-pdf comparison) |
| [PDFKit](https://developer.apple.com/documentation/pdfkit) | skipped: off-scope (Apple PDFKit reference, background) |
| [PdfRenderer](https://developer.android.com/reference/android/graphics/pdf/PdfRenderer) | skipped: off-scope (Android PdfRenderer reference, background) |
| [Nitro Views](https://nitro.margelo.com/docs/view-components) | skipped: off-scope (Nitro Views docs, background reference for better-pdf's rendering layer; RB-E-NATIVE owns Nitro) |
| [2021](https://github.com/wonday/react-native-pdf/issues/555) | skipped: corroboration (react-native-pdf search feature request from 2021, still open — the better-pdf README's own receipt; no fact beyond the kept row) |
| [2023](https://github.com/wonday/react-native-pdf/issues/763) | skipped: corroboration (react-native-pdf forms feature request from 2023 — background receipt for the better-pdf row) |
| [New Architecture](https://reactnative.dev/architecture/landing-page) | skipped: off-scope (New Architecture landing page, background reference; RB-E-RN-VERSIONS owns the New-Arch mandate) |
| [react-native-nitro-modules](https://github.com/mrousavy/nitro) | already-held → RB-E-NATIVE (Nitro Modules; here only as better-pdf's peer dependency react-native-nitro-modules >=0.37.0) |
| [React Native 0.88](https://reactnative.dev/blog/2026/10/19/react-native-0.88) | already-held → firsthand-2026-11-25 (⚡ react-native ≥0.88.0 tripwire — the RN 0.88 stable flip is that row's work; RN-VERSIONS default already reads 0.88 / npm 0.88.1) |
| [EAS CLI 25](https://github.com/expo/eas-cli/releases/tag/v25.0.0) | skipped: corroboration (EAS CLI 25 cloud-simulator preview links + `eas simulator:control` — the EAS Simulators launch is carried by the firsthand expo.dev rows 'Agentic Workflows with Expo Simulators' / 'How to set up agentic workflows on Expo' and judged there; reopen: if that firsthand row is skipped, EAS Simulators is a TESTING/AI-DEVTOOLS gap) |
| [React Native Gesture Handler 3.4](https://github.com/software-mansion/react-native-gesture-handler/releases/tag/v3.4.0) | already-held → firsthand-2026-11-25 (react-native-gesture-handler 3.3.0 → 3.5.0 row; 3.4 SPM builds + immediatePressOut are minor-line features) |
| [React Native Screens 4.30](https://github.com/software-mansion/react-native-screens/releases/tag/4.30.0) | **kept** → RB-E-NAV (new note iOS 26+ HEADERS: react-native-screens 4.30.0 (2026-10-13; npm latest 4.30.1) lays screens out under OPAQUE navigation bars via the safe area on iOS 26+, stops opaque headers minimizing on scroll, reports the minimized height via useHeaderHeight on iOS 27+, adds unstable_safeAreaEdges + Tabs prominentScreenKey; Apple declined the opaque-header strip bug and SWM recommends transparent headers on iOS 26+ — closes the 2026-10-15 follow-up 'carry the transparent-header caveat into NAV', which shipped on the 4.x line, not 5.0) |
| [React Native Nano Icons 1.0](https://github.com/software-mansion-labs/react-native-nano-icons) | already-held → RB-E-SVG (react-native-nano-icons 1.0 option row, kept twir-301) |
| [React Native Skia 3.7](https://github.com/wcandillon/react-native-skia/releases/tag/v3.7.0) | already-held → firsthand-2026-11-25 (react-native-skia 3.5.0 → 3.12.0 row). 3.7.0 (2026-10-18) notes = Skia m157 + Dawn/Graphite Android fixes; the blurb's 'no-Vulkan phones pointed back to v2' is NOT in the 3.7.0 notes — unverified here, left to that row |
| [react-native-gpui](https://github.com/natew/react-native-gpui) | skipped: too-early (RN components rendered via Zed's GPUI into a Metal window; Apple Silicon only, experiment — the GPUIX React renderer was skipped the same way twir-295; reopen: a tagged release or an app shipping on it) |
| [beUI for React Native](https://beui.dev/react-native) | skipped: too-early (45 copy-in animated components on Reanimated/RNGH/Uniwind from one author; no adoption signal; reopen: recurrence across sources or measurable adoption — then RB-E-COMPONENT-LIBS) |
| [rn-build-doctor](https://reactnative.directory/package/rn-build-doctor) | skipped: too-early (single-author offline build/crash-log diagnoser; reopen: adoption or a second sighting) |
| [Metro](https://metrobundler.dev/) | previously skipped (other) → RB-E-BUILD — carry over unless a reopen signal applies |
| [reactadvanced.com](https://reactadvanced.com/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [react-native-better-pdf](https://github.com/gmi-software/react-native-better-pdf) | **kept** → RB-E-MEDIA (REOPENED from twir-301's too-early skip — its reopen signal 'adoption' fired: ~270 dl/wk at 1.0 → 53,472 dl/wk for 2026-11-17..23 (npm downloads API), 1.0.0 2026-10-12 → 1.3.0 2026-11-23, MIT. New PDF-viewing option row: PDFKit on iOS / platform PdfRenderer on Android via Nitro Views, no bundled PDFium/WebView/blob-util; New Architecture + RN 0.83+ + react-native-nitro-modules ≥0.37 required, Expo dev build only; author benchmark (Android emulator) 1,000-page scan opens 56 ms vs 622 ms at 142 MB vs 898 MB peak, while on iOS both use PDFKit so the gap mostly vanishes; search/forms/password docs need Android 15 or 12–14 with SDK extension 13 — README fetched 2026-11-25) |
| [Margelo](https://margelo.com/) | previously skipped (sponsor) — carry over unless a reopen signal applies |
| [Relaunching TeamReach](https://expo.dev/blog/teamreach-ota-updates-relaunch) | already-held: RB-E-OTA |
| [https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/](https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://medium.com/@thereactnativerewind](https://medium.com/@thereactnativerewind) | previously skipped (off-scope) — carry over unless a reopen signal applies |
| [https://www.youtube.com/@ReactNativeRewind](https://www.youtube.com/@ReactNativeRewind) | previously skipped (off-scope) — carry over unless a reopen signal applies |

## Adjudication summary (2026-11-25)

Page label verified: 'Issue #62' (RSS 2026-10-20). 34 links: 8 pre-dispositioned by prep, 26 judged here.
**Keeps (2):** react-native-better-pdf → RB-E-MEDIA new PDF-viewing option row (twir-301's too-early
skip REOPENED on its own 'adoption' signal: ~270 → 53K dl/wk), with react-native-pdf as the incumbent;
react-native-screens 4.30 → RB-E-NAV iOS 26+ HEADERS note (the transparent-header caveat the
2026-10-15 ledger said to carry at 5.0 stable shipped on the 4.x line instead).
Everything else headline-grade (Expo SDK 58 stable, RN 0.88, RNGH, Skia) is already owned by
firsthand-2026-11-25 rows or this pass's tripwire flips. Blurb lag again: "Xcode 27 has retired
Simulator.app" is right (SDK 58 changelog: replaced by Device Hub), but "Android phones without
Vulkan now get pointed back to v2" is not in the Skia 3.7.0 notes — left unverified.

## Advocate pass (2026-11-25)

Re-argued:
- **EAS CLI 25 cloud simulators** — held as corroboration ONLY because firsthand carries the
  EAS Simulators posts; if that row is skipped, the reopen note makes it a gap.
- **react-native-gpui / beUI / rn-build-doctor** — held: single-author first sightings.
- **react-native-better-pdf** — already flipped on its reopen signal (above).

Flips: **none** beyond the reopen.
