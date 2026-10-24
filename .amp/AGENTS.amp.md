# Amp orbs (Alfaro Labs)

Amp-only guidance for orbs, portals, supervised services, and `.amp/in` artifacts.
Root @AGENTS.md stays tool-neutral. Do not load Cursor/pstack instructions here.

## Setup and services

`.agents/setup` stays at the repo root: it installs the pinned Node, runs
`npm ci --no-audit --no-fund`, prepares the browser, and writes orb guidance.
`.amp/services.yaml` declares the supervised `web` service. Skills live under
`.amp/skills/` (see `.amp/settings.json`).

Load the **dev-server** skill at `.amp/skills/dev-server/SKILL.md`.
Run `.amp/skills/dev-server/ensure-dev-server.sh` from the repository root.
It ensures `.amp/services.yaml`, checks `/`, repairs a wedged service, and prints
the portal URL. Repeating it reuses the healthy process. Vite defaults to 3000
outside supervision; in an orb use the assigned port in `.amp/dev-ports.json`.
Use printed portals for people, local URLs only for orb automation.

Server logs: `.amp/in/server.log`; ensure logs: `.amp/in/dev-server.log`;
setup logs: `.amp/in/setup.log` (also `~/.cache/amp/logs/setup.log` when Amp runs it).
Inspect with `amp orb service status web` and `amp orb service logs web`.
After config/dependency changes: `amp orb service restart web`, then ensure again.
Do not use tmux, `nohup`, or `&` to run servers. No resume hook is needed unless
fresh-orb testing demonstrates a wake-time repair requirement.

## Production-bundle preview

For a production-runtime check after `npm run check`, start a supervised preview:

```bash
amp orb service start preview --command 'mkdir -p .amp/in; set -o pipefail; npm run preview -- --host 0.0.0.0 --port "$PORT" --strictPort 2>&1 | tee -a .amp/in/preview.log' --portal --title 'Production preview'
```

Run `npm run smoke -- --url <origin>` against the printed preview origin (no path)
or the deployed origin. HTTP mode also checks linked assets and a missing-route
404. If Node rejects the orb portal's certificate, use the local preview origin
and assigned port printed by `service start` for automation; never disable TLS
validation. Stop the one-off preview with `amp orb service stop preview` when done.

## Browser proof

Load Amp's `using-agent-browser` skill, verify affected navigation and booking
behavior, and inspect screenshots at desktop and mobile widths. Save review
evidence under `.amp/in/artifacts/`; record changed interactions. Report exact
commands/results and limitations.
