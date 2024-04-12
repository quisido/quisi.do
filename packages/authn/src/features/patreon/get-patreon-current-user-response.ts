import getFetch from '../../utils/get-fetch.js';
import createPatreonCurrentUserRequestInit from './create-patreon-current-user-request-init.js';
import getPatreonOAuthHost from './get-patreon-oauth-host.js';

export default async function getPatreonCurrentUserResponse(): Promise<Response> {
  const fetch: Fetcher['fetch'] = getFetch();
  const oAuthHost: string = getPatreonOAuthHost();

  return fetch(
    `${oAuthHost}/api/oauth2/api/current_user`,
    await createPatreonCurrentUserRequestInit(),
  );
}
