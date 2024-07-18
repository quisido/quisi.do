import { type IncomingRequest } from 'cloudflare-utils';
import { STATE_VAR } from '../constants/state-var.js';
import isObject from '../utils/is-object.js';
import AuthnState from './authn-state.js';
import handleFetchError from './handle-fetch-error.js';
import handleFetchRequest from './handle-fetch-request.js';
import handleInvalidIsolateEnvironment from './handle-invalid-isolate-environment.js';
import handleMissingIsolateEnvironment from './handle-missing-isolate-environment.js';

export default async function handleFetch(
  console: Console,
  fetch: Fetcher['fetch'],
  request: IncomingRequest,
  env: unknown,
  ctx: ExecutionContext,
): Promise<Response> {
  if (typeof env === 'undefined') {
    return handleMissingIsolateEnvironment();
  }

  if (!isObject(env)) {
    return handleInvalidIsolateEnvironment();
  }

  const state = new AuthnState(console, fetch, request, env, ctx);
  return STATE_VAR.run(state, async (): Promise<Response> => {
    try {
      return await handleFetchRequest();
    } catch (err: unknown) {
      return STATE_VAR.run(state, (): Response => handleFetchError(err));
    }
  });
}
