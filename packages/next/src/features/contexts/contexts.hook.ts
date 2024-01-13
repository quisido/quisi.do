'use client';

import {
  type Dispatch,
  type SetStateAction,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import DesignSystem from '../../constants/design-system.js';
import getSessionId from '../../utils/get-session-id.js';

interface State {
  readonly designSystem: [DesignSystem, Dispatch<SetStateAction<DesignSystem>>];
  readonly isDarkModeEnabled: [boolean, Dispatch<SetStateAction<boolean>>];
  readonly sessionId: string | undefined;
}

const INITIAL_DESIGN_SYSTEM: DesignSystem =
  process.env.NODE_ENV === 'production' ? DesignSystem.Mui : DesignSystem.Quisi;

export default function useContexts(): State {
  // States
  const [designSystem, setDesignSystem] = useState(INITIAL_DESIGN_SYSTEM);
  const [sessionId, setSessionId] = useState<string>();

  // Effects
  useLayoutEffect((): void => {
    setSessionId(getSessionId);
  }, []);

  return {
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
