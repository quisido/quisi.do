import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';

interface Options {
  readonly searchParam: string;
  readonly state: Record<string, unknown>;
  readonly value: unknown;
}

export default function handleInvalidStateSessionId(
  this: AuthnFetchHandler,
  { searchParam, state, value }: Options,
): Response {
  const { emitPrivateMetric, emitPublicMetric, FatalOAuthErrorResponse } = this;
  if (typeof value === 'undefined') {
    emitPrivateMetric(MetricName.MissingStateSessionId, {
      searchParam,
    });

    emitPublicMetric(MetricName.MissingStateSessionId, {
      keys: Object.keys(state).join(', '),
    });

    return new FatalOAuthErrorResponse(ErrorCode.MissingStateSessionId);
  }

  emitPrivateMetric(MetricName.InvalidStateSessionId, {
    value: JSON.stringify(value),
  });

  emitPublicMetric(MetricName.InvalidStateSessionId, {
    type: typeof value,
  });

  return new FatalOAuthErrorResponse(ErrorCode.InvalidStateSessionId);
}
