import type { FormFieldProps } from '@awsui/components-react/form-field';
import FormField from '@awsui/components-react/form-field';
import Select from '@awsui/components-react/select';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
import useAwsSelect from './select.aws.hook';
import type Props from './types/props';

export default function AwsSelect({
  disabled = false,
  label,
  labelDirection,
  onChange,
  options,
  value,
}: Readonly<Props>): ReactElement {
  const { className, handleChange, selectedOption } = useAwsSelect({
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
