import Checkbox from '@awsui/components-react/checkbox';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/checkbox';
import useCheckbox from './checkbox.hook';

export default function AwsuiCheckbox({
  checked,
  children,
  onChange,
}: Readonly<Props>): ReactElement {
  const { handleChange } = useCheckbox({ onChange });

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      {children}
    </Checkbox>
  );
}
