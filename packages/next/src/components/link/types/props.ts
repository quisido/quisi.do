import type { ReactNode } from 'react';

export default interface Props {
  readonly category: string; // used for tracking events
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly href: string;
  readonly title: string;
}
