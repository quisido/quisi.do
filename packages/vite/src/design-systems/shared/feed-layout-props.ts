import type { ReactNode } from 'react';

export interface FeedLayoutProps {
  /** Feed content (cards, articles, posts). */
  readonly children: ReactNode;
  /** Filter and sort controls for the feed. */
  readonly filters?: ReactNode | undefined;
  /** Accessible label for the main content area. */
  readonly label: string;
}
