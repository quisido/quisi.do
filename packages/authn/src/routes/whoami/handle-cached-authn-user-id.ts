import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleCachedAuthnUserId(
  this: Worker,
  userId: number,
): Response {
  this.emitPrivateMetric({
    name: MetricName.CachedAuthnId,
    userId,
  });

  this.emitPublicMetric({
    name: MetricName.CachedAuthnId,
  });

  return new WhoAmIResponse(this, {
    code: WhoAmIResponseCode.Cached,
    id: userId,
  });
}
