import { describe, it } from 'vitest';
import AuthnTest from '../test/authn-test.js';

describe('getAccessControlAllowOrigin', (): void => {
  it('should be * when origin is undefined', async (): Promise<void> => {
    const { fetch } = new AuthnTest();

    const { expectResponseHeadersToBe } = await fetch(
      'https://localhost/whoami/',
      {
        method: 'OPTIONS',
      },
    );

    expectResponseHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });

  it('should support http://localhost:3000', async (): Promise<void> => {
    const { fetch } = new AuthnTest();

    const { expectResponseHeadersToBe } = await fetch(
      'https://localhost/whoami/',
      {
        method: 'OPTIONS',

        headers: new Headers({
          origin: 'http://localhost:3000',
        }),
      },
    );

    expectResponseHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': 'http://localhost:3000',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });

  it('should support https://localhost:3000', async (): Promise<void> => {
    const { fetch } = new AuthnTest();

    const { expectResponseHeadersToBe } = await fetch(
      'https://localhost/whoami/',
      {
        method: 'OPTIONS',

        headers: new Headers({
          origin: 'https://localhost:3000',
        }),
      },
    );

    expectResponseHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': 'https://localhost:3000',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });
});
