import type { ReactElement } from 'react';

export interface SpinButtonProps {
  readonly label: string;
}

export default function SpinButton({ label }: SpinButtonProps): ReactElement {
  return (
    <label>
      {label}
      <input type="number" />
    </label>
  );
}
