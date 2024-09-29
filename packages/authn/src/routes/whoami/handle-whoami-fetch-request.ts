import { WHOAMI_THROTTLE_DURATION } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { getAuthnUserIdFromMemory } from '../../features/authn-user-id.js';
import createThrottler from '../../features/create-throttler.js';
import getAuthnId from '../../features/get-authn-id.js';
import getIp from '../../features/get-ip.js';
import getAuthnUserIdFromKVNamespace from './get-authn-user-id-from-kv-namespace.js';
import handleAuthnUserId from './handle-authn-user-id.js';
import handleCachedAuthnUserId from './handle-cached-authn-user-id.js';
import handleMissingAuthnId from './handle-missing-authn-id.js';
import handleWhoAmIThrottle from './handle-whoami-throttle.js';
import WhoAmIOptionsResponse from './whoami-options-response.js';

const throttleIp = createThrottler();

export default async function handleWhoAmIFetchRequest(
  this: Worker,
): Promise<Response> {
  // Options
  const method: string = this.getRequestMethod();
  if (method === 'OPTIONS') {
    return new WhoAmIOptionsResponse(this);
  }

  // If the user is not authenticated,
  const authnId: string | undefined = getAuthnId.call(this);
  if (typeof authnId === 'undefined') {
    return handleMissingAuthnId.call(this);
  }

  // If the authentication ID is cached in memory,
  const userId: number | undefined = getAuthnUserIdFromMemory.call(this,authnId);
  if (typeof userId !== 'undefined') {
    return handleCachedAuthnUserId.call(this,userId);
  }

  // Throttle
  const ip: string = getIp.call(this);
  this.emitPublicMetric({ ip, name: 'TEST' });
  try {
    throttleIp.call(this, ip, WHOAMI_THROTTLE_DURATION);
  } catch (_err: unknown) {
    return handleWhoAmIThrottle.call(this,ip);
  }

  return await this.snapshot(
    getAuthnUserIdFromKVNamespace.call(this, authnId),
    handleAuthnUserId.bind(this, authnId),
  );
}
