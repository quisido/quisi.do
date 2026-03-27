import type { ReactElement, ReactNode } from 'react';

export interface BannerProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Banner({ children, label }: BannerProps): ReactElement {
  return <header aria-label={label}>{children}</header>;
}
