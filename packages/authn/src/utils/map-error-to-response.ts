import ErrorCode from '../constants/error-code.js';
import createErrorResponse from './create-error-response.js';
import isCause from './is-cause.js';

export default function mapErrorToResponse(err: unknown): Response {
  // Unknown error
  if (!(err instanceof Error)) {
    return createErrorResponse(ErrorCode.Unknown);
  }

  // Unknown cause
  const { cause } = err;
  if (!isCause(cause)) {
    return createErrorResponse(ErrorCode.Unknown);
  }

  // Known cause
  const { code, returnHref } = cause;
  return createErrorResponse(code, returnHref);
}
