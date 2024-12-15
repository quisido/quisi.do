import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('getOAuthUserId', (): void => {
  it('should emit and respond when the the database is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler({
      env: {
        AUTHN_DB: true,
      },
    });

    mockPatreonIdentity();
    mockPatreonToken();

    // Act
    const { expectOAuthErrorResponse } = await fetchPatreon('db');

    // Assert
    expectToHaveEmitPublicMetric(MetricName.PatreonRequest);
    expectOAuthErrorResponse(ErrorCode.InvalidDatabase, '/test-return-path/');

    expectToHaveEmitPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'AUTHN_DB',
      value: 'true',
    });

    expectToHaveEmitPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'AUTHN_DB',
      type: 'boolean',
    });
  });

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
