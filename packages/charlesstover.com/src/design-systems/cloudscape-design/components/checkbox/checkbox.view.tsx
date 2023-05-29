import Checkbox from '@cloudscape-design/components/checkbox';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/checkbox';
import useCloudscapeCheckbox from './checkbox.hook';

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
