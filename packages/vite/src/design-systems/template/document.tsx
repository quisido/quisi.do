import type { ReactElement, ReactNode } from 'react';

export interface DocumentProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Document({
  children,
  label,
}: DocumentProps): ReactElement {
  return (
    <div aria-label={label} role="document">
      {children}
    </div>
  );
}
