---
id: RB-E-COMPONENT-LIBS
title: "About component & headless-UI libraries — who owns the code"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-10
platforms: [react]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-COMPONENT-LIBS
defer_to_skill: design-systems-governance
related: [RB-E-STYLING, RB-E-A11Y, RB-E-AI-DEVTOOLS, RB-E-CROSSPLATFORM]
sources:
  - "https://ui.shadcn.com/docs/changelog"
  - "https://github.com/mui/base-ui"
---

# About component & headless-UI libraries — who owns the code

> **Diataxis: Explanation.** This page builds *understanding* of the web component-library
> landscape — the reasoning behind the picks. It is not a component catalog. Token/theming/a11y
> governance is owned by `design-systems-governance`; styling engines by `RB-E-STYLING`. This
> entry is **web-only** — React Native UI routes to `RB-E-STYLING`/`RB-E-CROSSPLATFORM`.

## The one question that organises everything: who owns the code you'll be debugging in a year?

Every component library answers three needs — **behavior** (focus traps, keyboard interaction,
ARIA), **styling**, and **maintenance** — and the durable axis is *who owns each*:

- **Headless primitives** (Base UI, Radix, React Aria): the library owns *behavior*, you own
  styling. Maximum control, maximum styling work.
- **Batteries-included systems** (MUI, Mantine, Chakra, Ant, Astryx): the library owns behavior
  *and* styling. Fastest start, hardest to make yours.
- **Own-the-code** (shadcn/ui): the styled component is *copied into your repo* over a headless
  layer. You own everything visible; upstream owns only the invisible behavior underneath.

This is why "which component library" arguments talk past each other — they're usually arguments
about which ownership split a team can live with.

## The default, and why

> Own-the-code: **shadcn/ui** (Base UI default since 2026-07; Radix still supported) +
> **Tailwind** — the default for product teams that want control.

shadcn's model wins for product teams because it puts the *hard* part (accessible behavior) in a
maintained dependency and the *opinionated* part (markup, styling) in your repo where you can
change it without forking anything. The 2026 shift underneath it matters: **Base UI became
shadcn's default headless layer** (Radix explicitly not deprecated — every component ships for
both), and MUI v9 is incrementally adopting the same primitives. The Radix/MUI lineages are
converging on one behavior layer, which de-risks the whole own-the-code bet: the primitives under
your copied components are becoming the ecosystem's shared foundation rather than one vendor's.

## The landscape, by ownership split

**Base UI / Radix / React Aria Components** — the headless tier. Base UI is the convergence
point (Radix/MUI lineage); React Aria is Adobe's accessibility-first take with the strongest
interaction rigor and its own `render`-prop composition style. Pick one directly when you're
building a *design system*, not assembling an app.

**shadcn/ui** — the own-the-code layer over that tier: CLI + registries, chat components
(2026-06), and a first headless `@shadcn/react` package (tested behavior as a dependency while
styling stays copy-paste).

**MUI / Mantine / Chakra / Ant Design** — batteries-included. The right call when shipping speed
beats visual identity: internal tools, admin surfaces, enterprise CRUD. Ant for that enterprise
idiom specifically.

**Astryx (Meta, beta)** — batteries-included with a twist: StyleX compile-time styling
(`RB-E-STYLING`) and agent-ready scaffolding (CLI + MCP), open-sourced from 8 years of internal
use. Vet component coverage before betting; it's the most credible new batteries-included entrant
in years.

**HeroUI** — React Aria + Tailwind, with separate web and RN libraries sharing tokens — a
reminder that "cross-platform component library" today means shared *tokens*, not shared code.

## Tradeoffs and failure modes to name out loud

- **Copy-paste is a fork you maintain.** shadcn components don't auto-upgrade; behavior fixes
  arrive via the headless dep, but markup/styling drift is yours. Budget for it.
- **Fighting a batteries-included theme.** If you're overriding MUI styles everywhere, you wanted
  the headless tier — the override layer becomes its own design system, minus the coherence.
- **Mixing headless layers.** Radix here, React Aria there, Base UI in the new code — three
  composition models and three focus-management philosophies in one app. Converge deliberately.
- **The AI-era failure mode:** agent-written UI that reaches past the design system's props into
  raw divs. The LLM-safe-design-system reading argues the fix — make the system's tokens/props
  the *only expressible decisions* — and it's why agent-scaffolding (Astryx MCP, shadcn
  registries) is becoming a selection criterion at all (`RB-E-AI-DEVTOOLS`).
- **Accessibility assumed, not verified.** Headless ≠ accessible-by-default once you restyle;
  interaction contracts survive, contrast and affordance don't (`RB-E-A11Y`).

## How it interacts with the rest of the stack

- **Styling (`RB-E-STYLING`).** shadcn assumes Tailwind; Astryx assumes StyleX — the component
  layer and the styling engine are one decision wearing two names.
- **A11y (`RB-E-A11Y`).** The headless tier exists *because* accessible behavior is the hardest
  part to hand-roll; that's the part you should never own.
- **AI dev tooling (`RB-E-AI-DEVTOOLS`).** Registries/MCP scaffolding determine how well agents
  generate on-system UI — a new axis this decade added to an old decision.
- **Cross-platform (`RB-E-CROSSPLATFORM`).** None of this transfers to RN; shared design happens
  at the token level (HeroUI's split is the honest model).

## In one paragraph

Choose a component library by **who owns which layer**: headless primitives (behavior theirs,
styling yours), batteries-included (both theirs), or own-the-code (behavior theirs, everything
visible copied into your repo). The product-team default is **shadcn/ui + Tailwind**, now riding
**Base UI** as its default headless layer — the Radix/MUI lineages converging on one shared
behavior foundation makes the copied-code bet safer, not riskier. Go batteries-included (MUI/
Mantine/Ant, or Meta's agent-ready Astryx) when shipping speed beats visual identity, and drop to
the headless tier directly when you're building a design system. Whatever you pick, never
hand-roll the behavior layer — that's the part with the accessibility landmines.

---

*See also: `RB-E-STYLING` (the engine under the components), `RB-E-A11Y` (what headless does and
doesn't guarantee), `RB-E-AI-DEVTOOLS` (agent scaffolding as a selection axis). Token/theming/
lifecycle governance: the `design-systems-governance` skill.*
