import { mapUnknownToString } from 'fmrs';
import MetricName from '../constants/metric-name.js';
import getEnv from '../utils/get-env.js';
import getTelemetry from '../utils/get-telemetry.js';

const DEFAULT_COOKIE_DOMAIN = 'quisi.do';

export default function getCookieDomain(): string {
  const { COOKIE_DOMAIN } = getEnv();
  if (typeof COOKIE_DOMAIN === 'string') {
    return COOKIE_DOMAIN;
  }

  const { emitPublicMetric, logPrivateError } = getTelemetry();
  if (typeof COOKIE_DOMAIN === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingCookieDomain });
    return DEFAULT_COOKIE_DOMAIN;
  }

  emitPublicMetric({ name: MetricName.InvalidCookieDomain });
  logPrivateError(
    new Error('Invalid cookie domain', {
      cause: mapUnknownToString(COOKIE_DOMAIN),
    }),
  );
  return DEFAULT_COOKIE_DOMAIN;
}
