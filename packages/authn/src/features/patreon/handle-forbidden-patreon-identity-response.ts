import { ErrorCode } from '@quisido/authn-shared';
import mapCauseToError from '../../utils/map-cause-to-error.js';

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
  json: unknown,
): never {
  throw mapCauseToError({
    code: ErrorCode.PatreonIdentityForbidden,
    privateData: json,
  });
}
