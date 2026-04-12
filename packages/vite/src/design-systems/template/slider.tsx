import type { ReactElement } from 'react';
import type { SliderProps } from '../core/slider-props.js';

/**
 *   A slider...
 * @see {@link https://w3c.github.io/aria/#slider | WAI-ARIA `slider` role}
 */
export default function Slider({ label }: SliderProps): ReactElement {
  return (
    <label>
      {label}
      <input type="range" />
    </label>
  );
}
