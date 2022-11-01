import { Mode, applyMode } from '@cloudscape-design/global-styles';
import { useLayoutEffect } from 'react';
import useCloudscapeGlobalStyles from './hooks/use-cloudscape-global-styles';
import useDarkMode from '../../hooks/use-dark-mode';

export default function useCloudscapeTheme(): void {
  const [isDarkModeEnabled] = useDarkMode();

  useCloudscapeGlobalStyles();

  useLayoutEffect((): VoidFunction | undefined => {
    if (isDarkModeEnabled) {
      applyMode(Mode.Dark, document.body);
    } else {
      applyMode(Mode.Light, document.body);
    }

    return (): void => {
      applyMode(null, document.body);
    };
  }, [isDarkModeEnabled]);
}
