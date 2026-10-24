# Alfaro Labs

Public, five-page site for Carlos Alfaro and Alfaro Labs: `/`, `/manifesto`,
`/agents`, `/about`, `/contact`. React 19 + TanStack Start/Router + Vite, prerendered and
served by Cloudflare Workers. No database, seed users, application sign-in, or
required local secrets. Do not add auth bypass endpoints or backing services.
pstack is paused until Carlos re-enables it.

## Map and conventions

- `src/routes/`: file routes and metadata; `src/components/`: shared UI.
- `src/content/index.ts`: typed ledger for all published copy, links, and logos.
- `src/styles/app.css`: global responsive styles; `public/`: brand and local fonts.
- `scripts/smoke.mjs`: the test suite; `.github/workflows/ci.yml`: checks and deploy.
- `vite.config.ts`, `wrangler.jsonc`: build/runtime configuration.
- Subtree guidance: `src/AGENTS.md`, `src/content/AGENTS.md`, `public/AGENTS.md`,
  `scripts/AGENTS.md`. This is one app, not a monorepo.

See @docs/agents/*.md for file-scoped TypeScript, CSS, shell, and test conventions.
Match existing two-space indentation, double quotes, and semicolons in TS/JS.
Keep changes small; do not hand-edit `src/routeTree.gen.ts` or build output.
Never print credentials, commit env files, relax host checking, or expose secrets
in client bundles. No Cloudflare token is needed for local work.

## Commands (repository root)

Use Node **22.23.3** from `.node-version` (bundles npm **10.9.9**).
In a fresh orb, run `.agents/setup`; it installs the pinned toolchain, runs
`npm ci --no-audit --no-fund`, and prepares the browser. It links Node/npm/npx
into `/usr/local/bin` for agent commands and services. Verify with `node --version`
and `npm --version`.

| Purpose | Exact command |
| --- | --- |
| Install locked dependencies | `npm ci --no-audit --no-fund` |
| Typecheck | `npm run typecheck` |
| Build/prerender | `npm run build` |
| Tests (after build) | `npm run smoke` |
| Runtime smoke over HTTP (after build) | `npm run smoke:preview` |
| Full gate (what CI calls) | `npm run check` |
| Lint | Not configured; do not invent `npm run lint` |

`check` runs typecheck → build → smoke → smoke:preview. `smoke:preview` serves
`dist/` with `vite preview` (workerd) on a free local port and runs HTTP smoke.
CI is the authoritative gate: it runs `typecheck` in parallel with `build`
(build, smoke, smoke:preview), then deploys the tested artifact on `main`.
There is no separate unit-test runner. Smoke checks five pages, copy
ownership/brand rules, and immutable logo hashes; it does not test layout,
hydration, or clicks. Do not weaken checks to accommodate an accidental copy
change, derive new expected results from the implementation, or test private
helpers/mock call order. Add tests only for observable contracts.

## CI

The check command CI calls is `npm run check` (same scripts/order as the parallel
jobs in `.github/workflows/ci.yml`). Do **not** re-run that full suite in Cursor
or Amp cloud before pushing. Push to the branch, read the result from GitHub
Actions (`gh run watch` / the PR checks), and fix failures from the CI output
and job summaries. This public repo runs on GitHub-hosted `ubuntu-latest`
(not a self-hosted runner).

## Run and prove

Load the **dev-server** project skill at `.agents/skills/dev-server/SKILL.md`.
Run `.agents/skills/dev-server/ensure-dev-server.sh` from the repository root.
It ensures `.amp/services.yaml`, checks `/`, repairs a wedged service, and prints
the portal URL. Repeating it reuses the healthy process. Vite defaults to 3000
outside supervision; in an orb use the assigned port in `.amp/dev-ports.json`.
Use printed portals for people, local URLs only for orb automation.
When `amp` is missing (for example Cursor cloud), use `npm run dev` instead of `amp orb service` commands.

Server logs: `.amp/in/server.log`; ensure logs: `.amp/in/dev-server.log`;
setup logs: `.amp/in/setup.log` (also `~/.cache/amp/logs/setup.log` when Amp runs it).
Inspect with `amp orb service status web` and `amp orb service logs web`.
After config/dependency changes: `amp orb service restart web`, then ensure again.
Do not use tmux, `nohup`, or `&` to run servers. No resume hook is needed unless
fresh-orb testing demonstrates a wake-time repair requirement.

For a production-runtime check after `npm run check`, start a supervised preview:

```bash
amp orb service start preview --command 'mkdir -p .amp/in; set -o pipefail; npm run preview -- --host 0.0.0.0 --port "$PORT" --strictPort 2>&1 | tee -a .amp/in/preview.log' --portal --title 'Production preview'
```

Run `npm run smoke -- --url <origin>` against the printed preview origin (no path)
or the deployed origin. HTTP mode also checks linked assets and a missing-route
404. If Node rejects the orb portal's certificate, use the local preview origin
and assigned port printed by `service start` for automation; never disable TLS
validation. Stop the one-off preview with `amp orb service stop preview` when done.

Before reporting a change, confirm the branch's GitHub Actions `ci` run is green
for the exact head (see **CI** above). For visitor-facing work, load Amp's
`using-agent-browser` skill, verify affected navigation and booking behavior,
and inspect screenshots at desktop and mobile widths. Save review evidence under
`.amp/in/artifacts/`; record changed interactions. Report exact commands/results
and limitations. A screenshot alone is not proof that a link or deployment works.

## Git and deployment

Commit focused pieces separately. Preserve others' edits. Agents may push
feature branches (and open or update PRs) so CI can run; never push `main`
without Carlos's say-so. Ask Carlos before merging, deploying, or changing
shared infrastructure. Before each push, run the quick check
`npm run typecheck` only (seconds); do not run the full suite in cloud — CI
is the gate (see **CI** above).
`main` push **automatically deploys** via CI; never use it as a test branch.
Do not run `wrangler deploy` locally. Roll back via an approved revert PR.

After an authorized deploy, confirm the `ci` run for the exact commit succeeded
(including its deploy step), then run `npm run smoke -- --url https://alfarolabs.com`
and `npm run smoke -- --url https://www.alfarolabs.com`. In a browser, check the
specific changed content/behavior on production too: generic smoke success alone
does not prove a particular revision is live. Report local, committed, pushed,
merged, and deployed states accurately; never equate a local preview with live.
