#!/usr/bin/env bash
set -euo pipefail

root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../../.." && pwd)"
if [[ "$(pwd -P)" != "$root" ]]; then
  echo "Run this script from the repository root: $root" >&2
  exit 1
fi
command -v amp >/dev/null || { echo 'Amp CLI is required in an orb.' >&2; exit 1; }
[[ -d node_modules ]] || { echo 'Dependencies missing. Run .agents/setup first.' >&2; exit 1; }
mkdir -p .amp/in
exec > >(tee -a .amp/in/dev-server.log) 2>&1
rm -f .amp/dev-ports.json

if ! amp orb services ensure --json > .amp/in/services.json; then
  echo 'Readiness failed; restarting the supervised web service once.'
  if ! amp orb service restart web; then
    amp orb service logs web >&2 || true
    exit 1
  fi
  if ! amp orb services ensure --json > .amp/in/services.json; then
    amp orb service logs web >&2 || true
    exit 1
  fi
fi

# Keep this schema small: callers need the assigned port and exact URLs only.
node --input-type=module <<'JS'
import { readFileSync, writeFileSync } from "node:fs";
const result = JSON.parse(readFileSync(".amp/in/services.json", "utf8"));
const web = result.services.find((service) => service.name === "web");
if (!result.ok || !web?.health?.ok || !web.publicURL || !web.port) {
  throw new Error("Web service is not ready; inspect .amp/in/services.json and amp orb service logs web");
}
const localURL = `http://127.0.0.1:${web.port}`;
writeFileSync(".amp/dev-ports.json", JSON.stringify({
  web: { port: web.port, localURL, publicURL: web.publicURL },
}, null, 2) + "\n");
console.log(`web: ${web.action}; health HTTP ${web.health.status}`);
console.log(`Portal: ${web.publicURL}`);
console.log(`Automation only: ${localURL}`);
console.log("Port metadata: .amp/dev-ports.json");
JS
