import getPatreonAccessToken from './get-patreon-access-token.js';
import mapAccessTokenToPatreonRequestHeaders from './map-access-token-to-patreon-request-headers.js';

export default async function createPatreonIdentityRequestInit(): Promise<RequestInit> {
  const accessToken: string = await getPatreonAccessToken();
  return {
    headers: mapAccessTokenToPatreonRequestHeaders(accessToken),
    method: 'GET',
  };
}
