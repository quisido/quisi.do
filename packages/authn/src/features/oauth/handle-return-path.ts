import type Worker from '@quisido/worker';
import getIp from '../../features/get-ip.js';
import handlePatreonFetchRequest from '../../routes/patreon/handle-patreon-fetch-request.js';
import handleFetchError from '../handle-fetch-error.js';
import { AuthenticationPathname } from './authentication-pathname.js';
import handleThrottledOAuthRequest from './handle-throttled-oauth-request.js';
import shouldThrottleOAuth from './should-throttle-oauth.js';

interface Options {
  readonly pathname: AuthenticationPathname;
  readonly returnPath: string;
}

export default async function handleReturnPath(this: Worker,{
  pathname,
  returnPath,
}: Options): Promise<Response> {
  // Throttle
  const ip: string = getIp.call(this);
  if (shouldThrottleOAuth.call(this, ip)) {
    return handleThrottledOAuthRequest.call(this, { ip, returnPath });
  }

  return await this.catchSnapshot(
    async (): Promise<Response> => {
      switch (pathname) {
        case AuthenticationPathname.Patreon:
          return await handlePatreonFetchRequest.call(this, { returnPath });
      }
    },
    (err: unknown) => {
      return handleFetchError.call(this, err, returnPath);
    },
  );
}
