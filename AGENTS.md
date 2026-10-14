# Alfaro Labs site

Public hire site for Carlos Alfaro. Domain `alfarolabs.com`.

## How to work

Read and follow `.agents/skills/poteto-mode/SKILL.md` at the start of every coding task.

Begin every worker prompt with `/poteto-mode`.

Use poteto-mode for every task it fits. The skill does not appear in the skill menu. Read the file.

Cursor cloud agents run `bash scripts/link-pstack.sh` from the environment install. The script sparse-clones the `pstack` plugin from `https://github.com/cursor/plugins`. It links each skill into `.cursor/skills`, `.agents/skills`, and `.claude/skills`. Claude Code, Codex, and Grok Build install the same plugin themselves. Do not vendor pstack or add it as a submodule.

Run `bash scripts/link-pstack.sh` when `.agents/skills/poteto-mode/SKILL.md` is missing.

## Stack

TanStack Start on Cloudflare Workers.

```
npm run dev
npm run typecheck
npm run build
npm run preview
npm run smoke
```

## Pull requests

Never push `main`.

Label each pull request `risk: low`, `risk: medium`, or `risk: high`.

Land a `risk: low` or `risk: medium` pull request yourself. Follow the alfaro-mode Shipping playbook. A different agent verifies the change and posts `PASS` or `PASS+NOTES` on the pull request. CI must be green. Then squash-merge it with `gh pr merge <number> --squash`.

Do not merge a `risk: high` pull request until Carlos says to ship it.

Do not merge a pull request when CI did not run. Do not run `gh pr merge --auto`.

CI runs typecheck, the build, and one smoke test. CI does not run a browser matrix.

## Deploy

Every merge to `main` deploys to production. The `ci` workflow runs `wrangler deploy` after its checks pass on `main`. The Worker serves `alfarolabs.com` and `www.alfarolabs.com`.

After you merge, watch the `ci` run on `main` with `gh run watch`. Then load `https://alfarolabs.com` and check the change is live.

To roll back, open a pull request that reverts the bad change. It deploys when it lands.

To redeploy `main` without a change, run `gh workflow run ci --ref main`.

## Verification stills

For a UI pull request, capture each changed screen as a real viewport screenshot. Set `fullPage` to false.

Use these viewports:

- Desktop is 1440x900.
- Tablet is 834x1194.
- Phone is 390x844.

Capture one image for each changed screen at each size.

Name each file `<screen>-<desktop|tablet|phone>.png`. The home screen files are `home-desktop.png`, `home-tablet.png`, and `home-phone.png`.

Before you embed a still, check it for a blank page or an error page.

Embed the stills in the pull request body as a markdown table. Each row is one screen. The columns are desktop, tablet, and phone.

Do not capture a full-page strip. Do not scale a narrower capture.

## Do not

- Copy Dial's latte palette, cup mark, or PWA splash list.
- Add Clerk, a chat widget, or D1 until a later pull request asks for it.
- Invent client names or metrics.
- Run `wrangler deploy` from a local machine. Production deploys come only from CI on `main`.
