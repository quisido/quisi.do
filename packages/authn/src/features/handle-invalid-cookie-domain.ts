import { DEFAULT_COOKIE_DOMAIN } from '../constants/default-cookie-domain.js';
import { MetricName } from '../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../constants/worker.js';

export default function handleInvalidCookieDomain(domain: unknown): string {
  emitPrivateMetric({
    name: MetricName.InvalidCookieDomain,
    value: JSON.stringify(domain),
  });

  emitPublicMetric({
    name: MetricName.InvalidCookieDomain,
    type: typeof domain,
  });

  return DEFAULT_COOKIE_DOMAIN;
}
