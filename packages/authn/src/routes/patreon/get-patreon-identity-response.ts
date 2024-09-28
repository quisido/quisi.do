import type Worker from '@quisido/worker';
import createPatreonIdentityRequestInit from './create-patreon-identity-request-init.js';
import handlePatreonIdentityRequestInit from './handle-patreon-identity-request-init.js';

export default async function getPatreonIdentityResponse(this: Worker): Promise<Response> {
  return await this.snapshot(
    createPatreonIdentityRequestInit.call(this),
    handlePatreonIdentityRequestInit,
  );
}
