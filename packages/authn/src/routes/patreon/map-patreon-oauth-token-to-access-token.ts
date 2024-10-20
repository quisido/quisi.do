import type Worker from '@quisido/worker';
import isObject from '../../utils/is-object.js';
import handleInvalidPatreonAccessToken from './handle-invalid-patreon-access-token.js';
import handleInvalidPatreonOAuthTokenResponse from './handle-invalid-patreon-oauth-token-response.js';
import handleInvalidPatreonOAuthToken from './handle-invalid-patreon-oauth-token.js';
import handleMissingPatreonAccessToken from './handle-missing-patreon-access-token.js';

export default function mapPatreonOAuthTokenToAccessToken(
  this: Worker,
  token: unknown,
): string {
  /**
   *   When the response JSON is invalid, token is `undefined` and the response
   * body is unusable (already read).
   */
  if (typeof token === 'undefined') {
    return handleInvalidPatreonOAuthTokenResponse.call(this);
  }

  if (!isObject(token)) {
    return handleInvalidPatreonOAuthToken.call(this, token);
  }

  const { access_token: accessToken } = token;
  if (typeof accessToken === 'string') {
    return accessToken;
  }

  if (typeof accessToken === 'undefined') {
    return handleMissingPatreonAccessToken.call(this, token);
  }

  return handleInvalidPatreonAccessToken.call(this, accessToken);
}
