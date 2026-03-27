import type { ReactElement } from 'react';

const DEFAULT_MAX = 100;

export interface ProgressBarProps {
  readonly label: string;
  readonly max?: number | undefined;
  readonly value?: number | undefined;
}

export default function ProgressBar({
  label,
  max = DEFAULT_MAX,
  value = 0,
}: ProgressBarProps): ReactElement {
  return (
    <label>
      {label}
      <progress max={max} value={value} />
    </label>
  );
}
