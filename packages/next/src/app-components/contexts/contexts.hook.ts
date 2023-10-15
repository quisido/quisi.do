'use client';

import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';
import DesignSystem from '../../constants/design-system';

interface State {
  readonly designSystem: [DesignSystem, Dispatch<SetStateAction<DesignSystem>>];
  readonly hostname: string;
  readonly isDarkModeEnabled: [boolean, Dispatch<SetStateAction<boolean>>];
}

const getHostname = (): string => {
  if (typeof window === 'undefined') {
    return 'quisi.do';
  }
  return window.location.hostname;
};

export default function useContexts(): State {
  // States
  const [designSystem, setDesignSystem] = useState(DesignSystem.Awsui);

  return {
    hostname: getHostname(),
    isDarkModeEnabled: useState(true),

    designSystem: useMemo((): [
      DesignSystem,
      Dispatch<SetStateAction<DesignSystem>>,
    ] => {
      return [designSystem, setDesignSystem];
    }, [designSystem]),
  };
}
