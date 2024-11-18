import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalOAuthErrorResponse from './fatal-oauth-error-response.js';

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

    return new FatalOAuthErrorResponse({
      code: ErrorCode.MissingStateReturnPath,
      host: this.host,
    });
  }

  this.emitPrivateMetric(MetricName.InvalidReturnPath, {
    value: JSON.stringify(value),
  });

  this.emitPublicMetric(MetricName.InvalidReturnPath, {
    type: typeof value,
  });

  return new FatalOAuthErrorResponse({
    code: ErrorCode.InvalidStateReturnPath,
    host: this.host,
  });
}
