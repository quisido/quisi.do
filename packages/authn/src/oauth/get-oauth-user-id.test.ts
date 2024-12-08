import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('getOAuthUserId', (): void => {
  it('should emit and respond when the the row is malformed', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler({
      oAuthResults: [{ userId: 'test' }],
    });

    mockPatreonIdentity();
    mockPatreonToken();

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('malformed');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.InvalidOAuthUserId);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectOAuthErrorResponse(
      ErrorCode.InvalidOAuthUserId,
      '/test-return-path/',
    );

    expectToHaveEmitPrivateMetric(MetricName.InvalidOAuthUserId, {
      value: '{"userId":"test"}',
    });
  });

  it('should emit and respond when the user exists', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler({
      oAuthResults: [{ userId: 1234 }],
    });

    mockPatreonIdentity();
    mockPatreonToken();

    // Act
    const { expectOAuthSuccessResponse } = await fetchPatreon('found');

    // Assert
    expectOAuthSuccessResponse();
    expectToHaveEmitPublicMetric(MetricName.AuthenticationRead);
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);

    expectToHaveEmitPrivateMetric(MetricName.AuthenticationRead, {
      userId: 1234,
    });
  });
});
