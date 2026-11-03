# Static assets

- `brand/alfaro-labs-logo.svg` and `brand/alfaro-labs-icon.svg` are Carlos's
  original vector logo: a black circle with overlapping white triangles. Keep
  them byte-for-byte and never invert the mark (no white circle with black
  triangles). The light theme shows the original logo. `alfaro-labs-logo-dark.svg`
  is the same file with a thin white ring around the disc and a white wordmark,
  for the dark theme. `favicon.svg` is a copy of the original icon, and
  `apple-touch-icon-180.png` renders it on white. Smoke pins all of them by
  SHA-256. Size logos with CSS; never redraw or substitute the retired slanted marks.
- Fonts are local variable WOFF2 files: Geist Sans and Geist Mono. Keep their
  `fonts/OFL-*.txt` licenses.
- `art/frontier.webp` is archived lighthouse art, not used by the dark grid theme.
- `favicon.ico` (16, 32, 48 px) is rendered from `brand/alfaro-labs-icon.svg`
  and served at the site root; smoke pins it by SHA-256 too.
- No stock icons or stock photos. `art/patchlist-project-home-{light,dark}.webp`
  are Patchlist screenshots from patchlist.app (Carlos's product), 1600x1000,
  shown to match the visitor's color scheme.
  Carlos's own headshot and field photos go in `photos/` and are listed in the
  content ledger; the site shows no slot for them until they exist.
- Public assets are served from `/` unchanged. Do not put secrets or private
  material here. Keep asset URLs in the content ledger or stylesheet as appropriate.
