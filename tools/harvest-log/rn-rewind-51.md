# Harvest manifest — React Native Rewind #51 (2026-08-03)
issue: https://www.thereactnativerewind.com/issues/gpu-powered-crayons-npm-package-quarantine-and-dave-branching-off-your-code-without-asking

Built from `harvest inventory` (15 external links — slug source, resolved via
/newsletter-rss.xml on www.thereactnativerewind.com; the "Issue #51" label on the page confirms
the number, per this source's state-file note). Reason classes: corroboration · how-to · pre-ship ·
too-early · cap · unverifiable · off-scope · sponsor.

| item | disposition |
|---|---|
| [Did somebody get addicted to crack?](https://www.youtube.com/watch?v=Ix7PlYCdgHQ) | off-scope: issue chrome (meme link) |
| [React Native Canvas Kit](https://github.com/adithyavis/react-native-canvas-kit) | skipped: too-early — a batteries-included 2D canvas framework on RN Skia with no release history to cite. Corroborated in TWiR #292 (2 sources), which is why it is worth a reopen signal rather than a silent drop. Reopen: a tagged release + adoption signal |
| [Redraw: for effects beyond Skia](https://www.callstack.com/podcasts/redraw-for-effects-beyond-skia) | skipped: podcast episode — ANIMATION already carries Skia's position and the 2.10 NativeState fact is kept this pass from the release itself. Reopen: a written piece making the beyond-Skia case |
| [Shipaton](https://www.shipaton.com/?amp%3Butm_source=ReactNativeRewind&amp%3Butm_campaign=newsletter&amp%3Butm_content=shipaton) | skipped: sponsor (RevenueCat hackathon) |
| [Blue Peter badge](https://en.wikipedia.org/wiki/Blue_Peter_badge) | off-scope: issue chrome (joke reference) |
| [CISA: supply chain compromise impacts axios npm package](https://www.cisa.gov/news-events/alerts/2026/04/20/supply-chain-compromise-impacts-axios-node-package-manager) | skipped: corroboration — RB-E-SECURITY's note already names the axios RAT as part of the 2025–26 supply-chain wave, and the entry's own standing rule is that live CVEs belong in a security feed, not this encyclopedia. The durable registry-side response (npm publish-time malware scanning) IS kept this pass from the GitHub changelog. Reopen: a CISA advisory that changes a recommendation rather than confirming the wave |
| [Targate](https://targate.dev/) | skipped: too-early — a dependency-review product with an optional AI reviewer; no adoption signal and SECURITY's supply-chain layers are already named (install-script blocking, install-age gating, provenance, and now npm's own scan). Reopen: a second signal |
| [osv.dev](https://osv.dev/) | skipped: off-scope as an entry item — OSV is a vulnerability DATABASE, and SECURITY's option row already routes CVE scanning generically ("npm/pnpm audit; route depth to the review skill") rather than enumerating data sources |
| [the event-stream package was handed off to a stranger](https://github.com/dominictarr/event-stream/issues/116) | skipped: historical incident (2018) — the canonical maintainer-handoff story, but SECURITY's supply-chain readings already cover the modern chain (Shai-Hulud, TanStack postmortem, NodeSource install-script nuance) with current mechanics |
| [Targate: AI and privacy](https://targate.dev/docs/concepts/ai-and-privacy/) | skipped: vendor documentation for the row above |
| [GitHub's stacked pull requests](https://docs.github.com/en/pull-requests/get-started/about-stacked-prs) | skipped: off-scope — VCS workflow documentation, not React selection knowledge |
| [The React Native Rewind on LinkedIn](https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/) | off-scope: newsletter's own distribution channel |
| [The React Native Rewind on Medium](https://medium.com/@thereactnativerewind) | off-scope: newsletter's own distribution channel |
| [The React Native Rewind on YouTube](https://www.youtube.com/@ReactNativeRewind) | off-scope: newsletter's own distribution channel |
| [Maestro MCP](https://docs.maestro.dev/get-started/maestro-mcp?amp%3Butm_campaign=partnerbanner) | already-held: RB-E-TESTING's option row + note carry the Maestro MCP server, verified vs docs.maestro.dev on 2026-07-07 (this appearance is a sponsored partner banner) |

## Yield

Zero keeps. #51 is a supply-chain-themed essay issue — npm package quarantine, the event-stream
handoff, a dependency-review product — and the corpus already holds that thread with better
sources. The one durable supply-chain fact of the week (npm's publish-time malware scan) came in
via TWiR #292's link to the GitHub changelog, which is the primary artifact; this issue's CISA and
osv.dev links corroborate the theme without moving a recommendation. Consistent with #50, which
also yielded 0 keeps: this source has shifted toward agentic-tooling and security essays.
