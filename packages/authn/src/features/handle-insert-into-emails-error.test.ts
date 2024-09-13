import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';
import { EXPECT_ANY_NUMBER } from '../test/expect-any.js';

describe('handleInsertIntoEmailsError', (): void => {
  it('should log and emit', async (): Promise<void> => {
    // Assemble
    const TEST_ERROR = new Error('Failed to insert into emails.');
    const TEST_USER_ID = 1234;
    const { expectPrivateLog, expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      insertIntoEmailsError: TEST_ERROR,
      usersRowId: TEST_USER_ID,

      patreonIdentity: JSON.stringify({
        data: {
          id: 'test-id',

          attributes: {
            email: 'test@localhost',
            is_email_verified: true
          },
        },
      }),
    });

    // Act
    await fetchPatreon();

    // Assert
    expectPrivateLog(TEST_ERROR);

    expectPrivateMetric({
      duration: EXPECT_ANY_NUMBER,
      endTime: EXPECT_ANY_NUMBER,
      name: MetricName.EmailInsertError,
      startTime: EXPECT_ANY_NUMBER,
      userId: TEST_USER_ID,
    });

    expectPublicMetric({
      duration: EXPECT_ANY_NUMBER,
      endTime: EXPECT_ANY_NUMBER,
      name: MetricName.EmailInsertError,
      startTime: EXPECT_ANY_NUMBER,
    });
  });
});
