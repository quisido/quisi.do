import type Worker from '@quisido/worker';
import Gender from '../../constants/gender.js';
import OAuthProvider from '../../constants/oauth-provider.js';
import createResponse from '../../features/create-response.js';
import putDatabaseUser from '../../features/put-database-user.js';
import type PatreonIdentity from './patreon-identity.js';

export default async function handlePatreonOAuthUserId(this: Worker,
  userId: number | null,
  identity: PatreonIdentity,
  returnPath: string,
): Promise<Response> {
  if (userId !== null) {
    return createResponse.call(this,{ returnPath, userId });
  }

  const {
    email = null,
    firstName = null,
    fullName = null,
    gender = Gender.Neutral,
    id: oAuthId,
    isEmailVerified = false,
  } = identity;
  const getEmail = (): string | null => {
    if (!isEmailVerified) {
      return null;
    }
    return email;
  };

  return await this.snapshot(
    putDatabaseUser.call(this,OAuthProvider.Patreon, oAuthId, {
      email: getEmail(),
      firstName,
      fullName,
      gender,
    }),
    (newUserId: number): Response =>
      createResponse.call(this,{ returnPath, userId: newUserId }),
  );
}
