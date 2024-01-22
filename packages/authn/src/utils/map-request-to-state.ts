import StatusCode from '../constants/status-code.js';
import type State from '../types/state.js';
import assert from './assert.js';
import isObject from './is-object.js';
import mapRequestToSessionId from './map-request-to-session-id.js';
import mapRequestToStateSearchParam from './map-request-to-state-search-param.js';
import parseJson from './parse-json.js';

const mapHostnameToHost = (hostname: string): string => {
  if (hostname === 'localhost') {
    return 'localhost:3030';
  }
  return hostname;
};

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
    'returnPath' in state,
    'Expected state to have a return path.',
    StatusCode.BadRequest,
    state,
  );

  assert(
    'sessionId' in state,
    'Expected state to have a session ID.',
    StatusCode.BadRequest,
    state,
  );

  const { returnPath, sessionId: stateSessionId } = state;

  assert(
    typeof returnPath === 'string',
    'Expected the return path to be a string.',
    StatusCode.BadRequest,
    returnPath,
  );

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

  const { hostname } = new URL(request.url);
  const host: string = mapHostnameToHost(hostname);
  return {
    returnHref: `https://${host}${returnPath}`,
    sessionId: stateSessionId,
  };
}
