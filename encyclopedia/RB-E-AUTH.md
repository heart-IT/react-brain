---
id: RB-E-AUTH
title: "About authentication & identity in React and React Native"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: low                # the options are mature; the entry's editorial judgment is young
updated: 2026-09-10
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-AUTH
defer_to_skill: null
related: [RB-E-SECURITY, RB-E-STORAGE, RB-E-META-FRAMEWORKS, RB-E-P2P, RB-E-NETWORKING]
sources:
  - "https://better-auth.com/blog/better-auth-joins-vercel"
  - "https://github.com/better-auth/better-auth/releases/tag/v1.7.0"
  - "https://invertase.io/blog/react-native-firebase-v26-release"
  - "https://github.com/auth0/react-native-auth0/releases/tag/v5.10.0"
---

# About authentication & identity in React and React Native

## The question that organises everything: who owns the user row?

Almost every argument about auth libraries is really an argument about one thing —
whether the canonical record of "who your users are" lives in **your** database or in
**someone else's service**. Everything else (which SDK, which UI components, which
protocol) follows from that answer, and the answer is expensive to reverse later
because it determines who can read, migrate, and delete your identity data.

That is why this entry does not open with a feature comparison. Feature lists across
auth products converge fast — everyone ships passkeys eventually. Ownership does not
converge, and it is the decision you are actually making.

Two secondary questions fall out of the first:

- **Do you already have an identity system?** If your backend bundles auth, you almost
  certainly should not add a second one.
- **Are you hand-rolling the session?** If so, the library choice matters far less than
  whether you get the session mechanics right — and that is where the real damage is done.

## The default, and why

**Self-hosted TypeScript auth → Better Auth. Managed auth with prebuilt UI, organizations
and MFA → Clerk. Backend already bundles auth (Supabase / Firebase) → use that.**

The reasoning behind each leg:

*Better Auth* wins the self-hosted lane on ownership plus surface area: your database
owns the users, it is framework-agnostic rather than tied to one meta-framework, and the
things teams eventually need — 2FA, passkeys, organizations — arrive as plugins rather
than as a migration to a different product. Its stewardship position also became unusually
strong: it acquired Auth.js/NextAuth, and then joined Vercel in 2026-07 with a stated
open-source and framework-agnostic commitment. Read that consolidation carefully in both
directions — it means the self-hosted lane now has one clear maintained answer, and it
means a single vendor sits behind both that answer and the framework many of its users
deploy on.

*Clerk* wins the managed lane not because managed auth is better but because the thing
teams actually buy is the **prebuilt UI plus organizations and MFA**, and Clerk ships those
with a first-class Expo SDK, so a React and React Native product gets one identity system
rather than two integrations. You pay in per-MAU pricing and vendor dependency, which is
the honest trade: you are renting the user row.

*Backend-bundled auth* wins whenever it applies, and the reason is not technical merit —
it is that a second identity system means two sources of truth about the same person,
two session lifetimes, and a reconciliation job nobody wants to own. "Already included"
beats "slightly better" here more often than engineers expect.

The entry carries **confidence: low**, and the distinction matters: the *options* are
mature and widely deployed. What is young is this entry's editorial judgment about them,
because auth was a domain gap in the corpus until 2026-07.

## The landscape, and when each one wins

**Auth.js / NextAuth** is the case that needs stating precisely, because "maintenance"
is easy to over-read. It is under Better Auth's stewardship: security and bug fixes
continue, and the stated path transitions users toward Better Auth. It is **not formally
deprecated** — which is exactly why the corpus refuses to ship a migrate rule for it. A
migrate rule is an instruction to spend a team's time; that instruction should wait for a
formal deprecation or EOL, not for a vibe about momentum. Until then it is a when-clause:
if you are already on it, plan the migration rather than deepening the investment.

**Auth0** wins where the requirement is not "authentication" but *federation* — SSO, SAML,
an existing corporate IdP. That is a procurement-shaped requirement, and the enterprise IdP
is the shape that fits it. Its React Native SDK stays actively developed.

**expo-auth-session** is the DIY lane on React Native: a browser-based OAuth/OIDC primitive
where you own token handling, session lifetime, and the correctness burden. Choosing it is
choosing to implement the parts the other options hide. That is legitimate — and it is why
the entry points at the Copenhagen Book before it points at any code.

## The React Native Firebase v26 line, and why it is the sharpest edge here

If your answer is "backend-bundled Firebase", there is a hard gate you cannot design
around. `@react-native-firebase` v26 is the largest architectural cut in the library's
history, and it is **conditional**: every package with a native bridge now requires the
New Architecture, because the native surface moved to Codegen TurboModules. You cannot
adopt v26 on a Legacy-Arch app. The maintainers' own advice in that situation is to stay
on v25 deliberately, and "deliberately" is the operative word — a pinned major with a
recorded reason is engineering; an accidental one is debt.

Two changes travel with it and both are real work: the deprecated **namespaced** API is
removed, so `firebase.auth()` becomes `getAuth(app)` and modular calls are the only
surface; and the packages moved to TypeScript, which is the prerequisite for the
TurboModule specs. The upgrade therefore sequences: New Architecture first, then v26,
then the namespaced-to-modular rewrite — not in any other order.

## Tradeoffs and failure modes to name out loud

- **Two identity systems.** The most common self-inflicted wound in this area: bolting a
  dedicated auth product onto a backend that already had auth. Every subsequent bug is a
  synchronization bug.
- **Storing session tokens wrong.** This is the failure that actually leaks users. Tokens
  belong in the Keychain/Keystore (see RB-E-STORAGE), never in AsyncStorage (see
  RB-E-SECURITY). No auth library saves you from getting this wrong on the client.
- **Hand-rolling sessions without reading the theory first.** If you take the
  expo-auth-session lane, the correctness burden is yours: fixation, rotation, expiry,
  revocation. Read the Copenhagen Book before writing the code, not after the review.
- **Reading a stewardship change as an endorsement.** Better Auth joining Vercel and
  acquiring Auth.js consolidates the lane, which is genuinely useful. It also concentrates
  it. Both facts are true; the entry states both rather than picking the flattering one.
- **Treating "maintenance" as "dead".** Auth.js still ships security fixes. Migrating off
  it is a planned move, not an emergency.

## How it interacts with the rest of the stack

Auth is a boundary concern, so it touches more of the corpus than most entries.
Token storage belongs to **RB-E-STORAGE** and the surrounding threat model to
**RB-E-SECURITY**. On web, session handling is entangled with your meta-framework's
server story (**RB-E-META-FRAMEWORKS**) — which is part of why framework-agnostic matters
in the self-hosted lane. In a **P2P / Holepunch** app the entire question dissolves:
there is no auth server, identity is keypair-based, and **RB-E-P2P** owns it instead.

A newer axis is worth watching but not betting on: agent-facing products, where AI agents
authenticate to your app rather than people. The Agent Auth Protocol work sits there. It
is early, and the entry says so.

## In one paragraph

Decide who owns the user row before you compare SDKs. If your backend already bundles auth,
use it — a second identity system costs more than any feature it buys. If you want to own
the data, Better Auth is the maintained framework-agnostic answer in that lane, with the
caveat that the lane has consolidated under one vendor. If you want to ship fastest and
are content to rent identity, Clerk gives you the UI, organizations and MFA across React
and Expo in one system. Reach for Auth0 when the requirement is federation, and for
expo-auth-session only when you intend to own the session mechanics — in which case read
the theory first, and put the tokens in the Keychain.
