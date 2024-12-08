import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { type Gender } from '../constants/gender.js';
import { MetricName } from '../constants/metric-name.js';
import { type OAuthProvider } from '../constants/oauth-provider.js';
import {
  INSERT_INTO_EMAILS_QUERY,
  INSERT_INTO_OAUTH_QUERY,
  INSERT_INTO_USERS_QUERY,
} from '../constants/queries.js';

interface Options {
  readonly email: string | null;
  readonly firstName: string | null;
  readonly fullName: string | null;
  readonly gender: Gender;
}

export default async function insertIntoOAuth(
  this: AuthnFetchHandler,
  oAuthProvider: OAuthProvider,
  oAuthId: string,
  { email, firstName, fullName, gender }: Options,
): Promise<number> {
  const registrationTimestamp: number = this.nowSeconds();
  const {
    changes,
    duration,
    lastRowId: userId,
    sizeAfter,
  } = await this.getD1Response('AUTHN_DB', INSERT_INTO_USERS_QUERY, [
    firstName,
    fullName,
    gender,
    registrationTimestamp,
  ]);

  this.emitPublicMetric(MetricName.AuthenticationCreated, {
    changes,
    duration,
    sizeAfter,
    userId,
  });

  // Associate user ID with OAuth ID.
  this.affect(
    this.getD1Response('AUTHN_DB', INSERT_INTO_OAUTH_QUERY, [
      userId,
      oAuthProvider,
      oAuthId,
    ]),
  );

  // Associate user ID with email.
  if (email !== null) {
    this.affect(
      this.getD1Response('AUTHN_DB', INSERT_INTO_EMAILS_QUERY, [email, userId]),
    );
  }

  return userId;
}
