import { ErrorCode } from '@quisido/authn-shared';
import handleAnalyticsFetchRequest from '../analytics/handle-analytics-fetch-request.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import handleOAuthPathname from '../oauth/handle-oauth-pathname.js';
import isOAuthPathname from '../oauth/is-oauth-pathname.js';
import handleStaticPathname from '../static/handle-static-pathname.js';
import isStaticPathname from '../static/is-static-pathname.js';
import handleWhoAmIFetchRequest from '../whoami/handle-whoami-fetch-request.js';

export default async function handleFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  // Analytics
  const { requestPathname } = this;
  if (requestPathname === '/analytics/') {
    return await handleAnalyticsFetchRequest.call(this);
  }

  // Who am I?
  if (requestPathname === '/whoami/') {
    return await handleWhoAmIFetchRequest.call(this);
  }

  // OAuth
  if (isOAuthPathname(requestPathname)) {
    return await handleOAuthPathname.call(this, requestPathname);
  }

  // Static
  if (isStaticPathname(requestPathname)) {
    return handleStaticPathname.call(this, requestPathname);
  }

  // Unknown
  const { emitPublicMetric, FatalOAuthErrorResponse } = this;
  emitPublicMetric(MetricName.NotFound, { pathname: requestPathname });
  return new FatalOAuthErrorResponse(ErrorCode.NotFound);
}
