import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly searchParam: string;
  readonly state: Record<string, unknown>;
  readonly value: unknown;
}

export default function handleInvalidStateSessionId(
  this: AuthnFetchHandler,
  { searchParam, state, value }: Options,
): Response {
  if (typeof value === 'undefined') {
    this.emitPrivateMetric(MetricName.MissingStateSessionId, {
      searchParam,
    });

    this.emitPublicMetric(MetricName.MissingStateSessionId, {
      keys: Object.keys(state).join(', '),
    });

    return new ErrorResponse(this, ErrorCode.MissingStateSessionId);
  }

  this.emitPrivateMetric(MetricName.InvalidStateSessionId, {
    value: JSON.stringify(value),
  });

  this.emitPublicMetric(MetricName.InvalidStateSessionId, {
    type: typeof value,
  });

  return new ErrorResponse(this, ErrorCode.InvalidStateSessionId);
}
