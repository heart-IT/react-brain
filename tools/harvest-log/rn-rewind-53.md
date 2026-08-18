# Harvest manifest — React Native Rewind #53 (2026-08-17)
issue: https://www.thereactnativerewind.com/issues/react-native-0-87-instant-paywall-a-b-testing-and-buying-mike-hardy-a-beer

Processed 2026-08-18. Issue number read off the page's own "Issue #53" label. The issue's spine is
RN 0.87 + React Native Firebase v26, both kept from their first-party sources. Its most valuable
single link was the least prominent one: the CocoaPods read-only timeline, which is what actually
puts a clock on 0.87's experimental SwiftPM path — and which the newsletter overstates as a
"permanent shutdown", corrected in the entry against the CocoaPods blog.
Reason classes: corroboration · how-to · pre-ship · too-early · cap · unverifiable · off-scope · sponsor.

| item | disposition |
|---|---|
| [video clip: "We'll have none of that, no."](https://youtu.be/IOBcj-NhEDg?si=nCzd2ufpjpwxTEAg&t=95) | skipped: off-scope (editorial gag link) |
| [video: road to 1.0 at React Universe Conf](https://www.youtube.com/watch?v=GPtopk4y2LI) | skipped: conference talk referenced as backstory for the Firebase v26 arc; the release post carries the durable facts |
| [RN Rewind #11 (back-issue link)](https://thereactnativerewind.com/issues-blog-post/react-native-0-80-gets-typed-storybooks-syncing-of-web-and-native-and-a-ui-made-of-vibes) | skipped: off-scope (publication's own back issue) |
| [CocoaPods went into maintenance mode in August 2024](https://blog.cocoapods.org/CocoaPods-Support-Plans/) | **kept** → RB-E-RN-VERSIONS note + when-clause, but with the timeline corrected at the source: the 2024-08-13 post declares maintenance mode, and the linked read-only plan sets 2026-12-02 as the date trunk permanently stops accepting NEW Podspecs (test run 2026-11-01→07). It is READ-ONLY, not a shutdown — the Specs repo and CDN keep serving, so existing builds and existing pod versions keep resolving, and private specs repos are unaffected. That distinction is the difference between "audit which iOS deps still publish through trunk" and a panic |
| [RFC #1006 (AGP 9 adoption)](https://github.com/react-native-community/discussions-and-proposals/pull/1006) | skipped: pre-ship RFC — the ecosystem-wide AGP 9 adoption tracker; 0.87's own AGP-9 support (and the recommended builtInKotlin=false / newDsl=false opt-outs) is already kept in the RN-VERSIONS 0.87 row. Reopen: the RFC resolving into a required-config change |
| [React Native 0.87](https://reactnative.dev/blog/2026/08/11/react-native-0.87) | **kept** → RB-E-RN-VERSIONS (0.87 stable row + note + migrate receipts), RB-E-BUILD (Metro 0.87), RB-E-TYPESCRIPT (Strict-API when-clause). Fourth corroborating source this pass |
| [React Native Firebase v26](https://rnfirebase.io/migrating-to-v26) | **kept** (as the migration receipt) → RB-E-AUTH: the v26 line requires the New Architecture on every natively-bridged package and removes the namespaced API. Entry cites the Invertase release post for the reasoning and this guide's existence for the migration path |
| [Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links) | skipped: deprecation notice, not a selection fact — the page itself states Dynamic Links is deprecated, should not be used in new projects, and "will be shutting down soon" (no date given there; I did not verify a date, so none is recorded). Relevant only as context for why deferred deep linking needs a replacement, which RB-E-NAV now covers from this pass's Expo/Detour keep |
| [RevenueCat Paywalls](https://www.revenuecat.com/docs/tools/paywalls) | skipped: vendor product docs — RB-E-PAYMENTS already carries RevenueCat as the subscription-infrastructure option; remote-configurable paywalls are a feature of that choice, not a new one |
| [RevenueCat Experiments](https://www.revenuecat.com/docs/tools/experiments-v1) | skipped: vendor product docs (paywall A/B testing) — same reasoning as above. Reopen: if PAYMENTS ever needs a pricing-experimentation facet of its own |
| [Shipaton](https://www.shipaton.com/?amp%3Butm_source=ReactNativeRewind&amp%3Butm_campaign=newsletter&amp%3Butm_content=shipaton) | skipped: sponsor (hackathon promo with tracking params) |
| [LinkedIn newsletter](https://www.linkedin.com/newsletters/the-react-native-rewind-7265722507217764353/) | skipped: off-scope (publication's own channel) |
| [Medium](https://medium.com/@thereactnativerewind) | skipped: off-scope (publication's own channel) |
| [YouTube](https://www.youtube.com/@ReactNativeRewind) | skipped: off-scope (publication's own channel) |
