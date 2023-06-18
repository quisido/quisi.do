import Checkbox from '@cloudscape-design/components/checkbox';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/checkbox';
import useCheckbox from './checkbox.hook';

export default function CloudscapeDesignCheckbox({
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
