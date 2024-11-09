import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import handlePatreonAccessTokenError from './handle-patreon-access-token-error.js';
import mapPatreonOAuthTokenToAccessToken from './map-patreon-oauth-token-to-access-token.js';

const HTTP_REDIRECTION = 300;

export default async function handlePatreonOAuthTokenResponse(
  this: AuthnFetchHandler,
  response: Response,
): Promise<string> {
  if (response.status >= HTTP_REDIRECTION) {
    return handlePatreonAccessTokenError.call(this, response);
  }

  const getJson = async (): Promise<unknown> => {
    try {
      return await response.json();
    } catch (_err: unknown) {
      return undefined;
    }
  };

  const json: unknown = await getJson();
  return mapPatreonOAuthTokenToAccessToken.call(this, json);
}
