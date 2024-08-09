import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import EnvironmentName from '../../constants/environment-name.js';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleWhoAmIThrottle', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } = new AuthnTest({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
    });

    // Act
    await fetch('https://localhost/whoami/', {
      headers: new Headers({
        'cf-connecting-ip': '1.2.3.4',
      }),
    });

    const {
      expectResponseHeadersToBe,
      expectResponseJsonToBe,
      expectResponseStatusToBe,
    } = await fetch('https://localhost/whoami/', {
      headers: new Headers({
        'cf-connecting-ip': '1.2.3.4',
      }),
    });

    // Assert
    expectResponseStatusToBe(StatusCode.TooManyRequests);

    expectPrivateMetric({
      ip: '1.2.3.4',
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
