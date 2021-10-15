import { Mode, applyMode } from '@awsui/global-styles';
import { useLayoutEffect } from 'react';
import useDarkMode from '../../hooks/use-dark-mode';

export default function useAwsTheme(): void {
  const isDarkModeEnabled: boolean = useDarkMode();

  useLayoutEffect((): undefined | VoidFunction => {
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
