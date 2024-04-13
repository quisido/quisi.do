import { mapUnknownToError } from 'fmrs';
import { Snapshot } from 'proposal-async-context/src/index.js';
import type Gender from '../constants/gender.js';
import MetricName from '../constants/metric-name.js';
import type OAuthProvider from '../constants/oauth-provider.js';
import getNowSeconds from '../utils/get-now-seconds.js';
import getTelemetry from '../utils/get-telemetry.js';
import getDatabase from './get-database.js';

interface Options {
  readonly email: string | null;
  readonly firstName: string | null;
  readonly fullName: string | null;
  readonly gender: Gender;
}

const INSERT_INTO_EMAILS_QUERY = `
INSERT INTO \`emails\` (\`address\`, \`userId\`)
VALUES (?, ?);
`;

const INSERT_INTO_OAUTH_QUERY = `
INSERT INTO \`oauth\` (\`userId\`, \`oAuthProvider\`, \`oAuthId\`)
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

export default async function putDatabaseUser(
  oAuthProvider: OAuthProvider,
  oAuthId: string,
  { email, firstName, fullName, gender }: Options,
): Promise<number> {
  const registrationTimestamp: number = getNowSeconds();

  const db: D1Database = getDatabase();
  const usersStatement = db
    .prepare(INSERT_INTO_USERS_QUERY)
    .bind(firstName, fullName, gender, registrationTimestamp);

  const snapshot: Snapshot = new Snapshot();
  const {
    meta: {
      changes: usersChanges,
      duration: usersDuration,
      last_row_id: usersLastRowId,
      size_after: usersSizeAfter,
    },
  } = await usersStatement.run();

  return snapshot.run((): number => {
    const { affect, emitPublicMetric, logPrivateError } = getTelemetry();
    emitPublicMetric({
      changes: usersChanges,
      duration: usersDuration,
      lastRowId: usersLastRowId,
      name: MetricName.AuthenticationCreated,
      sizeAfter: usersSizeAfter,
    });

    // Associate the user ID with the OAuth ID.
    const startTime: number = Date.now();
    const handleOAuthError = (err: unknown): void => {
      logPrivateError(mapUnknownToError(err));
      emitPublicMetric({
        endTime: Date.now(),
        name: MetricName.OAuthInsertError,
        startTime,
        userId: usersLastRowId,
      });
    };

    const handleOAuthResponse = ({
      meta: {
        changes: oAuthChanges,
        duration: oAuthDuration,
        last_row_id: oAuthLastRowId,
        size_after: oAuthSizeAfter,
      },
    }: D1Response): void => {
      emitPublicMetric({
        changes: oAuthChanges,
        duration: oAuthDuration,
        endTime: Date.now(),
        lastRowId: oAuthLastRowId,
        name: MetricName.OAuthInserted,
        sizeAfter: oAuthSizeAfter,
        startTime,
        userId: usersLastRowId,
      });
    };

    affect(
      db
        .prepare(INSERT_INTO_OAUTH_QUERY)
        .bind(usersLastRowId, oAuthProvider, oAuthId)
        .run()
        .then(handleOAuthResponse)
        .catch(handleOAuthError),
    );

    // Associate the user ID with their email.
    if (email !== null) {
      const handleEmailError = (err: unknown): void => {
        logPrivateError(mapUnknownToError(err));
        emitPublicMetric({
          duration: Date.now() - startTime,
          endTime: Date.now(),
          name: MetricName.EmailInsertError,
          startTime,
          userId: usersLastRowId,
        });
      };

      const handleEmailResponse = ({
        meta: {
          changes: emailsChanges,
          duration: emailsDuration,
          last_row_id: emailsLastRowId,
          size_after: emailsSizeAfter,
        },
      }: D1Response): void => {
        emitPublicMetric({
          changes: emailsChanges,
          endTime: Date.now(),
          name: MetricName.EmailInserted,
          duration: emailsDuration,
          lastRowId: emailsLastRowId,
          sizeAfter: emailsSizeAfter,
          startTime,
          userId: usersLastRowId,
        });
      };

      affect(
        db
          .prepare(INSERT_INTO_EMAILS_QUERY)
          .bind(email, usersLastRowId)
          .run()
          .then(handleEmailResponse)
          .catch(handleEmailError),
      );
    }

    return usersLastRowId;
  });
}
