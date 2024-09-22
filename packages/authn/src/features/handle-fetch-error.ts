/// <reference types="@cloudflare/workers-types" />
import { ErrorCode } from '@quisido/authn-shared';
import { mapUnknownToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric, logPrivateError } from '../constants/worker.js';
import FatalError from '../utils/fatal-error.js';
import ErrorResponse from './error-response.js';

export default function handleFetchError(
  err: unknown,
  returnPath?: string | undefined,
): Response {
  if (err instanceof FatalError) {
    /**
     *   We do not need to emit or log here, because the code that threw the
     * error should have already done so.
     */
    return new ErrorResponse(err.cause, returnPath);
  }

  console.log(err);
  emitPublicMetric({ name: MetricName.UnknownError });
  logPrivateError(mapUnknownToError(err));
  return new ErrorResponse(ErrorCode.Unknown, returnPath);
}
