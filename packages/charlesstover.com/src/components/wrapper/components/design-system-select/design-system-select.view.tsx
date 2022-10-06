import type { ReactElement } from 'react';
import Select from '../../../../components/select';
import DESIGN_SYSTEM_OPTIONS from '../../constants/design-system-options';
import useWrapperDesignSystemSelect from './design-system-select.hook';

export default function WrapperDesignSystemSelect(): ReactElement {
  const { designSystem, disabled, handleChange, label } =
    useWrapperDesignSystemSelect();

  return (
    <Select
      disabled={disabled}
      label={label}
      onChange={handleChange}
      options={DESIGN_SYSTEM_OPTIONS}
      value={designSystem}
    />
  );
}
