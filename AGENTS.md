# Alfaro Labs site

Public hire site for Carlos Alfaro. Domain `alfarolabs.com`.

## How to work

Full poteto-mode is only for the hardest tasks that need the most rigor. Read and follow `.agents/skills/poteto-mode/SKILL.md` for those tasks. Lighter work (docs, small fixes, deps, chores) skips it. The skill does not appear in the skill menu.

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

Squash-merge a `risk: low` or `risk: medium` pull request after a different agent reviews it and CI is green.

Do not merge a `risk: high` pull request until Carlos says to ship it.

Do not merge a pull request when CI did not run. Do not run `gh pr merge --auto`.

CI runs typecheck, the build, and one smoke test. CI does not run a browser matrix. CI does not deploy.

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
- Run `wrangler deploy`.
