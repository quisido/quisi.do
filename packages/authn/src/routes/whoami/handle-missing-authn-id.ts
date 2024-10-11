import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleMissingAuthnId(this: Worker): Response {
  this.emitPublicMetric({ name: MetricName.MissingAuthnId });
  return new WhoAmIResponse(this, { code: WhoAmIResponseCode.MissingAuthnId });
}
