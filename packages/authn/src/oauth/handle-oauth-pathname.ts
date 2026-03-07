import type AuthnFetchHandler from '../authn-fetch-handler.js';
import handleCsrfCheck from './handle-csrf-check.js';
import handleReturnPath from './handle-return-path.js';
import { type OAuthPathname } from './oauth-pathname.js';
import parseOAuthState from './parse-oauth-state.js';

export default async function handleOAuthPathname(
  this: AuthnFetchHandler,
  pathname: OAuthPathname,
): Promise<Response> {
  const stateOrResponse = parseOAuthState.call(this);
  if (stateOrResponse instanceof Response) {
    return stateOrResponse;
  }

  const csrfResponse = handleCsrfCheck.call(this, {
    sessionId: stateOrResponse.sessionId,
  });
  if (csrfResponse !== null) {
    return csrfResponse;
  }

  return await handleReturnPath.call(this, {
    pathname,
    returnPath: stateOrResponse.returnPath,
  });
}
