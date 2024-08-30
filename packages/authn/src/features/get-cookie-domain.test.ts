import { describe, it } from 'vitest';
import AuthnTest from '../test/authn-test.js';

describe('getCookieDomain', (): void => {
  it('should return the COOKIE_DOMAIN environment variable', async (): Promise<void> => {
    // Assemble
    const { fetchWhoAmI } = new AuthnTest({
      cookieDomain: 'test.quisi.do',
    });

    // Act
    const { expectResponseHeadersToBe } = await fetchWhoAmI(
      {
        method: 'OPTIONS',

          origin: 'https://invalid.quisi.do',
      },
    );

    // Assert
    expectResponseHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': 'https://test.quisi.do',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });
});
