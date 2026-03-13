import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleCachedAuthnId(
  this: AuthnFetchHandler,
  userId: number,
): Response {
  this.setFiscalResponsibility(userId);
  this.emitPublicMetric(MetricName.CachedAuthnId);
  this.emitPrivateMetric(MetricName.CachedAuthnId, {
    userId,
  });

  return new WhoAmIResponse({
    accessControlAllowOrigin: this.accessControlAllowOrigin,
    code: WhoAmIResponseCode.Cached,
    id: userId,
  });
}
