import Select from '@awsui/components-react/select';
import type { ReactElement } from 'react';
import type Props from './select.type.props';
import useAwsSelect from './select.aws.hook';

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
