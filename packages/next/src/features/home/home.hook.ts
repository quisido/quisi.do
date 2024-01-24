import { usePathname } from 'next/navigation.js';
import { useMemo } from 'react';
import {
  PATREON_OAUTH_CLIENT_ID,
  PATREON_OAUTH_REDIRECT_URI,
} from '../../constants/patreon-oauth.js';
import useSearch from '../../hooks/use-search.js';
import useSessionId from '../../hooks/use-session-id.js';

interface State {
  readonly authenticateHref: string;
}

export default function useHome(): State {
  const pathname: string = usePathname();
  const search: string = useSearch();
  const sessionId: string | undefined = useSessionId();

  return {
    authenticateHref: useMemo((): string => {
      const authSearch: string = new URLSearchParams({
        client_id: PATREON_OAUTH_CLIENT_ID,
        redirect_uri: PATREON_OAUTH_REDIRECT_URI,
        response_type: 'code',
        state: JSON.stringify({
          returnPath: `${pathname}${search}`,
          sessionId,
        }),
      }).toString();

      return `https://www.patreon.com/oauth2/authorize?${authSearch}`;
    }, [pathname, search, sessionId]),
  };
}
