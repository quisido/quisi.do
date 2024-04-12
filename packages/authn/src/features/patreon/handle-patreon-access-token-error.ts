import { Snapshot } from 'proposal-async-context/src/index.js';
import ErrorCode from '../../constants/error-code.js';
import isObject from '../../utils/is-object.js';
import mapCauseToError from '../../utils/map-cause-to-error.js';
import mapReadableStreamToString from '../../utils/map-readable-stream-to-string.js';
import getPatreonOAuthClientId from './get-patreon-oauth-client-id.js';
import getPatreonRequestCode from './get-patreon-request-code.js';

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

    switch (error) {
      case 'invalid_client':
        throw mapCauseToError({
          code: ErrorCode.InvalidPatreonClientID,
          publicData: getPatreonOAuthClientId(),
        });

      case 'invalid_grant':
        throw mapCauseToError({
          code: ErrorCode.InvalidPatreonGrantCode,
          privateData: getPatreonRequestCode(),
        });

      case 'invalid_request': {
        if (typeof errorDescription === 'undefined') {
          throw mapCauseToError({
            code: ErrorCode.MissingInvalidPatreonRequestDescription,
            privateData: json,
          });
        }

        if (typeof errorDescription !== 'string') {
          throw mapCauseToError({
            code: ErrorCode.NonStringInvalidPatreonRequestDescription,
            privateData: errorDescription,
            publicData: typeof errorDescription,
          });
        }

        throw mapCauseToError({
          code: ErrorCode.InvalidPatreonTokenRequest,
          privateData: json,
        });
      }

      default:
        throw mapCauseToError({
          code: ErrorCode.UnknownPatreonTokenError,
          privateData: json,
        });
    }
  });
}
