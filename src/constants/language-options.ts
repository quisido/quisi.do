import { SelectProps } from '@awsui/components-react/select';
import Language from '../constants/language';

const LANGUAGE_OPTIONS: SelectProps.Option[] = [
  {
    label: 'English',
    value: Language.English,
  },
  {
    label: 'Arabic',
    value: Language.Arabic,
  },
  {
    label: 'Cebuano',
    value: Language.Cebuano,
  },
  // {
  //   label: 'Japanese',
  //   value: Language.Japanese,
  // },
];

export default LANGUAGE_OPTIONS;
