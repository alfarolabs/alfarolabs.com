---
name: dev-server
description: Starts, reuses, or repairs the supervised Alfaro Labs dev server and prints its portal URL. Use when starting the app, checking readiness, or capturing the site in a browser.
---

# Dev server

From the repository root, run:

```bash
.agents/skills/dev-server/ensure-dev-server.sh
```

If dependencies are missing, run `.agents/setup` first. The ensure script requires
an Amp orb, rejects the wrong working directory, reuses a healthy service, starts
a missing one, and restarts an unresponsive supervised service once. It never
kills an unrelated process. It writes the assigned port, local URL (automation
only), and public portal URL to `.amp/dev-ports.json`.

Use the exact printed portal link for the user. Vite listens on Amp's assigned
`$PORT`, not necessarily the default 3000. Amp supplies Vite's portal host allowlist;
do not disable host checking. Source changes hot reload. After dependency or
configuration changes, run `amp orb service restart web`, then run ensure again.

Logs: `.amp/in/server.log`, plus `amp orb service logs web`. A recovery failure
prints the supervisor log. Do not run a second Vite instance, use `&`, or put the
server in tmux. There is no application login, database, or seed account.

For browser work, load Amp's `using-agent-browser` skill, open the returned URL,
and set `agent-browser set viewport 1280 720 2`. Save screenshots/recordings under
`.amp/in/artifacts/`, inspect them before reporting, and use a mobile viewport too
for visual changes. Check navigation/booking links as well as rendered text.

Run `npm run check` for the full automated suite. To smoke-check the running site:

```bash
npm run smoke -- --url "$(node -p 'JSON.parse(require("node:fs").readFileSync(".amp/dev-ports.json", "utf8")).web.localURL')"
```

This dev server is not proof of deployment or the production bundle. Production
preview and post-deploy checks are documented in the root `AGENTS.md`.
