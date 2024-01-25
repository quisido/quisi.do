/// <reference types="@cloudflare/workers-types" />
import StatusCode from '../constants/status-code.js';
import isKVNamespace from '../utils/is-kv-namespace.js';
import isObject from '../utils/is-object.js';
import mapHeadersToCookies from '../utils/map-headers-to-cookies.js';

/**
 * TODO:
 * Throttle, like once per half second?
 * Set-Cookie to expiry date.
 */

const authnIdIdMap: Map<string, null | string> = new Map();
const BASE = 10;

export default (async function fetch(
  request: Readonly<Request>,
  env: unknown,
): Promise<Response> {
  // Method
  if (request.method !== 'GET') {
    return new Response(
      JSON.stringify({
        message: 'Method not allowed.',
      }),
      {
        status: StatusCode.MethodNotAllowed,
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/json; charset=utf-8',
        }),
      },
    );
  }

  if (!isObject(env)) {
    return new Response(
      JSON.stringify({
        message: 'Expected an environment.',
      }),
      {
        status: StatusCode.InternalServerError,
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/json; charset=utf-8',
        }),
      },
    );
  }

  const { AUTHN_USER_IDS, COOKIE_DOMAIN } = env as Partial<
    Readonly<Record<string, unknown>>
  >;

  if (!isKVNamespace(AUTHN_USER_IDS)) {
    return new Response(
      JSON.stringify({
        message: 'Expected an authentication database.',
      }),
      {
        status: StatusCode.InternalServerError,
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/json; charset=utf-8',
        }),
      },
    );
  }

  if (typeof COOKIE_DOMAIN !== 'string') {
    return new Response(
      JSON.stringify({
        message: 'Expected a cookie domain.',
      }),
      {
        status: StatusCode.InternalServerError,
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/json; charset=utf-8',
        }),
      },
    );
  }

  const cookies: Partial<Record<string, string>> = mapHeadersToCookies(
    request.headers,
  );

  const { '__Secure-Authentication-ID': authnId } = cookies;
  if (typeof authnId === 'undefined') {
    return new Response('{}', {
      status: StatusCode.OK,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/json; charset=utf-8',
      }),
    });
  }

  const cachedId: null | string | undefined = authnIdIdMap.get(authnId);
  if (typeof cachedId === 'string') {
    return new Response(
      JSON.stringify({
        id: parseInt(cachedId, BASE),
      }),
      {
        status: StatusCode.OK,
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/json; charset=utf-8',
        }),
      },
    );
  }

  if (cachedId === null) {
    return new Response('{}', {
      status: StatusCode.OK,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/json; charset=utf-8',
      }),
    });
  }

  const id: string | null = await AUTHN_USER_IDS.get(authnId, 'text');
  authnIdIdMap.set(authnId, id);

  if (id === null) {
    return new Response('{}', {
      status: StatusCode.OK,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/json; charset=utf-8',
        'Set-Cookie': `__Secure-Authentication-ID=; domain=${COOKIE_DOMAIN}; max-age=0; partitioned; path=/; samesite=lax; secure`,
      }),
    });
  }

  return new Response(
    JSON.stringify({
      id: parseInt(id, BASE),
    }),
    {
      status: StatusCode.OK,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/json; charset=utf-8',
      }),
    },
  );
} satisfies ExportedHandlerFetchHandler);
