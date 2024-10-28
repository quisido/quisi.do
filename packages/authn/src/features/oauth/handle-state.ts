import type Worker from '@quisido/worker';
import { isRecord } from 'fmrs';
import getSessionIdCookie from '../get-session-id-cookie.js';
import { AuthenticationPathname } from './authentication-pathname.js';
import handleCrossSiteRequestForgery from './handle-csrf.js';
import handleInvalidReturnPath from './handle-invalid-return-path.js';
import handleInvalidStateSessionId from './handle-invalid-state-session-id.js';
import handleNonObjectStateSearchParam from './handle-non-object-state-search-param.js';
import handleReturnPath from './handle-return-path.js';

interface Options {
  readonly pathname: AuthenticationPathname;
  readonly state: unknown;
  readonly stateSearchParam: string;
}

export default async function handleState(
  this: Worker,
  { pathname, state, stateSearchParam }: Options,
): Promise<Response> {
  // Invalid state
  if (!isRecord(state)) {
    return handleNonObjectStateSearchParam.call(this, {
      type: typeof state,
      value: stateSearchParam,
    });
  }

  // Invalid return path state
  const { returnPath, sessionId: stateSessionId } = state;
  if (typeof returnPath !== 'string') {
    return handleInvalidReturnPath.call(this, {
      searchParam: stateSearchParam,
      state,
      value: returnPath,
    });
  }

  // Invalid session ID state
  if (typeof stateSessionId !== 'string') {
    return handleInvalidStateSessionId.call(this, {
      searchParam: stateSearchParam,
      state,
      value: stateSessionId,
    });
  }

  // Cross-site request forgery (CSRF)
  const sessionIdCookie: string = getSessionIdCookie.call(this);
  if (sessionIdCookie !== stateSessionId) {
    return handleCrossSiteRequestForgery.call(this, {
      cookie: sessionIdCookie,
      state: stateSessionId,
    });
  }

  // Valid return path
  return await handleReturnPath.call(this, { pathname, returnPath });
}
