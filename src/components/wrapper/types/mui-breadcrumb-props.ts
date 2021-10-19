import type { ReactNode } from 'react';

export default interface MuiBreadcrumbProps {
  readonly children: ReactNode;
  readonly current: boolean;
  readonly path: string;
}
