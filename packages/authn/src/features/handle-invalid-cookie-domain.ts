import type Worker from '@quisido/worker';
import { DEFAULT_COOKIE_DOMAIN } from '../constants/default-cookie-domain.js';
import { MetricName } from '../constants/metric-name.js';

export default function handleInvalidCookieDomain(this: Worker, domain: unknown): string {
  this.emitPrivateMetric({
    name: MetricName.InvalidCookieDomain,
    value: JSON.stringify(domain),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidCookieDomain,
    type: typeof domain,
  });

  return DEFAULT_COOKIE_DOMAIN;
}
