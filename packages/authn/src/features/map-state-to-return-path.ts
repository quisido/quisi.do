import { ErrorCode } from "@quisido/authn-shared";
import getSessionIdCookie from "../utils/get-session-id-cookie.js";
import mapCauseToError from "../utils/map-cause-to-error.js";

export default function mapStateToReturnPath(
  state: Record<string, unknown>,
): string {
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

  return returnPath;
}
