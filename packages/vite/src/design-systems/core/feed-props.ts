import type { ReactNode } from 'react';
import type { HeadingOrLabelProps } from './heading-or-label-props.js';
import type { LabelProps } from './label-props.js';

export type FeedArticle = HeadingOrLabelProps & {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
  readonly key: number | string;
};

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

export type FeedProps = LabelProps & Props;
