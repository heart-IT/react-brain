---
id: RB-E-DATA
title: "About data fetching & server state in React & React Native"
diataxis: explanation
status: reviewed
confidence: high
updated: 2026-06-17
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-DATA
defer_to_skill: null
related: [RB-E-STATE, RB-E-META-FRAMEWORKS, RB-E-REACT-CORE, RB-E-CROSSPLATFORM]
sources:
  - "https://2025.stateofreact.com/en-US/libraries/"
  - "https://2025.stateofreact.com/en-US/libraries/state-management/"
---

# About data fetching & server state in React & React Native

> **Diataxis: Explanation.** This page explains *how to think about* the data layer and
> *why* the default is what it is. The candidate list with one-line tradeoffs lives in the
> index entry `RB-E-DATA`; this is its companion. It is not step-by-step how-to.

## Server state is the actual problem

A `fetch()` is easy. What is *hard* is everything around it: the response can go **stale**,
two components asking for the same thing should **dedupe**, a failure should **retry**, a
mutation elsewhere should **invalidate** the cached copy, and the screen should show
**loading / error / empty** states without you hand-wiring a boolean soup. That cluster of
problems is **server-state management**, and it is the reason a dedicated library exists at
all. (The companion distinction — server state vs *client* state — is the spine of
`RB-E-STATE`; read that first if it isn't second nature.)

The recurring anti-pattern is solving server-state problems inside a *client* store
(Zustand/Redux): you end up re-implementing caching, `isLoading` flags, and refetch
effects by hand. The moment you see that code, the state wanted a server-state tool.

## The default, and why

> **TanStack Query for REST / server-state caching.** It is the default for client-side
> data fetching, and a healthy app pairs it with a client-state lib (it does not replace
> one).

This is the consensus pick, not a hunch: TanStack Query is the **single most-used library
in the React ecosystem** in State of React 2025. It earns that by doing the hard cluster
above generically — cache, dedupe, background refetch, retry, invalidation — while staying
**transport- and framework-agnostic** (REST, GraphQL, RPC; web and React Native alike).
That last property matters for `react-brain`'s thesis: your data layer is mostly the same
code on web and native, so it belongs in a shared package (`RB-E-CROSSPLATFORM`).

## The landscape, and when each one wins

Treat these as reasons to deviate, keyed to *what your backend is* and *how your client
talks to it*.

**SWR** — the lighter, hook-first cousin. Same stale-while-revalidate model, smaller
surface. A reasonable choice when your needs are modest and you value minimalism over
TanStack Query's breadth of features. The two are more alike than different; pick by
ergonomic taste, not capability anxiety.

**RTK Query** — server-state caching that ships *inside* Redux Toolkit. The deciding
factor is sociological, not technical: choose it when you are **already on RTK** and want
one mental model and one devtools surface. Do **not** adopt Redux *in order to* use RTK
Query — that's the tail wagging the dog; use TanStack Query standalone instead.

**GraphQL clients — Apollo Client / urql / Relay** — these win only when your backend is
**actually a GraphQL graph**. Apollo is batteries-included with a normalized cache; urql is
lighter and more composable; **Relay** is compiler-driven and the most opinionated — it now
ships first-party TypeScript and experimental RSC support, and pays off at scale and with
Meta-style data-masking discipline, at the cost of a steeper model. Reaching for a GraphQL
client over a REST endpoint is choosing a query language, not just a cache.

**tRPC** — end-to-end **type-safe RPC with no schema and no codegen**, when **client and
server are both TypeScript** and the API is **private to your app**. Its superpower is that
your server's types *are* your client's types — change a procedure, the call site fails to
compile. Its boundary is the flip side: it deliberately **couples client and server**, so
it is the wrong choice for a public API or a polyglot/mobile-shared backend consumed by
non-TS clients.

**Local-first / sync engines — TanStack DB, Zero, TinyBase** — a different paradigm: the
client holds a queryable local store that **syncs** with the server, so reads are instant
and the app works offline and collaboratively. This is powerful for the right product
(Linear-style apps), but it is an **architecture commitment, not a drop-in cache** — adopt
it because offline/realtime is a core requirement, not to avoid a loading spinner.

**RSC (web only)** — when components render on the server, the server can fetch directly
and you may not need a client-side cache for read paths at all. This shifts the question
from "which client cache?" to "what runs where?" (see `RB-E-META-FRAMEWORKS`). The catch
lives on the *mutation* path — Server Functions have a real DoS-CVE history (`RB-E-SECURITY`)
— and RSC is a **web concern; it does not apply to React Native.**

## Tradeoffs and failure modes to name out loud

- **Hand-rolled caching in a client store** — the cardinal error (see above). Move it to a
  server-state tool; this usually *deletes* code.
- **GraphQL without a graph** — adopting Apollo/Relay against plain REST endpoints buys
  query-language overhead with little of the benefit. Use it when the graph is real.
- **tRPC across a trust/language boundary** — great inside one TS codebase; wrong for public
  or polyglot APIs precisely because of the coupling that makes it nice internally.
- **Request waterfalls** — fetching sequentially down the tree (each child awaiting its
  parent) is a latency tax; prefetch on intent (route loaders, hover) and parallelize.
- **Local-first as a quick win** — it is a paradigm, not a patch; the migration cost is real.

## How it interacts with the rest of the stack

- **Client state (`RB-E-STATE`)** — the two are complementary halves. Server state →
  TanStack Query; client/UI state → Zustand/Jotai. Don't merge them.
- **Meta-frameworks (`RB-E-META-FRAMEWORKS`)** — RSC and framework loaders (Next.js,
  TanStack Start, React Router) are *also* data-fetching surfaces; on the web your data
  strategy and your framework choice are entangled.
- **React core (`RB-E-REACT-CORE`)** — `use()` + Suspense let you read async resources at
  render time, which dovetails with how modern data libraries expose data.
- **Cross-platform (`RB-E-CROSSPLATFORM`)** — because TanStack Query is platform-agnostic,
  your fetching/caching logic is shared code; put it in the common package, not per-platform.

## Migrating (the short version)

The migration that pays off is **pulling server state out of a client store into TanStack
Query** — it typically removes more code than it adds (the hand-rolled cache, loading
flags, and refetch effects all disappear). Migrations *between* server-state libraries
(SWR ↔ TanStack Query) rarely justify themselves without a concrete missing feature.
Step-by-step mechanics are a how-to concern; the principle is "consolidate server state
into one cache, by responsibility."

## In one paragraph

The data layer's hard problem is **server state** — staleness, dedupe, retry,
invalidation — so use a tool built for it: default to **TanStack Query** (the most-used
React library), pair it with a client-state lib, and keep server state *out* of that
store. Deviate for a reason: **RTK Query** if already on Redux, a **GraphQL client** if you
truly have a graph, **tRPC** for a private all-TypeScript API, **local-first** engines when
offline/realtime is core, and **RSC** when the server can fetch for you (web only).

---

*See also: `RB-E-STATE` (client vs server state), `RB-E-META-FRAMEWORKS` (RSC / loaders),
`RB-E-REACT-CORE` (`use()` + Suspense), `RB-E-CROSSPLATFORM` (sharing the data layer).*
