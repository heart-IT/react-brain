---
id: RB-E-PAYMENTS
title: "About in-app purchases & payments (React Native)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-08-18
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-PAYMENTS
defer_to_skill: null
related: [RB-E-AUTH, RB-E-SECURITY, RB-E-OBSERVABILITY]
sources:
  - "https://github.com/hyodotdev/openiap"
  - "https://registry.npmjs.org/react-native-iap/latest"
  - "https://registry.npmjs.org/expo-iap/latest"
  - "https://registry.npmjs.org/@premieroctet%2Freact-native-wallet"
---

# About in-app purchases & payments (React Native)

> **Diataxis: Explanation.** This page builds *understanding* of why buying something inside a
> mobile app is a backend decision wearing a client-library costume, and why the recommendation
> splits the way it does. It is not a StoreKit or Play Billing tutorial. Token storage belongs to
> `RB-E-STORAGE`, identity to `RB-E-AUTH`, and "did the purchase actually work in production" to
> `RB-E-OBSERVABILITY`. Read this for the *why*.

## The decision is not "which library" — it is "who owns entitlement state"

Every in-app purchase question eventually reduces to one: **when your app asks "is this user
entitled to the pro features right now?", who answers?**

The client library is the easy half. It shows the store sheet, returns a receipt or purchase
token, and restores purchases. That part is mechanical, and the two community options do it well.

The hard half is everything after the transaction: validating the receipt somewhere the user
cannot tamper with, reconciling renewals and cancellations that happen while the app is closed,
handling refunds and grace periods, and surviving the fact that Apple and Google model all of this
differently. Apple hands you signed JWS payloads and HTTPS server notifications organised around
*subscription groups*; Google hands you purchase tokens validated over REST with notifications on
Cloud Pub/Sub, organised around *base plans and offers*. Nothing lines up. The first reading in the
index entry walks exactly this asymmetry and the four-part architecture a DIY implementation ends
up needing — read it before deciding to own this.

So the real question is whether you build that reconciliation service or rent it.

## Renting it: RevenueCat

RevenueCat's product *is* the entitlement service. It ingests both stores' notifications, keeps a
per-user entitlement state you query, and gives you the operational surface — remote-configured
paywalls, pricing experiments, cohort reporting — that teams otherwise build in-house months later.
Those extras are worth naming as *features of this choice*, not separate decisions to agonise over.

The tradeoff is the usual hosted one: fees, and a vendor in the critical path of revenue. The
second reading in the index entry is unusually honest about the second half — it is RevenueCat's
own write-up of how they keep purchases working when the backend is unavailable (cached paywall
snapshots, temporary offline entitlements, a buffered request log that replays). Read it as the
question you should ask any subscription vendor, including this one: *what does my app do when
you are down?*

## Owning it: expo-iap and react-native-iap

Both packages come out of the same place — the **OpenIAP** project (`hyodotdev/openiap`), which is
the useful thing to understand here. They are not competitors so much as two runtimes for one
protocol: `expo-iap` (5.3.1) is the Expo module, `react-native-iap` (16.3.1) the bare-RN wrapper,
and they ship in lockstep — both published 2026-08-14.

That lockstep matters because this entry previously carried the opposite belief. Until 2026-08-04
it said react-native-iap was "deprecated/archived → prefer expo-iap", which read an archived
*repository* as a dead *package*. The standalone repos (hyochan/react-native-iap, hyochan/expo-iap)
were archived 2026-04-26 while the code moved into the monorepo; neither package carries an npm
deprecation flag. **Pick between them on runtime — Expo module vs bare wrapper — not on liveness.**

One trap worth knowing before you install: on both packages the `next` dist-tag is *behind*
`latest` (react-native-iap `next` = 15.4.0-rc.3, expo-iap `next` = 4.4.0-rc.7, verified
2026-08-18). Reaching for `@next` here silently downgrades you a major version.

Owning it means you also own receipt validation on a server you control, and the testing burden
that comes with store sandboxes. That is the fee you pay instead of RevenueCat's.

## The thing that is not a purchase at all: wallet passes

Tickets, loyalty cards and coupons are Apple PassKit / Google Wallet objects, not purchases, and
they are **not tap-to-pay**. The library is `@premieroctet/react-native-wallet` (1.0.2), and on
iOS you need a Pass Type ID and matching entitlements before any of it runs.

Note the scope. Bare `react-native-wallet` on npm is an unrelated 2020 package (1.0.8, Apple-Wallet
only). This entry named that one by mistake until 2026-08-18 — a reminder that an npm name which
*resolves* is not the same as an npm name resolving to *your* library. The scoped package is stable
but quiet (last published 2025-06-26): pin it, and expect to read its source if the platform moves.

## How to read the recommendation

1. **Subscriptions, and you do not want to run a reconciliation service?** RevenueCat. Ask the
   outage question up front.
2. **One-time purchases, or you refuse the vendor fee?** `expo-iap` on Expo, `react-native-iap` on
   bare RN — and budget the server-side validation as real work, not a follow-up ticket.
3. **Passes, not purchases?** `@premieroctet/react-native-wallet`, with the Pass Type ID setup.
4. **Whichever you pick, test on real store sandboxes early.** Store rules and receipt validation
   are what make this domain testing-heavy; no library removes that.
