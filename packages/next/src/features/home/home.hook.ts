import { useMemo } from 'react';
import useSessionId from '../../hooks/use-session-id.js';
import {
  PATREON_OAUTH_CLIENT_ID,
  PATREON_OAUTH_REDIRECT_URI,
} from '../../constants/patreon-oauth.js';

interface State {
  readonly authenticateHref: string;
}

export default function useHome(): State {
  const sessionId: string | undefined = useSessionId();

  return {
    authenticateHref: useMemo((): string => {
      const search: string = new URLSearchParams({
        client_id: PATREON_OAUTH_CLIENT_ID,
        redirect_uri: PATREON_OAUTH_REDIRECT_URI,
        response_type: 'code',
        state: JSON.stringify({
          sessionId,
        }),
      }).toString();

      return `https://www.patreon.com/oauth2/authorize?${search}`;
    }, [sessionId]),
  };
}
