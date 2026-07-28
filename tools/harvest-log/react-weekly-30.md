# Harvest manifest — React Weekly #30 (2026-07-26)
issue: https://react-weekly.dev/newsletter/30

Processed 2026-07-28. Same access note as #29: the issue page is a JS shell (`harvest inventory`
returns 0 links), so the list came from `rss.xml` `content:encoded` with every
`api.react-weekly.dev/track/click/<id>` redirect resolved via `curl -L` and recorded by its
canonical destination. 9 links. Reminder from harvest-state: the RSS window is the latest 20
issues — a backlog beyond that is permanently lost.

| item | disposition |
|---|---|
| [React - Denial of Service in Server Functions](https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g) | **kept** → RB-E-SECURITY (3rd source this week, with TWiR #291 and React Status #484) |
| [Next.js July 2026 Security Release](https://nextjs.org/blog/july-2026-security-release) | **kept** → RB-E-META-FRAMEWORKS (patched versions 16.2.11 / 15.5.21) |
| [What Does a Server-State Client Cost You Per Request?](https://andrei-calazans.com/posts/2026-07-18-cost-of-graphql-client-server-state/) | **kept** → RB-E-DATA reading + claim |
| [React Hook Form Avoids State. TanStack Form Scopes It.](https://www.adarsha.dev/blog/react-hook-form-and-tanstack-form-state-models) | **kept** → RB-E-FORMS reading + claim |
| [How Worklets Bundle Mode accidentally fixed Hermes V1 memory regression](https://swmansion.com/blog/how-worklets-bundle-mode-accidentally-fixed-Hermes-v1-memory-regression/) | **kept** → RB-E-ANIMATION note + option row + source + tripwire |
| [shadcn/ui July 2026 - React Aria](https://ui.shadcn.com/docs/changelog/2026-07-react-aria) | already-held: RB-E-COMPONENT-LIBS |
| [Inside TanStack Table v9's New Reactivity Model](https://tanstack.com/blog/tanstack-table-v9-reactivity) | skipped: pre-ship (v9 at 9.0.0-beta.58, re-verified vs npm 2026-07-28). Reopen: v9 stable |
| [A Step-By-Step Guide to Super App Development With Re.Pack 5](https://www.callstack.com/blog/step-by-step-guide-to-super-app-development) | skipped: how-to — RB-E-BUILD already holds Re.Pack's super-app position plus the Teamworks production case study |
| [How I Added NFC Habit Verification to a React Native App](https://codewithbeto.dev/blog/nfc-habit-verification-react-native) | skipped: how-to (single-feature build log) |

## Advocate pass

Nothing flipped; every keep here was already independently adjudicated from a primary source
this pass, and the two how-to skips duplicate the twir-291 reasoning verbatim.

Corroboration value: this issue confirmed the week's two security facts and both Calazans
measurement pieces from a fourth independent editor — which is what raised confidence enough to
spend reading slots on already-full lists (RB-E-DATA, RB-E-ANIMATION).
