import type Worker from '@quisido/worker';
import EnvironmentName from '../../constants/environment-name.js';
import createThrottler from '../../features/create-throttler.js';
import getEnvironmentName from '../get-environment-name.js';

const IP_THROTTLE_LIMIT = 10000;
const throttleIp = createThrottler();

export default function shouldThrottleOAuth(this: Worker, ip: string): boolean {
  const environmentName: EnvironmentName = getEnvironmentName.call(this);

  if (environmentName !== EnvironmentName.Production) {
    return false;
  }

  try {
    throttleIp(ip, IP_THROTTLE_LIMIT);
    return false;
  } catch (err: unknown) {
    return true;
  }
}
