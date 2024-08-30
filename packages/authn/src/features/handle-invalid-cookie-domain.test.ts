import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';

describe('handleInvalidCookieDomain', (): void => {
  it('should emit and default', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchWhoAmI } = new AuthnTest({
      cookieDomain: true,
    });

    // Act
    const { expectResponseHeadersToBe } = await fetchWhoAmI(
      {
        method: 'OPTIONS',

          origin: 'https://test.origin',
      },
    );

    // Assert
    expectPrivateMetric({
      name: MetricName.InvalidCookieDomain,
      value: 'true',
    });

    expectPublicMetric({
      name: MetricName.InvalidCookieDomain,
      type: 'boolean',
    });

    expectResponseHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': 'https://quisi.do',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });
});
