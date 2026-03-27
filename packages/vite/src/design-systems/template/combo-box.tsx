import type { ReactElement, ReactNode } from 'react';

export interface ComboBoxProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function ComboBox({
  children,
  label,
}: ComboBoxProps): ReactElement {
  return (
    <label>
      {label}
      <select>{children}</select>
    </label>
  );
}
