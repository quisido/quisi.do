import { getEnv } from '../../constants/worker.js';
import handleInvalidPatreonOAuthHost from './handle-invalid-patreon-oauth-host.js';
import handleMissingPatreonOAuthHost from './handle-missing-patreon-oauth-host.js';

export default function getPatreonOAuthHost(): string {
  const host: unknown = getEnv('PATREON_OAUTH_HOST');

  if (typeof host === 'string') {
    return host;
  }

  if (typeof host === 'undefined') {
    return handleMissingPatreonOAuthHost();
  }

  return handleInvalidPatreonOAuthHost(host);
}
