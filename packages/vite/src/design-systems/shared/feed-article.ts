import type { ReactNode } from 'react';
import type { HeadingOrLabel } from './heading-or-label.js';

interface Props {
  readonly children: ReactNode;
  readonly key: number | string;
}

export type FeedArticle = HeadingOrLabel<Props>;
