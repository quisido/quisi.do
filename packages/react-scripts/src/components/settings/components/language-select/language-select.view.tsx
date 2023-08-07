import type { ReactElement } from 'react';
import Select from '../../../../components/select';
import OPTIONS from '../../constants/language-options';
import useLanguageSelect from './language-select.hook';

export default function SettingsLanguageSelect(): ReactElement {
  const { handleChange, label, language } = useLanguageSelect();

  return (
    <Select
      label={label}
      onChange={handleChange}
      options={OPTIONS}
      value={language}
    />
  );
}
