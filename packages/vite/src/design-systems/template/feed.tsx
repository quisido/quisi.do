import type { ReactElement, ReactNode } from 'react';

export interface FeedProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Feed({ children, label }: FeedProps): ReactElement {
  return (
    <section aria-label={label} role="feed">
      {children}
    </section>
  );
}
