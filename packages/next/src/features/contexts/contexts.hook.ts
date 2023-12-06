'use client';

import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';
import DesignSystem from '../../constants/design-system';

interface State {
  readonly designSystem: [DesignSystem, Dispatch<SetStateAction<DesignSystem>>];
  readonly isDarkModeEnabled: [boolean, Dispatch<SetStateAction<boolean>>];
}

export default function useContexts(): State {
  // States
  const [designSystem, setDesignSystem] = useState(DesignSystem.Quisi);

  return {
    isDarkModeEnabled: useState(false),

    designSystem: useMemo((): [
      DesignSystem,
      Dispatch<SetStateAction<DesignSystem>>,
    ] => {
      return [designSystem, setDesignSystem];
    }, [designSystem]),
  };
}
