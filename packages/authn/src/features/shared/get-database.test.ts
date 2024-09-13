import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('getDatabase', (): void => {
  it('should emit and respond when database is missing', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchPatreon } = new AuthnTest({
      database: undefined,
    });

    // Act
    const { expectResponseHeadersToBe } = await fetchPatreon();

    // Assert
    expectPublicMetric({ name: MetricName.MissingDatabase });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=46',
      location: 'https://test.host/test-return-path/#authn:error=46',
    });
  });

  it('should emit and respond when database is invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      database: true,
    });

    // Act
    const { expectResponseHeadersToBe } = await fetchPatreon();

    // Assert
    expectPrivateMetric({
      name: MetricName.InvalidDatabase,
      value: 'true',
    });

    expectPublicMetric({
      name: MetricName.InvalidDatabase,
      type: 'boolean',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=47',
      location: 'https://test.host/test-return-path/#authn:error=47',
    });
  });
});
