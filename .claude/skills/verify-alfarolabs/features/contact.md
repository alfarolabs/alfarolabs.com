# Contact and booking path

Every `Book a call` button and the header `Book a call` link take the user to /contact, a page headed `Book a free workflow audit.` While no external booking URL is configured, the page shows a booking placeholder and offers email and Instagram as direct contact options.

## Sub-features

- `contact-entry-header` is the header nav link `Book a call`, available on every page.
- `contact-entry-buttons` are the in-page `Book a call` buttons on /, /agents and /about, plus `Ask about custom builds` on /agents.
- `contact-hero` shows the eyebrow `Book a call`, the h1 `Book a free workflow audit.`, the body copy, and `.placeholder[data-kind=link]` that reads `Placeholder. Booking link TBD.`
- `contact-reach` shows an email link with href `mailto:carlos@alfarolabs.com`, an Instagram link with href `https://instagram.com/alfarolabs`, and the text `DM AUDIT on Instagram.`

## How to get to it (user POV)

- Click `Book a call` in the header nav from any page.
- Click a `Book a call` button in the page body (home hero, home bottom, /agents, /about).
- Click `Ask about custom builds` on /agents.
- Type `/contact`.

## Driving it with drive.mjs

Preconditions:

- `doctor.sh` exits 0.
- `BookingHref` is `null`. The contact hero uses `BookingLink` with `slot="status"`.

- **Hero button.** Run `scripts/drive.mjs contact`. The journey sets a marker on `/`, clicks the first `main` link `Book a call` (the hero button), asserts the path `/contact`, and confirms the marker survived.
- **Page content.** It asserts the title `Book a call | Alfaro Labs`, the h1, the eyebrow, and the booking placeholder text.
- **Reach links.** It asserts the `href` of the email and Instagram links in `main` and the DM text. It saves `NN-contact.png` (full page) and `NN-contact-main.aria.txt`.
- **Header entry.** It loads `/agents/`, clicks `nav` link `Book a call`, and asserts the path `/contact`.
- **Proof.** `summary.json` has `ok: true`. The screenshot shows the placeholder and both reach links. Other in-page buttons are covered by the `home`, `agents` and `about` journeys.

## Gotchas

- `BookingLink` with `slot="button"` links to `/contact`. `slot="status"` renders the booking placeholder. There is no external booking URL until `BookingHref` changes. The header nav link stays the internal `/contact`.
- `Book a call` is ambiguous without scope. Always use `within: "nav"` or `within: "main"`.
- Never follow the mailto or Instagram links. Assert the `href` only.
