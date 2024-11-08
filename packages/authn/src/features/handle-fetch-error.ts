/// <reference types="@cloudflare/workers-types" />
import { ErrorCode } from '@quisido/authn-shared';
import { mapToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import ErrorResponse from './error-response.js';

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
    return new ErrorResponse(this, err.cause, returnPath);
  }

  this.emitPublicMetric({ name: MetricName.UnknownError });
  this.logPrivateError(mapToError(err));
  return new ErrorResponse(this, ErrorCode.Unknown, returnPath);
}
