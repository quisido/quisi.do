import { describe, it } from 'vitest';
import AuthnTest from '../test/authn-test.js';

describe('getCookieDomain', (): void => {
  it('should return the COOKIE_DOMAIN environment variable', async (): Promise<void> => {
    // Assemble
    const { fetch } = new AuthnTest({
      cookieDomain: 'test.quisi.do',
    });

    // Act
    const { expectResponseHeadersToBe } = await fetch(
      'https://localhost/whoami/',
      {
        method: 'OPTIONS',

        headers: new Headers({
          Origin: 'https://invalid.quisi.do',
        }),
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
