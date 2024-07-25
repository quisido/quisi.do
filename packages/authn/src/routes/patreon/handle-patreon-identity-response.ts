import { snapshot } from '../../constants/worker.js';
import isObject from '../../utils/is-object.js';
import handleForbiddenPatreonIdentityResponse from './handle-forbidden-patreon-identity-response.js';
import handleInvalidPatreonIdentityResponse from './handle-invalid-patreon-identity-response.js';
import handleInvalidPatreonIdentity from './handle-invalid-patreon-identity.js';
import handleUnknownPatreonIdentityError from './handle-unknown-patreon-identity-error.js';
import parsePatreonIdentity from './parse-patreon-identity.js';
import type PatreonIdentity from './patreon-identity.js';

const FORBIDDEN = 403;
const HTTP_REDIRECTION = 300;

export default async function handlePatreonIdentityResponse(response: Response): Promise<PatreonIdentity> {
  const getJson = async (): Promise<unknown> => {
    try {
      return await response.json();
    } catch (_err: unknown) {
      return;
    }
  };

  return await snapshot(
    getJson(),
    (identity: unknown): PatreonIdentity => {
      if (typeof identity === 'undefined') {
        return handleInvalidPatreonIdentityResponse();
      }

      if (response.status === FORBIDDEN) {
        return handleForbiddenPatreonIdentityResponse(identity);
      }

      if (response.status >= HTTP_REDIRECTION) {
        return handleUnknownPatreonIdentityError(response.status, identity);
      }

      if (!isObject(identity)) {
        return handleInvalidPatreonIdentity(identity);
      }

      return parsePatreonIdentity(identity);
    },
  );
}
