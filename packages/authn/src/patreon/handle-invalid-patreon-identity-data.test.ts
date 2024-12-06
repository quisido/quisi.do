import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleInvalidPatreonIdentityData', (): void => {
  it('should emit and respond when the Patreon identity data is missing', async (): Promise<void> => {
    // Assemble
    const {
      expectPublicMetric,
      fetchPatreon,
      mockPatreonToken,
      mockPatreonIdentity,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();
    mockPatreonIdentity(new Response('{}'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('missing');

    // Assert
    expectPublicMetric(MetricName.MissingPatreonIdentityData);
    expectPublicMetric(MetricName.PatreonRequest);
    expectErrorResponse(
      ErrorCode.MissingPatreonIdentityData,
      '/test-return-path/',
    );
  });

  it('should emit and respond when the Patreon identity data is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();
    mockPatreonIdentity(new Response('{"data":1234}'));

    // Act
    const { expectErrorResponse } = await fetchPatreon('invalid');

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonIdentityData,
      '/test-return-path/',
    );

    expectPublicMetric(MetricName.InvalidPatreonIdentityData, {
      type: 'number',
    });

    expectPrivateMetric(MetricName.InvalidPatreonIdentityData, {
      value: '1234',
    });
  });
});
