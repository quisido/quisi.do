import formUrlEncoded from 'form-urlencoded';
import PATREON_USER_AGENT from '../../constants/patreon-user-agent.js';
import { getFetch } from '../../constants/worker.js';
import getPatreonOAuthClientId from './get-patreon-oauth-client-id.js';
import getPatreonOAuthClientSecret from './get-patreon-oauth-client-secret.js';
import getPatreonOAuthHost from './get-patreon-oauth-host.js';
import getPatreonOAuthRedirectUri from './get-patreon-oauth-redirect-uri.js';
import getPatreonRequestCode from './get-patreon-request-code.js';

const HEADERS: Headers = new Headers({
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'user-agent': PATREON_USER_AGENT,
});

export default async function getPatreonTokenResponse(): Promise<Response> {
  const fetch: Fetcher['fetch'] = getFetch();
  const oAuthHost: string = getPatreonOAuthHost();

  return await fetch(`${oAuthHost}/api/oauth2/token`, {
    headers: HEADERS,
    method: 'POST',

    body: formUrlEncoded({
      client_id: getPatreonOAuthClientId(),
      client_secret: getPatreonOAuthClientSecret(),
      code: getPatreonRequestCode(),
      grant_type: 'authorization_code',
      redirect_uri: getPatreonOAuthRedirectUri(),
    }),
  });
}
