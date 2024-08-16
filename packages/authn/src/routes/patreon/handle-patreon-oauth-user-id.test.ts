import { StatusCode } from "cloudflare-utils";
import { describe, expect, it } from "vitest";
import { MetricName } from "../../constants/metric-name.js";
import AuthnTest from "../../test/authn-test.js";
import TestD1Database from "../../test/d1-database.js";
import { EXPECT_ANY_NUMBER, EXPECT_ANY_STRING } from '../../test/expect-any.js';
import unimplementedMethod from "../../test/unimplemented-method.js";

describe('handlePatreonOAuthUserId', (): void => {
  it('should respond for existing users', async (): Promise<void> => {
    // Assemble
    const { expectAuthnUserIdsPut, fetchPatreon, mockPatreonIdentity, mockPatreonToken } = new AuthnTest({
      env: {
        AUTHN_DB: new TestD1Database({
          prepare: (): D1PreparedStatement => {
            return {
              all: unimplementedMethod,
              first: unimplementedMethod,
              raw: unimplementedMethod,
              run: unimplementedMethod,
              bind(): D1PreparedStatement {
                return {
                  bind: unimplementedMethod,
                  first: unimplementedMethod,
                  raw: unimplementedMethod,
                  run: unimplementedMethod,
                  all<T>(): Promise<D1Result<T>> {
                    return Promise.resolve({
                      results: [{ userId: 1234 } as T],
                      success: true,

                      meta: {
                        changed_db: true,
                        changes: 1,
                        duration: 1,
                        last_row_id: 1,
                        rows_read: 1,
                        rows_written: 1,
                        size_after: 1,
                      },
                    });
                  }
                };
              },
            };
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

  it('should respond for new users', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchPatreon, mockPatreonIdentity, mockPatreonToken } = new AuthnTest({
      env: {
        AUTHN_DB: new TestD1Database({
          prepare: (): D1PreparedStatement => {
            return {
              all: unimplementedMethod,
              first: unimplementedMethod,
              raw: unimplementedMethod,
              run: unimplementedMethod,
              bind(): D1PreparedStatement {
                return {
                  bind: unimplementedMethod,
                  first: unimplementedMethod,
                  raw: unimplementedMethod,

                  all<T>(): Promise<D1Result<T>> {
                    return Promise.resolve({
                      results: [],
                      success: true,

                      meta: {
                        changed_db: true,
                        changes: 1,
                        duration: 1,
                        last_row_id: 1,
                        rows_read: 1,
                        rows_written: 1,
                        size_after: 1,
                      },
                    });
                  },

                  run(): Promise<D1Response> {
                    return Promise.resolve({
                      success: true,

                      meta: {
                        changed_db: true,
                        changes: 1,
                        duration: 1,
                        last_row_id: 1,
                        rows_read: 1,
                        rows_written: 1,
                        size_after: 1,
                      },
                    });
                  },
                };
              },
            };
          },
        }),
      },
    });

    mockPatreonIdentity('{"data":{"id":"test-id"}}');
    mockPatreonToken('{"access_token":"test-access-token"}');

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

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
