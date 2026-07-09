---
id: RB-E-FORMS
title: "About forms & validation — where state lives, where truth lives"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-07-10
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-FORMS
defer_to_skill: null
related: [RB-E-STATE, RB-E-KEYBOARD, RB-E-META-FRAMEWORKS, RB-E-TYPESCRIPT]
sources:
  - "https://standardschema.dev/"
  - "https://tanstack.com/form/latest/docs/framework/react/guides/form-groups"
---

# About forms & validation — where state lives, where truth lives

> **Diataxis: Explanation.** This page builds *understanding* of the forms landscape — the
> reasoning behind the picks. It is not a how-to. Keyboard behavior on RN form screens is owned
> by `RB-E-KEYBOARD`; server-side mutation machinery by `RB-E-META-FRAMEWORKS`.

## The two questions that organise everything

A form library answers two independent questions, and conflating them is where teams go wrong:

1. **Where does field state live, and what re-renders when it changes?** A *controlled* form
   (Formik's classic model) holds every keystroke in React state — simple mental model, but each
   keystroke re-renders the form tree. An *uncontrolled* form (React Hook Form's model) leaves
   state in the inputs and subscribes narrowly — the form only re-renders what watches. On a
   30-field screen, or on a mid-range Android phone (`RB-E-KEYBOARD` territory), this is the
   difference between typing that feels native and typing that stutters.
2. **Where does validation truth live?** The modern answer is: in a **schema**, once —
   Zod or Valibot — consumed by the form library through a resolver, and *reused* on the server
   for the same mutation. The form library is plumbing; the schema is the contract.

**Standard Schema** is the quiet piece that makes question 2 low-risk: a shared spec that lets
form libraries accept *any* conforming validator, so Zod ↔ Valibot is a swap, not a rewrite.

## The default, and why

> **React Hook Form + Zod** — the common, performant, RN-compatible default.

RHF wins question 1 by default (uncontrolled, subscription-based — performance you don't have to
earn) and runs on both DOM and React Native. Zod wins question 2 by ubiquity: it's the schema
layer the rest of the 2026 stack already speaks (tRPC, server validation, `RB-E-DATA` inputs),
so the form contract and the API contract can literally be the same object. Neither choice locks
you in: Standard Schema keeps the validator swappable, and RHF's resolver keeps the schema
library-agnostic.

## The landscape, and when each earns its place

**React Hook Form** — the uncontrolled default; v7.8x keeps shipping (`<FieldArray>`,
performance). Its API is register-and-subscribe; its cost model is "you pay for what you watch."

**TanStack Form (1.x)** — the type-safety maximalist: field values, errors, and touched state
all inferred end-to-end, plus a FormGroup API for multi-step/wizard forms. Choose it when the
form *is* the product (complex enrollment, builders) and type drift between steps is the real
risk (`RB-E-TYPESCRIPT` mindset applied to form state).

**Formik** — the controlled incumbent. Don't migrate a working Formik app on principle; migrate
when re-render cost actually bites (long forms, weak devices).

**Conform** — the progressive-enhancement specialist for the server-action web: forms that work
before hydration and validate against the same schema on submit (`RB-E-META-FRAMEWORKS`).

**Formisch** — signal-based and schema-first (Valibot), pre-1.0; its one-core-six-frameworks
build-time abstraction (see reading) is as interesting as the library.

**Zod / Valibot** — the truth layer. Valibot's pitch is bundle size (tree-shakeable, matters at
the marketing-page edge); Standard Schema makes the choice reversible.

## Tradeoffs and failure modes to name out loud

- **Validating in two places.** UI-only validation drifts from server rules until a bad payload
  lands. One schema, imported by both sides, is the entire point of schema-first.
- **Controlled-by-default habits.** Wiring every input to `useState` rebuilds Formik's cost
  model by hand — without the library. If state must be shared live, subscribe narrowly
  (`RB-E-STATE`'s ownership-vs-subscription principle applies to forms too).
- **`watch()` and the Compiler.** Broad `watch()` subscriptions are the escape hatch that
  re-couples RHF to re-renders — and the part that has surprised React Compiler adopters. Watch
  the narrowest slice that answers the question.
- **Wizard state in component state.** Multi-step forms that stash progress in local state lose
  it on unmount/navigation; use FormGroup-style structures or lift to the router/URL.
- **RN forms that ignore the keyboard.** The library manages values; it does not manage insets,
  scrolling, or focus travel — that's `RB-E-KEYBOARD`, and it's where RN form UX actually fails.

## How it interacts with the rest of the stack

- **State (`RB-E-STATE`).** Form state is short-lived UI state — it belongs in the form library,
  not the global store; only the *submitted result* graduates to server state (`RB-E-DATA`).
- **Meta-frameworks (`RB-E-META-FRAMEWORKS`).** Server actions/functions are the submit
  endpoint; the schema travels there. Conform is this integration made first-class.
- **Keyboard (`RB-E-KEYBOARD`).** On RN, form quality is mostly keyboard quality.
- **TypeScript (`RB-E-TYPESCRIPT`).** Schemas are types-at-runtime; `z.infer` is the bridge that
  keeps form types and validation from diverging.

## In one paragraph

Forms are two decisions dressed as one: **where field state lives** (uncontrolled wins by
default — that's **React Hook Form**) and **where validation truth lives** (a schema, once —
that's **Zod**, swappable via Standard Schema, with **Valibot** when bundle size matters). Reach
for **TanStack Form** when end-to-end type inference and multi-step structure are the real
requirements, **Conform** for progressively-enhanced server-action forms, and keep a working
Formik until re-render cost is a measured problem. Then remember the part no form library does:
on React Native, the form is only as good as its keyboard handling.

---

*See also: `RB-E-KEYBOARD` (the RN half of form UX), `RB-E-STATE` (what is and isn't form
state), `RB-E-META-FRAMEWORKS` (server actions as the submit path), `RB-E-TYPESCRIPT`
(schema-inferred types).*
