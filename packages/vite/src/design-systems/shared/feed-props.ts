import type { ReactNode } from 'react';

export interface FeedArticle {
  readonly children: ReactNode;
  readonly key: number | string;
  readonly label: string;
}

export interface FeedProps {
  readonly articles: readonly FeedArticle[];
  /**
   *   The articles offset is the number of articles missing from the beginning
   * of the `articles` array prop.
   * @default 0
   */
  readonly articlesOffset?: number | undefined;
  readonly setSize?: number | undefined;
}
