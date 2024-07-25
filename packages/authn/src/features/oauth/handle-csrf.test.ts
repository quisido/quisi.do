import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import Test from '../../test/test.js';

describe('handleCrossSiteRequestForgery', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } = new Test();

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetch(
      'https://localhost/patreon/?state=%7B%22returnPath%22%3A%22/test-return-path/%22%2C%22sessionId%22%3A%22test-session-id-state%22%7D',
      {
        headers: new Headers({
          cookie: '__Secure-Session-ID=test-session-id-cookie',
        }),
      },
    );

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);
    expectPublicMetric({ name: MetricName.CSRF });

    expectPrivateMetric({
      cookie: 'test-session-id-cookie',
      name: MetricName.CSRF,
      state: 'test-session-id-state',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=14',
      location: 'https://test.host/#authn:error=14',
    });
  });
});
