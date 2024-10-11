import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleInvalidPatreonIdentityAttributes', (): void => {
  it('should emit when attributes are missing', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new AuthnTest({
        patreonIdentity: '{"data":{"id":"test-id"}}',
      });

    // Act
    await fetchPatreon();

    // Assert
    expectPrivateMetric({
      data: '{"id":"test-id"}',
      name: MetricName.MissingPatreonIdentityAttributes,
    });

    expectPublicMetric({ name: MetricName.MissingPatreonIdentityAttributes });
  });

  it('should emit when attributes are invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new AuthnTest({
        patreonIdentity:
          '{"data":{"attributes":"test-attributes","id":"test-id"}}',
      });

    // Act
    await fetchPatreon();

    // Assert
    expectPrivateMetric({
      name: MetricName.InvalidPatreonIdentityAttributes,
      value: '"test-attributes"',
    });

    expectPublicMetric({
      name: MetricName.InvalidPatreonIdentityAttributes,
      type: 'string',
    });
  });
});
