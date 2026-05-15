import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';
import type { RequiredReactNode } from './required-react-node.js';

export type FeedArticle = OneOf<OneOfFeedArticleProps> & {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
  readonly key: number | string;
};

export interface FeedProps {
  readonly articles: readonly FeedArticle[];
  /**
   * The articles offset is the number of articles missing from the beginning
   * of the `articles` array prop.
   * @default 0
   */
  readonly articlesOffset?: number | undefined;
  readonly labelledBy: string;
  /** Callback when more articles need to be appended. */
  readonly onAppend?: (() => Promise<void>) | undefined;
  /** Callback when more articles need to be prepended. */
  readonly onPrepend?: (() => Promise<void>) | undefined;
  readonly setSize?: number | undefined;
}

interface OneOfFeedArticleProps {
  readonly heading: RequiredReactNode;
  readonly labelledBy: string;
}
