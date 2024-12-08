import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { OAuthProvider } from '../constants/oauth-provider.js';
import createOAuthResponse from '../oauth/create-oauth-response.js';
import getOAuthUserId from '../oauth/get-oauth-user-id.js';
import fetchPatreonIdentity from './fetch-patreon-identity.js';
import getPatreonAccessToken from './get-patreon-access-token.js';
import insertIntoOAuth from './insert-into-oauth.js';
import mapPatreonIdentityToUserRow from './map-patreon-identity-to-user-row.js';
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

  const newUserId: number = await insertIntoOAuth.call(
    this,
    OAuthProvider.Patreon,
    identity.id,
    mapPatreonIdentityToUserRow(identity),
  );

  return createOAuthResponse.call(this, { returnPath, userId: newUserId });
}
