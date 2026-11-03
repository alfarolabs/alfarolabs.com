# Static assets

- `brand/alfaro-labs-*.svg` are Carlos's original circle/overlapping-triangle
  vector exports, preserved byte-for-byte with their viewBoxes. Smoke pins all
  four exports, `favicon.svg`, `favicon-32.png`, and `apple-touch-icon-180.png`
  by SHA-256. Size logos with CSS, never redraw or substitute the retired slanted
  marks. Header/footer use the white logo; favicon links include PNG and adaptive
  SVG versions plus the Apple touch icon.
- Fonts are local variable WOFF2 files: Geist Sans and Geist Mono. Keep their
  `fonts/OFL-*.txt` licenses.
- `art/frontier.webp` is archived lighthouse art, not used by the dark grid theme.
- `favicon.ico` (16, 32, 48 px) is rendered from `brand/alfaro-labs-icon.svg`
  and served at the site root; smoke pins it by SHA-256 too.
- No stock icons or stock photos. `art/patchlist-project-home.webp` is a Patchlist
  screenshot from patchlist.app (Carlos's product), resized to 1600x1000.
  Carlos's own headshot and field photos go in `photos/` and are listed in the
  content ledger; the site shows no slot for them until they exist.
- Public assets are served from `/` unchanged. Do not put secrets or private
  material here. Keep asset URLs in the content ledger or stylesheet as appropriate.
