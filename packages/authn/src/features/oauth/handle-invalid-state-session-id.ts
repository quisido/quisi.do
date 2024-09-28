import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly searchParam: string;
  readonly state: Record<string, unknown>;
  readonly value: unknown;
}

export default function handleInvalidStateSessionId(this: Worker,{
  searchParam,
  state,
  value,
}: Options): Response {
  if (typeof value === 'undefined') {
    this.emitPrivateMetric({
      name: MetricName.MissingStateSessionId,
      searchParam,
    });

    this.emitPublicMetric({
      keys: Object.keys(state).join(', '),
      name: MetricName.MissingStateSessionId,
    });

    return new ErrorResponse(this, ErrorCode.MissingStateSessionId);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidStateSessionId,
    value: JSON.stringify(value),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidStateSessionId,
    type: typeof value,
  });

  return new ErrorResponse(this, ErrorCode.InvalidStateSessionId);
}
