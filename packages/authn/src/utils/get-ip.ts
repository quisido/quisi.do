import EnvironmentName from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric, getRequestHeaders } from '../constants/worker.js';
import getEnvironmentName from '../features/get-environment-name.js';

export default function getIp(): string {
  const environmentName: EnvironmentName = getEnvironmentName();
  if (environmentName === EnvironmentName.Development) {
    return '127.0.0.1';
  }

  const headers: Headers = getRequestHeaders();
  const ip: string | null = headers.get('cf-connecting-ip');
  if (ip !== null) {
    return ip;
  }

  emitPublicMetric({ name: MetricName.MissingIP });

  // Fail gracefully. This does not need to impact legitimate users.
  return '127.0.0.1';
}
