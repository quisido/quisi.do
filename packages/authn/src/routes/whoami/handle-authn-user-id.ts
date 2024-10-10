import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import { setAuthnUserIdInMemory } from '../../features/authn-user-id.js';
import handleInvalidAuthnId from './handle-invalid-authn-id.js';
import WhoAmIResponse from './whoami-response.js';

const BASE = 10;

export default function handleAuthnUserId(
  this: Worker,
  authnId: string,
  userIdStr: string | null,
): Response {
  /**
   *   Authentication is eventually consistent. We don't want to delete the
   * invalid authentication cookie in case the ID exists in the future.
   */
  if (userIdStr === null) {
    return handleInvalidAuthnId.call(this, authnId);
  }

  // User found! 🎉
  const userId: number = parseInt(userIdStr, BASE);
  setAuthnUserIdInMemory.call(this, authnId, userId);

  this.emitPrivateMetric({
    authnId,
    name: MetricName.UncachedAuthnId,
    userId,
  });

  this.emitPublicMetric({
    name: MetricName.UncachedAuthnId,
  });

  return new WhoAmIResponse(this, {
    code: WhoAmIResponseCode.Uncached,
    id: userId,
  });
}
