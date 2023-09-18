import Locale from '../../../constants/locale';
import type SelectOption from '../../../types/select-option';

export default [
  {
    label: 'English',
    value: Locale.English,
  },
  {
    label: 'Arabic',
    value: Locale.Arabic,
  },
  {
    label: 'Cebuano',
    value: Locale.Filipino,
  },
  // {
  //   label: 'Japanese',
  //   value: Locale.Japanese,
  // },
] satisfies readonly SelectOption[];
