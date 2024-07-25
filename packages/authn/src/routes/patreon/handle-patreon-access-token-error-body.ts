import isObject from '../../utils/is-object.js';
import handleInvalidPatreonAccessTokenErrorBody from './handle-invalid-patreon-access-token-error-body.js';
import handleInvalidPatreonAccessTokenError from './handle-invalid-patreon-access-token-error.js';
import handleMissingPatreonAccessTokenErrorCode from './handle-missing-patreon-access-token-error-code.js';
import handlePatreonAccessTokenErrorCode from './handle-patreon-access-token-error-code.js';

export default function handlePatreonAccessTokenErrorBody(body: string): never {
  const getBodyJson = (): unknown => {
    try {
      return JSON.parse(body);
    } catch (err: unknown) {
      return handleInvalidPatreonAccessTokenErrorBody(body);
    }
  };

  const json: unknown = getBodyJson();
  if (!isObject(json)) {
    return handleInvalidPatreonAccessTokenError(body, json);
  }

  const { error } = json;
  if (typeof error === 'undefined') {
    return handleMissingPatreonAccessTokenErrorCode(body, json);
  }

  return handlePatreonAccessTokenErrorCode({ code: error, json });
}
