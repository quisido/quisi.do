import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Checkbox from '../../../../components/checkbox/index.js';
import useDarkModeToggle from './dark-mode-toggle.hook.js';

export default function SettingsDarkModeToggle(): ReactElement {
  const { checked, handleChange } = useDarkModeToggle();

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      <I18n>Dark mode</I18n>
    </Checkbox>
  );
}
