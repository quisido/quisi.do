import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import { MILLISECONDS_PER_DAY } from '../constants/time.js';
import AuthnTest from '../test/authn-test.js';

const SINGLE = 1;
const TEST_USER_ID = 1234;
const TEST_NOW: number = Date.now();

describe('getAuthnUserIdFromMemory', (): void => {
  it('should clear and emit for expired values', async (): Promise<void> => {
    const { expectPrivateMetric, expectPublicMetric, fetch, fetchPatreon, setNow } = new AuthnTest({
      userIds: [TEST_USER_ID],
    });

    // Write to cache.
    setNow(TEST_NOW);
    const { authnIdCookie } = await fetchPatreon();

    // Read from cache.
    setNow(TEST_NOW + MILLISECONDS_PER_DAY + SINGLE);
    const { expectResponseHeadersToBe, expectResponseJsonToBe, expectResponseStatusToBe } = await fetch('https://localhost/whoami/', {
      headers: new Headers({
        cookie: `__Secure-Authentication-ID=${authnIdCookie}`,
      }),
    });

    expectResponseStatusToBe(StatusCode.OK);

    expectPrivateMetric({
      expiration: TEST_NOW + MILLISECONDS_PER_DAY,
      name: MetricName.ExpiredAuthnId,
      userId: TEST_USER_ID,
    });

    expectPublicMetric({
      expiration: TEST_NOW + MILLISECONDS_PER_DAY,
      name: MetricName.ExpiredAuthnId,
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

    expectResponseJsonToBe({
      code: WhoAmIResponseCode.InvalidAuthnId,
    });
  });
});
