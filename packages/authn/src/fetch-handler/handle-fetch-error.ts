/// <reference types="@cloudflare/workers-types" />
import { ErrorCode } from '@quisido/authn-shared';
import { mapToError } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalOAuthErrorResponse from '../oauth/fatal-oauth-error-response.js';
import FatalError from '../utils/fatal-error.js';

export default function handleFetchError(
  this: AuthnFetchHandler,
  err: unknown,
  returnPath?: string,
): Response {
  if (err instanceof FatalError) {
    /**
     *   We do not need to emit or log here, because the code that threw the
     * error should have already done so.
     */
    return new FatalOAuthErrorResponse({
      code: err.cause,
      host: this.host,
      returnPath,
    });
  }

  this.emitPublicMetric(MetricName.UnknownError);
  this.logError(mapToError(err));
  return new FatalOAuthErrorResponse({
    code: ErrorCode.Unknown,
    host: this.host,
    returnPath,
  });
}
