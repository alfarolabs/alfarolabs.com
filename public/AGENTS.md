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
- `art/pillar-sound.svg`, `art/pillar-software.svg`, and `art/pillar-console.svg`
  are the home pillar icons: 160x96 line art in white and gray only (no code
  glyphs). Their paths live in the content ledger.
  Keep artwork business-focused, without celestial or mystical ornaments.
- Public assets are served from `/` unchanged. Do not put secrets or private
  material here. Keep asset URLs in the content ledger or stylesheet as appropriate.
