import { describe, it } from 'vitest';
import { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe.skip('handleWhoAmIThrottle', (): void => {
  it('should be 127.0.0.1 during development', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, fetch } = new TestAuthnExportedHandler({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Development,
      },
    });

    // Act
    await fetch('/whoami/', {
      cookies: `__Secure-Authentication-ID=abcdef`,
    });

    await fetch('/whoami/', {
      cookies: `__Secure-Authentication-ID=abcdef`,
    });

    // Assert
    expectPrivateMetric(MetricName.WhoAmIThrottled, {
      ip: '127.0.0.1',
    });
  });

  it('should emit and be 127.0.0.1 when missing', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new TestAuthnExportedHandler({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
    });

    // Act
    await fetch('/whoami/', {
      cookies: `__Secure-Authentication-ID=abcdef`,
      ip: undefined,
    });

    // Assert
    expectPublicMetric(MetricName.MissingIP);
  });
});
