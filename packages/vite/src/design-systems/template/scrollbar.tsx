import type { ReactElement } from 'react';
import type { ScrollbarProps } from '../core/scrollbar-props.js';

/**
 *   A scrollbar...
 * @see {@link https://w3c.github.io/aria/#scrollbar | WAI-ARIA `scrollbar` role}
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
