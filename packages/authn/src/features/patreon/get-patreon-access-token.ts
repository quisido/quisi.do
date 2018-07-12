import { ErrorCode } from '@quisido/authn-shared';
import { Snapshot } from 'proposal-async-context/src/index.js';
import isObject from '../../utils/is-object.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';
import getPatreonTokenResponse from './get-patreon-token-response.js';
import handlePatreonAccessTokenError from './handle-patreon-access-token-error.js';

const HTTP_SUCCESSFUL = 200;
const HTTP_REDIRECTION = 300;

export default async function getPatreonAccessToken(): Promise<string> {
  const snapshot: Snapshot = new Snapshot();
  const response: Response = await getPatreonTokenResponse();
  return snapshot.run(async (): Promise<string> => {
    // HTTP error
    if (
      response.status < HTTP_SUCCESSFUL ||
      response.status >= HTTP_REDIRECTION
    ) {
      return handlePatreonAccessTokenError(response);
    }

    const getJson = async (): Promise<unknown> => {
      try {
        const json: unknown = await response.json();
        return json;
      } catch (err: unknown) {
        throw mapCauseToError({
          code: ErrorCode.NonJsonPatreonTokenResponse,
        });
      }
    };

    // Invalid response
    const json: unknown = await getJson();
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
  });
}
