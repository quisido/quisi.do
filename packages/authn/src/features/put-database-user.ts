import type Gender from '../constants/gender.js';
import type OAuthProvider from '../constants/oauth-provider.js';
import { snapshot } from '../constants/worker.js';
import insertIntoUsers from './insert-into-users.js';
import putDatabaseUserMetadata from './put-database-user-metadata.js';

interface Options {
  readonly email: string | null;
  readonly firstName: string | null;
  readonly fullName: string | null;
  readonly gender: Gender;
}

export default async function putDatabaseUser(
  oAuthProvider: OAuthProvider,
  oAuthId: string,
  { email, firstName, fullName, gender }: Options,
): Promise<number> {
  return await snapshot(
    insertIntoUsers({
      firstName,
      fullName,
      gender,
    }),
    ({
      changes,
      duration,
      last_row_id: userId,
      size_after: sizeAfter,
    }: D1Meta): number => {
      return putDatabaseUserMetadata({
        changes,
        duration,
        email,
        oAuthId,
        oAuthProvider,
        sizeAfter,
        userId,
      });
    },
  );
}
