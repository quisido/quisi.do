import { WHOAMI_THROTTLE_DURATION } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import createThrottler from '../../features/create-throttler.js';
import getIp from '../../features/get-ip.js';
import getAuthnUserIdFromKVNamespace from './get-authn-user-id-from-kv-namespace.js';
import handleAuthnUserId from './handle-authn-user-id.js';
import handleCachedAuthnUserId from './handle-cached-authn-user-id.js';
import handleMissingAuthnId from './handle-missing-authn-id.js';
import handleWhoAmIThrottle from './handle-whoami-throttle.js';
import WhoAmIOptionsResponse from './whoami-options-response.js';

const throttleIp = createThrottler();

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
  const ip: string = getIp.call(this);
  try {
    throttleIp.call(this, ip, WHOAMI_THROTTLE_DURATION);
  } catch (_err: unknown) {
    return handleWhoAmIThrottle.call(this, ip);
  }

  const authnUserId: string | null = await getAuthnUserIdFromKVNamespace.call(
    this,
    authnIdCookie,
  );

  return handleAuthnUserId.call(this, authnIdCookie, authnUserId);
}
