import { DEFAULT_COOKIE_DOMAIN } from '../constants/default-cookie-domain.js';
import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric } from '../constants/worker.js';

export default function handleMissingCookieDomain(): string {
  emitPublicMetric({ name: MetricName.MissingCookieDomain });
  return DEFAULT_COOKIE_DOMAIN;
}
