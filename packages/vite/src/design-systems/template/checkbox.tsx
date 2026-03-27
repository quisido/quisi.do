import type { ReactElement } from 'react';

export interface CheckboxProps {
  readonly label: string;
}

export default function Checkbox({ label }: CheckboxProps): ReactElement {
  return (
    <label>
      {label}
      <input type="checkbox" />
    </label>
  );
}
