import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import { SELECT_USERID_FROM_OAUTH_QUERY } from '../constants/queries.js';
import AuthnTest from '../test/authn-test.js';
import TestD1Database from '../test/d1-database.js';

const TEST_USER_ID = 1234;

describe('getDataBucket', (): void => {
  it('should emit when invalid', async (): Promise<void> => {
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon, mockPatreonIdentity, mockPatreonToken } = new AuthnTest({
      env: {
        AUTHN_DATA: 'test-invalid-authn-data',
        AUTHN_DB: new TestD1Database({
          [SELECT_USERID_FROM_OAUTH_QUERY]: {
            results: [{userId: TEST_USER_ID}],
          },
        }),
      },
    });

    mockPatreonToken('{"access_token":"test-access-token"}');
    mockPatreonIdentity('{"data":{"id":"test-id"}}');

    const {} = await fetchPatreon();

    expectPrivateMetric({
      name: MetricName.InvalidDataBucket,
      value: '"test-invalid-authn-data"',
    });

    expectPublicMetric({
      name: MetricName.InvalidDataBucket,
      type: 'string',
    });
  });
});
