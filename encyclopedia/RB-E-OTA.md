---
id: RB-E-OTA
title: "About over-the-air (OTA) JS updates & release channels (React Native)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-09-24
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-OTA
defer_to_skill: null
related: [RB-E-RN-VERSIONS, RB-E-BROWNFIELD, RB-E-OBSERVABILITY]
sources:
  - "https://expo.dev/changelog/sdk-55"
  - "https://github.com/microsoft/react-native-code-push"
  - "https://registry.npmjs.org/hot-updater/latest"
---

# About over-the-air (OTA) JS updates & release channels (React Native)

> **Diataxis: Explanation.** This page builds *understanding* of OTA delivery — the reasoning
> behind the picks. It is not a setup guide. Store releases and native versioning are owned by
> `RB-E-RN-VERSIONS`; brownfield constraints by `RB-E-BROWNFIELD`; the monitoring an update bake
> relies on by `RB-E-OBSERVABILITY`. Read this for the *why*.

## The one principle that organises everything: OTA is your rollback story, not a convenience

The seductive framing of OTA is "ship JS fixes without waiting for the store." The correct
framing is the inverse: **republishing a known-good update is the fastest production mitigation
React Native has**, and everything about how you run OTA should serve that. So run updates *like
releases* — channels, staged percentage rollouts as exposure control, a monitored bake period,
and **abort vs republish-rollback as distinct mitigations** learned before you need one. Respect
the hard boundary: OTA can update interpreted JS and assets within store guidelines, but **a
native change can never ship OTA** — that is a store release (`RB-E-RN-VERSIONS`). And know the
history: the hosted CodePush service died 2025-03-31, so "still pointed at CodePush" is the
silent failure mode of this category.

## The default, and why

> On Expo/EAS → **EAS Update** via the **expo-updates** client (channels + phased rollouts +
> rollback, and diffing makes updates dramatically smaller since SDK 55/56). Hard self-host
> requirement → **hot-updater**, or the open **expo-updates protocol with your own server**.
> Anything still pointed at the retired CodePush service is silently broken — **migrate**.

EAS Update is the hosted default because the release-engineering pieces are built in: updates
map to **channels**, roll out **phased to a percentage of users**, and roll back by republishing
— "much like a new commit." The client got materially better in SDK 55: **bsdiff diffing**
applies patches against previously installed Hermes bytecode instead of re-downloading whole
bundles — an estimated **~75% smaller update downloads**, opt-in in SDK 55 and **default in
SDK 56**. The self-host escape hatches are real: the Expo Updates *protocol* is open (bring your
own server, keep the battle-tested client), and hot-updater exists precisely as the CodePush
successor for no-vendor shops.

## The landscape, and when each piece earns its place

**EAS Update (expo-updates client)** — the hosted default. Channels, phased rollouts,
republish-to-rollback; SDK 55 added bsdiff diffing (est. ~75% smaller downloads; default in
SDK 56). The first-party pick for any Expo app.

**expo-updates + custom server** — the protocol is open, so you can self-host the server and
keep the battle-tested client. More ops work than EAS; earns its place under a no-vendor rule.

**hot-updater** — self-hosted open-source OTA (gronxb), explicitly positioned as the CodePush
successor. Actively maintained (0.36.x as of 2026-09; v1 in release candidates, which warn of
breaking changes) but younger than expo-updates — the self-host pick when you don't want the Expo
client at all.

**XPREM (ex expo-open-ota)** — the ready-made server for the row above: a Go implementation of the
Expo Updates protocol with rollouts, instant rollback and A/B branch splitting on your own bucket.
Take it when you self-host but want to keep the expo-updates client.

**Codemagic Patch** — self-hosted OTA from the CodePush lineage whose edge is operability (a
dashboard, CLI and a CI vendor) rather than protocol. Still 0.x (0.5.0 as of 2026-09-23): evaluate
it, don't standardize on it.

**Delta (Zepto)** — self-hosted binary-delta patching for fleets where full-bundle pushes cost real
money (a 20MB Hermes bundle × 1M installs ≈ $1,700 per push at CloudFront list). On Expo, EAS
Update's bsdiff diffing answers the same economics first-party.

**code-push-server (standalone)** — Microsoft's open-sourced server, compatible with the legacy
react-native-code-push client. A self-host *stopgap* that keeps an existing CodePush app alive
while you migrate — not a bet for new ones.

**react-native-code-push (RETIRED service)** — App Center and the hosted CodePush service shut
down 2025-03-31; the repo is archived and the client npm has been dormant since 2024-12.
Migrate (urgency: dead) to hot-updater or expo-updates + EAS Update.

## Tradeoffs and failure modes to name out loud

- **Still pointed at the dead service.** The hosted CodePush shutdown doesn't crash your app —
  it just stops updating it. Anything still targeting the retired service is *silently* broken;
  standalone code-push-server is a stopgap, not a destination.
- **OTA run as a hotfix cannon, not a release.** The production playbook is staged percentage
  rollouts and a monitored bake period — "sometimes it helps to go a little slower." Shipping to
  100% instantly forfeits the exposure control that makes OTA safe.
- **Conflating abort with rollback.** They are *distinct mitigations* — halting an in-progress
  rollout vs republishing a known-good update — and the time to learn the difference is before
  the incident, not during it.
- **Trusting pre-merge CI to validate the update.** An OTA update drops new JS onto a native binary
  already on users' devices; ordinary CI never exercises that pairing. Gate each push behind an E2E
  run against the updated bundle on the build it lands on (SWSH's pipeline is the worked example).
- **Expecting OTA to carry a native change.** Store policy allows updating interpreted
  JS/assets within guidelines; native changes always require a store release
  (`RB-E-RN-VERSIONS`). Every OTA pipeline needs the "does this touch native?" gate.
- **Self-hosting as identity, not requirement.** Both self-host paths cost real ops work, and
  hot-updater is younger than expo-updates. Take them for a hard no-vendor requirement.

## How it interacts with the rest of the stack

- **Native versioning (`RB-E-RN-VERSIONS`).** The hard boundary: the moment a change touches
  native code, OTA is out and the store-release machinery owned there is in — two halves of one
  release story.
- **Brownfield (`RB-E-BROWNFIELD`).** RN embedded in a native app can still get OTA — Expo
  Updates works in isolated brownfield since SDK 55; the embedding constraints live there.
- **Observability (`RB-E-OBSERVABILITY`).** A "monitored bake period" is only as good as the
  monitoring behind it; the tooling that tells you whether to abort or roll back is owned there.

## In one paragraph

OTA is your **rollback story**: republishing a known-good update is the fastest production
mitigation React Native has, so run updates like releases — channels, staged percentage
rollouts, a monitored bake period, and abort vs republish-rollback as distinct mitigations.
Default to **EAS Update** via the expo-updates client (SDK 55's bsdiff diffing, an estimated
~75% smaller downloads, default in SDK 56); with a hard self-host requirement take
**hot-updater** or the open expo-updates protocol on your own server. Native changes never ship
OTA — that's a store release (`RB-E-RN-VERSIONS`) — and the hosted CodePush service died
2025-03-31, so anything still pointed at it is silently broken and must migrate.

---

*See also: `RB-E-RN-VERSIONS` (store releases; the native-change boundary), `RB-E-BROWNFIELD`
(Expo Updates in isolated brownfield since SDK 55), `RB-E-OBSERVABILITY` (the monitoring a bake
period depends on).*
