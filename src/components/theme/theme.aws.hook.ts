import { Mode, applyMode } from '@awsui/global-styles';
import { useLayoutEffect } from 'react';
import useDarkMode from '../../hooks/use-dark-mode';
import useGlobalStyles from './hooks/use-aws-global-styles';

export default function useAwsTheme(): void {
  const isDarkModeEnabled: boolean = useDarkMode();

  useGlobalStyles();

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
