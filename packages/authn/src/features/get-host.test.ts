import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';

describe('getHost', (): void => {
  it('should emit and default when missing', async (): Promise<void> => {
    const { expectPublicMetric, fetchPatreon } = new AuthnTest({
      host: undefined,

      authnUserIds: {
        abcdef: '1234',
      },
    });

    await fetchPatreon();

    expectPublicMetric({ name: MetricName.MissingHost });
  });

  it('should emit and default when empty', async (): Promise<void> => {
    const { expectPublicMetric, fetchPatreon } = new AuthnTest({
      host: undefined,

      authnUserIds: {
        abcdef: '1234',
      },
    });

    await fetchPatreon();

    expectPublicMetric({ name: MetricName.MissingHost });
  });

  it('should emit and default when invalid', async (): Promise<void> => {
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      host: true,
    });

    await fetchPatreon();

    expectPrivateMetric({ name: MetricName.InvalidHost, value: 'true' });
    expectPublicMetric({ name: MetricName.InvalidHost, type: 'boolean' });
  });
});
