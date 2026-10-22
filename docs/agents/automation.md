---
globs:
  - ".agents/setup"
  - "**/*.sh"
  - "scripts/**/*.mjs"
  - ".amp/services.yaml"
  - ".github/workflows/*.yml"
---

# Automation

- Bash scripts use `#!/usr/bin/env bash`, `set -euo pipefail`, quoted paths, and
  executable permissions. Check with `bash -n` and actually run changed paths.
- Setup is finite and idempotent: use `.node-version`, `npm ci`, no servers or
  credentials. Preserve unrelated home guidance/profile content when writing
  managed sections. Verify the pinned Node in a fresh noninteractive login shell.
- Amp supervises long-running processes from `.amp/services.yaml`; use `$PORT`,
  an HTTP readiness check, and printed portal URLs. Never kill arbitrary listeners.
- Runtime logs/artifacts belong in ignored `.amp/in/`; ignore port/portal metadata.
  Do not commit environment-dependent outputs or hardcoded portal hosts.
- CI checks PRs and deploys `main`; do not trigger deployment to test automation.
- Smoke uses ESM and Node built-ins. Assert observable outputs, not private helper
  structure or mock interactions, and keep failures nonzero and understandable.
