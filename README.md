# Alfaro Labs

Public site for Carlos Alfaro and Alfaro Labs Agents. TanStack Start, React and
Vite, built for Cloudflare Workers. Four routes: `/`, `/agents`, `/about`, `/contact`.

## Daily work with Amp

Describe the outcome in an Orb and leave Amp to implement and prove it. For example:
"Visitors should know which page they are on in the navigation."
Review the result, inspected screenshots or clip, and the few decisions that matter.
Then authorize the specific publication Amp proposes. You do not need to manage
agents, worktrees, or test commands. Revisions stay in the same thread.

Nothing ships merely because tests pass. See [delivery and production visibility](docs/shipping.md).
Source advice and repository-specific choices are recorded in [workflow sources](docs/workflow-sources.md).

## Reproduce the environment

Amp runs `.agents/setup` for fresh Orbs: pinned Node from `.node-version`, checksum
verification, and `npm ci`. It is safe to rerun. No secrets, database or login are
needed for local work. There is no resume hook because there is no authentication
or tunnel to repair. Services are supervised separately:

```bash
.agents/setup
amp orb services ensure
```

Use the printed authenticated portal URL; never a raw sandbox hostname. Inspect
with `amp orb service status web` / `logs web`; restart with `restart web`.
Outside an Orb, install the pinned Node, run `npm ci`, then `npm run dev` (port 3000).
The setup installer targets Linux x64 Orbs, not a personal Mac or Windows machine.

## What the checks mean

`npm run check` runs typecheck, build and the static smoke check. CI runs this one
job on PRs and `main`, with no browser matrix. On `main` only, it then runs
`npx wrangler deploy` with the `CLOUDFLARE_API_TOKEN` secret.
The smoke checks all four generated pages' required text, casing, permitted logos,
no en/em dashes, hype words or emoji, only the $850 price, and brand-phrase counts.

`npm run smoke -- --url <origin>` runs the same copy checks over HTTP, plus directly
referenced JS/CSS/logo/font assets and a missing-route 404. This does not prove
JavaScript execution, accessibility, visual layout, or performance. Amp also runs
the real local Worker and inspects affected browser flows using the repository's
`verifying-site` skill. Preview the production bundle with `npm run preview` after
building; in Orbs use the supervised preview command in that skill.

Evidence stays in the thread and `.amp/in/artifacts/` (ignored by Git). Preserve
approved public evidence when publishing a PR, with screenshots at all three
viewports. Do not put private logs or credentials in Git or public artifacts.

Only two repository skills are maintained: `verifying-site` and
`inspecting-production`. The previous pstack auto-install/model-role matrix is
removed; no remote skill code runs during setup. Existing user-managed skill
installations are not deleted. `CLAUDE.md` still points to the same `AGENTS.md`.
