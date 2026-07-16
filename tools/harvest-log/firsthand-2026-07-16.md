# Harvest manifest — firsthand (2026-07-16)
issue: firsthand

Weekly `node tools/cli.mjs harvest firsthand` diff vs the committed `.firsthand-state.json`
(189 npm packages + 33 globs skipped · 37 GitHub repos · 33 author feeds · 7 tripwires armed).
6 events since last run, all npm dist-tag bumps. No tripwire fired (7 armed, 0 fired — none of
the standing release conditions in RB-E-ANIMATION's Rive rows came true this week).

| entity | event | disposition |
|---|---|---|
| react-native-reanimated | 4.5.1 → 4.5.2 | skipped: "Reanimated version supporting Worklets 0.11" per [GitHub release](https://github.com/software-mansion/react-native-reanimated/releases/tag/4.5.2) — no new fact, RB-E-ANIMATION doesn't cite a point version |
| react-native-worklets | 0.10.2 → 0.11.0 | skipped: [release notes](https://github.com/software-mansion/react-native-reanimated/releases/tag/worklets-0.11.0) — experimental Hermes-bytecode worklets (opt-in workaround for a memory issue) + bugfixes, no deprecation/breaking change; RB-E-ANIMATION's "worklets split into its own package" fact still holds. NOTE (incidental, out of scope for this pass): the entry's option row asserts version "react-native-worklets 8.0" — npm/GitHub both show current latest is 0.11.0, so that number looks stale/wrong; flagging for the Correctness tier rather than fixing here (unrelated to this week's diff, and the growth pass doesn't license unscoped edits) |
| expo-camera | 57.0.2 → 57.0.3 | skipped: patch release, no changelog signal found; RB-E-MEDIA cites no point version |
| hot-updater | 0.35.3 → 0.35.4 | skipped: [release notes](https://github.com/gronxb/hot-updater/releases/tag/v0.35.4) — one bugfix (coalesce progress-store notifications); RB-E-OTA already says "v0.35.x" which still holds |
| react-native-iap | 15.5.0 → 15.5.1 | skipped: patch release, no changelog body published; RB-E-PAYMENTS cites no point version |
| expo-iap | 4.5.0 → 4.5.1 | skipped: patch release, no changelog body published; RB-E-PAYMENTS cites no point version |

No corpus edits from this firsthand pass — all 6 events are routine point releases with no
deprecation, breaking change, or version-line fact affected. `.firsthand-state.json` advanced
regardless (dist-tags always move forward) and is committed with this manifest.
