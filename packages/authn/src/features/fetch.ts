/// <reference types="@cloudflare/workers-types" />
import Environment from '../constants/environment.js';
import {
  FAVICON_RESPONSE_BODY,
  FAVICON_RESPONSE_INIT,
} from '../constants/favicon-response.js';
import StatusCode from '../constants/status-code.js';
import type State from '../types/state.js';
import assert from '../utils/assert.js';
import createError from '../utils/create-error.js';
import createPatreonResponse from '../utils/create-patreon-response.js';
import isEnvironment from '../utils/is-environment.js';
import mapErrorToResponse from '../utils/map-error-to-response.js';
import mapRequestToState from '../utils/map-request-to-state.js';
import mapRequestSearchParamsToCode from '../utils/map-request-search-params-to-code.js';
import throttle from './throttle.js';

export default async function fetch(
  request: Readonly<Request>,
  {
    ENV,
    PATREON_OAUTH_CLIENT_ID,
    PATREON_OAUTH_CLIENT_SECRET,
    PATREON_OAUTH_HOST,
    PATREON_OAUTH_REDIRECT_URI,
  }: Readonly<Record<string, unknown>>,
): Promise<Response> {
  try {
    // Method
    assert(
      request.method === 'GET' || request.method === 'POST',
      'Method not allowed.',
      StatusCode.MethodNotAllowed,
      request.method,
    );

    // Pathname
    const {
      pathname: requestPathname,
      searchParams: requestSearchParams,
    }: URL = new URL(request.url);
    if (requestPathname === '/favicon.ico') {
      return new Response(FAVICON_RESPONSE_BODY, FAVICON_RESPONSE_INIT);
    }

    // Throttle (deployed environments)
    assert(
      isEnvironment(ENV),
      'Expected an environment to be provided.',
      StatusCode.InternalServerError,
      ENV,
    );

    if (ENV !== Environment.Development) {
      throttle(request);
    }

    // Patreon
    const state: State = mapRequestToState(request);
    if (requestPathname === '/patreon/') {
      const code: string = mapRequestSearchParamsToCode(requestSearchParams);
      return await createPatreonResponse(
        PATREON_OAUTH_HOST,
        PATREON_OAUTH_CLIENT_ID,
        PATREON_OAUTH_CLIENT_SECRET,
        PATREON_OAUTH_REDIRECT_URI,
        code,
      );
    }

    throw createError('Not found.', StatusCode.NotFound, requestPathname);
  } catch (err: unknown) {
    // Error `data` gets logged here.
    console.error(err);
    return mapErrorToResponse(err);
  }
}
