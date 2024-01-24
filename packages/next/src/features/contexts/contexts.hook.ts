'use client';

import {
  type Dispatch,
  type SetStateAction,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import DesignSystem from '../../constants/design-system.js';
import getHostname from '../../utils/get-hostname.js';
import getSessionId from '../../utils/get-session-id.js';

interface State {
  readonly designSystem: [DesignSystem, Dispatch<SetStateAction<DesignSystem>>];
  readonly hostname: string;
  readonly isDarkModeEnabled: [boolean, Dispatch<SetStateAction<boolean>>];
  readonly sessionId: string | undefined;
}

export default function useContexts(): State {
  // States
  const [designSystem, setDesignSystem] = useState(DesignSystem.Quisi);
  const [sessionId, setSessionId] = useState<string>();

  // Effects
  useLayoutEffect((): void => {
    setSessionId(getSessionId);
  }, []);

  return {
    hostname: getHostname(),
    isDarkModeEnabled: useState(false),
    sessionId,

    designSystem: useMemo((): [
      DesignSystem,
      Dispatch<SetStateAction<DesignSystem>>,
    ] => {
      return [designSystem, setDesignSystem];
    }, [designSystem]),
  };
}
