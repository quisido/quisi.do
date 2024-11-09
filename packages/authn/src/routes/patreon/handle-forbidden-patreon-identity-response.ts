import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

/**
 * {
 *   "errors": [
 *     {
 *       "code": null,
 *       "code_name": "OAuthClientViewForbidden",
 *       "id": "00000000-0000-0000-0000-000000000000",
 *       "status": "403",
 *       "title": "You do not have permission to view this OAuth Client.",
 *       "detail": "You do not have permission to view OAuth Client with id
 *                  0123456789abcdef0123456789abcdef0123456789abcdef.",
 *     }
 *   ]
 * }
 */

export default function handleForbiddenPatreonIdentityResponse(
  this: AuthnFetchHandler,
  json: unknown,
): never {
  this.emitPublicMetric(MetricName.ForbiddenPatreonIdentityResponse);
  this.emitPrivateMetric(MetricName.ForbiddenPatreonIdentityResponse, {
    value: JSON.stringify(json),
  });

  throw new FatalError(ErrorCode.ForbiddenPatreonIdentityResponse);
}
