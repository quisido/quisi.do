import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../../authn-fetch-handler.js';
import { MetricName } from '../../constants/metric-name.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleMissingAuthnId(
  this: AuthnFetchHandler,
): Response {
  this.emitPublicMetric(MetricName.MissingAuthnId);
  return new WhoAmIResponse(this, { code: WhoAmIResponseCode.MissingAuthnId });
}
