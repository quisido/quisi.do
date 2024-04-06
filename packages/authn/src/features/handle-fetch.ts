import stateVar from '../constants/state-var.js';
import createTraceId from '../utils/create-trace-id.js';
import isObject from '../utils/is-object.js';
import handleFetchError from './handle-fetch-error.js';
import handleFetchRequest from './handle-fetch-request.js';
import handleInvalidIsolateEnvironment from './handle-invalid-isolate-environment.js';
import handleMissingIsolateEnvironment from './handle-missing-isolate-environment.js';
import State from './state.js';

export default function handleFetch(
  fetch: Fetcher['fetch'],
  request: Request,
  env: unknown,
  ctx: ExecutionContext,
): Promise<Response> | Response {
  const traceId: string = createTraceId();
  const state: State = new State(fetch, request, ctx, traceId);
  return stateVar.run(state, (): Promise<Response> | Response => {
    if (typeof env === 'undefined') {
      return handleMissingIsolateEnvironment();
    }

    if (!isObject(env)) {
      return handleInvalidIsolateEnvironment();
    }

    try {
      /**
       *   We cannot set `env` when we instantiate state, because we throw
       * stateful errors when validating it here.
       */
      state.setEnv(env);
      return handleFetchRequest();
    } catch (err: unknown) {
      return handleFetchError(err);
    } finally {
      state.flushTelemetry();
    }
  });
}
