---
id: RB-E-SECURITY
title: "About app security — boundaries, secrets, and supply chain (React & React Native)"
diataxis: explanation          # understanding-oriented: the *why* behind the index recommendation
status: reviewed
confidence: high
updated: 2026-07-02
platforms: [react, react-native]
index_entry: ../skills/react-brain-mentor/encyclopedia.yaml   # see entry RB-E-SECURITY
defer_to_skill: review                                        # per-diff secret/injection/dependency checks
related: [RB-E-REACT-CORE, RB-E-META-FRAMEWORKS, RB-E-STORAGE, RB-E-DX]
sources:
  - "https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components"
  - "https://github.com/advisories/GHSA-83fc-fqcc-2hmg"
  - "https://nodesource.com/blog/npm-v12-install-scripts-not-a-silver-bullet"
---

# About app security — boundaries, secrets, and supply chain (React & React Native)

> **Diataxis: Explanation.** This page builds *understanding* of where React/RN security risk
> actually lives — durable posture, not a live CVE feed. Per-diff secret/injection/dependency
> checking is owned by the `review` skill; live advisories belong in a security feed. Read this
> for the *why*.

## The one question that organises everything: which side of which boundary?

Most security confusion in the React world dissolves once you ask **where the boundary is** —
because risk, and responsibility, sit on a *specific* side of it:

- **Client vs server.** The scariest React-specific CVEs of 2025–26 — the **RSC / Server-Function
  DoS family** (e.g. CVE-2026-23864, CVSS 7.5; React2DoS) and the Dec-2025 RSC source-exposure /
  RCE issues — are **server-side** (`react-server-dom-*`, Next.js App Router). They are patched
  across React 19.0.5 / 19.1.6 / 19.2.5 and **do not affect React Native**. Conflating "React had
  a critical CVE" with "my RN app is exposed" is the most common scoping error.
- **Client vs server, again (device trust).** Anything the client asserts about itself — "not
  jailbroken," "real device" — is *defeatable*, because the attacker owns the client. Client-side
  checks (jail-monkey) are signal, not enforcement; trust must be established **server-side**
  (Play Integrity / DeviceCheck attestation).
- **Your code vs the supply chain.** The bigger *practical* risk in 2025–26 wasn't your code at
  all — it was the **supply chain**: the Shai-Hulud worm, the `@tanstack/*` npm compromise, the
  axios RAT. That's why npm v12 now blocks install scripts by default.

So the durable posture isn't "scan for CVEs" — it's **know which boundary a risk lives on and put
the control on the right side.**

## The default, and why

> Secrets in **Keychain / secure-store** (never AsyncStorage); **harden the supply chain** (block
> install scripts, gate install-age); device trust via **server-side attestation**; route per-diff
> secret/injection/dependency checks to the **review** skill.

Each clause follows from a boundary. Secrets on a device belong in the OS secure enclave, not in
plaintext key-value (`RB-E-STORAGE`). The supply chain is now the highest-probability attack path,
so install-script blocking + install-age gating + provenance are baseline (provenance alone is not
enough). Device trust is meaningless client-side, so it must be server-verified. And *live*
per-change checks (a leaked key, an injection sink, a vulnerable dep in this PR) are a per-diff
concern — owned by the `review` skill, not by a static encyclopedia.

## The landscape, and when each control matters

**Keychain / secure-store (react-native-keychain / expo-secure-store)** — the only correct home
for tokens/secrets on device. AsyncStorage is plaintext; using it for secrets is a recurring
finding (`RB-E-STORAGE`).

**Supply-chain hardening** — install-script blocking (npm v12 default), install-age gating
(`minimumReleaseAge` / min-release-age), and provenance. The response to the worm/compromise wave;
the highest-leverage dependency controls — but install-script blocking is a *floor, not a ceiling*
(malware shifts to import-time execution; see failure modes).

**Device trust (jail-monkey v3 + server attestation)** — jail-monkey does client-side
jailbreak/root/mock-location/debug detection (v3 adds New-Arch support), but it is **not** a
substitute for server-side Play Integrity / DeviceCheck. Use it as a hint; enforce on the server.

**Trusted Types (web)** — React integrates the browser Trusted Types API for XSS prevention;
`dangerouslySetInnerHTML` needs an explicit policy. The web injection-surface control.

**Dependency CVE scanning** — `npm`/`pnpm audit` and friends; route the *depth* (triage, per-diff)
to the review skill's security phase rather than treating the encyclopedia as the scanner.

## Tradeoffs and failure modes to name out loud

- **Mis-scoping server CVEs to RN.** The RSC DoS/RCE family is server-side; patch your React on
  the web, but don't panic your React Native app over it (`RB-E-REACT-CORE`, `RB-E-META-FRAMEWORKS`).
- **Trusting the client.** Shipping device-trust or entitlement decisions that the client can flip.
  If the attacker owns the runtime, the check must live on the server.
- **Secrets in AsyncStorage.** Plaintext tokens one `adb backup` away. Keychain/secure-store, always.
- **Provenance as a complete answer.** Provenance proves origin, not safety; pair it with install-
  script blocking and age-gating.
- **Install-script blocking as a complete answer.** npm v12's default block closes the *install-time*
  door, but malware has already moved to the *execution-time* door — the payload as a top-level
  module side effect that runs on first `require`, or a `binding.gyp` that fires npm's implicit
  `node-gyp rebuild` (the June-2026 Miasma campaign). Removing a trigger isn't removing the
  capability; layer runtime constraints on top — Node's `--permission` model (cap net / child-process
  / fs-write), CI egress allow-listing, container/seccomp isolation.
- **Treating this page as a CVE feed.** Specific live advisories go stale; they belong in a feed +
  the `review` skill, while this entry holds the durable posture.

## How it interacts with the rest of the stack

- **React core / meta-frameworks (`RB-E-REACT-CORE`, `RB-E-META-FRAMEWORKS`).** The RSC/Server-
  Function server surface is where the React-specific CVEs live; patch cadence is part of choosing
  a web framework. None of it reaches React Native.
- **Storage (`RB-E-STORAGE`).** Secrets → Keychain/secure-store, not AsyncStorage; the two entries
  share that rule.
- **DX (`RB-E-DX`).** Supply-chain hardening (install-script blocking, dependency automation) lives
  in the same CI/dependency-hygiene loop.
- **Per-diff depth (`review`).** Secret/injection/XSS/auth/dependency checks on an actual change
  set are owned by the review skill — this page is posture, that skill is enforcement.

## In one paragraph

Security clarity comes from asking **which side of which boundary** a risk lives on: the scary
React CVEs (RSC DoS/RCE) are **server-side** and don't touch React Native; **device-trust** checks
are meaningless on the client and must be **server-verified**; and the biggest practical danger is
the **supply chain**, not your code (hence install-script blocking + age-gating). Keep secrets in
**Keychain/secure-store**, use **Trusted Types** for web XSS, and route live per-diff
secret/injection/dependency checks to the **review** skill — this entry is durable posture, not a
CVE feed.

---

*See also: `RB-E-REACT-CORE` / `RB-E-META-FRAMEWORKS` (RSC CVEs are server-side), `RB-E-STORAGE`
(secrets belong in Keychain), `RB-E-DX` (supply-chain hardening in CI). Per-diff enforcement: the
`review` skill.*
