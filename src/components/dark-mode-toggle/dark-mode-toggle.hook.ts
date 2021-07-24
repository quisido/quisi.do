import type { CheckboxProps } from '@awsui/components-react/checkbox';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import { useCallback } from 'react';
import useDarkMode from '../../hooks/use-dark-mode';

interface State {
  readonly checked: boolean;
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<CheckboxProps.ChangeDetail>>
    >,
  ) => void;
}

export default function useDarkModeToggle(): State {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useDarkMode();

  return {
    checked: isDarkModeEnabled,

    handleChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<CheckboxProps.ChangeDetail>>
        >,
      ): void => {
        setIsDarkModeEnabled(e.detail.checked);
      },
      [setIsDarkModeEnabled],
    ),
  };
}
