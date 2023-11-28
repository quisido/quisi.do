import FormField, {
  type FormFieldProps,
} from '@awsui/components-react/form-field';
import Select from '@awsui/components-react/select';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/select';
import useSelect from './select.hook';

export default function AwsuiSelect({
  disabled = false,
  label,
  labelDirection,
  onChange,
  options,
  value,
}: Props): ReactElement {
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
