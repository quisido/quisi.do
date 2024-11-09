import { type Gender } from '../constants/gender.js';
import { type OAuthProvider } from '../constants/oauth-provider.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import insertIntoUsers from './insert-into-users.js';
import putDatabaseUserMetadata from './put-database-user-metadata.js';

interface Options {
  readonly email: string | null;
  readonly firstName: string | null;
  readonly fullName: string | null;
  readonly gender: Gender;
}

export default async function putDatabaseUser(
  this: AuthnFetchHandler,
  oAuthProvider: OAuthProvider,
  oAuthId: string,
  { email, firstName, fullName, gender }: Options,
): Promise<number> {
  const {
    changes,
    duration,
    last_row_id: userId,
    size_after: sizeAfter,
  }: D1Meta = await insertIntoUsers.call(this, {
    firstName,
    fullName,
    gender,
  });

  return putDatabaseUserMetadata.call(this, {
    changes,
    duration,
    email,
    oAuthId,
    oAuthProvider,
    sizeAfter,
    userId,
  });
}
