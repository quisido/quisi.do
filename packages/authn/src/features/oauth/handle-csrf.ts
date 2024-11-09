import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import ErrorResponse from '../error-response.js';

interface Options {
  readonly cookie: string;
  readonly state: string;
}

export default function handleCrossSiteRequestForgery(
  this: AuthnFetchHandler,
  { cookie, state }: Options,
): Response {
  this.emitPublicMetric(MetricName.CSRF);

  this.emitPrivateMetric(MetricName.CSRF, {
    cookie,
    state,
  });

  return new ErrorResponse(this, ErrorCode.CSRF);
}
