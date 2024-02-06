import ErrorCode from '../constants/error-code.js';
import StatusCode from '../constants/status-code.js';
import isObject from './is-object.js';
import parseJson from './parse-json.js';

interface Options {
  readonly assert: (
    assertion: boolean,
    message: string,
    code: ErrorCode,
    status: StatusCode,
    data?: unknown,
  ) => asserts assertion;
  readonly host: string;
  readonly sessionId: string;
  readonly stateSearchParam: string;
}

export default function createRequestState({
  host,
  sessionId,
  stateSearchParam,
  ...options
}: Options): string {
  const state: unknown = parseJson(stateSearchParam, ErrorCode.NonJsonState);

  /**
   *   Assertions require every name in the call target to be declared with an
   * explicit type annotation. ts(2775)
   * 'assert' needs an explicit type annotation.
   */
  const assert: (
    assertion: boolean,
    message: string,
    code: ErrorCode,
    status: StatusCode,
    data?: unknown,
  ) => asserts assertion = options.assert;

  assert(
    isObject(state),
    'Expected state to be an object.',
    ErrorCode.NonObjectState,
    StatusCode.BadRequest,
    state,
  );

  assert(
    'returnPath' in state,
    'Expected state to have a return path.',
    ErrorCode.MissingReturnPath,
    StatusCode.BadRequest,
    state,
  );

  assert(
    'sessionId' in state,
    'Expected state to have a session ID.',
    ErrorCode.MissingSessionIDState,
    StatusCode.BadRequest,
    state,
  );

  const { returnPath, sessionId: stateSessionId } = state;

  assert(
    typeof returnPath === 'string',
    'Expected the return path to be a string.',
    ErrorCode.NonStringReturnPath,
    StatusCode.BadRequest,
    returnPath,
  );

  // Cross-site request forgery (CSRF)
  assert(
    sessionId === stateSessionId,
    'Expected this session to have initiated this request.',
    ErrorCode.CSRF,
    StatusCode.BadRequest,
    {
      cookie: sessionId,
      state,
      stateSessionId,
    },
  );

  return `https://${host}${returnPath}`;
}
