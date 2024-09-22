import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleInvalidPatreonGrantCode', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      patreonOAuthClientId: 'test-client-id',
      patreonToken: '{"error":"invalid_grant"}',
      patreonTokenStatusCode: StatusCode.BadRequest,
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon({
      code: 'abcdef',
    });

    // Assert
    expectPublicMetric({ name: MetricName.InvalidPatreonGrantCode });
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      code: 'abcdef',
      name: MetricName.InvalidPatreonGrantCode,
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=29',
      location: 'https://test.host/test-return-path/#authn:error=29',
    });
  });
});
