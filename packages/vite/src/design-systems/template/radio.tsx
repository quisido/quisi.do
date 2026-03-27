import type { ReactElement } from 'react';

export interface RadioProps {
  readonly label: string;
}

export default function Radio({ label }: RadioProps): ReactElement {
  return (
    <label>
      {label}
      <input type="radio" />
    </label>
  );
}
