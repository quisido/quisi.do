import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';

describe('getEnvironmentName', (): void => {
  it('should emit and default when missing', async (): Promise<void> => {
    const { expectPublicMetric, fetchWhoAmI } = new AuthnTest({
      environmentName: undefined,
    });

    await fetchWhoAmI({
      cookies: `__Secure-Authentication-ID=abcdef`,
    });

    expectPublicMetric({ name: MetricName.MissingEnvironmentName });
  });

  it('should emit and default when invalid', async (): Promise<void> => {
    const { expectPrivateMetric, expectPublicMetric, fetchWhoAmI } =
      new AuthnTest({
        environmentName: true,
      });

    await fetchWhoAmI({
      cookies: `__Secure-Authentication-ID=abcdef`,
    });

    expectPrivateMetric({
      name: MetricName.InvalidEnvironmentName,
      value: 'true',
    });

    expectPublicMetric({
      name: MetricName.InvalidEnvironmentName,
      type: 'boolean',
    });
  });
});
