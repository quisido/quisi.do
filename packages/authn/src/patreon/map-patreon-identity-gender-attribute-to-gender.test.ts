import { EXPECT_ANY_NUMBER } from 'cloudflare-test-utils';
import { describe, it } from 'vitest';
import { Gender } from '../constants/gender.js';
import { PatreonGender } from '../constants/patreon-gender.js';
import { INSERT_INTO_USERS_QUERY } from '../constants/queries.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('mapPatreonIdentityGenderAttributeToGender', (): void => {
  it('should support females', async (): Promise<void> => {
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

    mockPatreonToken();
    mockPatreonIdentity(
      new Response(
        JSON.stringify({
          data: {
            id: 'test-id',

            attributes: {
              gender: PatreonGender.Female,
            },
          },
        }),
      ),
    );

    // Act
    const { expectOAuthSuccessResponse } = await fetchPatreon('female');

    // Assert
    expectOAuthSuccessResponse();
    expectToHaveQueriedAuthnDb(INSERT_INTO_USERS_QUERY, [
      null,
      null,
      Gender.Female,
      EXPECT_ANY_NUMBER,
    ]);
  });

  it('should support males', async (): Promise<void> => {
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

    mockPatreonToken();
    mockPatreonIdentity(
      new Response(
        JSON.stringify({
          data: {
            id: 'test-id',

            attributes: {
              gender: PatreonGender.Male,
            },
          },
        }),
      ),
    );

    // Act
    const { expectOAuthSuccessResponse } = await fetchPatreon('male');

    // Assert
    expectOAuthSuccessResponse();
    expectToHaveQueriedAuthnDb(INSERT_INTO_USERS_QUERY, [
      null,
      null,
      Gender.Male,
      EXPECT_ANY_NUMBER,
    ]);
  });

  it('should support gender neutrality', async (): Promise<void> => {
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

    mockPatreonToken();
    mockPatreonIdentity(
      new Response(
        JSON.stringify({
          data: {
            id: 'test-id',

            attributes: {
              gender: PatreonGender.Neutral,
            },
          },
        }),
      ),
    );

    // Act
    const { expectOAuthSuccessResponse } = await fetchPatreon('neutral');

    // Assert
    expectOAuthSuccessResponse();
    expectToHaveQueriedAuthnDb(INSERT_INTO_USERS_QUERY, [
      null,
      null,
      Gender.Neutral,
      EXPECT_ANY_NUMBER,
    ]);
  });
});
