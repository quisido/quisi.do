import DesignSystem from '../../../constants/design-system';
import type SelectOption from '../../../types/select-option';

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
