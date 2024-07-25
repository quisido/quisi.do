import { snapshot } from '../../constants/worker.js';
import handlePatreonAccessTokenError from './handle-patreon-access-token-error.js';
import mapPatreonOAuthTokenToAccessToken from './map-patreon-oauth-token-to-access-token.js';

const HTTP_REDIRECTION = 300;

export default async function handlePatreonOAuthTokenResponse(
  response: Response,
): Promise<string> {
  if (response.status >= HTTP_REDIRECTION) {
    return handlePatreonAccessTokenError(response);
  }

  const getJson = async (): Promise<unknown> => {
    try {
      return await response.json();
    } catch (_err: unknown) {
      return;
    }
  };

  return await snapshot(
    getJson(),
    mapPatreonOAuthTokenToAccessToken
  );
}
