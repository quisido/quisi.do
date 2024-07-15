import EnvironmentName from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import createThrottler from '../utils/create-throttler.js';
import getIp from '../utils/get-ip.js';
import getTelemetry from '../utils/get-telemetry.js';
import mapThrottleErrorToLastCallTime from '../utils/map-throttle-error-to-last-call-time.js';
import getEnvironmentName from './get-environment-name.js';

const IP_THROTTLE_LIMIT = 10000;
const throttleIp = createThrottler();

export default function shouldThrottle(): boolean {
  const environmentName: EnvironmentName = getEnvironmentName();

  if (environmentName !== EnvironmentName.Production) {
    return false;
  }

  const ip: string = getIp();
  try {
    throttleIp(ip, IP_THROTTLE_LIMIT);
    return false;
  } catch (err: unknown) {
    const { emitPrivateMetric, emitPublicMetric } = getTelemetry();
    const lastCallTime: number = mapThrottleErrorToLastCallTime(err);

    emitPrivateMetric({
      ip,
      lastCallTime,
      name: MetricName.TooManyRequests,
    });

    emitPublicMetric({
      lastCallTime,
      name: MetricName.TooManyRequests,
    });

    return true;
  }
}
