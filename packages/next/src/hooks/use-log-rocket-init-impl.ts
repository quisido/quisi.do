import { useMemo } from 'react';
import { GITHUB_SHA } from '../constants/github-sha.js';
import {
  useAuthentication,
  type AuthenticationState,
} from '../contexts/authentication.js';
import sanitizeLogRocketRequest from '../utils/sanitize-log-rocket-request.js';
import sanitizeLogRocketResponse from '../utils/sanitize-log-rocket-response.js';
import useHostname from './use-hostname.js';
import useLogRocketInit, { type User } from './use-log-rocket-init.js';

export default function useLogRocketInitImpl(): void {
  // Contexts
  const { data }: AuthenticationState = useAuthentication();
  const rootHostname: string = useHostname();

  // States
  const user = useMemo((): User | undefined => {
    if (typeof data === 'undefined') {
      return;
    }

    if (data.id === null) {
      return;
    }

    return {
      id: data.id.toString(),
    };
  }, [data]);

  // Effects
  useLogRocketInit({
    appId: 'zkwhgg/quisido',
    release: GITHUB_SHA,
    rootHostname,
    sanitizeRequest: sanitizeLogRocketRequest,
    sanitizeResponse: sanitizeLogRocketResponse,
    user,
  });
}
