#!/usr/bin/env bash
# Install a weekly (Mon 09:00) local cron that runs the deterministic react-brain pulse
# (link health + staleness + drift) and logs to tools/pulse.log. Idempotent. Zero cost,
# no LLM, no cloud. The agentic upkeep half is tools/upkeep-routine.md (Tier 2).
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
LINE="0 9 * * 1 cd $REPO && PATH=$BINDIRS:/usr/bin:/bin $NODE tools/cli.mjs pulse --today=\$(date +\\%F) $APPS >> tools/pulse.log 2>&1 $MARK"

# idempotent: drop any prior react-brain-pulse line, append the fresh one
{ crontab -l 2>/dev/null | grep -vF "$MARK" || true; echo "$LINE"; } | crontab -

echo "installed weekly react-brain pulse (Mon 09:00) → $REPO/tools/pulse.log"
echo "verify:  crontab -l | grep react-brain-pulse"
echo "remove:  crontab -l | grep -vF '$MARK' | crontab -"
