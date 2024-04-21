import { ErrorCode } from "@quisido/authn-shared";
import isObject from "../../utils/is-object.js";
import mapCauseToError from "../../utils/map-cause-to-error.js";

export default function mapTokenResponseJsonToAccessToken(
  json: unknown,
): string {
  // Invalid response
  if (!isObject(json)) {
    throw mapCauseToError({
      code: ErrorCode.NonObjectPatreonTokenResponse,
      privateData: json,
      publicData: typeof json,
    });
  }

  // Missing access token
  const { access_token: accessToken } = json;
  if (typeof accessToken === 'undefined') {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonAccessToken,
    });
  }

  // Invalid access token
  if (typeof accessToken !== 'string') {
    throw mapCauseToError({
      code: ErrorCode.NonStringPatreonAccessToken,
      privateData: accessToken,
      publicData: typeof accessToken,
    });
  }

  return accessToken;
}
