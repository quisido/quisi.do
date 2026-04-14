import type { ReactElement } from 'react';
import type { SwitchProps } from '../core/switch-props.js';

/**
 *   A switch... A type of checkbox that represents on/off values, as opposed to checked/unchecked values. See related checkbox.

The aria-checked attribute of a switch indicates whether the input is on (true) or off (false). The mixed value is invalid, and user agents MUST treat a mixed value as equivalent to false for this role.

Note
A switch provides approximately the same functionality as a checkbox and toggle button, but makes it possible for assistive technologies to present the widget in a fashion consistent with its on-screen appearance.
 * @see {@link https://w3c.github.io/aria/#switch | WAI-ARIA `switch` role}
 */
export default function Switch({
  checked = false,
  label,
}: SwitchProps): ReactElement {
  return (
    <label>
      {label}
      <input defaultChecked={checked} role="switch" type="checkbox" />
    </label>
  );
}
