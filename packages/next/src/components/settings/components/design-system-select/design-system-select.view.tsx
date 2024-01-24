import { type ReactElement } from 'react';
import Select from '../../../../components/select/index.js';
import OPTIONS from '../../constants/design-system-options.js';
import useDesignSystemSelect from './design-system-select.hook.js';

export default function SettingsDesignSystemSelect(): ReactElement {
  const { designSystem, handleChange, label } = useDesignSystemSelect();

  return (
    <Select
      label={label}
      onChange={handleChange}
      options={OPTIONS}
      value={designSystem}
    />
  );
}
