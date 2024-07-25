import PATREON_USER_AGENT from '../../constants/patreon-user-agent.js';

export default function mapAccessTokenToPatreonRequestHeaders(
  token: string,
): Headers {
  return new Headers({
    authorization: `Bearer ${token}`,
    'user-agent': PATREON_USER_AGENT,
  });
}
