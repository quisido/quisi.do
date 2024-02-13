import type ErrorCode from '../constants/error-code.js';
import StatusCode from '../constants/status-code.js';

export default function createErrorResponseInit(
  errorCode: ErrorCode,

  // We should always know the `returnHref`, but we fallback just in case.
  returnHref = 'https://quisi.do/',
): ResponseInit {
  const location = `${returnHref}#error:${errorCode}`;
  return {
    status: StatusCode.SeeOther,
    headers: new Headers({
      'Content-Location': location,
      Location: location,
    }),
  };
}
