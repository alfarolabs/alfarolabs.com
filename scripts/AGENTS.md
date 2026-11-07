# Smoke suite

`smoke.mjs` uses Node's built-ins and imports the TS ledger directly, requiring
the Node version in `.node-version`. There is no test framework or extra install.

- Static mode requires `npm run build` first; `npm run check` orders this correctly.
- HTTP mode accepts only an HTTP(S) origin via `--url`; it checks all five pages,
  permanent redirects, retired brand 404s, directly linked JS/CSS/SVG/font assets,
  a deliberate missing-route 404, page security headers from `public/_headers`,
  a 404 for `/AGENTS.md`, and that `//host` paths never redirect off-site.
- `preview-smoke.mjs` (`npm run smoke:preview`, after build) runs HTTP mode
  against `vite preview` on a free local port and stops the preview afterwards.
- Keep visible-copy and brand/hash checks meaningful. Do not loosen them for
  incidental failures, silently skip a page, or add implementation-only tests.
- This suite cannot verify layout, client navigation, or hydration; use a browser
  for those. Keep failures actionable and exit nonzero on a failed contract.
