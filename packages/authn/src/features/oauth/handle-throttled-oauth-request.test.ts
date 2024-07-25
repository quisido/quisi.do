import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import EnvironmentName from '../../constants/environment-name.js';
import { MetricName } from '../../constants/metric-name.js';
import Test from '../../test/test.js';

describe('handleThrottledOAuthRequest', (): void => {
  it('should emit and response', async (): Promise<void> => {
    // Assemble
    const testUrl =
      'https://localhost/patreon/?state=%7B%22returnPath%22%3A%22/test-return-path/%22%2C%22sessionId%22%3A%22test-session-id%22%7D';

    const { expectPrivateMetric, expectPublicMetric, fetch } = new Test({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
    });

    // Act
    await fetch(testUrl, {
      headers: new Headers({
        'cf-connecting-ip': '1.2.3.4',
      }),
    });

    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetch(
      testUrl,
      {
        headers: new Headers({
          'cf-connecting-ip': '1.2.3.4',
        }),
      },
    );

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
