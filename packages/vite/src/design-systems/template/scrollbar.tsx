import type { ReactElement } from 'react';
import type { ScrollbarProps } from '../core/scrollbar-props.js';

const DEFAULT_MAX = 100;

/**
 *   A scrollbar is a graphical object that controls the scrolling of content
 * within a viewing area, regardless of whether the content is fully displayed
 * within the viewing area.
 *   A scrollbar represents the current value and range of possible values via
 * the size of the scrollbar and position of the thumb with respect to the
 * visible range of the orientation (horizontal or vertical) it controls. Its
 * orientation represents the orientation of the scrollbar and the scrolling
 * effect on the viewing area controlled by the scrollbar. It is typically
 * possible to add to or subtract from the current value by using directional
 * keys such as arrow keys.
 * @see {@link https://w3c.github.io/aria/#scrollbar | WAI-ARIA `scrollbar` role}
 */
export default function Scrollbar({
  controls,
  disabled = false,
  max = DEFAULT_MAX,
  min = 0,
  orientation = 'vertical',
  value,
}: ScrollbarProps): ReactElement {
  return (
    <div
      aria-controls={controls}
      aria-disabled={disabled}
      aria-orientation={orientation}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      role="scrollbar"
    />
  );
}
