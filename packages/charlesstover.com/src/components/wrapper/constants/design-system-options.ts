import DesignSystem from '../../../constants/design-system';
import type SelectOption from '../../../types/select-option';

const DESIGN_SYSTEM_OPTIONS: readonly SelectOption[] = [
  {
    label: 'AWS',
    value: DesignSystem.Aws,
  },
  {
    label: 'Cloudscape',
    value: DesignSystem.Cloudscape,
  },
  {
    label: 'Material',
    value: DesignSystem.Material,
  },
];

export default DESIGN_SYSTEM_OPTIONS;
