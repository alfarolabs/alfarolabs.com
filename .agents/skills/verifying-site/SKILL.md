---
name: verifying-site
description: Verifies Alfaro Labs changes on the real local Worker and in a rendered browser. Use for application, build, or Orb setup changes and before requesting publication.
---

# Verify the outcome, not just the diff

1. Record `git rev-parse HEAD` and `git status --short`. For a bug, reproduce the
   reported failure before editing and keep that observation. For a new feature,
   capture the starting state. Choose an input where a plausible wrong fix would
   fail, a nearby unchanged control, and relevant empty/error/boundary states.
2. Run `npm run check`. It builds four prerendered pages and checks copy rules.
   It does not exercise navigation, browser hydration, CSS, or a deployed Worker.
3. `amp orb services ensure` starts the real TanStack Start + Cloudflare Vite
   runtime. No mocks, production credentials, seed data, or login are required.
   For changes that affect packaging, build first, then run a supervised artifact:
   `amp orb service start preview --command 'npm run preview -- --host 0.0.0.0 --port "$PORT" --strictPort' --portal`.
   Rebuild and `amp orb service restart preview` after subsequent edits. Never
   substitute a static file server for the Worker preview.
4. Run `npm run smoke -- --url <local-or-portal-origin>` against that server to
   exercise all four routes and their referenced same-origin assets. Then use
   `agent-browser` (load its installed guidance) to exercise affected flows and
   inspect DOM/accessibility state, console errors, and failed network requests.
   Test direct navigation and client-side navigation when routing changes.
5. Capture every changed screen and state at desktop 1440×900, tablet 834×1194,
   and phone-width 390×844. Use actual viewports, DPR 2, `fullPage: false`, never
   resized narrow captures. Name `<screen>-<desktop|tablet|phone>.png`; use state
   subdirectories for multiple states. Inspect every capture for blank/error pages
   and the expected result. Label viewport emulation honestly, not real-device proof.
   Record pointer/keyboard changes as a short clip that traverses neighboring controls.
6. Keep evidence under `.amp/in/artifacts/`, not build output or raw private logs.
   In the thread, show inspected media and a short case table with before/after,
   exact commands/results, tested revision, and remaining gaps. Link the live portal
   when useful. If publishing a UI PR, embed inspected stills in a table with a row
   per screen/state and desktop/tablet/phone columns, using review-accessible URLs.
   Do not publish private artifacts or `file://` links in a public PR.

Keep permanent regression tests only for observable behavior worth maintaining.
Use temporary probes and fault injection freely, then remove them. Do not weaken
`scripts/smoke.mjs` copy/brand rules. Test setup twice when it changes, including
tool versions in a new login shell and service restart. A new configuration file
or a successful server start alone is not proof.

For workflow evaluations, put the exact candidate in a fresh Orb, recording its
commit and tree identity before work. Give the evaluator an outcome, not commands
or a solution. Keep the evaluator's implementation and proof together there;
inspect its actual transcript and evidence. Do not silently import its product
changes into an unrelated workflow PR. Report a failed or coached evaluation as such.
