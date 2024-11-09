import { OAuthProvider } from '../../constants/oauth-provider.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import getOAuthUserId from '../../features/shared/get-oauth-user-id.js';
import handlePatreonOAuthUserId from './handle-patreon-oauth-user-id.js';
import type PatreonIdentity from './patreon-identity.js';

export default async function handlePatreonIdentity(
  this: AuthnFetchHandler,
  identity: PatreonIdentity,
  returnPath: string,
): Promise<Response> {
  const userId: number | null = await getOAuthUserId.call(
    this,
    OAuthProvider.Patreon,
    identity.id,
  );

  return await handlePatreonOAuthUserId.call(
    this,
    userId,
    identity,
    returnPath,
  );
}
