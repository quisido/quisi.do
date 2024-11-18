import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe.skip('handleInvalidPatreonIdentityAttributes', (): void => {
  it('should emit when attributes are missing', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        patreonIdentity: '{"data":{"id":"test-id"}}',
      });

    // Act
    await fetch('/patreon/');

    // Assert
    expectPrivateMetric(MetricName.MissingPatreonIdentityAttributes, {
      data: '{"id":"test-id"}',
    });

    expectPublicMetric(MetricName.MissingPatreonIdentityAttributes);
  });

  it('should emit when attributes are invalid', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        patreonIdentity:
          '{"data":{"attributes":"test-attributes","id":"test-id"}}',
      });

    // Act
    await fetch('/patreon/');

    // Assert
    expectPrivateMetric(MetricName.InvalidPatreonIdentityAttributes, {
      value: '"test-attributes"',
    });

    expectPublicMetric(MetricName.InvalidPatreonIdentityAttributes, {
      type: 'string',
    });
  });
});
