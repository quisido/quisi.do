import { PATREON_USER_AGENT } from '../constants/patreon-user-agent.js';

export default function mapAccessTokenToIdentityRequestHeaders(
  accessToken: string,
): Headers {
  return new Headers({
    authorization: `Bearer ${accessToken}`,
    'user-agent': PATREON_USER_AGENT,
  });
}
