import type { FormFieldProps } from '@awsui/components-react/form-field';
import FormField from '@awsui/components-react/form-field';
import Select from '@awsui/components-react/select';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import useAwsSelect from './select.aws.hook';
import type Props from './types/props';

export default function AwsSelect({
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
  if (filterByDefined(className)) {
    optionalFormFieldProps.className = className;
  }

  return (
    <FormField label={label} stretch {...optionalFormFieldProps}>
      <Select
        onChange={handleChange}
        options={options}
        selectedOption={selectedOption}
      />
    </FormField>
  );
}
