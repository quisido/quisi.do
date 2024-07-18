import { ErrorCode } from '@quisido/authn-shared';
import mapCauseToError from '../../utils/map-cause-to-error.js';
import getPatreonOAuthClientId from './get-patreon-oauth-client-id.js';
import getPatreonRequestCode from './get-patreon-request-code.js';

interface Options {
  readonly code: unknown;
  readonly description: unknown;
  readonly json: unknown;
}

export default function handlePatreonAccessTokenErrorCode({
  code,
  description,
  json,
}: Options): never {
  switch (code) {
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
      if (typeof description === 'undefined') {
        throw mapCauseToError({
          code: ErrorCode.MissingInvalidPatreonRequestDescription,
          privateData: json,
        });
      }

      if (typeof description !== 'string') {
        throw mapCauseToError({
          code: ErrorCode.NonStringInvalidPatreonRequestDescription,
          privateData: description,
          publicData: typeof description,
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
}
