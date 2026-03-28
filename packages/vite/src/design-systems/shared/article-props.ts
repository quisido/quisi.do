import type { ReactNode } from 'react';
import type { HeadingOrLabel } from './heading-or-label.js';

interface Props {
  readonly children: ReactNode;
  readonly positionInSet?: number | undefined;
  readonly setSize?: number | undefined;
}

export type ArticleProps = HeadingOrLabel<Props>;
