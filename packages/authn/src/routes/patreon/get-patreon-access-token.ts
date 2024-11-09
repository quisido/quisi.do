import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import getPatreonTokenResponse from './get-patreon-token-response.js';
import handlePatreonOAuthTokenResponse from './handle-patreon-oauth-token-response.js';

export default async function getPatreonAccessToken(
  this: AuthnFetchHandler,
): Promise<string> {
  const response: Response = await getPatreonTokenResponse.call(this);
  return handlePatreonOAuthTokenResponse.call(this, response);
}
