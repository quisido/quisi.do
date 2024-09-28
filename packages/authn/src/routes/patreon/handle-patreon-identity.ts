import type Worker from '@quisido/worker';
import OAuthProvider from '../../constants/oauth-provider.js';
import getOAuthUserId from '../../features/shared/get-oauth-user-id.js';
import handlePatreonOAuthUserId from './handle-patreon-oauth-user-id.js';
import type PatreonIdentity from './patreon-identity.js';

export default async function handlePatreonIdentity(this: Worker,
  identity: PatreonIdentity,
  returnPath: string,
): Promise<Response> {
  return await this.snapshot(
    getOAuthUserId.call(this,OAuthProvider.Patreon, identity.id),
    handlePatreonOAuthUserId,
    identity,
    returnPath,
  );
}
