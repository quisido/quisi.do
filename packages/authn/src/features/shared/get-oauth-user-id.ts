import type OAuthProvider from '../../constants/oauth-provider.js';
import { snapshot } from '../../constants/worker.js';
import getUserIdFromOAuth from './get-user-id-from-oauth.js';
import handleOAuthUserIdResult from './handle-oauth-user-id-result.js';

export default async function getOAuthUserId(
  oAuthProvider: OAuthProvider,
  oAuthId: string,
): Promise<number | null> {
  return await snapshot(
    getUserIdFromOAuth(oAuthProvider, oAuthId),
    handleOAuthUserIdResult,
  );
}
