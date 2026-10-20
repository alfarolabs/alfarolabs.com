---
name: closed-copy
description: Check that every visible sentence on the four prerendered Alfaro Labs pages is owned by the copy ledger. Use when editing src/routes, src/content, src/components, or scripts/smoke.mjs.
---

# Closed copy

Every visible text node on `/`, `/agents`, `/about`, and `/contact` is a string the ledger owns, or a join the ledger exports. A sentence typed only into a route fails the check.

## Run

From the repo root:

```bash
npm run build && npm run smoke
```

`scripts/smoke.mjs` removes every string from `ownedLines()` using the same visible-text extraction as the other smoke scans. Exit 0 means nothing remains. A failure line that starts with `uncovered copy` names the leftover.

## Scope

The check reads the HTML that `vite build` writes for those four routes. It does not cover CSS, screenshots, or text that appears only in the browser after load. This site has no client data. The router's `Not Found` text is on the missing route, which is outside the four pages.

The first run left no framework strings, so the check has no allowlist.

## Files

- `src/content/index.ts` owns the sentences through `ownedLines()`, `requiredLines()`, and `published`.
- `scripts/smoke.mjs` runs the coverage pass.
- `src/routes/*.tsx` render `toText()` and must not add a raw sentence.

## Sync

Confirmed at commit `8e21e639a2c2ba3e108d41db3a44fc8ff8efe7c2`.

If `src/content/index.ts` or `scripts/smoke.mjs` changes after that commit, run the check again. Move the commit above forward only after you confirm the check still describes the code.

## When it fails

The leftover is a sentence in a route or a component. Add it to the ledger, or delete it. Do not add route copy to an allowlist. An allowlist is only for text the framework emits that no route authored.

To see the check fail, add a paragraph `Acme Tours saved 40 hours a week.` inside the home route, run the command, and confirm the `uncovered copy` line. Remove that paragraph before you commit.
