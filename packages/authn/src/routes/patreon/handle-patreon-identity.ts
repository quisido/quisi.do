import OAuthProvider from '../../constants/oauth-provider.js';
import { snapshot } from '../../constants/worker.js';
import getOAuthUserId from '../../features/shared/get-oauth-user-id.js';
import handlePatreonOAuthUserId from './handle-patreon-oauth-user-id.js';
import type PatreonIdentity from './patreon-identity.js';

export default async function handlePatreonIdentity(
  identity: PatreonIdentity,
  returnPath: string,
): Promise<Response> {
  return await snapshot(
    getOAuthUserId(OAuthProvider.Patreon, identity.id),
    handlePatreonOAuthUserId,
    identity,
    returnPath,
  );
}
