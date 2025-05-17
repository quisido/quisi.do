import {
  type PropsWithChildren,
  type ReactElement,
  memo,
  useLayoutEffect,
  useState,
} from 'react';
import { SessionIdProvider } from '../contexts/session-id.js';
import getSessionId from '../utils/get-session-id';

function SessionIdProviderFeature({
  children,
}: PropsWithChildren): ReactElement {
  // States
  const [sessionId, setSessionId] = useState<string>();

  // Effects
  useLayoutEffect((): void => {
    setSessionId(getSessionId);
  }, []);

  return <SessionIdProvider value={sessionId}>{children}</SessionIdProvider>;
}

export default memo(SessionIdProviderFeature);
