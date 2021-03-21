import { CheckboxProps } from '@awsui/components-react/checkbox';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { useCallback } from 'react';
import useDarkMode from '../../hooks/use-dark-mode';

interface State {
  checked: boolean;
  handleChange(
    event: NonCancelableCustomEvent<CheckboxProps.ChangeDetail>,
  ): void;
}

export default function useDarkModeToggle(): State {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useDarkMode();

  const handleChange = useCallback(
    (e: NonCancelableCustomEvent<CheckboxProps.ChangeDetail>): void => {
      setIsDarkModeEnabled(e.detail.checked);
    },
    [setIsDarkModeEnabled],
  );

  return {
    checked: isDarkModeEnabled,
    handleChange,
  };
}
