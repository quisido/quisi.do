import { getRequestPathname } from '../constants/worker.js';
import handleWhoAmIFetchRequest from '../routes/whoami/handle-whoami-fetch-request.js';
import handleInvalidPathname from './handle-invalid-pathname.js';
import handleAuthenticationPathname from './oauth/handle-authentication-pathname.js';
import isAuthenticationPathname from './oauth/is-authentication-pathname.js';
import handleStaticPathname from './static/handle-static-pathname.js';
import isStaticPathname from './static/is-static-pathname.js';

export default async function handleFetchRequest(): Promise<Response> {
  // Who am I?
  const pathname: string = getRequestPathname();
  if (pathname === '/whoami/') {
    return await handleWhoAmIFetchRequest();
  }

  // Static
  if (isStaticPathname(pathname)) {
    return handleStaticPathname(pathname);
  }

  // OAuth
  if (isAuthenticationPathname(pathname)) {
    return await handleAuthenticationPathname(pathname);
  }

  // Unknown
  return handleInvalidPathname(pathname);
}
