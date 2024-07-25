import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric, logPrivateError } from '../constants/worker.js';
import ErrorResponseInit from './error-response-init.js';

export default function handleUnknownFetchErrorCause(
  err: Error,
  returnPath?: string | undefined,
): Response {
  logPrivateError(err);
  emitPublicMetric({
    code: ErrorCode.UnknownCause,
    name: MetricName.ErrorCode,
  });

  return new Response(
    null,
    new ErrorResponseInit(ErrorCode.UnknownCause, returnPath),
  );
}
