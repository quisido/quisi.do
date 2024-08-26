import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import { SELECT_USERID_FROM_OAUTH_QUERY } from '../../constants/queries.js';
import AuthnTest from '../../test/authn-test.js';
import TestD1Database from '../../test/d1-database.js';

const TEST_USER_ID = 1234;

describe('handleCachedAuthnUserId', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    const { expectPrivateMetric, expectPublicMetric, fetch, fetchPatreon, mockPatreonIdentity, mockPatreonToken } = new AuthnTest({
      env: {
        AUTHN_DB: new TestD1Database({
          [SELECT_USERID_FROM_OAUTH_QUERY]: {
            results: [{userId: TEST_USER_ID}],
          },
        }),
      },
    });

    mockPatreonToken('{"access_token":"test-access-token"}');
    mockPatreonIdentity('{"data":{"id":"test-id"}}');

    // Write to cache.
    const { authnIdCookie } = await fetchPatreon();

    // Read from cache.
    const { expectResponseHeadersToBe, expectResponseJsonToBe, expectResponseStatusToBe } = await fetch('https://localhost/whoami/', {
      headers: new Headers({
        cookie: `__Secure-Authentication-ID=${authnIdCookie}`,
      }),
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

    expectResponseJsonToBe({
      code: WhoAmIResponseCode.Cached,
      id: TEST_USER_ID,
    });
  });
});
