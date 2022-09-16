import Language from '../../../constants/language';
import type SelectOption from '../../../types/select-option';

const LANGUAGE_OPTIONS: readonly SelectOption[] = [
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
