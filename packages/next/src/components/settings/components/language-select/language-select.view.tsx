import type { ReactElement } from 'react';
import Select from '../../../../components/select';
import OPTIONS from '../../constants/locale-options';
import useLanguageSelect from './language-select.hook';

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
