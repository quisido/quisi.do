import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../../authn-fetch-handler.js';
import { MetricName } from '../../constants/metric-name.js';
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
