import handleInvalidInvalidPatreonAccessTokenRequestDescription from './handle-invalid-invalid-patreon-access-token-request-description.js';
import handleInvalidPatreonAccessTokenRequestDescription from './handle-invalid-patreon-access-token-request-description.js';
import handleMissingInvalidPatreonAccessTokenRequestDescription from './handle-missing-invalid-patreon-access-token-request-description.js';

export default function handleInvalidPatreonAccessTokenRequest(
  json: Record<string, unknown>,
): never {
  const { error_description: description } = json;
  if (typeof description !== 'string') {
    if (typeof description === 'undefined') {
      return handleMissingInvalidPatreonAccessTokenRequestDescription(json);
    }

    return handleInvalidInvalidPatreonAccessTokenRequestDescription(
      json,
      description,
    );
  }

  return handleInvalidPatreonAccessTokenRequestDescription(json, description);
}
