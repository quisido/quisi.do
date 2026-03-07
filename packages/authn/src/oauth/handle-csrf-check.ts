import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalOAuthErrorResponse from './fatal-oauth-error-response.js';

interface Options {
  readonly sessionId: string;
}

export default function handleCsrfCheck(
  this: AuthnFetchHandler,
  { sessionId }: Options,
): Response | null {
  if (this.sessionIdCookie === sessionId) {
    return null;
  }

  this.emitPublicMetric(MetricName.CSRF);
  this.emitPrivateMetric(MetricName.CSRF, {
    cookie: this.sessionIdCookie,
    state: sessionId,
  });

  return new FatalOAuthErrorResponse({
    code: ErrorCode.CSRF,
    host: this.host,
  });
}
