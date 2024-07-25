import { catchSnapshot } from '../../constants/worker.js';
import handlePatreonFetchRequest from '../../routes/patreon/handle-patreon-fetch-request.js';
import getIp from '../../utils/get-ip.js';
import handleFetchError from '../handle-fetch-error.js';
import { AuthenticationPathname } from './authentication-pathname.js';
import handleThrottledOAuthRequest from './handle-throttled-oauth-request.js';
import shouldThrottleOAuth from './should-throttle-oauth.js';

interface Options {
  readonly pathname: AuthenticationPathname;
  readonly returnPath: string;
}

export default async function handleReturnPath({
  pathname,
  returnPath,
}: Options): Promise<Response> {
  // Throttle
  const ip: string = getIp();
  if (shouldThrottleOAuth(ip)) {
    return handleThrottledOAuthRequest({ ip, returnPath });
  }

  return await catchSnapshot(
    async (): Promise<Response> => {
      switch (pathname) {
        case AuthenticationPathname.Patreon:
          return await handlePatreonFetchRequest({ returnPath });
      }
    },
    (err: unknown) => {
      return handleFetchError(err, returnPath);
    },
  );
}
