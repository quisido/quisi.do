import type { ReactElement } from 'react';

export interface SwitchProps {
  readonly checked?: boolean | undefined;
  readonly label: string;
}

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
