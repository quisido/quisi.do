import type { ReactElement, ReactNode } from 'react';

export interface DefinitionProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Definition({
  children,
  label,
}: DefinitionProps): ReactElement {
  return (
    <dfn aria-label={label} role="definition">
      {children}
    </dfn>
  );
}
