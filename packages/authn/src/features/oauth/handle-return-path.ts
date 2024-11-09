import handlePatreonFetchRequest from '../../routes/patreon/handle-patreon-fetch-request.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import handleFetchError from '../handle-fetch-error.js';
import { AuthenticationPathname } from './authentication-pathname.js';
import handleThrottledOAuthRequest from './handle-throttled-oauth-request.js';
import shouldThrottleOAuth from './should-throttle-oauth.js';

interface Options {
  readonly pathname: AuthenticationPathname;
  readonly returnPath: string;
}

export default async function handleReturnPath(
  this: AuthnFetchHandler,
  { returnPath }: Options,
): Promise<Response> {
  // Throttle
  const { ip } = this;
  if (shouldThrottleOAuth.call(this, ip)) {
    return handleThrottledOAuthRequest.call(this, { ip, returnPath });
  }

  try {
    /**
     * Whenever we support more than one authentication pathname:
     *   switch (pathname) {
     *     case AuthenticationPathname.Patreon:
     *       return await handlePatreonFetchRequest.call(this, { returnPath });
     *   }
     */
    return await handlePatreonFetchRequest.call(this, { returnPath });
  } catch (err: unknown) {
    return handleFetchError.call(this, err, returnPath);
  }
}
