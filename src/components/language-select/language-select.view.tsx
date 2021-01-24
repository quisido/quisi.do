import Select from '@awsui/components-react/select';
import { ReactElement } from 'react';
import useLanguageSelect from './language-select.hook';

export default function LanguageSelect(): ReactElement {
  const { handleChange, options, selectedOption } = useLanguageSelect();

  return (
    <Select
      onChange={handleChange}
      options={options}
      selectedOption={selectedOption}
    />
  );
}
