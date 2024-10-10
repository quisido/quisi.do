import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';

describe('getSessionIdCookie', (): void => {
  it('should emit when missing', async (): Promise<void> => {
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new AuthnTest({});

    await fetchPatreon({
      cookies: 'cookie1=abc; cookie2=def',
    });

    expectPrivateMetric({
      name: MetricName.MissingSessionIdCookie,
      value: '{"cookie1":"abc","cookie2":"def"}',
    });

    expectPublicMetric({
      keys: 'cookie1, cookie2',
      name: MetricName.MissingSessionIdCookie,
    });
  });
});
