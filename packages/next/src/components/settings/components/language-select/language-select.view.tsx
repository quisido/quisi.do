import { type ReactElement } from 'react';
import Select from '../../../../components/select.js';
import OPTIONS from '../../constants/locale-options.js';
import useLanguageSelect from './language-select.hook.js';

export default function SettingsLanguageSelect(): ReactElement {
  const { handleChange, label, locale } = useLanguageSelect();

  return (
    <Select
      label={label}
      onChange={handleChange}
      options={OPTIONS}
      value={locale}
    />
  );
}
