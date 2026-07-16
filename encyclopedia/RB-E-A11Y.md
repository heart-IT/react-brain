---
id: RB-E-A11Y
title: "About accessibility across web & native"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-16
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-A11Y
defer_to_skill: design-systems-governance                     # depth audit: contrast, intrinsics, dynamic type
related: [RB-E-TESTING, RB-E-COMPONENT-LIBS, RB-E-AI-UI]
sources:
  - "https://css-tricks.com/the-siren-song-of-arianotify/"
  - "https://certificates.dev/blog/accessibility-in-react-common-mistakes-and-how-to-fix-them"
  - "https://frontendmasters.com/blog/ai-generated-ui-is-inaccessible-by-default/"
---

# About accessibility across web & native

> **Diataxis: Explanation.** This page builds *understanding* of the accessibility decision —
> why the recommendation is semantics-first and test-enforced, and why it splits into two
> platform dialects. It is not a WCAG checklist and not an API guide. The candidate facets and
> one-line tradeoffs live in the index entry `RB-E-A11Y`; the depth audit — contrast,
> intrinsics, dynamic type — is owned by the `design-systems-governance` skill. Read this for
> the *why*.

## The one idea that organises everything: one semantic tree, two renderers

Your component tree produces two artifacts, not one. The first is pixels. The second is a
**semantic tree** — the roles, labels, and focus order that assistive technology reads instead
of looking at the screen. Accessibility work is authoring that second artifact, and the
cross-platform story collapses into a single sentence: **it is one semantic language with two
renderers.** On the web the semantics render as **ARIA** — roles and `aria-label` /
`aria-labelledby` on elements. In React Native the same intent renders as **accessibility
props** — `accessibilityRole` and `accessibilityLabel`. Focus management splits along the same
seam: the web dialect is **keyboard focus**, the native dialect is **screen-reader focus**.
Different vocabulary, same tree.

Accessibility is what survives that translation. A screen with perfect pixels and an empty
semantic tree has translated to *nothing* — which is exactly the repo-level smell the index
entry detects: a production-stage codebase with no accessibility annotations anywhere in
source means screen-reader users get an empty tree.

The same lens explains the enforcement rule. **Role-based test queries interrogate the
semantic tree itself** — the artifact assistive tech actually consumes — which is why the
recommendation says to test with role-based queries, *not* `data-testid`. A test-id is a
side channel that no user experiences; a role query fails the moment the translation fails.

## The default, and why

> Use semantic roles + labels, manage focus order, and announce dynamic updates; test with
> role-based queries, not data-testid.

Three duties and one gate. The duties are the three things the semantic tree must carry:
*identity* (roles and labels on interactive elements), *position* (focus order), and *change*
(announcing dynamic updates that a sighted user would notice visually). The gate is the test
strategy: role-based queries make the duties non-optional, because a component with no role
cannot be found by a role query — the test suite becomes the screen reader's proxy.

The per-platform mapping is mechanical once the duties are fixed:

- **Web** → ARIA roles + keyboard focus management.
- **React Native** → `accessibilityRole` / `accessibilityLabel` + screen-reader focus.
- **Depth audit** (contrast, intrinsics, dynamic type) → the `design-systems-governance` skill.

## The landscape, facet by facet

**Roles and labels** — the identity layer, in both dialects. The durable web reference here is
Aurora Scharff's common-mistakes catalogue: semantic HTML first, correct labeling, concrete
`useId` / `useRef` patterns, all tied to a WCAG-cited checklist. The React Native side is the
same duty spelled with `accessibilityRole` / `accessibilityLabel`.

**Focus management** — the position layer. Scharff's catalogue names the classic web failure
sites: focus on *route changes* and *modal changes*, where the visual context moves but
keyboard focus is left behind. Native focus is a different mechanism — screen-reader focus —
but the duty is identical: when the UI moves, the user's position in the tree must move with it.

**Announcing dynamic updates** — the change layer, and the one facet in mid-transition on the
web. Today's mechanism is the hidden **`aria-live` region**, a hack whose timing and support
failures are well catalogued. The coming primitive is **`ariaNotify()`** (WAI-ARIA 1.3):
`document.ariaNotify(str, {priority})` pushes a screen-reader announcement directly from
JavaScript, replacing the hidden-region indirection. Two durable caveats travel with it. It
ships in **Firefox only as of mid-2026**, so `aria-live` fallbacks stay mandatory. And it
invites `alert()`-style overuse — narrating what existing semantics already convey interrupts
screen-reader users who were navigating fine. Semantic signals first; announcements for what
semantics cannot express.

**Enforcement** — the layer that makes the other three stick. Role-based queries are the
per-component gate; the systemic version is the five-layer enforcement stack described in the
Frontend Masters piece on AI-generated UI: prompt constraints, `jsx-a11y` lint, `axe-core`
runtime tests, CI gates, and headless primitives that carry correct semantics by construction.

## Tradeoffs and failure modes to name out loud

- **The empty tree.** A production repo with zero accessibility annotations — no
  `accessibilityLabel`, no `accessibilityRole`, no `aria-label`, no roles — is the index
  entry's own doctor signal. The fix starts small: roles and labels on interactive elements,
  role-based test queries to hold the line.
- **AI codegen makes the empty tree the default.** LLM-generated components ship empty
  accessibility trees unless something forces otherwise — which is why enforcement must be
  systemic (lint, runtime tests, CI gates, headless primitives), not reviewer vigilance.
- **`data-testid` green, screen reader dark.** A testid-based suite keeps passing while the
  semantic tree decays, because it never reads that tree. Role-based queries and the a11y
  outcome fail together — that coupling is the point.
- **Over-announcing.** `ariaNotify()`'s siren song: once announcements are one function call
  away, teams narrate everything. Narrating what semantics already convey interrupts users who
  were navigating fine. If a role or state change already expresses it, don't also say it.
- **Betting on `ariaNotify()` today.** Firefox-only as of mid-2026. Treat it as the direction
  of travel, keep `aria-live` fallbacks.
- **Focus left behind on route/modal changes.** The visual context moved; keyboard focus
  didn't. This is the most common shape of the focus-management failure on the web side.

## How it interacts with the rest of the stack

- **Depth audit (`design-systems-governance`).** The defer skill. Contrast, accessibility
  intrinsics, and dynamic type are design-system-level audits, owned there; this page owns the
  *model* — semantics, focus, announcements, and their enforcement.
- **Testing (`RB-E-TESTING`).** "Role-based queries, not data-testid" is a testing-strategy
  commitment, not an a11y garnish: the same queries that enforce semantics are the queries
  your component tests should have been using anyway.
- **Component libraries (`RB-E-COMPONENT-LIBS`).** Headless primitives are named as an
  enforcement layer for a reason: components that carry correct semantics by construction
  shrink the surface you must annotate by hand.
- **AI-generated UI (`RB-E-AI-UI`).** As AI codegen becomes the default authoring mode,
  "inaccessible by default" becomes the default output — the five-layer enforcement stack is
  the durable countermeasure.

## In one paragraph

Accessibility across React and React Native is **one semantic tree with two renderers**: the
web renders it as ARIA roles and labels with keyboard focus, React Native renders it as
`accessibilityRole` / `accessibilityLabel` with screen-reader focus — and accessibility is
whatever survives that translation. The recommendation is three duties plus a gate: semantic
roles and labels, managed focus order, announced dynamic updates, enforced by **role-based
test queries rather than `data-testid`**, because role queries read the same tree the screen
reader does. On the web, announcements are migrating from `aria-live` hacks toward
`ariaNotify()` (WAI-ARIA 1.3) — Firefox-only as of mid-2026, and prone to `alert()`-style
overuse, so semantics stay first. The empty accessibility tree is the failure mode to fear,
AI-generated UI ships it by default, and the depth audit (contrast, intrinsics, dynamic type)
belongs to `design-systems-governance`.

---

*See also: `RB-E-TESTING` (role-based queries as the enforcement seam), `RB-E-COMPONENT-LIBS`
(headless primitives carry semantics by construction), `RB-E-AI-UI` (why enforcement must be
systemic). Depth audit — contrast, intrinsics, dynamic type: the `design-systems-governance`
skill. Background reading: Mat Marquis on `ariaNotify()`, Aurora Scharff's React a11y
common-mistakes catalogue, and Frontend Masters on AI-generated UI's empty trees.*

<!-- CANNOT GROUND (flagged, not invented):
  1. The "one semantic tree, two renderers / a11y is what survives the translation" framing is
     the assigned organizing idea; the entry grounds the two dialects (ARIA vs accessibility
     props, keyboard vs screen-reader focus) and the empty-tree signal, but the single-tree
     translation metaphor itself is editorial.
  2. "data-testid suites keep passing while the semantic tree decays" — the entry mandates
     role-based queries over data-testid and separately names the empty-tree failure; the
     causal coupling (testid green over an empty tree) is inference from those two facts.
  3. The entry provides no RN-side mechanism for the "announce dynamic updates" duty — the
     ariaNotify reading is applies_when platforms:[react] only — so this doc deliberately
     scopes the announcement transition to the web and makes no RN announcement claim.
  4. "the test suite becomes the screen reader's proxy" — editorial restatement of the
     role-based-queries recommendation, not entry text.
-->
