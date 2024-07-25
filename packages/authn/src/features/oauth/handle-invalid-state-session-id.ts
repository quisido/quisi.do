import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly searchParam: string;
  readonly state: Record<string, unknown>;
  readonly value: unknown;
}

export default function handleInvalidStateSessionId({
  searchParam,
  state,
  value,
}: Options): Response {
  if (typeof value === 'undefined') {
    emitPrivateMetric({
      name: MetricName.MissingStateSessionId,
      searchParam,
    });

    emitPublicMetric({
      keys: Object.keys(state).join(', '),
      name: MetricName.MissingStateSessionId,
    });

    return new ErrorResponse(ErrorCode.MissingStateSessionId);
  }

  emitPrivateMetric({
    name: MetricName.InvalidStateSessionId,
    value: JSON.stringify(value),
  });

  emitPublicMetric({
    name: MetricName.InvalidStateSessionId,
    type: typeof value,
  });

  return new ErrorResponse(ErrorCode.InvalidStateSessionId);
}
