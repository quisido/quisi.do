import type { ReactElement, ReactNode } from 'react';

export interface RadioGroupProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `RadioGroup` component groups `Radio` buttons so only one item in the
 * set can be checked at a time.
 */
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
