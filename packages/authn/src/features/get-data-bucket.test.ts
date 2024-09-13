import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';

const TEST_USER_ID = 1234;

describe('getDataBucket', (): void => {
  it('should emit when invalid', async (): Promise<void> => {
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      dataBucket: 'test-invalid-authn-data',
      oAuthUserIdResults: [{ userId: TEST_USER_ID }],
    });

    await fetchPatreon();

    expectPrivateMetric({
      message: 'Expected an R2 bucket.',
      name: MetricName.InvalidDataBucket,
    });

    expectPublicMetric({
      bucket: 'AUTHN_DATA',
      name: '@quisido/worker/r2-bucket/invalid',
    });
  });
});
