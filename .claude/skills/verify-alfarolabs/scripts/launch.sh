#!/usr/bin/env bash
# Build the production bundle and serve it with `vite preview` (Cloudflare
# workerd runtime) on a free non-default port. Prints the URL when ready.
#   launch.sh            build, then serve on the first free port from 4791
#   launch.sh --no-build serve the existing dist/ (fails if dist/ is missing)
#   VERIFY_PORT=4800 launch.sh   require that exact port
set -euo pipefail
source "$(dirname "$0")/common.sh"
cd "$REPO_ROOT"

build=1
[[ "${1:-}" == "--no-build" ]] && build=0

if [[ -f "$INSTANCE_ENV" ]]; then
  source "$INSTANCE_ENV"
  if kill -0 "$PGID" 2>/dev/null; then
    echo "launch: an instance from this checkout is already running at $URL (pgid $PGID)." >&2
    echo "launch: run doctor.sh to inspect it or cleanup.sh to stop it." >&2
    exit 1
  fi
  rm -rf "$STATE_DIR"
fi
mkdir -p "$STATE_DIR" "$RUNS_DIR"

[[ -d node_modules ]] || npm ci
if (( build )); then
  npm run build >"$STATE_DIR/build.log" 2>&1 || { tail -30 "$STATE_DIR/build.log" >&2; exit 1; }
fi
[[ -f dist/client/index.html && -f dist/server/index.js ]] || { echo "launch: dist/ missing; run without --no-build" >&2; exit 1; }

port_free() { ! ss -Hltn "sport = :$1" | grep -q .; }
if [[ -n "${VERIFY_PORT:-}" ]]; then
  port_free "$VERIFY_PORT" || { echo "launch: port $VERIFY_PORT is busy" >&2; exit 1; }
  port=$VERIFY_PORT
else
  port=4791
  until port_free "$port"; do port=$((port + 1)); done
fi

# setsid gives the server its own process group so cleanup can stop exactly
# this tree (npm -> vite -> workerd) and nothing else.
setsid ./node_modules/.bin/vite preview --host 127.0.0.1 --port "$port" --strictPort \
  >"$SERVER_LOG" 2>&1 < /dev/null &
pgid=$!
url="http://127.0.0.1:$port"
cat >"$INSTANCE_ENV" <<ENV
PGID=$pgid
PORT=$port
URL=$url
REPO_ROOT=$REPO_ROOT
GIT_HEAD=$(git rev-parse --short HEAD)
GIT_DIRTY=$(git status --porcelain -- src public | wc -l)
BUILT_AT=$(stat -c %Y dist/client/index.html)
STARTED_AT=$(date -Is)
ENV

for _ in $(seq 1 60); do
  if ! kill -0 "$pgid" 2>/dev/null; then
    echo "launch: server exited early:" >&2; tail -30 "$SERVER_LOG" >&2; rm -rf "$STATE_DIR"; exit 1
  fi
  if curl -sf "$url/" 2>/dev/null | grep -qF "$READY_TEXT"; then
    echo "launch: ready at $url (pgid $pgid, log $SERVER_LOG)"
    exit 0
  fi
  sleep 0.5
done
echo "launch: not ready after 30s; see $SERVER_LOG" >&2
exit 1
