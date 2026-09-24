---
id: RB-E-EDITORS
title: "About rich-text & content editors"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low
updated: 2026-09-24
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-EDITORS
defer_to_skill: null                                          # entry declares no depth-audit skill
related: [RB-E-AI-UI, RB-E-KEYBOARD, RB-E-COMPONENT-LIBS]
sources:
  - "https://github.com/software-mansion/react-native-enriched"
  - "https://github.com/software-mansion/react-native-enriched-markdown"
  - "https://github.com/software-mansion/react-native-enriched-html/releases/tag/v1.0.0"
  - "https://github.com/software-mansion/enriched-markdown/releases/tag/v1.0.2"
---

# About rich-text & content editors

> **Diataxis: Explanation.** This page builds *understanding* of the editor decision — why
> the durable choice is the document model, not the toolbar. It is not a plugin catalogue
> and not an API guide. The candidate list and one-line tradeoffs live in the index entry
> `RB-E-EDITORS`; the entry declares no defer skill, so the depth stops here. The entry's own
> confidence is **low** — its recommendation is lightly vetted and closes with an instruction
> to prototype against your real document model before committing. Read this for the *why*,
> then run that prototype.

## The one idea that organises everything: a document model with a view attached

What looks like a text box with a toolbar is, underneath, a **document model** — and the
entry's own descriptions keep pointing at it. ProseMirror, the substrate under most of the
web candidates, is described not as an editor but as "the powerful low-level toolkit
(**document model**, transforms, plugins)" that "underpins TipTap/BlockNote." The entry's one
reading names the model's parts — **nodes, marks, positions, and mappings** are "the document
model under your editor" — and teaches them through a real parse→transform→serialize
pipeline. The family tree in the entry's note is a model tree: most React editors build on
ProseMirror (TipTap, BlockNote) or stand alone (Lexical, Slate). And the recommendation's
closing instruction aims at the same place: prototype **against your real document model**
before committing.

The entry also supplies the negative proof. Its source-level detector fires on a hand-rolled
`contentEditable` surface — the view without a model — and the hint is blunt:
**contentEditable is quicksand (selection, IME, paste, undo)** — the ProseMirror family
(TipTap/BlockNote) or Lexical exist precisely for this. Meanwhile the common React default,
TipTap, is a **headless** editor: the market's default ships with no toolbar at all. The
value is in the model and its transforms; the chrome is the detachable part.

## The default, and why

> React web → TipTap (ProseMirror power with React ergonomics); large or custom-node-heavy
> documents → Lexical; Notion-style blocks → BlockNote. React Native →
> react-native-enriched-html for rich-text input and display (New Architecture only),
> react-native-enriched-markdown for (streaming) Markdown. Lightly vetted (confidence: low) —
> prototype against your real document model before committing.

On web the ladder is mostly altitude over one model. TipTap is ProseMirror power with React
ergonomics — headless, first-class React bindings, a rich extension ecosystem, the common
React default. BlockNote sits above it: a Notion-style block editor on ProseMirror/TipTap,
fast to adopt when the UX is block-based. ProseMirror directly sits below: maximum control of
the editing pipeline, steeper curve. The two off-lineage picks are chosen *by their model
needs*: Lexical (Meta) when the load is large docs and custom nodes — extensible and
performance-focused — and Slate/Plate when the schema itself is deeply custom and React-first
(Plate adds a batteries-included plugin system on Slate; it now ships as `platejs`).

React Native answers a different question first — the *surface*. Software Mansion's pair
finally gives RN a native, non-WebView story: **react-native-enriched-html** for rich-text
input and its matching display, **react-native-enriched-markdown** for (streaming) Markdown.
HTML documents and Markdown documents are separate picks by design.

## The landscape, option by option

**TipTap** — headless editor on ProseMirror with first-class React bindings and a rich
extension ecosystem; the common React default.

**ProseMirror** — the low-level toolkit itself: document model, transforms, plugins. Max
control, steeper curve; it underpins TipTap and BlockNote, so learning its abstractions pays
off even when you adopt the higher layers.

**Lexical (Meta)** — extensible, performance-focused editor framework; strong for large docs
and custom nodes. It stands alone rather than building on ProseMirror.

**Slate / Plate** — React-first customizable framework (Slate); Plate adds a
batteries-included plugin system on top, now published as `platejs` (`@udecode/plate` is
deprecated). The entry's when-clause routes "deeply custom React schemas" here.

**BlockNote** — Notion-style block editor on ProseMirror/TipTap; the fast-adoption pick for
block-based UX. Note the license: `@blocknote/core` is MPL-2.0, not MIT.

**react-native-enriched-html (Software Mansion)** — the RN rich-text *editor*:
`EnrichedTextInput` on native UITextView/EditText (not a WebView) plus the matching
`EnrichedText` renderer, with stable iOS/Android/web support; New Architecture only. It is
the old **react-native-enriched** renamed at 1.0.0 (2026-06-16) with no breaking changes; the
old package is deprecated on npm and gets no updates, so an app on it swaps the package name
and imports.

**react-native-enriched-markdown (Software Mansion)** — a native RN Markdown
renderer/editor with streaming support (GFM tables/math, mentions), built for AI-chat
output; 1.0 since 2026-08-13, with block editing (H1–H6). 1.0.2 (2026-08-20) is breaking
despite the patch number: the Expo config plugin is gone and feature flags (math, code
highlighting) move into an `enriched-markdown` block in the app's `package.json`. The family
surfaced across four consecutive Native Weekly issues (Feb–Jun 2026).

## Tradeoffs and failure modes to name out loud

- **Choosing by toolbar demo.** Every candidate can render bold and bullets; the demos look
  alike. The picks differ where the entry's when-clauses differ — custom nodes, deeply
  custom schemas, block UX, full pipeline control — all model questions, none visible in the
  toolbar.
- **Hand-rolling contentEditable.** The entry's own repo smell: selection, IME, paste, and
  undo make raw contentEditable quicksand, and the ProseMirror family or Lexical exist
  precisely for this. The detector stands down only when a real editor dependency is
  present.
- **Skipping the model prototype.** The recommendation's own closing instruction, doubled by
  low confidence: prototype against your real document model before committing. An editor
  that demos well on paragraphs can still fight your actual schema.
- **Mixing up the RN pair.** enriched-html is the HTML editor-and-renderer pick;
  enriched-markdown is the Markdown pick (especially streaming AI-chat output). They are
  separate tools, not versions of each other.
- **Patch-level breaks.** Both SWM libraries are now 1.x, but enriched-markdown 1.0.2 removed
  its Expo config plugin in a patch release — pin exact versions and read release notes.
- **Staying on the old name.** react-native-enriched is deprecated and frozen at 0.8.1; the
  fix is the rename to react-native-enriched-html, not a code migration.
- **Reaching for a WebView.** The entry emphasises the native surface twice — "native
  UITextView/EditText (not a WebView)", "finally gives RN a native (non-WebView) rich-text
  editor" — marking the WebView-based approach as the thing being escaped.

## How it interacts with the rest of the stack

- **No defer skill.** The entry declares none: there is no deeper audit layer to hand off
  to. The model choice *is* the depth here.
- **AI-generated UI (`RB-E-AI-UI`).** react-native-enriched-markdown is built for streaming
  AI-chat output — the editor entry's display lane is an AI-UI building block.
- **Keyboard & input (`RB-E-KEYBOARD`).** The quicksand ingredients — selection, IME, paste,
  undo — are input-surface concerns; an editor is the most demanding input surface an app
  ships.
- **Component libraries (`RB-E-COMPONENT-LIBS`).** TipTap being *headless* is the same
  pattern as headless component libraries: logic and semantics packaged, chrome left to you.

## In one paragraph

An editor is a **document model with a view attached**: nodes, marks, positions, and
mappings do the real work, and the toolbar is the detachable part — the common React
default, TipTap, is literally headless. Most React editors share one model lineage
(ProseMirror under TipTap and BlockNote) or stand alone (Lexical, Slate), and the default
ladder picks by model need: TipTap for most apps, Lexical for large docs and custom nodes,
ProseMirror directly for full pipeline control, Slate/Plate for deeply custom React schemas,
BlockNote for Notion-style blocks. Raw contentEditable — a view with no model — is quicksand
(selection, IME, paste, undo); the frameworks exist precisely for this. React Native's
question is the surface first: Software Mansion's react-native-enriched-html (native
UITextView/EditText input and display, not a WebView; formerly react-native-enriched) and
react-native-enriched-markdown (streaming Markdown for AI-chat output) — both 1.x, pinned
exactly, prototyped. Confidence
is low: prototype against your real document model before committing.

---

*See also: `RB-E-AI-UI` (streaming Markdown display for chat output), `RB-E-KEYBOARD`
(selection/IME/paste — the input surface under every editor), `RB-E-COMPONENT-LIBS` (the
headless pattern TipTap shares with component libraries). Background reading: Shane
Friedman's "The Unreasonable Effectiveness of the ProseMirror Model" — nodes, marks,
positions, and mappings taught through a real parse→transform→serialize pipeline.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "The toolbar is trivia / a document model with a view attached" is the assigned
     organizing idea; the entry grounds model-primacy (ProseMirror's "document model,
     transforms, plugins" underpinning TipTap/BlockNote; the reading's
     nodes/marks/positions/mappings claim; "prototype against your real document model")
     but the trivia slogan and the "demos look alike" reasoning are editorial.
  2. Lexical's and Slate's internal document-model shapes — the entry stakes nothing beyond
     "custom nodes" (Lexical) and "deeply custom React schemas" (Slate/Plate); this doc does
     not describe their schemas.
  3. The RN pair's document model — the entry describes surfaces (native UITextView/EditText,
     streaming Markdown) and stakes no schema/model claim; the model thesis is scoped to the
     web candidates.
  4. "The WebView-based approach as the thing being escaped" — inference from the entry's
     repeated non-WebView emphasis; no WebView editor is named in the entry.
  5. The related cross-references (RB-E-AI-UI, RB-E-KEYBOARD, RB-E-COMPONENT-LIBS) are
     inferred from grounded facts (built for AI-chat output; selection/IME/paste/undo;
     TipTap headless); the entry names no related entries.
-->
