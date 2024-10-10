import type Worker from '@quisido/worker';
import formUrlEncoded from 'form-urlencoded';
import { PATREON_USER_AGENT } from '../../constants/patreon-user-agent.js';
import getPatreonOAuthClientId from './get-patreon-oauth-client-id.js';
import getPatreonOAuthClientSecret from './get-patreon-oauth-client-secret.js';
import getPatreonOAuthHost from './get-patreon-oauth-host.js';
import getPatreonOAuthRedirectUri from './get-patreon-oauth-redirect-uri.js';
import getPatreonRequestCode from './get-patreon-request-code.js';

const HEADERS: Headers = new Headers({
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'user-agent': PATREON_USER_AGENT,
});

export default async function getPatreonTokenResponse(
  this: Worker,
): Promise<Response> {
  const fetch: Fetcher['fetch'] = this.getFetch();
  const oAuthHost: string = getPatreonOAuthHost.call(this);

  return await fetch(`${oAuthHost}/api/oauth2/token`, {
    headers: HEADERS,
    method: 'POST',

    body: formUrlEncoded({
      client_id: getPatreonOAuthClientId.call(this),
      client_secret: getPatreonOAuthClientSecret.call(this),
      code: getPatreonRequestCode.call(this),
      grant_type: 'authorization_code',
      redirect_uri: getPatreonOAuthRedirectUri.call(this),
    }),
  });
}
