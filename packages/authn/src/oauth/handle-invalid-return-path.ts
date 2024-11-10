import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';

interface Options {
  readonly searchParam: string;
  readonly state: Readonly<Record<string, unknown>>;
  readonly value: unknown;
}

export default function handleInvalidReturnPath(
  this: AuthnFetchHandler,
  { searchParam, state, value }: Options,
): Response {
  const { emitPrivateMetric, emitPublicMetric, FatalOAuthErrorResponse } = this;
  if (typeof value === 'undefined') {
    emitPrivateMetric(MetricName.MissingReturnPath, {
      searchParam,
    });

    emitPublicMetric(MetricName.MissingReturnPath, {
      keys: Object.keys(state).join(', '),
    });

    return new FatalOAuthErrorResponse(ErrorCode.MissingStateReturnPath);
  }

  emitPrivateMetric(MetricName.InvalidReturnPath, {
    value: JSON.stringify(value),
  });

  emitPublicMetric(MetricName.InvalidReturnPath, {
    type: typeof value,
  });

  return new FatalOAuthErrorResponse(ErrorCode.InvalidStateReturnPath);
}
