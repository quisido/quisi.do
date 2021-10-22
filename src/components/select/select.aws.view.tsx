import Select from '@awsui/components-react/select';
import type { ReactElement } from 'react';
import useAwsSelect from './select.aws.hook';
import type Props from './types/props';

export default function AwsSelect({ options, ...props }: Props): ReactElement {
  const { handleChange, selectedOption } = useAwsSelect({ options, ...props });

  return (
    <Select
      onChange={handleChange}
      options={options}
      selectedOption={selectedOption}
    />
  );
}
