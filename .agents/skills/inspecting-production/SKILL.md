---
name: inspecting-production
description: Inspects Alfaro Labs deployment revisions, errors, and performance using existing GitHub and Cloudflare records. Use for shipping, production health, or incident questions; does not authorize deployment.
---

# Production visibility

Read `docs/shipping.md` for the known deployment state and approval rules. Worker:
`alfarolabs-com`; domains: `alfarolabs.com`, `www.alfarolabs.com`. Observability is
already enabled in `wrangler.jsonc`. Do not create a second monitoring service,
enable logging, create schedules, deploy, or write production data to inspect it.

## Access

Use the existing GitHub OAuth connection. Cloudflare inspection needs an approved,
short-lived token scoped to the owning account with **Workers Scripts Read**,
**Workers CI Read** (if Builds is used), and **Account Analytics Read**. Never
request deploy/write privileges for observation or reuse a broad CI deploy token.
Use Amp project-private secret input for `CLOUDFLARE_API_TOKEN`; account identifier
`CLOUDFLARE_ACCOUNT_ID` is non-secret configuration. Never ask for a token in chat
or print it. Prefer an existing read-only OAuth/MCP connection if available.
The user grants access; do not create tokens or change account permissions yourself.

## Establish what is deployed

- Read GitHub check runs, statuses, and deployments for the exact requested SHA.
  An empty list, permission error, or green CI is not deployment confirmation.
- With read access, GET Cloudflare API
  `/accounts/{account}/workers/scripts/alfarolabs-com/deployments`. Record the active
  deployment ID, timestamp, **every** version ID, and traffic percentage.
- If Cloudflare Builds owns deployment, GET
  `/accounts/{account}/builds/builds?version_ids={version_id}` for each active version.
  Match the build's `build_trigger_metadata.commit_hash`, repository and branch to
  the intended full Git SHA. Preserve the build/version/deployment linkage. A build
  success or preview URL alone does not mean the version receives production traffic.
- If another deployer owns it, use that deployer's immutable version-to-commit
  record instead. Missing linkage means **revision unverified**, not "probably live".
  A partial rollout means only its recorded traffic share is deployed.
- Inspect existing build trigger settings before publication: production branch,
  preview branches, deploy command. Print only those fields, never environment
  values returned alongside them. No integration currently visible is not proof
  that external automatic deployment is absent.

## Observe health, not just HTTP 200

Use bounded read-only GETs to the four public routes. Record UTC time, HTTP status,
TLS errors, `cf-ray`, TTFB/total latency and content. No load tests or form submissions.
Confirm custom-domain routing to the identified Worker/version before claiming
these public probes verify the requested revision.

Query the existing Cloudflare GraphQL analytics endpoint using the documented
`workersInvocationsAdaptive` dataset, filtered to `scriptName: "alfarolabs-com"`
and explicit equal-length before/after UTC windows. Request `sum { requests errors }`
and `quantiles { cpuTimeP50 cpuTimeP99 }`, grouped by `dimensions { status }`.
This is a read-only GraphQL **query**, not a mutation. Report request counts, error
rate, CPU units from the schema, sampling/retention limits, and the window; do not
average percentiles across groups. CPU time is not visitor latency. Static assets
may bypass Worker invocations. Use the existing dashboard's latency metrics or
small public probes as a separately labeled observation, not a population SLO.

Inspect existing Workers Logs for errors/exceptions in the same window through an
available read-only connection/dashboard. Redact payloads, personal data, headers,
and tokens before retaining excerpts. Do not start a tail session requiring write
permission just to work around missing log access. No traffic, no logs, denied
access, or unavailable telemetry means **unknown**, not zero errors or healthy.

Finish with separate revision, reachability, errors, and performance conclusions.
If any is unavailable, give the precise access or evidence needed. Keep rollback
as a proposal requiring approval, even during an incident.

Authoritative API references:
- https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/
- https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/deployments/methods/list/
- https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/
