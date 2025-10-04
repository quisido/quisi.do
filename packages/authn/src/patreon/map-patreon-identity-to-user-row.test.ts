import { EXPECT_ANY_NUMBER } from 'cloudflare-test-utils';
import { describe, it } from 'vitest';
import { Gender } from '../constants/gender.js';
import {
  INSERT_INTO_EMAILS_QUERY,
  INSERT_INTO_USERS_QUERY,
} from '../constants/queries.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

const TEST_USER_ID = 1234;

describe('mapPatreonIdentityToUserRow', (): void => {
  it('should succeed with missing identity properties', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveQueriedAuthnDb,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler({
      lastUsersRowId: 1,
      oAuthResults: [],
    });

    mockPatreonIdentity();
    mockPatreonToken();

    // Act
    const { expectOAuthSuccessResponse } = await fetchPatreon('missing');

    // Assert
    expectOAuthSuccessResponse();
    expectToHaveQueriedAuthnDb(INSERT_INTO_USERS_QUERY, [
      null,
      null,
      Gender.Neutral,
      EXPECT_ANY_NUMBER,
    ]);
  });

  it('should support verified emails', async (): Promise<void> => {
    // Assemble
    const {
      expectToHaveQueriedAuthnDb,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler({
      lastUsersRowId: TEST_USER_ID,
      oAuthResults: [],
    });

    mockPatreonIdentity(
      new Response(
        JSON.stringify({
          data: {
            attributes: {
              email: 'test@quisi.do',
              is_email_verified: true,
            },
            id: 'test-id',
          },
        }),
      ),
    );
    mockPatreonToken();

    // Act
    const { expectOAuthSuccessResponse } = await fetchPatreon('verified');

    // Assert
    expectOAuthSuccessResponse();
    expectToHaveQueriedAuthnDb(INSERT_INTO_EMAILS_QUERY, [
      'test@quisi.do',
      TEST_USER_ID,
    ]);
  });

  it('should ignore unverified emails', async (): Promise<void> => {
    // Assemble
    const {
      expectNotToHaveQueriedAuthnDb,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler({
      lastUsersRowId: TEST_USER_ID,
      oAuthResults: [],
    });

    mockPatreonIdentity(
      new Response(
        JSON.stringify({
          data: {
            attributes: {
              email: 'test@quisi.do',
              is_email_verified: false,
            },
            id: 'test-id',
          },
        }),
      ),
    );
    mockPatreonToken();

    // Act
    const { expectOAuthSuccessResponse } = await fetchPatreon('unverified');

    // Assert
    expectOAuthSuccessResponse();
    expectNotToHaveQueriedAuthnDb(INSERT_INTO_EMAILS_QUERY);
  });
});
