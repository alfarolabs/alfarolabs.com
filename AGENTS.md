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

Squash-merge a `risk: low` or `risk: medium` pull request after a different agent reviews it and CI is green.

Do not merge a `risk: high` pull request until Carlos says to ship it.

Do not merge a pull request when CI did not run. Do not run `gh pr merge --auto`.

CI runs typecheck, the build, and one smoke test. CI does not run a browser matrix. CI does not deploy.

## Verification stills

For a user-facing pull request, embed above-the-fold viewport stills in the pull request body at widths 375, 390, 768, 1024, 1280, 1440, and 1920.

Add one full-page capture at 1440.

Set the viewport to each width. Do not scale a narrower capture.

## Do not

- Copy Dial's latte palette, cup mark, or PWA splash list.
- Add Clerk, a chat widget, or D1 until a later pull request asks for it.
- Invent client names or metrics.
- Run `wrangler deploy`.
