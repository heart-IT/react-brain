---
id: RB-E-CALENDARS
title: "About calendars, date pickers & event grids"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low                # entry is lightly vetted — prototype before committing
updated: 2026-07-16
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-CALENDARS
defer_to_skill: react-native-best-practices                   # list/gesture performance discipline
related: [RB-E-LISTS, RB-E-ANIMATION]
sources:
  - "https://registry.npmjs.org/react-native-calendars/latest"
  - "https://registry.npmjs.org/@super-calendar/native/latest"
  - "https://marceloprado.github.io/flash-calendar/"
---

# About calendars, date pickers & event grids

> **Diataxis: Explanation.** This page builds *understanding* of the calendar decision — why
> the landscape splits in two and what actually differentiates the candidates. It is not a
> month-rendering how-to and not a props reference. The candidate list, versions, and
> one-line tradeoffs live in the index entry `RB-E-CALENDARS`; performance depth is owned by
> the `react-native-best-practices` skill. The entry is **lightly vetted (confidence: low)**
> — carry that caveat into anything you conclude from this page. Read this for the *why*.

## The one idea that organises everything: a virtualized list wearing a date grid

Strip the styling and a calendar is a scrolling window over a large, regular sequence —
months of date cells, or days of hour rows. That is a list problem, and the entry's
candidates say so in their own descriptions: flash-calendar is **"windowed via a FlashList
peer dep"**; Super Calendar is **"virtualized + paged"**, its views snap-paged over Legend
List. Rendering a month is table stakes — every candidate does it — so the pick is decided
by the two things *underneath* the grid:

- **Virtualization** — what the window is made of, and how far it scrolls before it stutters.
- **Gestures** — what the grid answers beyond a tap: the entry's event-grid row lists a
  pinch-to-zoom time grid and drag-to-create/resize; its reading adds long-press drag, grip
  resize, and drag-empty-space-to-create.

That axis is why the entry's durable split exists: **PICKER/MARKING calendars**
(react-native-calendars, flash-calendar) versus **full EVENT GRIDS** (Super Calendar; web's
FullCalendar / react-big-calendar). A picker windows date cells and answers taps; an event
grid windows a time grid and answers drags and pinches. The entry's note is equally clear
about demand: most apps need the first; calendar-app UX needs the second.

## The default, and why

> Date picking / marked-dates UI → react-native-calendars (the de-facto) or
> @marceloterreiro/flash-calendar when performance and design-system theming matter. A full
> event-grid UX (native-calendar-style day/week views with drag and pinch) →
> @super-calendar/native — new in 2026, prototype first. Web event calendars →
> react-big-calendar or FullCalendar. Lightly vetted (confidence: low).

The default is a router over the split, not a single winner. On the picker side it names two
lanes: the de-facto suite when adoption and coverage matter, and the performance-first one
when list-perf discipline and design-system theming matter. On the event-grid side it names
one native candidate — with "new in 2026, prototype first" attached in the recommendation
itself, which is rare and deliberate. The web lane keeps its own established pair. The
when-clauses map need → lane mechanically: date picker / marked dates / agenda list;
design-system theming + list-perf; event grid with gestures; week-strip header; web
scheduler.

## The landscape, facet by facet

**react-native-calendars (Wix, v1.13xx)** — the long-standing de-facto RN calendar and
date-marking suite: Agenda, Calendar, CalendarList. Its tradeoff is stated as a pair — huge
adoption, older architecture — and the entry leaves it at that; it is the default answer for
picker/marking needs on adoption grounds.

**@marceloterreiro/flash-calendar (2.x)** — the performance-first picker, born at Shopify:
windowed via a FlashList peer dep, tiny (~18kb min), headless-ish theming aimed at design
systems. The entry draws its boundary explicitly: picker/marking focus, **not an event
grid**.

**@super-calendar/native (2.x)** — the new (2026) gesture-driven event grid:
month/week/day/3-day/schedule views, pinch-to-zoom time grid, drag-to-create/resize,
recurring events, time zones; virtualized and paged. It carries a real stack requirement —
Reanimated 4 + Gesture Handler + Legend List — and `@super-calendar/dom` renders the same
core on web (the reading describes a platform-free core with native and DOM renderers). It
earned its row through two independent signals in one week: TWiR #288, then headlining RN
Rewind ~#48.

**react-native-calendar-strip (2.x)** — the horizontal week-strip header pattern; a narrow,
settled use case with its own when-clause.

**Web: FullCalendar / react-big-calendar (1.20)** — the established web event-calendar
components; FullCalendar is the batteries-included commercial-tier option.

Version trust: the versions above are verified against npm (react-native-calendars 1.1314 ·
flash-calendar 2.0.0 · @super-calendar/native 2.1.5 · calendar-strip 2.2.6 ·
react-big-calendar 1.20), and Super Calendar's package names, views, and stack requirements
against its docs.

## Tradeoffs and failure modes to name out loud

- **Buying an event grid to build a picker.** Super Calendar's gesture stack — Reanimated 4 +
  Gesture Handler + Legend List — is the price of drag and pinch. If the need is marked dates
  and a tap, the entry's picker lane (a ~18kb FlashList-windowed calendar, or the de-facto
  suite) answers it without that stack.
- **Building an event grid out of a picker.** The boundary is the entry's own: flash-calendar
  is "picker/marking focus, not an event grid." Drag-to-create on top of a marking calendar
  is fighting the library's shape.
- **Committing to a 2026-new library sight unseen.** The recommendation itself says prototype
  first; the when-clause says verify on-device perf; the note narrows it further — prototype
  gesture perf **on low-end devices** before committing.
- **Reading "de-facto" as "settled".** react-native-calendars' row is a tension — huge
  adoption *and* older architecture — and the entry does not resolve it; flash-calendar's
  existence is the performance-and-theming counterweight.
- **Forgetting the confidence label.** The whole entry is lightly vetted (confidence: low),
  dated 2026-07-07. Treat every lane as a shortlist, not a verdict.

## How it interacts with the rest of the stack

- **Lists (`RB-E-LISTS`).** The virtualization under the grid is a named dependency, twice:
  FlashList as flash-calendar's peer dep, Legend List in Super Calendar's required stack.
  Your calendar pick inherits a list engine — the organizing idea, made literal.
- **Animation & gestures (`RB-E-ANIMATION`).** Reanimated 4 + Gesture Handler are Super
  Calendar's other requirement; an event grid is a gesture surface before it is a widget.
- **Performance depth (`react-native-best-practices`).** The defer skill owns the discipline
  the when-clauses gesture at — list perf and on-device verification beyond this page's
  altitude.
- **Web.** The split holds across platforms: Super Calendar's DOM renderer carries the same
  core to web, while react-big-calendar / FullCalendar remain the established web event-grid
  pair.

## In one paragraph

A calendar is **a virtualized list wearing a date grid**: month-rendering is table stakes,
so the pick is decided by the virtualization underneath (FlashList for flash-calendar,
Legend List + paging for Super Calendar) and by which gestures the grid answers
(pinch-to-zoom time grid, drag-to-create/resize). The landscape splits durably into
picker/marking calendars — react-native-calendars as the huge-adoption de-facto,
@marceloterreiro/flash-calendar (~18kb, FlashList-windowed, design-system theming) as the
performance-first lane — and full event grids, where @super-calendar/native (new in 2026;
requires Reanimated 4 + Gesture Handler + Legend List; same core on web via
@super-calendar/dom) is the native candidate and react-big-calendar / FullCalendar the
established web pair, with react-native-calendar-strip covering the week-strip niche. Most
apps need a picker; calendar-app UX needs a grid. The entry is lightly vetted (confidence:
low): prototype gesture perf on low-end devices before committing.

---

*See also: `RB-E-LISTS` (the virtualization engines the picks inherit — FlashList, Legend
List), `RB-E-ANIMATION` (Reanimated + Gesture Handler, the event grid's gesture substrate).
Performance depth: the `react-native-best-practices` skill. Background reading: the Super
Calendar docs (super-calendar.afonsojramos.me) — views, gestures, and the platform-free
core/renderer architecture.*

<!-- CANNOT GROUND (flagged, not invented):
  1. "A virtualized list wearing a date grid" and "month-rendering is table stakes" are the
     assigned organizing idea. The entry grounds virtualization only for flash-calendar
     ("windowed via a FlashList peer dep") and Super Calendar ("virtualized + paged";
     snap-paged per the reading); it makes NO virtualization/architecture claim for
     react-native-calendars, calendar-strip, or the web options, and never states that all
     candidates render months. Both generalisations are editorial.
  2. "Older architecture" (react-native-calendars) is entry text but unspecified — this doc
     deliberately does not gloss what is old about it (e.g., no claim that it is
     unvirtualized).
  3. related-entry id mapping (RB-E-LISTS, RB-E-ANIMATION) is inferred from the tech names
     in the entry (FlashList/Legend List; Reanimated 4/Gesture Handler); the entry names no
     related ids.
  4. "A picker windows date cells and answers taps; a grid windows a time grid and answers
     drags" — editorial restatement of the picker-vs-event-grid split along the assigned
     axis, not entry text.
  5. "Rare and deliberate" (about 'prototype first' living inside the recommendation) —
     editorial observation about the corpus, not entry text.
-->
