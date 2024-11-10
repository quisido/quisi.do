import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import handleFetchError from '../fetch-handler/handle-fetch-error.js';
import handlePatreonFetchRequest from '../patreon/handle-patreon-fetch-request.js';
import { OAuthPathname } from './oauth-pathname.js';

interface Options {
  readonly pathname: OAuthPathname;
  readonly returnPath: string;
}

export default async function handleReturnPath(
  this: AuthnFetchHandler,
  { returnPath }: Options,
): Promise<Response> {
  const {
    emitPrivateMetric,
    emitPublicMetric,
    FatalOAuthErrorResponse,
    ip,
    throttleOAuthByIp,
  } = this;

  // Throttle
  if (throttleOAuthByIp(ip)) {
    emitPublicMetric(MetricName.OAuthThrottled);
    emitPrivateMetric(MetricName.OAuthThrottled, {
      ip,
    });

    return new FatalOAuthErrorResponse(ErrorCode.TooManyRequests, returnPath);
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
