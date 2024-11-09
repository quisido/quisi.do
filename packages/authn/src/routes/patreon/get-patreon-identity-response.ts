import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import createPatreonIdentityRequestInit from './create-patreon-identity-request-init.js';
import handlePatreonIdentityRequestInit from './handle-patreon-identity-request-init.js';

export default async function getPatreonIdentityResponse(
  this: AuthnFetchHandler,
): Promise<Response> {
  const init: RequestInit = await createPatreonIdentityRequestInit.call(this);
  return await handlePatreonIdentityRequestInit.call(this, init);
}
