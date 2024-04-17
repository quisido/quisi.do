import { mapUnknownToError } from 'fmrs';
import DEFAULT_RETURN_HREF from '../constants/default-return-href.js';
import MetricName from '../constants/metric-name.js';
import StatusCode from '../constants/status-code.js';
import { SECONDS_PER_DAY } from '../constants/time.js';
import createAuthenticationId from '../utils/create-authentication-id.js';
import getNowSeconds from '../utils/get-now-seconds.js';
import getReturnHref from '../utils/get-return-href.js';
import getTelemetry from '../utils/get-telemetry.js';
import getAuthnUserIdsNamespace from './get-authn-user-ids-namespace.js';
import getCookieDomain from './get-cookie-domain.js';

export default function mapUserIdToResponse(id: number): Response {
  const authnId: string = createAuthenticationId();
  const authnUserIds: KVNamespace = getAuthnUserIdsNamespace();
  const nowSeconds: number = getNowSeconds();
  const { affect, emitPublicMetric, logPrivateError } = getTelemetry();

  /**
   *   We set the ID asynchronously because there are good odds that it
   * completes before the user finishes redirecting, loads the website, and
   * loads the `/whoami` endpoint to validate it.
   *   If users are getting unauthenticated errors despite having authenticated,
   * then we can `await` this to fix that issue.
   */
  const startTime: number = Date.now();
  affect(
    authnUserIds
      .put(authnId, id.toString(), {
        expiration: nowSeconds + SECONDS_PER_DAY,
        expirationTtl: SECONDS_PER_DAY,
      })
      .then((): void => {
        emitPublicMetric({
          endTime: Date.now(),
          name: MetricName.AuthnIdCreated,
          startTime,
        });
      })
      .catch((err: unknown): void => {
        logPrivateError(mapUnknownToError(err));
        emitPublicMetric({
          endTime: Date.now(),
          name: MetricName.AuthnIdError,
          startTime,
        });
      }),
  );

  const cookieDomain: string = getCookieDomain();
  const returnHref: string = getReturnHref() ?? DEFAULT_RETURN_HREF;
  return new Response(null, {
    status: StatusCode.SeeOther,
    headers: new Headers({
      'Content-Location': returnHref,
      Location: returnHref,
      'Set-Cookie': [
        `__Secure-Authentication-ID=${authnId}`,
        `Domain=${cookieDomain}`,
        `Max-Age=${SECONDS_PER_DAY}`,
        'Partitioned',
        'Path=/',
        // `Lax` is the default behavior.
        // 'SameSite=Lax',
        'Secure',
      ].join('; '),
    }),
  });
}
