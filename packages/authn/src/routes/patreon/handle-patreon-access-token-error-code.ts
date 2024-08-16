import handleInvalidPatreonAccessTokenRequest from './handle-invalid-patreon-access-token-request.js';
import handleInvalidPatreonClientId from './handle-invalid-patreon-client-id.js';
import handleInvalidPatreonGrantCode from './handle-invalid-patreon-grant-code.js';
import handleUnknownPatreonAccessTokenErrorCode from './handle-unknown-patreon-access-token-error-code.js';

interface Options {
  readonly code: unknown;
  readonly json: Record<string, unknown>;
}

export default function handlePatreonAccessTokenErrorCode({
  code,
  json,
}: Options): never {
  switch (code) {
    case 'invalid_client':
      return handleInvalidPatreonClientId();

    case 'invalid_grant':
      return handleInvalidPatreonGrantCode();

    case 'invalid_request':
      return handleInvalidPatreonAccessTokenRequest(json);

    default:
      return handleUnknownPatreonAccessTokenErrorCode(code, json);
  }
}