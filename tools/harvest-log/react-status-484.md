# Harvest manifest — React Status #484 (2026-07-24)
issue: https://react.statuscode.com/issues/484

Processed 2026-07-28, same pass as twir-291 (which shares several links — dispositions match by
construction; rows below say where). Pre-triaged by `harvest prep`: 43 external links.
Reason classes: corroboration · how-to · pre-ship · too-early · minor-release · cap ·
unverifiable · off-scope · sponsor.

## Headliners

| item | disposition |
|---|---|
| [The Absolute State of Management](https://infrequently.org/2026/07/state-management/) | **kept** → RB-E-STATE reading. Alex Russell argues propagation ≠ management and that time/conflict handling (CRDTs, sync engines) is the real thing. Kept as a FRAMING axis next to the client-vs-server split, explicitly noting it is a provocation with a public rebuttal — not a verdict |
| [already pushed back](https://bsky.app/profile/acemarke.dev/post/3mrdi65bsdc2y) | skipped: unverifiable in kind (a social post) — Mark Erikson's rebuttal is acknowledged in the reading's `what:` prose without citing the post as a source |
| [React 19.2.8, 19.1.9 and 19.0.8 Released](https://github.com/react/react/releases/tag/v19.2.8) · [v19.1.9](https://github.com/react/react/releases/tag/v19.1.9) · [v19.0.8](https://github.com/react/react/releases/tag/v19.0.8) | **kept** (as the patch-version half of the advisory below) → RB-E-SECURITY version floor |
| [a DoS vulnerability](https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g) | **kept** → RB-E-SECURITY (same as twir-291; advisory fetch-verified — High, CVSS 7.5) |
| [shadcn/ui Adds React Aria as a Component Base](https://ui.shadcn.com/docs/changelog/2026-07-react-aria) · [React Aria](https://react-aria.adobe.com/) | already-held: RB-E-COMPONENT-LIBS (React Aria third base added 2026-07-20) |
| [Shopify's React to Preact + Web Components Migration](https://shopify.engineering/upgrading-checkout-blocks-app-to-polaris-web-components) | **kept** → RB-E-ALT-FRAMEWORKS reading + claim. Verified: a hard 64KB gzip per-extension limit enforced by the 2026-01 remote-dom CLI against bundles at ~100–112KB gzipped; dropping react-reconciler via Preact was the single biggest cut (~89KB); transferred sizes fell 40–85% across five extensions |

## In brief

| item | disposition |
|---|---|
| [promised](https://nextjs.org/blog/next-security-release-program) | already-held: RB-E-META-FRAMEWORKS |
| [July 2026 Security Release](https://nextjs.org/blog/july-2026-security-release) | **kept** → RB-E-META-FRAMEWORKS (same as twir-291 — adds the patched versions 16.2.11 / 15.5.21 to a note that already carried the counts) |
| [TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) | already-held: RB-E-TYPESCRIPT (TS 7.0 STABLE flip, TWiR #289) |
| [now enable experimental.useTypeScriptCli](https://nextjs.org/docs/app/api-reference/config/next-config-js/useTypeScriptCli) | **kept** → RB-E-TYPESCRIPT note + `when` + migrate caveat + source. THIS is the verifiable receipt for the twir-291 tweet: `next build` embeds the TS compiler API, which TS 7 does not yet expose |
| [GTKX](https://gtkx.dev/) · [v1.0 has reached release candidate status](https://gtkx.dev/blog/gtkx-1-0-rc-1) | skipped: pre-ship (RC) — see the twir-291 row for the reopen signal (1.0 stable → RB-E-DESKTOP Linux-native row) |
| [advises](https://x.com/ReactRouter/status/2079966504162856965) | skipped: unverifiable (X) — the same advice is verifiable on the advisories page below, which is what got encoded |
| [several newly published CVEs](https://github.com/remix-run/react-router/security/advisories) | **kept** → RB-E-NAV note + option row + migrate-rule floor + source. Verified: six advisories published 2026-07-22 (incl. an unauthenticated `__manifest` DoS, High CVSS 7.6, affecting >=7.0.0 <7.18.0), fixed in 8.3.0 and backported to 7.18.0 |
| [a new Toast component](https://ui.shadcn.com/docs/changelog/2026-07-toast) | skipped: minor-release (component changelog; RB-E-COMPONENT-LIBS tracks bases, not components) |

## Articles

| item | disposition |
|---|---|
| [Props, Composers, and Providers](https://backstage.orus.eu/react-composition-patterns-at-orus/) | **kept** → RB-E-REACT-CORE (same as twir-291; this is the 2nd of three sources carrying it this week) |
| [Which React Native Animation Library Should You Use for Performance?](https://andrei-calazans.com/posts/2026-07-15-which-react-native-animation-library/) | **kept** → RB-E-ANIMATION (same as twir-291) |
| [Inside TanStack Table v9's New Reactivity Model](https://tanstack.com/blog/tanstack-table-v9-reactivity) | skipped: pre-ship — re-verified 2026-07-28, @tanstack/react-table latest 8.21.3 / v9 at beta.58. Reopen: v9 stable |
| [How to Find a Next.js Memory Leak in Production](https://xabierlameiro.com/blog/nextjs/nextjs-memory-leak-in-production) | skipped: how-to — a diagnosis walkthrough. The interesting durable claim ("three unfixed memory leaks in Next.js") is a moving bug-tracker fact, which the corpus deliberately leaves to a feed rather than an encyclopedia. Reopen: an upstream acknowledgement that makes it a version-scoped caveat → RB-E-META-FRAMEWORKS |

## Code, tools & libraries

| item | disposition |
|---|---|
| [React Colorful 5.8](https://github.com/omgovich/react-colorful/releases/tag/v5.8.0) · [homepage/demo](https://omgovich.github.io/react-colorful/) | skipped: minor-release, niche component (no entry owns color pickers) |
| [Shadscan: Deterministic UI Audits for shadcn Apps](https://www.shadscan.com/) | skipped: too-early (new tool, no adoption signal; ~60 deterministic a11y/state/composition checks, no AI). Reopen: 2nd independent mention → RB-E-COMPONENT-LIBS or RB-E-DX alongside react-doctor |
| [edge-aura](https://edge-aura.js.org/) | skipped: niche visual effect |
| [React on Rails 17.0](https://github.com/shakacode/react_on_rails/releases/tag/v17.0.0) · [Ruby on Rails](https://rubyonrails.org/) · [Homepage](https://reactonrails.com/) | skipped: off-scope (Rails integration is outside the corpus's React/RN selection surface) |
| [React Data Table 8.8](https://reactdatatable.com/) | skipped: niche component |
| [react-native-graph 1.3](https://github.com/margelo/react-native-graph) | skipped: minor-release — RB-E-CHARTS already holds react-native-graph (also surfaced by firsthand: npm 1.2.0 → 1.3.0) |
| [react-native-nitro-sqlite 9.7](https://github.com/margelo/react-native-nitro-sqlite/releases/tag/v9.7.0) | skipped: minor-release — RB-E-STORAGE's SQLite rows are op-sqlite/expo-sqlite; nitro-sqlite has no recurring selection signal yet. Reopen: 2nd mention → STORAGE option row |
| [React Router 8.3](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md) | **kept** (as the version half of the CVE row above) → RB-E-NAV option row 8.2.0 → 8.3.0, verified vs npm |
| [react-jsonschema-form 6.7](https://rjsf-team.github.io/react-jsonschema-form/) | skipped: minor-release, niche (schema-driven form generation is a different problem from RB-E-FORMS' validation/binding axis) |
| [react-intersection-observer 10.1](https://github.com/thebuilder/react-intersection-observer) · [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | skipped: minor-release / platform-API reference |
| [MDXEditor 4.1](https://github.com/mdx-editor/editor/releases/tag/v4.1.0) · [Demo](https://mdxeditor.dev/) | skipped: minor-release — RB-E-EDITORS owns rich-text editors and doesn't track point versions |
| [Jotai 3.0 Alpha](https://github.com/pmndrs/jotai/releases/tag/v3.0.0-alpha.0) | skipped: pre-ship (see twir-291 row) |

## Sponsors & chrome

| item | disposition |
|---|---|
| [Webflow Code Components](https://webflow.com/feature/code-components?amp%3Butm_medium=email&amp%3Butm_campaign=fy27-cooperpress-newslettter&amp%3Butm_content=react-status) · [JointJS](https://www.jointjs.com/ai-workflow-builders?amp%3Butm_medium=classified-ad) · [TimescaleDB](https://www.tigerdata.com/go/trial?amp%3Butm_medium=referral&amp%3Butm_campaign=react-status-newsletter) | sponsor (not evaluated) |
| [Cooperpress](https://cooperpress.com/) | off-scope (publisher link) |

## Advocate pass (hostile re-read of the skips)

Argued, held: **Shadscan** — genuinely adjacent to react-doctor in RB-E-DX and to the shadcn
rows in RB-E-COMPONENT-LIBS, but a brand-new commercial tool with a single mention is exactly
the kind of promotion MP-VETTED-OVER-PROMOTION exists to refuse. Reopen wired.
**Next.js memory leak** — flagged as the most consequential how-to skip, since "three unfixed
leaks" would be a real caveat on the entry's Next-default; held because the claim is about open
bugs rather than a version-scoped behaviour, which is feed territory. Reopen wired.
**react-native-nitro-sqlite** — Margelo's Nitro line keeps appearing across entries (Rive,
nitro-fetch, graph); one more storage mention flips it.
