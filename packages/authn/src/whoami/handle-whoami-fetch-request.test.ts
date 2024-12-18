import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleWhoAmIFetchRequest', (): void => {
  it('should emit and respond when the KV namespace is invalid', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetch,
    } = new TestAuthnExportedHandler({
      env: {
        AUTHN_USER_IDS: true,
      },
    });

    // Act
    const { expectJsonErrorResponse } = await fetch('/whoami/', {
      headers: new Headers({
        cookie: '__Secure-Authentication-ID=abcdef',
      }),
    });

    // Assert
    expectJsonErrorResponse(ErrorCode.InvalidAuthnUserIdsNamespace);

    expectToHaveEmitPrivateMetric(WorkerMetricName.InvalidBinding, {
      key: 'AUTHN_USER_IDS',
      value: 'true',
    });

    expectToHaveEmitPublicMetric(WorkerMetricName.InvalidBinding, {
      key: 'AUTHN_USER_IDS',
      type: 'boolean',
    });
  });
});
