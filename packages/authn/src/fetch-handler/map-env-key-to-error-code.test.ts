import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import { describe, expect, it } from 'vitest';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';
import mapEnvKeyToErrorCode from './map-env-key-to-error-code.js';

describe('mapEnvKeyToErrorCode', (): void => {
  it('should support analytics ID', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetch,
    } = new TestAuthnExportedHandler({
      env: {
        ANALYTICS_ID: true,
      },
    });

    // Act
    const { expectJsonErrorResponse } = await fetch('/analytics/');

    // Assert
    expectJsonErrorResponse(ErrorCode.InvalidAnalyticsId);

    expectToHaveEmitPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'ANALYTICS_ID',
      value: 'true',
    });

    expectToHaveEmitPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'ANALYTICS_ID',
      type: 'boolean',
    });
  });

  it('should support analytics secret', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetch,
    } = new TestAuthnExportedHandler({
      env: {
        ANALYTICS_ID: 'test-analytics-id',
        ANALYTICS_SECRET: true,
      },
    });

    // Act
    const { expectJsonErrorResponse } = await fetch('/analytics/');

    // Assert
    expectJsonErrorResponse(ErrorCode.InvalidAnalyticsSecret);

    expectToHaveEmitPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'ANALYTICS_SECRET',
      value: 'true',
    });

    expectToHaveEmitPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'ANALYTICS_SECRET',
      type: 'boolean',
    });
  });

  it('should support unknown env', (): void => {
    expect(mapEnvKeyToErrorCode('TEST')).toBe(ErrorCode.InvalidUnknownEnv);
  });
});
