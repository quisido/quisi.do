import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly searchParam: string;
  readonly state: Readonly<Record<string, unknown>>;
  readonly value: unknown;
}

export default function handleInvalidReturnPath(
  this: AuthnFetchHandler,
  { searchParam, state, value }: Options,
): Response {
  if (typeof value === 'undefined') {
    this.emitPrivateMetric(MetricName.MissingReturnPath, {
      searchParam,
    });

    this.emitPublicMetric(MetricName.MissingReturnPath, {
      keys: Object.keys(state).join(', '),
    });

    return new ErrorResponse(this, ErrorCode.MissingStateReturnPath);
  }

  this.emitPrivateMetric(MetricName.InvalidReturnPath, {
    value: JSON.stringify(value),
  });

  this.emitPublicMetric(MetricName.InvalidReturnPath, {
    type: typeof value,
  });

  return new ErrorResponse(this, ErrorCode.InvalidStateReturnPath);
}
