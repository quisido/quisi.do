import type { ReactElement, ReactNode } from 'react';

export interface RadioGroupProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function RadioGroup({
  children,
  label,
}: RadioGroupProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <div aria-label={label} role="radiogroup">
      {children}
    </div>
  );
}
