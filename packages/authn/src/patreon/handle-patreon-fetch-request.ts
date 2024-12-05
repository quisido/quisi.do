import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { Gender } from '../constants/gender.js';
import { MetricName } from '../constants/metric-name.js';
import { OAuthProvider } from '../constants/oauth-provider.js';
import type PatreonIdentity from './patreon-identity.js';

interface Options {
  readonly returnPath: string;
}

export default async function handlePatreonFetchRequest(
  this: AuthnFetchHandler,
  { returnPath }: Options,
): Promise<Response> {
  this.emitPublicMetric(MetricName.PatreonRequest);

  const accessToken: string = await this.getPatreonAccessToken();
  const identity: PatreonIdentity =
    await this.fetchPatreonIdentity(accessToken);

  const userId: number | null = await this.getOAuthUserId(
    OAuthProvider.Patreon,
    identity.id,
  );

  // Existing user
  if (userId !== null) {
    return this.createOAuthResponse({ returnPath, userId });
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

  const newUserId: number = await this.insertIntoOAuth(
    OAuthProvider.Patreon,
    oAuthId,
    {
      email: getEmail(),
      firstName,
      fullName,
      gender,
    },
  );

  return this.createOAuthResponse({ returnPath, userId: newUserId });
}
