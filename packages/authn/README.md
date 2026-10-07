# Authentication

The authentication service is a Cloudflare worker for authenticating `quisi.do`
users.

## JWT migration

`jose` is installed as a runtime dependency for an incremental migration from KV
sessions to encrypted JWTs. This initial step keeps authentication on the existing
KV path and requires no new secrets or bindings.

Use [`EncryptJWT` and `jwtDecrypt`](https://github.com/panva/jose#encrypted-json-web-tokens)
for user claims such as ID and email. Signed JWT payloads are readable; encryption
(JWE) is needed to keep these claims confidential.

Follow-up commits will configure an environment-specific encryption secret,
implement token issuance and validation (including allowed algorithms, issuer,
audience, and expiration), then support encrypted tokens alongside legacy KV
sessions. Remove the KV path only after legacy sessions have expired.
