import mapAccessTokenToPatreonRequestHeaders from './map-access-token-to-patreon-request-headers.js';

export default function handlePatreonAccessToken(token: string): RequestInit {
  return {
    headers: mapAccessTokenToPatreonRequestHeaders(token),
    method: 'GET',
  };
}
