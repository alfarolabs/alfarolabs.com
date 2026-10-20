# About and proof log

/about tells Carlos's story as a live-show audio tech and lists the proof log under `Agentify yourself. I did it first.`: eight agents and products he runs, each with a screenshot placeholder. A photo placeholder sits beside the story, and the page ends with a booking button.

## Sub-features

- `about-hero` shows the h1 `About Carlos`, two story paragraphs, and a `.placeholder[data-kind=photo]` that reads `Placeholder. Photo of Carlos TBD.`
- `about-proof` shows eight `.cell.proof` items, each with an h3 (for example `Patchlist and Gearmind`) and a `.placeholder[data-kind=screenshot]` that reads `Placeholder. Screenshot TBD.`
- `about-booking` shows a `Book a call` button, which goes to /contact.

## How to get to it (user POV)

- Click `About` in the header nav.
- Click `See the proof log` or `More about Carlos` on the home page.
- Type `/about`.

## Driving it with drive.mjs

Preconditions:

- `doctor.sh` exits 0.

- **Navigate.** Run `scripts/drive.mjs about`. The journey clicks `nav` link `About` from `/` and asserts the path `/about` and the title `About Carlos | Alfaro Labs`.
- **Story and proof.** It asserts the h1, the h2 `Agentify yourself. I did it first.`, that `.cell.proof` and `.placeholder[data-kind=screenshot]` each count 8, the photo placeholder text, and the h3 `Patchlist and Gearmind`.
- **Evidence.** It saves `NN-about-full.png` and `NN-about-main.aria.txt`.
- **Booking.** It clicks `main` link `Book a call` and lands on `/contact`.
- **Proof.** `summary.json` has `ok: true`. The full-page screenshot shows all eight proof cells with their placeholders.

## Gotchas

- The placeholders are intentional content (the smoke check requires `Placeholder. Screenshot TBD.`). When real screenshots replace them, update the counts and this file.
- The home `Proof` section shows only the first three entries. Count proof entries on /about, not on home.
- The home-page entry points are exercised by the `home` journey. They are not exercised here.
