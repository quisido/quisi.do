import type { ReactElement } from 'react';
import type { SpinButtonProps } from '../core/spin-button-props.js';

/**
 *   A spin button...
 * @see {@link https://w3c.github.io/aria/#spinbutton | WAI-ARIA `spinbutton` role}
 */
export default function SpinButton({ label }: SpinButtonProps): ReactElement {
  return (
    <label>
      {label}
      <input type="number" />
    </label>
  );
}
