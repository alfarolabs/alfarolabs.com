#!/usr/bin/env bash
# Stop the preview instance this checkout launched (by its process group,
# never by name) and remove its state dir. Never touches $RUNS_DIR evidence.
set -uo pipefail
source "$(dirname "$0")/common.sh"
if [[ ! -f "$INSTANCE_ENV" ]]; then
  echo "cleanup: no instance state for this checkout; nothing to stop"
else
  source "$INSTANCE_ENV"
  if kill -0 "$PGID" 2>/dev/null; then
    kill -TERM -- "-$PGID" 2>/dev/null
    for _ in $(seq 1 20); do kill -0 -- "-$PGID" 2>/dev/null || break; sleep 0.25; done
    kill -0 -- "-$PGID" 2>/dev/null && kill -KILL -- "-$PGID" 2>/dev/null
  fi
  if ss -Hltn "sport = :$PORT" | grep -q .; then
    echo "cleanup: WARNING port $PORT still has a listener (not ours, or it survived)" >&2
  else
    echo "cleanup: stopped pgid $PGID, port $PORT free"
  fi
  rm -rf "$STATE_DIR"
fi
echo "cleanup: evidence kept in $RUNS_DIR"
ls -1 "$RUNS_DIR" 2>/dev/null | tail -5
