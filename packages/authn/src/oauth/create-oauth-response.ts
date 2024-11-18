import { StatusCode } from 'cloudflare-utils';
import { mapToError } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { SECONDS_PER_DAY } from '../constants/time.js';
import createAuthnId from '../utils/create-authn-id.js';

interface Options {
  readonly returnPath: string;
  readonly userId: number;
}

export default function createOAuthResponse(
  this: AuthnFetchHandler,
  { returnPath, userId }: Options,
): Response {
  const authnId: string = createAuthnId();

  /**
   *   We set the ID asynchronously because there are good odds that it
   * completes before the user finishes redirecting, loads the website, and
   * loads the `/whoami/` endpoint to validate it.
   *   If users are getting unauthenticated errors despite having authenticated,
   * then we can `await` this to fix that issue.
   */
  const startTime: number = this.now();
  const startTimeSeconds: number = this.nowSeconds();
  const expiration: number = startTimeSeconds + SECONDS_PER_DAY;
  this.affect(
    this.authnUserIdsNamespace
      .put(authnId, userId.toString(), {
        expiration,
        expirationTtl: SECONDS_PER_DAY,
      })
      .then((): void => {
        this.emitPublicMetric(MetricName.AuthnIdCreated, {
          endTime: this.now(),
          startTime,
        });
      })
      .catch((err: unknown): void => {
        const endTime: number = this.now();

        this.logError(mapToError(err));

        this.emitPrivateMetric(MetricName.AuthnIdError, {
          authnId,
          endTime,
          startTime,
          userId,
        });

        this.emitPublicMetric(MetricName.AuthnIdError, {
          endTime,
          startTime,
        });
      })
      .finally((): void => {
        this.setAuthnUserIdInMemory(authnId, userId);
      }),
  );

  return new Response(null, {
    status: StatusCode.SeeOther,

    headers: new Headers({
      'content-location': `https://${this.host}${returnPath}`,
      location: `https://${this.host}${returnPath}`,
      'set-cookie': [
        `__Secure-Authentication-ID=${authnId}`,
        `Domain=${this.cookieDomain}`,
        `Max-Age=${SECONDS_PER_DAY.toString()}`,
        'Partitioned',
        'Path=/',
        'SameSite=Lax',
        'Secure',
      ].join('; '),
    }),
  });
}
