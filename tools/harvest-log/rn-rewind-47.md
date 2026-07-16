# Harvest manifest — React Native Rewind Issue #47 (2026-06-29)
issue: https://www.thereactnativerewind.com/issues/a-rust-replacement-for-metro-3d-ducks-in-bold-tags-and-the-swift-feature-apple-forgot-to-share

See rn-rewind-46.md for the resume-state correction note (real issue numbers vs the state file's
approximate "~#48" — confirmed accurate for the RN Rewind source as a whole).

| item | disposition |
|---|---|
| [Metro](https://metrobundler.dev/) | skipped: background/definitional link (what a bundler is), not a new fact — RB-E-BUILD already covers Metro as the RN default |
| [Repack](https://github.com/callstack/repack) | skipped: passing mention ("...or Repack, but that's a story for another day"), no new fact — RB-E-BUILD already covers Re.Pack 5 |
| [Hermes](https://github.com/facebook/hermes) | skipped: background/definitional link, no new fact |
| [Rollipop](https://rollipop.dev/) | already-held: RB-E-BUILD option row ("Rollipop (early alpha)" — Rolldown-powered Metro replacement, bare RN CLI only, no Expo; verified vs its repo 2026-06-30, one day after this issue) |
| [Rolldown](https://rolldown.rs/) | already-held: RB-E-BUILD (Vite 8 defaults to Rolldown) and cited as Rollipop's underlying bundler |
| [HMR (MDN/webpack concept link)](https://webpack.js.org/concepts/hot-module-replacement/) | skipped: generic concept definition, no new fact |
| [Chain React conference](https://chainreactconf.com/) | skipped: off-scope — community/marketing |
| [Chain React WhatsApp raffle](https://chat.whatsapp.com/HYwgiw0npq85QDonmFS1YR) | skipped: off-scope — community/marketing |
| [WebGL API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) | skipped: background/definitional link for the PolyCSS item below |
| [PolyCSS](https://polycss.com/) | skipped: too-early / novelty — renders 3D meshes as DOM elements (`<b>`/`<u>`/`<i>`/`<s>` tags) instead of canvas/WebGL; a clever technique demo, not a production 3D contender against RB-E-GAMES's existing options (react-three-fiber, WebGPU); no adoption signal. Reopen signal: production case study or broader corroboration |
| [Orthographic projection (Wikipedia)](https://en.wikipedia.org/wiki/Orthographic_projection) | skipped: background/definitional link for PolyCSS |
| [WWDC25 PaperKit session](https://developer.apple.com/videos/play/wwdc2025/285/) | skipped: primary-source background for the expo-paperkit item below, no independent fact |
| [PaperKit docs](https://developer.apple.com/documentation/PaperKit) | skipped: background/definitional link for expo-paperkit |
| [expo-paperkit](https://github.com/hryhoriiK97/expo-paperkit) | skipped: too-early — single solo-dev wrapper, requires iOS 26/macOS 26 + Expo SDK 54 + RN 0.81, no Expo Go support, no Android equivalent; corpus has no drawing/annotation-canvas entry and one narrow OS-gated wrapper doesn't clear the bar RB-E-CALENDARS set (two independent signals) for a new entry. Reopen signal: second independent source, or broader native-annotation pattern emerging |
| [PencilKit docs](https://developer.apple.com/documentation/pencilkit), [PKToolPicker docs](https://developer.apple.com/documentation/pencilkit/pktoolpicker) | skipped: background/definitional links for expo-paperkit |
| [LinkedIn newsletter](https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/), [Medium](https://medium.com/@thereactnativerewind), [YouTube channel](https://www.youtube.com/@ReactNativeRewind) | off-scope: own-channel promo links |
| [Maestro MCP (sponsor banner)](https://docs.maestro.dev/get-started/maestro-mcp?amp%3Butm_campaign=partnerbanner) | sponsor (utm_campaign=partnerbanner; content already-held regardless, see rn-rewind-48 manifest) |

Advocate pass: re-read PolyCSS and expo-paperkit as a hostile reviewer arguing them back in.
PolyCSS stays skipped — it doesn't compete with the corpus's real 3D-rendering options (no perf
comparison, no production use, DOM-elements-as-3D is fundamentally a demo trick). expo-paperkit
stays skipped as too-early rather than off-scope (genuine gap noted, but single-source + narrow
OS-gate isn't corroboration; flip once a second signal or wider platform support lands) — no
flips this pass.
