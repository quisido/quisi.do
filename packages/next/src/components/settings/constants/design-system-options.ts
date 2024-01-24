import DesignSystem from '../../../constants/design-system.js';
import type SelectOption from '../../../types/select-option.js';

export default [
  {
    label: 'MUI',
    value: DesignSystem.Mui,
  },
  {
    label: 'Quisi',
    value: DesignSystem.Quisi,
  },
] satisfies readonly SelectOption[];
