import { Mode, applyMode } from '@awsui/global-styles';
import { useLayoutEffect } from 'react';
import DesignSystem from '../../constants/design-system';
import useDarkMode from '../../hooks/use-dark-mode';
import useDesignSystem from '../../hooks/use-design-system';

interface State {
  readonly designSystem: DesignSystem;
  readonly isDarkModeEnabled: boolean;
}

export default function useTheme(): State {
  const designSystem: DesignSystem = useDesignSystem();
  const isDarkModeEnabled: boolean = useDarkMode();

  useLayoutEffect((): undefined | VoidFunction => {
    if (designSystem !== DesignSystem.Aws) {
      return;
    }

    if (isDarkModeEnabled) {
      applyMode(Mode.Dark, document.body);
    } else {
      applyMode(Mode.Light, document.body);
    }

    return (): void => {
      applyMode(null, document.body);
    };
  }, [designSystem, isDarkModeEnabled]);

  return {
    designSystem,
    isDarkModeEnabled,
  };
}
