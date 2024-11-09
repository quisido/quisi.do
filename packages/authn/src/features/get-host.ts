import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

const DEFAULT_HOST = 'quisi.do';

export default function getHost(this: AuthnFetchHandler): string {
  const host: unknown = this.getEnv('HOST');
  if (typeof host === 'string' && host !== '') {
    return host;
  }

  if (typeof host === 'undefined' || host === '') {
    this.emitPublicMetric(MetricName.MissingHost);
    return DEFAULT_HOST;
  }

  this.emitPrivateMetric(MetricName.InvalidHost, {
    value: JSON.stringify(host),
  });

  this.emitPublicMetric(MetricName.InvalidHost, {
    type: typeof host,
  });

  return DEFAULT_HOST;
}
