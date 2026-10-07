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

- Add an optional JWT encryption secret to the typed Worker bindings.
- Define the encrypted token’s claims for user ID, optional email, issuer,
  audience, issued-at time, and expiration, with runtime validation and focused
  tests.
- Implement a small `jose` token creation helper using authenticated encryption,
  the configured secret, and the existing session lifetime, with round-trip
  tests.
- Implement token decryption and validation with explicit allowed algorithms and
  required claims, testing expired, tampered, malformed, wrong-key,
  wrong-issuer, and wrong-audience tokens.
- Add JWT cookie parsing and serialization using a separate cookie name with
  `HttpOnly`, `Secure`, and the existing domain, path, and same-site settings.
- Update OAuth completion to issue the encrypted JWT when enabled while
  continuing to issue the legacy cookie and write its KV session.
- Update `/whoami/` to validate an available JWT before accessing session memory
  or KV, preserve its response contract, and use legacy authentication only when
  the JWT cookie is absent.
- Add integration tests proving JWT authentication performs no `AUTHN_USER_IDS`
  reads, legacy sessions still work, and invalid JWTs cannot fall back to legacy
  authentication.
- Add aggregate metrics for JWT issuance, successful validation, rejected
  tokens, and legacy authentication without recording tokens, email addresses,
  or other personal data.
- Document and enable the staged rollout after validation, including the change
  in revocation behavior caused by tokens remaining valid until expiration.
- Stop issuing legacy cookies and writing new KV sessions after JWT
  authentication is established, while retaining legacy reads until the final
  legacy session expires.
- Remove legacy cookie handling, session caching, and `AUTHN_USER_IDS` reads and
  bindings after that expiry window, retaining unrelated KV usage.
