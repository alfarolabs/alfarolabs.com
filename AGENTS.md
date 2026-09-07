# Alfaro Labs site

Public hire site for Carlos Alfaro. Domain `alfarolabs.com`.

## How to work in this repo

Start every non-trivial task with `/poteto-mode`.

Proof is the real app. Playwright and the browser, not "it compiles."

If the vinext overlay says `Cannot read properties of null (reading 'useContext')` in `GlobalErrorBoundary`, the browser mixed two Vite React prebundles. Stop `npm run dev`, delete `node_modules/.vite`, start it again, then hard-reload the tab.

Content lives in typed modules under `lib/`. Do not add a CMS.

## Stack

vinext (Next API on Vite) + Tailwind v4 + shadcn/ui (Nova / Radix) + Cloudflare Workers.

```
npm run dev      # vinext, default port 3000
npm test
npm run test:e2e
npm run build
npm run deploy
```

## Do not

- Copy Dial’s latte palette, cup mark, or PWA splash list.
- Add Clerk, a chat widget, or D1 until a later PR asks for it.
- Invent client names or metrics.
