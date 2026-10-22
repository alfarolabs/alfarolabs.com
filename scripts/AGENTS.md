# Smoke suite

`smoke.mjs` uses Node's built-ins and imports the TS ledger directly, requiring
the Node version in `.node-version`. There is no test framework or extra install.

- Static mode requires `npm run build` first; `npm run check` orders this correctly.
- HTTP mode accepts only an HTTP(S) origin via `--url`; it checks all four pages,
  directly linked JS/CSS/SVG/font assets, and a deliberate missing-route 404.
- Keep visible-copy and brand/hash checks meaningful. Do not loosen them for
  incidental failures, silently skip a page, or add implementation-only tests.
- This suite cannot verify layout, client navigation, or hydration; use a browser
  for those. Keep failures actionable and exit nonzero on a failed contract.
