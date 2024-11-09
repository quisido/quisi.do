import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import handleInvalidPatreonAccessTokenErrorBody from './handle-invalid-patreon-access-token-error-body.js';
import handleInvalidPatreonAccessTokenError from './handle-invalid-patreon-access-token-error.js';
import handleMissingPatreonAccessTokenErrorCode from './handle-missing-patreon-access-token-error-code.js';
import handlePatreonAccessTokenErrorCode from './handle-patreon-access-token-error-code.js';

export default function handlePatreonAccessTokenErrorBody(
  this: AuthnFetchHandler,
  body: string,
): never {
  const getBodyJson = (): unknown => {
    try {
      return JSON.parse(body);
    } catch (_err: unknown) {
      return handleInvalidPatreonAccessTokenErrorBody.call(this, body);
    }
  };

  const json: unknown = getBodyJson();
  if (!isRecord(json)) {
    return handleInvalidPatreonAccessTokenError.call(this, body, json);
  }

  const { error } = json;
  if (typeof error === 'undefined') {
    return handleMissingPatreonAccessTokenErrorCode.call(this, body, json);
  }

  return handlePatreonAccessTokenErrorCode.call(this, { code: error, json });
}
