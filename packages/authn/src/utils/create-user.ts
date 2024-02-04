/// <reference types="@cloudflare/workers-types" />
import mapUnknownToString from 'unknown2string';
import EPOCH_SECONDS_OFFSET from '../constants/epoch-seconds-offset.js';
import MetricName from '../constants/metric-name.js';
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
  emit: (
    name: MetricName,
    value?: null | number,
    dimensions?: Readonly<Record<string, number | string>>,
  ) => void,
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
  } = await usersStatement.run();
  emit(MetricName.UserInserted, usersLastRowId, {
    changes: usersChanges,
    duration: usersDuration,
    sizeAfter: usersSizeAfter,
  });

  ctx.waitUntil(
    usersDb
      .prepare(INSERT_INTO_OAUTH_QUERY)
      .bind(oAuthId, oAuthProvider, usersLastRowId)
      .run()
      .then(
        ({
          meta: {
            changes: oAuthChanges,
            duration: oAuthDuration,
            last_row_id: oAuthLastRowId,
            size_after: oAuthSizeAfter,
          },
        }: D1Result): void => {
          emit(MetricName.OAuthInserted, oAuthLastRowId, {
            changes: oAuthChanges,
            duration: oAuthDuration,
            sizeAfter: oAuthSizeAfter,
          });
        },
      )
      .catch((err: unknown): void => {
        emit(MetricName.FailedOAuthInsert, null, {
          message: mapUnknownToString(err),
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
          }: D1Result): void => {
            emit(MetricName.EmailInserted, emailsLastRowId, {
              changes: emailsChanges,
              duration: emailsDuration,
              lastRowId: emailsLastRowId,
              sizeAfter: emailsSizeAfter,
            });
          },
        )
        // TODO: This needs to be emit and put on /dashboard!
        .catch((err: unknown): void => {
          emit(MetricName.FailedEmailInsert, null, {
            message: mapUnknownToString(err),
          });
        }),
    );
  }

  return usersLastRowId;
}
