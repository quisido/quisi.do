import MetricName from '../constants/metric-name.js';
import StatusCode from '../constants/status-code.js';
import isCause from './is-cause.js';

export default function emitError(
  emit: (
    name: MetricName,
    value?: null | number,
    dimensions?: Readonly<Record<string, number | string>>,
  ) => void,
  err: unknown,
): void {
  // Unknown error
  if (!(err instanceof Error)) {
    emit(MetricName.UnknownErrorResponse, StatusCode.InternalServerError, {
      message: JSON.stringify(err),
    });
    return;
  }

  // Unknown cause
  const { cause, message } = err;
  if (!isCause(cause)) {
    emit(MetricName.UnknownErrorCauseResponse, StatusCode.InternalServerError, {
      cause: JSON.stringify(cause),
      message,
    });
    return;
  }

  // Known cause
  const { data, returnHref, status } = cause;
  emit(MetricName.ErrorResponse, status, {
    data: JSON.stringify(data),
    message,
    returnHref: returnHref ?? '',
  });
}
