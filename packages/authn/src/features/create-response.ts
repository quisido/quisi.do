import type Worker from '@quisido/worker';
import { StatusCode } from 'cloudflare-utils';
import { SECONDS_PER_DAY } from '../constants/time.js';
import getNowSeconds from '../features/get-now-seconds.js';
import createAuthnId from '../utils/create-authn-id.js';
import createResponseHeaders from './create-response-headers.js';
import getAuthnUserIdsNamespace from './get-authn-user-ids-namespace.js';
import handlePutAuthnUserIdError from './handle-put-authn-user-id-error.js';
import handlePutAuthnUserId from './handle-put-authn-user-id.js';

interface Options {
  readonly returnPath: string;
  readonly userId: number;
}

export default function createResponse(
  this: Worker,
  { returnPath, userId }: Options,
): Response {
  const authnId: string = createAuthnId();
  const authnUserIds: KVNamespace = getAuthnUserIdsNamespace.call(this);
  const nowSeconds: number = getNowSeconds.call(this);

  /**
   *   We set the ID asynchronously because there are good odds that it
   * completes before the user finishes redirecting, loads the website, and
   * loads the `/whoami/` endpoint to validate it.
   *   If users are getting unauthenticated errors despite having authenticated,
   * then we can `await` this to fix that issue.
   */
  const startTime: number = this.getNow();
  const expiration: number = nowSeconds + SECONDS_PER_DAY;
  this.affect(
    authnUserIds
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
