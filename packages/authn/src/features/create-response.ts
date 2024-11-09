import { StatusCode } from 'cloudflare-utils';
import { SECONDS_PER_DAY } from '../constants/time.js';
import nowSeconds from '../features/now-seconds.js';
import createAuthnId from '../utils/create-authn-id.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import createResponseHeaders from './create-response-headers.js';
import handlePutAuthnUserIdError from './handle-put-authn-user-id-error.js';
import handlePutAuthnUserId from './handle-put-authn-user-id.js';

interface Options {
  readonly returnPath: string;
  readonly userId: number;
}

export default function createResponse(
  this: AuthnFetchHandler,
  { returnPath, userId }: Options,
): Response {
  const { authnUserIdsNamespace } = this;

  const authnId: string = createAuthnId();
  const startTimeSeconds: number = nowSeconds.call(this);

  /**
   *   We set the ID asynchronously because there are good odds that it
   * completes before the user finishes redirecting, loads the website, and
   * loads the `/whoami/` endpoint to validate it.
   *   If users are getting unauthenticated errors despite having authenticated,
   * then we can `await` this to fix that issue.
   */
  const startTime: number = this.now();
  const expiration: number = startTimeSeconds + SECONDS_PER_DAY;
  this.affect(
    authnUserIdsNamespace
      .put(authnId, userId.toString(), {
        expiration,
        expirationTtl: SECONDS_PER_DAY,
      })
      .then(handlePutAuthnUserId.call(this, { authnId, startTime, userId }))
      .catch(
        handlePutAuthnUserIdError.call(this, { authnId, startTime, userId }),
      ),
  );

  return new Response(null, {
    headers: createResponseHeaders.call(this, { authnId, returnPath }),
    status: StatusCode.SeeOther,
  });
}
