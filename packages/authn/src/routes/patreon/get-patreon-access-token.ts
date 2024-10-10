import type Worker from '@quisido/worker';
import getPatreonTokenResponse from './get-patreon-token-response.js';
import handlePatreonOAuthTokenResponse from './handle-patreon-oauth-token-response.js';

export default async function getPatreonAccessToken(
  this: Worker,
): Promise<string> {
  return await this.snapshot(
    getPatreonTokenResponse.call(this),
    handlePatreonOAuthTokenResponse,
  );
}
