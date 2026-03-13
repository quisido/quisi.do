import type AuthnFetchHandler from '../authn-fetch-handler.js';
import extractPatreonAccessToken from './extract-patreon-access-token.js';
import validatePatreonOAuthToken from './validate-patreon-oauth-token.js';

export default function mapPatreonOAuthTokenToAccessToken(
  this: AuthnFetchHandler,
  token: unknown,
): string {
  const record: Record<string, unknown> = validatePatreonOAuthToken.call(
    this,
    token,
  );
  return extractPatreonAccessToken.call(this, record);
}
