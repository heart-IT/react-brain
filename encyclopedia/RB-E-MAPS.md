---
id: RB-E-MAPS
title: "About maps & geolocation UI"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low
updated: 2026-07-16
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-MAPS
defer_to_skill: react-native-best-practices                  # marker/cluster render perf
related: [RB-E-COMPONENT-LIBS, RB-E-RN-VERSIONS, RB-E-NATIVE]
sources:
  - "https://docs.expo.dev/versions/latest/sdk/maps/"
  - "https://github.com/gmi-software/react-native-better-maps"
  - "https://github.com/visgl/react-google-maps"
---

# About maps & geolocation UI

> **Diataxis: Explanation.** This page builds *understanding* of the maps decision — why the
> durable axis is the tile/SDK provider, not the React wrapper. It is not a marker-API guide
> and not a setup tutorial. The candidate list and one-line tradeoffs live in the index entry
> `RB-E-MAPS`; marker/cluster render-performance depth is owned by the
> `react-native-best-practices` skill. The entry's own confidence is **low** — its
> recommendation is lightly vetted and ends with an instruction to prototype clustering +
> offline on-device before committing — so read this as a map of the territory, then run the
> prototype.

## The one commitment that organises everything: a tile economy, not a widget

A map view looks like a component, but you do not own it the way you own a button. Every
option in the entry is a React-shaped door into someone's **tile/SDK provider**, and the
entry's note states the axis outright: the durable selection axis is the provider, not the
wrapper — **wrappers are cheap to swap; the provider commitment (billing, offline rights,
style ecosystem) is not.** You are choosing which economy your map lives in:

- **Platform-native (Apple/Google)** — free-ish, but Google bills per load on Android
  (~$7/1k mobile map loads) and style customization is limited.
- **Mapbox** — powerful and commercial: custom vector/GL styles, offline region downloads, a
  navigation stack; usage pricing after the free tier.
- **MapLibre + open tiles** — free and self-hostable, Mapbox-compatible styles, works with
  any tile source; you source (or pay for) tiles yourself.

The entry's one reading is the decision table for exactly this split: per-load pricing math
(Google ~$7/1k mobile loads vs Mapbox $0.50/1k after the free tier vs MapLibre
free-but-BYO-tiles), which libraries actually expose offline region-download APIs
(Mapbox/MapLibre yes, react-native-maps no), GL style customization, API-key requirements,
and New-Architecture status. It is team-authored but sourced and measured — the entry's own
grading: use it for the decision table, not authority.

## The default, and why

> React Native → react-native-maps for platform-native basics (markers, regions); switch to
> MapLibre RN when you need custom vector styles or offline without per-load billing, or
> @rnmapbox/maps when you want Mapbox's full commercial stack. Web → react-map-gl on MapLibre
> GL JS (mapcn for ready-made shadcn-style components). Lightly vetted (confidence: low) —
> prototype clustering + offline on-device before committing.

Read the default as a provider ladder, not a library list. On React Native you *start* in
the platform-native economy — react-native-maps for markers and regions, the long-standing
default — and both named escalations change the economy, not the wrapper: MapLibre when the
trigger is custom vector styles or offline without per-load billing, Mapbox when you want
the turnkey commercial stack. On web the default already sits in the open economy:
react-map-gl on MapLibre GL JS, with mapcn when you want ready-made shadcn-patterned
components fast. The closing caveat is load-bearing: clustering and offline are exactly the
capabilities that differ by provider and by library maturity, which is why the entry says to
prototype them on-device before committing.

## The landscape, economy by economy

**Platform-native (Apple/Google).** **react-native-maps (1.29)** is the long-standing RN
default — Apple Maps on iOS / Google Maps on Android, simple markers and polylines — with
the provider's costs attached: limited style customization, **no programmatic
offline-region API**, and Google Maps billing on Android. **expo-maps** is Expo's modern,
SDK-versioned module in the same economy, and it is explicitly **ALPHA** — frequent breaking
changes, no Expo Go; the entry's wording is "watch, don't bet yet."
**react-native-better-maps (1.0)** is the new-arch lane: MapKit + Google Maps on Nitro
Modules, New-Arch-only (RN 0.78+), native marker clustering and POI taps — and one release
old, so prototype first. On web, the Google-committed lane is **@vis.gl/react-google-maps
(1.9)** — the vis.gl/OpenJS-governed React wrapper for the Google Maps JS API (components +
hooks, markers/drawing), the maintained pick when the product is committed to Google's
tiles/Places stack (per-load billing applies).

**Mapbox.** **@rnmapbox/maps (10.x)** is the Mapbox native SDK: custom vector/GL styles,
offline region downloads, and a navigation stack — the turnkey commercial stack (style
studio, navigation, support) when the pricing is acceptable.

**MapLibre + open tiles.** **@maplibre/maplibre-react-native (11.x)** is the open-source
Mapbox-SDK fork: Mapbox-compatible GL styles plus offline, any tile source, no token and no
per-load pricing — the cost moves to sourcing (or paying for) tiles yourself. On web,
**react-map-gl (8.x)** wraps MapLibre/Mapbox GL JS, and **mapcn** layers shadcn-patterned
map components on MapLibre + Tailwind in the copy-paste model. **react-leaflet** is the
classic raster Leaflet wrapper — listed in the entry's web row without a graded tradeoff, so
this page stakes no claim on it beyond its existence.

The entry itself is young: created 2026-07-06 when two independent signals in one week
(react-native-better-maps 1.0 and mapcn) exposed that maps — a common hard app need — had no
entry. Versions are verified against npm (react-native-maps 1.29, @rnmapbox/maps 10.3,
maplibre-react-native 11.3, react-map-gl 8.1, better-maps 1.0.0, @vis.gl/react-google-maps
1.9.0) and the expo-maps alpha status against the Expo docs.

## Tradeoffs and failure modes to name out loud

- **Choosing the widget, inheriting the landlord.** Comparing wrappers by API ergonomics
  while ignoring the provider underneath. Wrappers are cheap to swap; billing, offline
  rights, and the style ecosystem are not.
- **Discovering offline late.** react-native-maps has no programmatic offline-region API;
  per the entry's reading, only Mapbox and MapLibre expose offline region downloads. If
  offline is a requirement, the provider decision is already made — better to know that
  before the wrapper is load-bearing.
- **The free wrapper on metered tiles.** Every library here is free; the map may not be.
  Google ~$7/1k mobile loads, Mapbox $0.50/1k after the free tier, MapLibre free but
  bring-your-own tiles — per-load pricing belongs in the architecture review, not in the
  invoice surprise.
- **Shipping the alpha.** expo-maps is explicit alpha with frequent breaking changes and no
  Expo Go support. Track it; don't ship it.
- **Betting on one release.** react-native-better-maps is 1.0, one release old, and
  New-Arch-only (RN 0.78+) — simultaneously a maturity bet and an RN-version gate. The
  entry's when-clause says prototype first.
- **Trusting this page too much.** Confidence is low by the entry's own admission, and the
  pricing/capability table comes from a team-authored comparison the entry grades "decision
  table, not authority." Prototype clustering + offline on-device; re-verify pricing before
  committing.

## How it interacts with the rest of the stack

- **Render performance (`react-native-best-practices`).** The defer skill: marker and
  cluster render performance lives there. This page owns which provider and wrapper; that
  skill owns keeping large marker sets smooth.
- **Component libraries (`RB-E-COMPONENT-LIBS`).** mapcn brings the shadcn copy-paste
  distribution model to maps — the same ownership tradeoffs as any shadcn-patterned
  components.
- **RN versions (`RB-E-RN-VERSIONS`).** react-native-better-maps is New-Arch-only (RN
  0.78+): a maps pick can be gated by where the app sits in the upgrade lane.
- **Native modules (`RB-E-NATIVE`).** better-maps rides Nitro Modules — a UI-level pick that
  imports a native-module technology commitment.

## In one paragraph

A map view is rented, not owned: every React map library is a wrapper over a **tile/SDK
provider**, and the provider — not the wrapper — is the durable commitment, because billing,
offline rights, and the style ecosystem all live there. The three economies are
platform-native (Apple/Google: free-ish, Google bills ~$7/1k mobile loads on Android,
limited styling), Mapbox (custom GL styles, offline regions, navigation; commercial after
the free tier), and MapLibre + open tiles (free, self-hostable, any tile source; you bring
the tiles). The default starts platform-native (react-native-maps) and escalates by changing
economy — MapLibre for custom styles or offline without per-load billing, Mapbox for the
turnkey commercial stack — while web defaults to react-map-gl on MapLibre GL JS, with
@vis.gl/react-google-maps as the Google-committed lane. expo-maps is alpha (watch, don't
bet), better-maps is a one-release-old New-Arch bet, only Mapbox/MapLibre expose offline
region downloads, and the entry's standing order — confidence is low — is to prototype
clustering + offline on-device before committing.

---

*See also: `RB-E-COMPONENT-LIBS` (mapcn's shadcn copy-paste model), `RB-E-RN-VERSIONS`
(New-Arch-only picks gate on the upgrade lane), `RB-E-NATIVE` (Nitro Modules under
better-maps). Marker/cluster render performance: the `react-native-best-practices` skill.
Background reading: PkgPulse's react-native-maps vs Mapbox RN vs MapLibre RN comparison —
the entry's decision table for pricing, offline APIs, and New-Architecture status.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "Tile economy / the map view is rented / the commitment outlives your code" is the
     assigned organizing idea; the entry grounds the axis itself (provider over wrapper;
     "wrappers are cheap to swap, the provider commitment... is not") but the rental/economy
     metaphor and the "landlord" phrasing are editorial.
  2. react-leaflet — listed in the entry's web option row as "classic raster Leaflet" with no
     graded tradeoff and no when-clause; this doc stakes no recommendation on it.
  3. The related cross-references (RB-E-COMPONENT-LIBS, RB-E-RN-VERSIONS, RB-E-NATIVE) are
     inferred from grounded facts (shadcn copy-paste model, New-Arch-only RN 0.78+, Nitro
     Modules); the entry names no related entries.
  4. "The same ownership tradeoffs as any shadcn-patterned components" — inference from the
     entry's "copy-paste model" label; the entry does not discuss mapcn maintenance
     tradeoffs.
  5. Google pricing beyond the entry's two statements — ~$7/1k mobile map loads on Android
     (react-native-maps row) and "per-load billing applies" for the web Google lane — no
     unified or iOS/web Google price is claimed here.
  6. Whether react-map-gl needs a token when pointed at Mapbox GL JS rather than MapLibre —
     not stated in the entry; not claimed.
-->
