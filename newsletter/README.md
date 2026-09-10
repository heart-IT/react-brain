# react-brain weekly — issues

The weekly harvest, rendered for a reader instead of for a repo. One issue per harvest
pass — not per week. A skipped pass means no issue; there are no filler issues.

Full reasoning: [`tools/newsletter-plan.md`](../tools/newsletter-plan.md). That file is a
PLAN and parts of it are still unbuilt — trust this README and the actual code over it.

## What is built

- `newsletter/issues/<date>.md` — one issue, markdown + YAML frontmatter
- `site/src/lib/corpus.js` → `newsletterIssues()` / `issueHtml()` — the loader
- `site/src/pages/newsletter/index.astro` — archive
- `site/src/pages/newsletter/[slug].astro` — one issue, `<slug>` is its date
- nav entry in `site/src/layouts/Base.astro` (`aboutLinks`)

Not built yet, and named in the plan: `rss.xml.js`, and a
`react-brain newsletter draft|lint` CLI. The gate below is currently run by hand.

## Frontmatter

```yaml
number: 2                 # sequential, unique
date: 2026-09-10          # the harvest pass date; also the URL slug
title: "…"                # the hook
status: published         # draft → not rendered on the site at all
dek: >-                   # 2–3 sentences; block scalar, because deks contain colons
  …
covers:                   # THE ANTI-REPEAT RECORD — manifests this issue consumed
  - firsthand-2026-09-10
  - twir-295
```

`covers:` is the load-bearing field. It names the `tools/harvest-log/<name>.md` manifests an
issue drew from, so the next issue can tell what has already been published and never
re-covers it. Adding an issue without `covers:` breaks that guarantee silently.

## The gate

Two properties, both checkable against the repo:

1. **Every external link is a receipt.** Each URL in the body must appear in a manifest row
   of a covered pass, or in the `sources:`/`reading:` of an entry that pass touched. The
   newsletter cannot claim what the corpus cannot back — that is the entire product.
2. **Every `/entries/<slug>/` link resolves** to a real entry id.

Plus: no two issues may share a `covers:` entry.

## House style

Sections in fixed order, omitted rather than padded when empty: **⚡ Act on this** ·
**Moved** · **New on the board** · **Worth reading** · **Didn't keep — and why** ·
**Under the hood**.

Two rules worth restating because they are what makes it readable:

- *Don't re-litigate triage.* The keep/skip decision was made during the harvest. The
  newsletter ranks keeps; it does not reopen them.
- *Explain the mechanism, not just the version.* Where a change is confusing — why a CSP
  silently did nothing, why a gesture died mid-press — spend the extra two sentences on a
  concrete model. That is the part a changelog cannot give anyone.

Routine patch bumps, `[rule:*]` auto-skips, pin refreshes and sponsor links never get an
item; they collapse into one closing line.
