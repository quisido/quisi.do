import handleWhoAmIFetchRequest from '../routes/whoami/handle-whoami-fetch-request.js';
import handleAnalyticsFetchRequest from './analytics/handle-analytics-fetch-request.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import handleInvalidPathname from './handle-invalid-pathname.js';
import handleAuthenticationPathname from './oauth/handle-authentication-pathname.js';
import isAuthenticationPathname from './oauth/is-authentication-pathname.js';
import handleStaticPathname from './static/handle-static-pathname.js';
import isStaticPathname from './static/is-static-pathname.js';

export default async function handleFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  const { requestPathname } = this;

  // Analytics
  if (requestPathname === '/analytics/') {
    return await handleAnalyticsFetchRequest.call(this);
  }

  // Who am I?
  if (requestPathname === '/whoami/') {
    return await handleWhoAmIFetchRequest.call(this);
  }

  // Static
  if (isStaticPathname(requestPathname)) {
    return handleStaticPathname.call(this, requestPathname);
  }

  // OAuth
  if (isAuthenticationPathname(requestPathname)) {
    return await handleAuthenticationPathname.call(this, requestPathname);
  }

  // Unknown
  return handleInvalidPathname.call(this, requestPathname);
}
