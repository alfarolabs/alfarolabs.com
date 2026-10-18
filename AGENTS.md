# Alfaro Labs site

Public hire site for Carlos Alfaro at `alfarolabs.com` and `www.alfarolabs.com`.
TanStack Start / React / Vite on Cloudflare Workers. Copy lives in `src/content`,
routes in `src/routes`, shared UI in `src/components`, styles in `src/styles`.

## Own the outcome

Take the user's outcome through implementation and convincing proof in this thread.
Make reversible decisions yourself; ask only for missing product decisions or approval.
Keep implementation, debugging, and verification with the same checkout. Independent
outcomes belong in independent Orbs, not shared worktrees or mandatory agent panels.
Do not split one task into planning, coding, and testing threads. The user reviews
results, not agent coordination. Use the configured model; no model-role matrix.

## Run and prove

- Fresh Orb: executable `.agents/setup` installs the pinned Node and lockfile dependencies.
  No application secrets, database, or login are needed. Rerun setup if dependencies change.
- Preview: `amp orb services ensure` starts the supervised Vite/Worker dev server.
  Share its returned portal URL. Inspect with `amp orb service logs web`.
- Baseline checks: `npm run check` (types, build, four-page static copy smoke).
  This is cheap CI, **not** browser or production proof.
- Load `.agents/skills/verifying-site/SKILL.md` for changes to application behavior,
  rendering, build tooling, or setup. Reproduce bugs before fixing them; test a
  meaningful boundary and an unchanged control through the real stack.
- Keep inspected screenshots, clips, and concise results in `.amp/in/artifacts/`.
  Report the tested revision, commands, decisive observations, and limitations.
  Review load-bearing decisions, not a transcript of routine steps.

## Approval and delivery

Commit locally when the outcome is ready. Never push `main`. Before publication,
read `docs/shipping.md` and request approval naming the repository, branch, PR target,
and any automatic deployment effects. Push, PR creation, merge, deploy, production
writes, access changes, and recurring monitoring each require explicit authorization.
Do not run `wrangler deploy` from a local machine or an Orb, bypass protections, or use `gh pr merge --auto`.
Label authorized PRs `risk: low`, `risk: medium`, or `risk: high`; require green CI
for the exact head and obey actual branch rules. No automatic low-risk merge.
Distinguish **local / committed / pushed / merged / deployed / production-verified**.
Use `.agents/skills/inspecting-production/SKILL.md` for deployment or health questions.

## Deploy

Every merge to `main` deploys to production, so approval to merge is approval to deploy.
The `ci` workflow runs `npx wrangler deploy` after `npm run check` passes on `main`;
pull requests and other branches never deploy. The Worker serves `alfarolabs.com` and
`www.alfarolabs.com`. After a merge, watch the `ci` run on `main` with `gh run watch`,
then load `https://alfarolabs.com` and check the change is live. Roll back with a revert
pull request; it deploys when it lands. Redeploy `main` without a change with
`gh workflow run ci --ref main`.

## Preserve

- Do not invent clients, proof, metrics, booking URLs, or completed integrations.
  Booking remains a visible placeholder until Carlos supplies a real URL.
- Preserve the copy and logo constraints checked by `scripts/smoke.mjs`; do not
  weaken a check just to pass. Do not copy Dial's latte palette, cup mark, or splash list.
- No Clerk, chat widget, or D1 without a later explicit request. Preserve existing data.
- Never print tokens, credentials, environment dumps, or raw private logs. Use Amp's
  private secret input or OAuth; request only scoped read access for inspection.
  Never snapshot authentication in setup or send secrets to another Orb.
- Add a narrowly scoped, default-off flag only for an explicitly approved production
  trial; include removal and rollback conditions. Do not add a flag framework preemptively.
