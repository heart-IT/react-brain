#!/bin/zsh
# ── local weekly harvest — the no-GitHub-App autonomy path ──────────────────────
# Runs a headless Claude Code session (your subscription, your machine) through
# the /harvest skill. PROPOSE-ONLY BY CONSTRUCTION: this script creates the
# harvest/<date> branch BEFORE the agent starts and the agent never pushes —
# review with `git diff main...harvest/<date>`, merge with --ff-only when happy.
# Installed by tools/install-local-harvest.sh (launchd, Thu 09:00 local; launchd
# catches up after sleep — a closed laptop delays the run, never silently skips
# the week). Logs append to tools/harvest.log.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"
echo "── local-harvest $(date '+%F %H:%M') ─────────────────────────────────────"

command -v claude >/dev/null || { echo "claude CLI not on PATH — abort"; exit 1; }
command -v node   >/dev/null || { echo "node not on PATH — abort"; exit 1; }

BRANCH="harvest/$(date +%F)"
git rev-parse --verify -q "$BRANCH" >/dev/null && { echo "$BRANCH already exists — already ran; abort"; exit 0; }
[ -z "$(git status --porcelain)" ] || { echo "working tree dirty — refusing to run unattended; abort"; exit 1; }
git checkout -q main && git checkout -q -b "$BRANCH"

PROMPT="Run the weekly react-brain harvest pass. Follow .claude/skills/harvest/SKILL.md EXACTLY — read it first, then tools/harvest-state.json and tools/upkeep-routine.md step 2. You are ALREADY on branch $BRANCH: commit everything here, NEVER switch to or commit on main, NEVER push, never force anything. All gates must pass before your final commit (coverage, verify-diff --base=main, npm test); the advocate pass over your own skips is mandatory. This is a headless run: skip the maintainer-memory ledger steps — put the full narrative (issues processed, keeps with receipts, notable skips, counts before/after) in the final commit message instead. If there are no new issues AND no firsthand events, print a one-line summary and stop (an empty branch is fine)."

claude -p "$PROMPT" \
  --model claude-sonnet-5 \
  --permission-mode acceptEdits \
  --allowedTools "Bash,Read,Write,Edit,Glob,Grep,WebFetch,WebSearch" \
  --max-turns 250 || echo "claude exited non-zero — inspect above"

git checkout -q main
echo "── done. review: git log main..$BRANCH · git diff main...$BRANCH · merge: git merge --ff-only $BRANCH"
if [ -z "$(git log "main..$BRANCH" --oneline 2>/dev/null)" ]; then
  echo "   (branch is empty — nothing harvested; delete with: git branch -D $BRANCH)"
fi
