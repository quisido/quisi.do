import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { Gender } from '../constants/gender.js';
import { MetricName } from '../constants/metric-name.js';
import { OAuthProvider } from '../constants/oauth-provider.js';
import createOAuthResponse from '../oauth/create-oauth-response.js';
import getOAuthUserId from '../oauth/get-oauth-user-id.js';
import fetchPatreonIdentity from './fetch-patreon-identity.js';
import getPatreonAccessToken from './get-patreon-access-token.js';
import insertIntoOAuth from './insert-into-oauth.js';
import type PatreonIdentity from './patreon-identity.js';

interface Options {
  readonly returnPath: string;
}

export default async function handlePatreonFetchRequest(
  this: AuthnFetchHandler,
  { returnPath }: Options,
): Promise<Response> {
  this.emitPublicMetric(MetricName.PatreonRequest);

  const accessToken: string = await getPatreonAccessToken.call(this);
  const identity: PatreonIdentity = await fetchPatreonIdentity.call(
    this,
    accessToken,
  );

  const userId: number | null = await getOAuthUserId.call(
    this,
    OAuthProvider.Patreon,
    identity.id,
  );

  // Existing user
  if (userId !== null) {
    return createOAuthResponse.call(this, { returnPath, userId });
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

  const newUserId: number = await insertIntoOAuth.call(
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

  return createOAuthResponse.call(this, { returnPath, userId: newUserId });
}
