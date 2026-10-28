import { ErrorCode } from '@quisido/authn-shared';
import { EncryptJWT } from 'jose';

import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { SECONDS_PER_DAY } from '../constants/time.js';
import FatalError from '../utils/fatal-error.js';
import getAuthenticationTokenKey from './get-authentication-token-key.js';

const MINIMUM_USER_ID = 1;

const toName = (error: unknown): string => {
  if (error instanceof Error) {
    return error.name;
  }

  return typeof error;
};

export default async function createAuthenticationToken(
  this: AuthnFetchHandler,
  userId: number,
): Promise<string> {
  const key: Uint8Array = getAuthenticationTokenKey.call(this);
  const issuer: string = this.jwtIssuer;
  const audience: string = this.jwtAudience;
  const issuedAt: number = this.nowSeconds();

  try {
    if (!Number.isSafeInteger(userId) || userId < MINIMUM_USER_ID) {
      throw new Error('Invalid authentication subject');
    }

    const token: string = await new EncryptJWT({})
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM', typ: 'JWT' })
      .setSubject(userId.toString())
      .setIssuer(issuer)
      .setAudience(audience)
      .setIssuedAt(issuedAt)
      .setExpirationTime(issuedAt + SECONDS_PER_DAY)
      .encrypt(key);

    this.emitPublicMetric(MetricName.AuthenticationTokenIssued);
    return token;
  } catch (error: unknown) {
    this.emitPublicMetric(MetricName.AuthenticationTokenIssuanceFailed);
    this.logError(
      new Error(`Authentication token issuance failed: ${toName(error)}`),
    );
    throw new FatalError(ErrorCode.AuthenticationTokenIssuanceFailed);
  }
}
