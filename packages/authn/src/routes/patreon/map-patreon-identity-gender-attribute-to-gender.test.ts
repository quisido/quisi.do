import { describe, it } from 'vitest';
import { Gender } from '../../constants/gender.js';
import { PatreonGender } from '../../constants/patreon-gender.js';
import { INSERT_INTO_USERS_QUERY } from '../../constants/queries.js';
import AuthnTest from '../../test/authn-test.js';
import { EXPECT_ANY_NUMBER } from '../../test/expect-any.js';

describe('mapPatreonIdentityGenderAttributeToGender', (): void => {
  it('should support neutral', async (): Promise<void> => {
    // Assemble
    const { expectDatabaseToHaveQueried, fetchPatreon } = new AuthnTest({
      patreonIdentity: JSON.stringify({
        data: {
          id: 'test-id',

          attributes: {
            gender: PatreonGender.Neutral,
          },
        },
      }),
    });

    // Act
    await fetchPatreon();

    // Assert
    expectDatabaseToHaveQueried(INSERT_INTO_USERS_QUERY, [
      null,
      null,
      Gender.Neutral,
      EXPECT_ANY_NUMBER,
    ]);
  });

  it('should support female', async (): Promise<void> => {
    // Assemble
    const { expectDatabaseToHaveQueried, fetchPatreon } = new AuthnTest({
      patreonIdentity: JSON.stringify({
        data: {
          id: 'test-id',

          attributes: {
            gender: PatreonGender.Female,
          },
        },
      }),
    });

    // Act
    await fetchPatreon();

    // Assert
    expectDatabaseToHaveQueried(INSERT_INTO_USERS_QUERY, [
      null,
      null,
      Gender.Female,
      EXPECT_ANY_NUMBER,
    ]);
  });

  it('should support male', async (): Promise<void> => {
    // Assemble
    const { expectDatabaseToHaveQueried, fetchPatreon } = new AuthnTest({
      patreonIdentity: JSON.stringify({
        data: {
          id: 'test-id',

          attributes: {
            gender: PatreonGender.Male,
          },
        },
      }),
    });

    // Act
    await fetchPatreon();

    // Assert
    expectDatabaseToHaveQueried(INSERT_INTO_USERS_QUERY, [
      null,
      null,
      Gender.Male,
      EXPECT_ANY_NUMBER,
    ]);
  });
});
