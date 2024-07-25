import { snapshot } from '../../constants/worker.js';
import mapReadableStreamToString from '../../utils/map-readable-stream-to-string.js';
import handleMissingPatreonAccessTokenErrorBody from './handle-missing-patreon-access-token-error-body.js';
import handlePatreonAccessTokenErrorBody from './handle-patreon-access-token-error-body.js';

export default async function handlePatreonAccessTokenError(
  response: Response,
): Promise<never> {
  if (response.body === null) {
    return handleMissingPatreonAccessTokenErrorBody();
  }

  return snapshot(
    mapReadableStreamToString(response.body),
    handlePatreonAccessTokenErrorBody,
  );
}
