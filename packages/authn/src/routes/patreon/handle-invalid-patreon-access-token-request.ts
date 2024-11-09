import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import handleInvalidInvalidPatreonAccessTokenRequestDescription from './handle-invalid-invalid-patreon-access-token-request-description.js';
import handleInvalidPatreonAccessTokenRequestDescription from './handle-invalid-patreon-access-token-request-description.js';
import handleMissingInvalidPatreonAccessTokenRequestDescription from './handle-missing-invalid-patreon-access-token-request-description.js';

export default function handleInvalidPatreonAccessTokenRequest(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
): never {
  const { error_description: description } = json;
  if (typeof description === 'string') {
    return handleInvalidPatreonAccessTokenRequestDescription.call(
      this,
      json,
      description,
    );
  }

  if (typeof description === 'undefined') {
    return handleMissingInvalidPatreonAccessTokenRequestDescription.call(
      this,
      json,
    );
  }

  return handleInvalidInvalidPatreonAccessTokenRequestDescription.call(
    this,
    json,
    description,
  );
}
