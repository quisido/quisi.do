import type { ReactElement, ReactNode } from 'react';

export interface StatusProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Status({ children, label }: StatusProps): ReactElement {
  return (
    <div aria-label={label} role="status">
      {children}
    </div>
  );
}
