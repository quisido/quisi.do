import Checkbox, { CheckboxProps } from '@awsui/components-react/checkbox';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import I18n from 'lazy-i18n';
import { ReactElement, useCallback } from 'react';
import { useCapsule } from 'react-capsule';
import DarkModeCapsule from '../../capsules/dark-mode';

export default function DarkModeToggle(): ReactElement {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useCapsule(DarkModeCapsule);

  const handleChange = useCallback(
    (e: NonCancelableCustomEvent<CheckboxProps.ChangeDetail>): void => {
      setIsDarkModeEnabled(e.detail.checked);
    },
    [setIsDarkModeEnabled],
  );

  return (
    <Checkbox checked={isDarkModeEnabled} onChange={handleChange}>
      <I18n>Dark mode</I18n>
    </Checkbox>
  );
}
