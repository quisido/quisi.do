import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import Test from '../../test/test.js';

describe('handleAuthnUserId', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } = new Test({
      authnUserIds: {
        abcdef: '1234',
      },
    });

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
    expectResponseStatusToBe(StatusCode.OK);

    expectPrivateMetric({
      authnId: 'abcdef',
      name: MetricName.UncachedAuthnId,
      userId: 1234,
    });

    expectPublicMetric({
      name: MetricName.UncachedAuthnId,
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
      code: WhoAmIResponseCode.Uncached,
      id: 1234,
    });
  });
});
