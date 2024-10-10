import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleInvalidAuthnId(
  this: Worker,
  authnId: string,
): Response {
  this.emitPrivateMetric({ authnId, name: MetricName.InvalidAuthnId });
  this.emitPublicMetric({ name: MetricName.InvalidAuthnId });
  return new WhoAmIResponse(this, { code: WhoAmIResponseCode.InvalidAuthnId });
}
