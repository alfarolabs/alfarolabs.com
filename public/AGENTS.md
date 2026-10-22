# Static assets

- `brand/*.svg` are supplied brand assets. Smoke pins all four files by SHA-256;
  do not redraw, optimize, or replace them without explicit brand-change approval.
  The marks are the twin-weight "alfaro labs" wordmark (bold alfaro, hairline
  labs, slanted) and an "a" icon. The header and footer render the white
  wordmark; the on-black icon is the favicon.
- Fonts are local WOFF2 files: Instrument Serif (display), Newsreader (text),
  and JetBrains Mono (labels). Keep each family's `fonts/OFL-*.txt` license.
- `art/frontier.webp` is the commissioned hero painting; `art/frontier-pixels.png`
  is a 56px-wide downscale of it used for the pixel-mosaic reveal. Regenerate
  both together if the art changes.
- Public assets are served from `/` unchanged. Do not put secrets or private
  material here. Keep asset URLs in the content ledger or stylesheet as appropriate.
