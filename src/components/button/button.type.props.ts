import type { ReactNode } from 'react';

export default interface Props {
  readonly children: ReactNode;
  readonly href?: string | undefined;
  readonly variant: 'primary';
}