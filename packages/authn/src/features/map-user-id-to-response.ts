import { AccountNumber, UsageType } from '@quisido/workers-shared';
import StatusCode from '../constants/status-code.js';
import { SECONDS_PER_DAY } from '../constants/time.js';
import createAuthnId from '../utils/create-authn-id.js';
import getNowSeconds from '../utils/get-now-seconds.js';
import getTelemetry from '../utils/get-telemetry.js';
import getAuthnUserIdsNamespace from './get-authn-user-ids-namespace.js';
import getUsage from './get-usage.js';
import handlePutAuthnUserIdError from './handle-put-authn-user-id-error.js';
import handlePutAuthnUserId from './handle-put-authn-user-id.js';
import mapAuthnIdToResponseHeaders from './map-authn-id-to-response-headers.js';

export default function mapUserIdToResponse(id: number): Response {
  const authnId: string = createAuthnId();
  const authnUserIds: KVNamespace = getAuthnUserIdsNamespace();
  const nowSeconds: number = getNowSeconds();
  const { affect } = getTelemetry();
  const use = getUsage();

  /**
   *   We set the ID asynchronously because there are good odds that it
   * completes before the user finishes redirecting, loads the website, and
   * loads the `/whoami/` endpoint to validate it.
   *   If users are getting unauthenticated errors despite having authenticated,
   * then we can `await` this to fix that issue.
   */
  const startTime: number = Date.now();
  const expiration: number = nowSeconds + SECONDS_PER_DAY;
  use({
    account: AccountNumber.Quisido,
    count: `${authnId}=${id.toString()}`.length,
    per: SECONDS_PER_DAY,
    type: UsageType.KVStore,
  });
  affect(
    authnUserIds
      .put(authnId, id.toString(), {
        expiration,
        expirationTtl: SECONDS_PER_DAY,
      })
      .then(handlePutAuthnUserId({ authnId, expiration, id, startTime }))
      .catch(handlePutAuthnUserIdError({ authnId, expiration, id, startTime })),
  );


  return new Response(null, {
    headers: mapAuthnIdToResponseHeaders(authnId),
    status: StatusCode.SeeOther,
  });
}
