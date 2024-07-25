import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleCachedAuthnUserId(userId: number): Response {
  emitPrivateMetric({
    name: MetricName.CachedAuthnId,
    userId,
  });

  emitPublicMetric({
    name: MetricName.CachedAuthnId,
  });

  return new WhoAmIResponse({
    code: WhoAmIResponseCode.Cached,
    id: userId,
  });
}
