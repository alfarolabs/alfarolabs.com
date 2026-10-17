# Sources and adaptation

Read on 2026-10-17. These are changing practices, not a framework to copy wholesale.

| Source read | Advice used | Repository decision |
| --- | --- | --- |
| [Thorsten Ball, Time Capsule 6](https://ampcode.com/time-capsules/6), full published transcript, especially 02:50, 14:01–20:28, 24:15, 29:05 | Prompt outcomes; review load-bearing code with proof; make the codebase and production legible; evaluate agent-friendliness in fresh Orbs | One outcome keeps code and proof together; two local skills; exact-candidate fresh-Orb evaluation |
| [Quinn Slack, How Amp Builds Amp](https://youtu.be/kQguG4YS0d0), official description and chapter list (05:30, 07:27, 08:59, 13:33, 21:30) | Long leashes, proof, mini evals, cloud agents, threads as the review surface | Asynchronous work with results in the thread; no mandatory planning/coding/testing handoffs |
| [Current docs](https://ampcode.com/docs), [Orbs](https://ampcode.com/docs/orbs), [customization](https://ampcode.com/docs/orbs/customizing), [portals](https://ampcode.com/docs/orbs/portals) | Executable idempotent setup; separate supervised services; use portal URLs; no authentication in shared setup snapshots | Pinned Node + lockfile installation; `.amp/services.yaml`; no unnecessary resume hook, database or login bypass |
| [Chronicle](https://ampcode.com/chronicle), [Putting an Agent in an Orb](https://ampcode.com/notes/putting-an-agent-in-an-orb) | Give agents a runnable system, visible logs, tools and concise discovery guidance | Exercise TanStack Start through Cloudflare's local runtime, not just generated HTML |
| [Pave The Road](https://ampcode.com/notes/pave-the-road) and [Orbs, Explained](https://ampcode.com/notes/orbs-explained) | Isolation, reversibility, parallel independent work, reviewable portals | Independent outcomes may use independent Orbs; no agent fleet or worktree management for the user |

## Source limitations

Quinn's YouTube page was readable, including its official description and timed
chapters. The spoken transcript was not returned. A direct subtitle extraction
attempt was blocked by YouTube's sign-in/bot gate. No full-viewing or transcript
claim is made; the interpretation above is limited to that official description.
Thorsten's full published transcript was accessible. Relevant docs and Chronicle
posts were read, not inferred from titles.

The July Orb article's tmux and snapshot-lifetime examples are historical. This
repository follows current supervised-service documentation instead. Current
customization docs and the installed setup skill disagree on some snapshot
invalidation details; this work does not rely on cached snapshot invalidation.
The fresh-Orb evaluation uses a transferred exact candidate with setup bypassed
at creation, then exercises setup there. It cannot prove default-branch automatic
activation before publication.

## Choices that are ours, not source mandates

- No direct push to `main`, autonomous merge, production writes, or automatic
  production experiments. The source team's risk tolerance is not authorization.
- Branch protections and explicit publication approval remain. No required agent
  panel; any required external review follows actual repository rules and risk.
- Keep cheap static CI, and label its scope. Real Worker/browser proof runs in the
  task Orb. No new monitoring platform, scheduled checks, or speculative flags.
- Preserve this site's copy, brand, placeholder, security and data constraints.
  Production visibility uses existing GitHub/Cloudflare records and reports access
  gaps rather than adding infrastructure or claiming unavailable telemetry.
