import { EnvironmentName } from '../../constants/environment-name.js';
import createThrottler from '../../features/create-throttler.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';

const IP_THROTTLE_LIMIT = 10000;
const throttleIp = createThrottler();

export default function shouldThrottleOAuth(
  this: AuthnFetchHandler,
  ip: string,
): boolean {
  const { environmentName } = this;

  if (environmentName !== EnvironmentName.Production) {
    return false;
  }

  try {
    throttleIp.call(this, ip, IP_THROTTLE_LIMIT);
    return false;
  } catch (_err: unknown) {
    return true;
  }
}
