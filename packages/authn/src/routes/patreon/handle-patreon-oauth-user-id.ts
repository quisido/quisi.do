import { Gender } from '../../constants/gender.js';
import { OAuthProvider } from '../../constants/oauth-provider.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import createResponse from '../../features/create-response.js';
import putDatabaseUser from '../../features/put-database-user.js';
import type PatreonIdentity from './patreon-identity.js';

export default async function handlePatreonOAuthUserId(
  this: AuthnFetchHandler,
  userId: number | null,
  identity: PatreonIdentity,
  returnPath: string,
): Promise<Response> {
  if (userId !== null) {
    return createResponse.call(this, { returnPath, userId });
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

  const newUserId: number = await putDatabaseUser.call(
    this,
    OAuthProvider.Patreon,
    oAuthId,
    {
      email: getEmail(),
      firstName,
      fullName,
      gender,
    },
  );

  return createResponse.call(this, { returnPath, userId: newUserId });
}
