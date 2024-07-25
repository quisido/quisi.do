import { snapshot } from '../../constants/worker.js';
import getPatreonIdentityResponse from './get-patreon-identity-response.js';
import handlePatreonIdentityResponse from './handle-patreon-identity-response.js';
import type PatreonIdentity from './patreon-identity.js';

export default async function getPatreonIdentity(): Promise<PatreonIdentity> {
  return await snapshot(
    getPatreonIdentityResponse(),
    handlePatreonIdentityResponse,
  );
}
