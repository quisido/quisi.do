import type { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import mapLocationToFatalOAuthErrorResponseHeaders from './map-location-to-fatal-oauth-error-response-headers.js';

interface Options {
  readonly code: ErrorCode;
  readonly host: string;
  readonly returnPath: string;
}

export default function createFatalOAuthErrorResponseInit({
  code,
  host,
  returnPath,
}: Options): ResponseInit {
  const location = `https://${host}${returnPath}#authn:error=${code.toString()}`;
  return {
    headers: mapLocationToFatalOAuthErrorResponseHeaders(location),
    status: StatusCode.SeeOther,
  };
}
