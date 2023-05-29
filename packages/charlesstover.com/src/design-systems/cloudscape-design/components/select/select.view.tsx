import type { FormFieldProps } from '@cloudscape-design/components/form-field';
import FormField from '@cloudscape-design/components/form-field';
import Select from '@cloudscape-design/components/select';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/select';
import useSelect from './select.hook';

export default function CloudscapeSelect({
  disabled = false,
  label,
  labelDirection,
  onChange,
  options,
  value,
}: Readonly<Props>): ReactElement {
  const { className, handleChange, selectedOption } = useSelect({
    labelDirection,
    onChange,
    options,
    value,
  });

  const optionalFormFieldProps: FormFieldProps = {};
  if (typeof className !== 'undefined') {
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
