import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestCspExportedHandler from '../test/test-csp-exported-handler.js';

describe('handleNotFound', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetch } =
      new TestCspExportedHandler();

    // Act
    const { expectOAuthErrorResponse } = await fetch('/test-not-found/?a=b');

    // Assert
    expectOAuthErrorResponse(ErrorCode.NotFound);
    expectToHaveEmitPublicMetric(MetricName.NotFound, {
      pathname: '/test-not-found/',
    });
  });

  it('should not emit a metric in development', async (): Promise<void> => {
    // Assemble
    const { expectNotToHaveEmitPublicMetric, fetch } =
      new TestCspExportedHandler({
        env: {
          ENVIRONMENT_NAME: EnvironmentName.Development,
        },
      });

    // Act
    await fetch('/whoami/', {
      headers: new Headers({
        cookie: '__Secure-Authentication-ID=abcdef',
      }),
    });

    // Assert
    expectNotToHaveEmitPublicMetric(MetricName.MissingIP);
  });
});
