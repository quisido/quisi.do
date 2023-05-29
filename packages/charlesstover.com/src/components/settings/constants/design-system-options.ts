import DesignSystem from '../../../constants/design-system';
import type SelectOption from '../../../types/select-option';

const DESIGN_SYSTEM_OPTIONS: readonly SelectOption[] = [
  {
    label: 'AWS UI',
    value: DesignSystem.Awsui,
  },
  {
    label: 'Cloudscape Design',
    value: DesignSystem.CloudscapeDesign,
  },
  {
    label: 'Material UI',
    value: DesignSystem.Mui,
  },
];

export default DESIGN_SYSTEM_OPTIONS;
