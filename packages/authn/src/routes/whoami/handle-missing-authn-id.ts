import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleMissingAuthnId(
  this: AuthnFetchHandler,
): Response {
  this.emitPublicMetric(MetricName.MissingAuthnId);
  return new WhoAmIResponse(this, { code: WhoAmIResponseCode.MissingAuthnId });
}
