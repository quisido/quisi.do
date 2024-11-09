import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleInvalidAuthnId(
  this: AuthnFetchHandler,
  authnId: string,
): Response {
  this.emitPublicMetric(MetricName.InvalidAuthnId);
  this.emitPrivateMetric(MetricName.InvalidAuthnId, {
    authnId,
  });
  return new WhoAmIResponse(this, { code: WhoAmIResponseCode.InvalidAuthnId });
}
