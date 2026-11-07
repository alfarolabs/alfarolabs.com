# Static assets

- `brand/alfaro-labs-logo.svg` and `brand/alfaro-labs-icon.svg` are Carlos's
  original vector logo: a black circle with overlapping white triangles. Keep
  them byte-for-byte and use them unchanged in both themes: never invert,
  recolor, or add a ring. In the dark theme CSS places the logo on a white tile.
  `favicon.svg` is a copy of the original icon, and `apple-touch-icon-180.png`
  renders it on white. Smoke pins them by SHA-256. Size logos with CSS; never
  redraw or substitute the retired slanted marks.
- Fonts are local variable WOFF2 files: Geist Sans and Geist Mono. Keep their
  `fonts/OFL-*.txt` licenses.
- `art/frontier.webp` is archived lighthouse art, not used by the dark grid theme.
- `favicon.ico` (16, 32, 48 px) is rendered from `brand/alfaro-labs-icon.svg`
  and served at the site root; smoke pins it by SHA-256 too.
- No stock icons or stock photos. `art/patchlist-project-home-{light,dark}.webp`
  are Patchlist screenshots from patchlist.app (Carlos's product), 1600x1000,
  shown to match the visitor's color scheme.
  `art/gearmind-project-{light,dark}.webp` are Gearmind captures (Carlos's
  product) of a seeded demo project from the Gearmind repo's `pnpm db:seed`
  data, at a 1600x1000 viewport, 3x, resized to 1600x1000.
  `art/violet-*.webp` are Violet Audio product photos copied unchanged from
  violetaudio.com (the largest the site serves, up to 1920px), used because
  Carlos is a Violet Audio Gold Dealer. Replace them with press-kit originals
  when Violet Audio supplies them.
  Carlos's own headshot and field photos go in `photos/` and are listed in the
  content ledger; the site shows no slot for them until they exist.
- Public assets are served from `/` unchanged. Do not put secrets or private
  material here. Keep asset URLs in the content ledger or stylesheet as appropriate.
- `.assetsignore` keeps this guidance file off the site; list any other
  non-asset file you add here. `_headers` sets the security headers on every
  asset and page (Worker-rendered 404s and redirects do not get them).
