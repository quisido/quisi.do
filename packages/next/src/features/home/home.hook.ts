import { useMemo } from 'react';
import useSessionId from '../../hooks/use-session-id.js';
import optional from '../../utils/optional.js';

interface State {
  readonly authenticateHref: string;
}

const SCOPES: readonly string[] = ['my-campaign', 'pledges-to-me', 'users'];
const SCOPE: string = SCOPES.join(' ');

// Change these with `process.env` for CI and CD.
const REDIRECT_URI =
  process.env['PATREON_REDIRECT_URL'] ?? 'http://localhost:3000/'; // 'https://a.quisi.do/patreon/';
const PATREON_OAUTH_CLIENT_ID =
  '4kCae2AHZdKyyuonaPzhGillxJ2HyyLQEDu8StvMtixBHmWmN4KVG0QVP6R45tjG'; // 'J_6jrNJZNibHylSF83UVl9I4OHZYf67RAsU0s7_LnH1N5BKF-vgOyweF3KQLOKm1';

export default function useHome(): State {
  const sessionId: string | undefined = useSessionId();

  return {
    authenticateHref: useMemo((): string => {
      const search: string = new URLSearchParams({
        client_id: PATREON_OAUTH_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: SCOPE,
        ...optional<Record<string, string>>('state', sessionId),
      }).toString();

      return `https://www.patreon.com/oauth2/authorize?${search}`;
    }, [sessionId]),
  };
}
