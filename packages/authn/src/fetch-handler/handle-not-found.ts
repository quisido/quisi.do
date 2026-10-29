import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalOAuthErrorResponse from '../oauth/fatal-oauth-error-response.js';

export default function handleNotFound(this: AuthnFetchHandler): Response {
  this.emitPublicMetric(MetricName.NotFound, {
    pathname: this.requestPathname,
  });

  return new FatalOAuthErrorResponse({
    code: ErrorCode.NotFound,
    host: this.host,
  });
}
