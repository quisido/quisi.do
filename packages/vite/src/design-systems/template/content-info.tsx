import type { ReactElement, ReactNode } from 'react';

export interface ContentInfoProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function ContentInfo({
  children,
  label,
}: ContentInfoProps): ReactElement {
  return <footer aria-label={label}>{children}</footer>;
}
