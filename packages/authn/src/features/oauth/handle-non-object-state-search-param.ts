import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly type: string;
  readonly value: string;
}

export default function handleNonObjectStateSearchParam({
  type,
  value,
}: Options): Response {
  emitPrivateMetric({
    name: MetricName.NonObjectState,
    value,
  });

  emitPublicMetric({
    name: MetricName.NonObjectState,
    type,
  });

  return new ErrorResponse(ErrorCode.NonObjectState);
}
