import { errors, jwtDecrypt } from 'jose';

import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { SECONDS_PER_DAY } from '../constants/time.js';
import getAuthenticationTokenKey from './get-authentication-token-key.js';

const MINIMUM_USER_ID = 1;
const SUBJECT_PATTERN = /^[1-9][0-9]*$/u;

export default async function validateAuthenticationToken(
  this: AuthnFetchHandler,
  token: string,
): Promise<number | null> {
  const key: Uint8Array = getAuthenticationTokenKey.call(this);
  const issuer: string = this.jwtIssuer;
  const audience: string = this.jwtAudience;

  try {
    const { payload } = await jwtDecrypt(token, key, {
      audience,
      contentEncryptionAlgorithms: ['A256GCM'],
      currentDate: new Date(this.now()),
      issuer,
      keyManagementAlgorithms: ['dir'],
      maxTokenAge: SECONDS_PER_DAY,
      requiredClaims: ['sub', 'iss', 'aud', 'iat', 'exp'],
      typ: 'JWT',
    });

    const { exp: expiresAt, iat: issuedAt, sub: subject } = payload;
    if (
      typeof subject !== 'string' ||
      !SUBJECT_PATTERN.test(subject) ||
      typeof issuedAt !== 'number' ||
      !Number.isSafeInteger(issuedAt) ||
      typeof expiresAt !== 'number' ||
      !Number.isSafeInteger(expiresAt) ||
      expiresAt <= issuedAt ||
      expiresAt - issuedAt > SECONDS_PER_DAY
    ) {
      return null;
    }

    const userId: number = Number(subject);
    return Number.isSafeInteger(userId) && userId >= MINIMUM_USER_ID
      ? userId
      : null;
  } catch (error: unknown) {
    if (
      error instanceof errors.JWTExpired ||
      error instanceof errors.JWTClaimValidationFailed ||
      error instanceof errors.JWTInvalid ||
      error instanceof errors.JWEInvalid ||
      error instanceof errors.JWEDecryptionFailed ||
      error instanceof errors.JOSEAlgNotAllowed ||
      error instanceof errors.JOSENotSupported
    ) {
      return null;
    }

    // JOSE errors can contain the decrypted claims. Never propagate them.
    // eslint-disable-next-line preserve-caught-error -- The original may contain decrypted claims.
    throw new Error('Authentication token validation failed');
  }
}
