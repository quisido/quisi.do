import { DEFAULT_COOKIE_DOMAIN } from '../constants/default-cookie-domain.js';
import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function handleMissingCookieDomain(
  this: AuthnFetchHandler,
): string {
  this.emitPublicMetric(MetricName.MissingCookieDomain);
  return DEFAULT_COOKIE_DOMAIN;
}
