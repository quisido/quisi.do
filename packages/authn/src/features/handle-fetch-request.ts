import ErrorCode from '../constants/error-code.js';
import getRequestPathname from '../utils/get-request-pathname.js';
import isReservedPathname from '../utils/is-reserved-pathname.js';
import mapCauseToError from '../utils/map-cause-to-error.js';
import handleReservedPathname from './handle-reserved-pathname.js';
import handleThrottledRequest from './handle-throttled-request.js';
import handlePatreonFetchRequest from './patreon/handle-patreon-fetch-request.js';
import shouldThrottle from './should-throttle.js';

export default function handleFetchRequest(): Promise<Response> | Response {
  const pathname: string = getRequestPathname();

  // Static responses for reserved pathnames
  if (isReservedPathname(pathname)) {
    return handleReservedPathname(pathname);
  }

  // Throttling
  if (shouldThrottle()) {
    return handleThrottledRequest();
  }

  // Authenticate
  switch (pathname) {
    case '/patreon/':
      return handlePatreonFetchRequest();

    default: {
      throw mapCauseToError({
        code: ErrorCode.NotFound,
        publicData: pathname,
      });
    }
  }
}
