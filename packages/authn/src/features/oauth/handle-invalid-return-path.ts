import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly searchParam: string;
  readonly state: Readonly<Record<string, unknown>>;
  readonly value: unknown;
}

export default function handleInvalidReturnPath({
  searchParam,
  state,
  value,
}: Options): Response {
  if (typeof value === 'undefined') {
    emitPrivateMetric({
      name: MetricName.MissingReturnPath,
      searchParam,
    });

    emitPublicMetric({
      keys: Object.keys(state).join(', '),
      name: MetricName.MissingReturnPath,
    });

    return new ErrorResponse(ErrorCode.MissingStateReturnPath);
  }

  emitPrivateMetric({
    name: MetricName.InvalidReturnPath,
    value: JSON.stringify(value),
  });

  emitPublicMetric({
    name: MetricName.InvalidReturnPath,
    type: typeof value,
  });

  return new ErrorResponse(ErrorCode.InvalidStateReturnPath);
}
