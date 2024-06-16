import { ErrorCode } from '@quisido/authn-shared';
import isAuthenticationPathname from '../utils/is-authentication-pathname.js';
import isStaticPathname from '../utils/is-static-pathname.js';
import mapCauseToError from '../utils/map-cause-to-error.js';
import getRequestPathname from './get-request-pathname.js';
import handleAuthenticationPathname from './handle-authentication-pathname.js';
import handleStaticPathname from './handle-static-pathname.js';
import handleThrottledRequest from './handle-throttled-request.js';
import setReturnHref from './set-return-href.js';
import shouldThrottle from './should-throttle.js';
import handleWhoAmIFetchRequest from './whoami/handle-whoami-fetch-request.js';

export default async function handleFetchRequest(): Promise<Response> {
  const pathname: string = getRequestPathname();

  if (pathname === '/whoami/') {
    return await handleWhoAmIFetchRequest();
  }

  // Static responses
  if (isStaticPathname(pathname)) {
    return handleStaticPathname(pathname);
  }

  // Unknown pathname
  if (!isAuthenticationPathname(pathname)) {
    throw mapCauseToError({
      code: ErrorCode.NotFound,
      publicData: pathname,
    });
  }

  // `returnHref` can only exist for OAuth pathnames.
  setReturnHref();

  // Throttle
  if (shouldThrottle()) {
    return handleThrottledRequest();
  }

  return await handleAuthenticationPathname(pathname);
}
