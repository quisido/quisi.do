/// <reference types="@cloudflare/workers-types" />
import { parse } from 'cookie';
import Environment from '../constants/environment.js';
import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
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
import createAssert from '../utils/create-assert.js';
import createAuthenticationId from '../utils/create-authentication-id.js';
import createEmitter from '../utils/create-emitter.js';
import createError from '../utils/create-error.js';
import createReturnHref from '../utils/create-return-href.js';
import createUser from '../utils/create-user.js';
import emitError from '../utils/emit-error.js';
import getPatreonUser from '../utils/get-patreon-user.js';
import getUserId from '../utils/get-user-id.js';
import isAnalyticsEngineDataset from '../utils/is-analytics-engine-dataset.js';
import isD1Database from '../utils/is-d1-database.js';
import isEnvironment from '../utils/is-environment.js';
import isKVNamespace from '../utils/is-kv-namespace.js';
import isObject from '../utils/is-object.js';
import logError from '../utils/log-error.js';
import mapErrorToResponse from '../utils/map-error-to-response.js';
import roll from '../utils/roll.js';
import withReturnHref from '../utils/with-return-href.js';
import throttle from './throttle.js';

const AWAIT_EXPERIMENT_ODDS = 0.5;
const FAILURE = 2;
const startTime: number = Date.now();
const SUCCESS = 1;

export default (async function fetch(
  request: Readonly<Request>,
  env: unknown,
  ctx: ExecutionContext,
): Promise<Response> {
  try {
    const fetchTime: number = Date.now();

    if (!isObject(env)) {
      throw createError(
        'Expected an environment.',
        ErrorCode.MissingEnvironment,
        StatusCode.InternalServerError,
        env,
      );
    }

    const {
      ANALYTICS,
      AUTHN,
      AUTHN_USER_IDS,
      COOKIE_DOMAIN,
      ENVIRONMENT,
      HOST,
      PATREON_OAUTH_CLIENT_ID,
      PATREON_OAUTH_CLIENT_SECRET,
      PATREON_OAUTH_HOST,
      PATREON_OAUTH_REDIRECT_URI,
    } = env as Readonly<Record<string, unknown>>;

    if (!isEnvironment(ENVIRONMENT)) {
      throw createError(
        'Expected an environment to be provided.',
        ErrorCode.MissingEnvironmentEnvironment,
        StatusCode.InternalServerError,
        ENVIRONMENT,
      );
    }

    const getAnalyticsEngineDataset = ():
      | AnalyticsEngineDataset
      | undefined => {
      if (isAnalyticsEngineDataset(ANALYTICS)) {
        return ANALYTICS;
      }

      if (
        ENVIRONMENT === Environment.Development &&
        typeof ANALYTICS === 'undefined'
      ) {
        return;
      }

      throw createError(
        'Expected an analytics engine dataset.',
        ErrorCode.MissingAnalyticsEngineDataset,
        StatusCode.InternalServerError,
        env,
      );
    };

    const emit = createEmitter({
      analyticsEngineDataset: getAnalyticsEngineDataset(),
      environment: ENVIRONMENT,
      fetchTime,
      startTime,
    });

    try {
      const assert: (
        assertion: boolean,
        message: string,
        code: ErrorCode,
        status: StatusCode,
        data?: unknown,
      ) => asserts assertion = createAssert(emit);

      // Method
      assert(
        request.method === 'GET' || request.method === 'POST',
        'Method not allowed.',
        ErrorCode.MethodNotAllowed,
        StatusCode.MethodNotAllowed,
        request.method,
      );

      // Pathname
      const {
        pathname: requestPathname,
        searchParams: requestSearchParams,
      }: URL = new URL(request.url);
      if (requestPathname === '/favicon.ico') {
        emit(MetricName.FaviconIco);
        return new Response(FAVICON_RESPONSE_BODY, FAVICON_RESPONSE_INIT);
      }

      if (requestPathname === '/robots.txt') {
        emit(MetricName.RobotsTxt);
        return new Response(ROBOTS_RESPONSE_BODY, ROBOTS_RESPONSE_INIT);
      }

      // Throttle (deployed environments)
      if (ENVIRONMENT !== Environment.Development) {
        throttle(request, assert);
      }

      assert(
        typeof HOST === 'string',
        'Expected a host.',
        ErrorCode.MissingHost,
        StatusCode.InternalServerError,
      );

      const { searchParams } = new URL(request.url);
      const stateSearchParam: string | null = searchParams.get('state');

      // "Deny"
      if (stateSearchParam === null) {
        emit(MetricName.Deny);
        return new Response(null, {
          status: StatusCode.Found,
          headers: new Headers({
            'Content-Location': `https://${HOST}/`,
            Location: `https://${HOST}/`,
          }),
        });
      }

      const cookieHeader: string | null = request.headers.get('Cookie');
      assert(
        cookieHeader !== null,
        'Expected cookies.',
        ErrorCode.MissingCookies,
        StatusCode.BadRequest,
        request.headers.entries(),
      );

      const cookies: Partial<Record<string, string>> = parse(cookieHeader);
      const sessionId: string | undefined = cookies['__Secure-Session-ID'];
      assert(
        typeof sessionId === 'string',
        'Expected a session ID.',
        ErrorCode.MissingSessionIDCookie,
        StatusCode.BadRequest,
      );

      const returnHref: string = createReturnHref({
        assert, // <-- Code smell 🦨
        host: HOST,
        sessionId,
        stateSearchParam,
      });

      try {
        assert(
          isKVNamespace(AUTHN_USER_IDS),
          'Expected an authentication namespace.',
          ErrorCode.MissingAuthenticationNamespace,
          StatusCode.InternalServerError,
          AUTHN_USER_IDS,
        );

        assert(
          isD1Database(AUTHN),
          'Expected an authentication database.',
          ErrorCode.MissingAuthenticationDatabase,
          StatusCode.InternalServerError,
          AUTHN,
        );

        assert(
          typeof COOKIE_DOMAIN === 'string',
          'Expected a cookie domain.',
          ErrorCode.MissingCookieDomain,
          StatusCode.InternalServerError,
        );

        assert(
          typeof PATREON_OAUTH_CLIENT_ID === 'string',
          'Expected a Patreon client ID.',
          ErrorCode.MissingPatreonClientID,
          StatusCode.InternalServerError,
        );

        assert(
          typeof PATREON_OAUTH_CLIENT_SECRET === 'string',
          'Expected a Patreon client secret.',
          ErrorCode.MissingPatreonClientSecret,
          StatusCode.InternalServerError,
        );

        assert(
          typeof PATREON_OAUTH_HOST === 'string',
          'Expected a Patreon OAuth host.',
          ErrorCode.MissingPatreonOAuthHost,
          StatusCode.InternalServerError,
        );

        assert(
          typeof PATREON_OAUTH_REDIRECT_URI === 'string',
          'Expected a Patreon redirect URI.',
          ErrorCode.MissingPatreonRedirectURI,
          StatusCode.InternalServerError,
        );

        const getOAuthUser = async (): Promise<
          OAuthUser & Record<'provider', OAuthProvider>
        > => {
          switch (requestPathname) {
            // Patreon
            case '/patreon/': {
              emit(MetricName.PatreonRequest);
              const code: string | null = requestSearchParams.get('code');
              assert(
                code !== null,
                'Expected a code.',
                ErrorCode.MissingCode,
                StatusCode.Unauthorized,
                searchParams.toString(),
              );

              return {
                provider: OAuthProvider.Patreon,
                ...(await getPatreonUser(
                  PATREON_OAUTH_HOST,
                  PATREON_OAUTH_CLIENT_ID,
                  PATREON_OAUTH_CLIENT_SECRET,
                  PATREON_OAUTH_REDIRECT_URI,
                  code,
                  emit, // <-- Code smell 🦨
                  assert, // <-- Code smell 🦨
                )),
              };
            }

            default:
              emit(MetricName.NotFoundRequest);
              throw createError(
                'Not found.',
                ErrorCode.NotFound,
                StatusCode.NotFound,
                requestPathname,
              );
          }
        };

        // Validate the authentication.
        const { provider: oAuthProvider, ...oAuthUser } = await getOAuthUser();

        // Create an authentication ID.
        const authnId: string = createAuthenticationId();
        const optionalPromise: Promise<void> = getUserId(
          AUTHN,
          oAuthProvider,
          oAuthUser.id,
          emit,
          assert,
        )
          .then(async (userId: number | null): Promise<number> => {
            if (userId !== null) {
              emit(MetricName.Login);
              console.log(`User #${userId} authenticated.`);
              return userId;
            }

            emit(MetricName.StartRegistration);
            const newUserId: number = await createUser(
              AUTHN,
              oAuthProvider,
              oAuthUser,
              ctx,
              emit,
            );

            emit(MetricName.EndRegistration);
            console.log(`User #${newUserId} created.`);
            return newUserId;
          })
          .then(async (userId: number): Promise<void> => {
            const nowSeconds: number = Math.floor(
              Date.now() / MILLISECONDS_PER_SECOND,
            );

            console.log('Recording authentication ID...');
            await AUTHN_USER_IDS.put(authnId, userId.toString(), {
              expiration: nowSeconds + SECONDS_PER_DAY,
              expirationTtl: SECONDS_PER_DAY,
            });

            emit(MetricName.SetAuthenticationIdUser);
            console.log('Authentication ID recorded.');
          });

        const isAwaitExperiment = roll(AWAIT_EXPERIMENT_ODDS);
        if (ENVIRONMENT === Environment.Development || isAwaitExperiment) {
          await optionalPromise;
          emit(MetricName.AwaitExperiment);
        } else {
          ctx.waitUntil(
            optionalPromise
              .then((): void => {
                emit(MetricName.AwaitExperiment, SUCCESS);
              })
              .catch((err: unknown): void => {
                emit(MetricName.AwaitExperiment, FAILURE);
                logError(err);
              }),
          );
        }

        emit(MetricName.Success);
        return new Response(null, {
          status: StatusCode.SeeOther,
          headers: new Headers({
            'Content-Location': returnHref,
            Location: returnHref,
            'Set-Cookie': `__Secure-Authentication-ID=${authnId}; domain=${COOKIE_DOMAIN}; max-age=${SECONDS_PER_DAY}; partitioned; path=/; secure`,
          }),
        });
      } catch (err: unknown) {
        // Scope: `returnHref`
        // TODO: `return handleError(err, emit, returnHref);`
        throw withReturnHref(err, returnHref, emit);
      }
    } catch (err: unknown) {
      // Scope: `emit`
      // TODO: `return handleError(err, emit);`
      emitError(emit, err);
      throw err;
    }
  } catch (err: unknown) {
    // Scope: `logError`
    // TODO: `return handleError(err);`
    logError(err);
    return mapErrorToResponse(err);
  }
} satisfies ExportedHandlerFetchHandler);
