import handleAnalyticsFetchRequest from '../analytics/handle-analytics-fetch-request.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import handleOAuthPathname from '../oauth/handle-oauth-pathname.js';
import isOAuthPathname from '../oauth/is-oauth-pathname.js';
import handleStaticPathname from '../static/handle-static-pathname.js';
import isStaticPathname from '../static/is-static-pathname.js';
import handleWhoAmIFetchRequest from '../whoami/handle-whoami-fetch-request.js';
import handleNotFound from './handle-not-found.js';

export default async function handleFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  // Analytics
  if (this.requestPathname === '/analytics/') {
    return await handleAnalyticsFetchRequest.call(this);
  }

  // Who am I?
  if (this.requestPathname === '/whoami/') {
    return await handleWhoAmIFetchRequest.call(this);
  }

  // OAuth
  if (isOAuthPathname(this.requestPathname)) {
    return await handleOAuthPathname.call(this, this.requestPathname);
  }

  // Static
  if (isStaticPathname(this.requestPathname)) {
    return handleStaticPathname.call(this, this.requestPathname);
  }

  // Unknown
  return handleNotFound.call(this);
}
