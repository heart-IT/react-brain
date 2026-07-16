#!/bin/zsh
# Idempotent installer for the weekly LOCAL harvest (launchd, not cron: launchd's
# StartCalendarInterval fires on next wake if the machine slept through the slot —
# a weekly job that can't be silently skipped). Thu 09:00 local time; the Tue/Wed
# newsletters (TWiR, React Status) are fresh by then.
#   install:   bash tools/install-local-harvest.sh
#   uninstall: launchctl unload ~/Library/LaunchAgents/dev.react-brain.harvest.plist \
#              && rm ~/Library/LaunchAgents/dev.react-brain.harvest.plist
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
PLIST="$HOME/Library/LaunchAgents/dev.react-brain.harvest.plist"
NODE_DIR="$(dirname "$(command -v node)")"
CLAUDE_DIR="$(dirname "$(command -v claude)")"

mkdir -p "$HOME/Library/LaunchAgents"
cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>dev.react-brain.harvest</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string><string>-lc</string>
    <string>PATH="$NODE_DIR:$CLAUDE_DIR:/usr/bin:/bin:/usr/sbin:/sbin:\$PATH" exec "$REPO/tools/local-harvest.sh" >> "$REPO/tools/harvest.log" 2>&1</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict><key>Weekday</key><integer>4</integer><key>Hour</key><integer>9</integer><key>Minute</key><integer>0</integer></dict>
  <key>RunAtLoad</key><false/>
</dict></plist>
EOF

launchctl unload "$PLIST" 2>/dev/null || true
launchctl load "$PLIST"
echo "installed: dev.react-brain.harvest — Thursdays 09:00 local (catches up after sleep)"
echo "log: $REPO/tools/harvest.log · run now: bash $REPO/tools/local-harvest.sh"
