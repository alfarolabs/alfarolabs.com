# Static assets

- `brand/*.svg` are supplied brand assets. Smoke pins all four files by SHA-256;
  do not redraw, optimize, or replace them without explicit brand-change approval.
  The marks are the twin-weight "alfaro labs" wordmark (bold alfaro, hairline
  labs, slanted) and an "a" icon. The header renders the white wordmark on the
  dark hero, the footer renders the black wordmark on cream, and the on-black
  icon is the favicon.
- Fonts are local WOFF2 files: Instrument Serif (display) and JetBrains Mono
  (labels); body text uses the system sans stack. Keep each family's
  `fonts/OFL-*.txt` license.
- `art/frontier.webp` is the commissioned lighthouse art, tinted into the dark
  hero field on every page.
- Public assets are served from `/` unchanged. Do not put secrets or private
  material here. Keep asset URLs in the content ledger or stylesheet as appropriate.
