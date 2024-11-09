/// <reference types="@cloudflare/workers-types" />
import { INSERT_INTO_EMAILS_QUERY } from '../constants/queries.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import handleInsertIntoEmailsError from './handle-insert-into-emails-error.js';
import handleInsertIntoEmailsResponse from './handle-insert-into-emails-response.js';

interface Options {
  readonly email: string;
  readonly userId: number;
}

export default function putDatabaseUserEmail(
  this: AuthnFetchHandler,
  { email, userId }: Options,
): void {
  const insertIntoEmails: Promise<D1Response> = this.query(
    INSERT_INTO_EMAILS_QUERY,
    [email, userId],
  );

  this.affect(
    insertIntoEmails
      .then(handleInsertIntoEmailsResponse.call(this, userId))
      .catch(handleInsertIntoEmailsError.call(this, userId)),
  );
}
