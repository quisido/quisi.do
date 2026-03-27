import type { ReactElement, ReactNode } from 'react';

export interface DirectoryProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Directory({
  children,
  label,
}: DirectoryProps): ReactElement {
  return (
    <ul aria-label={label} role="directory">
      {children}
    </ul>
  );
}
