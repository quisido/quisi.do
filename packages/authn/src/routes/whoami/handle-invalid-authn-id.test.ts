import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleInvalidAuthnId', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } = new AuthnTest();

    // Act
    const {
      expectResponseHeadersToBe,
      expectResponseJsonToBe,
      expectResponseStatusToBe,
    } = await fetch('https://localhost/whoami/', {
      headers: new Headers({
        cookie: '__Secure-Authentication-ID=abcdef',
      }),
    });

    // Assert
    expectPublicMetric({ name: MetricName.InvalidAuthnId });
    expectResponseStatusToBe(StatusCode.OK);

    expectPrivateMetric({
      authnId: 'abcdef',
      name: MetricName.InvalidAuthnId,
    });

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
      code: WhoAmIResponseCode.InvalidAuthnId,
    });
  });
});
