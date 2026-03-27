import type { ReactElement } from 'react';

export interface SliderProps {
  readonly label: string;
}

export default function Slider({ label }: SliderProps): ReactElement {
  return (
    <label>
      {label}
      <input type="range" />
    </label>
  );
}
