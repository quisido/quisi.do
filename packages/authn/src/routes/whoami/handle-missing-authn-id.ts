import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPublicMetric } from '../../constants/worker.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleMissingAuthnId(): Response {
  emitPublicMetric({ name: MetricName.MissingAuthnId });
  return new WhoAmIResponse({ code: WhoAmIResponseCode.MissingAuthnId });
}
