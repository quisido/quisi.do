import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleInvalidAuthnId(authnId: string): Response {
  emitPrivateMetric({ authnId, name: MetricName.InvalidAuthnId });
  emitPublicMetric({ name: MetricName.InvalidAuthnId });
  return new WhoAmIResponse({ code: WhoAmIResponseCode.InvalidAuthnId });
}
