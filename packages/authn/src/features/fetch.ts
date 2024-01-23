/// <reference types="@cloudflare/workers-types" />
import Environment from '../constants/environment.js';
import OAuthProvider from '../constants/oauth-provider.js';
import {
  FAVICON_RESPONSE_BODY,
  FAVICON_RESPONSE_INIT,
  ROBOTS_RESPONSE_BODY,
  ROBOTS_RESPONSE_INIT,
} from '../constants/responses.js';
import StatusCode from '../constants/status-code.js';
import { MILLISECONDS_PER_SECOND, SECONDS_PER_DAY } from '../constants/time.js';
import type OAuthUser from '../types/oauth-user.js';
import type State from '../types/state.js';
import assert from '../utils/assert.js';
import createError from '../utils/create-error.js';
import getUserId from '../utils/get-user-id.js';
import getPatreonUser from '../utils/get-patreon-user.js';
import isEnvironment from '../utils/is-environment.js';
import mapErrorToResponse from '../utils/map-error-to-response.js';
import mapRequestToState from '../utils/map-request-to-state.js';
import mapRequestSearchParamsToCode from '../utils/map-request-search-params-to-code.js';
import throttle from './throttle.js';
import isObject from '../utils/is-object.js';
import createAuthenticationId from '../utils/create-authentication-id.js';
import isKVNamespace from '../utils/is-kv-namespace.js';
import createUser from '../utils/create-user.js';

export default (async function fetch(
  request: Readonly<Request>,
  env: unknown,
  ctx: ExecutionContext,
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
    if (requestPathname === '/robots.txt') {
      return new Response(ROBOTS_RESPONSE_BODY, ROBOTS_RESPONSE_INIT);
    }

    assert(
      isObject(env),
      'Expected an environment.',
      StatusCode.InternalServerError,
      env,
    );

    const {
      AUTHN_USER_IDS,
      AUTHN_USERS,
      ENV,
      PATREON_OAUTH_CLIENT_ID,
      PATREON_OAUTH_CLIENT_SECRET,
      PATREON_OAUTH_HOST,
      PATREON_OAUTH_REDIRECT_URI,
    } = env as Readonly<Record<string, unknown>>;

    assert(
      isEnvironment(ENV),
      'Expected an environment to be provided.',
      StatusCode.InternalServerError,
      ENV,
    );

    // Throttle (deployed environments)
    if (ENV !== Environment.Development) {
      throttle(request);
    }

    assert(
      isKVNamespace(AUTHN_USER_IDS),
      'Expected an authentication database.',
      StatusCode.InternalServerError,
    );

    assert(
      AUTHN_USERS instanceof D1Database,
      'Expected an authentication database.',
      StatusCode.InternalServerError,
    );

    assert(
      typeof PATREON_OAUTH_CLIENT_ID === 'string',
      'Expected a Patreon client ID.',
      StatusCode.InternalServerError,
    );

    assert(
      typeof PATREON_OAUTH_CLIENT_SECRET === 'string',
      'Expected a Patreon client secret.',
      StatusCode.InternalServerError,
    );

    assert(
      typeof PATREON_OAUTH_HOST === 'string',
      'Expected a Patreon OAuth host.',
      StatusCode.InternalServerError,
    );

    assert(
      typeof PATREON_OAUTH_REDIRECT_URI === 'string',
      'Expected a Patreon redirect URI.',
      StatusCode.InternalServerError,
    );

    // Patreon
    const { returnHref }: State = mapRequestToState(request);
    const getOAuthUser = async (): Promise<
      OAuthUser & Record<'provider', OAuthProvider>
    > => {
      switch (requestPathname) {
        case '/patreon/': {
          const code: string =
            mapRequestSearchParamsToCode(requestSearchParams);
          return {
            provider: OAuthProvider.Patreon,
            ...(await getPatreonUser(
              PATREON_OAUTH_HOST,
              PATREON_OAUTH_CLIENT_ID,
              PATREON_OAUTH_CLIENT_SECRET,
              PATREON_OAUTH_REDIRECT_URI,
              code,
            )),
          };
        }

        default:
          throw createError('Not found.', StatusCode.NotFound, requestPathname);
      }
    };

    // Validate the authentication.
    const { provider: oAuthProvider, ...oAuthUser } = await getOAuthUser();

    // Create an authentication ID.
    const authnId: string = createAuthenticationId();
    const optionalPromise: Promise<void> = getUserId(
      AUTHN_USERS,
      oAuthProvider,
      oAuthUser.id,
    )
      .then(async (userId: number | null): Promise<number> => {
        if (userId !== null) {
          return userId;
        }
        return createUser(AUTHN_USERS, oAuthProvider, oAuthUser, ctx);
      })
      .then(async (userId: number): Promise<void> => {
        const nowSeconds: number = Math.floor(
          Date.now() / MILLISECONDS_PER_SECOND,
        );

        return AUTHN_USER_IDS.put(authnId, userId.toString(), {
          expiration: nowSeconds + SECONDS_PER_DAY,
          expirationTtl: SECONDS_PER_DAY,
        });
      });

    /**
     *   TODO: Emit an A/B test duration metric for `await` and `waitUntil` in
     * production.
     */
    if (ENV === Environment.Development) {
      await optionalPromise;
    } else {
      ctx.waitUntil(optionalPromise.catch(console.error));
    }

    return new Response(null, {
      status: StatusCode.Created,
      headers: new Headers({
        Location: returnHref,
        'Set-Cookie': `__Secure-Authentication-ID="${authnId}"; domain=localhost; max-age=${SECONDS_PER_DAY}; partitioned; path=/; samesite=lax; secure`,
      }),
    });
  } catch (err: unknown) {
    // Error `data` gets logged here.
    console.error(err);
    return mapErrorToResponse(err);
  }
} satisfies ExportedHandlerFetchHandler);
