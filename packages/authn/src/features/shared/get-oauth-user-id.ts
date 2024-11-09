import { type OAuthProvider } from '../../constants/oauth-provider.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import getUserIdFromOAuth from './get-user-id-from-oauth.js';
import handleOAuthUserIdResult from './handle-oauth-user-id-result.js';

export default async function getOAuthUserId(
  this: AuthnFetchHandler,
  oAuthProvider: OAuthProvider,
  oAuthId: string,
): Promise<number | null> {
  const userId = await getUserIdFromOAuth.call(this, oAuthProvider, oAuthId);
  return handleOAuthUserIdResult.call(this, userId);
}
