# Contributing

Run `npm --workspace=packages/authn run local:init` to install a local instance
of the D1 database.

Local authentication also requires `JWT_ENCRYPTION_SECRET` in the uncommitted
`.dev.vars` file, containing a base64url-encoded random 32-byte key. Generate it
with a cryptographic random-number generator; do not use the public test key.
Issuer and audience defaults are configured in `wrangler.jsonc`.

Tests inject a clock and a public test encryption key. The authn test helper can
include the production finalizer with `includeFinally: true`; those tests keep
`BUDGET` mocked and explicitly distinguish its operations from session storage.
Run `npm run vitest:run`, `npm run tsc:no-emit`, and `npm run eslint` in this
package. Capture build and test output in temporary files before inspecting it.
