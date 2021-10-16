import type { ReactElement } from 'react';
import Select from '../../components/select';
import DESIGN_SYSTEM_OPTIONS from '../../constants/design-system-options';
import useDesignSystemSelect from './navigation.design-system-select.hook';

export default function DesignSystemSelect(): ReactElement {
  const { designSystem, handleChange } = useDesignSystemSelect();

  return (
    <Select
      onChange={handleChange}
      options={DESIGN_SYSTEM_OPTIONS}
      value={designSystem}
    />
  );
}
