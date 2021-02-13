import { CheckboxProps } from '@awsui/components-react/checkbox';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { useCallback } from 'react';
import { useCapsule } from 'react-capsule';
import DarkModeCapsule from '../../capsules/dark-mode';

interface State {
  checked: boolean;
  handleChange(e: NonCancelableCustomEvent<CheckboxProps.ChangeDetail>): void;
}

export default function useDarkModeToggle(): State {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useCapsule(DarkModeCapsule);

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
