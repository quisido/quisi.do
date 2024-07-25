import { snapshot } from '../../constants/worker.js';
import createPatreonIdentityRequestInit from './create-patreon-identity-request-init.js';
import handlePatreonIdentityRequestInit from './handle-patreon-identity-request-init.js';

export default async function getPatreonIdentityResponse(): Promise<Response> {
  return await snapshot(
    createPatreonIdentityRequestInit(),
    handlePatreonIdentityRequestInit,
  );
}
