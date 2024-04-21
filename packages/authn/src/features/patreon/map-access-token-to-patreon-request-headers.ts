import PATREON_USER_AGENT from '../../constants/patreon-user-agent.js';

export default function mapAccessTokenToPatreonRequestHeaders(
  token: string,
): Headers {
  return new Headers({
    Authorization: `Bearer ${token}`,
    'User-Agent': PATREON_USER_AGENT,
  });
}
