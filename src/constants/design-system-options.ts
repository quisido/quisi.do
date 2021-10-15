import type { SelectProps } from '@awsui/components-react/select';
import DesignSystem from '../constants/design-system';

const DESIGN_SYSTEM_OPTIONS: SelectProps.Option[] = [
  {
    label: 'AWS',
    value: DesignSystem.Aws,
  },
  {
    label: 'Material',
    value: DesignSystem.Material,
  },
];

export default DESIGN_SYSTEM_OPTIONS;
