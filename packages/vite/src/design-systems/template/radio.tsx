import type { ReactElement } from 'react';
import type { RadioProps } from '../core/radio-props.js';

/**
 *   A radio...
 * @see {@link https://w3c.github.io/aria/#radio | WAI-ARIA `radio` role}
 */
export default function Radio({ label }: RadioProps): ReactElement {
  return (
    <label>
      {label}
      <input type="radio" />
    </label>
  );
}
