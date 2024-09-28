import type Worker from '@quisido/worker';
import { DEFAULT_COOKIE_DOMAIN } from '../constants/default-cookie-domain.js';
import { MetricName } from '../constants/metric-name.js';

export default function handleMissingCookieDomain(this: Worker): string {
  this.emitPublicMetric({ name: MetricName.MissingCookieDomain });
  return DEFAULT_COOKIE_DOMAIN;
}
