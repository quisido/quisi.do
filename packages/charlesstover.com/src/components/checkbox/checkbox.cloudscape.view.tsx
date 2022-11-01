import Checkbox from '@cloudscape-design/components/checkbox';
import type { ReactElement } from 'react';
import useCloudscapeCheckbox from './checkbox.cloudscape.hook';
import type Props from './types/props';

export default function CloudscapeCheckbox({
  checked,
  children,
  onChange,
}: Readonly<Props>): ReactElement {
  const { handleChange } = useCloudscapeCheckbox({ onChange });

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      {children}
    </Checkbox>
  );
}
