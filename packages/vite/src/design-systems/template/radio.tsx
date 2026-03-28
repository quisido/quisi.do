import type { ReactElement } from 'react';

export interface RadioProps {
  readonly label: string;
}

/**
 *   A `Radio` component is a checkable input in a same-role group where only
 * one item can be checked at a time. Radios should be explicitly grouped
 * within a `RadioGroup`.
 */
export default function Radio({ label }: RadioProps): ReactElement {
  return (
    <label>
      {label}
      <input type="radio" />
    </label>
  );
}
