import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../../authn-fetch-handler.js';
import { MetricName } from '../../constants/metric-name.js';
import handleInvalidAuthnId from './handle-invalid-authn-id.js';
import WhoAmIResponse from './whoami-response.js';

const BASE = 10;

export default function handleAuthnUserId(
  this: AuthnFetchHandler,
  authnIdCookie: string,
  userIdStr: string | null,
): Response {
  /**
   *   Authentication is eventually consistent. We don't want to delete the
   * invalid authentication cookie in case the ID exists in the future.
   */
  if (userIdStr === null) {
    return handleInvalidAuthnId.call(this, authnIdCookie);
  }

  // User found! 🎉
  const userId: number = parseInt(userIdStr, BASE);
  this.setAuthnUserIdInMemory(authnIdCookie, userId);

  this.emitPublicMetric(MetricName.UncachedAuthnId);
  this.emitPrivateMetric(MetricName.UncachedAuthnId, {
    authnIdCookie,
    userId,
  });

  return new WhoAmIResponse(this, {
    code: WhoAmIResponseCode.Uncached,
    id: userId,
  });
}
