import type { ReactElement } from 'react';
import Select from '../../components/select';
import LANGUAGE_OPTIONS from '../../constants/language-options';
import useLanguageSelect from './navigation.language-select.hook';

export default function LanguageSelect(): ReactElement {
  const { handleChange, language } = useLanguageSelect();

  return (
    <Select
      onChange={handleChange}
      options={LANGUAGE_OPTIONS}
      value={language}
    />
  );
}
