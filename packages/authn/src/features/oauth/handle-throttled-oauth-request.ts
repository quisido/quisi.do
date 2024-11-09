import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly ip: string;
  readonly returnPath: string;
}

export default function handleThrottledOAuthRequest(
  this: AuthnFetchHandler,
  { ip, returnPath }: Options,
): Response {
  this.emitPublicMetric(MetricName.OAuthThrottled);
  this.emitPrivateMetric(MetricName.OAuthThrottled, {
    ip,
  });

  return new ErrorResponse(this, ErrorCode.TooManyRequests, returnPath);
}
