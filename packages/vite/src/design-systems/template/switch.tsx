import type { ReactElement } from 'react';
import type { SwitchProps } from '../core/switch-props.js';

/**
 *   A switch...
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
