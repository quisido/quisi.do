import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import ErrorResponse from '../error-response.js';

export default function handleNonJsonStateSearchParam(value: string): Response {
  emitPublicMetric({ name: MetricName.NonJsonStateSearchParam });
  emitPrivateMetric({
    name: MetricName.NonJsonStateSearchParam,
    value,
  });

  return new ErrorResponse(ErrorCode.NonJsonState);
}
