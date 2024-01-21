import StatusCode from '../constants/status-code.js';
import createErrorResponse from './create-error-response.js';
import isCause from './is-cause.js';

export default function mapErrorToResponse(err: unknown): Response {
  // Unknown error
  if (!(err instanceof Error)) {
    return createErrorResponse(
      JSON.stringify(err),
      StatusCode.InternalServerError,
    );
  }

  // Unknown cause
  const { cause, message } = err;
  if (!isCause(cause)) {
    return createErrorResponse(message, StatusCode.InternalServerError);
  }

  // Known cause
  const { status } = cause;
  return createErrorResponse(message, status);
}
