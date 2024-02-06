import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
import StatusCode from '../constants/status-code.js';
import createError from './create-error.js';
import isCause from './is-cause.js';

export default function withReturnHref(
  err: unknown,
  returnHref: string,
  emit: (
    name: MetricName,
    value?: null | number,
    dimensions?: Readonly<Record<string, number | string>>,
  ) => void,
): Error {
  // Unknown error
  if (!(err instanceof Error)) {
    return createError(
      JSON.stringify(err),
      ErrorCode.UnknownErrorWithReturnHref,
      StatusCode.InternalServerError,
      undefined,
      returnHref,
    );
  }

  // Unknown cause
  const { cause, message } = err;
  if (!isCause(cause)) {
    return createError(
      message,
      ErrorCode.UnknownCauseWithReturnHref,
      StatusCode.InternalServerError,
      cause,
      returnHref,
    );
  }

  // Known cause
  const { code, data, returnHref: existingReturnHref, status } = cause;

  /**
   *   We should never have an existing `returnHref` prior to executing this
   * function. If we do, it's undefined behavior. We don't need to crash the
   * app by throwing, but we do want to track it.
   */
  if (typeof existingReturnHref !== 'undefined') {
    emit(MetricName.ExistingReturnHref, null, {
      existingReturnHref,
      message,
      returnHref,
      status,
    });
  }

  return createError(message, code, status, data, returnHref);
}
