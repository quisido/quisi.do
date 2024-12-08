import { describe, it } from 'vitest';
import { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('getIp', (): void => {
  it('should emit a metric', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    await fetch('/whoami/', {
      headers: new Headers({
        cookie: '__Secure-Authentication-ID=abcdef',
      }),
    });

    // Assert
    expectToHaveEmitPublicMetric(MetricName.MissingIP);
  });

  it('should not emit a metric in development', async (): Promise<void> => {
    // Assemble
    const { expectNotToHaveEmitPublicMetric, fetch } =
      new TestAuthnExportedHandler({
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
