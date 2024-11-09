import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleCachedAuthnUserId(
  this: AuthnFetchHandler,
  userId: number,
): Response {
  this.emitPublicMetric(MetricName.CachedAuthnId);
  this.emitPrivateMetric(MetricName.CachedAuthnId, {
    userId,
  });

  return new WhoAmIResponse(this, {
    code: WhoAmIResponseCode.Cached,
    id: userId,
  });
}
