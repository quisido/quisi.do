import type { ReactElement } from 'react';
import type { SwitchProps } from '../shared/switch-props.js';

/**
 *   A `Switch` component is a type of checkbox that represents on and off
 * values rather than checked and unchecked values.
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
