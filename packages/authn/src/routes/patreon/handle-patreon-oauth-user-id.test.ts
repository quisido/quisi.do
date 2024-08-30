import { StatusCode } from "cloudflare-utils";
import { describe, expect, it } from "vitest";
import { MetricName } from "../../constants/metric-name.js";
import OAuthProvider from "../../constants/oauth-provider.js";
import { INSERT_INTO_USERS_QUERY, SELECT_USERID_FROM_OAUTH_QUERY } from "../../constants/queries.js";
import AuthnTest from "../../test/authn-test.js";
import { EXPECT_ANY_NUMBER, EXPECT_ANY_STRING } from '../../test/expect-any.js';

const TEST_USER_ID = 1234;

describe('handlePatreonOAuthUserId', (): void => {
  it('should respond for existing users', async (): Promise<void> => {
    // Assemble
    const { expectUserIdsToHavePut, fetchPatreon } = new AuthnTest({
      cookieDomain: 'test.quisi.do',
      userIds: [TEST_USER_ID],
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon({
      sessionIdCookie: 'test-session-id',
      sessionIdState: 'test-session-id',
    });

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);
    expectUserIdsToHavePut(EXPECT_ANY_STRING, TEST_USER_ID.toString());
    expectResponseHeadersToBe({
      'content-location': 'https://test.host/test-return-path/',
      location: 'https://test.host/test-return-path/',
      'set-cookie': expect.stringMatching(/^__Secure-Authentication-ID=.{64}; Domain=test\.quisi\.do; Max-Age=86400; Partitioned; Path=\/; SameSite=Lax; Secure$/),
    });
  });

  it('should insert and respond for new users', async (): Promise<void> => {
    // Assemble
    const { expectDatabaseToHaveQueried, expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      cookieDomain: 'test.quisi.do',
      oAuthRowId: 1234,
      usersRowId: 5678,
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectDatabaseToHaveQueried(SELECT_USERID_FROM_OAUTH_QUERY, [OAuthProvider.Patreon, 'test-id']);
    expectDatabaseToHaveQueried(INSERT_INTO_USERS_QUERY, [null, null, 0, EXPECT_ANY_NUMBER]);

    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPublicMetric({
      changes: 1,
      duration: EXPECT_ANY_NUMBER,
      name: MetricName.AuthenticationCreated,
      sizeAfter: 1,
      userId: 5678,
    });

    expectPrivateMetric({
      changes: 1,
      duration: 1,
      endTime: EXPECT_ANY_NUMBER,
      lastRowId: 1234,
      name: MetricName.OAuthInserted,
      sizeAfter: 1,
      startTime: EXPECT_ANY_NUMBER,
      userId: 5678,
    });

    expectPublicMetric({
      changes: 1,
      duration: EXPECT_ANY_NUMBER,
      endTime: EXPECT_ANY_NUMBER,
      name: MetricName.OAuthInserted,
      sizeAfter: 1,
      startTime: EXPECT_ANY_NUMBER,
    });

    expectPublicMetric({
      endTime: EXPECT_ANY_NUMBER,
      name: MetricName.AuthnIdCreated,
      startTime: EXPECT_ANY_NUMBER,
    });

    expectResponseHeadersToBe({
      'content-location': 'https://test.host/test-return-path/',
      location: 'https://test.host/test-return-path/',
      'set-cookie': expect.stringMatching(/^__Secure-Authentication-ID=.{64}; Domain=test\.quisi\.do; Max-Age=86400; Partitioned; Path=\/; SameSite=Lax; Secure$/),
    });
  });
});
