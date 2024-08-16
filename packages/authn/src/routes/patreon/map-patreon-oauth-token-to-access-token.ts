import isObject from '../../utils/is-object.js';
import handleInvalidPatreonAccessToken from './handle-invalid-patreon-access-token.js';
import handleInvalidPatreonOAuthTokenResponse from './handle-invalid-patreon-oauth-token-response.js';
import handleInvalidPatreonOAuthToken from './handle-invalid-patreon-oauth-token.js';
import handleMissingPatreonAccessToken from './handle-missing-patreon-access-token.js';

export default function mapPatreonOAuthTokenToAccessToken(
  token: unknown,
): string {
  if (typeof token === 'undefined') {
    return handleInvalidPatreonOAuthTokenResponse();
  }

  if (!isObject(token)) {
    return handleInvalidPatreonOAuthToken(token);
  }

  const { access_token: accessToken } = token;
  if (typeof accessToken !== 'string') {
    if (typeof accessToken === 'undefined') {
      return handleMissingPatreonAccessToken(token);
    }

    return handleInvalidPatreonAccessToken(token);
  }

  return accessToken;
}