import { Mode, applyMode } from '@awsui/global-styles';
import '@awsui/global-styles/index.css';
import { useLayoutEffect } from 'react';
import useDarkMode from '../../../../hooks/use-dark-mode';
// import useGlobalStyles from './hooks/use-global-styles';

export default function useAwsuiTheme(): void {
  const [isDarkModeEnabled] = useDarkMode();

  // useGlobalStyles();

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
