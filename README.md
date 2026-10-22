# Alfaro Labs

Public site for Carlos Alfaro and Alfaro Labs Agents. TanStack Start, React and
Vite, built for Cloudflare Workers. Four routes: `/`, `/agents`, `/about`, `/contact`.

## Development

Install the Node version in `.node-version`, then:

```bash
npm ci
npm run dev        # http://localhost:3000
```

Preview the production bundle with `npm run build && npm run preview`.

## Amp orbs

`.agents/setup` installs the pinned Node version and locked npm dependencies for
a fresh orb. `.agents/resume` keeps the repository's Node login hook after Amp's
environment loading so new agent and service shells use the pinned version. It
does not install dependencies. This site needs no database, seed data, or authentication.

Start the supervised production preview and get its portal URL:

```bash
amp orb services ensure
```

`.amp/services.yaml` builds the site, serves it through the Cloudflare Workers
runtime on an assigned port, and checks `/` before reporting ready. Repeating
ensure reuses the running service. After source changes, rebuild and restart it:

```bash
amp orb service restart preview
```

Inspect it with `amp orb service status preview` and `amp orb service logs preview`.
Use the portal URL printed by Amp, not a sandbox-local URL. See Amp's
[orb workflow](https://ampcode.com/notes/putting-an-agent-in-an-orb) and
[service documentation](https://ampcode.com/docs/orbs/portals).

## Agent guidance

`AGENTS.md` contains repository-wide commands, code ownership, verification, and
publishing rules. The project skill in
`.agents/skills/editing-site-content/SKILL.md` covers the typed content ledger,
brand constraints, and booking placeholders; Amp loads it for those tasks.

Keep reusable task instructions in `.agents/skills/` and always-needed guidance
in `AGENTS.md`. No custom MCP servers, plugins, or workspace settings overrides
are required. Use Amp's official skills for general browser and orb workflows.
Local review artifacts under `.amp/in/` and generated portal metadata stay out of Git.

## Checks

`npm run check` runs typecheck, build and the static smoke check. The smoke check
covers all four generated pages' required text, casing, permitted logos, no en/em
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

The `ci` workflow runs `npm run check` on pull requests and `main`. On `main` only,
it then runs `npx wrangler deploy` with the `CLOUDFLARE_API_TOKEN` secret, so every
merge to `main` deploys to `alfarolabs.com` and `www.alfarolabs.com`. Roll back with
a revert pull request.

Publishing requires Carlos's approval before pushing, opening a pull request,
merging, or deploying. Do not deploy directly from a checkout.
