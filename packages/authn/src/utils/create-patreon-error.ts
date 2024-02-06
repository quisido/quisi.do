import ErrorCode from '../constants/error-code.js';
import StatusCode from '../constants/status-code.js';
import createError from './create-error.js';

interface Options {
  readonly assert: (
    assertion: boolean,
    message: string,
    code: ErrorCode,
    status: StatusCode,
    data?: unknown,
  ) => asserts assertion;
  readonly clientId: string;
  readonly code: string;
  readonly json: Record<'error', unknown>;
  readonly status: number;
}

export default function createPatreonError({
  clientId,
  code,
  json,
  status,
  ...options
}: Options): Error {
  const assert: (
    assertion: boolean,
    message: string,
    code: ErrorCode,
    status: StatusCode,
    data?: unknown,
  ) => asserts assertion = options.assert;

  switch (json.error) {
    case 'invalid_client':
      return createError(
        'Invalid Patreon client ID.',
        ErrorCode.InvalidPatreonClientId,
        status,
        clientId,
      );

    case 'invalid_grant':
      return createError(
        'Invalid Patreon grant code.',
        ErrorCode.InvalidPatreonGrantCode,
        status,
        code,
      );

    case 'invalid_request': {
      assert(
        'error_description' in json,
        'Expected Patreon OAuth invalid token request to have a description.',
        ErrorCode.MissingPatreonOAuthInvalidTokenRequestDescription,
        StatusCode.BadGateway,
        json,
      );

      assert(
        typeof json.error_description === 'string',
        'Expected Patreon OAuth invalid token request description to be a string.',
        ErrorCode.NonStringPatreonOAuthInvalidTokenRequestDescription,
        StatusCode.BadGateway,
        json,
      );

      return createError(
        json.error_description,
        ErrorCode.InvalidPatreonOAuthTokenRequest,
        status,
        json,
      );
    }

    default:
      return createError(
        'Unknown Patreon OAuth token error.',
        ErrorCode.UnknownPatreonOAuthTokenError,
        status,
        json,
      );
  }
}
