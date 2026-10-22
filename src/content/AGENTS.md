# Published content ledger

- `index.ts` owns every visible line, metadata string, accessibility label,
  external link, and permitted logo path. Add copy through `mintAll`; consumers
  use `published` and `.toText()`. Do not bypass the types with casts/raw strings.
- Duplicate literal lines are rejected; reuse the existing line instead.
- `BookingHref` intentionally permits only `null`. Keep booking as a placeholder
  until Carlos supplies and authorizes a real destination.
- Smoke enforces exact `Alfaro Labs` casing, no en/em dashes, emoji or hype words,
  only the $850 price, and at most one occurrence of each constrained brand phrase
  across the site. Read the checks before changing copy; do not relax them just
  to turn a failure green.
- `requiredLines()` and `ownedLines()` feed smoke. New contract assertions should
  also have independent expected results where deriving them here could hide a bug.
