# alfarolabs.com verification map

This directory is the maintained source for verifying the user-facing behavior of alfarolabs.com. Read this index before driving the site, then use the matching feature file as the recipe. Each feature has a journey with the same name in `../scripts/drive.mjs`.

## Baseline preconditions

- Launch with `.claude/skills/verify-alfarolabs/scripts/launch.sh`. It builds and serves the production bundle at `http://127.0.0.1:<port>`, with the port at 4791 or higher.
- `doctor.sh` exits 0. That means our process group owns the port, HEAD is unchanged, and `dist/` is newer than `src/` and `public/`.
- `BookingHref` in `src/content/index.ts` is `null`. In-page booking buttons link to `/contact`. The contact hero renders the booking placeholder.
- Never drive an instance that this verification run did not start. In particular, never drive a user's server on 3000 or 4173.

## Driving conventions

- Run journeys with `scripts/drive.mjs <journey>`. For ad-hoc checks, use `scripts/drive.mjs --steps <file.json>` with the same step shapes.
- Prefer ARIA roles and exact accessible names. Use the data attributes (`data-state`, `data-kind`) only where the markup offers no role.
- Scope `Book a call` with `within: "nav"` or `within: "main"`, because that name appears in both places.
- Reach a page by clicking what the user clicks. Use `goto` only for typed URLs and the 404 probe.
- Assert copy with textContent (as `expectText` does). Eyebrows and labels are uppercased by CSS.

## Proof and skip reporting

- Capture the user action (the step log records the clicked `href`) and the resulting state (a screenshot or ARIA snapshot of the landing page).
- Prove that internal navigation is client-side with `mark`/`expectMark`.
- Back copy-rule claims (dashes, hype words, price, brand casing) with `doctor.sh --smoke`, not with screenshots.
- Record the journey name and the evidence dir (`/tmp/verify-alfarolabs/runs/<ts>-<journey>/`) with every claim.
- Do not report an entry point as verified through a different entry point. The header `Book a call` and the hero `Book a call` are separate entry points.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior, followed by exactly four H2s in this order: `Sub-features`, `How to get to it (user POV)`, `Driving it with drive.mjs`, `Gotchas`.

## Features

- [Home and agent-run card](./home.md) covers the hero, the show-confirmations run card with its waiting-for-approval step, the content sections, and the home links to /about and /contact.
- [Agents and pricing](./agents.md) covers the /agents service page, the $850 pilot audit, the FAQ, and the custom-builds call to action.
- [About and proof log](./about.md) covers the /about story, the eight proof entries with screenshot placeholders, and the photo placeholder.
- [Contact and booking path](./contact.md) covers every `Book a call` entry point, the /contact page, the booking placeholder, and the email and Instagram links.
- [Site navigation, footer and 404](./nav.md) covers the header nav loop, the brand link, the skip link, the footer, and the missing-route 404.
