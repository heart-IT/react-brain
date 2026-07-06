# react-brain weekly upkeep — the autonomy plan

Keeps the corpus **fresh, complete, correct** with minimal hand-tending. Two tiers,
split by what can run without an LLM. Everything is **propose-only** for knowledge —
deterministic fixes (dead links) are safe to surface; recommendation changes stay a
human-reviewed diff.

> **Why local, not cloud `/schedule`:** the pulse/doctor/evidence read this repo *and*
> the sibling apps off the local filesystem, and the repo has no git remote — so a cloud
> cron can't see them. The working hands-off path is a **local** schedule (cron) on this
> machine. Cloud `/schedule` only fits the web-only harvest, and even then has nowhere to
> commit proposals back. Keep upkeep local until/unless the repo gets a remote.

---

## Tier 1 — deterministic health (automate NOW, zero agent, zero cost)

Just runs `react-brain pulse`: dead-link scan + staleness + drift. No LLM, no network
cost beyond HEAD requests. Wire it to local cron — one command:

```sh
bash tools/install-cron.sh      # installs a Monday-09:00 weekly pulse, logs to tools/pulse.log
```

or by hand (crontab line it installs):

```cron
0 9 * * 1  cd /Users/f1sh/odd-jobs/heartit/react-brain && /usr/bin/env node tools/cli.mjs pulse --today=$(date +\%F) ../ledgerhr ../ourpot ../bitbarter >> tools/pulse.log 2>&1
```

Read `tools/pulse.log` weekly; act on DEAD links + undated/aging entries + drift.

## Tier 2 — agentic upkeep (growth + correctness; weekly, LLM-driven)

Runs the harvest + adversarial passes. Needs an LLM agent + the repo, so run it via a
**local headless agent** on a cron, or invoke it manually when you have a few minutes:

```sh
# local headless run (example; adjust to your CLI):
cd /Users/f1sh/odd-jobs/heartit/react-brain && claude -p "$(cat tools/upkeep-routine.md)"
```

The agent should, in order:
1. **Health** — run Tier 1 (`react-brain pulse … `) and read the deltas.
2. **Growth** — follow `tools/pulse-routine.md`: from the memory note's last-processed issue
   numbers, fetch only NEW issues (This Week in React, RN Rewind, React Status, React Digest),
   extract durable selection facts + canonical articles, **fetch-verify every URL**, map via the
   mentor's `capability_map`/`assessment_dimensions` (or flag a GAP). De-dupe vs existing.
3. **Completeness** — run `react-brain evidence ../ledgerhr ../ourpot ../bitbarter`; note new
   blind spots / contradictions.
4. **Correctness** — follow `tools/challenge-routine.md` on 2–3 rotating reviewed entries
   (oldest `updated:` first); record SURVIVES / WEAKENED / OVERTURNED.
5. **Emit ONE reviewable delta** — dead links, undated/aging entries, drift, proposed new
   entries/reading/status-flips (with verified sources), new gaps, challenge verdicts. Order by
   leverage. Apply only the deterministic fixes automatically; queue knowledge changes for review.
6. **Record** — append a one-line dated note to the memory file (issues processed, counts,
   entries challenged) so the next run resumes cleanly.

## Cadence

Weekly matches the newsletters. A quiet week = a short report. Rotate the challenge so every
reviewed entry gets re-attacked a few times a year. Never recommend churn for novelty
(MP-VETTED-OVER-PROMOTION holds throughout).
