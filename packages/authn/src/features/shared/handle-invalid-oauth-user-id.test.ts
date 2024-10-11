import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';
import expectPrivateMetric from '../../test/expect-private-metric.js';

describe('handleInvalidOAuthUserId', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchPatreon } = new AuthnTest({
      oAuthUserIdResults: [{ userId: true }],
    });

    // Act
    const { expectResponseHeadersToBe } = await fetchPatreon();

    // Assert
    expectPublicMetric({ name: MetricName.InvalidOAuthUserId });

    expectPrivateMetric({
      name: MetricName.InvalidOAuthUserId,
      value: '{"userId":true}',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=48',
      location: 'https://test.host/test-return-path/#authn:error=48',
    });
  });
});
