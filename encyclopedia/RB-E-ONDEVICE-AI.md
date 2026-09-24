---
id: RB-E-ONDEVICE-AI
title: "About on-device AI and ML in React Native"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low                # the area moves faster than any recommendation can settle
updated: 2026-09-24
platforms: [react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-ONDEVICE-AI
defer_to_skill: null
related: [RB-E-AI-UI, RB-E-MEDIA, RB-E-NATIVE, RB-E-ANIMATION, RB-E-STORAGE]
sources:
  - "https://github.com/software-mansion/react-native-executorch/releases/tag/v0.10.0"
  - "https://github.com/software-mansion/react-native-executorch/releases/tag/v0.10.1"
  - "https://registry.npmjs.org/@react-native-ai/llama/latest"
  - "https://github.com/mybigday/whisper.rn"
  - "https://github.com/software-mansion-labs/react-native-rag/pull/23"
---

# About on-device AI and ML in React Native

## The distinction that organises everything: a runtime is not a model

The single most common confusion in this area is treating "which on-device AI library"
and "which model" as one decision. They are not, and conflating them produces advice with
a shelf life measured in weeks.

A **runtime** is what this entry selects: the thing that loads a model, moves tensors,
picks a hardware backend, and gives JavaScript a way to call it. Runtimes change slowly
and their differences are architectural — which platforms, which accelerators, what the
threading story is, how big the binary gets.

A **model** is the weights you feed that runtime, and the leaderboard churns monthly.
This corpus deliberately does not rank models: a recommendation that names this quarter's
best small LLM is wrong by the next harvest, and a reader who needs that is better served
by a benchmark than by an encyclopedia. What the corpus can usefully say is which runtime
gives you the freedom to swap models when the leaderboard moves.

Keep the layers separate and the rest of the entry reads cleanly.

## The default, and why

**Cross-platform on-device models → react-native-executorch (0.10+). Apple-only →
@react-native-ai/apple. Local RAG → @react-native-ai/llama plus a local vector store, until
react-native-rag releases support for the executorch rewrite (below).**

executorch takes the cross-platform lane because it is the only option here that treats
*both* platforms and *multiple accelerators* as first-class, and because its v0.10
rewrite changed what kind of library it is. Before that release, tasks were opaque native
C++ modules: you got the pipeline its authors imagined, and custom model execution ran
into rigid interfaces. After it, the native layer exposes the runtime, tensors and fast
operators, while orchestration lives in TypeScript pipelines you can read, edit, chain, or
replace. That is the difference between a library that ships features and a library you
can build on — and it is why the swap-the-model freedom above is real here rather than
aspirational.

The same release wired per-silicon acceleration across a large set of pre-exported model
variants — Core ML reaching the Apple Neural Engine, MLX over Metal for LLM generation on
Apple silicon, Vulkan for Android GPUs — with a multi-threaded XNNPACK CPU path as the
fallback for devices that have no accelerator. The vendor frames that win as inference
speed, thermal throttling and battery, and the framing is the right one: on a phone,
sustained workloads fail on heat and power long before they fail on raw latency.

Two more properties of that release matter more than they sound. Every native JSI function
carries the worklet directive by default, so model calls can run off the main JavaScript
thread or inside UI worklets — which is what makes live-camera inference tractable rather
than janky. And backend binaries are fetched on demand at install, with a package.json
block to narrow the download to the backends you actually use, because on-device AI
runtimes are heavy and shipping every accelerator you do not call is pure app-size cost.

*@react-native-ai/apple* wins the Apple-only lane by not competing at all: it exposes
Apple's own on-device LLM and SpeechAnalyzer, so there is no model to ship and nothing to
accelerate. That is the cheapest possible on-device story when the constraint permits it.
Its preview label is doing real work — its latest release, 0.12.0, dates from 2026-01-28
— so treat it as a platform bet rather than a maintained dependency.

## The failure mode this entry now names: a version pincer

The RAG leg carries a caveat that a 2026-09-10 challenge surfaced, and it is the kind of
problem that only appears when you look at two packages together.

react-native-rag is built against executorch's pre-rewrite API. executorch has since
shipped the rewrite, kept the old surface alive behind a legacy entry point, and marked
that entry point deprecated and slated for removal. The RAG library's last release is
still 0.9.0 (2026-05-26). So a team adopting local RAG today faces a pincer rather than a
choice: pin executorch to the old API and inherit a deprecation with a stated expiry, or
take the new architecture before the RAG layer has followed.

The library is following: as of 2026-09-24 a breaking pull request migrating it to
executorch 0.10 (#23) is open and active, but unmerged and unreleased. Until a release
carries it, the advice holds: on the rewrite, assemble the pipeline yourself from a
generation engine plus a local vector store, and verify the pairing on a spike before
committing a feature to it. Re-check the package when that release lands.

## The landscape, and when each piece earns its place

**Speech** is the most mature on-device task and the one most likely to justify itself
commercially, because transcription is expensive in the cloud and privacy-sensitive by
nature. expo-speech-recognition covers the managed path; whisper.rn is the concrete
binding when you want whisper.cpp models, and it now carries NVIDIA Parakeet alongside
Whisper — which is itself a useful signal that the runtime-versus-model split is real:
the binding outlived the model it was named after.

**Platform-specific providers.** On Android, @react-native-ai/adk puts Google's Gemini —
on-device Gemini Nano and cloud models — behind one Vercel-AI-SDK provider. On iOS 26+,
react-native-nitro-mlx runs Apple MLX LLMs plus TTS/STT through Nitro Modules; it is early
and niche, so pin it.

**Rolling your own RAG** is the default lane today, not a fallback. A single engine that
runs both chat and embedding models means one dependency for the two halves of retrieval,
which is precisely what makes a hand-rolled pipeline practical instead of a research
project. Pair it with a local vector store.

The reading attached to this entry carries the constraint that catches teams out: budget
RAM for the generator and the embedder **together**. Two models resident at once is the
memory profile you actually ship, not the one you measured while testing them separately.

## Tradeoffs and failure modes to name out loud

- **Ranking models in a durable document.** The leaderboard churns monthly. Select a
  runtime; benchmark models yourself, on your target devices.
- **Measuring latency and forgetting thermals.** A phone that hits its power budget
  throttles, and sustained inference is exactly the workload that gets there.
- **Ignoring binary size until submission.** On-device runtimes and accelerator libraries
  are heavy; narrow the backends you link.
- **Assuming two libraries that mention each other are actually in step.** The RAG pincer
  above is the concrete instance. Check publish dates on both sides of an integration.
- **Treating a preview label as decoration.** Where a package is labelled preview and has
  been quiet, the label is the more reliable of the two signals.
- **Committing before a device spike.** This entry is confidence: low on purpose. Validate
  on-device performance on real hardware before designing a feature around it.

## How it interacts with the rest of the stack

This entry is on-device inference; cloud-LLM application UI belongs to **RB-E-AI-UI**, and
the two are frequently mixed in one product. Camera-driven inference sits against
**RB-E-MEDIA**, and the worklet threading that makes it smooth is **RB-E-ANIMATION**'s
worklets runtime doing the work. The custom-native questions underneath — how a JSI module
should own memory and threads — belong to **RB-E-NATIVE**. A local vector store is a
storage decision (**RB-E-STORAGE**).

## In one paragraph

Choose a runtime, not a model. On-device AI in React Native has a clear cross-platform
answer in executorch, whose rewrite turned it into a library you can build pipelines on
rather than one you accept pipelines from, with real per-silicon acceleration and an
install that no longer drags every backend along. Take Apple's own stack when the product
is Apple-only and you are content with a platform bet. For local RAG, know that the
packaged option predates the rewrite it depends on (its migration is an open pull request,
not a release) — assemble the pipeline yourself on the new architecture, budget RAM for generator and embedder together,
and spike on real devices before you design around any of it.
