---
id: RB-E-OBSERVABILITY
title: "About observability — three questions production must answer"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-10
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-OBSERVABILITY
defer_to_skill: null
related: [RB-E-OTA, RB-E-DX, RB-E-META-FRAMEWORKS, RB-E-SECURITY]
sources:
  - "https://blog.sentry.io/react-native-sdk-8-is-here/"
  - "https://docs.expo.dev/eas/observe/introduction/"
---

# About observability — three questions production must answer

> **Diataxis: Explanation.** This page builds *understanding* of the monitoring landscape — the
> reasoning behind the picks. It is not a setup guide. CI gating is `RB-E-DX`; update delivery
> is `RB-E-OTA`; web rendering strategy behind the metrics is `RB-E-META-FRAMEWORKS`.

## The one principle that organises everything: you can't fix what production won't tell you

Local testing answers "does it work here"; observability answers "what is it doing to *users*."
The landscape stops being a vendor list once you see it as **three distinct questions**, each
needing its own instrumentation:

1. **Did it crash?** — error/crash reporting. Table stakes, and subtler than it looks on RN,
   where a JS exception, a native crash, and a startup crash *before the JS loads* are three
   different animals.
2. **Is it slow?** — performance measurement. Needs *metrics*, not vibes: startup time, frame
   drops, interaction latency (the CWV-for-RN reading), and on web the hydration/LCP mechanics.
3. **Which release did it?** — attribution. Mobile ships by store release *and* OTA update
   (`RB-E-OTA`); a regression is only actionable when telemetry names the build or update that
   introduced it.

Most teams buy tool #1 and believe they have all three.

## The default, and why

> **Sentry** for crash + performance monitoring (v8 catches pre-bootstrap crashes); add **error
> boundaries** and wire it up **at the production stage**.

Sentry earns the default by covering the most of questions 1–2 in one SDK on both platforms —
and v8 fixed RN's classic blind spot: crashes *before RN bootstraps* (the "instant death on
TestFlight" class) are now captured via `sentry.options.json`. Error boundaries are the
collection points that make React errors reportable instead of blank screens — which is why the
corpus's source-scan flags production repos with **no boundary at all** (an uncaught render error
blanks the tree *and* tells you nothing). "Production stage" is honest calibration: a prototype
doesn't need dashboards; a production app without them is flying blind.

## The landscape, by question

**Sentry (v8)** — questions 1 and 2: crashes (JS + native + pre-bootstrap), tracing, release
health; 8.17 added Turbo-Module tracking and Expo Router auto-instrumentation.

**EAS Observe (Expo)** — question 3, natively: startup-metric sampling that traces a regression
to a *specific build or OTA update* — the attribution layer store-and-OTA shipping needs.

**Firebase Crashlytics / Bugsnag** — established question-1 alternatives; Crashlytics is fine
when you're already on Firebase.

**@callstack/inspector** — a gap-filler: React-level component profiling in **release builds**
via React DevTools, no native changes. Dev-mode profiling lies about production; this is the
honest lens. Very young (v0.1.x) — treat as experimental.

**The measurement readings** — Indeed's CWV-for-RN (build the *metrics*: TTFF/TTI/FID-analogues
with composite scoring) and the 3perf hydration piece (web: one hydration mismatch re-creates the
DOM and silently re-triggers LCP — know how the metric itself measures).

## Tradeoffs and failure modes to name out loud

- **No error boundary in a production app.** The corpus's absent-rule exists because it keeps
  being found: one uncaught render error blanks the whole tree, uncollected.
- **Crash reporting mistaken for performance monitoring.** Zero crashes and 9-second cold starts
  coexist happily. Question 2 needs deliberate metrics, not an SDK's default dashboard.
- **Shipping OTA without attribution.** Fast updates (`RB-E-OTA`) cut both ways: without
  build/update-level telemetry, a bad update is invisible until reviews arrive. Staged rollouts
  are only as good as the monitoring that decides go/no-go.
- **Profiling dev builds.** Dev mode disables the optimizations that shape production behavior;
  release-build profiling (inspector) or production sampling is the truth.
- **Vendor lock via instrumentation sprawl.** Route custom events through one thin wrapper;
  swapping SDKs later shouldn't mean touching every screen.

## How it interacts with the rest of the stack

- **OTA (`RB-E-OTA`).** Staged rollout + abort/rollback is an observability *loop*: Observe-class
  attribution is what makes the rollback decision data instead of panic.
- **DX (`RB-E-DX`).** CI gates catch regressions before release; observability catches the ones
  that ship anyway. Same philosophy — mechanized feedback — different end of the pipeline.
- **Meta-frameworks (`RB-E-META-FRAMEWORKS`).** Web metrics are rendering-strategy-shaped;
  hydration mismatches are a rendering bug that *presents* as a metrics mystery.
- **Security (`RB-E-SECURITY`).** Crash/telemetry pipelines carry user data — scrubbing and
  data-minimization are part of wiring them, not an afterthought.

## In one paragraph

Observability is **three questions, not one tool**: did it crash (**Sentry v8**, plus the error
boundaries that make React errors collectable), is it slow (deliberate metrics — CWV-for-RN on
native, hydration/LCP mechanics on web, release-build profiling when you need component truth),
and **which release did it** (EAS Observe-class attribution across store builds and OTA
updates). It's a production-stage concern that pairs with `RB-E-OTA`'s staged rollouts — fast
shipping without attribution is just fast guessing — and the cheapest first step is the one the
corpus scans for: put an error boundary at the top of the tree and wire it to the reporter.

---

*See also: `RB-E-OTA` (rollout/rollback is the action side of this loop), `RB-E-DX` (the
pre-release half of mechanized feedback), `RB-E-META-FRAMEWORKS` (web rendering behind the
metrics), `RB-E-SECURITY` (telemetry data hygiene).*
