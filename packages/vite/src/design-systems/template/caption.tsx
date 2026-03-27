import type { ReactElement, ReactNode } from 'react';

export interface CaptionProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Caption({
  children,
  label,
}: CaptionProps): ReactElement {
  return <caption aria-label={label}>{children}</caption>;
}
