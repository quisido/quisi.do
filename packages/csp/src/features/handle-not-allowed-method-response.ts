import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric } from '../constants/worker.js';
import MethodNotAllowedResponse from '../utils/method-not-allowed-response.js';

export default function handleNotAllowedMethodResponse(
  method: string,
): Response {
  emitPublicMetric({
    method,
    name: MetricName.MethodNotAllowed,
  });

  return new MethodNotAllowedResponse();
}
