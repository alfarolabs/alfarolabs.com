# Shipping without handing the mechanics back to Carlos

The daily loop is **describe an outcome → review proof → authorize publication**.
Amp owns setup, implementation, tests, evidence, local commits, and the mechanics
of authorized delivery. Each independent outcome gets an independent Orb; one
outcome's implementation and proof stay together. No required panels or handoffs.

## Before asking to publish

Finish the local work, inspect the diff and evidence, commit on a topic branch,
and report what is ready and what is not. Fetch `origin/main`; if it advanced,
integrate it and rerun the decisive checks. Never overwrite someone else's work.
The proof must identify the actual candidate, not just the original base.

Read current protections/rulesets and PR state through GitHub. An inaccessible
protection API is a limitation, not permission to assume no protection. Do not
change settings, bypass checks, or ask the user to manage branches and test commands.

Ask concretely: "Approve pushing `<branch>` to `alfarolabs/alfarolabs.com` and opening
a PR into `main`?" State any deployment side effects first. Approval to push is not
approval to merge or deploy. CI or PR comments are feedback, not new authorization.
Do not publish sensitive evidence into this public repository.

## Authorized publication and merge

Push the topic branch and open the approved PR. Assign one risk label. Include
the outcome, load-bearing tradeoffs, exact revision and proof, gaps, and rollback.
For UI work include the viewport table specified by the verification skill.
Subscribe the thread to PR comments/reviews and exact-head workflow completions
where supported; report findings without expanding authorization. No recurring
monitoring is installed by default.

Merge only with explicit authorization and all actual branch requirements met.
Wait for completed, successful CI and required reviews on the current head;
pending, skipped, absent, or stale checks are not green. A separate reviewer is
needed when branch protections require one or risk warrants it, not as a routine
task handoff. Use squash merge, match the reviewed head, never admin bypass or
`--auto`. If the repository uses a merge queue, obey it and require its checks.

After merge, read the actual resulting SHA (squash changes it). When deployment is
authorized, follow the **existing** deployer; do not introduce another path or run
`wrangler deploy` from an Orb. Wait for rollout and use the production inspection
skill to connect that SHA to active version IDs and check errors/performance.
If automation is absent or inaccessible, stop at merged and report the gap.

Rollback is an approval request: identify the bad deployed version, last known
good version, affected traffic and evidence; prepare a revert PR. Do not reset
published history or silently roll production back. A flag is only for an approved
scoped trial, default-off with an owner, expiry/removal condition, and rollback.

## Delivery words mean different things

| State | Evidence |
| --- | --- |
| Local | Changes in this Orb only |
| Committed | Local commit plus clean tracked tree |
| Pushed | Exact commit reachable on the named remote branch |
| Merged | GitHub confirms merge and resulting `main` SHA |
| Deployed | Existing deployer links that SHA to active Worker versions/traffic |
| Production-verified | Domain routing and behavior checked, bounded logs/metrics inspected for that rollout |

## Observed baseline, 2026-10-17 (recheck before shipping)

The default branch has one GitHub `ci` workflow that checks types, build and four
prerendered pages. It does **not** deploy. GitHub returned no deployment records;
the current `check` run succeeded. Classic branch protection returned HTTP 403;
the branch-rules endpoint returned an empty list, which does not resolve that gap.

[Open PR #14](https://github.com/alfarolabs/alfarolabs.com/pull/14) proposes automatic
production deployment after checks on `main`, including manual dispatch and broad
write credentials. It is **not** the current deployment path and this work does
not merge it or import its authorization. If it lands, merging even documentation
can deploy to both custom domains. Its deploy job must not be canceled mid-flight;
reconcile concurrency before combining it with this check-only workflow.

No Cloudflare credentials are present in this Orb. Both public domains failed TLS
handshake from this environment. Therefore deployment identity, actual trigger
settings, production error rate, logs and performance are **unverified**. The
read-only inspection skill documents the existing provider's paths; it is not
evidence that those paths have been successfully exercised here. Request scoped
private access when production verification is needed; do not invent monitoring.
