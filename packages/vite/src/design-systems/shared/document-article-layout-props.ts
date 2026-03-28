import type { ReactNode } from 'react';
import type { HeadingOrLabel } from './heading-or-label.js';

interface Props {
  /** Document body content. */
  readonly children: ReactNode;
  /** Sticky table of contents sidebar. */
  readonly tableOfContents?: ReactNode | undefined;
}

export type DocumentArticleLayoutProps = HeadingOrLabel<Props>;
