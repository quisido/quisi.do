import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { mapToError } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import FatalError from '../utils/fatal-error.js';
import WhoAmIResponseInit from './whoami-response-init.js';

export default function createWhoAmIErrorResponse(
  this: AuthnFetchHandler,
  err: unknown,
): Response {
  const init = new WhoAmIResponseInit(StatusCode.InternalServerError, {
    accessControlAllowOrigin: this.accessControlAllowOrigin,
  });

  if (err instanceof FatalError) {
    this.logError(err);
    return new Response(JSON.stringify({ error: err.cause }), init);
  }

  const error: Error = mapToError(err);
  this.logError(error);
  return new Response(JSON.stringify({ error: ErrorCode.Unknown }), init);
}
