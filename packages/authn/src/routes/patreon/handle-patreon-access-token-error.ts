import type Worker from '@quisido/worker';
import mapReadableStreamToString from '../../utils/map-readable-stream-to-string.js';
import handleMissingPatreonAccessTokenErrorBody from './handle-missing-patreon-access-token-error-body.js';
import handlePatreonAccessTokenErrorBody from './handle-patreon-access-token-error-body.js';

export default async function handlePatreonAccessTokenError(this: Worker,
  response: Response,
): Promise<never> {
  if (response.body === null) {
    return handleMissingPatreonAccessTokenErrorBody.call(this);
  }

  return this.snapshot(
    mapReadableStreamToString(response.body),
    handlePatreonAccessTokenErrorBody,
  );
}
