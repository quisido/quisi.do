import { ErrorCode } from '@quisido/authn-shared';
import { Snapshot } from '@quisido/workers-shared';
import mapCauseToError from '../../utils/map-cause-to-error.js';
import getPatreonTokenResponse from './get-patreon-token-response.js';
import handlePatreonAccessTokenError from './handle-patreon-access-token-error.js';
import mapTokenResponseJsonToAccessToken from './map-token-response-json-to-access-token.js';

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

    const json: unknown = await getJson();
    return mapTokenResponseJsonToAccessToken(json);
  });
}
