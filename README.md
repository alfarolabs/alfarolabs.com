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

## Checks

`npm run check` runs typecheck, build and the static smoke check. The smoke check
covers all four generated pages' required text, casing, permitted logos, no en/em
dashes, hype words or emoji, only the $850 price, and brand-phrase counts.

`npm run smoke -- --url <origin>` runs the same copy checks over HTTP, plus directly
referenced JS/CSS/logo/font assets and a missing-route 404.

## Deploy

The `ci` workflow runs `npm run check` on pull requests and `main`. On `main` only,
it then runs `npx wrangler deploy` with the `CLOUDFLARE_API_TOKEN` secret, so every
merge to `main` deploys to `alfarolabs.com` and `www.alfarolabs.com`. Roll back with
a revert pull request.
