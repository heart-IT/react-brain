# Harvest manifest — This Week in React #290 (2026-07-15)

Processed 2026-07-16 (commits b324d66 + this one). EVERY item in the issue gets a
disposition here — `kept` (where it landed), `already-held` (where it already lives),
or `skipped` (why). A skip names its reason so a wrong skip reads as a reviewable
disagreement, not a silent miss. Reason classes: corroboration · how-to (defer_to_skill)
· pre-ship (RFC/proposal) · too-early (0.x lab) · cap (entry reading list full, judgment)
· off-scope (not a React/RN selection concern) · sponsor.

## React (web)

| item | disposition |
|---|---|
| React team page — Foundation Working-Group governance | **kept** → RB-E-REACT-CORE note + source (7 WGs + Leadership Council, verified) |
| react.dev Suspense docs — "what activates a boundary" section | skipped: docs improvement, not a selection fact; 300ms reveal throttle is internals trivia |
| Next.js Security Release Program (monthly patches) | skipped: corroboration — META-FRAMEWORKS note already carries the sharper fact (security releases don't backport) |
| Better Auth joins Vercel | **kept** → NEW entry RB-E-AUTH (trigger; first-party post verified) |
| "Cache Components in Next.js 16" (certificates.dev) | skipped: covered — META-FRAMEWORKS already reads the official 16.3 Instant Navigations post (same primitives) |
| "React Compiler explained" (neciudan.dev) | **kept** → RB-E-REACT-CORE reading (RETRO-ADDED after maintainer review overturned a cap skip — the emitted-output facet was genuinely uncovered) |
| "useOptimistic Already Handles Rollback" (dev.to) | skipped: how-to, single-API behavior note |
| "HTMX and Web Components Instead of React" | skipped: cap — ALT-FRAMEWORKS already holds 3 "do you need React" pieces (MDN/Lit, nanotags, Svelte) |
| "Async hydration in Preact" (jovidecroock) | skipped: cap + narrow — Preact internals; Preact is one option row in REACT-CORE |
| "SolidJS 2.0: A React Developer's First Look" | skipped: cap — ALT-FRAMEWORKS full; revisit if Solid 2.0 recurs across sources |
| "Exporting Next.js Server Traces with OpenTelemetry" (Sentry) | skipped: how-to (setup guide) |
| React Router 8.2 | already-held: RB-E-NAV option row cites 8.2.0 + migrate rules |
| Storybook 10.5 (Agentic Review, `storybook ai` MCP) | skipped: minor release; watch — if the agent-plugin direction recurs, RB-E-AI-DEVTOOLS is the home |
| Astryx 0.1.3 (Meta design system on StyleX) | skipped: too-early (0.1.x); COMPONENT-LIBS candidate if it earns adoption |
| React Email 6.7 | skipped: minor release, no entry owns email templating (no gap — niche) |
| video: Jack Herrington on Next.js | skipped: opinion piece; META-FRAMEWORKS already carries the substantive migration case (Railway) |
| video: Ankita Kulkarni Next.js 16.3 navigations | skipped: corroboration of the held 16.3 reading |
| podcast: Aurora Scharff async React (PodRocket) | skipped: author's written work already held in REACT-CORE reading |

## React Native

| item | disposition |
|---|---|
| RFC: media queries in StyleSheet | skipped: pre-ship RFC (StyleX-syntax, native-thread resolution — revisit on merge) |
| RFC: ViewTransition for RN (Fabric) | skipped: pre-ship RFC |
| RFC: Platform.Variant out-of-tree API (Doug Lowder) | skipped: pre-ship discussion |
| Margelo "Rewriting Rive RN with Nitro Modules" | already-held: RB-E-ANIMATION reading + option row + detect rows (added 2026-07-13, Margelo blog pass — pre-dates this issue) |
| Expo "nesting tabs and drawers with Expo Router" | skipped: how-to |
| "Notification Actions in Expo" (codewithbeto) | skipped: how-to; no notifications entry (no recurring selection signal yet) |
| thoughtbot "native stack navigation + iOS 26 surprise" | skipped: cap + transition-period (UIDesignRequiresCompatibility is a temporary opt-out); NAV at 6 readings — flag if iOS-26 Liquid Glass migration recurs |
| Expo "Moving away from @expo/vector-icons" | already-held: RB-E-SVG deprecation fact + migrate rule (SDK-56 changelog pass, 2026-07-09) |
| Expo Demos gallery | skipped: showcase, not selection knowledge |
| react-native-screens 4.26 (Tabs stable, RN 0.84+) | **kept** → RB-E-NAV note + source |
| keyboard-controller 1.22 (KeyboardEffects) | skipped: minor feature release; KEYBOARD entry doesn't track point versions |
| Sentry RN 8.18 (prebuilt xcframework) | skipped: minor release |
| react-native-auth0 5.9 (passwordless OTP) | **kept** → option detail in NEW RB-E-AUTH (release verified) |
| Unistyles 3.3 | skipped: minor release |
| react-native-webview 16.0 (legacy arch removed) | skipped: corroboration of the held New-Arch-only ecosystem shift (RN-VERSIONS) |
| react-native-toast-message 2.4 | already-held: RB-E-POLISH option row cites v2.4 |
| react-native-skia 2.8 (Paragraph.getPath, Reanimated optional) | skipped: minor release |
| react-native-bottom-tabs 1.4 | skipped: minor release |
| react-native-boost 1.6 (Image optimizer) | skipped: minor release; no entry owns it (babel micro-optimizer — BUILD candidate only if it recurs) |

## Ecosystem / tooling

| item | disposition |
|---|---|
| TC39 115th meeting agenda | skipped: pre-ship (proposals not yet advanced) |
| pnpm RFC: native monorepo versioning (merged) | skipped: pre-ship (RFC merged ≠ shipped; DX/BUILD candidate when it lands in a pnpm release) |
| npm 12.0 (install scripts opt-in) | already-held: RB-E-SECURITY option/note + the NodeSource nuance reading |
| Nub package manager | skipped: too-early; phantom-dep story noted for future corroboration |
| Bun rewritten in Rust (v1.4) | **kept twice** → RB-E-BUILD note (Rust-wave fact) + RB-E-AI-DEVTOOLS reading (agent-fleet methodology case study; primary post verified) |
| Native SDK (Vercel Labs) | skipped: too-early lab (TS/Zig→binary, experimental mobile) |
| "Fetch Needs Error Codes" (jasnell) | skipped: off-scope (web-platform spec gap, not React selection) |
| "The Siren Song of ariaNotify()" (CSS-Tricks) | **kept** → RB-E-A11Y reading + tagged claim |
| "Do we still need build tools?" (olliewilliams) | skipped: cap — BUILD full; the no-build argument is web-platform essay territory |
| "Proxy and Reflect" (piccalil.li) | skipped: depth (mechanics under Valtio/MobX) — internals, not selection |

## Sponsors
SVAR Gantt · Meticulous · PostHog · Formity · Drizz · Agent Conf — sponsor (not evaluated).
