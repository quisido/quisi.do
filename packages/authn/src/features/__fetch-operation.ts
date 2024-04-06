import EPOCH_SECONDS_OFFSET from '../constants/epoch-seconds-offset.js';
import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
import PatreonGender from '../constants/patreon-gender.js';
import { MILLISECONDS_PER_SECOND } from '../constants/time.js';
import type Cause from '../types/cause.js';
import type OAuthUser from '../types/oauth-user.js';
import isObject from '../utils/is-object.js';

const PATREON_GENDERS: Set<unknown> = new Set(Object.values(PatreonGender));

const GET_USER_ID_QUERY = `
SELECT \`userId\`
FROM \`oauth\`
WHERE \`oauthProvider\` = ?
  AND \`oauthId\` = ?
LIMIT 1;
`;

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

const isPatreonGender = (value: unknown): value is PatreonGender =>
  PATREON_GENDERS.has(value);

export default class FetchOperation extends CloudflareWorkerOperation<
  Cause,
  MetricName
> {
  public async createUser(
    usersDb: D1Database,
    oAuthProvider: OAuthProvider,
    { email, firstName, fullName, gender, id: oAuthId }: OAuthUser,
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
    this.emit(MetricName.UserInserted, usersLastRowId, {
      changes: usersChanges,
      duration: usersDuration,
      sizeAfter: usersSizeAfter,
    });

    this._ctx.waitUntil(
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
          }: D1Response): void => {
            this.emit(MetricName.OAuthInserted, oAuthLastRowId, {
              changes: oAuthChanges,
              duration: oAuthDuration,
              sizeAfter: oAuthSizeAfter,
            });
          },
        )
        .catch((err: unknown): void => {
          this.logErrorPrivately(err);
          this.emit(MetricName.FailedOAuthInsert);
        }),
    );

    if (email !== null) {
      this._ctx.waitUntil(
        usersDb
          .prepare(INSERT_INTO_EMAILS_QUERY)
          .bind(email, usersLastRowId)
          .run()
          .then(
            ({
              meta: {
                changes: emailsChanges,
                duration: emailsDuration,
                last_row_id: emailsLastRowId,
                size_after: emailsSizeAfter,
              },
            }: D1Response): void => {
              this.emit(MetricName.EmailInserted, emailsLastRowId, {
                changes: emailsChanges,
                duration: emailsDuration,
                lastRowId: emailsLastRowId,
                sizeAfter: emailsSizeAfter,
              });
            },
          )
          .catch((err: unknown): void => {
            this.logErrorPrivately(err);
            this.emit(MetricName.FailedEmailInsert);
          }),
      );
    }

    return usersLastRowId;
  }

  public async getUserId(
    db: D1Database,
    oauthProvider: OAuthProvider,
    oauthId: string,
  ): Promise<number | null> {
    const statement: D1PreparedStatement = db
      .prepare(GET_USER_ID_QUERY)
      .bind(oauthProvider, oauthId);

    const {
      meta: { duration, size_after: sizeAfter },
      results,
    } = await statement.all();

    this.emit(MetricName.OAuthUserIdSelected, {
      duration,
      sizeAfter,
    });

    const [firstResult] = results;
    if (!isObject(firstResult)) {
      return null;
    }

    this.assert('userId' in firstResult, {
      code: ErrorCode.MissingOAuthUserId,
      privateData: firstResult,
    });

    const { userId } = firstResult;
    this.assert(typeof userId === 'number', {
      code: ErrorCode.NonNumberOAuthUserId,
      privateData: firstResult,
      publicData: typeof userId,
    });

    return userId;
  }
}
