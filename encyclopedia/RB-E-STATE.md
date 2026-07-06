---
id: RB-E-STATE
title: "About state management in React & React Native"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-07-01
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-STATE
defer_to_skill: react-native-best-practices                   # re-render / perf depth
related: [RB-E-DATA, RB-E-FORMS, RB-E-REACT-CORE, RB-E-CROSSPLATFORM]
sources:
  - "https://2025.stateofreact.com/en-US/libraries/state-management/"
  - "https://2025.stateofreact.com/en-US/libraries/"
  - "https://www.youtube.com/watch?v=K3flMIHS-cI"   # Meistrich, "Render once" (App.js Conf 2026) — signal/observable state as perf architecture
---

# About state management in React & React Native

> **Diataxis: Explanation.** This page builds *understanding* of the state-management
> decision — the reasoning behind the pick. It is not a tutorial and not step-by-step
> how-to: the candidate list and one-line tradeoffs live in the index entry `RB-E-STATE`;
> re-render/performance rules live in the `react-native-best-practices` skill. Read this
> to understand *why*; read those to *do*.

## The one distinction that organises everything

Most "which state library?" confusion dissolves once you separate **two different
problems that the word "state" hides**:

- **Server state** — data that lives on a server and is *cached* on the client: it can
  go stale, needs refetching, deduping, retries, and invalidation. You don't *own* it;
  you mirror it.
- **Client (UI/app) state** — data that is *born and dies* on the client: the open tab,
  a form draft, a theme toggle, a wizard step. You own it outright; it is never "stale."

These have opposite needs, so the leading tools specialise. **TanStack Query** is a
*server-state* cache, not a client-state store — and **Zustand / Jotai / Redux** are
*client-state* stores that know nothing about networks. They are **complementary, not
alternatives.** The most common mistake — and the most common source of "Redux is
bloated" or "Context is slow" complaints — is using one tool for both jobs: hand-rolling
caching/refetch logic inside a client store, or stuffing transient UI flags into a
global cache.

So the first question is never "Redux or Zustand?" It is *"which kind of state is this?"*

## The default, and why

For a typical product app, the low-regret 2026 default is:

> **TanStack Query for server state + Zustand for client state.**

This is not fashion. The State of React 2025 survey (3,760 developers) shows **TanStack
Query as the single most-used React library**, and **Zustand as the leading dedicated
state manager** — it crossed 50% usage (up from 28% in 2023), overtook Redux in
downloads, and tops satisfaction in its category. When the most-used *and* most-liked
tools also map cleanly onto the server/client split, recommending them is the
boring-but-correct choice.

Two consequences worth internalising:

- **You often need less than you think.** ~34% of survey respondents use *no* dedicated
  state library — `useState`/`useReducer` + a little `useContext` is genuinely enough for
  many apps. Reach for a library when you feel a real pain (prop-drilling, cross-tree
  sharing, re-render storms), not pre-emptively.
- **The pieces compose.** Adding TanStack Query does not mean removing Zustand, and vice
  versa. A healthy app frequently runs both, each doing one job.

## The landscape, and when each one wins

Treat these as *reasons to deviate from the default*, not a menu to agonise over.

**`useState`/`useReducer` + Context** — the zero-dependency baseline. Correct for local
state and for genuinely low-frequency global values (theme, locale, the authenticated
user read once at mount). Its weakness is also its nature: a Context value change
re-renders *every* consumer, so it is the wrong tool for frequently-changing shared
state. The failure mode is using one big Context as an app store and then fighting the
re-renders — at which point you wanted a store.

**Zustand** — a tiny selector-based store. It wins when you want shared client state
without ceremony: define a store, subscribe to slices with selectors, done. Its
selector model is what keeps re-renders surgical, which is exactly where Context falls
down. This is the default for most teams that have outgrown plain Context.

**Jotai** — atomic state, composed bottom-up from primitive "atoms." It wins when state
is naturally *fine-grained and derived* (many small independent pieces, computed values)
rather than a few coarse stores. The risk is over-atomisation: splitting state that
actually belongs together adds wiring for no benefit.

**Redux Toolkit (RTK)** — structured, middleware-rich, with the best time-travel
devtools. It wins on large teams and complex, auditable state transitions where the
explicit, ceremonious flow is a *feature* (predictability, onboarding, debuggability).
RTK fixed most of "classic Redux is boilerplate," and React-Redux now steers you to
hooks — the `connect` HOC is deprecated. The honest guidance: **if you are already on a
healthy RTK app, stay**; migrating to Zustand for its own sake is churn. Choose RTK
*new* mainly when its structure earns its weight.

**XState / XState Store** — state *machines* and statecharts. This is a different axis
from the others: reach for it when the hard part isn't *where* state lives but *which
transitions are legal* — multi-step flows, wizards, media players, anything with modes
and guarded transitions where "impossible states" are the bug class you keep hitting.
XState Store (4.x) is a lighter, signal-flavoured option when you want the modelling
without the full interpreter.

**TanStack Store / signals** — fine-grained reactive primitives (an alien-signals core)
that underpin TanStack Router/Table/Form. Most apps consume these *transitively* via
those libraries rather than adopting them directly as the app store; pick them
deliberately only when you want signal-style reactivity as a foundation.

## The second distinction: ownership vs subscription (the "render once" lens)

The server-vs-client split tells you *which tool*. A second, subtler distinction explains
*why some state architectures are fast and others crawl*, and it cuts across every library
above. `useState` quietly does **two** jobs: it *creates* state and *subscribes the
creating component to it* — ownership and subscription welded together, so the owner must
re-render on every change, then pass the value down to whoever uses it. `useContext` is
blunter: it subscribes to the **whole** context value, not the field you read, so any
change anywhere re-renders every consumer. (That is the real mechanism behind "Context is
slow" above: a font-scale provider that also carries window size re-renders every text node
in the app on a window resize.)

That welding is what makes docs-blessed patterns expensive. **Lift state up** — "one of the
most common things you'll do," per the React docs — moves ownership to the top, so one
leaf-level change (a single message's reply colour) cascades a render through the whole
screen on its way down. Coordinating through an **effect** (set state → re-render → open a
modal, repause a query, mark-as-read on focus) re-renders when nothing visual changed. A
**callback with a dependency** is recreated when that dependency changes, silently
re-rendering its host. None of this is a bug: render is the orchestrator of *everything*,
not just painting. And it is not free — benchmarked, moving an update from the top of the
app to the tiniest leaf cut CPU by roughly **10×** (Meistrich, App.js 2026). The React
Compiler removes hand-memoisation but **cannot** save you here: when a prop *actually*
changes, it still flows top-down.

The fix is to **stop coupling ownership to subscription**. Keep ownership high where it's
convenient, but hand children *stable* state objects — references whose identity never
changes — and let each consumer **subscribe to only the slice it reads** and re-render
*itself*. The coordinating screen renders once and then never again; only the leaf that
changed does work. These stable objects go by *signals*, *observables*, or (in Reanimated)
*shared values*; the label matters less than the property — **creating the state doesn't
subscribe you; reading it does.** That is "render once": render the app and its big
coordinating screens once, and let leaf nodes, effects, and callbacks update themselves.

Schematically, using the chat-reply example above:

```jsx
// BEFORE — ownership + subscription fused at the top; one change re-renders the whole screen
function ChatScreen({ messages }) {
  const [replyId, setReplyId] = useState(null);          // owned here…
  return (
    <>
      {messages.map(m => (
        <Message key={m.id} m={m}
          isReply={m.id === replyId}                      // …and threaded down to every row
          onReply={() => setReplyId(m.id)} />             // setReplyId re-renders ChatScreen → ALL rows
      ))}
      <Composer replyId={replyId} />
    </>
  );
}
```

```jsx
// AFTER — ownership stays high, subscription pushed to the leaf; only the affected row re-renders
const reply$ = observable(null);                         // stable object; its identity never changes

function ChatScreen({ messages }) {                      // renders once — it never *reads* reply$
  return (
    <>
      {messages.map(m => <Message key={m.id} m={m} />)}
      <Composer />
    </>
  );
}

function Message({ m }) {
  const isReply = use$(() => reply$.get() === m.id);     // subscribe to a *derived* slice
  return <Row highlighted={isReply} onReply={() => reply$.set(m.id)} />;  // set from anywhere, no prop-drill
}
```

`ChatScreen` never reads `reply$`, so it renders once; each `Message` subscribes to only the
`=== m.id` slice, so setting `reply$` re-renders exactly the one row whose value flipped —
not the list, not the screen. The `observable`/`use$`/`.get()`/`.set()` shape is Legend
State's; a Jotai atom, a Zustand selector, or `use-context-selector` expresses the same shift.
The point isn't the API — it's that *creation* and *subscription* are now separate lines.

This is neither exotic nor one vendor's trick. You already rely on it whenever a Reanimated
shared value drives an animation off the render path; it is why Legend List stays smooth (a
fixed pool of containers that signal *themselves* to re-render, instead of re-rendering the
list — see `RB-E-LISTS`); and it is the default model of Solid, Svelte, and Preact. Within
this entry's own landscape, **Jotai** already leans this way (atoms decouple a value from
its reader) and selector stores like **Zustand** narrow subscriptions to slices; dedicated
signal/observable libraries (**Legend State**, **TanStack Store**, and `use-context-selector`
for Context specifically) take it furthest.

Two honest caveats. It **departs from the React-docs defaults** (lift-state-up, effects for
coordination), so adopting it wholesale is an architectural choice a team buys into, not a
drop-in — and its sharpest articulation comes from the author of Legend State, so weigh it
as a *lens*, not a mandate; the ownership-vs-subscription reasoning survives dropping any
particular library. And it stays **Explanation-level** here: the mechanics — selector
placement, avoiding context-driven list re-renders, atomic vs coarse subscriptions — live in
`react-native-best-practices`, and the candidate libraries in the index entry. Hold just the
model: **decide who *owns* state separately from who *subscribes* to it, and push the
subscription as far down the tree as it goes.**

## Tradeoffs and failure modes to name out loud

- **"Context is slow"** is usually *"I used Context as a high-frequency store."* The fix
  is a selector-based store (Zustand/Jotai), not abandoning Context for the things it's
  good at.
- **"Redux is boilerplate"** largely predates RTK. Judge RTK, not 2018 Redux. But also
  don't *add* RTK to a small app to look serious — that's the inverse mistake.
- **Over-atomisation (Jotai) / over-storification** — splitting cohesive state into many
  atoms or stores trades one problem (too coarse) for another (too scattered). Group
  state that changes together.
- **Server state in a client store** — the cardinal error. If you find yourself writing
  `isLoading`, `error`, refetch and cache-invalidation logic by hand inside Zustand/Redux,
  that state wanted TanStack Query (see `RB-E-DATA`).

## How it interacts with the rest of the stack

- **React Compiler (`RB-E-REACT-CORE`).** With the compiler auto-memoising, the old
  performance argument *"a store avoids re-renders you'd otherwise hand-memoise"* weakens
  for client state — choose a store for its ergonomics and sharing model, not as a
  memoisation workaround. One caveat the ecosystem has flagged: **mutating objects you
  got from `useState` can defeat compiler optimisation** — prefer immutable updates and
  data-first models over behaviour-rich class instances in render paths.
- **React Native re-render performance.** The *depth* rules — selector discipline,
  avoiding context-driven list re-renders, atomic vs coarse subscriptions — are owned by
  `react-native-best-practices` (e.g. its atomic-state rule). This page tells you *which
  tool*; that skill tells you *how to wire it without jank*.
- **Forms (`RB-E-FORMS`)** are their own kind of state. Don't model form fields in your
  global store; a form library (React Hook Form, TanStack Form) owns that lifecycle.
- **Cross-platform (`RB-E-CROSSPLATFORM`).** All the client-state options here are
  platform-agnostic and belong in your shared logic package, working identically on web
  and React Native — a good thing to centralise once.

## Migrating (the short version)

Migrations between client stores are usually **not** worth it without a concrete pain —
the libraries are similar enough that the win rarely covers the cost. The migration that
*does* pay off is the conceptual one: **pulling server state out of a client store into
TanStack Query.** That typically *deletes* code (hand-rolled caching, loading flags,
refetch effects) rather than moving it, which is the signal of a good migration. Keep
detailed step-by-step migration mechanics out of this page — that is a how-to concern; the
principle is "move by responsibility, server-state first."

## In one paragraph

Decide *kind of state* before *library*. Default to **TanStack Query (server) + Zustand
(client)**; stay on healthy Redux Toolkit; reach for **Jotai** when state is naturally
atomic, **XState** when legal transitions are the hard part, and **plain useState/Context**
when you need nothing more — which is more often than the discourse suggests. The recurring
mistake is using one tool for both kinds of state. And past *which* tool lies *how* you wire
it: decouple who **owns** state from who **subscribes** to it, pushing re-renders down to the
leaves ("render once").

---

*See also: `RB-E-DATA` (server-state / data-fetching detail), `RB-E-FORMS`,
`RB-E-REACT-CORE` (Compiler interaction), `RB-E-CROSSPLATFORM`. Depth on re-render
performance: the `react-native-best-practices` skill.*
