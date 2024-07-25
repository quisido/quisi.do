import { WHOAMI_THROTTLE_DURATION } from '@quisido/authn-shared';
import { getRequestMethod, snapshot } from '../../constants/worker.js';
import { getAuthnUserIdFromMemory } from '../../features/authn-user-id.js';
import getAuthnId from '../../features/get-authn-id.js';
import createThrottler from '../../utils/create-throttler.js';
import getIp from '../../utils/get-ip.js';
import getAuthnUserIdFromKVNamespace from './get-authn-user-id-from-kv-namespace.js';
import handleAuthnUserId from './handle-authn-user-id.js';
import handleCachedAuthnUserId from './handle-cached-authn-user-id.js';
import handleMissingAuthnId from './handle-missing-authn-id.js';
import handleWhoAmIThrottle from './handle-whoami-throttle.js';
import WhoAmIOptionsResponse from './whoami-options-response.js';

const throttle = createThrottler();

export default async function handleWhoAmIFetchRequest(): Promise<Response> {
  // Options
  const method: string = getRequestMethod();
  if (method === 'OPTIONS') {
    return new WhoAmIOptionsResponse();
  }

  // If the user is not authenticated,
  const authnId: string | undefined = getAuthnId();
  if (typeof authnId === 'undefined') {
    return handleMissingAuthnId();
  }

  // If the authentication ID is cached in memory,
  const userId: number | undefined = getAuthnUserIdFromMemory(authnId);
  if (typeof userId !== 'undefined') {
    return handleCachedAuthnUserId(userId);
  }

  // Throttle
  const ip: string = getIp();
  try {
    throttle(ip, WHOAMI_THROTTLE_DURATION);
  } catch (_err: unknown) {
    return handleWhoAmIThrottle(ip);
  }

  return await snapshot(
    getAuthnUserIdFromKVNamespace(authnId),
    handleAuthnUserId.bind(null, authnId),
  );
}
