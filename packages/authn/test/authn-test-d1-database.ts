import { TestD1Database } from 'cloudflare-test-utils';
import {
  INSERT_INTO_EMAILS_QUERY,
  INSERT_INTO_OAUTH_QUERY,
  INSERT_INTO_USERS_QUERY,
  SELECT_USERID_FROM_OAUTH_QUERY,
} from '../src/constants/queries.js';

interface Options {
  readonly insertIntoEmailsError?: Error | undefined;
  readonly insertIntoOAuthError?: Error | undefined;
  readonly oAuthRowId?: number | undefined;
  readonly oAuthUserIdResults?: readonly unknown[] | undefined;
  readonly usersRowId?: number | undefined;
}

export default class AuthnTestD1Database extends TestD1Database {
  public constructor({
    insertIntoEmailsError,
    insertIntoOAuthError,
    oAuthRowId,
    oAuthUserIdResults,
    usersRowId,
  }: Options) {
    super({
      [INSERT_INTO_EMAILS_QUERY]: {
        error: insertIntoEmailsError,
      },
      [INSERT_INTO_OAUTH_QUERY]: {
        error: insertIntoOAuthError,
        lastRowId: oAuthRowId,
      },
      [INSERT_INTO_USERS_QUERY]: {
        lastRowId: usersRowId,
      },
      [SELECT_USERID_FROM_OAUTH_QUERY]: {
        results: oAuthUserIdResults,
      },
    });
  }
}
