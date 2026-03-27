import type { ReactElement, ReactNode } from 'react';

export interface SuggestionProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Suggestion({
  children,
  label,
}: SuggestionProps): ReactElement {
  return (
    <ins aria-label={label} role="suggestion">
      {children}
    </ins>
  );
}
