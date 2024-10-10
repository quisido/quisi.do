import type Worker from '@quisido/worker';
import getPatreonAccessToken from './get-patreon-access-token.js';
import handlePatreonAccessToken from './handle-patreon-access-token.js';

export default async function createPatreonIdentityRequestInit(
  this: Worker,
): Promise<RequestInit> {
  return await this.snapshot(
    getPatreonAccessToken.call(this),
    handlePatreonAccessToken,
  );
}
