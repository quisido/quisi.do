import type { ReactElement } from 'react';

export interface SpinButtonProps {
  readonly label: string;
}

/**
 *   A `SpinButton` component is a form of range input for selecting from
 * discrete choices, typically with increment and decrement controls.
 */
export default function SpinButton({ label }: SpinButtonProps): ReactElement {
  return (
    <label>
      {label}
      <input type="number" />
    </label>
  );
}
