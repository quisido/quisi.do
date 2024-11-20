import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import handleFetchError from '../fetch-handler/handle-fetch-error.js';
import handlePatreonFetchRequest from '../patreon/handle-patreon-fetch-request.js';
import FatalOAuthErrorResponse from './fatal-oauth-error-response.js';
import { OAuthPathname } from './oauth-pathname.js';

interface Options {
  readonly pathname: OAuthPathname;
  readonly returnPath: string;
}

export default async function handleReturnPath(
  this: AuthnFetchHandler,
  { returnPath }: Options,
): Promise<Response> {
  // Throttle
  if (this.shouldThrottleOAuthByIp()) {
    this.emitPublicMetric(MetricName.OAuthThrottled);
    this.emitPrivateMetric(MetricName.OAuthThrottled, {
      ip: this.ip,
    });

    return new FatalOAuthErrorResponse({
      code: ErrorCode.TooManyRequests,
      host: this.host,
      returnPath,
    });
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
