import DesignSystem from '../../../constants/design-system';
import type SelectOption from '../../../types/select-option';

const DESIGN_SYSTEM_OPTIONS: readonly SelectOption[] = [
  {
    label: 'AWS',
    value: DesignSystem.Aws,
  },
  {
    label: 'Material',
    value: DesignSystem.Material,
  },
  {
    label: 'React95',
    value: DesignSystem.React95,
  },
];

export default DESIGN_SYSTEM_OPTIONS;
