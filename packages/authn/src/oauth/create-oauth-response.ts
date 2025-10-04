import { StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { SECONDS_PER_DAY } from '../constants/time.js';
import noop from '../test/noop.js';
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
  const startTimeSeconds: number = this.nowSeconds();
  const expiration: number = startTimeSeconds + SECONDS_PER_DAY;
  this.affect(
    this.putKVNamespace('AUTHN_USER_IDS', authnId, userId.toString(), {
      expiration,
      expirationTtl: SECONDS_PER_DAY,
    })
      .catch(noop)
      .finally((): void => {
        this.setAuthnUserIdInMemory(authnId, userId);
      }),
  );

  return new Response(null, {
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
    status: StatusCode.SeeOther,
  });
}
