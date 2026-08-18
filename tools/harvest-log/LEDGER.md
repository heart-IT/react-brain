# react-brain harvest & maintenance LEDGER

Narrative history of every harvest/maintenance pass: what changed, what was learned,
which judgments were overturned. Append a dated `##` section per pass (newest last);
cloud/PR runs append here too — it travels with the PR. Resume STATE lives in
`tools/harvest-state.json` (never here); the method lives in `tools/upkeep-routine.md`.

PROVENANCE: kept 2026-06-17 → 2026-08-07 as maintainer session memory at
`~/.claude/projects/-Users-f1sh-odd-jobs-heartit-react-brain/memory/react-brain-mentor-skill.md`
(the repo's pre-move project path); relocated into the repo VERBATIM on 2026-08-07 so cloud
agents see it and history versions with the corpus. Sections below predate per-file entries,
the CLI, and several renames they mention — read dated sections as point-in-time records.

---

---
name: react-brain-mentor-skill
description: Design + location of the react-brain-mentor Claude skill and its growth hook
metadata: 
  node_type: memory
  type: project
  originSessionId: 55788955-1c08-4c59-bbb2-7bf65ca974cf
---

The mentor skill lives in the repo at `skills/react-brain-mentor/`
(`SKILL.md` + `react-brain-mentor.yaml` + `encyclopedia.yaml`), built to match
the user's global skill-ecosystem convention (SKILL.md frontmatter + YAML spec +
`composition` blocks so `/review` auto-discovers it via `~/.claude/skills/*` globbing).

**Design choices that are load-bearing — don't undo without reason:**
- It is an **advisory/workflow** skill, NOT a detection ruleset and NOT a gate.
  It defers to `/review` for pass/fail verdicts.
- **Breadth vs depth split (the core idea):** DEPTH rules are routed to existing
  knowledge skills (`engineering-principles`, `react-native-best-practices`,
  `react-native-jsi`, `design-systems-governance`, etc.) — never re-encoded.
  BREADTH (ecosystem selection: which router/state/data/styling/forms lib) comes
  from the react-brain encyclopedia. Each assessment_dimension maps to both an
  `owner` (depth skill) and an `encyclopedia_cat` (breadth entry).
- `mentor_principles` (MP-*) keep it grounded: every suggestion is sourced,
  ranked by impact×effort, actionable, teaches the why, stage-calibrated, and
  recommends swaps only via MP-VETTED-OVER-PROMOTION (context-keyed, not absolute).
- `status: draft` (not sealed) on purpose — it evolves with the encyclopedia.

**The growth hook:** `encyclopedia.yaml` is the machine-readable index of
react-brain entries. As entries are written, update that file and move each along
`stub → drafted → reviewed` (and add long-form `encyclopedia/<id>.md`); the
mentor's breadth recommendations grow automatically with no other file changes.
Recommendations are **context-keyed** (e.g. "for server state at MVP+, X wins on
invalidation"), never absolute. (Renamed from the earlier mis-framed `capabilities.yaml`.)

**Encyclopedia v2 schema (reorganized 2026-06-17 — "more correct/organized/efficient + recommend"):**
top-level `groups` table-of-contents (6 groups: react-foundations, app-architecture, ui,
platform-native, tooling-ops, ai) so the mentor navigates instead of scanning all 29 entries.
Every entry now has: `group`, `confidence` (high/medium/low), and a **`recommend` block
(`default` pick + `when` context-clauses)** — the actual recommendations, which were previously
empty `context_keyed: true` placeholders. Statuses promoted: 23 `drafted` / 6 `stub` (stub =
fast-moving leads: NATIVE-UI, BROWNFIELD, GAMES, ALT-FRAMEWORKS, ONDEVICE-AI, AI-UI). The mentor
yaml `encyclopedia_awareness` was updated to read `groups` → `recommend.default`/`recommend.when`
and to calibrate certainty to `confidence`. All 11 verified source URLs preserved in the rewrite.

**First long-form entry (the TEMPLATE), 2026-06-17:** `encyclopedia/RB-E-STATE.md` — written as
Diataxis **Explanation** (the *why* behind the index recommendation; kept pure — NO step-by-step/
how-to, NO API/reference tables, those live in the index + depth skills). Source-checked vs State
of React 2025 → index entry RB-E-STATE promoted to `reviewed` (first `reviewed` entry; doc + source
+ updated set). Convention for future long-form entries: file at `encyclopedia/<id>.md`, frontmatter
(id/title/diataxis/status/confidence/updated/platforms/index_entry/defer_to_skill/related/sources),
Explanation mode, cross-link siblings by entry id, then flip the index entry to `reviewed`.
Now **3 reviewed long-form entries** written following the template: `encyclopedia/RB-E-STATE.md`,
`RB-E-DATA.md`, `RB-E-CROSSPLATFORM.md` (the last is react-brain's thesis: share by layer — logic/
state/data share cleanly, UI fights you; bet new shared-UI on React Strict DOM / Expo Universal,
not maintenance-mode react-native-web). Status mix: 3 reviewed / 20 drafted / 6 stub. Next
template-followers when wanted: RB-E-NAV, RB-E-META-FRAMEWORKS, RB-E-STYLING, RB-E-NATIVE.

**Dry-runs + upgrades (2026-06-17):** Dry-ran the mentor against two real heartit apps — `ledgerhr`
(React-DOM in Pear/Electron, JS, Holepunch P2P backend, no CI) and `ourpot` (React Native + Expo,
TS, same Holepunch backend, has CI, no TanStack Query). Skill held up: correct platform routing,
stage calibration, named real strengths, and RB-E-CROSSPLATFORM correctly flipped from N/A (solo-
platform ledgerhr) to a top recommendation (multi-app ourpot/bitbarter/ledgerhr share the kernel).
Two gaps found → FIXED: (1) added a **Phase-0 SIBLING/monorepo-comparison step** to the mentor
protocol (scan parent dir for sibling apps; a pattern one solved that another hand-rolls is a
proven low-risk rec; duplicated logic = RB-E-CROSSPLATFORM target); (2) added **RB-E-DX** entry
(CI/lint/hooks/monorepo/dep-hygiene; drafted, high confidence) and pointed mentor DIM-DX at
`encyclopedia_cat: dx`. Index now **30 entries** (3 reviewed / 21 drafted / 6 stub).

**Seeding from React Native Rewind (as of 2026-06-17):** **ALL 45 issues processed.** The index has **24 entries** — 23 `stub`, 1 `drafted`
(**RB-E-RN-VERSIONS**, an 11-row RN 0.76→0.86 timeline; rows 0.84–0.86 verified ✓). 8
entries carry VERIFIED embedded facts (sources + dated). Key verified facts: RN-Web →
MAINTENANCE w/ **React Strict DOM** successor (CROSSPLATFORM); New Arch = default 0.76 →
ONLY runtime 0.82 → Legacy frozen 0.80 / stripped 0.84, + Nitro consolidating native
modules (NATIVE); **Hermes V1** default since RN 0.84 + precompiled iOS + Node 22.11 +
bundler-wars Metro/Re.Pack/Rock (BUILD); RN 0.85 Jest-preset move + shared animation
backend (TESTING/ANIMATION); React Navigation 8 alpha native tabs + SF Symbols (NAV);
RSC/React-19.2 vulns are SERVER-SIDE, don't affect RN (SECURITY); Expo recommends Maestro
over Detox; Expo = recommended framework since `react-native init` deprecated (2024-12).
New entries beyond the original seed: CHARTS, ANIMATION, STORAGE, ONDEVICE-AI,
ALT-FRAMEWORKS (Lynx/Valdi), NATIVE-UI (LiveActivities/widgets), OBSERVABILITY, SECURITY,
RN-VERSIONS, PAYMENTS, BROWNFIELD, GAMES. Mentor DIM-SEC maps encyclopedia_cat: security.
Process: fetch → verify load-bearing claims vs primary sources → verified facts as sourced
notes, everything else as labeled `stub` leads. NEXT: graduate stubs → drafted/reviewed by
writing long-form `encyclopedia/<id>.md` entries (Diataxis).

**Second source — This Week in React (#266–285, 20 issues, processed 2026-06-17):** web-side
breadth → index now **29 entries** (2 `drafted`: RN-VERSIONS + **REACT-CORE**; 9 with verified
facts). New web entries: REACT-CORE, META-FRAMEWORKS, COMPONENT-LIBS, I18N, AI-UI. Strengthened
STATE/DATA/FORMS/STYLING/TYPESCRIPT/TESTING/SECURITY/BUILD/NAV with web detail. Key VERIFIED:
**React Compiler 1.0 is STABLE** (2025-10-07; Rust port is the WIP part); RSC DoS **CVE-2026-23864**
(CVSS 7.5) + React2DoS CVE-2026-23869 are SERVER-SIDE, patched React 19.0.5/19.1.6/19.2.5, don't
affect RN. Leads recorded: styled-components in maintenance mode; TypeScript 7 = Go rewrite (~10x);
Vite 8 on Rolldown; Remix 3 pivots off React Router; supply-chain wave (Shai-Hulud, @tanstack npm
compromise) → npm v12 blocks install scripts by default; State-of-React 2025 favorites = Zustand +
TanStack Query; RN New-Arch adoption ~80%. TWiR is the web-heavy complement to RN-Rewind — two
newsletters now feed the encyclopedia.

**Third source — React Status / statuscode (#459–478, 20 issues, processed 2026-06-17):** mostly
CORROBORATED existing facts (React Compiler 1.0, RSC DoS CVEs, Vite 8/Rolldown, RedwoodSDK 1.0,
TanStack supply-chain attack, Expo SDK 55/56, TS 7 Go, Remix 3 pivot, Activity/useEffectEvent) →
independent confirmation, **no new entries** (stayed at 29). Sharpened: REACT-CORE now notes the
React Foundation (Linux Foundation, Feb 2026; exec dir Seth Webster) + alt React runtimes (Preact,
experimental **@tanstack/redact** ~9KB/2–3×, Million, TSRX JSX-successor); DATA adds TinyBase 8
(local-first); STYLING styled-components clarified (v6.3 added RSC support, else maintenance).
THREE newsletters now feed the encyclopedia (RN Rewind ×45, This Week in React ×20, React Status ×20).

**Fourth source — React Digest / reactdigest.net (#2205–2300, ~14 of 20 fetched, 2026-06-17):**
article/education-driven → heaviest corroboration + mostly DEPTH guidance (Fiber, memory leaks,
architecture, a11y, use()/useOptimistic) that belongs in the depth skills, NOT the selection index;
several issues returned "no durable selection facts." No new entries (stayed at 29). 4 small edits:
added **tRPC** to DATA (was genuinely missing — type-safe RPC), **MSW** + **Meticulous** to TESTING,
**HighTable** (billion-row) to LISTS, and a mentor_hint capturing the cited "2026 React-web default
stack" (Vite+pnpm+TS+Tailwind+Zustand+TanStack Query+Zod+Vitest+Playwright+Sentry). FOUR newsletters
now feed it. LEARNING: additional newsletters now yield mostly corroboration — the next lever is
DEPTH (write long-form encyclopedia/<id>.md, graduate stubs → reviewed), not more sources.

**RN Rewind #46 (Vercel Eve / Tauri desktop shells, processed 2026-06-25):** found a genuine GAP →
added **RB-E-DESKTOP** ("Desktop apps & web-to-native shells" — Electron vs Tauri 2 vs Pake vs Pear
vs Capacitor vs PWA; in app-architecture group; `drafted`/medium). Directly relevant to heartit's
own Pear/Electron desktop apps (e.g. ledgerhr); Pear depth routes to holepunch-p2p-systems. VERIFIED
vs primary sources: Tauri 2.x uses the OS native webview (no bundled Chromium, builds from ~600KB);
Pake V3.12.0 (2026-06-21) is a one-command web-URL→desktop wrapper built ON Tauri (<10MB, ~20x
smaller than Electron). Two minor option adds: **react-native-morph-view** (Software Mansion, GPU
image-morph shader; niche) → RB-E-ANIMATION; **Vercel Eve** (file-based agent framework — agent
backend, not a UI lib) → noted as adjacent in RB-E-AI-UI. Skipped Chain React 2026 (event, not a
selection fact). Confirms the LEARNING: the durable yield from a single issue is one gap-filling
entry, not broad change. Then (same day) wrote the long-form **encyclopedia/RB-E-DESKTOP.md**
(Diataxis Explanation, following the template; organizing idea = "bundled vs borrowed renderer"
+ centralised-vs-P2P distribution; React-on-desktop = web app in a native window) and flipped the
index entry to `reviewed`. Index now **31 entries** (4 reviewed / 21 drafted / 6 stub); 4th reviewed
long-form entry after RB-E-STATE / RB-E-DATA / RB-E-CROSSPLATFORM.

**This Week in React #287 (processed 2026-06-25; jumped past #286):** mostly version-bump
corroboration (Reanimated 4.5, Base UI 1.6, React Aria 1.19, Vite 8.1, Legend List 3.1, RHF 7.80,
StyleX 0.19, Astro 7) → no index change for those. FOUR verified status changes applied: (1)
**RB-E-NATIVE-UI graduated stub→drafted, low→medium** — expo-widgets STABLE in Expo SDK 56 (alpha
in 55; iOS widgets+Live Activities from Expo UI, no SwiftUI) + Voltra 2.0 (2026-06-18) rewrote to
Turbo Modules → now works in BARE RN (dropped Expo-Modules/Dev-Client req); recommend.default is now
a real pick, not a LEAD; (2) **RB-E-NAV** — React Router v8 RELEASED (8.0.1, ESM-only, future flags
default; v7→v8 non-breaking if caught up on flags) — was "prerelease"; (3) **RB-E-TYPESCRIPT** — TS
7.0 RC out 2026-06-18 (Go rewrite, ~10x, CI-ready, stable ~weeks); added note+source; (4) source
count This Week in React ×20→×21. All four verified vs primary sources (Voltra releases, Expo blog,
reactrouter.com, MS devblog) before editing. Index now **31 entries** (4 reviewed / 22 drafted / 5
stub). Confirms the LEARNING again: a fresh newsletter yields a few verified status-flips +
graduations, not new entries — depth/maturation is the lever now.

**PROCESS CORRECTION — articles, not just entries (user feedback, 2026-06-25):** user pushed back
that I was only mining newsletters for version/status facts and DROPPING the linked deep-dive
articles (the most valuable part). Earlier "depth articles route to depth skills, not the index"
had meant they went nowhere. FIX: added a curated **`reading`** field to the encyclopedia entry
schema (annotated `title`/`url`/`by`/`what`) — the home for canonical deep-dives per topic; documented
it in the index header + a new mentor_hint. POLICY now: a strong article → (a) reveals a domain gap
→ NEW entry; (b) is the canonical deep-dive → add to that entry's `reading`; (c) pure how-to → still
defer_to_skill. Rule: only add `reading` links I've actually read (no fabricated URLs). First
application: a Margelo article ("Building a video call app with filters", Ritesh Shukla) exposed a
whole missing domain → created **RB-E-MEDIA** (camera/video/real-time media/WebRTC: VisionCamera v5,
LiveKit/Daily/Agora/Stream, react-native-webrtc, Skia/Metal+MediaPipe/Vision, expo-camera; stub/low;
defer_to_skill react-native-jsi + rt-audio-pipeline-audit for real-time discipline). Directly relevant
to heartit's real-time-media focus. Index now **32 entries** (4 reviewed / 22 drafted / 6 stub).

**Reading pass on high-traffic entries (2026-06-25):** ran 9 parallel research subagents (one per
entry), each REQUIRED to WebFetch-verify every candidate before returning it (no fabricated URLs;
agents correctly rejected 403s, paywalls, podcasts, changelogs). Populated `reading` on 9 entries with
15 vetted deep-dives: STATE (TkDodo "React Query as a State Manager" + Erikson "Context is not state
mgmt"), DATA (TkDodo "Why You Want React Query"), CROSSPLATFORM (Evan Bacon "use dom"), REACT-CORE
(Erikson "Rendering Behavior" guide), NATIVE (Margelo JSI-perf 2-part), BUILD (Lee Robinson "Rust Is
Eating JS" + Vite 8 post), TESTING (Kent Dodds "Write tests…" + "Testing Implementation Details"),
STYLING (Magura "Breaking Up with CSS-in-JS" + Meta StyleX), LISTS (Shopify FlashList v2 + LogRocket
windowing-vs-recycling). De-duped vs existing `sources:` (dropped React-Compiler post from REACT-CORE
reading + Gallagher essay from CROSSPLATFORM reading — already fact-sources). YAML validated (32
entries parse; 10 now carry `reading`, incl. RB-E-MEDIA). Deliberately did NOT backfill the other ~22
entries — only add reading I've actually read; the rest fill in as newsletters surface real articles.

**Article harvest — TWiR #278–287 (past 10 issues, 2026-06-25):** user asked to mine recent issues for
ARTICLES specifically (prior passes only took version facts and dropped articles). Ran 5 parallel
subagents (2 issues each), each given the full 32-entry taxonomy to map articles → entries (or flag
GAP), the already-have URL list to dedupe, and the hard fetch-verify rule. Agents returned ~50 verified
candidates; I CURATED down to **28 added across 20 entries** (cap ~3/entry), dropping personal-blog
how-tos, off-topic items (a Node.js QUIC piece — backend), and dups of existing sources. No new domain
GAP surfaced (taxonomy is now fairly complete). `reading` coverage went 10→**21 of 32 entries (44
items)**; YAML validated, no duplicate URLs. Notable adds: REACT-CORE (Callstack custom-renderers,
Scharff RSC architecture), STATE (Linear-fast/performance.dev), DATA (GitHub Issues nav, jjenzz loading
states), META-FRAMEWORKS (TanStack "Who Owns the Tree", FEM RSC-in-TanStack), NATIVE (Margelo×Discord
New-Arch postmortem), SECURITY (React2Shell RCE + Flight DoS postmortems), TYPESCRIPT (tsgo memory,
TanStack Table TS-perf), A11Y (Scharff + AI-gen-UI-inaccessible), BUILD/NAV (Calazans Metro inlined-
requires series), BROWNFIELD/DX (Doctolib case studies), plus ANIMATION/LISTS/FORMS/MEDIA/CROSSPLATFORM/
STYLING/COMPONENT-LIBS/ONDEVICE-AI. KEY LEARNING: agents repeatedly hit JS-rendered expo.dev/blog
(unfetchable — nav/footer only) and HTTP-403 on callstack.com/blog & developerway.com; several strong
candidates (Expo JSI-in-Swift, Expo animation benchmark, Callstack on-device-AI/brownfield) were
EXCLUDED per the no-unverified-URL rule — worth a manual recheck with a JS-capable fetcher later.
Still no reading on 11 entries: RN-VERSIONS, DESKTOP, I18N, CHARTS, STORAGE, NATIVE-UI, PAYMENTS,
GAMES, ALT-FRAMEWORKS, OBSERVABILITY, AI-UI.

**Margelo blog pass (blog.margelo.com, 2026-06-25):** the whole blog is just 9 posts (newer blog, all
2026; confirmed via sitemap-0.xml — older Margelo classics are NOT here). 4 already cited; processed the
rest. ADDED 4 reading + 1 new entry: profiling-skia-reanimated-low-end-android → ANIMATION (SurfaceView-
over-TextureView, frame-cadence, profiler triangulation); react-native-qr-barcode-scanner-visioncamera-v5
(Marc Rousavy) → MEDIA; four-years-of-react-native-quick-crypto (native-library architecture case study:
OpenSSL parity, sync-first threading, JSI→Nitro, security-audit-as-validation) → NATIVE (accepted a 4th
all-Margelo item — they ARE the native authority, not vendor padding). NEW GAP → created **RB-E-KEYBOARD**
(stub, platform-native; KeyboardAvoidingView-core vs react-native-keyboard-controller (Kirill Zyusko) vs
avoid-softinput; the "core KAV snaps on Android" iOS-scheduled-vs-Android-per-frame-insets story) seeded
with the Margelo keyboard deep-dive. SKIPPED whats-new-in-visioncamera-v5 (feature announcement; VisionCamera-
v5=Nitro already noted). Index now **33 entries** (4 reviewed / 22 drafted / 7 stub); reading on 22 entries
(48 items). NOTE: NATIVE reading is now 4 items all-Margelo — acceptable given they're the native deep-dive
authority, but watch for over-concentration; diversify if equally-strong non-Margelo native pieces appear.

**React Digest pass (#2210–2305, 19 issues, 2026-06-25):** each RD issue is named after its featured
article. 5 parallel subagents (fetch-verify enforced) returned ~37 candidates — heavily React-internals /
web-architecture (RD's nature; confirms prior LEARNING that RD is corroboration + depth). CURATED to
**10 reading adds + 1 new entry**, deliberately favoring thin/empty entries over already-full ones and
routing generic architecture to engineering-principles (did NOT create an "architecture/feature-based"
entry — that's depth, per scope boundary). Adds: REACT-CORE (Shu Ding "Bulletproof Components"); META-
FRAMEWORKS (Railway off-Next.js migration, punits "use client in Next.js"); NAV (Sergio Xalambrí loaders/
actions-as-integration-points); LISTS (HighTable billion-row deep-dive — documents an existing LISTS
option); COMPONENT-LIBS (Scharff action-props); ALT-FRAMEWORKS [was empty] (MDN React-SPA→Lit, Evil
Martians nanotags — both "when you don't need React"); DESKTOP [was empty] (Conductor React+Tauri perf
postmortem — heartit-relevant). NEW GAP → **RB-E-EDITORS** (stub, ui group; rich-text editors: TipTap/
ProseMirror/Lexical/Slate-Plate/BlockNote — common hard React need, previously uncovered) seeded with the
ProseMirror-model deep-dive. Index now **34 entries** (4 reviewed / 22 drafted / 8 stub); reading on 25
entries (58 items). VERIFICATION blocks again: developerway.com & readwriterachel.com & patreon HTTP-403,
react.doctor is a product landing page (no article body) — all excluded per no-unverified rule. Strong
runners-up left out to hold ~3/entry caps (inside-react Fiber series, saschb2b use()/compiler-18mo, Carniato
two-design-choices, real-time SSE+TanStack-Query invalidation, exit-animations) — pull in on request.

**Runners-up pulled in (user request, 2026-06-25):** user explicitly authorized exceeding the ~3/entry cap
for the flagged set. Added 7: REACT-CORE += inside-react "why Fiber exists" + "how Fiber renders" (the
2 core Fiber pieces; the other 3 inside-react internals posts — key-prop, state-updates, out-of-order
streaming — left available, noted inline) + Carniato "two React design choices" + saschb2b "React Compiler
at eighteen months"; DATA += saschb2b "use() hook" + armand-salle "real-time cache invalidation (SSE+
TanStack Query)"; ANIMATION += barvian "exit animations". Counts now: REACT-CORE 8, DATA 5, ANIMATION 4
reading. Index unchanged at **34 entries**; reading on 25 entries (**65 items**). NOTE: caps are now
deliberately relaxed on these 3 flagship entries per user preference — the ~3/entry guideline still holds
for the rest unless the user says otherwise. YAML valid, no dup URLs.

**React Status pass (#465–479, 15 issues, 2026-06-25):** as predicted, HEAVY overlap — most headliners were
pieces already held (GitHub-Issues-nav, RSC-in-TanStack, inside-react streaming, Activity, test-IDs) or
already-cited domains. 3 parallel subagents returned ~18 candidates; CURATED to **6 net-new**, all filling
thin/empty entries (held the line on already-full REACT-CORE/META/STATE — skipped Adarsha TanStack-mental-
model, Platformatic SSR benchmark, Aha! RSC, Tom-Piaggio 18-months, Twofold error-rendering, etc.). Adds:
DESKTOP (Raycast — one React+TS codebase to macOS+Windows via native shells, no Electron); NAV (programmingarehard
"dialogs as routes" in RR7); BUILD (Mythical Engineer RN Android build-optimization — Gradle/ccache/Metro-
workers, the RN-CI dimension); ALT-FRAMEWORKS (Strawberry Browser React→Svelte 130K migration); OBSERVABILITY
[was empty] (Indeed Core-Web-Vitals-for-RN); SECURITY (Trigger.dev Shai-Hulud worm postmortem — the supply-
chain reading the entry's own note called for). Index unchanged at **34 entries**; reading on 26 entries (71
items). Verification blocks again (kentcdodds.com HTTP-500, readwriterachel/Rubrik/Patreon 403, longho.dev
JS-shell) — excluded per rule. 8 entries still have NO reading (newsletters don't surface durable deep-dives
for them): RN-VERSIONS, I18N, CHARTS, STORAGE, NATIVE-UI, PAYMENTS, GAMES, AI-UI. FOUR newsletters now fully
article-harvested (TWiR, React Digest, React Status) + Margelo blog; the well is largely dry — further
newsletter passes yield mostly corroboration.

**Targeted per-topic hunts for the 8 empty entries (2026-06-25):** 8 parallel subagents (one per entry,
fetch-verify enforced) found canonical deep-dives by direct topic search rather than newsletter sweep.
Added 14 → ALL 34 ENTRIES NOW HAVE `reading` (FULL COVERAGE, 85 items, no dup URLs). Adds: RN-VERSIONS
(Codeminer42 bridge→Fabric evolution); I18N (next-intl AOT compilation by Jan Amann + FormatJS ICU syntax);
CHARTS (Airbnb visx + Candillon RN-graphics/Skia); STORAGE (op-sqlite JSI internals by Oscar Franco +
TanStack DB local-first guide); NATIVE-UI (Evan Bacon Expo widgets via CNG + Add Jam Live Activities);
PAYMENTS (RevenueCat cross-platform-subscription + RC-Fortress resilience); GAMES (Colin Gray RN-Skia
architecture); AI-UI (Vercel AI SDK generative-UI + Tiger Abrodi streaming-markdown renderer). Split the two
Shopify Skia pieces across CHARTS (Candillon, has the chart example) and GAMES (Colin Gray, foundational) to
avoid a dup URL. Verification blocked the canonical Voltra post (callstack.com 403) and a Callstack New-Arch
migration guide (403) — excluded per rule; NATIVE-UI/RN-VERSIONS used alternatives. LEARNING: targeted topic
hunts are far higher-yield than newsletter sweeps for filling specific gaps (8/8 entries filled, vs heavy
dedupe in the newsletter passes) — use this method going forward for any new/empty entry.

**All stubs promoted → drafted (user request, 2026-06-25):** flipped the 8 remaining `stub` entries (MEDIA,
KEYBOARD, EDITORS, BROWNFIELD, GAMES, ALT-FRAMEWORKS, ONDEVICE-AI, AI-UI) to `drafted` now that each has a
written, internally-consistent recommend block + curated verified reading. Critically KEPT honesty via the
ORTHOGONAL confidence field: dropped the contradictory "LEAD (...)" prefixes from every recommend.default and
the "leads only / treat as leads" phrasing from notes, but kept `confidence: low` on the 7 genuinely fast-
moving/lightly-vetted ones (KEYBOARD stayed medium) with explicit "(confidence: low) — prototype/validate
first" caveats inline. Status now: **34 entries = 30 drafted / 4 reviewed / 0 stub**; confidence = 11 high /
15 medium / 8 low. So `drafted` = "mentor may cite," and the low-confidence caveat (not stub status) now
carries the "recommend tentatively" signal — matches the schema's status⊥confidence design + the existing
confidence-low mentor_hint. The `stub`-semantics mentor_hint was left intact (defines the ladder for any
future stub). Encyclopedia is now fully drafted+ with reading everywhere; next natural step = long-form
encyclopedia/<id>.md Explanation entries to push more entries → reviewed (only 4 reviewed so far: STATE,
DATA, CROSSPLATFORM, DESKTOP).

**Wrote 5 long-form reviewed entries (user request, 2026-06-25):** authored encyclopedia/RB-E-NAV.md,
RB-E-META-FRAMEWORKS.md, RB-E-STYLING.md, RB-E-NATIVE.md, RB-E-BUILD.md (Diataxis Explanation, following
the STATE/DATA/CROSSPLATFORM/DESKTOP template: blockquote callout → organizing-distinction → default+why →
landscape → tradeoffs/failure-modes → stack-interactions → one-paragraph → see-also footer; pure Explanation,
no how-to/API tables; cross-linked siblings by id). Each entry's organizing idea: NAV = native-UI-nav vs
web-URL-routing (+ meta-framework owns web routing); META-FRAMEWORKS = "who owns the tree" (server-owned Next
vs router-first TanStack Start; RSC-as-protocol) keyed by how-much-server × hosting; STYLING = WHEN styles are
computed (compile-time/zero-runtime vs runtime CSS-in-JS); NATIVE = the async bridge is gone (JSI/Fabric/Turbo-
Nitro, New Arch mandatory ≥0.82); BUILD = two toolchains (web Rust wave/Vite-Rolldown vs RN Metro) + fix RN
slowness at native-build/Babel not the bundler. Flipped all 5 index entries → `reviewed`, set doc:, bumped
updated:2026-06-25, and ADDED sources: to META-FRAMEWORKS + STYLING (had none). **Now 9 reviewed / 25 drafted
/ 0 stub**; 9 long-form docs in encyclopedia/. YAML valid; every reviewed entry has doc+sources; no dup URLs.
Remaining drafted entries that could graduate next if wanted: REACT-CORE, TESTING, LISTS, SECURITY, DX, FORMS,
COMPONENT-LIBS, ANIMATION, STORAGE, A11Y, etc.

**Graduated REACT-CORE, TESTING, LISTS, SECURITY, DX → reviewed (user request, 2026-06-25):** wrote 5 more
long-form encyclopedia/<id>.md Explanation docs (same template). Organizing ideas: REACT-CORE = the compiler
era (stop hand-memoizing; React-the-library vs -protocol/RSC vs -projection/alt-runtimes; RSC is web+server,
not RN); TESTING = confidence-per-effort / Testing Trophy (behavior-not-implementation, mock-the-network-MSW;
Vitest/Jest+RTL, Playwright/Maestro); LISTS = cost scales with mounted NODES not data length (windowing vs
recycling; ScrollView→FlatList→FlashList; HighTable billion-row; Legend List cross-platform); SECURITY =
which-side-of-which-boundary (RSC CVEs are server-side not RN; device-trust must be server-verified; supply
chain is the real risk); DX = mechanize-your-invariants (CI gate on every PR + pre-commit; Biome unless need
ESLint plugins). Flipped all 5 → reviewed, set doc:, bumped updated:2026-06-25, ADDED sources: to LISTS +
DX (had none). **Now 14 reviewed / 20 drafted / 0 stub**; 14 long-form docs in encyclopedia/. YAML valid;
all reviewed have doc+sources; all 14 doc files on disk; no dup URLs. Remaining drafted (candidates for future
graduation): TYPESCRIPT, FORMS, COMPONENT-LIBS, ANIMATION, STORAGE, A11Y, I18N, CHARTS, OBSERVABILITY,
PAYMENTS, RN-VERSIONS, NATIVE-UI, KEYBOARD, MEDIA, EDITORS, BROWNFIELD, GAMES, ALT-FRAMEWORKS, ONDEVICE-AI, AI-UI.

**Organization/efficiency pass on the mentor mechanics (user request, 2026-06-25):** found the core
CORRECTNESS bug — the encyclopedia grew to 34 entries / 33 categories but the mentor's `assessment_dimensions`
only covered 12, so **21 categories were ORPHANED** (REACT-CORE, META-FRAMEWORKS, BUILD, MEDIA, DESKTOP,
PAYMENTS, EDITORS, CHARTS, I18N, STORAGE, OBSERVABILITY, KEYBOARD, etc. — the mentor literally couldn't
surface ~20 entries we'd built). FIX (in react-brain-mentor.yaml): (1) added 3 cross-cutting dimensions
DIM-REACT/DIM-BUILD/DIM-OBS (+ narrowed DIM-DX to the CI/lint feedback-loop so DIM-BUILD owns bundlers);
(2) added an `encyclopedia_awareness.capability_map` (18 entries: signal=detected dep/need → entry id) for
the conditional/feature domains — this is BOTH the correctness fix (every entry now reachable) AND the
efficiency win (niche domains scanned only when the project has that dep, not universally); (3) rewrote
phase_3_encyclopedia + discovery_order to use groups + dimensions + capability_map, fixed the stale "29
entries"→34, and deferred `reading` to the learning-path section only (keeps Phase 3 lean). Added a STATE
note to the encyclopedia.yaml header; bumped SKILL.md v0.1.0→0.2.0 + a current-state paragraph. VERIFIED via
script: both YAMLs parse, dims(15)∪capability_map(18) cover ALL 33 categories — **ORPHANS: NONE**; all
capability_map ids resolve. KEY LEARNING: when adding new encyclopedia entries/categories, wire each to a
reach path (cross-cutting → a DIM; feature-specific → a capability_map row) or it's invisible to the mentor —
re-run the orphan-check script after any new category.

**`react-brain doctor` seed built + run (user request, 2026-06-25):** the "make the encyclopedia EXECUTABLE"
idea, shipped as `tools/react-brain-doctor.mjs` (Node ESM, ~370 lines). Reads encyclopedia.yaml + a target
repo's package.json, maps ACTUAL deps → entries via an inline DETECTORS table (pkg-name → entry+label+rec-token;
production TODO = migrate into per-entry `detect:` fields), infers platform/stage/TS/CI, and prints per-app
"detected ecosystem choices + fit (✓aligned / ~contextual / ↗review) + gaps" plus a CROSS-APP MATRIX. YAML
loaded via a python3+pyyaml shim (needs `default=str` for unquoted dates; swap for `npm i yaml` later). Ran on
ledgerhr + ourpot — output is accurate and genuinely useful: ledgerhr (react/electron/mvp) flagged real gaps
TYPESCRIPT + DX/CI (matches the earlier mentor dry-run) and classic-Redux-vs-modern; ourpot (RN0.83/Expo/
production) flagged RN 0.83→0.86 upgrade + STATE gap (data via Holepunch P2P, correctly "may be N/A"); both
correctly contextualized brittle (Holepunch TAP) + esbuild/Metro as ↗review-but-fine. META-RESULT: the doctor
SURFACED A REAL ENCYCLOPEDIA GAP — RB-E-ANIMATION is RN-leaning and has no WEB default (framer-motion/Motion),
so ledgerhr's framer-motion showed ↗review; worth adding a web-animation clause to RB-E-ANIMATION. Stage
heuristic = score over {tests,ci,ts,lint,hooks,private,version≥1}. This is the project's first EXECUTABLE
artifact (corpus → analyzer); complements the LLM mentor (deterministic dep-scan vs judgment dims). NEXT if
wanted: migrate detectors into encyclopedia `detect:` fields, add to bitbarter, emit markdown/JSON, or wire as
a mentor Phase-0 accelerator.

**Evidence loop built + CLOSED end-to-end (user request, 2026-06-25):** the "code → knowledge" inverse of the
doctor. Refactored shared detection into `tools/detect.mjs` (ONE source of truth — doctor + evidence both import
it; no drift) and slimmed react-brain-doctor.mjs to import it. Built `tools/react-brain-evidence.mjs`: runs
detection across a CORPUS and emits §1 MISSING (deps→no entry, classified candidate/style-util/platform-feature/
infra), §2 CONTRADICTION (detected ≠ default), §3 EVIDENCE (paste-ready adoption per entry). Ran on
ledgerhr+ourpot+bitbarter (all Holepunch/Pear). REAL FINDINGS: §1 candidate blind spot = **react-native-svg**
(ourpot+bitbarter, no SVG/vector entry); §2 = ANIMATION/framer-motion (web gap), RN-VERSIONS 0.83 on ourpot+
bitbarter (vs 0.86), + Holepunch-context divergences (brittle/esbuild/Pear) = the corpus is mainstream-React-
centric and doesn't yet acknowledge the Holepunch/Pear/Bare stack the user's apps actually use. CLOSED THE LOOP
concretely: fixed RB-E-ANIMATION (was [react,react-native] but RN-only options/recommend) → added Motion/framer-
motion web option + web when-clause + provenance note; re-ran → ledgerhr ANIMATION flipped ↗review→✓aligned and
left §2. KEY DESIGN DECISION: evidence is DERIVED (regenerate via the tool), NOT pasted into the YAML (pasting
static evidence reintroduces the drift the loop exists to kill) — only CORRECTIONS (knowledge learned) get
written back. OPEN/surfaced-not-applied (judgment + thin 3-repo signal): add an SVG entry (or note); add
Holepunch-context when-clauses to TESTING/BUILD (brittle/esbuild are valid for Pear apps) so they stop false-
flagging; RN 0.83→0.86 upgrade is a real ourpot/bitbarter rec. Tools now: detect.mjs (core) + react-brain-
doctor.mjs (knowledge→code) + react-brain-evidence.mjs (code→knowledge).

**Taught the encyclopedia the Holepunch/Pear stack (user request, 2026-06-25; "we also have p2p holepunch
skill"):** acted on the evidence-loop finding that the corpus was mainstream-React-centric and treated the
user's actual P2P stack as a deviation. Created **RB-E-P2P** ("Peer-to-peer / local-first backend (Holepunch ·
Pear)", app-architecture, drafted/medium) — options Hypercore/Autobase/Hyperbee/Corestore/Hyperswarm-HyperDHT/
Hyperdrive/hrpc/Pear-Bare; recommend = serverless/local-first vs conventional client-server; **defer_to_skill:
holepunch-p2p-systems** (the existing depth skill); reading = docs.pears.com (verified). Cross-ref when-clauses
added to RB-E-DATA (P2P → data via Hypercore/Autobase, client cache N/A), RB-E-TESTING (brittle is idiomatic
for Holepunch/Bare), RB-E-BUILD (Pear → esbuild/bare-pack), RB-E-STORAGE (persistence = Hypercore log not
KV/SQLite), RB-E-DESKTOP (Pear backend → RB-E-P2P). Wired holepunch-p2p-systems into mentor `complements` +
added RB-E-P2P to `capability_map` (signal = holepunch deps). Taught the TOOLS too: detect.mjs maps hyper*/
autobase/corestore/hrpc/blind-pairing → RB-E-P2P (were ignored as infra); evidence.mjs IGNORE trimmed
accordingly. RESULT (verified by re-run): doctor shows ledgerhr **P2P: Autobase ✓ aligned** (recognized, not
ignored); evidence flipped brittle/esbuild/Pear ↗review→**~contextual** (acknowledged, not deviations); infra
count 36→24. Index now **35 entries** (14 reviewed / 21 drafted / 0 stub); YAML valid, no orphan categories,
no dup reading URLs, every entry has reading. Remaining genuine blind spot from the corpus: **react-native-svg**
(SVG/vector — ourpot+bitbarter, still no entry). PATTERN CONFIRMED: evidence loop finds a real gap → fix the
corpus (new entry + cross-refs + teach the detectors) → re-run proves recognition. Defer-to-skill is how the
encyclopedia absorbs a whole domain it shouldn't re-encode (holepunch-p2p-systems owns P2P depth).

**`react-brain pulse` built — the autonomy layer (user request, 2026-06-25):** capstone of the arc
snapshot→executable(doctor)→self-correcting(evidence)→**living(pulse)**. `tools/react-brain-pulse.mjs`
(imports detect.mjs) does 3 deterministic checks, PROPOSE-ONLY (never rewrites): §1 LINK HEALTH (fetch
every reading/source URL, classify ok/DEAD-404/blocked-403/unreachable, HEAD→GET fallback for bot-
protection), §2 STALENESS (`updated:` age vs --today, status/confidence-calibrated windows + undated-entry
list), §3 DRIFT (detect across repos → fingerprint → diff vs tools/.pulse-baseline.json; first run sets
baseline, later runs report app-stack deltas). RAN on ledgerhr+ourpot+bitbarter (--today=2026-06-25):
**105 URLs all OK (0 dead/0 blocked — network works here, GET-fallback clears the 403s agents hit
earlier)**; 22 dated / **13 undated** entries flagged (A11Y, AI-UI, ALT-FRAMEWORKS, BROWNFIELD, CHARTS,
COMPONENT-LIBS, FORMS, GAMES, I18N, OBSERVABILITY, ONDEVICE-AI, PAYMENTS, STORAGE — can't track their
rot); drift baseline established + diff-path confirmed ("no drift" on re-run). Did NOT auto-stamp the 13
undated (would falsely claim re-verification I didn't do — guardrail working). Part B = `tools/pulse-
routine.md` (the agentic weekly growth prompt: resume from last-processed issues → harvest+verify new
issues → run pulse+evidence → emit ONE reviewable delta → record) — ready to wire into /schedule (user
opt-in, billed). Added `tools/README.md` documenting the 4-file suite (detect/doctor/evidence/pulse).
KEY: pulse is propose-only (deterministic fixes auto-OK, knowledge changes reviewed) — autonomy keeps it
FRESH, the human-reviewed delta keeps it CORRECT. NEXT: wire /schedule.

**Closed the react-native-svg blind spot (user request, 2026-06-25):** the last open evidence-loop finding.
Verified the SVG/vector/icons landscape via 1 agent (primary sources): react-native-svg = de-facto RN SVG
primitive (Software Mansion, v15.x, RN 0.78+; underpins charts/icons); @shopify/react-native-skia renders SVG
w/ limits (no CSS/<text>/<animate>) + GPU custom drawing; react-native-svg-transformer (kristerkari) imports
.svg as components; ICON-LIB SHIFT verified — monolithic react-native-vector-icons SUPERSEDED by scoped
@react-native-vector-icons/* (v11+, codemod); lucide-react-native v1.x peer-deps react-native-svg; @expo/vector-
icons wraps react-native-vector-icons; web = native <svg>. Created **RB-E-SVG** ("SVG, vector graphics & icons
(React Native)", ui group, drafted/medium, defer react-native-best-practices) with verified sources + a verified
LogRocket reading. Wired: ui-group TOC, capability_map row, detect.mjs detectors (react-native-svg/-transformer/
lucide/@expo+@react-native-vector-icons → RB-E-SVG). RESULT: doctor shows ourpot **SVG ✓ aligned**; evidence §1
CANDIDATE BLIND SPOTS = **"(none — the corpus's selectable stack is fully covered)"**. Index now **36 entries**
(14 reviewed / 22 drafted / 0 stub), 0 undated, no orphan categories, pulse 131 URLs/0 dead. Full loop closed
again: evidence flags gap → verify → new entry + teach detectors → re-run proves zero blind spots.

**Adversarial validation layer built + run (user request, 2026-06-25):** the CORRECTNESS axis, completing the
quality trilogy — completeness (evidence) + freshness (pulse) + **correctness (challenge)**. Built
`tools/challenge-routine.md` (the challenger method + guardrails: default SURVIVES; OVERTURN requires concrete
current evidence beating the default on a stated axis = MP-VETTED-OVER-PROMOTION; propose-only; skeptic not
contrarian). Ran 5 parallel challenger agents on the highest-stakes reviewed entries — each steelmans the case
AGAINST the default, then fetch-verifies vs current reality + the field evidence. RESULT (all high-confidence,
sourced): 3 SURVIVES (STATE — nothing overtook Zustand, local-first builds ON Query; DATA — TanStack Query still
#1, RSC complements, Zero hit 1.0+RN June 2026; BUILD — Vite 8 stable + Rolldown GA, the Rust-compiler napi
pullback hits only that path not Rolldown-as-bundler), 2 WEAKENED→caveat applied (REACT-CORE — don't strip
existing useMemo when enabling Compiler [can change output], + 19.3 in active canary so re-verify "19.2";
NATIVE — Nitro is pre-1.0/v0.35.x/third-party/ships-breaking-changes so pin + Turbo Modules stay the stable
in-core option, + bridge interop fully removed in 0.85 not 0.84). ZERO overturns (no churn — the bar held).
Applied the 2 caveats to default/when, fixed the 0.85 date, and added an "Adversarially stress-tested 2026-06-25
(SURVIVES/caveat)" provenance line to all 5 notes — a survived challenge is a trust signal stronger than
editorial review. KEY: this tested JUDGMENT (is the recommendation right?), distinct from the dating pass which
tested FACTS (version numbers). Tools now 4 + 2 routines: detect/doctor/evidence/pulse + pulse-routine +
challenge-routine. Quality trilogy complete; the honest NEXT lever is DISTRIBUTION (npx / MCP) — ship the
now-stress-tested corpus — and/or wiring pulse+challenge into /schedule.

**Distribution + autonomy moves (user request, 2026-06-25):** MOVE 1 (distribution) — made the toolset an
npx-ready package: root `package.json` (name react-brain, bin react-brain→tools/cli.mjs, files = tools/ +
encyclopedia.yaml + encyclopedia/, dep `yaml ^2.8`, zero other deps) + `tools/cli.mjs` unified entry
(doctor/evidence/pulse delegate to the scripts; `query` is NEW + native — looks up an entry's recommendation;
help). Made detect.mjs's loadYaml distribution-safe: prefers the `yaml` npm package (via createRequire, so
consumers need zero setup) and FALLS BACK to the python3+pyyaml shim (so the repo's dev tools still run here
with no npm install). Added loadDoc(). Verified: `node tools/cli.mjs query state` / `doctor ../ledgerhr` /
help all work; package.json parses. So `npx react-brain doctor .` / `query "data fetching"` / `pulse .` are
ready (can't npm-publish from here — no creds — but it's publish-ready). MOVE 2 (autonomy) — `tools/upkeep-
routine.md` (combined weekly routine: Tier 1 deterministic pulse + Tier 2 agentic growth/evidence/rotating-
challenge, propose-only) + `tools/install-cron.sh` (idempotent Mon-09:00 local cron running `cli.mjs pulse`,
logs tools/pulse.log) + README CLI/autonomy sections. KEY HONEST CONSTRAINT: cloud `/schedule` CAN'T do this —
pulse/doctor are repo-local + the repo has NO git remote, so a cloud cron can't see the files or commit
proposals. The working hands-off path is a LOCAL cron (Tier 1, zero cost/LLM) + a local headless agent for
Tier 2. Cloud cron not viable (would fail — no repo access/remote).
LOCAL CRON NOW INSTALLED (user consented 2026-06-25): `bash tools/install-cron.sh` → weekly Mon-09:00
`crontab` entry running `cli.mjs pulse` → tools/pulse.log; entry bakes node+python3 dirs into PATH (cron's
PATH is minimal). VERIFIED it fires clean — ran the exact installed command with the restricted PATH, exit 0,
full pulse written to pulse.log. Remove with: crontab -l | grep -vF '# react-brain-pulse' | crontab -. Verified: exact weekly cron command runs clean (131 URLs/0 dead/0 undated/0 drift,
date +%F → 2026-06-25); install-cron.sh syntax OK. Tools now: detect/cli/doctor/evidence/pulse + pulse-/
challenge-/upkeep-routine + install-cron.sh + package.json. NEXT (if wanted): user runs `bash tools/install-
cron.sh` (or I install w/ consent); give the repo a git remote to unlock cloud /schedule + PR-based proposals;
an MCP server wrapper so agents query the corpus as a tool.

**Verification/dating pass on the 13 undated entries (user request, 2026-06-25):** did it HONESTLY (verify
facts, not blanket-stamp). A11Y dated directly (evergreen, no version claims). 12 parallel agents fetch-verified
each entry's load-bearing claims vs primary sources (npm registry JSON API + GitHub releases/raw — many npm.com
& callstack.com WebFetches 403'd, routed via registry.npmjs.org + GitHub API). Found 8 entries with REAL stale
facts (verification earned its keep, not rubber-stamp): COMPONENT-LIBS ("MUI 9 moved onto Base UI" overstated →
incremental adoption; MUI is v9); STORAGE (AsyncStorage v3 "NEW-ARCH-ONLY" WRONG → requires RN 0.76+; fixed
option+note); PAYMENTS (react-native-wallet is passes-only NOT tap-to-pay; react-native-iap now deprecated→
OpenIAP/expo-iap); ONDEVICE-AI (OCR since 0.3 not 0.4); ALT-FRAMEWORKS (Lynx scaffolder is create-rspeedy not
"Sparkling"; Valdi is beta/Nov-2025); BROWNFIELD (init API is ReactNativeBrownfield.shared.startReactNative
wrapping RCTReactNativeFactory; Brownie is iOS+Android stable v3.13, not iOS-only-alpha); GAMES (godot=@borndotcom,
wgpu→react-native-webgpu by Candillon on Dawn NOT SWMansion/JSI, game-engine unmaintained since 2020); FORMS
(Formisch pre-1.0). 4 verified clean (I18N, OBSERVABILITY [EAS Observe=open beta], CHARTS [all libs real, even
livechart], AI-UI). Applied all fixes + added verified primary `sources:` to each + set updated:2026-06-25.
Result: **35 entries, 0 undated, 31 with sources**; pulse §2 = 0 undated/0 aging. META-WIN: the pulse link-check
caught a DEAD link I introduced THIS session (nearform/victory-native-xl 404 → fixed to FormidableLabs/victory-
native-xl); final pulse = 128 URLs, 0 dead. The autonomy layer caught its author's mistake in real time.

**`react-brain learn` built — the Tutorial pillar, made adaptive (user request, 2026-06-25):** the
TUTORIAL pillar (was "not started" — the only unbuilt founding pillar) shipped not as static Diataxis
prose but as a COMPUTED, repo-personalized learning path = **(encyclopedia graph) × your repo** — the
insight being the corpus is the only machine-readable React knowledge base, so a curriculum can be
generated instead of authored. `tools/react-brain-learn.mjs` (imports detect.mjs; reuses the doctor's
gap/divergence/aligned classification): for each detected domain + each stage-appropriate gap it emits a
learning STEP (why-it-matters-to-YOU · the reviewed Explanation doc · canonical reading[0] · defer_to_skill ·
a concrete EXERCISE against the reader's own code). Ordered by the pedagogical spine (GROUP_ORDER:
foundations→architecture→ui→native→ops→ai), priced gap>revisit>consolidate, STAGE-CALIBRATED via a
STAGE_GAPS map (prototype surfaces only foundations; production adds security/observability/DX). No prereq
DAG exists in the YAML (cross-links live only in the long-form docs) — so the spine IS GROUP_ORDER, the
right call. KEY CORRECTNESS FIX during the build (mirrors the evidence-loop P2P finding): a `contextFor()`
layer honors the corpus's context-keying so a Holepunch/P2P repo isn't told it "lacks a server-cache lib"
(no remote to cache) — DATA-as-a-GAP → shown as `· n/a` (not silently dropped) with the N/A reason as its
lesson; DATA-DETECTED-in-a-P2P-app → soft caveat ("confirm not vestigial"); STATE → caveat that the
server-state half is handled by the sync layer. Wired into cli.mjs (`learn` command + help + examples),
package.json scripts, tools/README.md (5th tool: knowledge→human, completing the axis — doctor/repo,
evidence+pulse+challenge/corpus, **learn/HUMAN**), and the root README Tutorial row. VERIFIED on all 3
sibling repos: ourpot (RN/Expo/production/P2P → 19 steps, DATA correctly n/a, START HERE = STATE/STYLING/
SECURITY), ledgerhr (React/Electron/mvp, TS/CI/lint NO → 14 steps, START HERE = TYPESCRIPT/NAV/STATE,
matching the earlier doctor dry-run; its detected TanStack Query + P2P → soft "vestigial?" caveat),
bitbarter; flags work (`--stage=prototype` shrinks ledgerhr 14→13, `--full` widens 14→18). Tools now 5 +
3 routines. ANALYSIS that picked this over alternatives: every prior tool serves the corpus or the repo;
NOTHING served the person — learn fills the "teach" in the founding thesis. Next adjacent moves still open:
MCP server (agent-consumable), git remote (unlock cloud /schedule), migrate detectors into per-entry
`detect:` fields, emit markdown/JSON from learn (commit a LEARNING.md into a target repo).

**`react-brain stack` built — the greenfield composer / the missing FORWARD verb (user request, 2026-06-25):**
every prior tool is retrospective (reads an existing repo); `stack` answers the encyclopedia's headline verb
"what to use" at the one moment doctor can't — GREENFIELD, before any deps exist. Completes the user-facing
lifecycle **choose (stack) → assess (doctor) → master (learn)**. `tools/react-brain-stack.mjs`: intent flags
(`--rn`/`--web`/`--both`, `--expo`, `--p2p`, `--stage=`, plus `--graphql`/`--ssr`/`--marketing`/`--library`) →
(1) FILTER a curated RECIPE by platform+stage (core/mvp/production/scale tiers; feature domains like media/
payments/charts are demand-driven footer, NOT dumped), (2) RESOLVE each entry's context-keyed recommend.when
against the intent, (3) COHERENCE-check the picks as a set, (4) emit an install-ready explained stack +
`npm i`/`npx expo install` line. KEY ACCRETION: extracted the shared **`resolveRecommendation(entry, tokens)`**
primitive + **`pkgsForPick(entryId, pickText)`** (reverse of the DETECTORS table → real install names) INTO
detect.mjs (the core) — the system's missing "resolve the corpus against a context" primitive; doctor/learn
resolve against detected deps, stack against declared intent, all one core so they never disagree. The contextFor
P2P layer I built for learn was the seed of this.
DOGFOODING caught a cascade of substring-token bugs (the whole point of the exercise), all FIXED: (a) generic
'offline'/'local-first' tokens hit the non-P2P TanStack-DB clause before the P2P clause → P2P now keys on
specific terms only (p2p/holepunch/serverless/pear app/no-backend) so DATA correctly resolves to N/A; (b)
'new web' token hijacked the "new web CSS-in-JS → avoid…" CAVEAT clause → removed; (c) bare 'web' token mis-hit
"web+native shared styling"/"type-safe web SPA" → DROPPED ENTIRELY (web defaults are authored platform-aware
"Web:…RN:…", so falling through to default is correct — only RN keeps 'bare rn' because NAV genuinely keys on it);
(d) multi-platform default text lists BOTH platforms' libs → platform-purity filter (isRNpkg/isWebpkg) +
glob-patterns-aren't-installable (skip `*` detectors in pkgsForPick) + AVOID set (legacy react-native-vector-icons/
react-native-iap) + cut pkg-extraction at first ';' (drops "Vite; legacy→webpack" contrast tails); (e) coherence
false-positives from checking why-TEXT instead of resolved LABEL → all coherence checks now read picks[id].label.
VALIDATION (the compelling proof): `stack --rn --p2p` REPRODUCES ourpot's real idiomatic Holepunch stack —
Autobase, brittle, Metro, Expo, React Navigation, react-native-svg, Reanimated, AsyncStorage all MATCH doctor's
detected deps; deltas are genuine recs (add Zustand for client state; RN 0.83→0.86). `--web --p2p` matches
ledgerhr's Tailwind + esbuild(Pear) + React + Autobase. Wired into cli.mjs (stack first), package.json, tools/
README (stack section + lifecycle + arc), root README (NEW "Executable layer (CLI)" table — front door now shows
the 5 verbs). Tools now 6 (stack/doctor/evidence/pulse/learn + detect core) + 3 routines; all syntax-checked,
no regressions on query/doctor/learn. Honest LIMIT for future: per-domain "pick one" install noise where a
default lists alternatives (caveat'd, not perfectly singularized); --desktop flag would let ledgerhr-shaped
intents surface RB-E-DESKTOP (currently a feature-domain footer). Next adjacent: migrate detect tokens into
per-entry `detect:` fields; MCP server; git remote → cloud /schedule; `stack`/`learn` could emit committable
STACK.md/LEARNING.md.

**`react-brain calibrate` built — the CAPSTONE trust primitive / scored track record (user request, 2026-06-25):**
the 4th and deepest trust axis, completing completeness(evidence)+freshness(pulse)+correctness(challenge)+
**calibration(calibrate)**. The insight: the `confidence: high|medium|low` field was an ASSERTION, never a
measurement — nothing checked whether high-confidence calls actually hold. calibrate makes the encyclopedia
accountable to its own predictions (superforecasting/Tetlock applied to a knowledge base — a genuine first;
"a React encyclopedia that grades its own forecasts"). `tools/react-brain-calibrate.mjs` + an append-only
ledger **`tools/predictions.jsonl`** (ships as the credibility artifact; JSONL with `{k:'P',id,claim,confidence,
category,asserted,check_by}` predictions + `{k:'O',id,outcome,on,note}` resolutions). Commands: `--seed`
(one prediction/entry, idempotent — skips existing ids; check_by horizon = f(confidence): high 9mo/med 5mo/
low 3mo, MINUS 3 for FAST categories floor 2mo); `--record <id> <held|weakened|overturned> [note]` (append a
verdict — what challenge-routine now calls); default = the SCORECARD (per-tier resolved/held/weak/over + a
calibration score [held=1.0/weak=0.5/over=0.0] + qualitative read + a CHECK-DUE list of open predictions past
horizon → tells the autonomy layer what challenge should re-examine next). `--today=YYYY-MM-DD` for determinism
(like pulse). Exports `trackRecord()` so stack/doctor/learn can later show calibration-weighted confidence.
SEEDED + DOGFOODED: seeded 36 predictions, then recorded the 5 real challenge-pass verdicts (STATE/DATA/BUILD
held, REACT-CORE/NATIVE weakened) via --record. First scorecard (--today=2026-06-25): **high tier 5/11 resolved,
3 held + 2 weak, score 80% → "well-calibrated so far"; medium/low honestly "unproven — no resolved yet"**;
check-due empty at 2026-06-25, soonest = FAST/low entries at 2026-08-25 (correct: fast-moving low-conf get the
shortest leash). VERIFIED: idempotent re-seed (adds 0); advancing --today=2026-09-01 correctly flags the
2026-08-25 entries ⚠ overdue; default system-date run OK; ledger 41 lines (36+5). Wired: cli.mjs (calibrate
verb), package.json, tools/README (section + diagram + arc "accountable" stage + "four trust primitives
complete"), root README upkeep row, and **challenge-routine.md step 5 now appends each verdict to the ledger
(loop closed: every challenge leaves a permanent scored record)**. GOTCHA fixed: backticks around `confidence`
inside cli.mjs's backtick help-template broke it (SyntaxError) — removed. NOTE on testing: delegated cli verbs
exit 0 standalone but spuriously exit 1 inside a `for` loop under the Bash tool (execFileSync stdio:'inherit' ×
loop artifact, NOT a bug) — verify tools as separate statements, not loops. Tools now 7 (stack/doctor/evidence/
pulse/calibrate/learn + detect core) + 3 routines + predictions.jsonl.

**Track record surfaced INLINE (next-step, 2026-06-25):** moved `readLedger()`/`trackRecord()`/`TRACK_GLYPH`
into detect.mjs (the shared core — calibrate now imports them back, so consumer tools don't depend on the
calibrate tool; one source of truth) and wired calibration-weighted confidence into all 3 consumer tools:
**stack** annotates each pick (`… (reviewed·high) · track: ✓ held`), **doctor** added a `track` column to the
DETECTED table, **learn** tags each STEP header. Badge appears ONLY where a verdict is earned (the 5 resolved:
STATE/DATA/BUILD ✓held, REACT-CORE/NATIVE ~weakened) — unresolved entries show nothing (earned, not decorative).
Verified: all 5 tools syntax-clean, calibrate still works after the readLedger refactor, badges render in all 3
tools, read path doesn't mutate the ledger (still 41 lines), all verbs exit 0 standalone. The confidence field
is now empirically grounded AND visible at the point of recommendation. Next adjacent: MCP; git remote → cloud
/schedule; migrate detect tokens into per-entry `detect:` fields.

**`react-brain signals` built — the EMPIRICAL/EXTERNAL trust anchor (user request, 2026-06-25):** the insight
that closed the last trust gap — every prior primitive is SELF-REFEREED (evidence=3 repos, challenge=LLM vs
itself, calibrate=scoring its own verdicts, pulse=link liveness); signals is the one check against the OUTSIDE
WORLD (live npm), turning editorial opinion → evidence. Also automates the quantitative half of the manual
verification passes (download volume, last-publish, "actually in maintenance?") — zero LLM. `tools/react-brain-
signals.mjs`: resolves each entry's options→npm packages via a NEW core helper `entryPackages(entryId)` (exact-name
detectors only; reuses DETECTORS), fetches weekly downloads + last-publish, raises 3 flags — **TRAILING** (default
out-downloaded ≥2× by an alternative → popularity-vs-fit note), **STALE** (a recommended default silent >12mo),
**CLAIM** (entry text says maintenance/deprecated within ~70 chars of a lib's label, but it published ≤6mo ago).
Writes `tools/.signals-baseline.json` for ↑/↓ download trends next run (pulse pattern). Flags: `--list` (resolve
only, no network), `--no-registry` (downloads only), `--today=`. FIRST LIVE RUN (genuinely valuable, 26 entries,
8 flags): **CLAIM styled-components** "maintenance" but published days ago (the killer catch — the maintainer had
ALREADY manually nuanced this to "v6.3 RSC, else maintenance"; signals re-derived it automatically); STALE moti
17mo / victory 17mo / d3 2y / react-native-keychain 15mo; TRAILING TanStack Router<react-router, react-window<
react-virtual, autobase<corestore. All defensible, hedged ("verify"), propose-only. KEY BUILD LESSONS: (1) the
npm downloads point-API RATE-LIMITS bursts — 122 rapid individual calls nulled the later half (only 11/26 entries
rendered) → FIXED with the BULK endpoint (`point/last-week/p1,p2,…` ≤128 unscoped pkgs/call) + concurrency-4 +
1-retry for scoped; now 26/26. (2) running signals 3× in one shell block self-trips the rate limit → run ONCE.
(3) Added a COVERAGE line (downloads X/122 · last-publish Y/65, ⚠ partial if short) — honesty, no silent partial.
ALSO fixed a shared-core precision bug surfaced by --list: pkgsForPick head-matching ("brittle") wrongly matched
shared scope head "tanstack" across ALL @tanstack/* siblings (react-db falsely marked a DATA default) → now
head-matches only UNIQUE heads (HEAD_FREQ===1 precomputed); this also tightened stack's install lines. Wired:
cli (signals verb), package.json, tools/README (diagram + section + npx + arc "empirical grounding" 5th primitive),
root README upkeep row, challenge-routine ("what to challenge next" = signals flags + calibrate check-due = a
prioritized queue, no longer a guess). Tools now 8 (stack/doctor/evidence/pulse/calibrate/signals/learn + detect
core) + 3 routines + 2 ledgers (predictions.jsonl, .signals-baseline.json). All syntax-clean, regression green.
GitHub stars/last-commit as a 2nd health axis; MCP; git remote → cloud /schedule.

**signals → calibrate loop CLOSED (next-step, 2026-06-25):** signals now turns a confirmed CLAIM (corpus says
maintenance, npm says freshly published — a hard deterministic contradiction) into a `weakened` calibration
verdict. `signals --record` appends `{k:'O',id,outcome:'weakened',on,note:'signals: <pkg> published <age> ago vs
a maintenance/deprecated claim'}` to predictions.jsonl. DESIGN per project ethos: PROPOSE-ONLY by default (prints
the proposed verdict; knowledge changes are reviewed), `--record` opts in to apply; CLAIM-ONLY (TRAILING/STALE are
softer "verify" prompts, never auto-recorded); IDEMPOTENT (skips ids already weakened-by-signals via readLedger
check on note-prefix "signals:"). VERIFIED end-to-end: propose run showed "STYLING → weakened (styled-components
fresh vs maintenance claim)" + left ledger at 41; `--record` appended (41→42); `calibrate` now shows STYLING in
RESOLVED and **the medium tier moved 0→1/17 resolved, score 50% — its first empirical data point, sourced from
live npm not human judgment**; 2nd --record run = "all already recorded, nothing to add" (idempotent, stays 42);
the verdict surfaces inline (`track: ~ weakened`) in learn ../ourpot STYLING step. FULL CHAIN now live: signals
(live npm) → --record → predictions.jsonl → calibrate (scored) → trackRecord() → inline in stack/doctor/learn.
Wired cli help (--record), tools/README signals section ("Closing the loop into calibrate"). Ledger now 42 (36
predictions + 6 outcomes = 5 challenge + 1 signals); the STYLING verdict is a REAL finding (kept, not test
pollution — styled-components genuinely shipped vs the blanket maintenance claim; matches the maintainer's own
earlier manual "v6.3 RSC, else maintenance" nuance). All 8 tools syntax-clean, regression green. Next adjacent:
GitHub health axis (stars/last-commit); MCP; git remote → cloud /schedule; wire signals --record into upkeep-routine.

**RN Rewind "A Rust replacement for Metro…" issue (slug-titled, ~#47, processed 2026-06-30):** ONE durable add —
**Rollipop** (leegeunhyeok/rollipop, rollipop.dev) = a Metro replacement **powered by Rolldown** (the Vite team's
Rust bundler), Yarn-PnP-by-default + dev dashboard, **bare-RN-CLI-only / no Expo**, **early-alpha per its repo** →
added as an option + a when-clause + a note line to **RB-E-BUILD** (the RN-side arrival of the Rolldown/Rust wave
that's already the web default via Vite 8). Entry stays reviewed/high; bumped updated→2026-06-30; header source
count RN-Rewind ×46→×47. VERIFIED vs the GitHub repo (rollipop.dev 403'd WebFetch → repo confirmed Rolldown-powered
+ "under development (early alpha stage)"). SKIPPED per the no-padding discipline (no durable selection value):
PolyCSS (3D meshes rendered from `<b>/<u>/<i>` tags via matrix3d — a novelty hack), expo-paperkit (a single niche
Expo wrapper of Apple's PaperKit/PencilKit markup canvas, iOS 26+ — no competing-option domain → not an entry),
the Fire-TV/Vega-OS aside + Chain React 2026 (an event, not a selection fact). Re-confirms the standing LEARNING:
a single newsletter issue yields ~one gap-filling/option add, not broad change. (Fetch hallucinated issue "#4729";
real number unconfirmed — last processed was #46, so this reads as the next weekly ~#47.)

**React Status #480 (processed 2026-06-30):** corroboration-heavy, as the standing LEARNING predicts for React Status.
ONE durable add — **Next.js 16.3 "Instant Navigations"** (nextjs.org, Andrew Clark + Josh Story, **16.3 Preview**:
Cache Components + per-route Stream/Cache/Block + **Partial Prefetching** = one reusable per-route *shell* instead of
a prefetch-per-link; `instant()` Playwright helper; Navigation Inspector) → added to **RB-E-META-FRAMEWORKS** reading
because it covers the RSC-navigation-PERF facet the other 4 META readings don't (RSC-as-protocol / RSC-in-TanStack /
off-Next migration / use-client). Annotated "(16.3 Preview, not GA)". META updated→2026-06-30; header React Status
×20→×21. VERIFIED vs the Next.js blog (real; Preview; gated behind cacheComponents/partialPrefetching flags).
EVERYTHING ELSE = dupe or already-covered: Linear→StyleX (STYLING reading), Writing Custom Renderers (REACT-CORE
reading), Margelo video-call (MEDIA seed), Vercel Eve (AI-UI note), TinyBase 8.5 / Reanimated 4.5 / Mantine 9.4 /
MUI v9 / RedwoodSDK 1.5 / Recharts 3.9 / npm 12 (already options/notes), the Rolldown↔React-Compiler napi PULLBACK
(already a BUILD + REACT-CORE caveat — #480 independently re-confirms it). Checked-then-skipped, no gap: Recharts 3.9
(CHARTS already lists Recharts), Vite 8.1 bundled-dev-mode (BUILD already cites the Vite 8 post; point release),
Waku "Slices" (beta/niche), Takumi 2.0 / ForesightJS 4 / cnfast / ReactUse 1.0 / React-Admin 5.15 (niche single
utilities — no domain, no competing-option axis), CSS-Quake (novelty hack like last issue's PolyCSS), atproto essays +
"Dan Abramov joins Next.js" (off-topic / people-news). Net: META reading 4→5; index otherwise unchanged at 36 entries.

**React Digest #2310 ("Component communication patterns", processed 2026-06-30):** article/depth-driven, as RD always
runs. ONE durable add — **Neciu Dan "Component Communication Patterns in React Applications"** (neciudan.dev, VERIFIED
substantive) → **RB-E-STATE** reading: a how-to-CHOOSE decision framework keyed by component-proximity × data-type
(props → lifting/composition → context for slow globals → Zustand for frequent client state → TanStack Query for
server data → URL for view state → events for fire-and-forget) that operationalizes STATE's server-vs-client-vs-view
split; complements STATE's 3 existing readings, none of which is the cross-mechanism *decision procedure*. STATE reading
3→4, updated→2026-06-30; header React Digest ×14→×15. **EXCLUDED per no-unverified-URL rule:** Long Ho "RSC Server
Functions are not an API boundary" (longho.dev — re-confirmed JS-SHELL / no body, same block as the prior React Status
pass; genuinely valuable RSC rolling-deploy footgun [compiler-generated fn IDs silently drift across deploys → break old
clients → treat stable server functions as formal API boundaries]; would land in SECURITY/REACT-CORE — RECHECK with a
JS-capable fetcher). DEPTH→skills (not index): Jay Freestone module-level DI (engineering-principles), Oren Farhi
hooks→Zustand 3-min how-to, sethi.io React-perf piece. CORROBORATION (already covered): React Router v8 GA release
(NAV already records v8 released; the article adds min Node22/React19/Vite7 — left as-is, not recommendation-changing),
TanStack Table v9 memory (already seen in #480). OFF-AXIS CSS craft (not library selection): Una Kravets
light-dark()/contrast-color()/style-queries theming, Andy Bell CSS list-customising. Re-confirms the standing LEARNING:
RD = corroboration + depth; durable yield ≈ one on-axis decision-guide reading. (Fetch mis-numbered the issue "#563";
slug = 2310, last RD processed ~#2305.)

**LEDGER BACK-FILL — TWiR #288 (applied 2026-07-02, recorded 2026-07-06):** a 2026-07-02 session harvested
This Week in React #288 into the YAML but never recorded it here (found by evidence: header TWiR ×22 + entries
dated 2026-07-02). What it applied: Astryx (Meta design system, React+StyleX, 150+ components) → COMPONENT-LIBS
option + note; Neciu Dan "Different Hydration and Rendering Strategies" → META-FRAMEWORKS reading; NodeSource
"Blocking Install Scripts Is Not a Silver Bullet" → SECURITY reading; VSCode "Iterating Faster with TS 7" →
TYPESCRIPT reading; Vinext → META option; Expo SDK 57 = RN 0.86 → RN-VERSIONS note+source. NOTE the repo now
lives at `~/odd-jobs/heartit/skills/react-brain` (moved from react-brain/) — sessions there use a DIFFERENT
project memory dir; a pointer memory now exists there referencing this ledger. ALWAYS append the dated note
(step 6 of upkeep) — this gap almost caused a double-harvest of #288.

**React Status #481 + React Digest #2316 (processed 2026-07-06):** RD #2316's featured article WAS TWiR #288's
Neciu Dan hydration piece (already in META reading) — RD pass = pure corroboration beyond it, count ×15→×16.
#481 yielded the real delta (count ×21→×22): (1) NEW ENTRY **RB-E-MAPS** ("Maps & geolocation UI", ui group,
drafted/low) — TWO independent signals in one week (react-native-better-maps 1.0 Nitro/New-Arch via #288 +
mapcn MapLibre/shadcn-style via #481) exposed maps as an uncovered common need; options react-native-maps 1.29 /
expo-maps (ALPHA, verified vs Expo docs) / @rnmapbox/maps 10.3 / @maplibre/maplibre-react-native 11.3 /
better-maps 1.0 / web react-map-gl+react-leaflet+mapcn, all versions verified vs npm; durable axis = TILE/SDK
PROVIDER (Google-billing vs Mapbox-commercial vs MapLibre+open-tiles), not the wrapper; reading = PkgPulse
3-way comparison (team-authored but substantive — pricing math, offline-API table; fetch-verified). Fully
wired: ui TOC + capability_map row + 7 detect.mjs detectors + stack FEATURE_DOMAINS footer + calibrate --seed
(ledger 43); doctor fixture-verified (react-native-maps+@rnmapbox → MAPS ✓ aligned); orphan check = NONE (37
entries = 14 reviewed / 23 drafted). (2) **Rust React Compiler LANDED**: merged into SWC, ships via Rspack
2.1's built-in loader, 7–13x the Babel plugin (verified vs rspack.rs blog) → REACT-CORE "Rust port WIP" note
rewritten + BUILD note UPDATE line (Rolldown's napi pullback = a Rolldown-integration choice, not a dead port);
rspack blog added as REACT-CORE source. (3) 3perf/Ivan Akulov "Hidden Cost of Hydration Mismatches" (verified
substantive: mismatch → DOM recreate → font-swap → LCP re-trigger) → **OBSERVABILITY** reading (fills its web
gap; META already at 6 readings, cap discipline held) cross-ref'd to META. (4) shadcn 2026-06 chat components +
first headless **@shadcn/react** package → COMPONENT-LIBS shadcn option row + changelog source; "How Astryx
Works" added as Astryx source (confirms 150+ components — React Status's "160+" was WRONG, YAML kept correct).
(5) Fact refreshes: TinyBase 8→9 (DATA), Nitro 0.35.x→0.36.x (NATIVE), both vs npm. Skipped as
dupe/point-release/niche: Storybook-for-TanStack, Next 16.3 Turbopack/AI posts, Vercel Services, Sentry-OTel
how-to, LogRocket compiler-memoization (corroborates existing caveat), termcn, mapcn-as-reading, React Icons
5.7, Ant 6.5, Downshift 9.4, RR 8.1, MUI 9.2, VisionCamera 5.1, Legend List 3.2/3.3, Hermes point release,
master.dev workshop. Header updated 2026-07-06; entry-count refs in mentor yaml fixed 34→37 (were stale even
before MAPS — actual was 36). Index: **37 entries (14 reviewed / 23 drafted / 0 stub)**, all with reading.

**MAINTAINABILITY/SCALE REFACTOR (2026-07-06, user approved "go ahead with your sequence"):** the repo
(now at `~/odd-jobs/heartit/skills/react-brain`) is UNDER GIT (8 commits, no remote yet) and restructured:
(1) **SPLIT** — encyclopedia.yaml is now a 107-line INDEX (meta + groups TOC + mentor_hints); the 37 entries
live ONE-PER-FILE in `skills/react-brain-mentor/entries/<ID>.yaml` (text-preserving migration, comments
intact; loadDoc() globs + orders by TOC, cached, monolith back-compat; python fallback batched to one spawn;
`yaml` npm dep now installed). Parity proven: 37/37 content-identical + all tool outputs byte-identical.
(2) **detect: PER ENTRY** — the inline DETECTORS table moved into each entry (158 rows / 28 entries;
detect.mjs assembles from loadDoc; adding an entry touches NO tool). (3) **`react-brain lint`** — mechanized
invariants (schema, enums, reviewed⇒doc+sources, every-entry-has-reading, TOC, ORPHAN-category check vs
dims∪capability_map, detect-pkg uniqueness, within-list dup URLs, stale count claims). First run caught a
REAL bug: RB-E-NAV had a caveat in recommend.when without '→' (dead to the resolver) — fixed. Reading∩sources
overlap within an entry is LEGAL (canonical deep-dive doubling as fact source). (4) **detect_source: PER
ENTRY** — new scanSourceSignals engine (regex over repo source; platform/stage/unless_dep gating; absent-
rules); 8 v1 rules on 7 entries (ScrollView+map, useNativeDriver:false, AsyncStorage-secrets,
dangerouslySetInnerHTML, fetch-in-useEffect, createContext≥5files, no-error-boundary@production,
KeyboardAvoidingView). Doctor gained SOURCE SIGNALS section + **--json** (mentor Phase 0 now treats it as
ground truth — protocol updated). Real finding on ledgerhr: dangerouslySetInnerHTML ×4. (5) **MCP server** —
tools/mcp-server.mjs, ZERO-DEP hand-rolled stdio JSON-RPC (no SDK); tools: capsules (compact index — the
token-efficient entry point) / query / recommend / doctor / stack; .mcp.json registers for Claude Code;
protocol verified by piping. searchEntries extracted to detect.mjs (CLI query + MCP share the scorer).
(6) **EVAL HARNESS** — tests/fixtures {rn-smells, web-clean, p2p-pear, prod-no-boundary} + tests/eval.mjs
(33 assertions: detection/fit/signals/stage/absent-rule/search-routing/resolveRecommendation(p2p→n/a)/
stack/MCP handshake); `npm test` = lint + eval, all green. (7) FIXED: the installed weekly pulse cron was
SILENTLY BROKEN since the repo moved (old path gone) — reinstalled via install-cron.sh with corrected paths
(../../ledgerhr ../../ourpot/ourpot ../../bitbarter — ourpot nests its app dir). Routines updated (entry-file
edits, npm-test gate, commit step). package.json v0.3.0, `files` fixed to ship the whole mentor dir
(modern-defaults.yaml was MISSING from the published set before — publish bug). npm pack verified (77 files).
NOT DONE (outward-facing, needs user): push to a GitHub remote; npm publish. UPKEEP PROCESS CHANGE: edit
entries/<ID>.yaml (never a monolith), run `npm test` after any corpus edit, commit; new entry = file + TOC
slot + detect rows in-file + calibrate --seed.

**RN Rewind ~#48 ("zoomable calendar grids / Gemini Nano / gothic theme", processed 2026-07-07):** the
gothic-theme item = Astryx (already in COMPONENT-LIBS — pure corroboration, incl. its CLI+MCP fact).
THREE durable adds, all fetch-verified: (1) NEW ENTRY **RB-E-CALENDARS** (ui, drafted/low) — Super Calendar's
SECOND signal (skipped as niche at TWiR #288, then headlined Rewind) tipped it, per the MAPS precedent;
axis = picker/marking (react-native-calendars 1.1314, flash-calendar 2.0 FlashList-windowed) vs EVENT GRIDS
(@super-calendar/native 2.1.5 on Reanimated4+GH+LegendList, @super-calendar/dom web; react-big-calendar 1.20
web); reading = super-calendar docs; fully wired (TOC/capability_map/detect-in-entry/FEATURE_DOMAINS/seed →
ledger 38). (2) ONDEVICE-AI += **@react-native-ai/adk 0.12** (Gemini on Android via ADK — on-device Nano +
cloud, AI-SDK provider; the Android counterpart to the Apple provider). (3) TESTING += **Maestro MCP**
(agents drive simulators/devices + generate E2E flows; docs.maestro.dev verified). Index **38 entries**
(14 reviewed / 24 drafted); header Rewind ×48. NOTE the fetcher hallucinated issue "#4806" — slug-titled,
counted as ~#48. Post-refactor process worked cleanly: entry file + in-file detect rows + lint/eval gate
(50/50) + site page auto-generated (52 pages).

**NEW 5TH SOURCE — Native Weekly ×6 (nativeweekly.com → nativeweekly.beehiiv.com, issues 11–16 = all of
2026 Jan–Jun, processed 2026-07-09):** RN-only, by Adnan Sahinovic (Callstack/Margelo/SWM/Expo-heavy;
NOTE he also authors rnsec — watch self-promotion). First-harvest yield was BIG (new-source effect):
TWO new entries — **RB-E-OTA** (gap: no OTA/CodePush/EAS-Update coverage anywhere; CodePush service
retired 2025-03-31 verified, EAS bsdiff bytecode diffing ~75% smaller verified vs SDK-55 changelog,
hot-updater self-hosted, standalone code-push-server) and **RB-E-AI-DEVTOOLS** (the source's dominant
theme — EVERY issue shipped agent tooling: Callstack agent-skills 1.5k★ + Margelo react-native-skills +
agent-device ×3 + Argent + Reactotron-MCP core-server 3.3 + Expo AI tooling; reading = Argent intro,
fetch-verified; defer agentic-engineering-patterns; TESTING keeps Maestro-MCP/Argent/Radon ownership).
THREE verified status flips: Expo Router v56 DECOUPLED from React Navigation; @expo/vector-icons
DEPRECATED SDK 56 → scoped @react-native-vector-icons/* (SVG updated); expo-av deprecated/removed →
expo-video+expo-audio (MEDIA) — all vs expo.dev/changelog/sdk-55+56 (changelogs FETCH FINE; expo.dev/blog
still JS-shell unfetchable). Option adds: react-native-enriched + enriched-markdown (EDITORS now
[react,react-native] — SWM, ×4 issues), react-native-harness (TESTING, Callstack on-device Jest-style),
facetpack (BUILD, OXC Metro transforms, @ecrindigital/facetpack, ×2 issues), react-native-graph v1.2
reboot after 2y dormancy (CHARTS), react-native-nitro-mlx (ONDEVICE-AI, iOS 26+). Reading adds: Vercel
v0 iOS case study (NATIVE-UI; vercel.com FETCHES now) — plus NATIVE note gains SDK-56 Swift↔JSI direct
interop. Index **40 entries** (14 reviewed / 26 drafted); header sources_digested += "Native Weekly ×6";
calibrate seeded (predictions.jsonl now 40 P + 6 O = 46 lines); lint clean,
eval 50/50, committed. EXCLUDED per no-unverified-URL: callstack.com deep-links+auth (403 again),
Beto best-Claude-skills (paywalled/thin), expo.dev/blog posts (JS-shell), Red Shift medium (redirect wall).
SKIPPED-as-corroboration: RN 0.84/Expo 55-56/State-of-RN-80%/RNav-8-alpha/Voltra/expo-widgets/Brownie/
MapLibre-11/Uniwind/RNRepo/Radon/GH-3.0/worklets (corpus already had them — the 4 other sources had
covered almost every headline; Native Weekly's UNIQUE value = the agentic-DX beat + SWM/Callstack
release granularity). GAP CANDIDATES flagged, not created (single/weak signals — create on 2nd source):
RN networking layer (nitro-fetch ×2 + expo/fetch global default SDK 56), AR/VR (ReactVision),
splash screens (bootsplash 7), toasts (sonner-native), haptics (tickle), image lightbox (galeria 2),
RN security scanner (rnsec 1.0 — author's own tool). Native Weekly is ~6-weekly not weekly; next
pass resumes AFTER issue #16 (Jun 30, 2026).

**GAP-FILL + SMARTER-HARVEST PASS (user: "improve gaps and update react-brain to be more smart",
2026-07-09, same session as the Native Weekly harvest):** promoted the flagged gap candidates after
fresh landscape verification. NEW ENTRIES (→ 42 total = 14 reviewed / 28 drafted):
**RB-E-NETWORKING** (app-architecture; fetch / expo-fetch-global-SDK56 / nitro-fetch (Cronet+URLSession,
HTTP/3, 908★, ~1.3x vendor bench) / axios-don't-churn / ky+ofetch; cross-refs DATA ("the cache is the
bigger win") + AI-UI (streaming) + P2P (no HTTP layer); reading = nitro-fetch README; detect axios/ky/
ofetch/nitro-fetch + XHR detect_source rule) and **RB-E-POLISH** (ui; ONE combined entry for 4
micro-domains, deliberately not 4 entries: toasts sonner-native/toast-message/burnt · haptics
expo-haptics/haptic-feedback · splash bootsplash-7/expo-splash-screen · lightbox galeria-3/
image-viewing-dormant-2022; reading = Emil Kowalski "Building a toast component" (verified, the sonner
design rationale); react-native-tickle still not on npm → skipped). **GAMES broadened** to "Games, 3D &
AR/VR": ReactVision @reactvision/react-viro 2.57 (maintained Viro, Fabric REQUIRED, published 2026-07) +
react-native-visionos (Callstack fork 1.1k★ — CAVEAT pinned to RN 0.78/2025-03, lags core ~1yr) +
@react-three/fiber v9 (+first detect block for GAMES). **rnsec VETTED + ADDED** to SECURITY (494★,
63 rules/13 categories — grown from the newsletter's "16 rules", CI-ready w/ exit codes+PR comments;
single-author = Native Weekly's author → explicit PROVENANCE note in the entry; "treat findings as
leads"). PROCESS UPGRADES (the "smarter" half): (1) **`watching:` optional A/V field** — same shape as
reading, lint-validated, pulse now link-checks it; policy = verify the episode/video PAGE + corroboration,
never annotate unwatched content; seeded RNR-351-Nitro-Rousavy → NATIVE, v0-iOS video → NATIVE-UI;
documented in encyclopedia header + a mentor_hint. (2) **FETCH-FALLBACK PLAYBOOK** in upkeep-routine.md
+ pulse-routine.md: expo.dev/blog = JS shell but expo.dev/changelog/sdk-NN FETCHES; WebFetch-403 ≠
paywall — retry `curl -sL -A "Mozilla/5.0…"` (this RECOVERED callstack.com: the Satyajit Sahoo
deep-links+auth article is now a NAV reading after full-body verification — previously excluded twice);
registry.npmjs.org JSON for version/deprecation facts; exclude only after both fetchers fail. Routines
also now list Native Weekly as the 5th source. Wiring: TOC (app-architecture 9, ui 12), capability_map
+2 rows + GAMES signal update, FEATURE_DOMAINS +networking/+polish/games→games-3D-AR-VR, mentor "all 42",
calibrate seeded (44 P + 6 O). npm test green (42 entries · 197 detect patterns · eval 50/50), committed.
Remaining candidates left on the bench (weak signals): dedicated AR/VR entry if it outgrows GAMES,
BridgeJS/Wasm (off-axis), Expo AI Chatbot template, nitro-markdown, native-html/render.

**NEW 6TH SOURCE — React Weekly ×20 (react-weekly.dev, issues #8–27 = 2026-02-22→07-05, processed
2026-07-10):** web+RN generalist, weekly Sundays, TanStack-heavy. ACCESS: site + issue pages are a
client-rendered JS shell and api.react-weekly.dev is auth-gated — but **/rss.xml carries FULL issue
bodies in content:encoded** (window = latest 20; extract with the python HTML→text converter to
scratchpad files). Issues #1–7 UNREACHABLE (no Medium mirror either) — permanent coverage note.
METHOD (worked well): 4 parallel curation agents over local issue texts, each grep-deduping vs
entries/ + fetch-verifying keepers with the playbook (they recovered every callstack.com 403 via
curl-UA; longho.dev via its RSS feed — closing the ledger's 2× "RECHECK longho" TODO; expo.dev blog
bodies via embedded Sanity JSON; caught 1 fabrication: "react-stinky" not on npm). ~130 items → 43
agent-keeps → curated delta across 18 entries (NO new entries; caps held: skipped Aha!-RSC reading
[META at 7], TanStack-Table-v9-memory [LISTS at 5], TanStack Hotkeys [KEYBOARD identity mismatch —
"web hotkeys" = bench candidate, promote on 2nd signal]). HEADLINES: TanStack AI → AI-UI option
(×3 signals; first real Vercel-AI-SDK alternative; @tanstack/ai 0.40); react-native-windows/-macos →
DESKTOP (entry was structurally web-shell-only; rn-macos lags caveat); react-test-renderer DEPRECATED
→ TESTING note (RNTL v14 runs mdjastrzebski/test-renderer, host-elements-only — the WHY behind role
queries); Xcode-26 App-Store floor since 2026-04-28 → RN-VERSIONS; Next Adapter API STABLE 16.2 +
Start-RSC-experimental + Rsbuild-2 + Lovable-defaults-to-Start → META; RN on Meta Quest first-party
(expo-horizon-core) → GAMES; Expo Updates in ISOLATED BROWNFIELD since SDK 55 → BROWNFIELD flip +
OTA when-clause; DeepSec (Vercel Labs, findings-not-fixes — agent CORRECTED the newsletter's claim)
+ TanStack-compromise postmortem + Vercel-April-2026 incident → SECURITY; react-doctor 13.5k★ → DX;
react-native-screen-transitions + react-native-ease promoted w/ author-runs-the-benchmark caveat →
ANIMATION; @callstack/inspector v0.1 → OBSERVABILITY; TanStack Intent + RN Evals + Expo Agent →
AI-DEVTOOLS; Expensify agent-device case study reading; TkDodo ×3 readings (query-abstractions,
router-and-query, test-ids-a11y); VisionCamera-v5 what's-new reading (reversed the old "feature
announcement" skip — it's the creator's canonical v5 reference); 2nd watching item (Beto RN-builds
video → BUILD). Header: sources_digested += "React Weekly ×20" (6 newsletters now). 42 entries ·
205 detect patterns · 117 readings; npm test green; committed + pushed (CI). NEXT React Weekly pass
resumes AFTER #27 (2026-07-05); RSS window is 20 — don't let the backlog exceed it again.

**TWiR #289 (processed 2026-07-10, same session; count ×22→×23):** news-dense issue, 11 keeps.
HEADLINE FLIPS (all fetch-verified): **TypeScript 7.0 STABLE** (npm latest = 7.0.2, 2026-07-08 —
the corpus's "RC, stable ~weeks" prediction resolved on schedule; TYPESCRIPT option/when/note
rewritten, npm source added); **shadcn 4.13 makes Base UI the DEFAULT headless layer** ("Base UI
is the default component library in shadcn/ui", Radix explicitly not deprecated — verified vs the
changelog; COMPONENT-LIBS rows + note updated); **RN 0.87.0-rc.0** (verified vs npm `next` tag;
cleanup release row added to RN-VERSIONS marked RC-verify-at-stable + a migration when-clause).
Also: SWM **KMP-vs-RN controlled benchmark** → ALT-FRAMEWORKS reading + KMP row numbers (8x
smaller/2-4x startup Android; iOS converges w/ RN 3-4x less RAM — credible because an RN shop
published it); RN Navigation 8 **July progress** → NAV note (Suspense nav, UNSTABLE_loader,
Standard Navigation API = first bridge across the decoupled Expo-Router/React-Navigation stacks;
still pre-stable); Vinext 1.0.0-beta (npm) → META row soften-but-caveat; **nuqs staged-publishing**
(draft→2FA→finalize + tarball-hash reproduction, post-TanStack) → SECURITY note 3rd supply-chain
layer; **react-native-audio-api 0.13 stable <Audio/>** → MEDIA option+detect (heartit-relevant,
rt-audio cross-ref); Argent 0.15 multi-platform/cloud/Lens → AI-DEVTOOLS row; Re.Pack
MF-worth-it criterion + brownfield 39%-faster-XCFramework fact (callstack, UA-curl). SKIPPED w/
note: performance.dev ChatGPT-stack reverse-engineering (strong but no cap room — runner-up),
LogRocket compiler piece (2nd-time skip, corroborates existing caveat), Sniffler/Tapflow/Iso/
Nitro-Vision-Kit/Paper-Shaders/Formity/react-google-maps (1-signal bench), ES2026/HTTP-QUERY
(off-taxonomy), Vite+ beta (VoidZero unified toolchain — WATCH, likely a future BUILD fact),
3 interview videos (watching stays curated; Rousavy already concentrated in NATIVE watching).
42 entries · 206 detect · 118 readings; test green; committed+pushed ee8bb22.

**QUALITY/ANALYSIS PASS (user: "analyze current state and improve — correctness/organized/efficient/
clean/suggest", 2026-07-10):** ran ALL instruments: pulse (221 URLs, 0 dead, 3 blocked-medium known,
2 "unreachable" that were BOT-GATING — 200 w/ browser UA), signals (13 flags), calibrate (high 80%,
5/11 resolved; medium 1/19; low 0/12; nothing overdue, next check-due 2026-08-25 ×5), lint+eval green.
INSTRUMENT FIXES: (1) signals RETIRED-GUARD — detect labels containing retired/deprecated/legacy/
dormant/superseded are the corpus's own verdict → excluded from default-candidacy, STALE flags, and
TRAILING comparators (killed the code-push + @expo/vector-icons false-flag class; 13 flags → ~7 real);
(2) pulse link-checker now sends a browser UA (kills false unreachables — mirrors the harvest
playbook). FLAG-DRIVEN CORPUS FIXES: TESTING note reworded (CLAIM heuristic was misreading the
react-test-renderer deprecation as an RNTL claim); ANIMATION Moti dormancy caveat (npm-verified
0.30.0/2025-01, 17mo); CHARTS victory-web-slow vs victory-native-XL-active (41.26, 2026-06) + d3
maturity note; OTA default text + label fixed so pkgsForPick marks expo-updates ▸ (label must be a
SUBSTRING of pick text — labels like "A / B" never match; keep labels short). DOCS: README pillar
row was 3 harvests stale (29→42 entries, 3→14 reviewed, +6 newsletters +watching); SKILL.md 37→42.
SITE: entry template renders `watching` (toc + section mirroring reading; local astro build blocked
by node 20 < 22.12 — CI's site job verifies). REMAINING KNOWN-ACCEPTED FLAGS: styled-components
CLAIM (intentional nuance, recurring), NAV/P2P/LISTS/ONDEVICE-AI TRAILING (context-keyed fit),
keychain STALE (mature). SUGGESTED NEXT (reported to user): graduate 3-5 drafted→reviewed
(ANIMATION/COMPONENT-LIBS/FORMS/OBSERVABILITY/RN-VERSIONS); resolve medium/low calibration tiers
via the Aug-25 challenge batch; FIRST BENCH RUN still blocked on an API key; npm publish (0.3.0
pack-verified, corpus now far ahead — bump 0.4.0); MOVE THE HARVEST LEDGER INTO THE REPO
(tools/.harvest-state.json) so a cloud /schedule agent can resume newsletter passes and open PRs —
memory-file resume state is the one thing blocking cloud harvest; watch React Weekly's RSS window
(latest-20 — a >20-issue backlog loses issues permanently).

**HARVEST STATE → REPO + 5 GRADUATIONS (user "do 1 and 2", 2026-07-10):** (1) **`tools/
harvest-state.json`** is now the CANONICAL resume state (last_processed + count + archive URL +
per-source access notes for all 6 newsletters) — read/update/commit it each pass; THIS memory
ledger keeps only narrative history. New lint invariant cross-checks every harvest-state count
against sources_digested ×N (both directions) — counts can't silently drift. Routines updated
(pulse-routine step 2, upkeep-routine Tier-2 + Record: cloud runs put narrative in the PR
description). This unblocks cloud /schedule harvests. (2) Graduated **ANIMATION, COMPONENT-LIBS,
FORMS, OBSERVABILITY, RN-VERSIONS** → reviewed via 5 new long-form Diataxis Explanation docs
(template held; organizing ideas: which-thread-pays-per-frame / who-owns-the-code /
two-questions-state-vs-truth / three-questions-crashed-slow-which-release / three-migrations-in-
disguise). **19 reviewed / 23 drafted of 42**; stale "14 reviewed" fixed in encyclopedia header +
mentor yaml ×2 + README + SKILL.md. calibrate --seed idempotent (0 added, 42 P). npm test green;
committed b83593e + pushed. Graduation candidates remaining: TYPESCRIPT, STORAGE, A11Y, I18N,
CHARTS, MAPS, KEYBOARD, MEDIA, EDITORS, OTA, NETWORKING (newest entries should season first).

**TRUST-ARTIFACT PASS (user "do 1 2 3 4", 2026-07-10):** (1) BENCH 26→35 questions — 9 authored
from the July flips (ts7-stable, codepush-service, expo-av-status, expo-router-decoupled,
shadcn-headless, vector-icons-expo, xcode-floor, test-renderer, next-adapters); schema+regex
validated, `bench --list` loads 35. (2) **CHALLENGE PASS — 5 challengers on the signals/check-due
queue, ALL FIVE WEAKENED, zero overturned** (defaults survived their steelman attacks on the
stated axes; each landed a real caveat — applied + recorded, ledger 42 P / 11 O): LISTS =
**FlashList v2 is New-Arch-ONLY** (old arch → pin v1.x); META = Start's 60x download surge is
**Lovable CI inflation** (preempts a false TRAILING flag) + default un-sells Start-as-RSC-stack
(v1 RC) + Next **no-backport** patch policy; STYLING = "styled-components maintenance" was STALE
(v7 prerelease ACTIVE w/ RN-parity features but STAYS RUNTIME — advice reworded onto the
per-render-cost axis everywhere; the recurring signals CLAIM flag is now resolved with data) +
NativeWind-stable-is-TW3-era/v5-preview → **Uniwind is the stable TW4 path** (when-clause +
uniwind detect) + **DEAD-PKG FIX**: unscoped react-native-tailwind = 2020 corpse →
@mgcrea/react-native-tailwind; MEDIA = VisionCamera **v5 pin ahead of reality** (85% installs on
frozen v4, open iOS-26/race crashes, AE regression → ship-now caveat) + react-native-webrtc
near-dormant; NAV = **react-router (50M/wk) was in NO recommend text → corpus's own fit()
flagged every RR repo as contradiction** — when-clause added (fit now ~contextual, verified via
scratch fixture), RR 8.2.0, TanStack keeps type-safe-SPA slot (RR typegen framework-mode-only),
SDK-57 decoupling persistence verified vs npm deps. SCORECARD now has data in ALL tiers: high
6/11 75% "watch" · medium 3/19 50% · low 1/12 50% "expected churn — calibrated". (3) EVAL 50→55:
rn-smells += expo-updates/sonner-native/bootsplash/axios/agent-device deps + raw-XHR smell;
assertions pin OTA/POLISH/AI-DEVTOOLS aligned + axios NETWORKING ~contextual + XHR source
signal. (4) LINT now warns on stale entry/reviewed counts in README+SKILL.md+mentor+encyclopedia
prose (the check that would have caught the 3-harvest-stale README). Commits b933757 + 0c156ad,
pushed. NOTE: challenger agents may self-record via calibrate --record — CHECK the ledger before
recording to avoid double entries (META + NAV self-recorded this pass; LISTS/STYLING/MEDIA
returned notes for the caller).

**`react-brain census` BUILT (user approved the "single smartest addition" pitch, 2026-07-10):**
the 6th trust primitive — **observed adoption in shipped software** (signals asks npm/gameable;
census asks production apps). `tools/react-brain-census.mjs` + `tools/census-cohort.json`
(20 fetch-verified apps: 9 RN — Bluesky/Expensify/Mattermost/RocketChat/Rainbow/Artsy-eigen/
Ledger-Live-mobile/Joplin-mobile/Uniswap-mobile · 11 web/desktop — Outline/Cal.com/Excalidraw/
Supabase-Studio/Twenty/Plane/Appsmith/Metabase/Grafana/Signal-Desktop/Mastodon; element-web +
posthog REJECTED at probe — workspace roots w/o React deps). Mechanism: raw.githubusercontent
package.json fetch (no API rate limit, browser UA, concurrency 6) → matchDetector (DETECTORS
tuple [pkg,entryId,label,token]) → per-entry adoption w/ HONEST DENOMINATORS (RN-only entries ÷
RN apps) → snapshot diff vs tools/.census-baseline.json = adoption VELOCITY on later runs.
FIRST-RUN FACTS worth citing in entries/challenges: keyboard-controller 7/9 RN apps (huge
KEYBOARD validation), Sentry 11/20, TanStack Query ×6 vs SWR ×1 vs Apollo ×2, Nitro Modules
6/9 RN, FlashList 6/9, POLISH domain present in 8/9 RN apps, Redux still ×10 in mature prod apps
(vs Zustand ×3 — consistent w/ the already-on-Redux-keep-it clause, NOT a contradiction of the
new-work default), styled-components ×5 (legacy weight), 1 app still shipping deprecated
@expo/vector-icons. Wired: cli `census` verb + npm script + tools/README + root README +
upkeep-routine step 3 (census deltas = evidence-grade challenge fuel). Commit c6d91ce, pushed.
PHASE 2 (same day, d3346b6): cohort 20→**34** (+MetaMask-mobile/BlueWallet/Zeus/Berty/Comm/
Joplin-desktop/Sentry-frontend/Formbricks/Documenso/Dub/Infisical/Firefox-Profiler/tldraw.com/
PostHog-frontend; redash REJECTED — client/ path 404s; 14 RN + 20 web); snapshot format enriched
(cohort meta + names + agg IN .census-baseline.json — the site builds from it, /libraries
pattern); **signals now shows "ships in N/D apps" per package row** (typescript 28/34,
TanStack Query 11/34 — npm + shipped adoption side-by-side at flag triage); site **/census
page** (adoption table w/ honest denominators + cohort roster + reading-guidance; degrades to
methodology w/o snapshot) + nav/console PAGES wiring. .census-baseline.json is COMMITTED
(CI site build needs it). Remaining: cohort → ~40 over time; census-vs-signals disagreement
as an explicit flag (v2).

**`react-brain briefing` BUILT (user approved the 2nd "smartest addition" pitch, 2026-07-10):**
the personalized, verified ecosystem changelog — corpus diff × repo's detected stack. Completes
the triad **doctor = position · census = field · briefing = velocity**. Mechanism:
`tools/react-brain-briefing.mjs` — structural YAML diff per entry vs the corpus at --since
(`git rev-list -1 --before` + `git show <rev>:<path>` through parseYamlStr; NOT patch parsing;
git stderr suppressed for entries that didn't exist at the old rev) → deltas (status/confidence/
recommend.default/when-added/options-added-or-changed/note-new-sentences/reading+watching-added)
+ newly-added `sources:` as RECEIPTS → intersected with analyzeRepo().byEntry. SECTIONS: ⚡ACTION
(PRECISE: an ACTION_RE-marked segment must NAME a shipped label — full label or ≥4-char head —
else it's stack news, not a fire alarm), 📦stack changes, 🔭radar (platform-gated, cap 6),
off-platform count. Per-repo resume state tools/.briefing-state.json (GITIGNORED — keys are
machine-local abs paths, unlike the committed baselines); --write emits BRIEFING.md; --since/
--today for determinism. DOGFOOD (window 2026-07-06→10, 34 changed entries): ourpot ACTION led
with SVG (ships the SDK-56-deprecated @expo/vector-icons ✓) + NAV (ships React Navigation, the
decoupling names it); ledgerhr surfaced the shadcn→Base-UI flip against its shipped Radix.
Wired: cli verb + npm script + tools/README triad section + root README row + upkeep-routine
("run after each harvest for the sibling apps"). lint/eval green. NEXT candidates recorded:
`migrate` planner (briefing item → sequenced upgrade path), briefing-to-cron (Tier 1 after
pulse), radar dedup vs previously-shown items (state currently only stores the date).

**HARVEST — React Status #482 + React Digest #2320 + React Weekly #28 (processed 2026-07-13,
commit a11b418):** user's URL list also included TWiR #289 — already harvested 2026-07-10
(ledger check prevented the double-harvest; that's the ledger doing its job). 4 KEEPS, all
fetch-verified: (1) **performance.dev ChatGPT teardown → NAV reading** — the TWiR #289 runner-up
promoted on 4 independent signals in one week (TWiR skip-note, Status headline, Digest featured,
RW #28); RR7-framework-mode at billion-user scale (Next→Remix→RR7 migration, streaming SSR,
TanStack Query seeded from server, 84KB doc / 50-65ms TTFB) — production counterweight to
"serious apps need Next", supports the RR when-clause; author Brotzky now ×3 in corpus
(Linear→STATE, Conductor→DESKTOP). (2) **upskills.dev "React Forms Done Right" → FORMS**
(entry had 1 reading) — verified via Next-flight-payload extraction (curl-UA got a JS shell;
prose lives in self.__next_f chunks — NEW playbook trick); covers native-React-19-actions-vs-
form-library decision arc. (3) **@vis.gl/react-google-maps 1.9 → MAPS** option+when+detect
(2nd signal after TWiR #289 bench; npm-verified 1.9.0/2026-07-03). (4) **Vite+ beta → BUILD**
option+note+source (2nd signal after TWiR watch flag; MIT, unifies Vite/Vitest/Rolldown/tsdown/
Oxlint/Oxfmt, "stable but not yet complete"). DEDUPE WINS: Digest's Akulov hydration-mismatch
already held (OBSERVABILITY); RW #28 100% corroborative (shadcn→Base-UI, KMP-vs-RN, RNav-8-July
all in corpus — 6-source redundancy is now routine). BENCHED (1-signal): **Vercel acquires
Better Auth → NO AUTH ENTRY EXISTS — strongest gap candidate, create on 2nd signal** (Auth.js/
Better Auth/Clerk is a classic selection domain); SolidJS-2.0 first-look (morello.dev); Takumi
v2 (off-taxonomy); Next.js WebSocket RFC; React Email Editor 2.0 (drag-drop email builder ≠
EDITORS' rich-text identity); react-easy-crop. SKIPPED 3rd-time compiler-caveat corroborators
(LogRocket what-broke, longho retrofit). PROCESS: Digest archive MOVED /digests→/newsletters
+ slug numbers NON-SEQUENTIAL (2316→2320 adjacent — don't hunt "missing" issues); both noted in
harvest-state.json. Counts: Status ×23 · Digest ×17 · RW ×21. 42 entries · 209 detect · 120
readings; lint clean, eval 55/55, pushed (site auto-redeploys).

**INTELLIGENCE MILESTONE 1 — "the corpus talks about your code, with citations" (user: "make it
more intelligent… suggest based on the articles", 2026-07-13, commit eef7184):** shipped the top-3
of the 7-idea roadmap pitched this session. (1) **Conditional-advice readings**: reading/watching
items may carry `claim:` (ONE sentence, distilled from `what:` — never a new assertion) +
`applies_when:` gates {deps, absent_deps, platforms, stages} (dep patterns = detect glob
semantics); `adviseReadings()` in detect.mjs intersects them with analyzeRepo() → doctor's new
**FOR YOUR STACK** section (cap 5 pretty / full in --json `advice`), dep-triggered ranked first
then by entry confidence; lint enforces claim⇔applies_when pairing + schema; 21 readings tagged
across 15 entries. Suppression works both ways: why-you-want-react-query fires on axios-without-
cache repos, queryOptions guidance fires on repos WITH Query. (2) **detect_source sprint 8→16
entries** (each hint cites a held reading): REACT-CORE useMemo/useCallback ≥8 files unless
compiler; FORMS controlled value+onChange ≥4 files unless form lib; NAV window.location hard-nav;
A11Y + I18N absent-at-production rules; EDITORS raw contentEditable; CROSSPLATFORM Platform.OS ≥10
files; TYPESCRIPT ': any' ≥10 files. `unless_dep` now accepts a LIST. (3) **Census join in
doctor**: WORTH A LOOK rows show "you ship X n/D; most-shipped Y m/D" per label (labels align
because census uses matchDetector too — direct lookup), GAPS show "[n/D census apps ship this
domain]"; honest denominators come from the snapshot. Eval 55→63 (advice triggers/suppression/
ranking/platform-gating/census). DOGFOOD PROOF: ledgerhr → manual memoization in 42 files +
hand-rolled controlled forms in 28 files + queryOptions advice; ourpot → 5 cited claims (deep-
links-behind-auth via its React Navigation, missing keyboard-controller, production supply-chain
+ RN-vitals observability). Upkeep-routine step 2 now says: TAG new readings at harvest time.
ROADMAP REMAINING (pitched + user approved direction): #3 `migrate` planner (installed-version
vs corpus version-facts → sequenced upgrade path), #5 free-form lexical query over what:
annotations (MCP RAG-lite), #6 diff/PR review mode, #7 impact×effort ranking of doctor output.

**PRODUCTION-GRADE REORG PASS (user: "re-organization so skill is more accurate/correct/detailed/
efficient/production grade", 2026-07-13, commit bbaa0b7):** 2 parallel audit agents read all 10
long-tail tools + I read the core surfaces; ~21 findings verified against source, all fixed, 19
files. HEADLINE (suggestion accuracy): **doctor WORTH A LOOK/GAPS now resolve when-clauses against
repo context** (ctxTokens: stage/expo/bare-rn/p2p-holepunch-pear/shell + the DETECTED-lib tokens,
via resolveRecommendation) instead of printing the truncated generic default — ledgerhr now gets
"already on Redux → keep RTK" and "Pear app → esbuild-bundle… not the web/Metro defaults" instead
of misleading defaults; NO bare 'web' token (substring-matched "huge web tables→HighTable");
--json rows carry `resolved`; eval pins via p2p-pear TESTING. TOP AUDIT BUGS FIXED: (1) signals/
census OFFLINE RUNS destroyed git-tracked baselines + signals printed a false "No flags ✓" green —
now loud exit-1, no write, merge-over-previous, atomic tmp+rename writes, census --json no longer
mutates state; (2) briefing SAME-DAY corpus edits were lost FOREVER (date-only state vs T23:59:59
baseline) — state now stores full timestamps (legacy date-only → T00:00:00, over-show once);
corpusDiff memoized (was recomputed per repo ≈100+ git/python spawns each); ACTION head stoplist
(react/native/expo alarmed fleet-wide); clear error outside a git checkout; (3) pulse offline-
detection was DEAD CODE on Node 22 (undici buries codes in e.cause) — e.cause?.code first; drift
fingerprints of skipped repos preserved; (4) calibrate FAST set had drifted category names
('build'/'ondevice-ai' vs real 'build-tooling'/'ai-ml') → fast domains got slow horizons; fixed +
seed-time assertion + --record id validation + 3 predictions.jsonl check_by corrected (+ai-devtools
now FAST); (5) decide misreported via:'na' as "resolved via default" and omitted matched_context —
P2P fleet ADRs were WRONG; also bad explicit repo path → error (was silent greenfield + mkdir),
findLast for ledger P rows; (6) learn "go" reading now honors applies_when gates (gap steps were
handed advice gated on the lib being installed) via new detect.readingApplies(); (7) bench: API
errors were graded as empty answers corrupting published scores — now {error:true}, excluded from
summarize (errors field), 60s timeouts, >20%-errors aborts; (8) analyzeRepo survives malformed
package.json (skip shape); cli delegate passes child exit codes (no stack traces); evidence/pulse
print skipped repos; stack warns on missing RECIPE ids; MCP query now surfaces watching:+claim:,
mentor-yaml Phase-0 documents doctor advice[]/field. GOTCHA recorded: dogfooding briefing ADVANCES
.briefing-state.json — rewind it after test runs (--today runs store T23:59:59). npm test 64/64.
Version still 0.4.1 — corpus+tools now well ahead of the npm publish; suggest `npm version minor`
release when user wants.

**TOKEN-EFFICIENCY LAYER — `map` + query capsules (user approved the Bytebell-concept-minus-LLM
pitch, 2026-07-13, commit 8a2e9c9):** the precompute-and-serve-compact idea with regex instead of
an LLM summarizer (react-brain's questions are locate-and-classify → the index card is extractable,
not hallucinatable; no Neo4j/Mongo/daemon — keeps npx-anywhere). (1) **`react-brain map <repo>`**
(mapRepo() in detect.mjs + react-brain-map.mjs + cli verb + 7th MCP tool): one line per source
file — domain tags (matchDetector over imports + PER-FILE detect_source smell hits, ⚠-marked,
unless_dep/platform gated, absent-rules excluded), external imports normalized to pkg roots,
exports, LOC — plus inverted DOMAINS→files index. ledgerhr: 217 files → ~7K tokens (vs 30-60K
grepping); its FORMS 28-file count matches doctor's smell finding exactly. Division of labor
now canonical: **doctor = WHAT the stack is · map = WHERE it lives** (mentor Phase-0 updated —
read only the files the index names). (2) **MCP query depth tiers**: default is a ~100-token
CAPSULE (recommend + top-3 when + tagged claims + defer + full-hint); depth:"full" = old
behavior; CLI query unchanged (human-facing). Eval 64→73 (MCP=7 tools, capsule <1/3 of full +
no OPTIONS dump, map extraction pinned on rn-smells). DELIBERATE SKIPS from Bytebell: per-file
LLM summaries (violates the verify discipline), graph DB (entity space = curated detector
table), SHA-diff cache (nothing expensive to amortize — scan is ~1s), daemon. NEXT candidates:
internal-import graph in map (hub-file detection) if agents want it; roadmap still holds
migrate-planner / lexical query-routing / diff-review / ranking.

**MIGRATE PLANNER SHIPPED (roadmap #3; user "lets do the migrate planner", 2026-07-13, commit
292a2a9; earlier same day: v0.5.0 PUBLISHED to npm with map+capsules, tag v0.5.0):** `react-brain
migrate <repo>` = installed versions × per-entry `migrate:` rules + scanModernDefaults, sequenced.
Knowledge follows the entry-owns-it pattern: **11 `migrate:` rules across 9 entries** (RN-VERSIONS
ladder-to-0.86 + edge-to-edge-removal-at-0.86, OTA codepush-dead, MEDIA expo-av, SVG both
vector-icons paths, LISTS flashlist-v2-requires-rn≥0.82, NAV rrd→RR8 + rr<8, TESTING
test-renderer, STYLING dead-tailwind-pkg, TYPESCRIPT ts7-via-ts6-bridge) — every rule a
restructured ALREADY-VERIFIED fact with receipts, lint-validated (urgency/effort enums, x.y.z
versions, http receipts). Rule shape: from{pkg,below}/to/urgency/effort/why/receipts/
requires{pkg,atleast}. SEQUENCING: phase 1 = dead + GATES-others-wait-on (a step whose
requires is unmet marks its requirement's pkg as a gate; the matching step hoists), phase 2
deprecated/superseded, phase 3 upgrades, phase 4 blocked (prints "⛔ blocked by pkg ≥ v
(installed: x)"). minVer/verLt zero-dep semver-min in detect.mjs. 8th MCP tool; mentor
modernization_scan says hand the plan over, don't re-derive. Eval 73→80 (phase hoisting, gate
ordering, blocked linkage, clean-repo-empty-plan on rn-smells; new legacy-rn fixture). Dogfood:
ourpot = 7 steps, correctly NO phase-1 and nothing blocked (RN 0.83.9 clears the 0.82 gate);
legacy-rn = ladder hoisted because FlashList waits on it. HARVEST RULE: when a pass lands a
deprecation/supersession/version-line fact, ALSO add the migrate: rule to the entry. npm is
one release behind again (0.5.0 lacks migrate) — bundle with the next capability before 0.6.0.

**DIFF-REVIEW MODE SHIPPED (roadmap #6; user "lets do the diff review mode", 2026-07-13, commit
9c09891):** `react-brain review <repo> [--base=<ref>] [--ci]` — 9th MCP tool. Doctor reviews the
REPO, review reviews the CHANGE: (1) dep delta vs base — adds matching a dead/deprecated
`migrate:` rule OR a retired-guard detector label = BLOCKING w/ receipts; superseded-rule +
fit-↗review adds warn w/ context pick; adds triggering a tagged reading claim surface it
(axios-add → why-you-want-react-query claim). (2) INTRODUCED-ONLY source findings: detect_source
smells + legacy core-RN imports (new exported rnNamedImports()) flag only when the pattern
matches the changed file's NEW version and NOT its base version — pre-existing debt in a touched
file never nags (eval-pinned). GOTCHAS solved: untracked new files aren't in `git diff
--name-only` — union with `ls-files --others --exclude-standard` (prefix-prepended: ls-files is
subdir-relative, diff is root-relative); nested repos via rev-parse --show-prefix; --ci exits 1
on blocking only. Eval 80→87 via a SELF-CONTAINED tmp git repo built in the eval (git -c
user.email/-c user.name for CI). The tools/cli `review` verb is react-brain's own namespace —
distinct from the global /review skill (which owns judgment; this is the deterministic layer it
can call). Roadmap remaining: lexical query-routing (#5), impact×effort ranking (#7). npm 0.5.0
is TWO capabilities behind (migrate + review) — 0.6.0 release recommended to user.

**ROADMAP COMPLETE — #5 question routing + #7 priorities (user "lets do the last two roadmap
items", 2026-07-13, commit 1e4a5d5):** the 7-idea intelligence roadmap pitched 2026-07-13 is now
FULLY SHIPPED (1 advice-readings, 2 detect_source sprint, 3 migrate, 4 census-in-doctor, 5 this
question routing, 6 review, 7 this ranking — plus map/capsules from the Bytebell turn). (#5)
`searchReadings()` in detect.mjs: BM25-lite over ~130 reading/watching title+what+claim docs —
zero-dep, on-demand, trailing-s stem fold (fixed 're-renders'≠'re-render'), ≥2-token-hit floor
kills stray-word matches; wired into CLI query + MCP query as READINGS MATCHED (question →
answering reading + claim + URL; e.g. LCP/SSR → 3perf hydration piece). (#7) doctor
`computePriorities()`: one scored top-5 ACROSS sections (modernize 90/60/30÷effort · smells
50+min(files,20) · gaps (40+census%×45)×GAP_STAGE · fit-↗review revisits · dep-triggered
claims), ×entry-confidence; **GAP_STAGE = {prototype:.55, mvp:.8, production:1}** encodes
MP-STAGE-CALIBRATED — first version had a prototype told to close TESTING/DX gaps above its
concrete smells; the damping fixed it (eval-pinned: prototype top item ∉ gap). Printed FIRST +
--json `priorities[]`; mentor Phase-0 (h) = use as Phase-4 candidate ordering. Eval 87→96.
Dogfood: ourpot(production) = expo-image/MMKV supersessions → census-weighted STATE gap →
memoization/Platform.OS smells. npm 0.6.0 is behind by these two (→0.7.0 when user says).
Agent surface now: know(query+routing)/locate(map)/assess(doctor+priorities)/plan(migrate)/
gate(review)/decide/compose(stack) — 9 MCP tools.

**LIVE MCP DOGFOOD ON OURPOT (user "attach the mcp to ourpot and work a real ticket",
2026-07-13; react-brain a88deaf · ourpot d0360fa):** `.mcp.json` COMMITTED in ourpot (npx -y
@heart-it/react-brain mcp; 9 tools handshake from that dir; ourpot's pre-commit hook ran
lint+prettier+typecheck green on the commit). THE TICKET FLIPPED — the flow's verify step
overturned its own lead: the brain's LISTS smell (13 ourpot files) proved FALSE-POSITIVE on
inspection — all 4 Search.tsx ScrollView+map hits were HORIZONTAL pill/filter bars, results
already on FlatList; CurrencyPicker renders 15 curated codes (< the corpus's own <20 threshold).
ourpot's list hygiene was better than the heuristic → the real ticket was RULE PRECISION:
LISTS detect_source now requires a VERTICAL ScrollView (negative lookahead `(?![^>]*\bhorizontal\b)`
inside the opening tag). ourpot 13→3 flags, survivors all bounded verticals (correct
leads-for-judgment); rn-smells fixture still fires. This is the evidence loop working as
designed: repo → corpus correction, committed with the dogfood story in the rule comment.
INCIDENTAL: ran ourpot's full suite by accident (cwd drift — `cd` in an earlier Bash persisted;
watch that) — 282/282 pass, suite green. REMAINING true ourpot tickets all need a DEVICE BUILD
(native deps: keyboard-controller, expo-image, MMKV, reanimated absent) — parked until the user
can build; pure-JS side was already clean. NOTES.md (their audit-parking file) is empty.

**SITE REPOSITIONING — audit phase 1 (user pasted an external "React Brain v2 Production
Readiness Audit" + "lets first improve website and product idea", 2026-07-13, commit fdbf037,
live via pages workflow):** VERIFIED THE AUDIT AGAINST REALITY FIRST — much of its "missing
product" already existed (⌘K console, client doctor, trust chips on entry pages, scorecard);
the real gaps were POSITIONING ("encyclopedia" in the H1), CTA priority, pipeline story,
freshness, and the MCP/interfaces story. Shipped: hero "React decisions, with receipts." +
why-it-exists sub; doctor CTA primary; build-time ecosystem-pulse line (last verification +
N re-verified this week — real corpus data); quiet mono pipeline strip; "One corpus, every
surface" (⌘K/npx/claude mcp add/CI gate); "Not another model answer" 3-row honest contrast
pointing at scorecard/changelog/benchmark; quick start = doctor/migrate/review; head desc +
search placeholder ("ask — should I use zustand?"); entry options gains why-not subline.
DELIBERATE SKIPS per user taste (quiet minimalism) + honesty: typing/streaming doctor
animation, badge walls, fabricated "Verified by React Team" chips, AI-chat advisor (QVAC —
needs a key + its own design pass; the audit's Phase 3). NODE IS 22.21 NOW → site builds
LOCALLY (was blocked on node 20 since 2026-07-07) — build + grep-verify dist/ before pushing.
Audit phases 2-4 remaining if user wants: nav IA regroup (current IA is actually fine),
reading-page skimmability, decision matrices/graphs, QVAC advisor, public API.

**SITE PHASE 2 (2026-07-13, commit 1564cc5):** sidebar bottom links → Tools/About clusters
(label-caps subheads; mobile keeps flat list); reading page items lead with the tagged
`claim:` (or first sentence of what:) + title·author·host baseline row + muted remainder —
the advice-tagging pass now powers the WEBSITE's skim layer too (nothing clamped/hidden);
entries tables: name leads in head-font bright, topic muted, ≤600px collapses to entry+topic;
a.row hover = card bg + accent title (padding-inline/-margin trick so bg aligns). Audit
phases 3-4 remain (QVAC advisor, matrices/graphs, public API, dashboards) — Phase 3 blocked
on an API key + its own design pass.

**SITE PHASE 3 (2026-07-13, commit abf4916):** the audit's "intelligence layer" built the
STATIC-SITE way — all deterministic over existing corpus data, no backend/LLM (Pages has no
server; QVAC-chat explicitly skipped — deterministic routing + MCP are the grounded path).
(1) /doctor: fit tally + IN-BROWSER MIGRATION PLAN — migrate: rules ship via doctorData(),
matched client-side (minVer/verLt/glob ports), sequenced w/ blocked-by + receipts. (2) console
`ask <question>` — client port of searchReadings over readingIndex() (125 annotations+claims
in the lazy console-data payload). (3) entry pages: options EVIDENCE column (option-name→detect-
label fuzzy map → npm dl/wk + census ships-in n/D, footnoted), RELATED DECISIONS = RB-E-* refs
extracted from the entry's own when/note/tradeoffs text (real graph edges, zero invention),
re-verified-N× line from per-entry git dates (new corpus.js revisions(id), 42 git calls at
build — fine). VERIFY DISCIPLINE for inline scripts: extract <script> from dist + node --check
(caught nothing this time but it's the only syntax gate define:vars scripts get). Audit now
DONE through phase 3; phase 4 (public API/dashboards/IDE) unstarted. Site stack: watch that
console-data payload growth (~readings added) stays lazy-loaded.

**CLAIM-TAGGING PASS (user "lets go with remaining readings with claims", 2026-07-13, commit
350bc0b):** 3 parallel agents over disjoint entry sets (12/12/17 files) + my verification →
**60 of 125 reading/watching items tagged (was 21), 32 of 42 entries**; diff = 78 pure
insertions, zero deletions. METHOD THAT WORKED: strict prompt (claim = distillation of the
item's own what: + same-entry facts ONLY; skip-is-success; ≤1 stage-only gate per entry; dep
gates from the entry's detect rows), each agent self-lints, then I validate gates vs detect
rows/npm (the one suspicious gate — @super-calendar/* — was actually the entry's own detect
row) + diff hygiene + live doctor check. ~65 items DELIBERATELY untagged (general explainers/
internals/philosophy = bad conditional advice — agents' skip lists were sound; don't chase
100% coverage). Effect: ledgerhr advice 2→4 (incl. P2P Hypercore-stack N/A-by-design claim);
same field powers ask routing + site reading leads + console. Notable new gates: Context-not-
state via absent_deps-on-every-store; ICU reading gated to ICU libs excluding i18next; DX
Doctolib gated stages:[scale] only. HARVEST RULE unchanged: tag new readings at keep-time.

**MARGELO BLOG PASS #2 (user "update brain with blog.margelo.com", 2026-07-13, commit c6bf81c):**
sitemap diff vs the 2026-06-25 pass → exactly ONE new post: the Rive Nitro rewrite (2026-07-09,
Miklós Fazekas). REGISTRY CAUGHT WHAT THE FETCH BLURRED: the rewrite ships as a NEW scoped pkg
@rive-app/react-native (0.4.14, Rive's official scope) while legacy rive-react-native idles at
9.8.3 (quiet since 2026-04) — supersession IN PROGRESS. Applied to ANIMATION: Rive option row
(the Lottie-alternative slot, previously uncovered) + interactive/state-machine when-clause +
tagged reading (claim at keep-time; deps both pkgs) + detect rows both pkgs; numbers carried
w/ authors-own-benchmark caveat (94× multi-view/4.7× memory/0.3-0.4µs-vs-1.5µs-vs-21µs — also
independent corroboration of NATIVE's Nitro-vs-Turbo call-cost story). DELIBERATE NO-MIGRATE-
RULE: stable-9.x → 0.x is churn; WATCH note in entry for 1.0/formal deprecation — add the rule
then. Margelo resume point now: posts after 2026-07-09. Also linked the npm package page
(user-supplied) from README lead + site interfaces section; new npm description ships with
the next release (still pending: user's manual GitHub repo description paste).

**SITE POLISH BATCH (10-question pass, 2026-07-13, commit 4bbacdd, live-verified):** og.png
(1200×630 via HEADLESS CHROME rendering an HTML card — the reusable trick for brand assets;
origin hardcoded pending custom domain) + og:image/twitter metas; PER-ENTRY CALIBRATION STRIP
("this tier holds 75% on the public scorecard (6/11 graded) →" — confidence is now a measured
claim on every decision screen, the hardest-to-copy trust surface); cited-by reverse graph
edges; benchmark empty state → invitation (Action path + commands); encyclopedia→corpus sweep
(architecture page KEEPS the word — internals truth); console welcome teaches ask/doctor/query;
weekly-re-verified dot in the decisions table. HONESTY NOTE: dropped the spacing-rhythm item
after checking — h2 was already 3.2rem, the critique didn't survive contact with the CSS.
DEPLOY-POLL FOOTGUN (2nd occurrence): match pages runs BY HEAD_SHA — the latest-run check
grabs the previous deploy when the new run hasn't spawned yet. og:image base path only
correct on CI builds (ASTRO_BASE) — verify on the LIVE url. Remaining user unlocks unchanged:
custom domain (multiplies og/identity), bench secret+click, cloud harvest consent.

**GRADUATION PASS #4 — 5 entries → reviewed (2026-07-13, commit 423e5b1): corpus now
24 reviewed / 18 drafted of 42.** TYPESCRIPT, STORAGE, KEYBOARD, MEDIA, OTA via 3 parallel
drafting agents (docs ONLY — yaml flips/counts stayed in my hands). METHOD UPGRADE that
worked: (1) supply each doc's ORGANIZING IDEA in the prompt (strictness-as-boundary /
data-shape×secrecy / two-keyboard-clocks / three-media-problems-don't-fork-the-pipeline /
OTA-is-your-rollback-story); (2) hard grounding rule with "flag what you can't ground,
don't invent" — the returned cannot-ground lists were uniformly correct omissions;
(3) MECHANICAL VERIFICATION: regex-extract every numeric token (versions/%/dates/multipliers)
from each doc and assert it exists in the entry yaml — only misses were frontmatter dates +
one rhetorical "100%". Reusable as the doc-grounding gate for future graduations.
SIDE-CATCH: STORAGE platforms [react,react-native] with RN-only options → narrowed to
[react-native] (doc-writing surfaces entry inconsistencies — same effect as the evidence
loop). KEYBOARD lacked sources: (reviewed requires it) → added its Margelo reading URL
(legal dual reading+source). Count-drift lint caught all 4 stale "19 reviewed" claims incl.
a MULTILINE one in SKILL.md ("19\n`reviewed`") that greps for "19 reviewed" miss. Remaining
graduation candidates: A11Y, I18N, CHARTS, MAPS, EDITORS, NETWORKING, POLISH, SVG, P2P,
NATIVE-UI, CALENDARS + newer entries seasoning.

**SCORECARD PRESENTATION RULE (user questioned the low-tier 50%, 2026-07-13, 81fd5c1):** the
low tier's 50% = ONE graded prediction (MEDIA, weakened) — statistically honest, read as a
track record. RULE: calibration tiers with <3 resolutions render as "early: n/N graded (X
overturned)" on entry strips + "(early — n=X)" in the scorecard table; both surfaces now
state the OVERTURNED count (0/10 — the strongest true signal; weakened = survived-with-caveat,
harshly scored 0.5). Explanation to reuse: modest low-tier score = calibration WORKING (low
confidence predicts churn); the tested claim is the tier ORDERING, not high scores everywhere.

**TWiR #290 HARVEST (2026-07-16, commit b324d66):** the pass's gap-filler is **RB-E-AUTH**
("Authentication & identity", app-architecture, drafted/low) — auth had NO entry among 42;
trigger = Better Auth JOINED VERCEL 2026-07-07 (first-party post verified: open-source +
framework-agnostic commitment, Agent Auth Protocol continues; Better Auth had already acquired
Auth.js/NextAuth → maintenance lane corroborated vs npm: @auth/core last publish 2025-10 vs
better-auth 1.6.23 active). Options: Better Auth / Auth.js-maintenance / Clerk (+ Expo SDK) /
Auth0 (react-native-auth0 5.9 passwordless-OTP verified) / backend-bundled Supabase+Firebase /
expo-auth-session DIY; reading = The Copenhagen Book (verified; pilcrow's canonical free
hand-rolling guideline); cross-links to STORAGE/SECURITY/P2P (keypair identity, no auth server).
DELIBERATE NO-MIGRATE-RULE next-auth→better-auth (Rive precedent — no formal deprecation yet;
watch for EOL). Full wiring: TOC + capability_map + stack FEATURE_DOMAINS ('auth/identity') +
7 detect rows (token-placement chosen so next-auth/@auth/* fit as ~contextual, better-auth/clerk
as ✓aligned) + calibrate --seed (ledger 43). Status flips (all fetch-verified): NAV note +
source — react-native-screens 4.26 marks Tabs API STABLE (requires RN 0.84+; RN8 still
pre-stable); BUILD note — Bun v1.4 ships the Zig→Rust rewrite (Rust-wave line now literally
includes Bun); REACT-CORE note + source — React Foundation governance concrete: 7 Working
Groups (Server/DOM/Fiber/Docs/Compiler/DevX/RN) each seated on a Leadership Council
(react.dev/community/team). New readings: AI-DEVTOOLS — Bun agentic-port case study (~64
parallel Claude agents, 535,496 lines Zig, 11 days, ~$165k, implementer+2-adversarial-reviewers
pairing; untagged general case study per claim policy); A11Y — ariaNotify() siren-song
(WAI-ARIA 1.3, Firefox-only mid-2026; tagged claim, platforms:[react]). SKIPPED as
corroboration/how-to/RFC/cap-discipline: RR 8.2 + npm 12 + @expo/vector-icons deprecation +
toast-message 2.4 + Rive-Nitro (all already held), 3 RN RFCs (StyleSheet media queries,
ViewTransition, Platform.Variant — pre-ship leads), Nub/Native-SDK/Astryx (too early),
SolidJS/Preact/cache-components/Sentry-OTel/thoughtbot-iOS26 readings (caps or how-to or
covered). Counts: **43 entries (24 reviewed / 19 drafted)**, TWiR ×24, harvest-state.json →
#290 (2026-07-16). npm test green: lint clean, eval 98/98. NOTE: eval count 96→98 happened
before this pass (suite grew with earlier commits).

**DISPOSITION MANIFESTS — harvest triage made reviewable (user audit, 2026-07-16, 2nd commit
after b324d66):** user challenged the #290 pass with two example URLs ("we miss out stuff
important"). Audit split them: Margelo Rive was ALREADY HELD (ANIMATION, pre-dated the issue);
neciudan react-compiler-explained was a CAP SKIP — overturned on review (fetch-verified: the
emitted cache-slot output / flow-inferred deps / memoize-behind-early-returns facet was genuinely
uncovered by the 9 existing REACT-CORE readings) → added w/ tagged claim (absent_deps compiler
pkgs, mirrors the smell's unless_dep). THE REAL GAP WAS PROCESS, not knowledge: skips lived only
in session reasoning, so a wrong skip was indistinguishable from a silent miss. FIX (echoes the
2026-06-25 "articles, not just entries" correction — same failure family, dropped-on-the-floor
judgment): **`tools/harvest-log/<source>-<issue>.md` is now a MANDATORY per-issue artifact** —
EVERY item gets kept→where / already-held→where / skipped→reason-class (corroboration · how-to ·
pre-ship · too-early · cap · off-scope · sponsor); cap/too-early skips note the recurrence signal
that would flip them; committed WITH the delta. twir-290.md written retroactively as the template
(45 items). upkeep-routine.md step 2 amended. Reading count 123→124; REACT-CORE claims ×2 now
cover both compiler lanes (shipping-it → saschb2b; not-yet-on-it + hand-memoizing → neciudan).

**HARVEST SCAFFOLDING SHIPPED — `react-brain harvest` (user "build it", 2026-07-16):**
tools/react-brain-harvest.mjs, zero-LLM/zero-dep, 3 modes: **inventory** (every link on an
issue page, mechanical regex; buckets content/same-site/chrome; IGNORE list for share-intents,
profile pages incl. slo.im + linkedin/in + single-segment dev.to/hashnode/github/twitter/bsky;
normalize() strips query EXCEPT youtube ?v= which is identity), **coverage** (set-diff page vs
manifest; unaccounted external link = exit 1 — manifests must carry URLs per row from #290 on),
**watchlist** (recurring skips across ≥2 manifests + reopen-signal rows; keyword match scoped
to the disposition CELL — /watch?v= in URLs false-positived the whole-line version). THE TOOL
CAUGHT ITS OWN BUG CLASS AT BIRTH: TWiR ships minified UNQUOTED hrefs — the quoted-only regex
saw 17/97 anchors (~80% silently missed); fix = href=(?:\"..\"|'..'|[^\\s>\"']+). Coverage now
57/57 on twir-290. WAYBACK FALLBACK added to the playbook (archive.org/wayback/available →
curl the snapshot; WebFetch CANNOT reach web.archive.org) — immediately recovered the
Cloudflare-walled thoughtbot piece → REOPENED per its manifest signal: RB-E-NAV reading #8
(JS-stack tolerated overflow; native-stack enforces iOS-26 Liquid Glass inheritance +
UIDesignRequiresCompatibility opt-out + hard-44pt bar) w/ claim gated @react-navigation/*
(lint enforced the 260-char claim cap — first draft failed, distilled). Routine step 2 now:
inventory FIRST → manifest w/ URLs → coverage gate → watchlist → per-pass spot-check (all cap
skips + 2 random from previous manifest). Exclusion bar is now: WebFetch + curl-UA + Wayback
ALL fail. cli verb + tools/README section added. npm test green (98/98). Cloud weekly-harvest
PR flow remains the one unbuilt improvement (needs user billing consent).

**FIRSTHAND WATCH LAYER (user picked it as "the single smartest addition", 2026-07-16):**
`react-brain harvest firsthand` (tools/react-brain-firsthand.mjs) — the ACQUISITION
INVERSION: derive the watch graph FROM the corpus (189 npm pkgs from detect+migrate rows →
dist-tag/deprecation-flag diffs via abbreviated registry metadata; 37 GitHub repos from
sources/readings → releases.atom; 26 author feeds from hosts cited ≥2× → RSS), diff vs
COMMITTED tools/.firsthand-state.json (pulse/census/signals baseline convention), print
events ROUTED BY ENTRY, --manifest writes the harvest-log skeleton. Known-entity events
now bypass newsletters entirely (zero editorial filter/latency); newsletters demote to
unknown-unknowns discovery + corroboration (routine step 2 + /harvest skill step 0 updated).
BUILD LESSONS: (1) docusaurus sites link feeds on /blog not the homepage head — well-known-
path probing (/blog/rss.xml etc., validated by parsing) took discovery 14→26 of 33 incl.
react.dev/reactnative.dev/reactnavigation.org/expo.dev/tanstack.com/swmansion; (2) retry-once
clears transient registry timeouts (7 scoped-pkg false failures on cold run); (3) npm 404 =
renamed/unpublished → record {gone:true}, report ONCE (op-sqlite); (4) event path proven by
STATE REWIND (rewind two entries, re-run → events render + state self-heals) — the test
pattern for any state-diff tool; (5) blog identity = feed item <id>/<guid>, cap 3 shown +
"+N more (consider dropping)" for high-volume feeds. ~45s/run, zero LLM/deps. Acquisition
now has THREE layers: firsthand (known entities, first-party) → newsletters (unknown
unknowns) → targeted hunts (gap filling). Commit: single commit after 7c98c2c.

**CLOUD WEEKLY HARVEST — consented, configured, BLOCKED ON GITHUB AUTH (2026-07-16):** user
said "set up the weekly cloud harvest" (= the billing consent). Pushed the week's 6 commits
(origin was 6 behind — cloud clones need the skill/tools!) + drafted the full RemoteTrigger
routine: Thu 09:00 IST (`30 3 * * 4` UTC), claude-sonnet-5, default env, tools incl.
WebFetch/WebSearch, propose-only prompt (firsthand → newsletters → manifests → coverage →
npm test → ONE PR whose body is the ledger; small-delta-is-health; scope-fenced to corpus/
manifests/state, never tools code or site/). CREATE returned **401 "Connect your GitHub
account before saving a routine"** — only the user can fix: install the Claude GitHub App /
connect at https://claude.ai/code/onboarding?magic=github-app-setup (repo heart-IT/react-brain).
Config PERSISTED at **`tools/cloud-harvest-routine.json`** (committed fc7576c) — once GitHub
is connected, any session POSTs it verbatim via RemoteTrigger create (regenerate the uuid).
Thursday chosen because TWiR ships Tue + React Status Wed.

**RECEIPTS GATE — `harvest verify-diff` + harvest-verify CI (user picked as round-2 "smartest
addition", 2026-07-16, commit 55e6136):** the acquisition constitution is now FULLY executable —
manifest (triage) → coverage (extraction) → watchlist (recurrence) → **verify-diff (verification
itself)**. tools/react-brain-verify-diff.mjs: diff-scoped vs --base (tracked git-diff added-lines
+ untracked union), collects URL claims from entries/docs (all added URLs) + manifest **kept**
rows ONLY (skipped rows exempt — they claim nothing), verdicts = ok (direct fetch) / archived
(Wayback availability API; must be NOTED in added text via /wayback/i else warning) / FAIL →
exit 1. registry.npmjs.org receipts → existence check; added lines saying "deprecat…" cross-
checked vs firsthand state npm flags (WARNING-only: ecosystem-level deprecations like Expo-SDK
are legitimately not npm flags). MANIFEST CONVENTION: line 2 = `issue: <url>` (firsthand ones:
`issue: firsthand`) → verify-diff + CI re-run the coverage gate FROM the manifest.
`.github/workflows/harvest-verify.yml` (PR paths corpus/encyclopedia/harvest-log, fetch-depth 0,
--base=origin/${base_ref}); npm test already covered by ci.yml. REFACTOR: shared primitives →
tools/harvest-lib.mjs (get+retry, pool, normalize, extractLinks, manifestKeys, coverageCheck,
waybackSnapshot) imported by harvest/firsthand/verify-diff — no CLI dispatch on import (avoided
the circular-import trap of exporting from a dispatching script). TESTED adversarially:
fabricated kept receipt → exit 1 (404 + no snapshot); walled-but-archived+noted (thoughtbot) →
passes; clean tree → 0; skipped-row bogus URL ignored; twir-290 header → coverage 57/57 in the
gate. GOTCHA: `cmd | tail; echo $?` reads TAIL's exit — capture exit codes unpiped. Cloud routine
prompt updated (gate is self-enforcing for the unattended agent). Runner-up idea on record:
auto-published verified weekly changelog from manifests ("This Week in react-brain") — the
distribution move, deliberately after trust.

**TRIPWIRES — standing caveats become executable release conditions (round-3 "smartest
addition", 2026-07-16, commit 94d1b77):** completes the prose→mechanism ladder (manifest/
coverage/watchlist/verify-diff/→tripwires = WHEN-TO-ACT). Entry schema: `tripwires:`
[{when:{pkg + exactly-one-of atleast x.y.z | deprecated true}, then, added}] — lint-validated
(mirrors migrate block). firsthand: tripwire pkgs UNION into the npm poll (react/solid-js
watched condition-only, no version-change noise via graph.npm.has guard); fired ⇒ ⚡TRIP event
w/ then: + registry receipt, fires ONCE (state.tripwires keyed entry:pkg:cond), row-removal-
after-acting auto-prunes state. `satisfiesTripwire()` in harvest-lib is PRERELEASE-SAFE
(1.0.0-beta.6 ⊉ atleast 1.0.0; higher-base prerelease ⊇) — eval-pinned (98→104), live-proven
(waku held). SEEDED 7 from prose caveats, each registry-verified UNFIRED at seed time: Rive-
Nitro≥1.0 + rive-react-native deprecated (ANIMATION WATCH note, prose cross-ref added),
next-auth deprecated (AUTH no-migrate-rule condition), react≥19.3.0, nitro-modules≥1.0,
solid-js≥2.0.0, waku≥1.0.0. Seeding rule: condition ALREADY true ⇒ act now, no dead tripwire
(TS 7.0.2 was already flipped by #289 — corpus was ahead). Lifecycle demo: forced-fire →
⚡ + awaiting-action banner → removal → state {}. GOTCHA (bit me): `git checkout <entry>` to
clean a TEST tripwire restores from INDEX — wiped the uncommitted REAL row too; re-append +
grep-verify after any checkout-cleanup. Harvest rule extended: new watch/revisit caveats get
WIRED AS TRIPWIRES AT KEEP-TIME (skill step 0 + routine + cloud prompt updated). The corpus's
hedges now page the harvester when they resolve.

**HARVEST BENCH — judgment benchmarked (round-4 "smartest addition", 2026-07-16, commit
c6f5de3):** adjudicated manifests = gold data generated as exhaust. `harvest bench`
(react-brain-triage-bench.mjs; providers anthropic-API / claude-cli-subscription /
--candidate=file offline) replays tests/fixtures/harvest/twir-290-inventory.json (57 links +
corpus context PINNED AT PRE-HARVEST COMMIT 136ab76 — 42-entry index + 228 held URLs) and
scores vs the gold manifest DETERMINISTICALLY (no LLM judge): parseGoldManifest/coarseReason/
scoreTriage in harvest-lib, eval-pinned 109 (perfect=100; falseSkip 25 vs overKeep 75 —
gold-kept ×3 weight); routing scored only where the gold entry pre-existed (gap-fills like
RB-E-AUTH excluded). triage-bench.yml = manual CI w/ repo key. TWO BUILD LESSONS: (1) RUN-ONE
CONTAMINATION — feeding the LIVE corpus made every gold-keep read 'already-held' (the gold
pass had added them); fixtures MUST pin pre-harvest state via git archive <sha> + that
snapshot's own detect.mjs; (2) claude-cli needs --max-turns 4 (denied-tool attempt burns
turns; bench.mjs comment was right). BASELINE ON RECORD: claude-sonnet-5 single-shot =
**59/100, keep-averse** — skipped ALL 8 gold keeps (Better-Auth-Vercel, Bun rewrite, screens
Tabs…) while over-keeping 3 already-held version facts; reason agreement 26/37. READ: the
'small delta is health / never pad' instruction OVER-STEERS single-shot triage toward skip —
the weekly cloud agent must run the full routine w/ fetch access (not one-shot), and any
cheaper-model swap must clear this bar. Gold n grows with every reviewed manifest — freeze
each issue's fixture at harvest time if bench coverage should compound. coarseReason must
stay IDEMPOTENT over its own outputs ('minor-release' hyphen bug caught by the perfect-
candidate smoke = the calibration trick for scorers: score gold against itself first).

**ADVOCATE PASS — first measured judgment intervention (round-5 "smartest addition",
2026-07-16, commit ff236d8):** the bench stopped being a report card and became a TEST BED.
`harvest bench --advocate`: second FRESH-CONTEXT call over the first pass's SKIPS ONLY,
mandate inverted ("advocate for the dropped — attack every skip reason"); merge via
applyAdvocate() in harvest-lib which may ONLY flip skip→kept (eval-pinned 111: already-held
untouchable) — one-directional because the measured bias is one-directional, so worst case =
reviewable over-keeps, never silent drops. Blueprint = the corpus's OWN AI-DEVTOOLS Bun
reading (implementer + adversarial reviewers, separate contexts) — corpus knowledge feeding
its own metabolism. LIVE A/B (sonnet-5/claude-cli): **56 → 63 (Δ+7)**, 3 flips = 2 correct
(react.dev WG governance + bun-in-rust — the two most consequential misses) + 1 wrong (nub,
cheap); 6 subtler false skips remain (reading/facet keeps: better-auth!, neciudan, thoughtbot,
screens, auth0, arianotify) — advocate is PARTIAL; full-routine context + fetch access still
required. Baseline noise ±3 across CLI runs; overfitting caveat recorded (generic
architecture, not fitted; gold grows per manifest). WIRED MANDATORY: cloud routine step 5,
/harvest skill step 5 (renumbered gates→6), upkeep-routine bullet w/ numbers. GOTCHAS: (a)
backticks inside a double-quoted `git commit -m` string get COMMAND-SUBSTITUTED by zsh —
garbled the pushed message; fixed via amend + push --force-with-lease (tip-only, seconds old);
use heredoc -F - for messages with backticks; (b) claude-cli needs --max-turns 4 (2 dies on
denied-tool attempt); (c) eval fixture keys must match applyAdvocate's normalize path (row.key
vs normalize(url) mismatch was an eval-fixture bug, not a merge bug).

**CLOUD PARKED → LOCAL WEEKLY HARVEST INSTALLED (user declined GitHub-App repo access,
2026-07-16, commit b4b9f68):** the autonomy pivot the June ledger originally predicted.
Cloud routine config stays PARKED in tools/cloud-harvest-routine.json (revive = connect
GitHub + RemoteTrigger POST). LIVE instead: **launchd job dev.react-brain.harvest**
(~/Library/LaunchAgents; Thu 09:00 local; launchd catches up after sleep — cron would
silently skip; uninstall = launchctl unload + rm plist) → tools/local-harvest.sh: creates
harvest/<date> branch from main BEFORE the agent starts (propose-only by construction),
aborts on dirty tree / existing branch, then HEADLESS `claude -p` (subscription, sonnet-5,
--permission-mode acceptEdits, --allowedTools Bash,Read,Write,Edit,Glob,Grep,WebFetch,
WebSearch, --max-turns 250) through the /harvest skill; narrative goes in the branch commit
message (headless runs must NOT write maintainer memory); NEVER pushes. Review flow:
git log main..harvest/<date> · git diff main...harvest/<date> · merge --ff-only; empty
branch = healthy no-news week (delete it). Log: tools/harvest.log (gitignored). FIRST
SUPERVISED SHAKEDOWN launched this session (React Status #483 expected due) — check the
harvest/2026-07-16 branch outcome in the session tail or harvest.log.

**SHAKEDOWN MERGED + TWiR #284-289 BACK-AUDIT APPLIED (2026-07-16, merge 6afe1b6 + backfill
commit):** (1) First local headless harvest run VERIFIED AND MERGED — the agent's spot-check
caught a REAL error in my twir-290 gold (Astryx was already in COMPONENT-LIBS since 2026-07-10;
my "too-early" skip was a dedup miss → corrected to already-held; bench gold thereby improved);
its RN-Rewind #46-48 re-triage was redundant-but-correct (the old "~#48" fuzzy bookmark — now
exact); re-verified its "sources current" claim vs ALL 6 live archives = all true (React Weekly
#28 = Jul-12 pubDate, no #29; React Status #482 still newest). (2) BACK-AUDIT method: scratch
script (extractLinks per issue − corpus URLs − manifest keys) → #290 = 0 unaccounted (manifest
discipline PROVEN), #284-289 = ~350 → triaged to: **RB-E-SHEETS** (44th entry; bottom-sheets
domain gap, 3 recurring signals incl. NEW @swmansion/react-native-bottom-sheet 0.16.2 + SWM-1.0
tripwire; gorhom 5.2.14 default; Emil Kowalski drawer reading — same-author precedent as
POLISH's toast piece) + Hermes-own-release-line fact (BUILD; --transform-ts!) + Bacon farewell
reading (BUILD; he LEFT Expo 2026-05) + Waku-slices fact + Hydrogen-rebuild note (META) + RR-v8
receipt (NAV) + checkout-v7 note (SECURITY) + runtimes/expo-desktop leads (NATIVE/DESKTOP).
EXCLUDED w/ reopen signals: longho compiler-retrofit (unverifiable ×3 — first real casualty of
the exclusion bar), Hermes N-API (tweet-only). Manifest: harvest-log/twir-backfill-284-289.md
(issue: backfill). LESSON: version facts/headlines never leaked (corroboration catches them);
what leaked pre-manifest was READING-tier + NO-ENTRY domains — sweeps/recurrence are the only
detectors for the latter. GOTCHA: don't invent schema fields (sources_backaudit) — receipts go
in `sources:`. Counts 44 (24r/20d); verify-diff 15/15; eval 111.

**DOCTOR TRAJECTORY — the time axis (round-6 "smartest addition", analyze-side, 2026-07-16,
commit 34a64a3):** `trajectoryScan(repoPath, deps, entries, {now})` in detect.mjs (git-only,
zero-LLM, {git:false} on non-git; --no-history flag). THREE layers: (1) CHURN — one
`git log --since=400.days --numstat` pass → per-file live(<90d)/aging/dormant(>1y);
computePriorities weights smell+modernize findings ×1.25 "LIVE" / ×0.7 "dormant" — review's
introduced-vs-preexisting generalized to the whole timeline (real proof: ourpot memoization
smell LIVE=58 vs ledgerhr's frozen identical=47); (2) ADOPTION — `git log -S'"pkg"'` on
package.json (execFileSync passes the quotes INTO -S = matches the json key, intentional)
→ <90d arrivals surfaced ("live choice, cheap to reverse"); (3) MIGRATIONS — entry w/
legacy-marked detect pkg (RETIRED label regex OR migrate.from) installed NEXT TO modern
replacement → files importing legacy NOW vs at `rev-list --before="6 months ago"` →
in-progress/STALLED-since/regressing/done-remove-dep + remaining files; new 'finish'
priority kind (regressing 95 > stalled 78 > done 62 > in-progress 55). TWO BIRTH LESSONS:
(a) glob detect rows must RESOLVE to concrete installed pkgs (rowDeps: @scope/* + name*
prefix) — first eval run caught it; (b) the "coexisting" heuristic (≥2 non-legacy rows =
slot conflict) false-positived on 4 ourpot entries (hypercore+autobase = STACK not conflict)
→ CUT at birth per the ourpot precision rule — only legacy-vs-modern pairs make claims.
Eval 116 (synthetic BACKDATED git fixture via GIT_AUTHOR/COMMITTER_DATE env — the pattern
for history-dependent tests; trajectoryScan takes {now} for determinism). Mentor Phase-0 (i):
phrase in trajectory terms (finish/unstick/stop/reverse-cheaply). Real finds: ledgerhr
adopted pear-runtime+electron 2026-06-12; ourpot Holepunch stack late-April.

**ACKNOWLEDGED FINDINGS — decide↔doctor loop closed (round-7 "smartest addition",
2026-07-16, commit 6eefb42):** kills the advisor death spiral (repeating overruled advice).
ADR frontmatter `react_brain.quiets: [kind:RB-E-X…]` (finding keys; written via `decide
<topic> <repo> --quiets=…`); checkAdrs returns quiets (superseded/rejected records quiet
NOTHING — status gate in acksOf); computePriorities: premise-HOLDS → finding folds into
acknowledged[] (quiet ☑ ACKNOWLEDGED section, out of priorities); premise-BROKEN (entry
re-verified since record / prediction resolved / horizon passed — checkAdrs flags) →
RE-OPENED in TOP PRIORITIES: score max(×1.5, 85), ⚡ prefix, why names EXACTLY what changed +
which ADR is being re-litigated; valid decision outranks broken one on the same key.
Mentor Phase-0 (j): acknowledged = settled (one line max); reopened = LEAD with it; when
user accepts a divergence during mentoring → OFFER `decide --quiets` (how advice stops
repeating). Eval 119 (quiet → premise-drift reopen ≥85 → broken-acknowledges-nothing, on
the backdated fixture). LIVE: ourpot docs/adr/001-crossplatform.md (UNCOMMITTED in ourpot —
user's to commit) quiets smell:RB-E-CROSSPLATFORM (the Platform.OS 10-file nag) → left
priorities, FORMS rose into the slot; premise re-checked until 2027-03-17. GOTCHA:
printReport already had `const adrs` for its decisions section — hoist, don't redeclare.
COMPOUND LOOP now: corpus tripwires fire → entry updated: bumps → every ADR resting on that
entry flags premise-moved → its quieted findings re-open. The corpus's hedges page the
harvester; the user's decisions page the user.

**REGISTRY PREFLIGHT — analysis past the curation boundary (round-8 "smartest addition",
2026-07-16, commit 3a12e00):** doctor was blind to ~35 of ourpot's 60 deps (corpus-unmapped).
harvest-lib registry primitives (pure/offline-testable): `satisfiesRange` (npm-range subset:
|| · space-AND · hyphen · ^ ~ comparators · bare/x-wildcards; prereleases NEVER satisfy —
validated vs reanimated's live "0.83 - 0.86"); `slimDoc`/`fetchDepDocs` (abbreviated metadata
HAS per-version peerDependencies — confirmed; slim to last-40-stable peers; pooled, 7d cache
tools/.registry-cache.json gitignored — doctor stays offline by default, --preflight/--target
= network opt-in, keeps ci.yml's no-network promise); `classifyDepHealth` (deprecated flag /
>18mo silence=abandoned / ≥2-major lag); `preflightVerdict` (ok/bump/BLOCKER/no-peer vs
target's peer ranges). Doctor: DEP HEALTH section (deprecated routes back via matchDetector
to the corpus replacement; VERSION-LOCKED FAMILY FOLD — 15 "expo-x 2 majors behind" rows =
ONE fact shouted once, ≥3 same-family lag rows collapse) + UPGRADE PREFLIGHT
(--target=react-native@0.86.0) + health/preflight priority kinds (85/42/38; blocked-upgrade
aggregate 60) + json depHealth/preflight; mentor Phase-0 (k) = cite blocker lists, never
guess feasibility. Eval 129. FIRST LIVE ANSWERS: **ourpot → RN 0.86.0 = ZERO peer blockers**
(18 ok, 29 unconstrained, ~3s); blind-pairing (Holepunch) silent 21 months. Analyzer's
blindness categories now all closed: snapshot(state) + time(trajectory) + decisions(acks) +
world-beyond-corpus(registry).

**SWAPS & UPSIDE — the aggressive layer (user: "suggestions should be aggressive… you are
using x whereas y has better perf", 2026-07-16, commit 699c752):** replaced doctor's timid
"WORTH A LOOK (not necessarily wrong)" with head-to-head SWAP CANDIDATES: yours-vs-pick with
BOTH tradeoffs quoted verbatim from the entry's option rows, axis extracted (QUANT_RE
\d+[x×%] clauses preferred; quantified swaps score 58 vs argued 46, ÷ M-L effort), npm i via
pkgsForPick, census field position; UPSIDE = aligned-but-unclaimed quantified wins (Nitro
~10x/~100x vs ourpot's Expo Modules; facetpack ~36x); FRESH-START grade when the resolved
when-clause ENDORSES the incumbent (anti-churn honored, default shown as information).
FOUR false-positive classes caught at birth (the ourpot precision rule, live each time):
(1) <Activity> pitched as alternative to the React it's PART of → no <Feature> rows;
(2) Pake vs deliberately-contextual Pear → upside on ✓-aligned ONLY; (3) Vite offered to an
RN repo → wrong-lane filter (/\bweb\b/ on rn); (4) Metro flagged because the 'Babel
bottleneck' clause names swc → used-in-DEFAULT suppression. MATCHING LESSONS: identity =
detect-label HEADS + word boundaries ('toast' ≠ "Toasts" — option-prose word overlap is
hopeless); incumbent endorsements live in the clause's CONTEXT half (test r.ctx+why, not why
alone); version rows need an already-at-pick guard (repo on 0.86 must not be told "target
0.86"). Mentor Phase-0 (l): use swaps AS-IS (MP-GROUNDED by construction — axis is corpus
text), never soften to 'worth a look'. json: swaps[]/upside[] (grade/note/axis/pkgs/effort/
field). Eval 134. Quietable via acks (kind swap:/upside:) automatically.

**CONSOLIDATION + v0.8.0 RELEASE (user "do it", 2026-07-16, commits d9e6b5f + 9ed12d6):**
(1) ONE SCHEDULER: Monday cron (pulse+signals+census) RETIRED — trio now runs as Tier-1
pre-step in local-harvest.sh (baselines land on the harvest branch for review);
install-cron.sh deleted; crontab entry removed. (2) pulse-routine.md DELETED (pre-manifest
duplicate of upkeep-routine; "why propose-only" paragraph ported); refs fixed in pulse.mjs/
harvest-state/README. (3) tools/README gains the 9-row STATE-FILE MAP. (4) Root images
(Website_UI/ 1.4MB + logo png) UNTOUCHED — user never answered delete-vs-move. (5) v0.8.0
CUT: npm version minor + push --follow-tags → release.yml (OIDC trusted publishing).
RELEASE RUN 1 FAILED TWICE-OVER, both catches valuable: (a) alias lockstep gate — the
"version" lifecycle script did NOT fire during npm version (cause unconfirmed; alias stayed
0.7.7) — synced manually, gate worked as designed, publish was skipped so retagging safe
(git tag -f + push -f tag); (b) SITE had been RED FOR DAYS: my Bun-reading edit consumed
the next item's '- title:' line → DUPLICATE MAP KEYS in RB-E-AI-DEVTOOLS → tools' tolerant
loader served a FRANKEN-READING (Bun title + Expensify url/what) while lint/eval stayed
green; site's strict yaml parser refused → pages+ci(site) failing since, unnoticed.
FIX + INVARIANT: lint now re-parses every entry file + encyclopedia.yaml with the STRICT
yaml pkg (parseDocument errors/warnings = lint errors; pyyaml-only env skips gracefully).
LESSONS: multi-line Edit anchors that end at the next list item's '- title:' line can EAT
it — check `git diff` for '- title' balance after reading insertions; the strictest
downstream parser defines validity; watch workflow runs after every push (red pages sat
3 days). Left open: user's delete-vs-move call on root images.

**SMARTER/EFFICIENT SEQUENCE (user "plan, and implement in sequence", 2026-07-16): item 1
SHIPPED — `harvest prep <source>` (commit 29c42c4):** next-issue probe via url_pattern in
harvest-state (TWiR + React Status wired; slug/RSS sources degrade to guidance) + inventory
cross-ref vs corpus URLs AND all manifests (parseGoldManifest) → manifest skeleton with known
links PRE-DISPOSITIONED, only novel = TODO (sorted first). Re-prep of twir-290: 57/57
pre-dispositioned, 0 TODO. prepClassify pure in harvest-lib, eval 137. Skill step 1 = prep
first. REMAINING SEQUENCE (tasks #6-8, planned not built): (2) bench gold auto-freeze per
pass + monthly re-bench (routine edits); (3) doctor OUTCOME MEMORY per repo (baseline
last-run priorities → RESOLVED/PERSISTING(n visits→suggest decide --quiets)/NEW + advisor
hit-rate per kind — pulse-baseline pattern turned inward); (4) corpus cadence
(graduate-2/challenge-2 weekly in routine) + doctor --brief + harvest digest + --siblings.
Also open: post-release checks habit (red pages sat 3 days), site not yet surfacing
swaps/trajectory/preflight.

**Why:** user wants the skill to "improve as time goes" alongside the encyclopedia.
**How to apply:** when entries are authored, update `encyclopedia.yaml` status + options + context-keyed recommendation; keep cited entry `id`s stable. See [[react-brain-project]].

**HARVEST 2026-07-20 (commit 1d46dea): React Digest #2325 + firsthand.** Digest #2325
("I stopped destructuring everything", slug 2320→2325 non-sequential as expected): 12 links,
2 already held (neciudan compiler → REACT-CORE, performance.dev/chatgpt → NAV), 1 fact —
NAV v8 row now NAMES middleware-default (v8_middleware flag removed), receipted to the
official v8 post already in sources after the Medium commentary 403'd the verifier (receipt
= official source, commentary reclassified to skip: the gate working as designed). Featured
destructuring piece skipped off-scope (universal style opinion → engineering-principles;
unconditionable as a claim). Firsthand 46 events, 0/8 tripwires: shadcn promoted React Aria
to a THIRD first-class base (`init --base aria`, Base UI still default) → COMPONENT-LIBS;
swmansion Edge-AI-production survey → ONDEVICE-AI reading (claim: proven at big-tech scale,
fine-tuning makes small models good enough); Margelo RN chat-stack deep-dive → AI-UI reading
(claim: per-token JS-thread work is what makes streaming chat jank); TanStack AI 0.41 +
react-native-auth0 v5.10 (MFA) touch-ups. Advocate pass: no flips (closest: destructuring
piece, brownfield 4.3.0 R8 support). Spot-check rn-rewind-49: no cap skips, 2 random sound.
PROCESS: firsthand run WITHOUT --manifest advances .firsthand-state.json and a re-run says
"no new events" — head the FIRST run's output or git-checkout the state and re-run --manifest
(cost me one restore this pass). Watchlist false-positive: same-event npm+GitHub rows in ONE
manifest count as "recurring ≥2 issues". Vercel.com blog feed is noise per the CLI's own
suggestion — maintainer call pending on blocklisting it.

**HARVEST 2026-07-20b (commit 766c0d8): React Status #483.** First url_pattern source
through the FULL prep flow: 44 links, 4 pre-dispositioned (incl. the same-morning Margelo
keep — the firsthand layer beating the newsletter, cross-ref working as designed), fixture
frozen to tests/fixtures/harvest/. Keeps: ReactBench → AI-DEVTOOLS option row (Million
team; React-WEB model-selection counterpart to Callstack's RN Evals; react-doctor as its
400+-rule verifier — the DX/AI-DEVTOOLS cross-ref tightens); dx-styles essay → STYLING
reading + linaria/@linaria/* detect rows (maintainer verdict: Linaria frozen by design,
stays maintained, NOT deprecated; dx-styles = zero-runtime successor on wyw-in-js w/
migration guide — supersession-in-progress handled per Rive/next-auth precedent, no rule);
META-FRAMEWORKS note: Next.js security releases now MONTHLY with advance notice (first:
2026-07-20, 16.2+15.5, 4H+5M; first-party post verified + sourced) — softens-not-removes
the track-latest-minors caveat. BIG SKIP: Pete Hunt (+ Nick Schrock) joining Vercel, Hunt
LEADING NEXT.JS — rauchg tweet-only (WebFetch 402; Wayback save 523 + API 429'd), N-API
precedent applied; reopen fires when the written announcement lands (vercel.com/blog is
firsthand-watched). Preact 11 still pre-ship (npm: latest 10.29.7, beta 11.0.0-beta.2).
Also skipped-with-reopen: shadcn Typeset (minor feature), brainless agent-UI components
(too-early, AI-UI is the home on recurrence), DSSSP/dropzone/Mosaic/joyride/Travels (no
entry homes). Lint's deprecation heuristic false-positives on the phrase "NOT deprecated"
in a reading — benign, but phrasing-aware wording could avoid the warning noise.

**HARVEST 2026-07-20c (commit 3a6ec19): Native Weekly #17.** 47 links; the 17-release
roundup was 100% already-dispositioned-or-routine (the firsthand watch + twir-290 had
consumed every one — the layering is doing its job; Margelo chat post hit its THIRD
independent sighting this week). Keeps: Teamworks case study → BUILD reading (Metro →
Re.Pack + Module Federation + shell app across 7 mini-apps; lead time 1-2 days → ~10 min,
2 CI/CD lanes — the production receipt grounding BUILD's own module-federation when-clause;
callstack.com bot-gate → browser-UA curl path again); Argent autonomous-repro post →
AI-DEVTOOLS source (the row's cloud-agents clause had NO receipt until now — worth
scanning other rows for receipt-less clauses sometime). SKIP of note: Expo "Three AI Tools
That Actually Matter" — expo.dev/blog JS shell + Wayback 429 ALL DAY (archive.org rate-limit
was a recurring obstacle this whole 3-issue session: X post save, Expo post) — reopen if it
lands in a changelog. NW source notes confirmed again: agentic beat strongest, rnsec
self-promo absent this issue. Broken template social links (literal linkedin.com/user etc.)
in the beehiiv footer — inventory handles them fine as off-scope rows.

**HARVEST 2026-07-28 (branch harvest/2026-07-28, commit 7d9c64d): the first ALL-SOURCES
pass — TWiR #291, React Status #484, React Digest #2330, RN Rewind #50, React Weekly #29+#30,
plus firsthand (105 events).** 22 deltas / 16 entries / 0 new entries. Native Weekly had no new
issue (still #17). Counts: RNR ×50, TWiR ×25, Status ×25, Digest ×19, NW ×7, RW ×23.

THE WEEK'S SHAPE was security: three sources independently carried React's server-function DoS
(GHSA-wx67-qw84-cm4g, High 7.5 → SECURITY floor moved 19.2.5+ → 19.2.8/19.1.9/19.0.8, and the
note now says the family RECURS rather than pretending a floor is final); React Router shipped
six advisories on 2026-07-22 (unauthenticated __manifest DoS High 7.6 among them → NAV floor
8.3.0 / 7.18.0, migrate rule `below: 8.0.0` rewritten to `below: 8.3.0` so it doesn't double-fire
for v7 users); and Next.js's first SCHEDULED release gave the note its missing patched versions
(16.2.11 / 15.5.21 — the entry had the counts from #483 but not the numbers you'd actually pin).

FIRSTHAND EARNED ITS KEEP AGAIN, differently: the find was tanstack.com "We Stopped Using RSC on
TanStack.com" — which no newsletter surfaced and which REVERSES a URL already sitting in
META-FRAMEWORKS `sources:`. Worth generalizing: an author-feed post that contradicts an existing
source is higher-value than any new reading, and nothing in the pipeline looks for that
explicitly. Consider a check that diffs new author posts against cited URLs from the same host.

TWO REOPEN SIGNALS FIRED, both as designed: twir-290's pnpm RFC ("candidate when it lands in a
pnpm release") → pnpm 11.11-11.14 native workspace release management → DX; and the AI-DEVTOOLS
"track, don't bet" hedge on Expo Agent, which died five weeks after the entry listed it. The
Expo Agent shutdown got written up as a CATEGORY lesson in the note (skills/MCP layer outlives
the hosted-product layer) rather than a row deletion — that framing is the reusable part.

PIPELINE BUGS FOUND — AND FIXED THE SAME SESSION (commit d200305, branch harvest/2026-07-28).
(1) `parseGoldManifest` fell through to `skipped` for any cell that wasn't `**kept`/`already-held`,
including the literal `TODO` that prep and `firsthand --manifest` write for un-judged rows. So
generating the firsthand manifest BEFORE prepping poisoned twir-291 with 5 fake carry-over skips
(react-status-484 then inherited more from twir-291's own TODOs), and the same phantoms would
have reached bench gold + watchlist. Now TODO rows are parsed out; coverage was never affected
(it counts URLs via manifestKeys, not dispositions). Manifest ORDER no longer matters.
(2) `harvest firsthand` advanced .firsthand-state.json on EVERY run, so a poll that merely
printed events consumed them — the first invocation ate all 105 and only `git checkout` on the
state file got them back. State now advances when nothing is at risk (baseline / quiet run) or
when `--manifest` has written the events to disk; a bare poll is dry, repeatable, and says so.
Both got eval assertions (139 now; the two new ones fail against the old parser), and trap 2 was
verified end-to-end against the live script with a synthesized pending event. The generalizable
lesson: in this pipeline, "reported to a human" and "recorded as handled" were the same write —
any tool that consumes a queue should only advance it once the items are durably captured.

CALIBRATION: 39 added URLs, all verify-diff green. Kept more than a typical pass (~2 weeks of
backlog × 6 sources), and the reading-list cap got overridden three times — each time because the
same item appeared in 3+ independent sources (composition ladder in TWiR+Status+Digest;
Calazans' two benchmarks in TWiR+Status+RW). Corroboration count is a decent tiebreaker against
cap when the list is full. RN Rewind #50 yielded ZERO and that was right: an essay issue whose
one durable fact (Detox idle-sync vs Maestro a11y-tree polling) appeared only as sponsor prose
about a competitor — the rnsec provenance bar applied in reverse.

FEED HYGIENE: github.blog, vercel.com and blog.logrocket.com produced ~35 of 105 events and zero
keeps; the tool prints its own "high-volume feed — consider dropping this host" hint for all
three. Prune before signal/noise degrades further.

REACT WEEKLY ACCESS, now fully documented in harvest-state: `harvest inventory` returns 0 links
(JS shell), so the coverage gate CANNOT cover this source. Links live in rss.xml content:encoded
as api.react-weekly.dev/track/click/<id> redirects and must each be resolved with `curl -L`.
React Digest resume also needs /newsletters.rss (the /digests path 404s and page 1 of the archive
lists OLDEST-first, which is a trap: #2330 is only visible via RSS).

---

## 2026-08-04 — TWiR #292 · Status #485 · Digest #2335 · RN Rewind #51 · React Weekly #31 + firsthand (branch harvest/2026-08-04, commit 9f5d7b4)

Second all-six-sources pass; Native Weekly still stuck at #17 (two consecutive passes with no new
issue — it is genuinely ~6-weekly). 93 firsthand events + 156 newsletter links; 12 entries touched,
0 new entries, 21 added URLs all verify-diff green.

THE FIND OF THE PASS WAS A CORRECTION, NOT A KEEP. PAYMENTS said react-native-iap was
"deprecated/archived → prefer expo-iap". False. The standalone repos (hyochan/react-native-iap,
hyochan/expo-iap) were archived 2026-04-26 when both libraries MOVED into the hyodotdev/openiap
monorepo, and both shipped majors the same day (react-native-iap 16.0.2, expo-iap 5.0.1,
2026-08-03) with no npm deprecation flag on either. The corpus had read an archived REPO as a dead
PACKAGE — and then recommended against it. GENERALIZABLE CHECK, worth doing whenever an entry
says a package is dead: `registry.npmjs.org/<pkg>/latest` for the deprecation flag AND the
`repository.url` field, because a moved package keeps publishing from a new home while its old
repo shows "archived" forever. The firsthand watch graph is what caught it — it reported a version
bump on a package the corpus had written off, which should always be treated as a contradiction to
investigate, not a routine minor.

STATUS FLIPS: TanStack Table v9.0.0 went stable ON THE DAY of the pass (2026-08-04) — that fired
the reopen on a skip which had recurred across FOUR manifests, exactly as the watchlist is designed
to do. webpack 5.109 is the sleeper: `experiments.css/html/typescript/asyncWebAssembly` now default
to "auto" (on unless a loader claims the files) plus Vite's `import.meta.glob/env/resolve` and
`?raw|?inline|?url` — webpack closing the CONFIGURATION gap with Vite while the Rust-speed argument
stays untouched, so BUILD's default did NOT change. Also MobX 7 (Proxy-only, legacy decorators
gone, React 18+), Playwright 1.62 (component testing rebuilt on stories/galleries — narrows the
Storybook-vs-Playwright split), Skia 2.10 (HostObject→JSI NativeState), and XPREM, which is
expo-open-ota RENAMED at v3 and now names OTA's previously-anonymous "self-host the protocol" row.

ADVOCATE PASS FLIPPED ONE: the dx-styles zero-runtime CSS-in-JS field map, skipped `cap` three
times. What won it was NOT the three-source recurrence — that only prompted the re-argument. It
was asking "what facet does the ENTRY lack": STYLING named no zero-runtime web option except
StyleX (no vanilla-extract, Panda, next-yak, Griffel anywhere), so a comparative field map was an
uncovered facet, not a duplicate. Four detect rows shipped with it. THE RIGHT ADVOCATE QUESTION IS
ABOUT THE ENTRY'S GAPS, NOT THE ITEM'S POPULARITY — corroboration count is a trigger to re-open the
argument, not the argument itself.

SPOT-CHECK CAUGHT A TRAP. twir-291 had ZERO `cap` skips, so the two random picks were the whole
check — and one of them found that the npm names `tsrx` and `octanejs` are already occupied by
UNRELATED packages (`tsrx` 1.2.1 "Typescript + React", 2022; `octanejs` 0.0.3, 2023). Both were
carrying the reopen signal "reaching a stable npm release", which a future pass would have marked
FIRED on a 200 + a version number. Reopen signals phrased as "is it on npm" are unsafe for
unreleased projects; verify IDENTITY (repository field / description), not existence.

TWO ZERO-KEEP ISSUES AND BOTH WERE CORRECT: RN Rewind #51 (supply-chain essays — CISA axios alert,
event-stream handoff, a dependency-review vendor; SECURITY already holds that thread with better
sources, and the week's one durable supply-chain fact came from TWiR's link to the GitHub changelog
on npm publish-time malware scanning) and React Digest #2335, whose headline article was a how-to
already skipped back in twir-290. RN Rewind has now yielded 0 twice running — it has drifted from
library releases toward essays; worth watching whether it stays worth six sources.

FEED HYGIENE UNCHANGED: vercel.com (+17 posts), github.blog and callstack.com again produced
overflow markers and zero keeps. The prune recommended last pass has not been done.

## 2026-08-07 — TWiR #293 + firsthand 08-06/08-07 (main, commit aaa9a3c)

ONE newsletter this pass: TWiR #293 (Aug 5). Status #486 not out (probed), Digest still #2335,
RN Rewind still #51, Native Weekly still nothing after #17 (THREE passes running), React Weekly
still #31. Plus an inherited debt: the 08-06 session had run `firsthand --manifest` (state
advanced, manifest written) but never triaged it — the session ended before triage. Finished that
manifest, then captured 08-07's 40 drift events into a second one. Lesson: a `--manifest` run
whose triage doesn't complete leaves a committed-state/untriaged-manifest gap; if a session runs
the poll it must finish the triage or say loudly that it didn't.

7 KEEPS ACROSS 6 ENTRIES, all fetch-verified: (1) SECURITY — GitHub's first-party umbrella post
"Disrupting supply chain attacks on npm and GitHub Actions" (staged publishing, 72h account
lockdown, npm v12 script defaults, Actions hardening, 3-day Dependabot cooldown = install-age
gating as PLATFORM default) as reading + note; the sibling "malware advisories beyond npm" post
stayed skipped (engineering internals). (2) NATIVE — SWM's "The Memory Hermes Can't See": Fabric
ShadowNode retention pinned by JS wrappers, invisible to Hermes heap snapshots; the memory
sibling of the held Discord jank postmortem; author's own mitigations judged not production-ready,
kept as debugging awareness. (3) AI-DEVTOOLS — Expo's Fable-5-vs-GPT-5.6 one-shot shootout
(3 real Expo apps, $2k/2B tokens; durable lesson: the simulator-validation loop dominates token
spend, model numbers are point-in-time). (4) AI-DEVTOOLS note — AppControlBench: SWM's live
leaderboard benchmarking exactly the entry's two device-driving options (Argent, agent-device)
× models. (5) AI-UI — boda.sh generative-UI taxonomy (tool-JSON registry / declarative A2UI+AG-UI
specs / sandboxed open-ended): the STYLING-field-map precedent again — kept for the ENTRY's
missing spec-layer facet. (6) ANIMATION — Motion 13 (framer-motion 13 in lockstep): sole breaking
change drops @emotion/is-prop-valid auto-detection, styled-components/Emotion users must inject
prop validation via MotionConfig. NOT a tripwire (those watch Rive + RN 0.87) — majors on watched
packages still need manual triage. (7) EDITORS — react-native-enriched-html 1.1: the SWM family's
first ≥1.0 member; TWiR's "full web feature parity" is NOT in the release notes, entry states
only verified facts (+ option row + detect row).

FETCH-PLAYBOOK FLIP: expo.dev/blog now fetches via browser-UA curl (189KB, full post) — the
"JS shell, use the changelog" rule was stale; routine + skill amended to try curl-UA first,
changelog still preferred for version facts. GATE CATCH: TWiR's enriched-html href carries a
trailing %20 that 404s — coverage wants the page's exact URL accounted while receipts wants the
kept URL reachable; resolved with a clean-URL kept row + a malformed-href skip row for the %20
variant. ADVOCATE PASS: no flips (closest: React Arven too-early, TanStack Charts pre-alpha
→ CHARTS when it lands, use-webmcp-tool unreleased lab). SPOT-CHECK twir-292: 5 holds, incl.
noting the soak-test cap-skip's reopen (OBSERVABILITY memory lane) did NOT fire from NATIVE's
new memory reading — RN/Fabric-specific ≠ web-SPA lane. FEED HYGIENE: vercel.com noise flagged
in BOTH firsthand manifests (third pass running; prune still not done — maintainer call);
blog.margelo.com moved to margelo.com/blog and re-reported its back catalog (all held; NOT a
prune candidate). SolidStart 2.0 shipped on Solid 1.x — the solid-js ≥2.0 tripwire correctly
did not fire. Counts: TWiR ×27; verify-diff 8 receipts green; eval 139/139.

### Addendum, same day — React Status #486 (commit 8dbb6f8)

Status #486 published the SAME Thursday as the pass, an hour after `harvest prep` probed and
found nothing — a "we are updated to latest?" check re-probed and caught it. Lesson: a Thursday
harvest should re-probe Status before declaring the pass complete. Two keeps: (1) SECURITY —
the keyv worm (Aug 4, via Aikido's incident report): maintainer GitHub takeover, poisoned
versions with VALID GitHub-Actions provenance, preinstall dropper, 444 packages / ~2B monthly
installs in a day — live receipts for two claims the entry already argues (provenance is not
enough; registry scanning catches only what it detects — the worm shipped a week after
publish-time scanning went default). Note + source now; promote to reading on a definitive
postmortem. (2) DATA — Calazans "You Should Not Use Relay for Everything": the counterweight to
the entry's "Relay for scale" row (config/experiments/time-series/SDUI/assets don't earn
normalization; 18MB store profiled). Corroboration mostly self-resolved via prep: 21 of 47
links pre-dispositioned, incl. this morning's Expo shootout keep already cited back at us.
No advocate flips (closest: WebMCP's official Chrome docs — half the reopen bar; held).
Counts: Status ×27. All-sources state: TWiR #293 · Status #486 · Digest #2335 · RNR #51 ·
RW #31 · NW #17.

## 2026-08-07 — triage rules: the pipeline learns its own reflexes (tooling, same session as the reorg)

Of the 195 manifest rows hand-written this morning, 75+ were mechanical (patch bumps,
nightlies, sponsor tracking links, platform chrome). New `tools/triage-rules.yaml` +
`react-brain-triage-rules.mjs`: `prep` and `firsthand --manifest` now write matching rows
pre-dispositioned `[rule:<id>]` instead of TODO. Design: SKIP-ONLY (mirror of the advocate
pass's keep-only flips — each side's worst case is reviewable noise for the other to catch);
hard guards for ⚡TRIP / DEPRECATED / majors / prerelease→stable graduations / entry
version-pins (grain-aware: a patch defers only to exact x.y.z pins); ADMISSION BY GOLD —
`harvest rules` replays every rule against all 889 adjudicated rows in 28 manifests, zero
unwaived kept-collisions or inactive, re-checked by npm test as gold grows.

The gate earned its keep before shipping: the "obvious" npm-patch rule had 3 gold-kept
collisions (all 2026-08-04, all duplicate-anchors — TWiR #292 carried the same facts, so
they're waived with citations); npm-minor had 2 REAL would-be losses (auth0 5.9→5.10 was a
pure-firsthand pin-refresh no newsletter covered) and stays INADMISSIBLE — minors remain
judgment. gh prereleases admitted only for nightly/canary/experimental/insiders (an rc was
gold-kept once: RN 0.87.0-rc.3). Admitted actives: npm-patch (74 agree), npm-prerelease,
gh-nightly, sponsor-tracking-domain, vercel-changelog-chrome (the standing "drop vercel?"
flag resolved as policy), vscode-updates — 105 gold rows would have been auto-dispositioned.
Spot-check now samples 2 random [rule:*] rows; a wrong rule row indicts the RULE.
Engine guards pinned by tests/triage-rules.test.mjs (24 assertions). Cloud agents cannot
edit triage-rules.yaml (out of PR scope) — rule activation stays a maintainer judgment.

## 2026-08-18 — RN 0.87 pass: 6 sources, 11 days of drift, 20 keeps across 18 entries

ELEVEN DAYS since the last pass and every source except TWiR had moved: Status #487, Digest #2340
+ #2344, RN Rewind #52 + #53, React Weekly #32 + #33, and Native Weekly #18 — the first NW issue
after four consecutive dry passes, which settles its cadence note as genuinely ~monthly. 113
firsthand events (40 auto-dispositioned by rules, 73 judged). The spine of the whole pass is React
Native 0.87 stable (2026-08-11), which five of the six sources carried.

TWiR DID NOT PUBLISH — AND `prep` DISAGREED. `harvest prep this-week-in-react` probed
/newsletter/294, got a 175KB 200, wrote a manifest and froze a bench fixture. The page is a STUB
for an unpublished issue: title "This Week In React #294: ...", description "Hi everyone!", and
the only real links are next week's sponsor slots (posthog's tracking URL literally says
`twir-aug19`). The archive listing stops at #293. Deleted both artifacts and wrote the trap into
harvest-state.json: a 200 is not proof of publication on this source; cross-check the archive or
reject a title ending in ": ...". Left unnoticed, the next pass's prep would have refused to
overwrite a manifest built from a stub, and the bench gold would have inherited a fixture with
eleven links in it.

THE TRIPWIRE FIRED AND THE PREMISE WAS CHECKED BEFORE IT WAS OBEYED. ANIMATION's
`react-native ≥ 0.87.0` tripwire says 0.87 carries the upstream Hermes fix for the worklet
debug-metadata regression. The 0.87 release blog never mentions Hermes, so the `then:` was not
self-evidently true. Verified through a chain instead: SWM's post names the backport as Hermes
250829098.0.15, and the v0.87.0 tag's package.json pins hermes-compiler 250829098.0.16. Only then
was the four-fix ladder rewritten as history ("fixed from 0.87 up"), "wait for RN 0.87" dropped as
an option, and the row removed. Worklets 0.12 (2026-08-11) landed alongside — and the newsletter
framing needed correcting there too: 0.12.0 is on npm's `next` tag while `latest` is 0.11.4,
published a day LATER. Its Bundle Mode work (local bundles mmapped instead of living in an
in-memory std::string, Android dev-server bundles streamed to a cache file) strengthens the
"enable Bundle Mode regardless" line rather than replacing it.

RN 0.87 ITSELF, verified against the blog AND the v0.87.0 CHANGELOG: Strict TypeScript API is now
the DEFAULT (deep imports into Libraries/* are type errors; the react-native-legacy-deep-imports
customCondition is a bridge that expires after 0.88), Metro 0.84→0.87 (2x faster source maps, half
the source-map memory, stable TS/ESM config files, YAML + .es6 configs dropped), experimental
SwiftPM, AGP 9, Node ≥22.13 / Kotlin 2.0 / compileSdk 37, InteractionManager and friends removed,
backgroundImage de-experimentalized (which fired a twir-292 reopen), 0.84.x unsupported. It landed
in RN-VERSIONS (row + note + recommend + the migrate rule, now `below: 0.87.0`), BUILD (Metro) and
TYPESCRIPT (a when-clause).

THE BEST LINK OF THE PASS WAS THE LEAST PROMINENT ONE. RN Rewind #53 mentioned in passing that
CocoaPods "will shut down permanently on December 2, 2026". Checked at the source: CocoaPods has
been in declared maintenance mode since 2024-08-13, and on 2026-12-02 trunk goes READ-ONLY —
permanently refusing NEW Podspecs, with the Specs repo archived and a test run 2026-11-01→07. The
CDN and Specs repo keep serving, so existing builds and existing pod versions keep resolving and
private specs repos are untouched. "Read-only" versus "shutdown" is the difference between an
audit and a panic — and it is what puts a date on 0.87's experimental SwiftPM path. Recorded with
the correction visible in both the entry and the manifest.

TWO FIRED REOPEN SIGNALS PAID OFF, ONE DIDN'T. GTKX 1.0 (2026-08-04) fired the exact signal wired
at TWiR #291 — "1.0 stable → DESKTOP option row" — and closed a hole the entry had carried since
it was written: every other row reaches Linux through a webview or not at all, so there was no
Linux-native React row. react-native-plain-text fired its "recurrence or adoption signal" reopen
on its 2nd independent mention (TWiR #293 → RNR #52) and became a LISTS when-clause, scoped
honestly (single string, single style, Fabric-only, 0.7.x beta; cell-content tuning AFTER
virtualization is right). Gesture Handler's "faster touchables" reopen fired too — and after
reading v3.2.0 it stayed a skip: Touchable reimplemented without GestureDetector on all three
platforms is an implementation change behind an unchanged API. A fired tripwire is mandatory WORK;
a fired reopen is mandatory RE-TRIAGE, and re-triage is allowed to conclude "still no".

THE SPOT-CHECK OVERTURNED A CAP SKIP, AGAIN ON THE ENTRY-GAP TEST. React Status #486 had skipped
TanStack Table v9's memory post as cap ("more depth on a release we already documented"). Re-read:
V8 gave every row/cell/header object its own copy of every method, each carrying a closure scope;
V9 hangs them on shared prototypes cached per table, worth up to ~90% less memory on large tables
and moving the practical ceiling from ~1–1.5M rows before ~4GB to ~10–16M. That is a THRESHOLD the
entry recommends on ("huge web tables → HighTable"), so it is now a LISTS note and the 486 manifest
carries the retro-added keep. Same lesson as the dx-styles flip: the question is what the ENTRY
lacks, not how novel the item is.

ADVOCATE PASS FLIPPED ONE, AGAINST ITS OWN REOPEN SIGNAL. Callstack's "Migration to React Native in
2026 Starts With a Delivery Question" had been skipped twice with the reopen recorded as "a
brownfield migration piece with production numbers". It still has no production numbers — the flip
is on the gap instead: BROWNFIELD's three readings are all about HOW to embed (Doctolib, Expo
Updates in brownfield, Zalando), and none frames brownfield vs greenfield vs a checkpointed hybrid,
which is the decision that comes first. "The entry owns the decision" was true of its scope and
false of its content. Recorded as a visible disagreement in react-weekly-32.md.

THE RECEIPTS GATE CAUGHT A FIRSTHAND FALSE POSITIVE. The poller reported
`callstack/agent-device: v0.20.10`; verify-diff found it 404s with no Wayback snapshot. GitHub's
releases API and npm both top out at 0.20.9 (2026-08-17), so v0.20.10 was never published — a
draft or deleted tag caught mid-flight. The row is now a documented phantom, and the option row
cites the registry. A firsthand GitHub-release event is a claim to verify, not a fact.

TWELVE OTHER KEEPS, all fetch-verified: TESTING — Shopify's E2E rebuild (Appium/WebdriverIO suite
pulled from blocking CI at ~50% stability, back at 98% via an API where every step carries a
validated assertion, elements are found visually with PaddleOCR + OpenCV against Polaris SVGs, and
escape hatches are named UNSAFE_). TYPESCRIPT — Yelp's Flow→TS program (1.4M SLoC, 570 packages,
3y7m, coverage 83.15%→96.44%; flowgen backwards so still-Flow consumers keep type-checking;
voluntary uptake plateaued until deadlines). ONDEVICE-AI — Margelo's local RAG build, kept for its
constraint list (generator + embedder must co-fit in ~900MB; a 1.07GB model dies on an untrappable
native OOM; context is capped by KV-cache RAM so oversized prompts are REJECTED, not truncated) +
a @react-native-ai/llama option row. MEDIA — the barcode engine map (ML Kit / AVFoundation /
VisionKit / ZXing; decoder quirks belong to the engine, not the wrapper). NAV — deferred deep
linking and the Installation Gap, with Expo Router's +native-intent.tsx as pre-routing middleware.
DATA — when an RSC app actually needs a client cache (data that changes on its OWN vs on user
action). A11Y — focus must leave a region BEFORE it is hidden or inert, and the three popular
"fixes" all strand the screen-reader user. AI-DEVTOOLS — the agent-device replay study (3m18s live
vs 8.8s replayed with zero model calls; 14.1% of agent tool calls never reach the device), plus
modern-web-guidance as the first WEB-side skills row and Metrognome (npm 0.2.6 — from Uphold, not
Callstack, though it orchestrates Callstack tooling). AUTH — RN Firebase v26 is New-Arch-gated with
the namespaced API removed (migrate rule added; stay on v25 otherwise) and better-auth 1.7's joins
config move. OBSERVABILITY — EAS Observe's real scope from the docs, not the marketing page
(per-route TTI, build/OTA markers, 10k MAU free). OTA — Codemagic Patch, the CodePush-lineage
self-host option, kept off the repo + registry rather than the ad copy that carried it (it is a
sponsored slot in RNR #52/#53 — disclosed in the manifest). Plus STORAGE (op-sqlite 18 removes
crsqlite), EDITORS (enriched-markdown 1.0), DX (Biome's nursery useReactCompiler rule).

GATES: coverage ✓ on all seven gate-able manifests (React Weekly's two remain RSS-derived by
design) · verify-diff ✓ 45 receipts after the phantom was corrected · watchlist reviewed · npm test
green (lint clean, rules ✓ across 1145 gold rows, eval 139/139). Two eval fixtures moved WITH the
corpus: rn-smells' react-native bumped 0.86→0.87 because that fixture means "current stack, nothing
to migrate", and the new DATA claim was re-scoped to `deps: [next] + absent_deps: [cache]` so it
does not fire on a repo that already has one. Counts: RNR ×53 · Status ×28 · Digest ×22 · NW ×8 ·
RW ×26 · TWiR ×27 (unchanged). FEED HYGIENE: vercel.com produced an overflow marker and zero keeps
for the SIXTH consecutive pass; github.blog and thoughtbot likewise. The prune is still a
maintainer call.
