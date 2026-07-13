---
id: RB-E-MEDIA
title: "About camera, video & real-time media (WebRTC, frame processing, filters)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low
updated: 2026-07-13
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-MEDIA
defer_to_skill: react-native-jsi   # frame processors / native modules; real-time perf → rt-audio-pipeline-audit
related: [RB-E-NATIVE]
sources:
  - "https://blog.margelo.com/building-videocall-app-with-filters"
  - "https://expo.dev/changelog/sdk-55"
---

# About camera, video & real-time media (WebRTC, frame processing, filters)

> **Diataxis: Explanation.** This page builds *understanding* of why capture, playback, and
> calling get different answers. It is not an integration guide. Frame-processor depth is owned
> by `react-native-jsi`; real-time discipline by `rt-audio-pipeline-audit`; the Nitro/JSI story
> by `RB-E-NATIVE`. A new, lightly vetted domain (**confidence: low**) — picks are starting
> points to prototype on-device.

## The one principle that organises everything: three problems, one pipeline you must not fork

"Media" is three problems wearing one name. **Capture** is a camera problem. **Playback** is a
decoding-and-display problem. **Calling** is a transport problem you almost always buy as an
SDK. The durable lesson at the hardest intersection — real-time effects inside a call — is:
**don't fork the WebRTC stack.** Intercept camera frames, run segmentation/detection *off* the
hot path (~20–30ms, so "latest mask wins" rather than blocking), GPU-composite, and inject back
into the **existing WebRTC VideoSource** — the source doesn't care who produces frames, so you
get filters without touching encoder, transport, or signaling.

## The default, and why

> Camera → VisionCamera (frame processors) or expo-camera (managed); video calling → LiveKit
> (open-source) or a hosted SDK (Daily/Agora/Stream); real-time filters → process VisionCamera
> frames + GPU-composite and inject into the WebRTC source; image display → expo-image over core
> `<Image>`. Calling-SDK specifics are lightly vetted (confidence: low) — prototype perf
> per-device before committing.

Each sub-problem gets its own tool. **VisionCamera** because its JSI frame processors are the
base for custom real-time frame pipelines (v5 rebuilt on Nitro, consistent with `RB-E-NATIVE`);
**expo-camera** when the job is just capturing photos or scanning codes. Calling goes through an
SDK because raw `react-native-webrtc` is low-level (you wire signaling/SFU yourself) *and*
near-dormant — 2 releases since mid-2024, pinned to Chromium M124 — which strengthens the
SDK-over-raw-WebRTC advice; **LiveKit** is the open-source, self-hostable pick,
Daily/Agora/Stream the hosted ones. The caveat is part of the default, not an apology.

## The landscape, and when each piece earns its place

**VisionCamera (v5, Nitro)** — the RN camera with JSI frame processors; the base for custom
real-time pipelines. Timing matters: v5 went GA 2026-04 and is *still stabilizing* — open iOS-26
teardown/race crashes plus an AE regression vs v4, with ~85% of installs still on v4 (2026-07).
Ship it pinned-patch with a device-matrix pass; don't linger on v4 either (frozen since 2025-11).

**expo-camera** — managed camera for Expo apps; simpler, fewer real-time hooks; the
capture / scan-codes answer.

**react-native-webrtc** — low-level bindings; near-dormant (above); inject into, don't build on.

**LiveKit / Daily / Agora / Stream Video** — WebRTC conferencing SDKs (RN + web). LiveKit
open-source + self-hostable; the others hosted infra.

**Skia / Metal + MediaPipe / Vision / ML Kit** — the effects layer: GPU compositing (Skia/Metal)
plus on-device segmentation/detection (MediaPipe on Android, Vision on iOS) for filters/effects.

**expo-video / expo-audio** — media *playback* (not capture or calling); replace deprecated
**expo-av** (out of Expo Go in SDK 55, unpatched); expo-video splits `VideoPlayer` (player
logic) from `VideoView` (view).

**expo-image** — image *display*; the modern replacement for core `<Image>`: disk/memory
caching, blurhash/thumbhash placeholders, transitions, faster decode. Works in bare RN too.

**react-native-audio-api (Software Mansion)** — Web Audio API for RN: audio graphs,
effects/filters via `MediaElementAudioSourceNode`; 0.13 (2026-07, verified vs npm) ships a
stable `<Audio/>` component. The audio-*processing* layer — playback-only needs go to expo-audio.

## Tradeoffs and failure modes to name out loud

- **Forking the pipeline for filters.** Rebuilding encoder/transport/signaling to add effects is
  the anti-pattern this entry exists to prevent; inject into the existing VideoSource instead.
- **Blocking the hot path with ML.** Segmentation runs ~20–30ms — *latest mask wins*; composite
  the freshest mask rather than stalling the frame.
- **Skipping the boring conversions.** The reference architecture names YUV↔I420/NV12 conversion,
  monotonic timestamps, and buffer pooling as the real gotchas of frame injection.
- **Betting on v5 blind — or hiding on v4.** v5 is stabilizing (crashes + AE regression above);
  adopt it pinned-patch with a device-matrix pass. But v4 is frozen, so staying is also a cost.
- **Staying on expo-av.** Deprecated, unpatched, out of Expo Go since SDK 55 — migrate.
- **Raw react-native-webrtc as your calling foundation.** DIY calling on a near-dormant layer.
- **Over-trusting this entry.** Confidence is *low*: options lightly vetted, calling-SDK
  pricing/features unverified — prototyping per-device is part of the recommendation.

## How it interacts with the rest of the stack

- **Native modules (`RB-E-NATIVE`).** VisionCamera v5's Nitro rewrite is part of the Nitro
  consolidation that entry tracks; frame processors are its JSI story applied to camera frames.
- **Frame-processor correctness (`react-native-jsi`).** The defer skill — native-pipeline depth.
- **Real-time discipline (`rt-audio-pipeline-audit`).** The hot-path discipline transfers from
  audio; the entry routes real-time correctness and perf review there.

## In one paragraph

Camera, playback, and calling are **three different problems**: capture with **VisionCamera**
(v5 on Nitro, GA 2026-04 but still stabilizing — pin a patch, run a device matrix) or
**expo-camera**; play back with **expo-video/expo-audio** (expo-av is deprecated, out of Expo Go
since SDK 55), display images with **expo-image**; buy calling as an SDK — **LiveKit** for
open-source/self-hosted — because raw `react-native-webrtc` is near-dormant. For real-time
effects the durable rule is **don't fork the pipeline**: segment off the hot path ("latest mask
wins"), GPU-composite with Skia/Metal + MediaPipe/Vision, and inject processed VisionCamera
frames into the existing WebRTC VideoSource. Confidence is low — prototype per-device first.

---

*See also: `RB-E-NATIVE` (Nitro/JSI foundation for frame processors). Depth: the
`react-native-jsi` skill and `rt-audio-pipeline-audit` (real-time discipline). Reference
architecture: Margelo's video-call-filters deep-dive; on the horizon, per the entry's reading,
MoQ (Media over QUIC) via Software Mansion's MoQKit — between WebRTC and HLS, not yet a pick.*
