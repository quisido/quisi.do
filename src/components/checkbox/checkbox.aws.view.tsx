import Checkbox from '@awsui/components-react/checkbox';
import type { ReactElement } from 'react';
import useAwsCheckbox from './checkbox.aws.hook';
import type Props from './types/props';

export default function AwsCheckbox({
  checked,
  children,
  onChange,
}: Readonly<Props>): ReactElement {
  const { handleChange } = useAwsCheckbox({ onChange });

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      {children}
    </Checkbox>
  );
}
