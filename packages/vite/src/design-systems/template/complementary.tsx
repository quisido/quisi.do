import type { ReactElement, ReactNode } from 'react';

export interface ComplementaryProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Complementary({
  children,
  label,
}: ComplementaryProps): ReactElement {
  return <aside aria-label={label}>{children}</aside>;
}
