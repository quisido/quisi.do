import type { ReactElement, ReactNode } from 'react';

export interface GroupProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Group({ children, label }: GroupProps): ReactElement {
  return (
    <div aria-label={label} role="group">
      {children}
    </div>
  );
}
