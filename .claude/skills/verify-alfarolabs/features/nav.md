# Site navigation, footer and 404

Every page shares a header with a skip link, the `Alfaro Labs` brand link to home, and the `Main` nav (`Agents`, `About`, `Book a call`), plus a footer with the wordmark, tagline, core line, and email and Instagram links. Internal navigation is client-side through the TanStack router. An unknown path returns HTTP 404 inside the same shell.

## Sub-features

- `nav-header` shows exactly three links in `nav[aria-label=Main]`, each landing on its route without a full reload.
- `nav-brand` is the header link `Alfaro Labs`, which returns to `/`.
- `nav-skip` is the first Tab stop on a fresh load, the link `Skip to content` (`href="#main"`).
- `nav-footer` shows the tagline `Alfaro Labs. We make useful things.`, a mailto link, and the wordmark image `Alfaro Labs` with `src=/brand/wordmark-white.svg`.
- `nav-404` returns HTTP 404 for an unknown path, with `Not Found` in `main` and the header and footer still rendered.

## How to get to it (user POV)

- These are present on every page.
- Press Tab once after the page loads to reach the skip link.
- Type any unknown path to reach the 404.

## Driving it with drive.mjs

Preconditions:

- `doctor.sh` exits 0.

- **Header loop.** Run `scripts/drive.mjs nav`. The journey loads `/`, saves `NN-header.aria.txt`, asserts 3 nav links, sets a marker, and clicks `Agents`, then `About`, then `Book a call`, then the brand `Alfaro Labs`, asserting each path. It then confirms the marker survived the whole loop.
- **Skip link.** It hard-loads `/`, presses `Tab`, asserts that `Skip to content` is focused, and saves `NN-skip-link-focused.png`.
- **Footer.** It asserts the tagline, the footer mailto `href`, and the wordmark `src`, and saves `NN-footer.png`.
- **404.** It loads `/__verify_missing_route__`, asserts HTTP 404, `Not Found` in `main`, and a visible nav, and saves `NN-not-found.png` and `NN-not-found.aria.txt`.
- **Proof.** `summary.json` has `ok: true`. `console.jsonl` contains only the expected 404 resource error.

## Gotchas

- Press Tab only right after a hard load. After a click, focus stays on the clicked link, and Tab moves past the skip link.
- The 404 page is the router's bare default (`Not Found` paragraph). There is no custom not-found copy to assert.
- The 404 always produces one browser console error, `Failed to load resource ... 404`. That error is expected. Any other console error is not.
