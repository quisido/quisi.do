import type { ReactElement } from 'react';

export interface SliderProps {
  readonly label: string;
}

/**
 *   A `Slider` component lets the user select a value from within a given
 * range. Its thumb position represents the current value and the available
 * bounds.
 */
export default function Slider({ label }: SliderProps): ReactElement {
  return (
    <label>
      {label}
      <input type="range" />
    </label>
  );
}
