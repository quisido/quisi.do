import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleInvalidPatreonClientId', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchPatreon } = new AuthnTest({
      patreonOAuthClientId: 'test-client-id',
      patreonToken: '{"error":"invalid_client"}',
      patreonTokenStatusCode: StatusCode.BadRequest,
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPublicMetric({
      clientId: 'test-client-id',
      name: MetricName.InvalidPatreonClientId,
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=28',
      location: 'https://test.host/test-return-path/#authn:error=28',
    });
  });
});
