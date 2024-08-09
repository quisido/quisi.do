import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleMissingAuthnId', (): void => {
  it('should response with the correct code', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new AuthnTest();

    // Act
    const {
      expectResponseJsonToBe,
      expectResponseHeadersToBe,
      expectResponseStatusToBe,
    } = await fetch('https://localhost/whoami/', {
      headers: new Headers({
        cookie: '__Secure-Session-ID=abcdef',
      }),
    });

    // Assert
    expectPublicMetric({ name: MetricName.MissingAuthnId });
    expectResponseStatusToBe(StatusCode.OK);

    expectResponseHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });

    await expectResponseJsonToBe({
      code: WhoAmIResponseCode.MissingAuthnId,
    });
  });
});
