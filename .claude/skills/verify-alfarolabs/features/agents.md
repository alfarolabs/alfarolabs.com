# Agents and pricing

/agents is the service page for Alfaro Labs Agents. It covers the busywork agents take on, a before-and-after worked example, how the user stays in charge, the three-step process with the $850 pilot audit, the FAQ, who it is not a fit for, and custom builds with their own call to action.

## Sub-features

- `agents-hero` shows the h1 `Alfaro Labs Agents`, the sub line `AI agents for live production.`, and a `Book a call` button.
- `agents-pricing` shows the `.pilot` block with the name `Pilot audit` and the price `$850`. This is the only price on the site.
- `agents-how` shows three numbered steps: `Free workflow audit`, `Build`, `Run and improve`.
- `agents-faq` shows three h3 questions: `Will this replace my people?`, `What if the AI messes up?`, `What does it cost?`.
- `agents-not-fit` shows the h2 `Not a fit`.
- `agents-custom` shows the `Custom builds` section with the link `Ask about custom builds`, which goes to /contact.

## How to get to it (user POV)

- Click `Agents` in the header nav (`nav[aria-label=Main]`).
- Type `/agents`. A hard load answers with a 307 redirect to `/agents/`.

## Driving it with drive.mjs

Preconditions:

- `doctor.sh` exits 0.

- **Navigate.** Run `scripts/drive.mjs agents`. The journey loads `/`, sets a marker, clicks `nav` link `Agents`, asserts the path `/agents`, and confirms the marker survived.
- **Page identity.** It asserts the title `Agents | Alfaro Labs` and the h1 `Alfaro Labs Agents`.
- **Pricing.** It asserts that `.pilot .price` is `$850` and `.pilot h3` is `Pilot audit`, and saves `NN-agents-pricing.png`.
- **FAQ and fit.** It asserts the three FAQ h3s and the h2 `Not a fit`. It saves `NN-agents-full.png` (full page) and `NN-agents-main.aria.txt`.
- **Custom builds CTA.** It clicks `main` link `Ask about custom builds` and lands on `/contact` with the h1 `Book a free workflow audit.`
- **Proof.** `summary.json` has `ok: true`. The pricing screenshot shows `$850`. `doctor.sh --smoke` confirms that no other price appears anywhere.

## Gotchas

- The title updates a beat after client-side navigation. Reading `document.title` immediately returns the previous page's title. `expectTitle` polls for this reason.
- Client-side navigation leaves the URL at `/agents`, while a hard load lands on `/agents/`. `expectUrl` ignores the trailing slash.
- Typed-URL entry (`/agents`) is covered only by `doctor.sh --smoke` (HTTP). The browser journey enters through the header link.
