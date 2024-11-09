import { DEFAULT_COOKIE_DOMAIN } from '../constants/default-cookie-domain.js';
import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function handleInvalidCookieDomain(
  this: AuthnFetchHandler,
  domain: unknown,
): string {
  this.emitPrivateMetric(MetricName.InvalidCookieDomain, {
    value: JSON.stringify(domain),
  });

  this.emitPublicMetric(MetricName.InvalidCookieDomain, {
    type: typeof domain,
  });

  return DEFAULT_COOKIE_DOMAIN;
}
