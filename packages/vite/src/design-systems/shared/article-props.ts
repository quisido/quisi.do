import type { ReactNode } from 'react';
import type { HeadingOrLabel } from './heading-or-label.js';

interface Props {
  readonly children: ReactNode;
}

export type ArticleProps = HeadingOrLabel<Props>;
