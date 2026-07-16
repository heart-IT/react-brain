---
id: RB-E-P2P
title: "About the peer-to-peer / local-first backend (Holepunch · Pear)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-16
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-P2P
defer_to_skill: holepunch-p2p-systems                         # ALL depth: replication, identity, schema, sessions, blind-pairing, Pear/Bare workflow
related: [RB-E-DATA, RB-E-NETWORKING]
sources:
  - "https://docs.pears.com/"   # the entry declares no sources list; this is its canonical reading URL
---

# About the peer-to-peer / local-first backend (Holepunch · Pear)

> **Diataxis: Explanation.** This page builds *understanding* of the P2P decision — why
> choosing Holepunch is an architecture decision rather than a library pick, and where its
> boundary with conventional client-server sits. It explains the **selection shape only**:
> ALL depth — replication, identity, schema, sessions, blind-pairing, the Pear/Bare
> workflow — is owned by the `holepunch-p2p-systems` skill, and nothing on this page
> substitutes for it. The candidate list and one-line tradeoffs live in the index entry
> `RB-E-P2P`. Read this for the *why*.

## The one idea that organises everything: no server inverts everything

Holepunch is, in the entry's own words, "a SERVERLESS, local-first alternative to the
client-server + REST/GraphQL model." Remove the server and the familiar roles are not
deleted — they are reassigned: **the keypair is the account, the append-only log is the
database, the swarm is the endpoint.** Data lives in a local signed append-only log
(Hypercore), is merged across writers by Autobase, indexed for querying by Hyperbee, and
synced peer-to-peer over Hyperswarm — encrypted connections discovered over a DHT, no
servers — with the app itself shipped by Pear's content-addressed distribution.

Two consequences follow for *selection*, which is all this page does. First, the decision
is binary and architectural — Holepunch **or** conventional client-server — not a slot in
an otherwise-fixed stack. Second, once taken, the choice propagates: for a Pear app, a
conventional data-cache (TanStack Query), hosted DB, REST API, and central server are
"N/A by design"; the data layer is the Hypercore/Autobase/Hyperbee stack queried locally
via hrpc, and even testing (brittle) and build (esbuild/bare-pack) follow the Holepunch
ecosystem rather than the mainstream-React defaults. The entry exists precisely so the
encyclopedia stops treating that stack as a deviation — it is the backbone of the heartit
ecosystem: ledgerhr (Pear desktop), ourpot and bitbarter (Pear mobile via bare-kit).

## The default, and why

> Holepunch is a SERVERLESS, local-first alternative to the client-server + REST/GraphQL
> model: data is a local append-only log (Hypercore), merged across writers with Autobase,
> indexed in Hyperbee, synced peer-to-peer over Hyperswarm, and shipped by Pear. Choose it
> when serverless / offline-first / private / censorship-resistant matters; choose
> conventional client-server (RB-E-DATA + a hosted DB) when you want central control, SQL,
> and a familiar ops story.

The default is an axis, not a winner. Neither side is the fallback: each is named with its
own virtues. Holepunch earns the pick when the requirements are serverless, offline-first
/ local-first, no-backend-ops, private, or censorship-resistant — and within it, one
structural sub-decision is called out: multi-writer shared or collaborative state means
Autobase over per-writer Hypercores. Conventional client-server earns the pick when you
want central control, SQL, and a familiar ops story — conventional CRUD with a central
server and team routes to REST/GraphQL plus TanStack Query (RB-E-DATA), "not this." And
the entry's final when-clause is the scope fence this page inherits: **any** Holepunch
depth — replication, identity, schema, sessions, blind-pairing, Pear/Bare workflow — goes
to the `holepunch-p2p-systems` skill.

## The landscape: a parts list, not a protocol guide

The entry's options are the roles in one architecture, not competing candidates. They are
listed here so the shape is recognizable — how any of them works is the skill's territory.

- **Hypercore** — the signed append-only log; the primitive everything builds on.
- **Autobase** — multiwriter: linearizes many writers' Hypercores into one shared view
  (collaboration).
- **Hyperbee** — ordered key-value / B-tree over a Hypercore; the queryable index/view
  layer.
- **Corestore** — manages many Hypercores (naming, lifecycle).
- **Hyperswarm / HyperDHT** — peer discovery plus encrypted connections over a DHT — no
  servers.
- **Hyperdrive / Hyperblobs** — the P2P filesystem / blob store.
- **hrpc + Hyperschema** — typed RPC and binary schema between the app (UI thread) and a
  local Bare worker.
- **Pear / Bare** — Pear is the P2P runtime plus content-addressed distribution (desktop
  and mobile); Bare is the lightweight JS runtime for mobile workers (bare-kit).

The canonical reference for these building blocks is the Pear documentation
(docs.pears.com) — the "why" behind P2P/local-first — paired, for anything deeper than
recognition, with the `holepunch-p2p-systems` skill.

## Tradeoffs and failure modes to name out loud

- **Grafting client-server expectations onto a Pear app.** Reaching for TanStack Query, a
  hosted DB, or a REST API in a Holepunch codebase misreads the architecture — those
  layers are N/A by design; the data layer is Hypercore/Autobase/Hyperbee queried locally
  via hrpc.
- **Auditing the ecosystem as a deviation.** brittle (testing) and esbuild/bare-pack
  (build) follow the Holepunch ecosystem, not the mainstream-React defaults — flagging
  them as nonstandard is exactly the misread this entry was added to prevent.
- **Choosing Holepunch against its own axis.** An app that wants central control, SQL, and
  a familiar ops story is the recommendation's named case for conventional client-server
  (RB-E-DATA + a hosted DB) — the serverless virtues don't transfer to it.
- **Collaboration without Autobase.** Multi-writer shared state is a named sub-decision:
  Autobase over per-writer Hypercores. Shared state across writers without that layer has
  no merge story in the entry's model.
- **Doing depth at this altitude.** Replication, identity, schema, sessions,
  blind-pairing, Pear/Bare workflow — any of it decided from an index entry or this page
  is out of scope by construction. The `holepunch-p2p-systems` skill owns all of it.

## How it interacts with the rest of the stack

- **Server state (`RB-E-DATA`).** The counterpart, not a layer above: the two entries are
  the two sides of one architectural fork. Conventional CRUD with a central server/team →
  REST/GraphQL + TanStack Query; serverless/local-first → this stack, where that cache is
  N/A by design.
- **Networking (`RB-E-NETWORKING`).** The sibling doc names this entry as its no-HTTP
  lane, and this side agrees: in a Pear app a REST API is N/A by design — transport is
  the swarm, not an HTTP client.
- **Testing and build (`RB-E-TESTING`, `RB-E-BUILD`).** The choice propagates sideways:
  brittle for testing and esbuild/bare-pack for build follow the Holepunch ecosystem, not
  the mainstream defaults those entries otherwise assume.
- **Depth (`holepunch-p2p-systems`).** Unlike entries that defer a bounded depth audit,
  this entry defers ALL depth — correctness, replication, identity, sessions, Pear/Bare
  workflow. The index owns the fork; the skill owns everything past it.

## In one paragraph

Holepunch is a **serverless, local-first alternative to client-server + REST/GraphQL**,
and removing the server reassigns every familiar role: the keypair is the account, the
append-only log is the database, the swarm is the endpoint. Data is a local signed
append-only log (Hypercore), merged across writers by Autobase, indexed by Hyperbee,
synced over Hyperswarm's DHT-discovered encrypted connections, queried from the UI thread
via hrpc to a local Bare worker, and shipped by Pear. Choose it when serverless /
offline-first / private / censorship-resistant matters; choose conventional client-server
(RB-E-DATA + a hosted DB) for central control, SQL, and a familiar ops story. The choice
propagates — in a Pear app, TanStack Query, hosted DBs, and REST APIs are N/A by design,
and testing (brittle) and build (esbuild/bare-pack) follow the ecosystem — which is why
the heartit backbone (ledgerhr, ourpot, bitbarter) reads the way it does. This page is
selection shape only: ALL depth belongs to the `holepunch-p2p-systems` skill.

---

*See also: `RB-E-DATA` (the conventional side of the fork — REST/GraphQL + TanStack Query
+ a hosted DB), `RB-E-NETWORKING` (the HTTP layer this architecture does without),
`RB-E-TESTING` / `RB-E-BUILD` (where brittle and esbuild/bare-pack diverge from mainstream
defaults). ALL depth — replication, identity, schema, sessions, blind-pairing, Pear/Bare
workflow: the `holepunch-p2p-systems` skill. Background reading: the Pear docs
(docs.pears.com) — the canonical reference for the building blocks.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "the keypair is the account" — part of the assigned organizing idea; the entry's
     nearest grounding is "signed append-only log" (Hypercore) plus "identity" appearing
     only in the list of topics deferred to the skill. The account metaphor is not entry
     text, and no identity mechanics are claimed here.
  2. "the swarm is the endpoint" — the sync-over-Hyperswarm and "no servers" facts are
     entry text; the endpoint metaphor is editorial.
  3. The entry has no sources: field — the frontmatter sources list carries its reading
     URL (docs.pears.com) instead.
  4. The RB-E-NETWORKING relation ("no-HTTP lane") is grounded in the sibling doc
     RB-E-NETWORKING.md, not in this entry's text; this entry grounds only "REST API ...
     N/A by design."
  5. RB-E-TESTING / RB-E-BUILD ids — the note says "brittle (testing) + esbuild/bare-pack
     (build)" without naming entry ids; the mapping to those ids is inferred from the
     category names.
  6. "Shared state across writers without Autobase has no merge story" — inversion of the
     when-clause "multi-writer shared/collaborative state → Autobase over per-writer
     Hypercores"; the entry states the positive route only.
-->
