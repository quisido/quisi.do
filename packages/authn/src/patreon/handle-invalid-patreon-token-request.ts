import type AuthnFetchHandler from '../authn-fetch-handler.js';
import handleInvalidPatreonTokenRequestDescription from './handle-invalid-patreon-token-request-description.js';
import handleMissingPatreonTokenRequestDescription from './handle-missing-patreon-token-request-description.js';
import handleStringPatreonTokenRequestDescription from './handle-string-patreon-token-request-description.js';

export default function handleInvalidPatreonTokenRequest(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
): never {
  const { error_description: description } = json;
  if (typeof description === 'string') {
    return handleStringPatreonTokenRequestDescription.call(
      this,
      json,
      description,
    );
  }

  if (typeof description === 'undefined') {
    return handleMissingPatreonTokenRequestDescription.call(this, json);
  }

  return handleInvalidPatreonTokenRequestDescription.call(
    this,
    json,
    description,
  );
}
