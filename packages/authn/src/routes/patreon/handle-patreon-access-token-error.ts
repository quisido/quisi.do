import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import mapReadableStreamToString from '../../utils/map-readable-stream-to-string.js';
import handleMissingPatreonAccessTokenErrorBody from './handle-missing-patreon-access-token-error-body.js';
import handlePatreonAccessTokenErrorBody from './handle-patreon-access-token-error-body.js';

export default async function handlePatreonAccessTokenError(
  this: AuthnFetchHandler,
  response: Response,
): Promise<never> {
  if (response.body === null) {
    return handleMissingPatreonAccessTokenErrorBody.call(this);
  }

  const str: string = await mapReadableStreamToString(response.body);
  return handlePatreonAccessTokenErrorBody.call(this, str);
}
