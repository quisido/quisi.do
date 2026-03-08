import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { mapToError } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import FatalError from '../utils/fatal-error.js';
import AnalyticsResponseInit from './analytics-response-init.js';

export default function createAnalyticsErrorResponse(
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
  return new Response(
    JSON.stringify({
      error: ErrorCode.Unknown,
    }),
    new AnalyticsResponseInit(StatusCode.InternalServerError, {
      accessControlAllowOrigin: this.accessControlAllowOrigin,
    }),
  );
}
