import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';

describe('handleMissingCookieDomain', (): void => {
  it('should emit and default', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new AuthnTest({
      cookieDomain: undefined,
    });

    // Act
    const { expectResponseHeadersToBe } = await fetch(
      'https://localhost/whoami/',
      {
        method: 'OPTIONS',

        headers: new Headers({
          origin: 'https://test.origin',
        }),
      },
    );

    // Assert
    expectPublicMetric({ name: MetricName.MissingCookieDomain });
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
