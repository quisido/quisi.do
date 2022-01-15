import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Checkbox from '../../../../components/checkbox';
import useWrapperDarkModeToggle from './dark-mode-toggle.hook';

export default function WrapperDarkModeToggle(): ReactElement {
  const { checked, handleChange } = useWrapperDarkModeToggle();

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      <I18n>Dark mode</I18n>
    </Checkbox>
  );
}
