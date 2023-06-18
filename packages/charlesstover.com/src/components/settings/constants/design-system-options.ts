import DesignSystem from '../../../constants/design-system';
import type SelectOption from '../../../types/select-option';

export default [
  {
    label: 'AWS UI',
    value: DesignSystem.Awsui,
  },
  {
    label: 'Cloudscape Design',
    value: DesignSystem.CloudscapeDesign,
  },
  {
    label: 'MUI',
    value: DesignSystem.Mui,
  },
] satisfies readonly SelectOption[];
