import { describe, it } from 'vitest';
import { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';

describe('handleWhoAmIThrottle', (): void => {
  it('should be 127.0.0.1 during development', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, fetchWhoAmI } = new AuthnTest({
      environmentName: EnvironmentName.Development,
    });

    // Act
    await fetchWhoAmI({
      cookie: `__Secure-Authentication-ID=abcdef`,
    });

    await fetchWhoAmI({
      cookie: `__Secure-Authentication-ID=abcdef`,
    });

    // Assert
    expectPrivateMetric({
      ip: '127.0.0.1',
      name: MetricName.WhoAmIThrottled,
    });
  });

  it('should emit and be 127.0.0.1 when missing', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchWhoAmI } = new AuthnTest({
      environmentName: EnvironmentName.Production,
    });

    // Act
    await fetchWhoAmI({
      cookie: `__Secure-Authentication-ID=abcdef`,
      ip: undefined,
    });

    // Assert
    expectPublicMetric({ name: MetricName.MissingIP });
  });
});
