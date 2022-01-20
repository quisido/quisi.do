import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import DesignSystem from '../../../../constants/design-system';
import Language from '../../../../constants/language';

interface State {
  readonly designSystem: [DesignSystem, Dispatch<SetStateAction<DesignSystem>>];
  readonly isDarkModeEnabled: [boolean, Dispatch<SetStateAction<boolean>>];
  readonly language: [Language, Dispatch<SetStateAction<Language>>];
}

export default function useAppContexts(): State {
  return {
    isDarkModeEnabled: useState<boolean>(true),
    designSystem: useState<DesignSystem>(DesignSystem.Aws),
    language: useState<Language>(Language.English),
  };
}
