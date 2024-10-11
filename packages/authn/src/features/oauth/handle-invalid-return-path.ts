import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly searchParam: string;
  readonly state: Readonly<Record<string, unknown>>;
  readonly value: unknown;
}

export default function handleInvalidReturnPath(
  this: Worker,
  { searchParam, state, value }: Options,
): Response {
  if (typeof value === 'undefined') {
    this.emitPrivateMetric({
      name: MetricName.MissingReturnPath,
      searchParam,
    });

    this.emitPublicMetric({
      keys: Object.keys(state).join(', '),
      name: MetricName.MissingReturnPath,
    });

    return new ErrorResponse(this, ErrorCode.MissingStateReturnPath);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidReturnPath,
    value: JSON.stringify(value),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidReturnPath,
    type: typeof value,
  });

  return new ErrorResponse(this, ErrorCode.InvalidStateReturnPath);
}
