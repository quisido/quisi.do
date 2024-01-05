import { useMemo } from 'react';
import useSessionId from '../../hooks/use-session-id';

interface State {
  readonly authenticateHref: string;
}

const SCOPES: readonly string[] = ['my-campaign', 'pledges-to-me', 'users'];
const SCOPE: string = SCOPES.join(' ');

const PATREON_OAUTH_CLIENT_ID =
  'J_6jrNJZNibHylSF83UVl9I4OHZYf67RAsU0s7_LnH1N5BKF-vgOyweF3KQLOKm1';

const AUTHENTICATE_SEARCH_ENTRIES: readonly [string, string][] = [
  ['client_id', PATREON_OAUTH_CLIENT_ID],
  ['redirect_uri', 'https://a.quisi.do/patreon/'],
  ['response_type', 'code'],
  ['scope', SCOPE],
];

export default function useHome(): State {
  const sessionId: string = useSessionId();

  return {
    authenticateHref: useMemo((): string => {
      const search: string = new URLSearchParams([
        ...AUTHENTICATE_SEARCH_ENTRIES,
        ['state', sessionId],
      ]).toString();

      return `https://www.patreon.com/oauth2/authorize?${search}`;
    }, [sessionId]),
  };
}
