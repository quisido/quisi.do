import { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function getIp(this: AuthnFetchHandler): string {
  const { requestHeaders } = this;
  const ip: string | null = requestHeaders.get('cf-connecting-ip');
  if (ip !== null) {
    return ip;
  }

  const { environmentName } = this;
  if (environmentName !== EnvironmentName.Development) {
    this.emitPublicMetric(MetricName.MissingIP);
  }

  // Fail gracefully. This does not need to impact legitimate users.
  return '127.0.0.1';
}
