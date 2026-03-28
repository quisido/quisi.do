import type { ReactElement } from 'react';

export interface SwitchProps {
  readonly checked?: boolean | undefined;
  readonly label: string;
}

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
