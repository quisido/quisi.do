import type { FeedArticle } from './feed-article.js';
import type { WithLabel } from './with-label.js';

interface Props {
  readonly articles: readonly FeedArticle[];
  /**
   *   The articles offset is the number of articles missing from the beginning
   * of the `articles` array prop.
   * @default 0
   */
  readonly articlesOffset?: number | undefined;
  /** Callback when more articles need to be appended. */
  readonly onAppend?: (() => Promise<void>) | undefined;
  /** Callback when more articles need to be prepended. */
  readonly onPrepend?: (() => Promise<void>) | undefined;
  readonly setSize?: number | undefined;
}

export type FeedProps = WithLabel<Props>;
