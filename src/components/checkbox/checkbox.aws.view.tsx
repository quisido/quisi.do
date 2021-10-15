import Checkbox from '@awsui/components-react/checkbox';
import type { ReactElement, ReactNode } from 'react';
import useAwsCheckbox from './checkbox.aws.hook';

interface Props {
  readonly checked: boolean;
  readonly children: ReactNode;
  readonly onChange: (checked: boolean) => void;
}

export default function AwsCheckbox({
  checked,
  children,
  onChange,
}: Props): ReactElement {
  const { handleChange } = useAwsCheckbox({ onChange });

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      {children}
    </Checkbox>
  );
}
