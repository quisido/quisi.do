import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import getPatreonIdentityResponse from './get-patreon-identity-response.js';
import handlePatreonIdentityResponse from './handle-patreon-identity-response.js';
import type PatreonIdentity from './patreon-identity.js';

export default async function getPatreonIdentity(
  this: AuthnFetchHandler,
): Promise<PatreonIdentity> {
  const response: Response = await getPatreonIdentityResponse.call(this);
  return handlePatreonIdentityResponse.call(this, response);
}
