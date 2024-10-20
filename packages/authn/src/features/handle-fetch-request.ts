import type Worker from '@quisido/worker';
import handleWhoAmIFetchRequest from '../routes/whoami/handle-whoami-fetch-request.js';
import handleInvalidPathname from './handle-invalid-pathname.js';
import handleAuthenticationPathname from './oauth/handle-authentication-pathname.js';
import isAuthenticationPathname from './oauth/is-authentication-pathname.js';
import handleStaticPathname from './static/handle-static-pathname.js';
import isStaticPathname from './static/is-static-pathname.js';

export default async function handleFetchRequest(
  this: Worker,
): Promise<Response> {
  // Who am I?
  const pathname: string = this.getRequestPathname();
  if (pathname === '/whoami/') {
    return await handleWhoAmIFetchRequest.call(this);
  }

  // Static
  if (isStaticPathname(pathname)) {
    return handleStaticPathname.call(this, pathname);
  }

  // OAuth
  if (isAuthenticationPathname(pathname)) {
    return await handleAuthenticationPathname.call(this, pathname);
  }

  // Unknown
  return handleInvalidPathname.call(this, pathname);
}
