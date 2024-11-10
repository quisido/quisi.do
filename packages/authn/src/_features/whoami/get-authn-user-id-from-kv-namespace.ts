import type AuthnFetchHandler from '../../authn-fetch-handler.js';

export default async function getAuthnUserIdFromKVNamespace(
  this: AuthnFetchHandler,
  authnIdCookie: string,
): Promise<string | null> {
  const { authnUserIdsNamespace } = this;
  return await authnUserIdsNamespace.get(authnIdCookie, 'text');
}
