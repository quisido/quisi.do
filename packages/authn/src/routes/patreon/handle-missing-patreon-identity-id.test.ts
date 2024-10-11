import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleMissingPatreonIdentityId', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new AuthnTest({
        patreonIdentity: '{"data":{}}',
      });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } =
      await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);
    expectPublicMetric({ name: MetricName.MissingPatreonIdentityId });

    expectPrivateMetric({
      data: '{}',
      name: MetricName.MissingPatreonIdentityId,
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=44',
      location: 'https://test.host/test-return-path/#authn:error=44',
    });
  });
});
