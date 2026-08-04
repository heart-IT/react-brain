# Harvest manifest — React Weekly #31 (2026-08-02)
issue: https://react-weekly.dev/newsletter/31

Built from the RSS `content:encoded` body (10 links), per this source's state-file note: the site
and api.react-weekly.dev are a JS shell / auth-gated, so `harvest inventory` and `harvest coverage`
return 0 links on the issue URL and THIS FILE is the record. Every link in the body is an
`api.react-weekly.dev/track/click/<id>` redirect; each was resolved with `curl -L` before
dispositioning and the resolved target is what appears below (utm parameters stripped).

| item | disposition |
|---|---|
| [Introducing TanStack Markdown and TanStack Highlight](https://tanstack.com/blog/introducing-tanstack-markdown-and-highlight) | skipped: corroboration — carried skip from #291, re-confirmed in React Status #485 and TWiR #292 this pass. No entry owns markdown rendering or syntax highlighting |
| [Why TanStack Stopped Using RSC on TanStack.com](https://tanstack.com/blog/we-stopped-using-rsc-on-tanstack-com) | already-held: RB-E-META-FRAMEWORKS (also pre-dispositioned as already-held by `harvest prep` in both twir-292 and react-status-485 — three-source corroboration of a fact the corpus already carries) |
| [Making Referential Stability a Type](https://www.jovidecroock.com/blog/referential-stability-types/) | skipped: depth over selection — encoding referential stability in the type system is a types experiment, not a library choice; it changes no pick. Corroborated in TWiR #292. Reopen: a shipped library or lint rule enforcing it |
| [Experimenting with RSCs for Performance and UX in Next.js](https://aurorascharff.no/posts/experimenting-with-rsc-for-performance-and-ux-in-nextjs) | skipped: cap — carried skip now recurring across THREE manifests this pass (firsthand 07-28, react-status-485, twir-292) plus here. RE-ARGUED ON THE ADVOCATE PASS AND HELD: META-FRAMEWORKS already carries the Next 16.3 Instant Navigations reading and REACT-CORE the async-React thread; this is a patterns-experiment post, and the same author's written work is already represented. Reopen: a measured production result rather than experimentation |
| [The State of Zero-Runtime CSS-in-JS](https://dx-styles.dev/blog/state-of-zero-runtime-css-in-js/) | **kept (ADVOCATE FLIP)** → RB-E-STYLING reading + claim. Skipped as `cap` three times (firsthand 07-28, react-status-485, twir-292) and reinstated on this pass's advocate read: it is the only piece covering the FIELD rather than one library, and STYLING's options list names no zero-runtime web option except StyleX — vanilla-extract, Panda, next-yak and Griffel appear nowhere. Author discloses he maintains Linaria + wyw-in-js and built dx-styles; the entry already holds his wind-down essay under the same disclosure. Four detect rows added with it |
| [The Absolute State of Management](https://infrequently.org/2026/07/state-management) | already-held: RB-E-STATE (pre-dispositioned as already-held by `harvest prep` in twir-292 as well) |
| [From Manual Releases to Continuous Delivery with Expo](https://expo.dev/blog/posh-manual-weekly-releases-to-continuous-delivery-with-expo) | skipped: vendor case study on expo.dev/blog, which is a JS shell per this corpus's fetch playbook — and the durable CI/CD lane is already held (BUILD carries the Teamworks Re.Pack case study with client receipts, OTA carries EAS Update's channels/rollouts). Reopen: numbers that contradict or extend the Teamworks case |
| [Running Dev and Production Side by Side with App Variants](https://expo.dev/blog/app-variants-side-by-side) | skipped: how-to — carried skip, already dispositioned in twir-292 and the firsthand 07-28 manifest |
| [Why Moving MMKV Writes to a Worklet Didn't Work](https://andrei-calazans.com/posts/2026-07-28-mmkv-writes-worklet-serialization-cost/) | **kept** → RB-E-STORAGE reading + claim (corroborates TWiR #292, where the same post is the RN-section headline). A measured negative result: the write cost (~29.56ms) simply relocated into createSerializableString; passing the whole store object cost ~132ms via per-property cloning; Bundle Mode changed nothing (~136ms). Durable rule: a worklet is not free thread-offload — you pay serialization at the boundary |
| [Sign in with Google for React Native](https://thoughtbot.com/blog/sign-in-with-google-for-react-native) | **kept** → RB-E-AUTH reading + claim (third source this pass, with TWiR #292 and React Status #485). The durable part is a PLATFORM deprecation: Android's legacy GoogleSignInClient is deprecated and slated for removal, Credential Manager is the replacement, and much of the RN field still targets the old API. The library pick is the authors' own — kept as disclosed vendor advocacy |

## Coverage note

`react-brain harvest coverage` cannot gate this source (the issue URL yields 0 links to a
deterministic extractor). The mechanical substitute used here: the 10 links above are every `<a
href>` in the RSS `content:encoded` body, de-duplicated, extracted by regex rather than by reading
the issue — the same discipline `harvest inventory` applies elsewhere.

## Yield

3 keeps from 10 links, the highest keep-rate of the pass — two of them (MMKV worklets, Sign in with
Google) corroborated by TWiR #292, and the third the advocate-pass reinstatement. React Weekly's
editorial slant toward written deep-dives over release notes keeps paying off relative to its size.
