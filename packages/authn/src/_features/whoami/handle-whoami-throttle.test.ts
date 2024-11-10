import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { EnvironmentName } from '../../constants/environment-name.js';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleWhoAmIThrottle', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchWhoAmI } =
      new AuthnTest({
        environmentName: EnvironmentName.Production,
      });

    // Act
    await fetchWhoAmI({
      cookies: `__Secure-Authentication-ID=abcdef`,
      ip: '254.253.252.251',
    });

    const {
      expectResponseHeadersToBe,
      expectResponseJsonToBe,
      expectResponseStatusToBe,
    } = await fetchWhoAmI({
      cookies: `__Secure-Authentication-ID=abcdef`,
      ip: '254.253.252.251',
    });

    // Assert
    expectResponseStatusToBe(StatusCode.TooManyRequests);

    expectPrivateMetric({
      ip: '254.253.252.251',
      name: MetricName.WhoAmIThrottled,
    });

    expectPublicMetric({
      name: MetricName.WhoAmIThrottled,
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
      code: WhoAmIResponseCode.Throttled,
    });
  });
});
