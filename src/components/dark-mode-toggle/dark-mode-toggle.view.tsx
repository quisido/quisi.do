import Checkbox from '@awsui/components-react/checkbox';
import I18n from 'lazy-i18n';
import { ReactElement } from 'react';
import useDarkModeToggle from './dark-mode-toggle.hook';

export default function DarkModeToggle(): ReactElement {
  const { checked, handleChange } = useDarkModeToggle();

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      <I18n>Dark mode</I18n>
    </Checkbox>
  );
}
