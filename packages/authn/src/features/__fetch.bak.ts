/// <reference types="@cloudflare/workers-types" />
import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
import StatusCode from '../constants/status-code.js';
import { MILLISECONDS_PER_SECOND, SECONDS_PER_DAY } from '../constants/time.js';
import createAuthenticationId from '../utils/create-authentication-id.js';
import isCause from '../utils/is-cause.js';
import roll from '../utils/roll.js';

const AWAIT_EXPERIMENT_ODDS = 0.5;
const FAILURE = 2;
const OFF = 0;
const SUCCESS = 1;

export default (async function fetch(
  request: Readonly<Request>,
  env: unknown,
  ctx: ExecutionContext,
): Promise<Response> {
  try {
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
    if (ENVIRONMENT_NAME === Environment.Development || isAwaitExperiment) {
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
