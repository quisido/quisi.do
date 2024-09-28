import type Worker from '@quisido/worker';
import getPatreonIdentityResponse from './get-patreon-identity-response.js';
import handlePatreonIdentityResponse from './handle-patreon-identity-response.js';
import type PatreonIdentity from './patreon-identity.js';

export default async function getPatreonIdentity(this: Worker): Promise<PatreonIdentity> {
  return await this.snapshot(
    getPatreonIdentityResponse.call(this),
    handlePatreonIdentityResponse,
  );
}
