import type { ReactElement, ReactNode } from 'react';

export interface DefinitionProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Definition` component provides the definition of a term or concept. It
 * should be paired with the related `Term` component that identifies what is
 * being defined.
 */
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
