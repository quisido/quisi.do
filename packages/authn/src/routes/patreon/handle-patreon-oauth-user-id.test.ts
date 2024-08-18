import { StatusCode } from "cloudflare-utils";
import { describe, expect, it } from "vitest";
import { MetricName } from "../../constants/metric-name.js";
import OAuthProvider from "../../constants/oauth-provider.js";
import { INSERT_INTO_OAUTH_QUERY, INSERT_INTO_USERS_QUERY, SELECT_USERID_FROM_OAUTH_QUERY } from "../../constants/queries.js";
import AuthnTest from "../../test/authn-test.js";
import TestD1Database from "../../test/d1-database.js";
import { EXPECT_ANY_NUMBER, EXPECT_ANY_STRING } from '../../test/expect-any.js';

describe('handlePatreonOAuthUserId', (): void => {
  it('should respond for existing users', async (): Promise<void> => {
    // Assemble
    const { expectAuthnUserIdsPut, fetchPatreon, mockPatreonIdentity, mockPatreonToken } = new AuthnTest({
      env: {
        AUTHN_DB: new TestD1Database({
          [SELECT_USERID_FROM_OAUTH_QUERY]: {
            results: [{userId: 1234}],
          },
        }),
      },
    });

    mockPatreonIdentity('{"data":{"id":"test-id"}}');
    mockPatreonToken('{"access_token":"test-access-token"}');

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon({
      sessionIdCookie: 'test-session-id',
      sessionIdState: 'test-session-id',
    });

    // Assert
    expectAuthnUserIdsPut(EXPECT_ANY_STRING, '1234');
    expectResponseStatusToBe(StatusCode.SeeOther);
    expectResponseHeadersToBe({
      'content-location': 'https://test.host/test-return-path/',
      location: 'https://test.host/test-return-path/',
      'set-cookie': expect.stringMatching(/^__Secure-Authentication-ID=.{64}; Domain=quisi\.do; Max-Age=86400; Partitioned; Path=\/; SameSite=Lax; Secure$/),
    });
  });

  it('should insert and respond for new users', async (): Promise<void> => {
    // Assemble
    const { expectDatabaseToHaveQueried, expectPrivateMetric, expectPublicMetric, fetchPatreon, mockPatreonIdentity, mockPatreonToken } = new AuthnTest({
      env: {
        AUTHN_DB: new TestD1Database({
          [INSERT_INTO_OAUTH_QUERY]: {
            lastRowId: 1234,
          },
          [INSERT_INTO_USERS_QUERY]: {
            lastRowId: 5678,
          },
          [SELECT_USERID_FROM_OAUTH_QUERY]: {
            results: [],
          },
        }),
      },
    });

    mockPatreonIdentity('{"data":{"id":"test-id"}}');
    mockPatreonToken('{"access_token":"test-access-token"}');

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectDatabaseToHaveQueried('AUTHN_DB', SELECT_USERID_FROM_OAUTH_QUERY, [OAuthProvider.Patreon, 'test-id']);
    expectDatabaseToHaveQueried('AUTHN_DB', INSERT_INTO_USERS_QUERY, [null, null, 0, EXPECT_ANY_NUMBER]);

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
      'set-cookie': expect.stringMatching(/^__Secure-Authentication-ID=.{64}; Domain=quisi\.do; Max-Age=86400; Partitioned; Path=\/; SameSite=Lax; Secure$/),
    });
  });
});
