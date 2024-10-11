import type Worker from '@quisido/worker';
import handleInvalidPatreonOAuthHost from './handle-invalid-patreon-oauth-host.js';
import handleMissingPatreonOAuthHost from './handle-missing-patreon-oauth-host.js';

export default function getPatreonOAuthHost(this: Worker): string {
  const host: unknown = this.getEnv('PATREON_OAUTH_HOST');

  if (typeof host === 'string') {
    return host;
  }

  if (typeof host === 'undefined') {
    return handleMissingPatreonOAuthHost.call(this);
  }

  return handleInvalidPatreonOAuthHost.call(this, host);
}
