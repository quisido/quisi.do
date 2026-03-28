import type { ReactElement } from 'react';
import type { ScrollbarProps } from '../shared/scrollbar-props.js';

/**
 *   A `Scrollbar` component controls the scrolling of content within a viewing
 * area. Its thumb position represents the current value and range of possible
 * scroll positions.
 */
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
