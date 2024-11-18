import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe.skip('getSessionIdCookie', (): void => {
  it('should emit when missing', async (): Promise<void> => {
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({});

    await fetch('/patreon/', {
      headers: new Headers({
        cookie: 'cookie1=abc; cookie2=def',
      }),
    });

    expectPrivateMetric(MetricName.MissingSessionIdCookie, {
      value: '{"cookie1":"abc","cookie2":"def"}',
    });

    expectPublicMetric(MetricName.MissingSessionIdCookie, {
      keys: 'cookie1, cookie2',
    });
  });
});
