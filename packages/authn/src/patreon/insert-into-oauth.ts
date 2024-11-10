import { mapToError } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { type Gender } from '../constants/gender.js';
import { MetricName } from '../constants/metric-name.js';
import { type OAuthProvider } from '../constants/oauth-provider.js';
import {
  INSERT_INTO_EMAILS_QUERY,
  INSERT_INTO_OAUTH_QUERY,
  INSERT_INTO_USERS_QUERY,
} from '../constants/queries.js';

interface Options {
  readonly email: string | null;
  readonly firstName: string | null;
  readonly fullName: string | null;
  readonly gender: Gender;
}

export default async function insertIntoOAuth(
  this: AuthnFetchHandler,
  oAuthProvider: OAuthProvider,
  oAuthId: string,
  { email, firstName, fullName, gender }: Options,
): Promise<number> {
  const registrationTimestamp: number = this.nowSeconds();
  const {
    changes,
    duration,
    lastRowId: userId,
    sizeAfter,
  } = await this.getD1Response('AUTHN_DB', INSERT_INTO_USERS_QUERY, [
    firstName,
    fullName,
    gender,
    registrationTimestamp,
  ]);

  this.emitPublicMetric(MetricName.AuthenticationCreated, {
    changes,
    duration,
    sizeAfter,
    userId,
  });

  // Associate user ID with OAuth ID.
  const startTime: number = this.now();
  this.affect(
    this.getD1Response('AUTHN_DB', INSERT_INTO_OAUTH_QUERY, [
      userId,
      oAuthProvider,
      oAuthId,
    ])
      .then(({ changes, duration, lastRowId, sizeAfter }): void => {
        const endTime: number = this.now();

        this.emitPrivateMetric(MetricName.OAuthInserted, {
          changes,
          duration,
          endTime,
          lastRowId,
          sizeAfter,
          startTime,
          userId,
        });

        this.emitPublicMetric(MetricName.OAuthInserted, {
          changes,
          duration,
          endTime,
          sizeAfter,
          startTime,
        });
      })
      .catch((err: unknown): void => {
        const endTime: number = this.now();
        const error: Error = mapToError(err);
        this.logError(error);

        this.emitPrivateMetric(MetricName.OAuthInsertError, {
          endTime,
          startTime,
          userId,
        });

        this.emitPublicMetric(MetricName.OAuthInsertError, {
          endTime,
          startTime,
        });
      }),
  );

  // Associate user ID with email.
  if (email !== null) {
    const startTime: number = this.now();
    this.affect(
      this.getD1Response('AUTHN_DB', INSERT_INTO_EMAILS_QUERY, [email, userId])
        .then(({ changes, duration, lastRowId, sizeAfter }): void => {
          const endTime: number = this.now();

          this.emitPrivateMetric(MetricName.EmailInserted, {
            changes,
            duration,
            endTime,
            lastRowId,
            sizeAfter,
            startTime,
            userId,
          });

          this.emitPublicMetric(MetricName.EmailInserted, {
            changes,
            duration,
            endTime,
            sizeAfter,
            startTime,
          });
        })
        .catch((err: unknown): void => {
          const endTime: number = this.now();
          const error: Error = mapToError(err);
          this.logError(error);

          this.emitPrivateMetric(MetricName.EmailInsertError, {
            endTime,
            startTime,
            userId,
          });

          this.emitPublicMetric(MetricName.EmailInsertError, {
            endTime,
            startTime,
          });
        }),
    );
  }

  return userId;
}
