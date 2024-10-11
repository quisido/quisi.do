import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleMissingInvalidPatreonAccessTokenRequestDescription', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new AuthnTest({
        patreonToken: '{"error":"invalid_request","key":"value"}',
        patreonTokenStatusCode: StatusCode.BadRequest,
      });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } =
      await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
      value: '{"key":"value"}',
    });

    expectPublicMetric({
      name: MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=30',
      location: 'https://test.host/test-return-path/#authn:error=30',
    });
  });
});
