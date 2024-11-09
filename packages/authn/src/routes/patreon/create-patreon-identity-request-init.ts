import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import getPatreonAccessToken from './get-patreon-access-token.js';
import handlePatreonAccessToken from './handle-patreon-access-token.js';

export default async function createPatreonIdentityRequestInit(
  this: AuthnFetchHandler,
): Promise<RequestInit> {
  const token: string = await getPatreonAccessToken.call(this);
  return handlePatreonAccessToken(token);
}
