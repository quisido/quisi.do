import formUrlEncoded from 'form-urlencoded';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { PATREON_USER_AGENT } from '../constants/patreon-user-agent.js';
import getPatreonRequestCode from './get-patreon-request-code.js';
import handlePatreonTokenErrorResponse from './handle-patreon-token-error-response.js';
import parsePatreonTokenResponse from './parse-patreon-token-response.js';

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
      body: formUrlEncoded({
        client_id: this.patreonOAuthClientId,
        client_secret: this.patreonOAuthClientSecret,
        code: requestCode,
        grant_type: 'authorization_code',
        redirect_uri: this.patreonOAuthRedirectUri,
      }),
      headers: HEADERS,
      method: 'POST',
    },
  );

  if (response.status >= HTTP_REDIRECTION) {
    return handlePatreonTokenErrorResponse.call(this, {
      requestCode,
      response,
    });
  }

  const text: string = await response.text();
  return parsePatreonTokenResponse.call(this, text);
}
