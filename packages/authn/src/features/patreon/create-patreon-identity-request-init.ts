import PATREON_USER_AGENT from '../../constants/patreon-user-agent.js';
import getPatreonAccessToken from './get-patreon-access-token.js';

export default async function createPatreonIdentityRequestInit(): Promise<RequestInit> {
  const accessToken: string = await getPatreonAccessToken();
  return {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': PATREON_USER_AGENT,
    }),
  };
}
