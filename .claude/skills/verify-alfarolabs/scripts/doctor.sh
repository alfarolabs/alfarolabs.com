#!/usr/bin/env bash
# Read-only: is the instance this checkout launched worth driving?
# Exit 0 = healthy. Pass --smoke to also run the repo's HTTP smoke check.
set -uo pipefail
source "$(dirname "$0")/common.sh"
cd "$REPO_ROOT"
fail=0
ok()  { echo "ok    $*"; }
bad() { echo "FAIL  $*"; fail=1; }

[[ -f "$INSTANCE_ENV" ]] || { bad "no instance state at $INSTANCE_ENV; run launch.sh"; exit 1; }
source "$INSTANCE_ENV"
echo "instance: $URL  pgid=$PGID  head=$GIT_HEAD  started=$STARTED_AT"

kill -0 "$PGID" 2>/dev/null && ok "process group $PGID alive" || bad "process group $PGID is gone"

listener=$(ss -Hltnp "sport = :$PORT" | grep -o 'pid=[0-9]*' | head -1 | cut -d= -f2)
if [[ -n "$listener" ]] && [[ "$(ps -o pgid= -p "$listener" | tr -d ' ')" == "$PGID" ]]; then
  ok "port $PORT owned by our process group (pid $listener)"
else
  bad "port $PORT not owned by pgid $PGID (listener pid: ${listener:-none})"
fi

body=$(curl -sf "$URL/" 2>/dev/null) && ok "GET / 200" || bad "GET / failed"
grep -qF "$READY_TEXT" <<<"$body" && ok "home renders hero text" || bad "home missing \"$READY_TEXT\""

[[ "$(git rev-parse --short HEAD)" == "$GIT_HEAD" ]] && ok "HEAD unchanged ($GIT_HEAD)" \
  || bad "HEAD moved since launch ($GIT_HEAD -> $(git rev-parse --short HEAD)); relaunch"
newest_src=$(find src public -type f -printf '%T@\n' | sort -n | tail -1 | cut -d. -f1)
(( newest_src <= BUILT_AT )) && ok "dist/ is newer than src/ and public/" \
  || bad "src/ or public/ changed after the build; relaunch to rebuild"

if [[ "${1:-}" == "--smoke" ]]; then
  npm run --silent smoke -- --url "$URL" | head -1 && ok "smoke over HTTP" || bad "smoke over HTTP"
fi
exit $fail
