import type { ReactElement, ReactNode } from 'react';

export interface FeedProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Feed` component is a scrollable list of `Article` components where
 * articles may be added to or removed from either end of the list as the user
 * reads and scrolls through the content.
 */
export default function Feed({ children, label }: FeedProps): ReactElement {
  return (
    <section aria-label={label} role="feed">
      {children}
    </section>
  );
}
