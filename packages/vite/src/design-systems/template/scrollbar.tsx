import type { ReactElement } from 'react';

export interface ScrollbarProps {
  readonly controls: string;
  readonly label: string;
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}

export default function Scrollbar({
  controls,
  label,
  orientation = 'vertical',
}: ScrollbarProps): ReactElement {
  return (
    <div
      aria-controls={controls}
      aria-label={label}
      aria-orientation={orientation}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={0}
      role="scrollbar"
    />
  );
}
