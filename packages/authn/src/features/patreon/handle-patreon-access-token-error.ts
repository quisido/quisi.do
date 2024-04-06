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
      code: ErrorCode.MissingPatreonOAuthTokenErrorBody,
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
          code: ErrorCode.NonJsonPatreonOAuthTokenErrorBody,
          privateData: body,
        });
      }
    };

    const json: unknown = getBodyJson();
    if (!isObject(json)) {
      throw mapCauseToError({
        code: ErrorCode.NonObjectPatreonOAuthTokenError,
        privateData: json,
        publicData: typeof json,
      });
    }

    const { error, error_description: errorDescription } = json;
    if (typeof error === 'undefined') {
      throw mapCauseToError({
        code: ErrorCode.MissingPatreonOAuthTokenErrorCode,
      });
    }

    switch (error) {
      case 'invalid_client':
        throw mapCauseToError({
          code: ErrorCode.InvalidPatreonOAuthClientIDResponse,
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
            code: ErrorCode.MissingPatreonInvalidRequestDescription,
            privateData: json,
          });
        }

        if (typeof errorDescription !== 'string') {
          throw mapCauseToError({
            code: ErrorCode.NonStringPatreonInvalidRequestDescription,
            privateData: errorDescription,
            publicData: typeof errorDescription,
          });
        }

        throw mapCauseToError({
          code: ErrorCode.InvalidPatreonOAuthTokenRequest,
          privateData: json,
        });
      }

      default:
        throw mapCauseToError({
          code: ErrorCode.UnknownPatreonOAuthTokenError,
          privateData: json,
        });
    }
  });
}
