/// <reference types="@cloudflare/workers-types" />
import type Worker from '@quisido/worker';
import { INSERT_INTO_EMAILS_QUERY } from '../constants/queries.js';
import handleInsertIntoEmailsError from './handle-insert-into-emails-error.js';
import handleInsertIntoEmailsResponse from './handle-insert-into-emails-response.js';
import getDatabase from './shared/get-database.js';

interface Options {
  readonly email: string;
  readonly userId: number;
}

export default function putDatabaseUserEmail(
  this: Worker,
  { email, userId }: Options,
): void {
  const db: D1Database = getDatabase.call(this);

  const insertIntoEmails: Promise<D1Response> = db
    .prepare(INSERT_INTO_EMAILS_QUERY)
    .bind(email, userId)
    .run();

  this.affect(
    insertIntoEmails
      .then(handleInsertIntoEmailsResponse.call(this, userId))
      .catch(handleInsertIntoEmailsError.call(this, userId)),
  );
}
