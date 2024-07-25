import Gender from '../../constants/gender.js';
import OAuthProvider from '../../constants/oauth-provider.js';
import { snapshot } from '../../constants/worker.js';
import createResponse from '../../features/create-response.js';
import putDatabaseUser from '../../features/put-database-user.js';
import type PatreonIdentity from './patreon-identity.js';

export default async function handlePatreonOAuthUserId(
  userId: number | null,
  identity: PatreonIdentity,
  returnPath: string,
): Promise<Response> {
  if (userId !== null) {
    return createResponse({ id: userId, returnPath });
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

  return await snapshot(
    putDatabaseUser(OAuthProvider.Patreon, oAuthId, {
      email: getEmail(),
      firstName,
      fullName,
      gender,
    }),
    (newUserId: number): Response =>
      createResponse({ id: newUserId, returnPath }),
  );
}
