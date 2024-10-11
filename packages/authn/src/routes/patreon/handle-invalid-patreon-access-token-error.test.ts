import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleInvalidPatreonAccessTokenError', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new AuthnTest({
        patreonToken: 'true',
        patreonTokenStatusCode: StatusCode.BadRequest,
      });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } =
      await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.InvalidPatreonAccessTokenError,
      value: 'true',
    });

    expectPublicMetric({
      name: MetricName.InvalidPatreonAccessTokenError,
      type: 'boolean',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=26',
      location: 'https://test.host/test-return-path/#authn:error=26',
    });
  });
});
