/// <reference types="@cloudflare/workers-types" />
import { HEADERS_INIT } from '../constants/headers-init.js';
import ResponseCode from '../constants/response-code.js';
import {
  FAVICON_RESPONSE_BODY,
  FAVICON_RESPONSE_INIT,
  ROBOTS_RESPONSE_BODY,
  ROBOTS_RESPONSE_INIT,
} from '../constants/responses.js';
import StatusCode from '../constants/status-code.js';
import { MILLISECONDS_PER_SECOND } from '../constants/time.js';
import createThrottler from '../utils/create-throttler.js';
import isKVNamespace from '../utils/is-kv-namespace.js';
import isObject from '../utils/is-object.js';
import mapHeadersToCookies from '../utils/map-headers-to-cookies.js';

/**
 * TODO:
 * Throttle, like once per half second?
 * Set-Cookie to expiry date.
 */

const authnIdIdMap: Map<string, string> = new Map();
const BASE = 10;
const throttleCacheMiss = createThrottler();

const JSON_HEADERS_INIT: HeadersInit = {
  ...HEADERS_INIT,
  'Content-Type': 'text/json; charset=utf-8',
};

export default (async function fetch(
  request: Readonly<Request>,
  env: unknown,
): Promise<Response> {
  // Pathname
  const { pathname: requestPathname }: URL = new URL(request.url);
  if (requestPathname === '/favicon.ico') {
    return new Response(FAVICON_RESPONSE_BODY, FAVICON_RESPONSE_INIT);
  }
  if (requestPathname === '/robots.txt') {
    return new Response(ROBOTS_RESPONSE_BODY, ROBOTS_RESPONSE_INIT);
  }

  const { AUTHN_USER_IDS, COOKIE_DOMAIN, ENVIRONMENT_NAME } = env as Partial<
    Readonly<Record<string, unknown>>
  >;

  if (typeof COOKIE_DOMAIN !== 'string') {
    return new Response(
      JSON.stringify({
        code: ResponseCode.MissingCookieDomain,
        message: 'A cookie domain was not specified.',
      }),
      {
        headers: new Headers(JSON_HEADERS_INIT),
        status: StatusCode.InternalServerError,
      },
    );
  }

  const ACCESS_CONTROL_ALLOW_ORIGIN = `https://${
    COOKIE_DOMAIN === 'localhost' ? 'localhost:3000' : COOKIE_DOMAIN
  }`;

  const headers: Headers = new Headers({
    ...JSON_HEADERS_INIT,
    'Access-Control-Allow-Origin': ACCESS_CONTROL_ALLOW_ORIGIN,
  });

  if (!isKVNamespace(AUTHN_USER_IDS)) {
    return new Response(
      JSON.stringify({
        code: ResponseCode.MissingAuthenticationDatabase,
        message: 'The authentication database was not provided.',
      }),
      {
        headers,
        status: StatusCode.InternalServerError,
      },
    );
  }

  if (typeof ENVIRONMENT_NAME !== 'string') {
    return new Response(
      JSON.stringify({
        code: ResponseCode.MissingEnvironmentName,
        message: 'The environment could not be identified.',
      }),
      {
        headers,
        status: StatusCode.InternalServerError,
      },
    );
  }

  // Options
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers,
      status: StatusCode.OK,
    });
  }


  if (!isObject(env)) {
    return new Response(
      JSON.stringify({
        code: ResponseCode.MissingEnvironment,
        message: 'The environment is missing.',
      }),
      {
        headers,
        status: StatusCode.InternalServerError,
      },
    );
  }

  const cookies: Partial<Record<string, string>> = mapHeadersToCookies(
    request.headers,
  );

  const { '__Secure-Authentication-ID': authnId } = cookies;
  if (typeof authnId === 'undefined') {
    return new Response(
      JSON.stringify({
        code: ResponseCode.MissingAuthenticationId,
        message: 'You are not authenticated.',
      }),
      {
        headers,
        status: StatusCode.OK,
      },
    );
  }

  const cachedId: string | undefined = authnIdIdMap.get(authnId);
  if (typeof cachedId === 'string') {
    return new Response(
      JSON.stringify({
        code: ResponseCode.Cached,
        id: parseInt(cachedId, BASE),
      }),
      {
        headers,
        status: StatusCode.OK,
      },
    );
  }

  const ip: string | null =
    ENVIRONMENT_NAME === 'development'
      ? '127.0.0.1'
      : request.headers.get('CF-Connecting-IP');
  if (ip === null) {
    return new Response(
      JSON.stringify({
        code: ResponseCode.MissingIP,
        message: 'You could not be identified.',
      }),
      {
        headers,
        status: StatusCode.BadRequest,
      },
    );
  }

  if (throttleCacheMiss(ip, MILLISECONDS_PER_SECOND)) {
    return new Response(
      JSON.stringify({
        code: ResponseCode.ThrottleCacheMiss,
        message: 'Too many requests.',
      }),
      {
        headers,
        status: StatusCode.TooManyRequests,
      },
    );
  }

  const id: string | null = await AUTHN_USER_IDS.get(authnId, 'text');

  // Logins are eventually consistent. Maybe it will exist next time.
  if (id === null) {
    return new Response(
      JSON.stringify({
        code: ResponseCode.InvalidAuthenticationId,
        message: 'The authentication ID is invalid.',
      }),
      {
        headers,
        status: StatusCode.OK,
      },
    );
  }

  return new Response(
    JSON.stringify({
      code: ResponseCode.Uncached,
      id: parseInt(id, BASE),
    }),
    {
      headers,
      status: StatusCode.OK,
    },
  );
} satisfies ExportedHandlerFetchHandler);
