import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Select from '../../../../components/select';
import DESIGN_SYSTEM_OPTIONS from '../../constants/design-system-options';
import useWrapperDesignSystemSelect from './design-system-select.hook';

export default function WrapperDesignSystemSelect(): ReactElement {
  const { designSystem, handleChange } = useWrapperDesignSystemSelect();

  return (
    <Select
      label={<I18n>Design system</I18n>}
      onChange={handleChange}
      options={DESIGN_SYSTEM_OPTIONS}
      value={designSystem}
    />
  );
}
