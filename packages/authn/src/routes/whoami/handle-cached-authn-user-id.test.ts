import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

const TEST_USER_ID = 1234;

describe('handleCachedAuthnUserId', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    const {
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
      fetchWhoAmI,
    } = new AuthnTest({
      oAuthUserIdResults: [{ userId: TEST_USER_ID }],
    });

    // Write to cache.
    const { authnIdCookie } = await fetchPatreon();

    // Read from cache.
    const {
      expectResponseHeadersToBe,
      expectResponseJsonToBe,
      expectResponseStatusToBe,
    } = await fetchWhoAmI({
      cookies: `__Secure-Authentication-ID=${authnIdCookie}`,
    });

    expectResponseStatusToBe(StatusCode.OK);

    expectPrivateMetric({
      name: MetricName.CachedAuthnId,
      userId: TEST_USER_ID,
    });

    expectPublicMetric({
      name: MetricName.CachedAuthnId,
    });

    expectResponseHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });

    await expectResponseJsonToBe({
      code: WhoAmIResponseCode.Cached,
      id: TEST_USER_ID,
    });
  });
});
