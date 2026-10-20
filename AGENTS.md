# Alfaro Labs

Public site for Carlos Alfaro. TanStack Start on Cloudflare Workers. Copy is in `src/content`.

## Checks

`npm run check` runs typecheck, the production build, and `scripts/smoke.mjs`.
`.github/workflows/ci.yml` runs that job on pull requests and on `main`.
Smoke owns required page copy, brand casing, logo paths, dash characters, hype words, emoji, and the single $850 price.
Do not change `scripts/smoke.mjs` so a failing page passes.
`npm run check` does not prove clicks, layout, or production health.
For a change a visitor can see or follow, use `.claude/skills/verify-alfarolabs/SKILL.md`.

## Publication

Read the Deploy section of `README.md` before publishing.
A merge to `main` deploys `alfarolabs.com` and `www.alfarolabs.com`.
Ask before pushing, opening a pull request, merging, or deploying.
Name the repository, the branch, the pull request target, and that the merge deploys.
Do not run `wrangler deploy` from a checkout, and do not use `gh pr merge --auto`.
Roll back with a revert pull request.
On an authorized pull request, set one of `risk: low`, `risk: medium`, or `risk: high`.
Call the work local, committed, pushed, merged, deployed, or production-verified only after you have checked that state.

## Copy and scope

Do not invent clients, metrics, testimonials, proof, or a booking URL.
Leave `BookingHref` null in `src/content/index.ts` until Carlos supplies a URL.
Do not add Clerk, a chat widget, or D1 unless Carlos asks.
Do not bring back a latte palette, cup mark, or splash list.
Do not print tokens, credentials, or private logs.

## Pstack

Pstack skills come from the installed plugin. This repo does not include the plugin.
Cursor reads `.cursor/rules/pstack-models.mdc`.
Claude Code and Grok Build read `.claude/rules/pstack-models.md`.
If a skill looks for the home-directory copy and that file is missing, use the project file.
