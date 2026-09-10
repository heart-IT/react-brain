# Harvest manifest — React Native Rewind #56 (2026-09-10 pass)
issue: https://www.thereactnativerewind.com/issues/eas-cloud-iphones-automated-screenshot-pipelines-and-nuking-every-simulator-you-ever-loved

"EAS Cloud iPhones, Automated Screenshot Pipelines, and Nuking Every Simulator You Ever Loved"
(issue number read off the page's own "Issue #56" label, per this source's standing note).
A single-theme issue: everything in it is agent/CI device infrastructure.

| link | disposition |
|---|---|
| [EAS Simulator](https://expo.dev/services/simulators) | skipped: pre-ship — Expo's cloud simulators for agents (`eas simulator --platform ios`; sessions isolated on the EAS Build/Submit/Workflows infrastructure, a session recording posted to the PR as proof a fix works, driven with argent or agent-device). EARLY ACCESS behind a waitlist, so there is nothing a reader can act on — the same discipline applied to Expo Tuft on 2026-09-01. Worth noting even in the skip: Expo is building this ON TOP of the two device-driving tools RB-E-AI-DEVTOOLS already recommends, which corroborates that pick. Reopen: general availability or open access |
| [agent-device](https://github.com/callstack/agent-device) | already-held: RB-E-AI-DEVTOOLS — option row, moved to 0.21.0 this pass from firsthand |
| [Argent](https://github.com/software-mansion/argent) | already-held: RB-E-AI-DEVTOOLS — option row, moved to 0.25.0 this pass from firsthand |
| [Simlock](https://github.com/callstackincubator/simlock) | kept: RB-E-AI-DEVTOOLS — new option row. A device-LEASE control plane for the case every other row in that entry ignores: several coding agents on one machine (or a fleet) contending for simulators/emulators. Agents ask for a device instead of touching simctl/avdmanager; it provisions up to a CPU/RAM-derived capacity, queues fairly beyond it, tiers idle devices down (shutdown to reclaim RAM, delete to reclaim disk), and reboots a dead leased device under the same lease. Worker/gateway split lets a NAT'd Mac join a fleet over one outbound WebSocket with a join token. Kept with its maturity stated — npm 0.2.0 (2026-08-21), ~13★ — on the same basis as the Metrognome row: the lease primitive is the durable idea |
| [goldie](https://github.com/kacperkapusciak/goldie) | skipped: too-early — App Store screenshot generator for agents and humans; second sighting this pass (also in twir-296). No entry owns store-asset tooling and it has no adoption signal. Reopen: a third mention would make it a gap question rather than a tool question |
| [ffmpeg](https://ffmpeg.org/) | skipped: off-scope — ffmpeg's homepage, cited as a dependency of the screenshot-pipeline story |
| [Goldie (drum and bass legend)](https://en.wikipedia.org/wiki/Goldie) | skipped: off-scope — the newsletter's joke about the tool's name |
| [No One Knows (YouTube)](https://www.youtube.com/watch?v=s88r_q7oufE) | skipped: off-scope — music video, the issue's running gag |
| [Can't Stop (YouTube)](https://www.youtube.com/watch?v=8DyziWtkfBw) | skipped: off-scope — music video, same gag |
| [Go haunt a living room](https://fandf.co/46kAbm5) | skipped: sponsor — shortlink placement |
| [LinkedIn newsletter](https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/) | skipped: off-scope — the newsletter's own distribution channel |
| [Medium mirror](https://medium.com/@thereactnativerewind) | skipped: off-scope — the newsletter's own mirror |
| [YouTube channel](https://www.youtube.com/@ReactNativeRewind) | skipped: off-scope — the newsletter's own channel |

Coverage: 13/13 external links dispositioned.
