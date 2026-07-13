#!/usr/bin/env bash
# Install a weekly (Mon 09:00) local cron for the deterministic instruments:
#   pulse   — link health + staleness + drift            → tools/pulse.log
#   signals — npm downloads/last-publish vs the corpus    → tools/signals.log
#   census  — shipped-app adoption snapshot               → tools/census.log
# Each run refreshes the tracked baselines, so download TRENDS and adoption VELOCITY
# accumulate a data point every week with zero LLM cost — the harvest/challenge
# sessions inherit them as evidence. Idempotent; propose-only (snapshots are data,
# knowledge changes stay session-reviewed). Agentic half: tools/upkeep-routine.md.
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
NODE="$(command -v node)"
PY="$(command -v python3 || true)"
APPS="../../ledgerhr ../../ourpot/ourpot ../../bitbarter"   # edit to match the repos you want watched (repo lives in skills/react-brain; ourpot nests its app dir)
MARK="# react-brain-pulse"

# cron's default PATH is minimal; include node's + python3's dirs so the YAML fallback
# (python3 + pyyaml, used when the `yaml` npm package isn't installed) resolves.
BINDIRS="$(dirname "$NODE")"
[ -n "$PY" ] && BINDIRS="$BINDIRS:$(dirname "$PY")"
RUN="cd $REPO && PATH=$BINDIRS:/usr/bin:/bin"
LINE="0 9 * * 1 $RUN $NODE tools/cli.mjs pulse --today=\$(date +\\%F) $APPS >> tools/pulse.log 2>&1; $RUN $NODE tools/cli.mjs signals --today=\$(date +\\%F) >> tools/signals.log 2>&1; $RUN $NODE tools/cli.mjs census --today=\$(date +\\%F) >> tools/census.log 2>&1 $MARK"

# idempotent: drop any prior react-brain-pulse line, append the fresh one
{ crontab -l 2>/dev/null | grep -vF "$MARK" || true; echo "$LINE"; } | crontab -

echo "installed weekly react-brain pulse (Mon 09:00) → $REPO/tools/pulse.log"
echo "verify:  crontab -l | grep react-brain-pulse"
echo "remove:  crontab -l | grep -vF '$MARK' | crontab -"
