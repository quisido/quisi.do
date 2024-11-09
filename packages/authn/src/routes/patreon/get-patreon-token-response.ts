import formUrlEncoded from 'form-urlencoded';
import { PATREON_USER_AGENT } from '../../constants/patreon-user-agent.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import getPatreonRequestCode from './get-patreon-request-code.js';

const HEADERS: Headers = new Headers({
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'user-agent': PATREON_USER_AGENT,
});

export default async function getPatreonTokenResponse(
  this: AuthnFetchHandler,
): Promise<Response> {
  const {
    patreonOAuthClientId,
    patreonOAuthHost,
    patreonOAuthClientSecret,
    patreonOAuthRedirectUri,
  } = this;
  return await this.fetch(`${patreonOAuthHost}/api/oauth2/token`, {
    headers: HEADERS,
    method: 'POST',

    body: formUrlEncoded({
      client_id: patreonOAuthClientId,
      client_secret: patreonOAuthClientSecret,
      code: getPatreonRequestCode.call(this),
      grant_type: 'authorization_code',
      redirect_uri: patreonOAuthRedirectUri,
    }),
  });
}
