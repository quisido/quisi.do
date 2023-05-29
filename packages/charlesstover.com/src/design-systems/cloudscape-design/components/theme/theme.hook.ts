import { Mode, applyMode } from '@cloudscape-design/global-styles';
import { useLayoutEffect } from 'react';
import useDarkMode from '../../../../hooks/use-dark-mode';
import useGlobalStyles from './hooks/use-global-styles';

export default function useCloudscapeTheme(): void {
  const [isDarkModeEnabled] = useDarkMode();

  useGlobalStyles();

  useLayoutEffect((): VoidFunction | undefined => {
    if (isDarkModeEnabled) {
      applyMode(Mode.Dark, window.document.body);
    } else {
      applyMode(Mode.Light, window.document.body);
    }

    return (): void => {
      applyMode(null, window.document.body);
    };
  }, [isDarkModeEnabled]);
}
