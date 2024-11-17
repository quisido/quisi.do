import { describe, it } from 'vitest';
import { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handleWhoAmIThrottle', (): void => {
  it('should be 127.0.0.1 during development', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, fetchWhoAmI } = new TestAuthnExportedHandler({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Development,
      },
    });

    // Act
    await fetchWhoAmI({
      cookies: `__Secure-Authentication-ID=abcdef`,
    });

    await fetchWhoAmI({
      cookies: `__Secure-Authentication-ID=abcdef`,
    });

    // Assert
    expectPrivateMetric(MetricName.WhoAmIThrottled, {
      ip: '127.0.0.1',
    });
  });

  it('should emit and be 127.0.0.1 when missing', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchWhoAmI } = new TestAuthnExportedHandler({
      env: {
        ENVIRONMENT_NAME: EnvironmentName.Production,
      },
    });

    // Act
    await fetchWhoAmI({
      cookies: `__Secure-Authentication-ID=abcdef`,
      ip: undefined,
    });

    // Assert
    expectPublicMetric(MetricName.MissingIP);
  });
});
