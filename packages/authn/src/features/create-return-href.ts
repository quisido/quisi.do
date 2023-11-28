import { ErrorCode } from '@quisido/authn-shared';
import getRequestSearchParam from '../utils/get-request-search-param.js';
import getSessionIdCookie from '../utils/get-session-id-cookie.js';
import isObject from '../utils/is-object.js';
import mapCauseToError from '../utils/map-cause-to-error.js';
import getHost from './get-host.js';

export default function createReturnHref(): string {
  const host: string = getHost();

  const stateSearchParam: string | null = getRequestSearchParam('state');
  if (stateSearchParam === null) {
    throw mapCauseToError({
      code: ErrorCode.MissingState,
    });
  }

  const getStateJson = (): unknown => {
    try {
      return JSON.parse(stateSearchParam);
    } catch (err: unknown) {
      throw mapCauseToError({
        code: ErrorCode.NonJsonState,
        privateData: stateSearchParam,
      });
    }
  };

  const state: unknown = getStateJson();
  if (!isObject(state)) {
    throw mapCauseToError({
      code: ErrorCode.NonObjectState,
      privateData: state,
      publicData: typeof state,
    });
  }

  const { returnPath, sessionId: stateSessionId } = state;
  if (typeof stateSessionId === 'undefined') {
    throw mapCauseToError({
      code: ErrorCode.MissingStateSessionID,
      privateData: state,
      publicData: Object.keys(state),
    });
  }

  // Cross-site request forgery (CSRF)
  const sessionIdCookie: string = getSessionIdCookie();
  if (sessionIdCookie !== stateSessionId) {
    throw mapCauseToError({
      code: ErrorCode.CSRF,
    });
  }

  if (typeof returnPath === 'undefined') {
    throw mapCauseToError({
      code: ErrorCode.MissingStateReturnPath,
      privateData: state,
      publicData: Object.keys(state),
    });
  }

  if (typeof returnPath !== 'string') {
    throw mapCauseToError({
      code: ErrorCode.NonStringStateReturnPath,
      privateData: returnPath,
      publicData: typeof returnPath,
    });
  }

  return `https://${host}${returnPath}`;
}
