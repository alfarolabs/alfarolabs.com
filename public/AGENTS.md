# Static assets

- `brand/*.svg` are supplied brand assets. Smoke pins all four files by SHA-256;
  do not redraw, optimize, or replace them without explicit brand-change approval.
  The site currently renders the white wordmark and on-black icon.
- Fonts are local Montserrat WOFF2 files; preserve `fonts/OFL.txt` licensing.
- Public assets are served from `/` unchanged. Do not put secrets or private
  material here. Keep asset URLs in the content ledger or stylesheet as appropriate.
