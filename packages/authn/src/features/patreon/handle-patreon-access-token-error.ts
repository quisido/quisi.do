import { ErrorCode } from '@quisido/authn-shared';
import { Snapshot } from '@quisido/workers-shared';
import isObject from '../../utils/is-object.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';
import mapReadableStreamToString from '../../utils/map-readable-stream-to-string.js';
import handlePatreonAccessTokenErrorCode from './handle-patreon-access-token-error-code.js';

export default async function handlePatreonAccessTokenError(
  response: Response,
): Promise<never> {
  if (response.body === null) {
    throw mapCauseToError({
      code: ErrorCode.MissingPatreonTokenErrorBody,
    });
  }

  const snapshot: Snapshot = new Snapshot();
  const body: string = await mapReadableStreamToString(response.body);
  return snapshot.run((): never => {
    const getBodyJson = (): unknown => {
      try {
        return JSON.parse(body);
      } catch (err: unknown) {
        throw mapCauseToError({
          code: ErrorCode.NonJsonPatreonTokenErrorBody,
          privateData: body,
        });
      }
    };

    const json: unknown = getBodyJson();
    if (!isObject(json)) {
      throw mapCauseToError({
        code: ErrorCode.NonObjectPatreonTokenError,
        privateData: json,
        publicData: typeof json,
      });
    }

    const { error, error_description: errorDescription } = json;
    if (typeof error === 'undefined') {
      throw mapCauseToError({
        code: ErrorCode.MissingPatreonTokenErrorCode,
      });
    }

    return handlePatreonAccessTokenErrorCode({
      code: error,
      description: errorDescription,
      json,
    });
  });
}
