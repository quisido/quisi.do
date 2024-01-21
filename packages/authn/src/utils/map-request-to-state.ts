import StatusCode from '../constants/status-code.js';
import type State from '../types/state.js';
import assert from './assert.js';
import isObject from './is-object.js';
import mapRequestToSessionId from './map-request-to-session-id.js';
import mapRequestToStateSearchParam from './map-request-to-state-search-param.js';
import parseJson from './parse-json.js';

export default function mapRequestToState(request: Request): State {
  const stateSearchParam = mapRequestToStateSearchParam(request);
  const state: unknown = parseJson(stateSearchParam);

  assert(
    isObject(state),
    'Expected state to be an object.',
    StatusCode.BadRequest,
    state,
  );

  assert(
    'sessionId' in state,
    'Expected state to have a session ID.',
    StatusCode.BadRequest,
    state,
  );

  const { sessionId: stateSessionId } = state;

  // Cross-site request forgery (CSRF)
  const cookieSessionId: string = mapRequestToSessionId(request);

  assert(
    stateSessionId === cookieSessionId,
    'Expected this session to have initiated this request.',
    StatusCode.BadRequest,
    {
      cookie: cookieSessionId,
      state,
    },
  );

  return {
    sessionId: stateSessionId,
  };
}
