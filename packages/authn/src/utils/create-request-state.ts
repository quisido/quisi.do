import StatusCode from '../constants/status-code.js';
import type State from '../types/state.js';
import assert from './assert.js';
import isObject from './is-object.js';
import parseJson from './parse-json.js';

interface Options {
  readonly host: string;
  readonly sessionId: string;
  readonly stateSearchParam: string;
}

export default function createRequestState({
  host,
  sessionId,
  stateSearchParam,
}: Options): State {
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
  assert(
    sessionId === stateSessionId,
    'Expected this session to have initiated this request.',
    StatusCode.BadRequest,
    {
      cookie: sessionId,
      state,
      stateSessionId,
    },
  );

  return {
    returnHref: `https://${host}${returnPath}`,
    sessionId: stateSessionId,
  };
}
