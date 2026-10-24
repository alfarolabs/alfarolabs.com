# Alfaro Labs

Public site for Carlos Alfaro and Alfaro Labs Agents. TanStack Start, React and
Vite, built for Cloudflare Workers. Five routes: `/`, `/manifesto`, `/agents`,
`/about`, `/contact`.

## Development

Install the Node version in `.node-version`, then:

```bash
npm ci
npm run dev        # http://localhost:3000
```

Preview the production bundle with `npm run build && npm run preview`.

## Amp orbs

`.agents/setup` installs the pinned Node version and locked npm dependencies for
a fresh orb, prepares Chrome, links Node/npm/npx into `/usr/local/bin`, and writes
orb guidance without overwriting personal instructions. It starts no services.
This site needs no database, seed data, authentication, or resume-time repair.

Start or reuse the supervised development server and get its portal URL:

```bash
.agents/skills/dev-server/ensure-dev-server.sh
```

The script uses `amp orb services ensure` with `.amp/services.yaml`, serves Vite
with the Cloudflare plugin on an assigned port, and checks `/` before reporting
ready. It writes `.amp/dev-ports.json` and logs to `.amp/in/`. Repeating ensure
reuses the healthy service; an unresponsive service is restarted once. Source
changes hot reload. After configuration or dependency changes:

```bash
amp orb service restart web
.agents/skills/dev-server/ensure-dev-server.sh
```

Inspect it with `amp orb service status web` and `amp orb service logs web`.
Use the portal URL printed by Amp, not a sandbox-local URL. The root `AGENTS.md`
also documents a supervised production-bundle preview. See Amp's
[orb workflow](https://ampcode.com/notes/putting-an-agent-in-an-orb) and
[service documentation](https://ampcode.com/docs/orbs/portals).

## Agent guidance

`AGENTS.md` contains repository-wide commands, code ownership, verification, and
publishing rules. The project skill in
`.agents/skills/dev-server/SKILL.md` covers starting and repairing the server.
Subtree `AGENTS.md` files and glob-scoped `docs/agents/*.md` cover code, content,
brand assets, and test conventions.

Keep reusable task instructions in `.agents/skills/` and always-needed guidance
in `AGENTS.md`. No custom MCP servers, plugins, or workspace settings overrides
are required. Use Amp's official skills for general browser and orb workflows.
Local review artifacts under `.amp/in/` and generated portal metadata stay out of Git.

## Checks

`npm run check` runs typecheck, build, the static smoke check, and
`npm run smoke:preview`, which serves the build in workerd on a free local port
and runs the HTTP smoke against it. It reproduces the CI gate. The smoke check
covers all five generated pages' required text, casing, permitted logos, no en/em
dashes, hype words or emoji, only the $850 price, and brand-phrase counts.

`npm run smoke -- --url <origin>` runs the same copy checks over HTTP, plus directly
referenced JS/CSS/logo/font assets and a missing-route 404.

Copy belongs in `src/content/index.ts`; the smoke check rejects visible page text
outside that ledger. Booking stays a placeholder until Carlos supplies a URL.

Static checks do not verify layout or clicks. For visitor-facing changes, use the
production preview in a real browser: follow the affected navigation or booking
links, check the resulting URL and content, and inspect screenshots at desktop
and mobile widths. Save review screenshots and recordings in `.amp/in/artifacts/`.

## Deploy

The `ci` workflow runs the same checks as `npm run check` on pull requests and `main`,
in two parallel jobs: `typecheck`, and `build` (build, static smoke, preview smoke).
On `main` only, a `deploy` job waits for both, downloads the exact `dist/` that
`build` tested, and runs `npx wrangler deploy` with the `CLOUDFLARE_API_TOKEN` secret, so every
merge to `main` deploys to `alfarolabs.com` and `www.alfarolabs.com`. Roll back with
a revert pull request.

Agents may push feature branches for CI; never push `main` without Carlos's
say-so. Ask Carlos before merging or deploying. Do not deploy directly from a
checkout.
