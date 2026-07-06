---
id: RB-E-META-FRAMEWORKS
title: "About meta-frameworks (full-stack React)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-06-25
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-META-FRAMEWORKS
defer_to_skill: engineering-principles                        # boundaries / dependency direction
related: [RB-E-NAV, RB-E-REACT-CORE, RB-E-DATA, RB-E-CROSSPLATFORM, RB-E-SECURITY]
sources:
  - "https://tanstack.com/blog/who-owns-the-tree"
  - "https://frontendmasters.com/blog/react-server-components-in-tanstack/"
---

# About meta-frameworks (full-stack React)

> **Diataxis: Explanation.** This page builds *understanding* of the meta-framework choice.
> It is not a tutorial: the candidate list and one-line tradeoffs live in the index entry
> `RB-E-META-FRAMEWORKS`; client-side routing is `RB-E-NAV`; the RSC primitive itself is
> `RB-E-REACT-CORE`; Server-Function security is `RB-E-SECURITY`. Read this for the *why*.

## What a meta-framework actually is (and isn't)

A router decides *which screen*. A meta-framework decides *where your React runs*: it owns
**SSR/RSC, data fetching, the server boundary, and the build**. That's the category. So the
question is never "Next or not" in the abstract — it's **"how much server do I actually
need, and where am I hosting it?"** Those two axes — *amount of server* (static site → SPA →
SSR → full RSC) and *hosting target* (Vercel / Cloudflare / self-host / none) — sort the
whole field.

## The mental model: who owns the component tree?

The clarifying lens for 2026 is **RSC-as-protocol, not RSC-as-architecture.** React Server
Components are a *serialization format* (the Flight protocol) for streaming a component tree;
they do not dictate *who owns* that tree. Two camps fall out:

- **Server-owned (Next.js App Router).** The tree starts on the server; client components
  are the islands. Opinionated, integrated, batteries-included — Server Actions are the
  mutation path.
- **Client/router-owned (TanStack Start).** The app is router-first and isomorphic; RSC is
  available as a *protocol* you opt into, SSR and Server Functions are explicit, and it
  deliberately **omits Server Actions** (a deliberate security posture — see `RB-E-SECURITY`).

Neither is "more correct." Server-first minimises client JS and is great when the server is
always there; router-first keeps the client app primary and the server optional. Knowing
*which ownership model you want* predicts which framework will feel natural.

## The default, and why

> **Web:** Next.js is the safe default; choose **TanStack Start** when you want a
> less-opinionated, Vite-native RSC stack. **React Native / universal:** Expo Router.

Next.js is the default for the boring-but-correct reason: it is the most-used, most-hired-for,
most-documented full-stack React framework, and its App Router + RSC + Server Actions cover
the common product app. **TanStack Start** is the considered alternative — Vite-native,
router-first, RSC-as-protocol — for teams who feel Next's opinions as friction and want to
own more of the stack. For **React Native / universal**, Expo Router is the meta-framework;
the web frameworks here don't apply to native.

## The landscape, and when each one wins

**Next.js** — the incumbent. Wins on ecosystem, hiring, hosting (first-class on Vercel,
adapters elsewhere), and the most complete RSC + Server Actions story. Cost: opinions, and a
steady security-patch cadence around the server surface.

**TanStack Start** — Vite-based, type-safe-router-first, RSC and Server Functions as explicit
APIs, Server Actions deliberately omitted. Wins when you want a less-opinionated, Vite-native
stack and tight control of the client/server seam.

**React Router 7 (framework mode) / Remix** — Remix merged into React Router 7; full-stack
loaders/actions for teams already living in React Router. (Remix 3 is a separate
JSX-component pivot, distinct from this lineage.)

**Expo Router** — the RN/universal meta-framework: file-based routing, SDK-56-era decoupling
from React Navigation, web SSR still maturing. The way a React Native app becomes "full-stack
+ web" from one tree.

**Astro / Waku / RedwoodSDK** — pick by *hosting + how much RSC*: Astro for content/marketing
(ship the least JS, islands only); Waku for minimal RSC with no lock-in; RedwoodSDK for a
Cloudflare-first Vite+RSC stack.

**Vinext** — a Vite-based Next.js rebuild; AI-generated and early, with flagged security
issues and thin real test coverage. **Not a production bet yet** — interesting as a signal,
not a choice.

## Tradeoffs and failure modes to name out loud

- **Buying more server than you need.** A marketing site rendered through a full RSC
  framework is over-built; Astro (or a static export) ships a fraction of the JS. Start from
  "how much server," not "which framework everyone uses."
- **Server Functions are an API boundary in disguise.** Compiler-generated function IDs and
  the dissolved network seam are real attack surface and a real version-skew hazard across
  rolling deploys; treat them with API discipline (`RB-E-SECURITY`).
- **Conflating routing with the framework.** `RB-E-NAV` is a *subset* of what these own; if
  all you need is client routing, you may not need a meta-framework at all.
- **Lock-in by hosting assumption.** Some stacks assume a specific host (Vercel, Cloudflare);
  fine if you're there, a migration cost if you're not. Make it a conscious axis.

## How it interacts with the rest of the stack

- **Routing (`RB-E-NAV`).** Meta-frameworks subsume routing and add the server; the standalone
  routers in `RB-E-NAV` are for when you *don't* want that.
- **React core (`RB-E-REACT-CORE`).** RSC, Server Functions, and `use()` are React primitives;
  this entry is about the frameworks that productise them.
- **Data (`RB-E-DATA`).** With a server framework you often fetch in RSC and skip a client
  cache; without one, TanStack Query owns server-state. The framework choice shifts where the
  data layer lives.
- **Cross-platform (`RB-E-CROSSPLATFORM`).** Expo Router (+ Solito) is how routing and some
  data-loading get shared web↔native.
- **Security (`RB-E-SECURITY`).** The RSC/Server-Function server surface is where the
  framework-specific CVEs live; patch cadence is part of the choice.

## In one paragraph

A meta-framework is "where your React runs on a server," so choose by **how much server you
need** and **where you host**, using the *who-owns-the-tree* lens: **Next.js** (server-owned,
opinionated, the safe default) vs **TanStack Start** (router-first, RSC-as-protocol, Vite-
native, Server-Actions-free). Drop to **Astro** for content, **Expo Router** for RN/universal,
and treat **Vinext** as not-yet-production. Don't buy more server than the app needs, and
remember Server Functions are an API boundary with real security and deploy-skew implications.

---

*See also: `RB-E-NAV` (client routing), `RB-E-REACT-CORE` (RSC/Server Functions/`use()`),
`RB-E-DATA` (where the data layer lives), `RB-E-CROSSPLATFORM` (Expo Router), `RB-E-SECURITY`
(Server-Function surface). Architecture depth: the `engineering-principles` skill.*
