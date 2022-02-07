import FormField from '@awsui/components-react/form-field';
import Select from '@awsui/components-react/select';
import type { ReactElement } from 'react';
import useAwsSelect from './select.aws.hook';
import type Props from './types/props';

export default function AwsSelect({
  label,
  onChange,
  options,
  value,
}: Props): ReactElement {
  const { handleChange, selectedOption } = useAwsSelect({
    onChange,
    options,
    value,
  });

  return (
    <FormField label={label} stretch>
      <Select
        onChange={handleChange}
        options={options}
        selectedOption={selectedOption}
      />
    </FormField>
  );
}
