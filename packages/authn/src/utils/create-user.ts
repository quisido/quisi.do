/// <reference types="@cloudflare/workers-types" />
import mapUnknownToString from 'unknown2string';
import EPOCH_SECONDS_OFFSET from '../constants/epoch-seconds-offset.js';
import type OAuthProvider from '../constants/oauth-provider.js';
import StatusCode from '../constants/status-code.js';
import { MILLISECONDS_PER_SECOND } from '../constants/time';
import type OAuthUser from '../types/oauth-user.js';
import assert from './assert.js';

const EMAILS_QUERY = `
INSERT INTO \`emails\` (\`address\`, \`userId\`)
VALUES (?, ?);
`;

const OAUTH_QUERY = `
INSERT INTO \`oauth\` (\`oauthId\`, \`oauthProvider\`, \`userId\`)
VALUES (?, ?, ?);
`;

const USERS_QUERY = `
INSERT INTO \`users\` (
  \`firstName\`,
  \`fullName\`,
  \`gender\`,
  \`registrationTimestamp\`
)
VALUES (?, ?, ?, ?);
`;

export default async function createUser(
  usersDb: D1Database,
  oAuthProvider: OAuthProvider,
  { email, firstName, fullName, gender, id: oAuthId }: OAuthUser,
  ctx: ExecutionContext,
): Promise<number> {
  const nowSeconds: number = Date.now() / MILLISECONDS_PER_SECOND;
  const usersStatement = usersDb
    .prepare(USERS_QUERY)
    .bind(firstName, fullName, gender, nowSeconds - EPOCH_SECONDS_OFFSET);

  const {
    meta: { duration: usersDuration },
    success: usersSuccess,
  } = await usersStatement.run();

  // TODO: This needs to be emit and put on /dashboard!
  console.log({
    duration: usersDuration,
    query: 'utils/create-user#users',
    success: usersSuccess,
  });

  const result: Record<string, unknown> | null = await usersDb
    .prepare('SELECT last_insert_rowid();')
    .first();

  assert(
    result !== null,
    'Expected a row to have been inserted.',
    StatusCode.BadGateway,
  );

  assert(
    'last_insert_rowid()' in result,
    'Expected a last insert row ID.',
    StatusCode.BadGateway,
  );

  const { 'last_insert_rowid()': userId } = result;
  assert(
    typeof userId === 'number',
    'Expected last insert row ID to be numeric.',
    StatusCode.BadGateway,
  );

  ctx.waitUntil(
    usersDb
      .prepare(OAUTH_QUERY)
      .bind(oAuthId, oAuthProvider, userId)
      .run()
      // TODO: This needs to be emit and put on /dashboard!
      .then(
        ({
          meta: { duration: oAuthDuration },
          success: oAuthSuccess,
        }: D1Result): void => {
          console.log({
            duration: oAuthDuration,
            query: 'utils/create-user#oauth',
            success: oAuthSuccess,
          });
        },
      )
      // TODO: This needs to be emit and put on /dashboard!
      .catch((err: unknown): void => {
        console.error({
          message: mapUnknownToString(err),
          query: 'utils/create-user#oauth',
          success: false,
        });
      }),
  );

  ctx.waitUntil(
    usersDb
      .prepare(EMAILS_QUERY)
      .bind(email, userId)
      .run()
      // TODO: This needs to be emit and put on /dashboard!
      .then(
        ({
          meta: { duration: oAuthDuration },
          success: oAuthSuccess,
        }: D1Result): void => {
          console.log({
            duration: oAuthDuration,
            query: 'utils/create-user#emails',
            success: oAuthSuccess,
          });
        },
      )
      // TODO: This needs to be emit and put on /dashboard!
      .catch((err: unknown): void => {
        console.error({
          message: mapUnknownToString(err),
          query: 'utils/create-user#emails',
          success: false,
        });
      }),
  );

  return userId;
}
