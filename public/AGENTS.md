# Static assets

- `brand/*.svg` are supplied brand assets. Smoke pins all four files by SHA-256;
  do not redraw, optimize, or replace them without explicit brand-change approval.
  The marks are the twin-weight "alfaro labs" wordmark (bold alfaro, hairline
  labs, slanted) and an "a" icon. The header and footer render the white
  wordmark on midnight; the on-black icon is the favicon.
- Fonts are local WOFF2 files: Instrument Serif (display), Newsreader (text),
  and JetBrains Mono (small figures). Keep each family's `fonts/OFL-*.txt`
  license.
- `art/frontier.webp` is the commissioned lighthouse art, shown full bleed
  in the hero of every page and in the home booking panel.
- Public assets are served from `/` unchanged. Do not put secrets or private
  material here. Keep asset URLs in the content ledger or stylesheet as appropriate.
