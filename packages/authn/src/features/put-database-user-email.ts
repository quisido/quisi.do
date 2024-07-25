/// <reference types="@cloudflare/workers-types" />
import { affect } from '../constants/worker.js';
import handleInsertIntoEmailsError from './handle-insert-into-emails-error.js';
import handleInsertIntoEmailsResponse from './handle-insert-into-emails-response.js';
import getDatabase from './shared/get-database.js';

interface Options {
  readonly email: string;
  readonly userId: number;
}

const INSERT_INTO_EMAILS_QUERY = `
INSERT INTO \`emails\` (\`address\`, \`userId\`)
VALUES (?, ?);
`;

export default function putDatabaseUserEmail({ email, userId }: Options): void {
  const db: D1Database = getDatabase();

  // Use({
  //   Account: AccountNumber.Quisido,
  //   Type: UsageType.D1Write,
  // });
  const insertIntoEmails: Promise<D1Response> = db
    .prepare(INSERT_INTO_EMAILS_QUERY)
    .bind(email, userId)
    .run();

  affect(
    insertIntoEmails
      .then(handleInsertIntoEmailsResponse(userId))
      .catch(handleInsertIntoEmailsError(userId)),
  );
}
