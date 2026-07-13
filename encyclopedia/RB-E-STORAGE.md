---
id: RB-E-STORAGE
title: "About on-device storage & persistence"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-13
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-STORAGE
defer_to_skill: null
related: [RB-E-P2P, RB-E-SECURITY, RB-E-DATA]
sources:
  - "https://react-native-async-storage.github.io/3.1/migration-to-3/"
  - "https://github.com/mrousavy/react-native-mmkv/releases"
---

# About on-device storage & persistence

> **Diataxis: Explanation.** This page builds *understanding* of how to place data on the device —
> the reasoning behind the picks. It is not an API guide or a migration runbook. Local-first /
> P2P persistence (Hypercore, Autobase, Hyperbee) is owned by `RB-E-P2P`; secrets policy depth by
> `RB-E-SECURITY`; server-state caching by `RB-E-DATA`. Read this for the *why*.

## The one principle that organises everything: pick storage by data shape × secrecy

"Where do I store this?" is really **three different questions wearing one trenchcoat**: small
key-value (prefs, flags, last-seen timestamps), relational or large structured data (anything you
query), and secrets (tokens, credentials). Each has a different home because each optimizes a
different thing — read latency, queryability, and OS-level protection respectively. The classic
failure is letting one tool answer all three: AsyncStorage as prefs store, database, *and* token
vault. It's genuinely fine at the first job, wrong for the second, and the recommendation is
explicit about the third — **never** for secrets. Classify by shape and secrecy first; the tool
picks itself.

## The default, and why

> Small key-value → react-native-mmkv (fast, synchronous). Relational/large → op-sqlite or
> expo-sqlite. Secrets/tokens → Keychain / secure-store, never AsyncStorage.

Three shapes, three homes. **MMKV** wins small key-value because it's fast and *synchronous* — no
await ceremony for a boolean. **SQLite** wins structured data because "relational/large" is a
query problem, and op-sqlite attacks it with high-perf JSI. **Keychain/Keystore** wins secrets
because secrecy is an OS-protection problem, not a persistence problem — which is why the default
ends with "never AsyncStorage" for tokens. AsyncStorage isn't banished: for simple persisted
prefs with no perf concern, the when-clause says it's fine.

## The landscape, and when each piece earns its place

**@react-native-async-storage/async-storage** — simple async key-value. v3.x moved to
instance-based storage (`createAsyncStorage`) with `getMany`/`setMany`/`removeMany`, and requires
RN 0.76+; the v2 default export is kept for back-compat. Latest is 3.1.x. Earns its place for
simple persisted prefs when perf isn't a concern.

**react-native-mmkv (v4)** — fast synchronous key-value, the common AsyncStorage replacement.
v4 is a full Nitro Modules rewrite (Oct 2025) that *restored* Old-Architecture compatibility.
Latest is 4.3.x. Earns its place the moment you have frequent synchronous reads.

**op-sqlite / expo-sqlite** — relational SQLite for structured/queryable data; op-sqlite is the
high-perf JSI option (latest 17.x, 2026-06). The author's own deep-dive explains *why* it's fast
and memory-light: lazy HostObject conversion, `std::variant` over a custom struct, key-sharing
across result rows — with benchmarks.

**react-native-keychain / expo-secure-store** — secure storage for tokens and secrets, backed by
the platform Keychain/Keystore. Earns its place for every credential, unconditionally.

**The P2P/local-first log** — in a Hypercore/Autobase app, the primary persistence is the
Hypercore/Autobase/Hyperbee log itself, not KV or SQLite; KV like AsyncStorage is just for local
prefs there. That whole world is `RB-E-P2P`'s.

## Tradeoffs and failure modes to name out loud

- **Tokens in AsyncStorage.** The one "never" in the default. Secrets need Keychain/Keystore
  protection; a key-value store is the wrong trust boundary no matter how convenient.
- **AsyncStorage as a database.** Structured/queryable data belongs in SQLite. Key-value stores
  answer "get me X by key", not queries.
- **Misreading the AsyncStorage v3 requirements.** v3.x requires RN 0.76+ — but it is *not*
  New-Arch-only; that earlier claim was wrong (verified against the v3 migration docs). The v2
  default export is kept for back-compat, so the instance-based `createAsyncStorage` move is a
  migration, not a cliff.
- **Avoiding MMKV v4 over Old-Arch fears.** Backwards: the v4 Nitro rewrite is what *restored*
  Old-Arch compat.
- **Giving a local-first app a "main database".** In P2P apps the log is the source of truth;
  making SQLite/KV primary builds a second, divergent one. KV is for prefs only there.
- **Persisting like it's still request/response.** The TanStack DB reading marks the shift to
  sync-engine thinking — Collections, live queries via differential dataflow, optimistic
  transactional mutations — a different mental model from fetch-then-cache.

## How it interacts with the rest of the stack

- **P2P (`RB-E-P2P`).** The when-clause draws the line: local-first apps persist primarily in the
  Hypercore/Autobase/Hyperbee log; this entry's tools shrink to a prefs sidecar.
- **Security (`RB-E-SECURITY`).** The secrets row is where the two entries meet — Keychain/
  Keystore is an OS security boundary, and "never AsyncStorage" for tokens is as much a security
  rule as a storage one.
- **Data layer (`RB-E-DATA`).** On-device persistence is the other half of the data story:
  server-state caching lives there, and the TanStack DB reading contrasts local-first reactive
  persistence with request/response fetching — the boundary both entries share.

## In one paragraph

On-device storage is three problems, not one — classify by **data shape × secrecy** and each
picks its own home: small key-value goes to **react-native-mmkv** (fast, synchronous; v4 is a
Nitro rewrite that restored Old-Arch compat), relational/large data goes to **op-sqlite or
expo-sqlite** (op-sqlite for high-perf JSI), and secrets go to **Keychain / secure-store — never
AsyncStorage**. AsyncStorage itself remains fine for simple persisted prefs (v3.x is
instance-based and needs RN 0.76+, with the v2 export kept for back-compat), and in P2P
local-first apps the whole question shifts: the Hypercore/Autobase/Hyperbee log is the primary
persistence, and everything on this page is just the prefs drawer.

---

*See also: `RB-E-P2P` (the log as primary persistence in local-first apps), `RB-E-SECURITY`
(secrets belong to the OS boundary), `RB-E-DATA` (server-state caching; sync-engine thinking vs
request/response).*
