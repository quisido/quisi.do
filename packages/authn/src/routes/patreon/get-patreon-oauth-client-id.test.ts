import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('getPatreonOAuthClientId', (): void => {
  it('should emit and respond when missing', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchPatreon } = new AuthnTest({
      patreonOAuthClientId: undefined,
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectPublicMetric({ name: MetricName.MissingPatreonOAuthClientId });
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=16',
      location: 'https://test.host/test-return-path/#authn:error=16',
    });
  });

  it('should emit and respond when invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      patreonOAuthClientId: true,
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.InvalidPatreonOAuthClientId,
      value: 'true',
    });

    expectPublicMetric({
      name: MetricName.InvalidPatreonOAuthClientId,
      type: 'boolean',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=17',
      location: 'https://test.host/test-return-path/#authn:error=17',
    });
  });
});
