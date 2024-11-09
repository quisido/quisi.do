import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import ErrorResponse from './error-response.js';

export default function handleInvalidPathname(
  this: AuthnFetchHandler,
  pathname: string,
): Response {
  this.emitPublicMetric(MetricName.NotFound, {
    pathname,
  });

  return new ErrorResponse(this, ErrorCode.NotFound);
}
