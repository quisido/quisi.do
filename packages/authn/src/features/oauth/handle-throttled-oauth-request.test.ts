import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import EnvironmentName from '../../constants/environment-name.js';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleThrottledOAuthRequest', (): void => {
  it('should emit and response', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
    });

    // Act
    await fetchPatreon({
      ip: '1.2.3.4',
    });

    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon({
      ip: '1.2.3.4',
    });

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);
    expectPublicMetric({ name: MetricName.OAuthThrottled });

    expectPrivateMetric({
      ip: '1.2.3.4',
      name: MetricName.OAuthThrottled,
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=429',
      location: 'https://test.host/test-return-path/#authn:error=429',
    });
  });
});