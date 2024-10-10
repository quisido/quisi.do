import type Worker from '@quisido/worker';
import { type OAuthProvider } from '../../constants/oauth-provider.js';
import getUserIdFromOAuth from './get-user-id-from-oauth.js';
import handleOAuthUserIdResult from './handle-oauth-user-id-result.js';

export default async function getOAuthUserId(
  this: Worker,
  oAuthProvider: OAuthProvider,
  oAuthId: string,
): Promise<number | null> {
  return await this.snapshot(
    getUserIdFromOAuth.call(this, oAuthProvider, oAuthId),
    handleOAuthUserIdResult,
  );
}
