---
name: verify-alfarolabs
description: Launch the alfarolabs.com site (TanStack Start on the Cloudflare workerd runtime via vite preview) on an isolated port and drive its web UI in headless Chromium with Playwright, capturing screenshots, ARIA snapshots and step logs. Use to prove a change to the home page, agent-run card, /agents pricing, /about, /contact booking path, header/footer navigation or 404 works in the real built site, not just in `npm run check`.
---

# Verify alfarolabs.com

The site is a static-content marketing site: four prerendered routes (`/`, `/agents`, `/about`, `/contact`) served by a Cloudflare Worker. There are no forms, no auth, no data store. The user surface is the browser: reading pages and following links (header nav, the `Book a call` buttons, in-page text links). Verification means building the production bundle, serving it with the Workers runtime, and clicking through it in a real browser.

All helpers live in `.claude/skills/verify-alfarolabs/scripts/` and are run from the repo root. Set `S=.claude/skills/verify-alfarolabs/scripts` for the commands below.

## Launch

```bash
S=.claude/skills/verify-alfarolabs/scripts
$S/launch.sh              # npm ci if needed, npm run build, then serve dist/ with vite preview
$S/launch.sh --no-build   # reuse the existing dist/ (only if doctor says it is fresh)
VERIFY_PORT=4800 $S/launch.sh   # require an exact port
```

- Runs `./node_modules/.bin/vite preview --host 127.0.0.1 --port <port> --strictPort` under `setsid`, so it gets its own process group. It does not use `npm run preview`, because that script pins port 4173.
- The port is the first free one from **4791** upward, so it never collides with a user's `npm run dev` (3000) or `npm run preview` (4173).
- **Ready** means `GET /` returns HTML containing `AI agents for live production.`, which is the home h1. Launch polls for up to 30 s and prints `launch: ready at http://127.0.0.1:<port> (pgid <n>, log <path>)`.
- State (pgid, port, URL, git HEAD, build time) goes in `/tmp/verify-alfarolabs/state/<checkout-id>/instance.env`. The id is a sha1 of the repo root, so each worktree has its own instance. The server log is `server.log` next to it, and the build log is `build.log`.
- Launch refuses to start a second instance for the same checkout. Run doctor or cleanup first.
- There is no seed data. The content is compiled from `src/content/*.ts`, so an empty state is the only state.
- The dev server (`npm run dev`) is not used for verification. Preview runs the prerendered production bundle in workerd, which is what Cloudflare serves.

## Doctor

```bash
$S/doctor.sh          # read-only health check, exit 0 = drive it
$S/doctor.sh --smoke  # also runs `npm run smoke -- --url <instance>` (copy rules, assets, 404)
```

Checks: the process group is alive, the port's listener belongs to our process group (not someone else's server), `GET /` returns 200 with the hero text, HEAD has not moved since launch, and no file in `src/` or `public/` is newer than `dist/client/index.html`. If the last check fails, relaunch so the build picks up the edits. Run doctor first whenever a drive result looks wrong.

## Drive

```bash
$S/drive.mjs --list               # home, agents, about, contact, nav
$S/drive.mjs home                 # one journey; URL comes from the launched instance
$S/drive.mjs agents --url http://127.0.0.1:4791 --out /tmp/verify-alfarolabs/runs/my-run
$S/drive.mjs --steps /tmp/my-steps.json   # ad-hoc step list, same step shapes as the journeys
$S/drive.mjs nav --headed         # watch it (needs a display)
```

Each journey corresponds to one file in `features/`. The journey arrays are at the top of `drive.mjs`, and they are the source for the exact steps. A step is one of:

| `do` | fields | meaning |
| --- | --- | --- |
| `goto` | `path`, `status?` (default 200) | hard load, waits for network idle, asserts the HTTP status |
| `click` | `target` | real click; the first match if several match and no `nth` is given |
| `press` | `key` | keyboard press |
| `expectUrl` | `path` | pathname matches, ignoring a trailing slash |
| `expectTitle` | `text` | `document.title`, polled for up to 5 s |
| `expectVisible` / `expectCount` / `expectText` / `expectAttr` / `expectFocused` | `target`, plus `count` / `text` / `attr`+`value` | DOM assertions; `expectText` uses textContent, so CSS uppercase is ignored |
| `mark` / `expectMark` | `note?` | sets a `window` marker and later asserts it survived, which proves the navigation was client-side (no full reload) |
| `shot` | `name`, `target?`, `fullPage?` | PNG of an element or the page |
| `aria` | `name`, `target?` | Playwright ARIA snapshot (YAML text) |

A target is `{ within?, role, name, level?, nth? }` (accessible role and exact accessible name) or `{ within?, css, nth? }`. `within` is one of `header` (`.site-header`), `nav` (`nav[aria-label='Main']`), `main`, `footer`, or a CSS selector. Prefer role and name. Use CSS only for the stable handles the markup exposes: `.run-step[data-state=done|waiting]`, `.run-approve`, `.placeholder[data-kind=screenshot|photo|link]`, `.pilot .price`, `.hero-copy a.button`.

**Ambiguity to know:** the accessible name `Book a call` matches both the header nav link and every in-page booking button. Always scope it with `within: "nav"` or `within: "main"`.

**Playwright resolution.** Playwright is not a project dependency. Do not add it to package.json. `drive.mjs` imports it from `$PLAYWRIGHT_MODULE` if set, otherwise from `$(mise where npm:playwright)/node_modules/playwright/index.mjs`. That is where `~/.local/bin/playwright` (a mise shim) installs it; running `playwright --version` once installs it if missing. As a last resort it uses a plain `import("playwright")`. For the browser it uses Playwright's expected Chromium if present. Otherwise it uses the newest `~/.cache/ms-playwright/chromium_headless_shell-*` and then `/usr/bin/chromium`. `$VERIFY_CHROMIUM` overrides all of these. The executable it chose is recorded in the `start` line of `log.jsonl`.

## Evidence

Every drive writes to **`/tmp/verify-alfarolabs/runs/<UTC timestamp>-<journey>/`** (or `--out`):

- `log.jsonl`: a `start` line (origin, Playwright path, browser executable and version), then one line per step with `ok`, `detail` and the URL after the step.
- `summary.json`: `ok`, passed/total, the failed step and its error.
- `NN-<name>.png` and `NN-<name>.aria.txt`: screenshots and ARIA snapshots, numbered in step order. A failure adds `NN-failure.png` (full page).
- `console.jsonl` (only if something happened): browser console errors and warnings, page errors, failed requests, and HTTP responses of 400 or above. Any uncaught page error fails the run even if every step passed. The 404 journey always logs one expected `404 (Not Found)` console line.
- `drive.mjs` exits with 0 only if every step passed.

Proof standards for this app:

- Drive the real user path. Click the header link or button the user would click. Don't `goto` the destination and call the link verified. Use `goto` only for entry points (a typed URL, a bookmark, the 404 probe).
- Capture the action and the result. The step log records each click with its `href` and the resulting path. Pair it with the screenshot or ARIA snapshot of the landing state.
- For navigation, prove it with `mark`/`expectMark`. A link that does a full reload still "works", but it means the client router or hydration is broken.
- The only side effects are HTTP responses. `doctor.sh --smoke` covers asset delivery and the 404 status. There is nothing to check in a store.
- No mocks. The external links (Instagram, mailto) are asserted by `href` and never followed.

The evidence root is outside the repo and outside the state dir, and cleanup never deletes it. `/tmp` is cleared on reboot, so copy a run elsewhere if it must outlive the machine session.

## Cleanup

```bash
$S/cleanup.sh
```

Sends SIGTERM to the recorded process group (npm, vite, workerd), escalates to SIGKILL after 5 s, confirms the port is free, then deletes `/tmp/verify-alfarolabs/state/<checkout-id>/`. It never kills by process name, never touches another checkout's instance, and never deletes `/tmp/verify-alfarolabs/runs/`. It lists the newest runs it kept. Run it after every attempt, including failed ones. `dist/` is left in place; it is gitignored build output that `npm run build` also produces.

## Environment notes

- `.node-version` pins Node **22.23.3**, but it is not installed under mise (only 24.21.0 and 26.8.1). Verification was proven on Node **26.8.1** (npm 11.19.0): `npm ci`, `npm run check` and preview all work. CI may use 22. If behavior differs between versions, say so instead of assuming.
- npm 11 skips install scripts that are not allowlisted (`esbuild`, `workerd` postinstall). The build and workerd preview work anyway because the platform binaries come from optional dependencies. If preview fails with a missing workerd binary, run `npm install-scripts approve workerd` (this changes package.json, so ask first).
- At launch the Cloudflare plugin prints a "Local Explorer API" banner into `server.log`. That is informational and not an error.

## Feature map

`features/README.md` indexes the user-facing features. Each file there gives the user entry points, the journey that drives them, and the observable end state. A proof that drives only one entry point of a feature that lists several is incomplete. To keep the map honest as the app changes, use `/pstack:maintain-verification-skill`.
