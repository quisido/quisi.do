import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import Test from '../../test/test.js';

describe('handleMissingPatreonOAuthHost', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new Test({
      env: {
        PATREON_OAUTH_HOST: undefined,
      },
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetch(
      'https://localhost/patreon/?code=1234&state=%7B%22returnPath%22%3A%22/test-return-path/%22%2C%22sessionId%22%3A%22test-session-id%22%7D',
    );

    // Assert
    expectPublicMetric({ name: MetricName.MissingPatreonOAuthHost });
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=52',
      location: 'https://test.host/test-return-path/#authn:error=52',
    });
  });
});
