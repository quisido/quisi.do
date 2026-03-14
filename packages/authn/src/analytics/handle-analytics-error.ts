import { StatusCode } from 'cloudflare-utils';
import AnalyticsResponseInit from './analytics-response-init.js';
import FatalError from '../utils/fatal-error.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { mapToError } from 'fmrs';
import UnknownAnalyticsErrorResponse from './unknown-analytics-error-response.js';

export default function handleAnalyticsError(
  this: AuthnFetchHandler,
  err: unknown,
): Response {
  if (err instanceof FatalError) {
    this.logError(err);
    return new Response(
      JSON.stringify({
        error: err.cause,
      }),
      new AnalyticsResponseInit(StatusCode.InternalServerError, {
        accessControlAllowOrigin: this.accessControlAllowOrigin,
      }),
    );
  }

  const error: Error = mapToError(err);
  this.logError(error);
  return new UnknownAnalyticsErrorResponse(this.accessControlAllowOrigin);
}
