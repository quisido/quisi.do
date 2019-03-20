import { ErrorCode } from '@quisido/authn-shared';
import isObject from '../../utils/is-object.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';
import getPatreonIdentityResponse from './get-patreon-identity-response.js';

const FORBIDDEN = 403;
const HTTP_REDIRECTION = 300;
const HTTP_SUCCESSFUL = 200;

export default async function getPatreonIdentity(): Promise<
  Record<string, unknown>
> {
  const response: Response = await getPatreonIdentityResponse();

  const getJson = async (): Promise<unknown> => {
    try {
      const json: unknown = await response.json();
      return json;
    } catch (err: unknown) {
      throw mapCauseToError({
        code: ErrorCode.NonJsonPatreonIdentityResponse,
      });
    }
  };

  const json: unknown = await getJson();
  if (response.status === FORBIDDEN) {
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
    throw mapCauseToError({
      code: ErrorCode.PatreonIdentityForbidden,
      privateData: json,
    });
  }

  if (
    response.status < HTTP_SUCCESSFUL &&
    response.status >= HTTP_REDIRECTION
  ) {
    throw mapCauseToError({
      code: ErrorCode.NonOkPatreonIdentityResponseStatus,
      privateData: json,
    });
  }

  if (!isObject(json)) {
    throw mapCauseToError({
      code: ErrorCode.NonObjectPatreonIdentityResponse,
      privateData: json,
      publicData: typeof json,
    });
  }

  return json;
}
