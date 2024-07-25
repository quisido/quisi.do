import type Gender from '../constants/gender.js';
import type OAuthProvider from '../constants/oauth-provider.js';
import { snapshot } from '../constants/worker.js';
import getNowSeconds from '../utils/get-now-seconds.js';
import putDatabaseUserMetadata from './put-database-user-metadata.js';
import getDatabase from './shared/get-database.js';

interface Options {
  readonly email: string | null;
  readonly firstName: string | null;
  readonly fullName: string | null;
  readonly gender: Gender;
}

const INSERT_INTO_USERS_QUERY = `
INSERT INTO \`users\` (
  \`firstName\`,
  \`fullName\`,
  \`gender\`,
  \`registrationTimestamp\`
)
VALUES (?, ?, ?, ?);
`;

export default async function putDatabaseUser(
  oAuthProvider: OAuthProvider,
  oAuthId: string,
  { email, firstName, fullName, gender }: Options,
): Promise<number> {
  const db: D1Database = getDatabase();
  const registrationTimestamp: number = getNowSeconds();

  // Use({
  //   Account: AccountNumber.Quisido,
  //   Type: UsageType.D1Write,
  // });
  return await snapshot(
    db
      .prepare(INSERT_INTO_USERS_QUERY)
      .bind(firstName, fullName, gender, registrationTimestamp)
      .run(),
    ({ meta }: D1Response): number => {
      const {
        changes,
        duration,
        last_row_id: userId,
        size_after: sizeAfter,
      } = meta;
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
