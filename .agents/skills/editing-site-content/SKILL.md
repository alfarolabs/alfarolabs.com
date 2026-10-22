---
name: editing-site-content
description: Updates Alfaro Labs website copy through its typed content ledger. Use when changing published text, SEO metadata, brand assets, or booking links in this repository.
---

# Editing Site Content

Keep published content in the typed ledger and preserve the site's copy and brand contracts.
All paths below are relative to the repository root.

## Trace the content before editing

1. Read `src/content/index.ts`, the affected route or component, and
   `scripts/smoke.mjs`. Find the existing `lines` entry and its `published` consumers;
   one entry may appear in multiple pages, metadata, or shared navigation.
2. Change copy in `lines`, then expose it through the appropriate `published`
   structure. Render with `.toText()`. Keep lines unique: reuse an existing entry
   for repeated copy instead of minting duplicates. Use the existing `Line.mint`
   pattern for composed text so `ownedLines()` covers the final rendered string.
3. Keep external destinations and logo selection behind the ledger's existing
   helpers. Use `Logo`, `BookingLink`, and `Placeholder` rather than bypassing them
   with raw image paths, anchors, or placeholder text.

## Preserve the current publishing rules

- Use the exact brand casing `Alfaro Labs`. Visible text must not contain emoji,
  en/em dashes, or the hype words listed in `scripts/smoke.mjs`.
- The only currently approved displayed price is `$850`. Treat a requested price
  change as a contract change, not a reason to disable the price check.
- `requiredLines()` defines required per-page text and brand phrases that may
  appear at most once across the site's pages. Inspect every consumer before
  moving or repeating those phrases.
- Original SVGs in `public/brand/` are hash-checked. Do not redraw or overwrite
  them incidentally; an intentional replacement needs explicit brand-change scope.
- Booking currently routes to `/contact`, whose booking slot is a placeholder.
  `BookingHref` currently permits only `null`. Activating booking requires a URL
  supplied by Carlos and a deliberate update to that contract, its consumer, and
  placeholder expectations. Do not invent a booking service or URL.

## Validate the published result

1. Run `npm run check`. For an intentional contract change, update the relevant
   expectations to the newly approved behavior; do not remove enforcement.
2. Start the preview with `amp orb services ensure`, or rebuild an existing one
   with `amp orb service restart preview`. Run `npm run smoke -- --url <origin>`
   against its local HTTP origin, using the port reported by the service.
3. Inspect the affected pages in the browser at desktop and mobile widths; check
   wrapping, metadata, and any changed links or booking state. Static smoke checks
   cannot verify layout or clicks. Use Amp's browser skill for browser operation.
4. Report which routes and shared consumers changed, the checks run, and any
   unresolved placeholders. Follow the approval requirements in `AGENTS.md` before publishing.
