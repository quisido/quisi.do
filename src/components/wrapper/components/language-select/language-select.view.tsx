import type { ReactElement } from 'react';
import Select from '../../../../components/select';
import LANGUAGE_OPTIONS from '../../constants/language-options';
import useWrapperLanguageSelect from './language-select.hook';

export default function WrapperLanguageSelect(): ReactElement {
  const { handleChange, label, language } = useWrapperLanguageSelect();

  return (
    <Select
      label={label}
      onChange={handleChange}
      options={LANGUAGE_OPTIONS}
      value={language}
    />
  );
}
