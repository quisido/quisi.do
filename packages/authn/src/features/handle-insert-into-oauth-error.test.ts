import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';
import { EXPECT_ANY_NUMBER } from '../test/expect-any.js';

describe('handleInsertIntoOAuthError', (): void => {
  it('should log and emit', async (): Promise<void> => {
    // Assemble
    const TEST_ERROR = new Error('Failed to insert into OAuth.');
    const TEST_USER_ID = 1234;
    const {
      expectPrivateLog,
      expectPrivateMetric,
      expectPublicMetric,
      fetchPatreon,
    } = new AuthnTest({
      insertIntoOAuthError: TEST_ERROR,
      usersRowId: TEST_USER_ID,
    });

    // Act
    await fetchPatreon();

    // Assert
    expectPrivateLog(TEST_ERROR);

    expectPrivateMetric({
      duration: EXPECT_ANY_NUMBER,
      endTime: EXPECT_ANY_NUMBER,
      name: MetricName.OAuthInsertError,
      startTime: EXPECT_ANY_NUMBER,
      userId: TEST_USER_ID,
    });

    expectPublicMetric({
      duration: EXPECT_ANY_NUMBER,
      endTime: EXPECT_ANY_NUMBER,
      name: MetricName.OAuthInsertError,
      startTime: EXPECT_ANY_NUMBER,
    });
  });
});
