---
id: RB-E-NETWORKING
title: "About networking & the HTTP client layer"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-16
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-NETWORKING
defer_to_skill: null                                          # entry declares no depth-audit skill
related: [RB-E-DATA, RB-E-AI-UI, RB-E-P2P]
sources:
  - "https://github.com/margelo/react-native-nitro-fetch"
  - "https://expo.dev/changelog/sdk-56"
  - "https://registry.npmjs.org/axios/latest"
---

# About networking & the HTTP client layer

> **Diataxis: Explanation.** This page builds *understanding* of the networking decision —
> why the HTTP client itself is the least consequential of three layers, and where the real
> decisions sit. It is not a fetch API guide and not a migration recipe. The candidate list
> and one-line tradeoffs live in the index entry `RB-E-NETWORKING`; the entry declares no
> defer skill, but the decision it keeps pointing at — server-state caching — is owned by
> `RB-E-DATA`. Read this for the *why*.

## The one move that organises everything: look above and below the client, not at it

The entry's note lays out three layers in one sentence. RN's built-in fetch is **a JS
polyfill over native networking**; expo/fetch **standardizes** that same API (WinterTC +
streaming); nitro-fetch **swaps the engine** (Cronet/URLSession, HTTP/3) behind the same
API. So the stack reads:

- **Above the client: the cache.** The recommendation's own words: "the bigger win in most
  apps is the CACHE layer above it (TanStack Query, RB-E-DATA), not the client."
  Server-state caching, retries, invalidation — TanStack Query territory *regardless of
  client*.
- **The client itself: a fetch-shaped commodity.** Every serious option converges on the
  same API surface; the entry's judgment is that client choice is "low-stakes compared to
  cache design."
- **Below the client: the engine.** What actually moves the bytes — Cronet on Android,
  URLSession on iOS, HTTP/3+QUIC, Brotli, disk cache. This is the only layer where swapping
  buys measurable speed, and the entry gates that swap on measurement.

The decision, then, is rarely "which client." It is whether the cache layer above exists,
and whether a measured hot path justifies touching the engine below.

## The default, and why

> Use fetch — on Expo SDK 56+ you are already on expo/fetch globally. The bigger win in most
> apps is the CACHE layer above it (TanStack Query, RB-E-DATA), not the client. Reach for
> react-native-nitro-fetch only when the network layer is a MEASURED hot path (cold-start
> requests, media, HTTP/3 backends) or you need prefetch/worklet parsing.

The default is to do nothing. fetch is already the default on both platforms — RN's WHATWG
polyfill over native networking, the browser's native fetch on web — and it is fine for most
apps. On Expo SDK 56+ the middle layer has even been upgraded for you: expo/fetch is
WinterTC-compliant with streaming and installed as the *global* fetch, no import needed —
the modern managed default, verified against the SDK 56 changelog.

The two escalations are asymmetric. Downward is gated: reach for nitro-fetch only when the
network layer is a **measured** hot path (cold-start requests, media, HTTP/3 backends) or
you need prefetch/worklet parsing. Upward is not gated at all: caching, retries, and
invalidation belong to TanStack Query whatever client you keep.

## The landscape, layer by layer

**fetch (built-in)** — the default on both platforms: RN's WHATWG polyfill over native
networking, the browser's native fetch on web. Fine for most apps.

**expo/fetch** — WinterTC-compliant fetch with streaming, installed as the global fetch
since Expo SDK 56 (no import needed). The modern managed default; if you are on SDK 56+ you
are already using it.

**react-native-nitro-fetch (Margelo)** — the engine swap: drop-in native fetch on Cronet
(Android) / URLSession (iOS), bringing HTTP/1-2-3+QUIC, Brotli, disk cache,
prefetch-before-navigation, and worklet parsing off the JS thread. v1.5, ~900 stars, RN
0.75+. The entry carries two performance numbers — "measured ~1.3x vs built-in" on the
option row, "~23% on their harness" in the note — and grades both the same way: vendor-run;
measure your own hot path. Its README doubles as the layer's best explainer — what actually
backs fetch on each platform, what HTTP/3+QUIC/Brotli/disk-cache buy, the benchmark
methodology — and the entry says to read it even if you keep built-in fetch.

**axios** — the ubiquitous promise client: interceptors, defaults, wide team familiarity;
it runs over XHR in RN. The entry's verdict is symmetric and calm: no reason to churn *off*
it, little reason to start *on* it for new work.

**ky / ofetch** — small fetch wrappers (retries, hooks, typed convenience), web-leaning; ky
2.x, ofetch (unjs). Listed without a when-clause — this page stakes nothing further on them.

## Tradeoffs and failure modes to name out loud

- **Optimizing the commodity.** Swapping HTTP clients while no cache layer exists above
  them. Client choice is low-stakes compared to cache design — the churn buys ergonomics at
  best while the actual win (caching, retries, invalidation) sits unclaimed in RB-E-DATA.
- **Unmeasured engine swaps.** nitro-fetch is drop-in, which makes adoption cheap — but the
  recommendation gates it on a *measured* hot path, and the entry flags the benchmarks as
  vendor-run. Cheap to adopt is not the same as necessary.
- **Churning axios in either direction.** Migrating a team off axios buys little — the
  interceptor ergonomics are real. Starting new work on it also buys little. Both moves are
  motion without progress.
- **Rebuilding the cache inside the client.** Hand-rolled retry/cache/invalidation logic in
  interceptors is TanStack Query territory implemented worse, regardless of which client
  hosts it.
- **Raw XMLHttpRequest.** The entry's source-level smell: raw XHR bypasses the fetch layer's
  streaming/abort semantics. Prefer fetch or the app's chosen client.
- **Streaming through the wrong client.** AI/chat tokens (SSE-style) need a streaming-capable
  client: expo/fetch or nitro-fetch (streaming + TextDecoder).
- **Assuming HTTP exists at all.** In a P2P/Holepunch app there may be no HTTP layer —
  transport is Hyperswarm streams (RB-E-P2P).

## How it interacts with the rest of the stack

- **Server state (`RB-E-DATA`).** The layer above, and the entry's repeated pointer: the
  bigger win is the cache — TanStack Query for caching, retries, invalidation, regardless of
  client.
- **AI interfaces (`RB-E-AI-UI`).** The streaming lane: token-by-token responses route to
  expo/fetch or nitro-fetch, per the entry's when-clause.
- **P2P (`RB-E-P2P`).** The no-HTTP lane: Holepunch transport is Hyperswarm streams; this
  entire layer may be absent.
- **No defer skill.** The entry declares none — the depth it defers is decisional (to
  RB-E-DATA), not a specialist audit.

## In one paragraph

The HTTP client is a commodity: every serious option is fetch-shaped, and the real decisions
sit **above** it (the cache) and **below** it (the engine). Use fetch — on Expo SDK 56+ you
are already on expo/fetch globally, WinterTC-compliant with streaming — and spend the
attention on TanStack Query (RB-E-DATA), because caching, retries, and invalidation are
where most apps win, regardless of client. The engine swap, react-native-nitro-fetch
(Cronet/URLSession: HTTP/3+QUIC, Brotli, disk cache, prefetch, worklet parsing), is drop-in
but gated on a *measured* hot path — its numbers (~1.3x / ~23%) are vendor-run. axios earns
a symmetric verdict: no reason to churn off it, little reason to start on it. Streaming
(AI/chat tokens) routes to expo/fetch or nitro-fetch; raw XHR is a smell that bypasses
streaming/abort semantics; and in a P2P app the whole layer may not exist — transport is
Hyperswarm streams.

---

*See also: `RB-E-DATA` (the cache layer above — TanStack Query for caching, retries,
invalidation), `RB-E-AI-UI` (streaming token responses), `RB-E-P2P` (Hyperswarm streams —
the no-HTTP lane). Background reading: the react-native-nitro-fetch README — the layer's
best explainer of what backs fetch on each platform, worth reading even if you keep built-in
fetch.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "The HTTP client is a commodity" and the above/below sandwich framing are the assigned
     organizing idea; the entry grounds the ingredients ("low-stakes compared to cache
     design", "the bigger win is the CACHE layer above it", the polyfill→standardize→engine
     axis) but the "commodity" label and the three-layer diagram wording are editorial
     arrangement.
  2. The two nitro-fetch numbers (~1.3x on the option row, ~23% on the vendor harness) are
     both in the entry and are not reconciled there; this doc reports both as given, both
     flagged vendor-run.
  3. ky / ofetch — one-line tradeoff only, no when-clause in the entry; no recommendation is
     made here.
  4. axios-over-XHR is scoped to RN exactly as the entry states it; no claim about axios's
     web transport is made.
  5. Whether expo/fetch is usable outside Expo (bare RN, web) — not stated in the entry; not
     claimed.
  6. Why starting new work on axios buys little — the entry gives the verdict without a
     stated mechanism; this doc repeats the verdict and the "motion without progress" gloss
     is editorial.
-->
