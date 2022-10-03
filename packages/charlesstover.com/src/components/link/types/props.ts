import type { ReactNode } from 'react';

export default interface Props {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly href: string;
  readonly title?: string | undefined;
}
