/// <reference types="@cloudflare/workers-types" />
import mapUnknownToString from 'unknown2string';
import EPOCH_SECONDS_OFFSET from '../constants/epoch-seconds-offset.js';
import type OAuthProvider from '../constants/oauth-provider.js';
import { MILLISECONDS_PER_SECOND } from '../constants/time';
import type OAuthUser from '../types/oauth-user.js';

const INSERT_INTO_EMAILS_QUERY = `
INSERT INTO \`emails\` (\`address\`, \`userId\`)
VALUES (?, ?);
`;

const INSERT_INTO_OAUTH_QUERY = `
INSERT INTO \`oauth\` (\`oauthId\`, \`oauthProvider\`, \`userId\`)
VALUES (?, ?, ?);
`;

const INSERT_INTO_USERS_QUERY = `
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
  const usersStatement = usersDb.prepare(INSERT_INTO_USERS_QUERY).bind(
    firstName,
    fullName,
    gender,
    Math.floor(nowSeconds - EPOCH_SECONDS_OFFSET), // `registrationTimestamp`
  );

  const {
    meta: {
      changes: usersChanges,
      duration: usersDuration,
      last_row_id: usersLastRowId,
      size_after: usersSizeAfter,
    },
    success: usersSuccess,
  } = await usersStatement.run();

  // TODO: This needs to be emit and put on /dashboard!
  console.log({
    changes: usersChanges,
    duration: usersDuration,
    lastRowId: usersLastRowId,
    query: 'utils/create-user#users',
    sizeAfter: usersSizeAfter,
    success: usersSuccess,
  });

  ctx.waitUntil(
    usersDb
      .prepare(INSERT_INTO_OAUTH_QUERY)
      .bind(oAuthId, oAuthProvider, usersLastRowId)
      .run()
      // TODO: This needs to be emit and put on /dashboard!
      .then(
        ({
          meta: {
            changes: oAuthChanges,
            duration: oAuthDuration,
            last_row_id: oAuthLastRowId,
            size_after: oAuthSizeAfter,
          },
          success: oAuthSuccess,
        }: D1Result): void => {
          console.log({
            changes: oAuthChanges,
            duration: oAuthDuration,
            lastRowId: oAuthLastRowId,
            query: 'utils/create-user#oauth',
            sizeAfter: oAuthSizeAfter,
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

  if (email !== null) {
    ctx.waitUntil(
      usersDb
        .prepare(INSERT_INTO_EMAILS_QUERY)
        .bind(email, usersLastRowId)
        .run()
        // TODO: This needs to be emit and put on /dashboard!
        .then(
          ({
            meta: {
              changes: emailsChanges,
              duration: emailsDuration,
              last_row_id: emailsLastRowId,
              size_after: emailsSizeAfter,
            },
            success: oAuthSuccess,
          }: D1Result): void => {
            console.log({
              changes: emailsChanges,
              duration: emailsDuration,
              lastRowId: emailsLastRowId,
              query: 'utils/create-user#emails',
              sizeAfter: emailsSizeAfter,
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
  }

  return usersLastRowId;
}
