/// <reference types="@cloudflare/workers-types" />
import Environment from '../constants/environment.js';
import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
import {
  FAVICON_RESPONSE_BODY,
  FAVICON_RESPONSE_INIT,
  ROBOTS_RESPONSE_BODY,
  ROBOTS_RESPONSE_INIT,
} from '../constants/responses.js';
import StatusCode from '../constants/status-code.js';
import { MILLISECONDS_PER_SECOND, SECONDS_PER_DAY } from '../constants/time.js';
import createAuthenticationId from '../utils/create-authentication-id.js';
import createErrorResponseInit from '../utils/create-error-response-init.js';
import createTraceId from '../utils/create-trace-id.js';
import isAnaylticsEngineDataset from '../utils/is-analytics-engine-dataset.js';
import isCause from '../utils/is-cause.js';
import isD1Database from '../utils/is-d1-database.js';
import isKVNamespace from '../utils/is-kv-namespace.js';
import isObject from '../utils/is-object.js';
import roll from '../utils/roll.js';
import FetchOperation from './fetch-operation.js';

const AWAIT_EXPERIMENT_ODDS = 0.5;
const FAILURE = 2;
const isolateTraceId: string = createTraceId();
const OFF = 0;
const SUCCESS = 1;

export default (async function fetch(
  request: Readonly<Request>,
  env: unknown,
  ctx: ExecutionContext,
): Promise<Response> {
  const operation: FetchOperation = new FetchOperation(
    isolateTraceId,
    request,
    ctx,
  );

  try {
    operation.assert(isObject(env), 'The isolate environment is missing.', {
      code: ErrorCode.MissingIsolateEnvironment,
      privateData: env,
      status: StatusCode.InternalServerError,
    });

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

    if (isAnaylticsEngineDataset(ANALYTICS)) {
      operation.setAnalyticsEngineDataset(ANALYTICS);
    } else if (ENVIRONMENT === Environment.Production) {
      throw operation.createError('The analytics engine dataset is missing.', {
        code: ErrorCode.MissingAnalyticsEngineDataset,
        privateData: ANALYTICS,
        publicData: typeof ANALYTICS,
        status: StatusCode.InternalServerError,
      });
    }

    // Method
    operation.assert(
      request.method === 'GET' || request.method === 'POST',
      'Method not allowed.',
      {
        code: ErrorCode.MethodNotAllowed,
        privateData: request.url,
        publicData: request.method,
        status: StatusCode.MethodNotAllowed,
      },
    );

    // Pathname
    const {
      pathname: requestPathname,
      searchParams: requestSearchParams,
    }: URL = new URL(request.url);
    if (requestPathname === '/favicon.ico') {
      operation.emit(MetricName.FaviconIco);
      return new Response(FAVICON_RESPONSE_BODY, FAVICON_RESPONSE_INIT);
    }

    if (requestPathname === '/robots.txt') {
      operation.emit(MetricName.RobotsTxt);
      return new Response(ROBOTS_RESPONSE_BODY, ROBOTS_RESPONSE_INIT);
    }

    // Throttle (deployed environments)
    if (ENVIRONMENT !== Environment.Development) {
      operation.throttle(request);
    }

    operation.assert(typeof HOST === 'string', 'The host is not specified.', {
      code: ErrorCode.MissingHost,
      status: StatusCode.InternalServerError,
    });

    const stateSearchParam: string | null = requestSearchParams.get('state');

    // "Deny"
    if (stateSearchParam === null) {
      operation.emit(MetricName.Deny);
      return new Response(null, {
        status: StatusCode.Found,
        headers: new Headers({
          'Content-Location': `https://${HOST}/`,
          Location: `https://${HOST}/`,
        }),
      });
    }

    const returnHref: string = operation.createReturnHref(
      HOST,
      operation.sessionId,
      stateSearchParam,
    );

    operation.assert(
      isKVNamespace(AUTHN_USER_IDS),
      'Expected an authentication namespace.',
      {
        code: ErrorCode.MissingAuthenticationNamespace,
        privateData: AUTHN_USER_IDS,
        publicData: typeof AUTHN_USER_IDS,
        status: StatusCode.InternalServerError,
      },
    );

    operation.assert(
      isD1Database(AUTHN),
      'Expected an authentication database.',
      {
        code: ErrorCode.MissingAuthenticationDatabase,
        privateData: AUTHN,
        publicData: typeof AUTHN,
        status: StatusCode.InternalServerError,
      },
    );

    operation.assert(
      typeof COOKIE_DOMAIN === 'string',
      'Expected a cookie domain.',
      {
        code: ErrorCode.MissingCookieDomain,
        privateData: COOKIE_DOMAIN,
        publicData: typeof COOKIE_DOMAIN,
        status: StatusCode.InternalServerError,
      },
    );

    operation.assert(
      typeof PATREON_OAUTH_CLIENT_ID === 'string',
      'Expected a Patreon client ID.',
      {
        code: ErrorCode.MissingPatreonClientID,
        privateData: PATREON_OAUTH_CLIENT_ID,
        publicData: typeof PATREON_OAUTH_CLIENT_ID,
        status: StatusCode.InternalServerError,
      },
    );

    operation.assert(
      typeof PATREON_OAUTH_CLIENT_SECRET === 'string',
      'Expected a Patreon client secret.',
      {
        code: ErrorCode.MissingPatreonClientSecret,
        privateData: PATREON_OAUTH_CLIENT_SECRET,
        publicData: typeof PATREON_OAUTH_CLIENT_SECRET,
        status: StatusCode.InternalServerError,
      },
    );

    operation.assert(
      typeof PATREON_OAUTH_HOST === 'string',
      'Expected a Patreon OAuth host.',
      {
        code: ErrorCode.MissingPatreonOAuthHost,
        privateData: PATREON_OAUTH_HOST,
        publicData: typeof PATREON_OAUTH_HOST,
        status: StatusCode.InternalServerError,
      },
    );

    operation.assert(
      typeof PATREON_OAUTH_REDIRECT_URI === 'string',
      'Expected a Patreon redirect URI.',
      {
        code: ErrorCode.MissingPatreonRedirectURI,
        privateData: PATREON_OAUTH_REDIRECT_URI,
        publicData: typeof PATREON_OAUTH_REDIRECT_URI,
        status: StatusCode.InternalServerError,
      },
    );

    // Validate the authentication.
    const { provider: oAuthProvider, ...oAuthUser } =
      await operation.getOAuthUser({
        patreonClientId: PATREON_OAUTH_CLIENT_ID,
        patreonClientSecret: PATREON_OAUTH_CLIENT_SECRET,
        patreonHost: PATREON_OAUTH_HOST,
        patreonRedirectUri: PATREON_OAUTH_REDIRECT_URI,
      });

    // Create an authentication ID.
    const authnId: string = createAuthenticationId();
    const optionalPromise: Promise<void> = operation
      .getUserId(AUTHN, oAuthProvider, oAuthUser.id)
      .then(async (userId: number | null): Promise<number> => {
        if (userId !== null) {
          operation.emit(MetricName.Login);
          return userId;
        }

        operation.emit(MetricName.StartRegistration);
        const newUserId: number = await operation.createUser(
          AUTHN,
          oAuthProvider,
          oAuthUser,
        );

        operation.emit(MetricName.EndRegistration);
        return newUserId;
      })
      .then(async (userId: number): Promise<void> => {
        const nowSeconds: number = Math.floor(
          Date.now() / MILLISECONDS_PER_SECOND,
        );

        await AUTHN_USER_IDS.put(authnId, userId.toString(), {
          expiration: nowSeconds + SECONDS_PER_DAY,
          expirationTtl: SECONDS_PER_DAY,
        });

        operation.emit(MetricName.SetAuthenticationIdUser);
      });

    const isAwaitExperiment = roll(AWAIT_EXPERIMENT_ODDS);
    if (ENVIRONMENT === Environment.Development || isAwaitExperiment) {
      const startTimestamp: number = Date.now();
      await optionalPromise;
      operation.emit(MetricName.AwaitExperiment, OFF, {
        endTimestamp: Date.now(),
        startTimestamp,
      });
    } else {
      const startTimestamp: number = Date.now();
      ctx.waitUntil(
        optionalPromise
          .then((): void => {
            operation.emit(MetricName.AwaitExperiment, SUCCESS, {
              endTimestamp: Date.now(),
              startTimestamp,
            });
          })
          .catch((err: unknown): void => {
            operation.emit(MetricName.AwaitExperiment, FAILURE, {
              endTimestamp: Date.now(),
              startTimestamp,
            });
            operation.logErrorPrivately(err);
          }),
      );
    }

    operation.emit(MetricName.Success);
    return new Response(null, {
      status: StatusCode.SeeOther,
      headers: new Headers({
        'Content-Location': returnHref,
        Location: returnHref,
        'Set-Cookie': `__Secure-Authentication-ID=${authnId}; domain=${COOKIE_DOMAIN}; max-age=${SECONDS_PER_DAY}; partitioned; path=/; secure`,
      }),
    });
  } catch (err: unknown) {
    // Unknown error
    if (!(err instanceof Error)) {
      operation.logErrorPrivately(err);
      operation.emit(MetricName.UnknownErrorResponse);
      return new Response(null, createErrorResponseInit(ErrorCode.Unknown));
    }

    // Unknown cause
    const { cause, message } = err;
    if (!isCause(cause)) {
      operation.logErrorPrivately({ cause, message });
      operation.emit(MetricName.UnknownErrorCauseResponse);
      return new Response(null, createErrorResponseInit(ErrorCode.Unknown));
    }

    const { code, privateData, publicData, returnHref, status } = cause;

    if (typeof privateData !== 'undefined') {
      operation.logErrorPrivately({
        code,
        message,
        privateData,
        publicData,
        returnHref,
        status,
      });
    }

    operation.emit(MetricName.ErrorResponse, code, {
      code,
      data: JSON.stringify(publicData),
      status,
    });

    return new Response(null, createErrorResponseInit(code, returnHref));
  }
} satisfies ExportedHandlerFetchHandler);
