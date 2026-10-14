# Alfaro Labs

Home for Alfaro Labs and Alfaro Labs Agents.

## Local

Install dependencies, then start the dev server.

```bash
npm install
npm run dev
```

The app listens on port 3000.

## Check

```bash
npm run typecheck
npm run build
npm run smoke
```

`npm run smoke` reads the four prerendered pages in `dist/client/`: `index.html`, `agents/index.html`, `about/index.html`, and `contact/index.html`. It checks each page for its required text. It also checks the visible text of every page. The text must have no en or em dash, no hype words, and no price other than $850. "Alfaro Labs" must be written exactly that way. Each brand phrase may appear at most once. Every logo must be the icon-on-black or wordmark-white file. Run `npm run build` first.

Deploy is not a script in this repo. See `AGENTS.md`.
