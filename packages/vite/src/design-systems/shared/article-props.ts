import type { ReactNode } from 'react';

export interface ArticleProps {
  readonly children: ReactNode;
  readonly label: string;
  readonly positionInSet?: number | undefined;
  readonly setSize?: number | undefined;
}
