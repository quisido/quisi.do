import type { ReactElement, ReactNode } from 'react';

export interface LogProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Log({ children, label }: LogProps): ReactElement {
  return (
    <div aria-label={label} role="log">
      {children}
    </div>
  );
}
