'use client';

import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';
import DesignSystem from '../../constants/design-system';

interface State {
  readonly designSystem: [DesignSystem, Dispatch<SetStateAction<DesignSystem>>];
  readonly isDarkModeEnabled: [boolean, Dispatch<SetStateAction<boolean>>];
}

const INITIAL_DESIGN_SYSTEM: DesignSystem =
  process.env.NODE_ENV === 'production' ? DesignSystem.Mui : DesignSystem.Quisi;

export default function useContexts(): State {
  // States
  const [designSystem, setDesignSystem] = useState(INITIAL_DESIGN_SYSTEM);

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
