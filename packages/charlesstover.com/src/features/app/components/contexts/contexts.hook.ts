import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import DesignSystem from '../../../../constants/design-system';
import Language from '../../../../constants/language';

interface State {
  readonly designSystem: [DesignSystem, Dispatch<SetStateAction<DesignSystem>>];
  readonly isDarkModeEnabled: [boolean, Dispatch<SetStateAction<boolean>>];
  readonly language: [Language, Dispatch<SetStateAction<Language>>];
}

export default function useAppContexts(): State {
  // Contexts
  const { pathname } = useLocation();

  // States
  const [designSystem, setDesignSystem] = useState(DesignSystem.Awsui);

  const isSpriteSheet2GifRoute: boolean = pathname === '/spritesheet2gif';
  return {
    isDarkModeEnabled: useState(true),
    language: useState<Language>(Language.English),

    designSystem: useMemo((): [
      DesignSystem,
      Dispatch<SetStateAction<DesignSystem>>,
    ] => {
      // Technical debt: The "Spritesheet 2 GIF" route only supports AWS UI.
      if (isSpriteSheet2GifRoute) {
        return [DesignSystem.Awsui, setDesignSystem];
      }

      return [designSystem, setDesignSystem];
    }, [designSystem, isSpriteSheet2GifRoute]),
  };
}
