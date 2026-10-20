# Shared paths for the verify-alfarolabs helpers. Sourced, not executed.
# Evidence root survives cleanup; state root is what cleanup removes.
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(git -C "$SKILL_DIR" rev-parse --show-toplevel)"
VERIFY_ROOT="${VERIFY_ROOT:-/tmp/verify-alfarolabs}"
RUNS_DIR="$VERIFY_ROOT/runs"
# One state dir per checkout, so worktrees never share an instance.
CHECKOUT_ID="$(printf '%s' "$REPO_ROOT" | sha1sum | cut -c1-10)"
STATE_DIR="$VERIFY_ROOT/state/$CHECKOUT_ID"
INSTANCE_ENV="$STATE_DIR/instance.env"
SERVER_LOG="$STATE_DIR/server.log"
READY_TEXT="AI agents for live production."
