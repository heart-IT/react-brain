# Harvest manifest — React Weekly #37 (2026-09-13; processed 2026-09-21)
issue: https://react-weekly.dev/newsletter/37

Harvested from the RSS `content:encoded` body per harvest-state (the site and api.react-weekly.dev are
JS-shell/auth-gated, and `harvest inventory`/`coverage` return 0 links on the issue URL — so this manifest,
not the coverage gate, is the record for this source). Every api.react-weekly.dev/track/click/<id> link was
resolved with `curl -L` before dispositioning; the rows below carry the RESOLVED destinations.

| item | disposition |
|---|---|
| [https://github.com/pmndrs/jotai/releases/tag/v3.0.0](https://github.com/pmndrs/jotai/releases/tag/v3.0.0) | already-held: RB-E-STATE — jotai v3.0.0 is already the target of a migrate rule there, with this exact release URL among its receipts and the whole v2→v3 change set written out (ESM-only, atomFamily → jotai-family, loadable removed, the useAtomValue mount-timing change) |
| [https://github.com/react/react-native/releases/tag/v0.88.0-rc.0](https://github.com/react/react-native/releases/tag/v0.88.0-rc.0) | skipped: corroboration — 0.88.0-rc.0, superseded by rc.1 which IS kept this pass in RB-E-RN-VERSIONS (React 19.3 sync, Hermes 260318099.0.3, EventTarget in canary) |
| [https://blog.master.dev/react-now-rusted-all-the-way-out/](https://blog.master.dev/react-now-rusted-all-the-way-out/) | skipped: corroboration — on the Rust React Compiler port. RB-E-REACT-CORE already states the precise status ('React Compiler 1.0 is STABLE; the Rust port is the WIP part') and RB-E-BUILD covers the bundler side (Rspack 2.1's SWC loader shipping it at 7-13x the Babel plugin). Also surfaced by React Digest #2365. Reopen: a shipped-stable Rust compiler release |
| [https://expo.dev/blog/an-early-look-at-expo-modules-2-0](https://expo.dev/blog/an-early-look-at-expo-modules-2-0) | already-held: RB-E-NATIVE — this post is already a READING there; the SDK 58 status flip (2.0 in beta on iOS *and* Android) plus the Android-vs-TurboModule benchmarks are the keep this pass, from the changelog |
| [https://react.dev/blog/2026/09/09/react-19-3](https://react.dev/blog/2026/09/09/react-19-3) | already-held: RB-E-REACT-CORE + RB-E-SECURITY — React 19.3 was kept 2026-09-10 on a fired tripwire and is a cited source in both entries |
| [https://expo.dev/changelog/expo-go-57-login](https://expo.dev/changelog/expo-go-57-login) | already-held: RB-E-RN-VERSIONS — the Expo Go SDK 57 login requirement was kept from TWiR #296 (dev builds and simulators unaffected) |
