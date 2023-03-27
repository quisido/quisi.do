import type { FormFieldProps } from '@cloudscape-design/components/form-field';
import FormField from '@cloudscape-design/components/form-field';
import Select from '@cloudscape-design/components/select';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
import useCloudscapeSelect from './select.cloudscape.hook';
import type Props from './types/props';

export default function CloudscapeSelect({
  disabled = false,
  label,
  labelDirection,
  onChange,
  options,
  value,
}: Readonly<Props>): ReactElement {
  const { className, handleChange, selectedOption } = useCloudscapeSelect({
    labelDirection,
    onChange,
    options,
    value,
  });

  const optionalFormFieldProps: FormFieldProps = {};
  if (isDefined(className)) {
    optionalFormFieldProps.className = className;
  }

  return (
    <FormField label={label} stretch {...optionalFormFieldProps}>
      <Select
        disabled={disabled}
        onChange={handleChange}
        options={options}
        selectedOption={selectedOption}
      />
    </FormField>
  );
}
