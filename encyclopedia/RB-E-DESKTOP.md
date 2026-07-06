---
id: RB-E-DESKTOP
title: "About desktop apps & web-to-native shells for React"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: medium
updated: 2026-06-25
platforms: [react]             # React-DOM apps packaged as installable desktop clients
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-DESKTOP
defer_to_skill: engineering-principles                        # shell↔web boundary; Pear depth → holepunch-p2p-systems; shell security → RB-E-SECURITY
related: [RB-E-CROSSPLATFORM, RB-E-META-FRAMEWORKS, RB-E-BUILD, RB-E-SECURITY]
sources:
  - "https://tauri.app/"
  - "https://github.com/tw93/Pake"
---

# About desktop apps & web-to-native shells for React

> **Diataxis: Explanation.** This page builds *understanding* of the desktop-shell
> decision — the reasoning behind the pick. It is not a tutorial and not step-by-step
> how-to: the candidate list and one-line tradeoffs live in the index entry `RB-E-DESKTOP`;
> shell security depth lives in `RB-E-SECURITY`, and Pear (Holepunch) depth in the
> `holepunch-p2p-systems` skill. Read this to understand *why*; read those to *do*.

## React already runs on the desktop — the question is the shell

A "React desktop app" is almost never a special build of React. It is your ordinary
**React-DOM app rendered inside a window** that the operating system treats as a native
application — its own icon, dock/taskbar presence, menus, file associations, and OS APIs.
The React layer is unchanged. What you are actually choosing is the **shell**: the thin
native host that opens a window, points a web renderer at your UI, and brokers access to
the machine.

That reframing matters because it collapses most of the agonising. You are not picking a
UI framework here (`RB-E-STYLING`, `RB-E-COMPONENT-LIBS` already did that); you are picking
*how much machinery to staple to a web app you mostly already have.* The right default is
therefore the **lightest shell that grants the OS access you actually need** — and often
that is *no shell at all* (a PWA).

## The one distinction that organises everything

Every desktop shell answers one question, and the answer drives size, consistency, and
risk: **does it bring its own browser, or borrow the operating system's?**

- **Bundled renderer (Electron).** Ships its own copy of **Chromium + Node.js** inside
  every app. Consequence: **identical rendering on every OS** and **full Node/native power**
  — at the cost of a large install (often 100 MB+) and the memory of a whole browser per app.
- **Borrowed renderer (Tauri, Pake, Pear, Wails…).** Uses the **OS native webview** already
  on the machine — WebView2 (Chromium) on Windows, WKWebView (WebKit) on macOS, WebKitGTK
  (WebKit) on Linux. Consequence: **tiny installs** (Tauri builds start around ~600 KB) — at
  the cost that **rendering now varies by platform webview**, so the thing you must test is
  exactly what Electron buys you for free.

A second, orthogonal axis is **distribution**: most shells assume a central server or store
to download from; **Pear (Holepunch)** instead distributes apps peer-to-peer and
content-addressed, with no central host. For the heartit ecosystem that axis, not size, is
the deciding one.

Hold those two axes — *bundled vs borrowed renderer* and *centralised vs P2P distribution* —
and the option list stops being a grab-bag.

## The default, and why

> **Lightweight desktop → Tauri 2** (native webview, tiny builds). **Just wrapping an
> existing web URL → Pake.** **Need deep Node/native integration, the biggest plugin
> ecosystem, or already on it → Electron.** **P2P / serverless / local-first → Pear.**
> And before any of these: **if you don't need real OS integration, ship a PWA and skip the
> shell entirely.**

The ordering is deliberate. Start by asking whether you need a shell at all; then prefer the
borrowed-renderer path (small, modern) unless a concrete need — uniform rendering, a mature
plugin, or heavy Node use — pulls you to Electron. The verified facts behind the picks:
**Tauri 2.x is stable**, uses the OS webview, and spans desktop *and* mobile; **Pake**
(V3.12.0, 2026-06-21) is a one-command web-URL→desktop wrapper built **on** Tauri, landing
**under 10 MB — roughly 20× smaller than the Electron equivalent**. (Sources: tauri.app; the
Pake repository.)

## The landscape, and when each one wins

Treat these as *reasons to deviate from the default*, not a menu to agonise over.

**Electron** — the incumbent. It wins on **maturity and uniformity**: one Chromium means
your app renders the same on Windows, macOS, and Linux, and the plugin/native-module
ecosystem is the largest by far. Choose it when you lean hard on Node in the main process,
need a specific mature integration, or already have an Electron app that works. The price is
size and per-app memory, and a security posture you must configure (below).

**Tauri (2.x)** — the modern lightweight default. Rust core + OS webview yields tiny,
fast-starting apps and a locked-down-by-default security model (explicit capabilities rather
than an open Node surface), plus a single codebase that also targets iOS/Android. The costs
are **rendering variance across OS webviews** (you must test each) and writing native logic
in **Rust** rather than Node. (*Wails is the Go-based analog of the same borrowed-renderer
idea, if your native code is Go.*)

**Pake** — not really a framework but a **preset over Tauri**: point it at a URL and it
emits a desktop app with an icon, dock presence, and shortcuts. It wins as the **fastest path
to ship an existing website as a desktop client**, and as proof of how small the
borrowed-renderer approach gets. It is the wrong tool the moment you need real app logic,
deep OS integration, or offline behaviour beyond what the site already does — at that point
you've outgrown the wrapper and want Tauri (or Electron) proper.

**Pear (Holepunch)** — a **P2P application runtime** (on the Bare JS runtime) that runs your
JS/React-DOM app with **no central server**: apps are distributed peer-to-peer and
content-addressed. It wins when *serverless, local-first, or censorship-resistant
distribution* is the point — the heartit desktop apps live here. You're trading the
familiar store/server deployment model for the P2P one; the depth of that model (identity,
discovery, replication, update channels) is owned by the `holepunch-p2p-systems` skill.

**Capacitor (Ionic)** — the same borrowed-renderer idea aimed primarily at **mobile**
(iOS/Android), with desktop reached via an Electron target. It wins for a **web-first team
that wants one wrapped web app across mobile and desktop** and is comfortable in the Ionic
toolchain. For desktop *specifically*, it's an indirection over Electron rather than a
lighter option.

**PWA (no shell)** — the browser *is* the shell. Installable from the address bar, auto-
updating, zero packaging or signing. It wins whenever you don't truly need deep OS access:
it is the lightest possible "desktop app." Its ceiling is the browser sandbox — limited
filesystem, no arbitrary native APIs, weaker offline/background story than a real shell.
**Try this first; reach for a shell only when you hit that ceiling.**

## Tradeoffs and failure modes to name out loud

- **Reaching for Electron by reflex.** Shipping 150 MB and a full Chromium to host what is
  effectively a bookmark is the classic over-build. If you don't use Node or deep OS APIs, a
  PWA or Pake does the job at a fraction of the weight.
- **Assuming a borrowed renderer renders identically everywhere.** Tauri/Pake/Pear use the
  *OS* webview, so a CSS/JS quirk can appear on Linux's WebKitGTK but not on Windows'
  Chromium-based WebView2. Uniform rendering is precisely the thing you gave up for the small
  size — budget cross-OS testing. (This cuts the other way too: it's the single best reason
  to *stay* on Electron.)
- **Forking your UI in the shell.** The whole value is that desktop is just another *target*
  of the same React-DOM app (`RB-E-CROSSPLATFORM`). Keep the shell a thin host; if real
  product logic migrates into Electron's main process or Tauri's Rust side, you've grown a
  second app to maintain.
- **Trusting web content with native power.** A desktop shell deliberately punches a hole
  from web content to the machine. Electron's historic footgun is leaving Node reachable
  from the renderer (mitigate with context isolation, sandboxing, and an explicit IPC
  surface); Tauri inverts the default with an opt-in capability allowlist. Either way the
  bridge is the attack surface — depth on this is owned by `RB-E-SECURITY`.

## How it interacts with the rest of the stack

- **Cross-platform (`RB-E-CROSSPLATFORM`).** Desktop is the *web* target wearing a native
  coat: the same shared logic/state/data package and the same React-DOM UI run inside the
  shell. This entry is "how do I package the web build as an app"; that entry is "how do I
  share code across web and native."
- **Meta-frameworks & build (`RB-E-META-FRAMEWORKS`, `RB-E-BUILD`).** Whatever produces your
  web bundle feeds the shell. Note that **RSC/SSR meta-frameworks assume a server**, which a
  shipped desktop client may not have — a desktop shell usually wants a **client-rendered**
  build (SPA/static) it can load locally, which is also why Pake (pure URL wrap) is so cheap.
- **Security (`RB-E-SECURITY`).** The renderer↔native bridge, IPC allowlists, and
  content-security posture of the shell are security concerns, not packaging trivia.
- **P2P runtime depth.** Pear's identity, discovery, replication, and update model are owned
  by the `holepunch-p2p-systems` skill — this page only places Pear on the map.

## In one paragraph

A React desktop app is your web app in a native window; the real choice is the **shell**, and
it turns on one question — **bundle a browser or borrow the OS webview.** Electron bundles
Chromium for uniform rendering and full Node power at ~100 MB+; Tauri 2 borrows the OS webview
for tiny, modern, more-locked-down apps (test per-OS, write Rust for native bits); Pake is the
one-command way to wrap an existing URL on Tauri; Pear swaps centralised distribution for P2P
and is heartit's path; Capacitor suits web-first teams already shipping mobile; and a **PWA**
is the lightest "desktop app" of all — start there and only add a shell when you hit the
sandbox's ceiling. Keep the shell thin, test the borrowed renderer across platforms, and treat
the web↔native bridge as an attack surface.

---

*See also: `RB-E-CROSSPLATFORM` (desktop as another target of share-by-layer),
`RB-E-META-FRAMEWORKS` / `RB-E-BUILD` (the web build that feeds the shell), `RB-E-SECURITY`
(the renderer↔native bridge). Pear / P2P depth: the `holepunch-p2p-systems` skill.*
