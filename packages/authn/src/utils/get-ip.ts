import EnvironmentName from '../constants/environment-name.js';
import MetricName from '../constants/metric-name.js';
import getEnvironmentName from '../features/get-environment-name.js';
import getRequestHeaders from './get-request-headers.js';
import getTelemetry from './get-telemetry.js';

export default function getIp(): string {
  const environmentName: EnvironmentName = getEnvironmentName();
  if (environmentName === EnvironmentName.Development) {
    return '127.0.0.1';
  }

  const headers: Headers = getRequestHeaders();
  const ip: string | null = headers.get('CF-Connecting-IP');
  if (ip !== null) {
    return ip;
  }

  const { emitPublicMetric } = getTelemetry();
  emitPublicMetric({ name: MetricName.MissingIP });

  // Fail gracefully. This does not need to impact legitimate users.
  return '127.0.0.1';
}
