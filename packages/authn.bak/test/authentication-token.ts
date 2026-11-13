import { base64url, EncryptJWT, type JWTPayload } from 'jose';

const KEY_BYTES = 32;

export const TEST_NOW = 1_700_000_000_000;
export const TEST_ISSUED_AT = 1_700_000_000;
export const TEST_EXPIRES_AT = 1_700_086_400;
export const TEST_USER_ID = 1234;
// Public test fixture; never use this key outside tests.
export const TEST_ENCRYPTION_SECRET: string = base64url.encode(
  new Uint8Array(KEY_BYTES),
);
export const TEST_JWT_ISSUER = 'urn:quisi.do:authn:test';
export const TEST_JWT_AUDIENCE = 'urn:quisi.do:saas:test';

export const TEST_TOKEN_CLAIMS: JWTPayload = {
  aud: TEST_JWT_AUDIENCE,
  exp: TEST_EXPIRES_AT,
  iat: TEST_ISSUED_AT,
  iss: TEST_JWT_ISSUER,
  sub: TEST_USER_ID.toString(),
};

export default async function createTestAuthenticationToken(
  claims: JWTPayload = TEST_TOKEN_CLAIMS,
): Promise<string> {
  return await new EncryptJWT(claims)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM', typ: 'JWT' })
    .encrypt(base64url.decode(TEST_ENCRYPTION_SECRET));
}
