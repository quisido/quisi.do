import { ErrorCode } from '@quisido/authn-shared';
import formUrlEncoded from 'form-urlencoded';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { PATREON_USER_AGENT } from '../constants/patreon-user-agent.js';
import FatalError from '../utils/fatal-error.js';
import parseJson from '../utils/parse-json.js';

const HTTP_REDIRECTION = 300;
const HEADERS: Headers = new Headers({
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'user-agent': PATREON_USER_AGENT,
});

export default async function getPatreonAccessToken(
  this: AuthnFetchHandler,
): Promise<string> {
  const requestCode: string = this.getPatreonRequestCode();
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
    return this.handlePatreonTokenErrorResponse({
      requestCode,
      response,
    });
  }

  const text: string = await response.text();
  const json: unknown = parseJson(text);
  if (typeof json === 'undefined') {
    this.emitPublicMetric(MetricName.InvalidPatreonTokenResponse);
    this.emitPrivateMetric(MetricName.InvalidPatreonTokenResponse, {
      text,
    });

    throw new FatalError(ErrorCode.InvalidPatreonTokenResponse);
  }

  return this.mapPatreonOAuthTokenToAccessToken(json);
}
