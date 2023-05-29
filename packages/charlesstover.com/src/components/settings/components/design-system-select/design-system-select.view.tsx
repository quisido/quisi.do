import type { ReactElement } from 'react';
import Select from '../../../../components/select';
import OPTIONS from '../../constants/design-system-options';
import useDesignSystemSelect from './design-system-select.hook';

export default function SettingsDesignSystemSelect(): ReactElement {
  const { designSystem, disabled, handleChange, label } =
    useDesignSystemSelect();

  return (
    <Select
      disabled={disabled}
      label={label}
      onChange={handleChange}
      options={OPTIONS}
      value={designSystem}
    />
  );
}
