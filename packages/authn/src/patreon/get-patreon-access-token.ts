import { ErrorCode } from '@quisido/authn-shared';
import formUrlEncoded from 'form-urlencoded';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { PATREON_USER_AGENT } from '../constants/patreon-user-agent.js';
import FatalError from '../utils/fatal-error.js';
import getPatreonRequestCode from './get-patreon-request-code.js';
import handlePatreonTokenErrorResponse from './handle-patreon-token-error-response.js';
import mapPatreonOAuthTokenToAccessToken from './map-patreon-oauth-token-to-access-token.js';

const HTTP_REDIRECTION = 300;
const HEADERS: Headers = new Headers({
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'user-agent': PATREON_USER_AGENT,
});

export default async function getPatreonAccessToken(
  this: AuthnFetchHandler,
): Promise<string> {
  const requestCode: string = getPatreonRequestCode.call(this);
  const response: Response = await this.fetch(
    `${this.patreonOAuthHost}/api/oauth2/token`,
    {
      headers: HEADERS,
      method: 'POST',

      body: formUrlEncoded({
        client_id: this.patreonOAuthClientId,
        client_secret: this.patreonOAuthClientSecret,
        code: requestCode,
        grant_type: 'authorization_code',
        redirect_uri: this.patreonOAuthRedirectUri,
      }),
    },
  );

  if (response.status >= HTTP_REDIRECTION) {
    return handlePatreonTokenErrorResponse.call(this, {
      requestCode,
      response,
    });
  }

  try {
    const json: unknown = await response.json();
    return mapPatreonOAuthTokenToAccessToken.call(this, json);
  } catch (_err: unknown) {
    this.emitPublicMetric(MetricName.InvalidPatreonOAuthTokenResponse);
    throw new FatalError(ErrorCode.InvalidPatreonOAuthTokenResponse);
  }
}
