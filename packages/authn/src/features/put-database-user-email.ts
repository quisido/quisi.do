/// <reference types="@cloudflare/workers-types" />
import { AccountNumber, UsageType } from "@quisido/workers-shared";
import getTelemetry from "../utils/get-telemetry.js";
import getDatabase from "./get-database.js";
import getUsage from "./get-usage.js";
import handleInsertIntoEmailsError from './handle-insert-into-emails-error.js';
import handleInsertIntoEmailsResponse from './handle-insert-into-emails-response.js';

interface Options {
  readonly email: string;
  readonly userId: number;
}

const INSERT_INTO_EMAILS_QUERY = `
INSERT INTO \`emails\` (\`address\`, \`userId\`)
VALUES (?, ?);
`;

export default function putDatabaseUserEmail({
  email,
  userId,
}: Options): void {
  const db: D1Database = getDatabase();
  const { affect } = getTelemetry();
  const use = getUsage();

  use({
    account: AccountNumber.Quisido,
    type: UsageType.D1Write,
  });
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
