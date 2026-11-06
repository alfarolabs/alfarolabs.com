# Published content ledger

- `index.ts` owns every visible line, metadata string, accessibility label,
  external link, and permitted logo path. Add copy through `mintAll`; consumers
  use `published` and `.toText()`. Do not bypass the types with casts/raw strings.
- Duplicate literal lines are rejected; reuse the existing line instead.
- Contact buttons use Carlos's existing email. Never invent a booking URL or a
  scheduling destination.
- Smoke enforces exact `Alfaro Labs` casing, no en/em dashes, emoji or hype words,
  no pricing or commission copy, and at most one occurrence of each constrained brand phrase
  across the site. Read the checks before changing copy; do not relax them just
  to turn a failure green.
- `requiredLines()` and `ownedLines()` feed smoke. New contract assertions should
  also have independent expected results where deriving them here could hide a bug.
- Voice is first person (Carlos). Headlines have no trailing period, and a line
  is said once: smoke rejects a repeated sentence on a page. Say "software",
  never "SaaS". The CTA is "Get in touch" (Carlos's email).
- Violet Audio appears only in its `dealers` entry on `/hardware` and in Home's
  Hardware row (dMix 128 photo and Gold Dealer line); the hero, lede, footer,
  and Home metadata stay brand-neutral. Carlos
  is a Violet Audio Gold Dealer (his own statement). Add new dealer brands to
  `dealers`, describing products only with what the brand's own site says.
