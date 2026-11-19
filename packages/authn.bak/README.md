# Authentication

The authentication service is a Cloudflare Worker for authenticating `quisi.do`
users.

## JWT sessions

OAuth completion creates an encrypted JWT (JWE) using `jose` `EncryptJWT`.
`/whoami/` authenticates and decrypts it using `jwtDecrypt`, without reading or
writing the former `AUTHN_USER_IDS` KV namespace or caching session identities.
D1 remains the source of accounts and OAuth associations.

The `__Secure-Authentication-ID` cookie contains the token and uses `HttpOnly`,
`Secure`, `SameSite=Lax`, `Partitioned`, the configured `COOKIE_DOMAIN`, and
`Path=/`. Both the cookie and token expire after 24 hours. Claims contain only
the internal user ID (`sub`), issuer (`iss`), audience (`aud`), issuance time
(`iat`), and expiration (`exp`). Email and provider credentials are not included.
The token uses `alg=dir` and `enc=A256GCM`; validation permits only those
algorithms and checks required claims, subject, issuer, audience, and lifetime.

This is a direct cutover. Existing KV session IDs are rejected and users must
sign in again. There is no dual issuance or KV fallback. Authentication and
logout responses use `Cache-Control: no-store`.

## Configuration and deployment

- `JWT_ENCRYPTION_SECRET`: a base64url-encoded, cryptographically random 32-byte
  key (43 characters without padding). Use different keys for local development,
  staging, and production. Keep it in uncommitted `.dev.vars` locally and a
  Cloudflare Worker secret for each deployed environment. Never put it in
  `wrangler.jsonc`, source code, logs, or analytics.
- `JWT_ISSUER` and `JWT_AUDIENCE`: environment-specific values in
  `wrangler.jsonc`. They must match exactly when issuing and validating tokens.
- Provision `JWT_ENCRYPTION_SECRET` in staging and production before deploying
  through CI/CD. The Worker fails closed when configuration is invalid or absent.
  Existing Patreon and analytics secrets remain required for their features.
- Regenerate bindings with `npx wrangler types --include-runtime false` after
  configuration changes. Validate with the package's staging and production
  deployment dry-run commands, then verify OAuth, `/whoami/`, and logout in
  staging before the production cutover.

Monitor aggregate `authentication.token.issued`, `.validated`, `.rejected`, and
`.issuance.failed` metrics, plus `authentication.jwt.configuration.invalid`.
Metrics never include token values or decrypted claims. Historical session
metrics remain readable by the analytics endpoint.

## Logout and revocation

The frontend calls `DELETE /whoami/` with credentials. A successful request from
an allowed origin returns `204` and expires the authentication cookie. Missing
or invalid cookies can still be cleared. Browser JavaScript cannot directly
clear this `HttpOnly` cookie. Preflight advertises `GET, DELETE, OPTIONS`.

Clearing the cookie ends the browser session; it does not revoke copies of the
token. Tokens remain valid until their 24-hour expiration. Replacing the
configured key invalidates all outstanding tokens and requires everyone to sign
in again. There is no per-session revocation store or refresh-token flow.

## Remaining KV usage

`BUDGET` remains in use. The production finalizer reads and updates it after
requests, including JWT-authenticated requests. This migration removes
session-related KV operations only; budget accounting can still reach the daily
KV operation limit. The old session namespace can expire naturally and is no
longer bound to the Worker.
