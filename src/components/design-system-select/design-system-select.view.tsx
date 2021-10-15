import Select from '@awsui/components-react/select';
import type { ReactElement } from 'react';
import DESIGN_SYSTEM_OPTIONS from '../../constants/design-system-options';
import useDesignSystemSelect from './design-system-select.hook';

export default function DesignSystemSelect(): ReactElement {
  const { handleChange, selectedOption } = useDesignSystemSelect();

  return (
    <Select
      onChange={handleChange}
      options={DESIGN_SYSTEM_OPTIONS}
      selectedOption={selectedOption}
    />
  );
}
