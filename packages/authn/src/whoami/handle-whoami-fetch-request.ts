import type AuthnFetchHandler from '../authn-fetch-handler.js';

export default async function handleWhoAmIFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  // Options
  const { requestMethod } = this;
  if (requestMethod === 'OPTIONS') {
    return new WhoAmIOptionsResponse(this);
  }

  // If the user is not authenticated,
  const { authnIdCookie } = this;
  if (typeof authnIdCookie === 'undefined') {
    return handleMissingAuthnId.call(this);
  }

  // If the authentication ID is cached in memory,
  const userId: number | undefined =
    this.getAuthnUserIdFromMemory(authnIdCookie);
  if (typeof userId !== 'undefined') {
    return handleCachedAuthnUserId.call(this, userId);
  }

  // Throttle
  const { ip, throttleWhoAmIByIp } = this;
  if (throttleWhoAmIByIp(ip)) {
    return handleWhoAmIThrottle.call(this, ip);
  }

  const authnUserId: string | null = await getAuthnUserIdFromKVNamespace.call(
    this,
    authnIdCookie,
  );

  return handleAuthnUserId.call(this, authnIdCookie, authnUserId);
}
