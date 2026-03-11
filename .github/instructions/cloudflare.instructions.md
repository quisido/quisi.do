---
applyTo: "packages/ai/**,packages/authn/**,packages/csp/**,packages/dashboard/**,packages/worker/**"
---
# Cloudflare Workers coding standards

- Apply the [general coding guidelines](./general-coding.instructions.md) to all
  code.
- Apply the [TypeScript coding guidelines](./typescript.instructions.md) to all
  TypeScript code.
- Use the `Request`/`Response` Web APIs (not Node.js `http`) in Worker handlers.
- Access secrets and bindings exclusively via the typed `Env` interface generated
  in `worker-configuration.d.ts`; never hard-code secrets or credentials.
- Run `wrangler types` to regenerate `worker-configuration.d.ts` whenever new
  bindings are added or changed in `wrangler.jsonc`.
- Keep `wrangler.jsonc` environments separated: `dev`/`staging`/`production`
  should each have distinct binding names and dataset names.
- Use D1 for relational data. Always use parameterized queries (`?` placeholders)
  to prevent SQL injection. Never interpolate user input into SQL strings.
- Emit observability data to Cloudflare Analytics Engine (`PRIVATE_DATASET` for
  sensitive fields, `PUBLIC_DATASET` for aggregatable metrics) using
  `writeDataPoint`.
- Use `ctx.waitUntil` for fire-and-forget side effects (e.g., logging, cache
  writes) that must complete after the `Response` is returned.
- Always return a `Response` from the `fetch` handler; never let unhandled
  exceptions propagate to the runtime.
- Respect Cloudflare Worker CPU-time limits: avoid long synchronous loops;
  prefer streaming responses (`TransformStream`, `ReadableStream`) for large
  payloads.
- Use `wrangler dev --persist-to ../../.wrangler/state` for local development
  so that D1 and KV state is persisted across restarts.
- Use `wrangler deploy --dry-run` to validate the build output before deploying
  to staging or production.
