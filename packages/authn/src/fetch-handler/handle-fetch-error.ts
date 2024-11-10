/// <reference types="@cloudflare/workers-types" />
import { ErrorCode } from '@quisido/authn-shared';
import { mapToError } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
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
    return new this.FatalOAuthErrorResponse(err.cause, returnPath);
  }

  this.emitPublicMetric(MetricName.UnknownError);
  this.logError(mapToError(err));
  return new this.FatalOAuthErrorResponse(ErrorCode.Unknown, returnPath);
}
