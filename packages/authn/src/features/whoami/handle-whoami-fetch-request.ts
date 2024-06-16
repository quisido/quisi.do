import {
  AUTHN_USER_ID_MAP,
  type State as AuthnUserIdState,
} from '../../constants/authn-user-id-map.js';
import MetricName from '../../constants/metric-name.js';
import { MILLISECONDS_PER_SECOND } from '../../constants/time.js';
import createThrottler from '../../utils/create-throttler.js';
import getIp from '../../utils/get-ip.js';
import getRequest from '../../utils/get-request.js';
import getTelemetry from '../../utils/get-telemetry.js';
import mapHeadersToCookies from '../../utils/map-headers-to-cookies.js';
import handleCachedAuthnId from './handle-cached-authn-id.js';
import handleExpiredAuthnId from './handle-expired-authn-id.js';
import handleMissingAuthnId from './handle-missing-authn-id.js';
import handleOptions from './handle-options.js';
import handleThrottle from './handle-throttle.js';
import mapAuthnIdToResponse from './map-authn-id-to-response.js';

const throttle = createThrottler();

export default async function handleWhoAmIFetchRequest(): Promise<Response> {
  const { headers: requestHeaders, method }: Request = getRequest();
  const { emitPublicMetric } = getTelemetry();
  emitPublicMetric({ name: MetricName.WhoAmIRequest });

  // Options
  if (method === 'OPTIONS') {
    return handleOptions();
  }

  const cookies: Partial<Record<string, string>> =
    mapHeadersToCookies(requestHeaders);

  // If the user is not authenticated,
  const { '__Secure-Authentication-ID': authnId } = cookies;
  if (typeof authnId === 'undefined') {
    return handleMissingAuthnId();
  }

  // If the authentication ID is cached,
  const state: AuthnUserIdState | undefined = AUTHN_USER_ID_MAP.get(authnId);
  if (typeof state !== 'undefined') {
    // Cache is valid.
    const { expiration, id } = state;
    if (expiration >= Date.now()) {
      return handleCachedAuthnId({ expiration, id });
    }

    // Clean up invalid cache.
    handleExpiredAuthnId({ authnId, expiration, id });
  }

  // Throttle
  const ip: string = getIp();
  try {
    throttle(ip, MILLISECONDS_PER_SECOND);
  } catch (_err: unknown) {
    return handleThrottle();
  }

  return await mapAuthnIdToResponse(authnId);
}
