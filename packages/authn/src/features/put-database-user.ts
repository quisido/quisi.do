import { AccountNumber, UsageType } from '@quisido/workers-shared';
import { Snapshot } from 'proposal-async-context/src/index.js';
import type Gender from '../constants/gender.js';
import type OAuthProvider from '../constants/oauth-provider.js';
import getNowSeconds from '../utils/get-now-seconds.js';
import getDatabase from './get-database.js';
import getUsage from './get-usage.js';
import putDatabaseUserMetadata from './put-database-user-metadata.js';

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
  const registrationTimestamp: number = getNowSeconds();
  const use = getUsage();

  const db: D1Database = getDatabase();
  const usersStatement = db
    .prepare(INSERT_INTO_USERS_QUERY)
    .bind(firstName, fullName, gender, registrationTimestamp);

  const snapshot: Snapshot = new Snapshot();

  use({
    account: AccountNumber.Quisido,
    type: UsageType.D1Write,
  });
  const {
    meta: { changes, duration, last_row_id: userId, size_after: sizeAfter },
  } = await usersStatement.run();

  return snapshot.run((): number =>
    putDatabaseUserMetadata({
      changes,
      duration,
      email,
      oAuthId,
      oAuthProvider,
      sizeAfter,
      userId,
    }),
  );
}
