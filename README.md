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

`npm run smoke` reads `dist/client/index.html` from the production build and checks that file for the home page text. Run `npm run build` first.

Deploy is not a script in this repo. See `AGENTS.md`.
