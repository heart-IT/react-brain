# react-brain weekly — the newsletter plan

A Thursday newsletter published from the weekly harvest. NOT a new content pipeline:
the harvest already produces a dated, fetch-verified, adversarially-triaged delta every
week. The newsletter is that delta **rendered for a reader instead of for a repo**.

Status: PLAN ONLY. Nothing here is built. Decisions taken: **static pages on the
existing GitHub Pages site, no subscribe machinery** · fully automated draft,
human-reviewed before publish · zero readers at start.

---

## 1. Why this is cheap to add

Every ingredient already exists and is already gated:

| the newsletter needs | the harvest already produces |
|---|---|
| a weekly item list | `| kept:` rows across `tools/harvest-log/<source>-<n>.md` — each carries URL + target entry + a one-sentence rationale |
| version/deprecation news | `tools/harvest-log/firsthand-<date>.md` keeps (npm dist-tags · GH releases · author feeds) |
| "why it matters now" | fired ⚡ tripwires (standing caveats that became true this week) |
| a structural diff | `corpusDiff()` in `tools/react-brain-briefing.mjs` — deterministic YAML compare per entry: status flips, confidence, new options, new `recommend.when`, new note sentences, new reading/watching, plus the new `sources` as receipts |
| narrative | the dated `## <date>` section in `tools/harvest-log/LEDGER.md`, written every pass |
| link trust | `harvest verify-diff --base=main` — every URL the branch adds is machine re-verified (direct → Wayback) |
| an editorial filter | keep/skip triage + the mandatory advocate pass + `harvest coverage` (no unaccounted link) |

There is no research step to add. The draft is a **projection**, and its only new
judgment is ranking.

## 2. Ship day

Thursday is already the machine's day: `tools/install-local-harvest.sh` installs launchd
at **Thu 09:00 local**, and the routine's own rule is "on a Thursday, re-probe React
Status before declaring the pass complete" (React Status publishes Thursdays). So a
Thursday-evening issue carries that same morning's React Status. The 2026-09-01 pass ran
Tuesday off-cadence; the newsletter makes the Thursday slot load-bearing rather than
merely scheduled.

Cadence rule: **one issue per harvest pass**, not per week. A skipped pass = no issue —
never a filler issue. The routine's own calibration ("a small delta is a sign of health")
applies: a 4-item issue ships as a 4-item issue.

## 3. Issue shape

Working title: **react-brain weekly** · numbered from #1 · dated · ~900–1400 words,
12–18 items. Sections, in fixed order (a section with no items is omitted, not padded):

1. **⚡ Act on this** — security advisories, deprecations/retirements/dormancy, breaking
   floor-raises, fired tripwires. Usually 0–3 items. This is the section that earns the open.
2. **Moved** — status flips and version facts that change a recommendation:
   prerelease→stable, dist-tag flips, GA/pricing changes, API deprecations inside a held pick.
3. **New on the board** — options that filled a real corpus gap, and new entries.
4. **Worth reading** — kept `reading:`/`watching:` items, each with the one-line distilled
   `claim:` and, where tagged, its `applies_when:` ("matters if you ship X").
5. **Didn't keep — and why** — 3–5 skips with their reason class and reopen signal.
   This is the section nobody else can write: it is the corpus's negative space, and it is
   the honest answer to "six newsletters covered N things, why is your issue short?".
6. **Under the hood** — one short paragraph: the advocate flip of the pass, a spot-check
   correction, a dedupe miss caught by lint, the gate numbers. Optional; skip on a dull week.

Every item is one line of what changed + one clause of why it matters + the receipt link +
a link to the corpus entry page (`/entries/<slug>/`). Nothing in an issue is unsourced —
that is the product.

Explicitly NOT in an issue: routine patch bumps, `[rule:*]` auto-skips, pin refreshes,
sponsor/promo/context links. They collapse into one closing line ("plus N routine version
bumps triaged and dropped").

## 4. Selection: what counts as interesting

The keep/skip decision has already been made — do not re-litigate it in the newsletter.
Selection is **ranking of keeps**, by deterministic tier:

- **T1 → §Act**: item text matches the action markers already encoded in briefing.mjs
  (`/deprecat|retired|removed|frozen|superseded|no longer|shut ?down|dormant|dead|only runtime|new-arch(itecture)?[- ]only|mandatory|must be built|breaking/i`),
  OR the keep is a security advisory, OR a tripwire fired for it.
- **T2 → §Moved**: `corpusDiff` reports `status`/`confidence` change, a changed
  `recommend.default`, or an option tradeoff rewrite.
- **T3 → §New**: `isNew` entry, or a `new option:` row, or a keep whose manifest rationale
  names an uncovered facet ("neither X nor Y held any …").
- **T4 → §Reading**: new `reading:`/`watching:` rows; prefer those carrying `claim:` +
  `applies_when:` (they are pre-written reader value).
- **T5 → dropped to the closing line**: pins, patch rows, corroboration.

§Didn't keep is sampled from the pass's skip rows, preferring reason classes
`unverifiable`, `too-early`, `cap`, `off-scope` **that carry a reopen signal** — a skip
with a stated trigger is interesting; "sponsor" is not.

The one human judgment left: cutting T4 down to the 3–5 that are actually worth a reader's
hour. That is exactly what the review gate is for.

## 5. Where drafts live

```
newsletter/
  issues/2026-09-04.md      # frontmatter: number, date, title, status: draft|published, dek
  README.md                 # the two-minute version of this plan, for future-me
```

Repo root, not `tools/` — it is content, not tooling. The npm `files:` whitelist in
package.json does not include it, so nothing ships in the CLI tarball (correct: issues are
site content).

Format: markdown with YAML frontmatter. `marked` is already a site devDependency and
already renders entry docs (`docHtml()` in `site/src/lib/corpus.js`).

## 6. Generation (automated) and review (human)

New tool `tools/react-brain-newsletter.mjs`, wired as `react-brain newsletter` in
`tools/cli.mjs` (one `case` line, same `delegate()` shape as the other 17 commands).

```
react-brain newsletter draft [--since=<date>] [--date=<date>]   # writes newsletter/issues/<date>.md
react-brain newsletter lint  <issue.md>                          # the gate (see §8)
```

`draft` is deterministic — no LLM:
1. `corpusDiff(since)` for the structural change set + receipts (reuse, don't reimplement;
   extract it from briefing.mjs into a shared module so both callers use one implementation).
2. Parse the pass's manifests (`git diff --name-only` on `tools/harvest-log/*.md` for the
   commit range) for `kept:` rationale text, keyed to entry IDs.
3. Tier every item per §4, emit the sectioned skeleton with links and receipts.

The harvest agent then does the prose pass **inside the same session that did the triage**
— it already holds the reasoning; the dek and the one-clause "why it matters" cost it
almost nothing, and it writes §Under the hood from the LEDGER section it just wrote.

Review gate: the draft is committed on the propose-only `harvest/<date>` branch **with the
delta**, `status: draft`. The reviewer reads `git diff main...harvest/<date>` as today, and
now also reads one markdown file. The reviewer may reorder, cut, rewrite prose, and drop
items — but **may not add a claim that no manifest row backs** (§8 enforces it). Publishing
is a deliberate act: flip `status: published`, merge `--ff-only`.

Failure mode to design against: an unreviewed draft auto-publishing. Mitigation is
structural — the site renders only `status: published`, and only main is deployed.

## 7. Publishing: static pages on GitHub Pages

No subscribe form, no email list, no sending. The newsletter is a **static archive on the
site we already deploy**. This is a deliberate simplification, and it deletes the only part
of the plan that GitHub Pages cannot do.

New pages, following the existing Astro conventions:
- `site/src/pages/newsletter/index.astro` — archive list (title, date, dek, item count)
- `site/src/pages/newsletter/[slug].astro` — one issue, rendered with `marked`
- `site/src/pages/newsletter/rss.xml.js` — full-content RSS
- `newsletterIssues()` loader in `site/src/lib/corpus.js`, filtering `status: published`
- nav: add `{ to: 'newsletter/', label: 'newsletter' }` to `aboutLinks` in
  `site/src/layouts/Base.astro` (it flows into the sidebar and the mobile list for free)

Deployment needs no new machinery: `.github/workflows/pages.yml` rebuilds on every push to
main with `fetch-depth: 0`, so merging the harvest branch publishes the issue.

**Verified against the deployed build, not assumed:**
- Static endpoints emit real files — `src/pages/console-data.json.js` → `dist/console-data.json`.
  `rss.xml.js` works the same way and needs **no new dependency** (hand-roll the XML;
  `@astrojs/rss` would mean touching `site/package-lock.json` for nothing).
- Dynamic `[slug]` routes prerender to directories — `dist/entries/a11y/` and friends.
  `dist/newsletter/<slug>/` is the identical pattern.
- `marked` is already a site devDependency and already renders entry docs in CI.

**The one config fix required.** `site/astro.config.mjs` sets only `base`; there is no
`site:` key and nothing in `src/` references `Astro.site`. RSS needs absolute URLs, so a
feed built today would emit `/react-brain/newsletter/x/` and be invalid. Add one line:

```js
site: 'https://heart-it.github.io',   // absolute URLs for the newsletter feed
base: process.env.ASTRO_BASE || '/',
```

Safe, unlike `base`: `site` is a static value, so it does not hit the documented footgun
where `npm run build -- --base …` lands on pagefind instead of astro.

There is no `public/CNAME`, so issue URLs are
`https://heart-it.github.io/react-brain/newsletter/<slug>/`.

**Pagefind: index the issues.** Nothing in `src/` uses `data-pagefind-ignore`, so issues
are indexed by default — and with no list to blast, **search and links ARE the
distribution**. Keeping them in is the point, not an accident. Revisit only if issue hits
start crowding entry hits in `/search`.

**Substack, if ever.** Not in this plan and nothing depends on it. If a list is wanted
later, it is a manual paste of the already-published issue with a canonical link back to
the site — and it should only be considered once the archive has proven it is worth
reading. (Also unverified: whether Substack exposes a first-party publishing API. Do not
build against an undocumented endpoint.)

## 8. Gate (the verifiable done criterion)

`react-brain newsletter lint <issue.md>` — exit 0 required, added to `npm test`'s chain
when a `newsletter/issues/*.md` file changed:

- every external URL in the issue appears in a manifest `kept`/`already-held` row of that
  pass, OR in an entry's `sources:`/`reading:` for an entry touched by that pass;
- every internal `/entries/<slug>/` link resolves to a real entry ID;
- frontmatter complete; `number` unique and sequential; `date` is the pass date;
- `status` is `draft` or `published`.

This is the whole trust story in one command: the newsletter cannot claim what the corpus
cannot back. It reuses the receipts `harvest verify-diff` already produced — no second
verification pass, no second network cost.

Routine change (`tools/upkeep-routine.md`, Tier 2): one clause in **step 5** ("emit ONE
reviewable delta" → "…and run `react-brain newsletter draft`"), one clause in **step 6**
(the gate chain), one clause in **step 7** (commit the issue with the delta and the ledger
section). Plus the `.claude/skills/harvest/SKILL.md` non-negotiables list gains one line.
No other part of the method moves.

## 9. Starting from zero readers

With no list, the value has to be **archive-first** from day one — which is the only mode
a static site supports anyway:

- Every issue is a permanent, linkable, search-indexed page on a site that already ranks
  for its entries. An issue is useful with zero readers: it is a dated reference for "what
  happened in React the week of X, with receipts", and it interlinks with the entry pages
  that carry the full argument.
- Ship **#1 as a backfill** built from the last four LEDGER sections, so the archive is not
  one lonely page on launch day. The generator runs over any commit range, so this is a
  re-run, not new work.
- RSS is the whole subscription story. It costs one static file and no infrastructure.
- No growth theatre: no popup, no share buttons, no referral anything.
- Success metric for the first ten issues is **shipped-on-Thursday, gate-green** — not
  readers. If the pipeline holds for ten weeks with nobody watching, it still paid for
  itself: the draft doubles as the human-readable summary of every harvest pass, which is
  currently something only the LEDGER's dense prose provides.

## 10. Dry run — what 2026-09-01 (commit `fb73bbf`) would have published

Real pass: 6 issues + firsthand (114 events), 19 entries touched. Mapped to sections:

**⚡ Act on this**
- Next.js August security release — two critical unauthenticated RCEs, not the one
  pre-announced: CVE-2026-75604 (Windows-hosted, Pages+App Router without Cache Components,
  no workaround) and GHSA-2xp9-vwfh-vxw4 (AVIF via libheif/sharp — the patch *disables* AVIF
  optimization). Shipped a day early, 2026-08-25. → META-FRAMEWORKS. *(the fired tripwire;
  the npm-patch rule would have swallowed 16.3.4 silently)*
- fbtee 4.0 removes the Babel compiler for a Rust/Oxc CLI — 3.3.0 is the Babel terminus. → I18N
- callkeep is dormant (last npm publish 2024-11) on the pre-Jetpack telecom API →
  expo-callkit-telecom / SDK-bundled call UI. → MEDIA
- Floor-raises: victory-native 42 (Skia 2.6 + PathBuilder, Reanimated 3.19.1) →CHARTS ·
  react-native-screen-transitions 4.0 (React 19.2 / Reanimated 4 / Worklets 0.8; v3 line
  remains) → ANIMATION

**Moved**
- Waku 1.0-beta → 1.0-RC, API frozen (rc.0, 2026-08-25) → META-FRAMEWORKS
- Worklets 0.12 promoted to `latest` — retires the entry's "sits on next" status; Reanimated
  4.6 adds RN 0.83–0.87 support + native CSS callbacks → ANIMATION
- EAS Observe hits GA: per-EVENT pricing replaces the 10k-MAU beta tier (100K free / $19 /
  $199, 90d retention), SDK 55/56/57 floors, needs a new binary — still not a crash reporter → OBSERVABILITY
- TanStack Query 5.102 adds `query()`/`infiniteQuery()`, deprecating
  `prefetchQuery`/`ensureQueryData` (additive) → DATA
- GTKX 1.5 ships @gtkx/forms (RHF/Adwaita) + @gtkx/i18n → DESKTOP
- React Navigation 8.0-alpha noted; stable graduation covered by the engine's guard → NAV

**New on the board**
- `browser()` canary API — `use(browser())` marks a Client Component browser-only and
  suspends to the Suspense fallback during SSR, replacing typeof-window hacks → REACT-CORE
  *(and it consumed twir-293's standing pre-ship skip — the reopen signal firing as designed)*
- react-native-filament — PBR renderer as declarative components, the gap between r3f and
  Godot; quiet since May, stated → GAMES
- Expo's first-party agent layer (docs.expo.dev/agents): official `expo` plugin, MCP server
  with EAS Build/Update/TestFlight access, generated AGENTS.md → AI-DEVTOOLS

**Worth reading**
- *Making React Testing Library Tests 43% Faster* — the win landed **upstream in jsdom**;
  slow RTL is a jsdom-version problem → TESTING
- The Next.js memory-leak deep dive — heap-signature correlation + retainer chains; three
  framework leaks across 15.5–16.2, fixed in 16.3.0 → OBSERVABILITY
- Expensify × NitroFetch, a production receipt: 15–30% faster requests, startup P50 −267ms
  iOS / −650ms Android via prefetch-before-JS with account-scoped keys; Cronet cert-pinning
  caveat → NETWORKING
- aurorascharff on `cache()`/`preload` — kept only because neither REACT-CORE nor DATA held
  any `cache()` coverage → REACT-CORE
- saschb2b's survey of tools shipping their own instructions (MCP / AGENTS.md convergence) → AI-DEVTOOLS

**Didn't keep — and why**
- PDFium vs PDF.js selection guide — good, bias-disclosed, covers a facet nothing owns, but
  the URL fails WebFetch, browser-UA curl *and* Wayback. No receipt, no keep. Reopen if PDF
  rendering recurs (that is also the cue to open a GAP).
- Ionic 9 — off-scope: the corpus tracks Capacitor as a shell, not Ionic Framework UI.
- jovidecroock's `Stable<T>` phantom-brand — credible author, explicitly an experiment.
  Too-early; reopen on a shipped package or lint rule.
- Rifm 1.0 (input masking) — cap: FORMS holds no masking facet and one 1.0 isn't demand.
- electron 44 and pear-runtime-react-native 3.0.0 — majors that touch no corpus fact
  (pear's 3.0.0 is three commits with an empty release body).

**Under the hood**
The advocate pass flipped the `cache()` post back in after an initial "how-to" skip — the
measured keep-aversion failure mode caught by the pass built to catch it. Lint's shared-URL
warning caught a dedupe miss (stale-ShadowNodes was already held in NATIVE). Spot-check
re-validated the twir-294 cap skip. Gates: lint clean · 1628 gold rows · eval 139/139 ·
verify-diff 14/14 receipts · coverage 6/6 issues.

*Plus 35 rule-dispositioned patch bumps and a handful of pin refreshes, triaged and dropped.*

Count: 5 + 6 + 3 + 5 + 5 = 24 items, ~1200 words. Slightly over target because this pass
absorbed two weeks of backlog — a normal week lands nearer 12.

## 11. Build order

1. Extract `corpusDiff()` from briefing.mjs into a shared module (no behavior change).
2. `tools/react-brain-newsletter.mjs` — `draft` + `lint`; CLI case; `npm test` hook.
3. Site: loader + two pages + RSS + nav link.
4. Backfill #1 from the last four LEDGER sections; review it as a real issue.
5. One line in `site/astro.config.mjs` (`site:`), needed before RSS is trustworthy.
6. Routine + skill wording (§8).

Steps 1–4 are one focused change; 5–6 are minutes. Nothing here touches the harvest
method, the gates, or the corpus.
