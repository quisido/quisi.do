import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';
import { EXPECT_ANY_NUMBER } from '../test/expect-any.js';

describe('handleInsertIntoEmailsResponse', (): void => {
  it('should emit', async (): Promise<void> => {
    // Assemble
    const TEST_USER_ID = 1234;
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new AuthnTest({
        usersRowId: TEST_USER_ID,

        patreonIdentity: JSON.stringify({
          data: {
            id: 'test-id',

            attributes: {
              email: 'test@localhost',
              is_email_verified: true,
            },
          },
        }),
      });

    // Act
    await fetchPatreon();

    // Assert
    expectPrivateMetric({
      changes: 1,
      duration: EXPECT_ANY_NUMBER,
      endTime: EXPECT_ANY_NUMBER,
      lastRowId: 1,
      name: MetricName.EmailInserted,
      sizeAfter: 1,
      startTime: EXPECT_ANY_NUMBER,
      userId: TEST_USER_ID,
    });

    expectPublicMetric({
      changes: 1,
      duration: EXPECT_ANY_NUMBER,
      endTime: EXPECT_ANY_NUMBER,
      name: MetricName.EmailInserted,
      sizeAfter: 1,
      startTime: EXPECT_ANY_NUMBER,
    });
  });
});
