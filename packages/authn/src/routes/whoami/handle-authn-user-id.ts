import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import { setAuthnUserIdInMemory } from '../../features/authn-user-id.js';
import handleInvalidAuthnId from './handle-invalid-authn-id.js';
import WhoAmIResponse from './whoami-response.js';

const BASE = 10;

export default function handleAuthnUserId(
  authnId: string,
  userIdStr: string | null,
): Response {
  /**
   *   Authentication is eventually consistent. We don't want to delete the
   * invalid authentication cookie in case the ID exists in the future.
   */
  if (userIdStr === null) {
    return handleInvalidAuthnId(authnId);
  }

  // User found! 🎉
  const userId: number = parseInt(userIdStr, BASE);
  setAuthnUserIdInMemory(authnId, userId);

  emitPrivateMetric({
    authnId,
    name: MetricName.UncachedAuthnId,
    userId,
  });

  emitPublicMetric({
    name: MetricName.UncachedAuthnId,
  });

  return new WhoAmIResponse({
    code: WhoAmIResponseCode.Uncached,
    id: userId,
  });
}
