import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';
import { EXPECT_ANY_NUMBER, EXPECT_ANY_STRING } from '../test/expect-any.js';
import unimplementedMethod from '../test/unimplemented-method.js';

describe('handlePutAuthnUserIdError', (): void => {
  it('should log and emit', async (): Promise<void> => {
    // Assemble
    const TEST_ERROR = new Error('Failed to put.');
    const TEST_USER_ID = 1234;
    const {
      expectPrivateLog,
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
    } = new AuthnTest({
      usersRowId: TEST_USER_ID,

      authnUserIdsNamespace: {
        delete: unimplementedMethod,
        getWithMetadata: unimplementedMethod,
        list: unimplementedMethod,

        get(): null {
          return null;
        },

        put(): Promise<void> {
          return Promise.reject(TEST_ERROR);
        },
      },
    });

    // Act
    await fetchPatreon();

    // Assert
    expectPrivateLog(TEST_ERROR);

    expectPrivateMetric({
      authnId: EXPECT_ANY_STRING,
      duration: EXPECT_ANY_NUMBER,
      endTime: EXPECT_ANY_NUMBER,
      name: MetricName.AuthnIdError,
      startTime: EXPECT_ANY_NUMBER,
      userId: TEST_USER_ID,
    });

    expectPublicMetric({
      duration: EXPECT_ANY_NUMBER,
      endTime: EXPECT_ANY_NUMBER,
      name: MetricName.AuthnIdError,
      startTime: EXPECT_ANY_NUMBER,
    });
  });
});
