import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import DesignSystem from '../../../../constants/design-system';
import Language from '../../../../constants/language';

interface State {
  readonly designSystem: [DesignSystem, Dispatch<SetStateAction<DesignSystem>>];
  readonly isDarkModeEnabled: [boolean, Dispatch<SetStateAction<boolean>>];
  readonly language: [Language, Dispatch<SetStateAction<Language>>];
}

export default function useAppContexts(): State {
  // States
  const [designSystem, setDesignSystem] = useState(DesignSystem.Awsui);

  return {
    isDarkModeEnabled: useState(true),
    language: useState<Language>(Language.English),

    designSystem: useMemo((): [
      DesignSystem,
      Dispatch<SetStateAction<DesignSystem>>,
    ] => {
      return [designSystem, setDesignSystem];
    }, [designSystem]),
  };
}
