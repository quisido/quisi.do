import type { ReactElement, ReactNode } from 'react';

export interface GridProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Grid({ children, label }: GridProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <table aria-label={label} role="grid">
      {children}
    </table>
  );
}
