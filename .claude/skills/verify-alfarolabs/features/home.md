# Home and agent-run card

The home page tells a live-production business what Alfaro Labs Agents does. Its hero shows a sample agent run: four completed steps for show confirmations, ending in a step that waits for the user's approval. The sections below cover pain points, the "what agents handle and what people keep" split, approve-first, and proof. The page links to /about and to booking.

## Sub-features

- `home-hero` shows the eyebrow, the h1 `AI agents for live production.`, the core line, the lede, and a `Book a call` button.
- `home-run-card` shows the label `Agent run. Show confirmations.`, four `.run-step[data-state=done]` items, and one `.run-step[data-state=waiting]` item that reads `Waiting for your approval` with a decorative `Approve` badge.
- `home-sections` shows the h2 headings `Sound familiar?`, `Where it breaks`, `What agents handle. What people keep.`, `Approve first`, `Proof`, `About Carlos`, and `Book a free workflow audit.`
- `home-proof-link` shows the `See the proof log` link, which goes to /about.
- `home-about-link` shows the `More about Carlos` link, which goes to /about.
- `home-booking` shows the hero and bottom `Book a call` buttons, which go to /contact.

## How to get to it (user POV)

- Type the site origin (`/`).
- Click the `Alfaro Labs` brand link in the header from any page.

## Driving it with drive.mjs

Preconditions:

- `doctor.sh` exits 0.

- **Load home.** Run `scripts/drive.mjs home`. The journey loads `/` and asserts HTTP 200, the title `Alfaro Labs Agents. AI agents for live production.`, and the h1.
- **Run card.** In the same journey, it counts `.run .run-step[data-state=done]` (it must be 4), checks the waiting step text and its `.run-approve` badge (`aria-hidden="true"`), and saves `NN-home-hero.png` and `NN-home-hero.aria.txt` of `.hero`.
- **Proof link.** It sets a marker, clicks `main` link `See the proof log`, lands on `/about` with the h1 `About Carlos`, and confirms the marker survived, which proves client-side navigation.
- **Hero booking.** It reloads `/`, clicks `.hero-copy a.button`, lands on `/contact` with the h1 `Book a free workflow audit.`, and saves `NN-home-booking-landed.png`.
- **Proof.** `summary.json` has `ok: true`. The hero screenshot shows the run card with `Waiting for your approval` and `Approve`.

## Gotchas

- The `Approve` badge is a decorative `<span aria-hidden="true">`, not a button. It has no role and cannot be clicked to approve anything. Assert it with CSS. Don't look for a button.
- `.run-label` and `.eyebrow` are uppercased by CSS. innerText returns `AGENT RUN. SHOW CONFIRMATIONS.`, while textContent returns the source copy.
- `More about Carlos` is not driven by the journey yet (it shares the target `/about` with the proof link). Add a step before claiming it is verified.
- The home page has three booking buttons in `main`, and the header has another. `nth: 0` in `main` is the hero button.
